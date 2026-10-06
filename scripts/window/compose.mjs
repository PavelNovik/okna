// Композит кадров видео «окно открывается» (raw/window/frames, 480×858, 24 fps):
// маска «улицы» → вид на Познань (синий час) + тонировка интерьера под сумерки + апскейл 2×.
// Кадры 22–84 (створки распахиваются) — геометрическая маска по трекам кромок (geo.mjs),
// остальные — цветовая (листва, небо, «размытое» стеклом) с заливкой дыр.
//   node scripts/window/compose.mjs all raw/window/comp   — все кадры (PNG 960×1580)
//   node scripts/window/compose.mjs proto                 — 5 ключевых кадров для оценки
import fs from 'node:fs'
import { createRequire } from 'node:module'
import { GEO_FROM, GEO_TO, columnAlpha } from './geo.mjs'
const sharp = createRequire(import.meta.url)('sharp')
const S = 'raw/window/'
const VIEW = 'raw/site/view-poznan.jpg' // скачивает npm run images
const W = 480, H = 858
const X0 = 70, X1 = 412 // внутренний проём рамы (по горизонтали)
const XG0 = 25, XG1 = 455 // листва сквозь стекло открытых створок видна и за проёмом
const CROP_H = 790 // низ кадра с водяным знаком отрезаем
const K = 2 // апскейл

const frameFile = (i) => S + `frames/f${String(i).padStart(3, '0')}.png`

// ---------- маска ----------
export async function rawMask(i) {
  const b = await sharp(frameFile(i)).removeAlpha().raw().toBuffer()
  const a = new Float32Array(W * H)
  const foliage = new Uint8Array(W * H)
  const sky = new Uint8Array(W * H)
  const lum = new Float32Array(W * H)
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const p = y * W + x
      const r = b[p * 3], g = b[p * 3 + 1], bl = b[p * 3 + 2]
      const L = (r + g + bl) / 3
      lum[p] = L
      // за пределами проёма листва видна только сквозь стекло распахнутых створок (с ~75-го кадра)
      if (i < 75 ? x < X0 || x >= X1 : x < XG0 || x >= XG1) continue
      const gex = g - (r + bl) / 2
      const neutral = Math.abs(bl - r) <= 10 && Math.abs(g - r) <= 10
      if (gex > 6 && g - bl > 6) {
        a[p] = 1
        foliage[p] = 1
      } else if (gex >= 3 && L > 100 && g >= bl) a[p] = 0.85 // листва, «размытая» стеклом створки
      else if (x < X0 || x >= X1) continue // дальше — только в самом проёме
      else if (gex >= 2 && g >= bl + 2 && L < 115) a[p] = 1 // тёмная листва, тени под деревьями
      else if (gex >= 2 && g >= bl && L >= 75 && L < 160) a[p] = 0.85 // серо-зелёные деревья сквозь стекло створки
      else if (L > 200 && neutral) {
        a[p] = 1
        sky[p] = 1
      } else if (L > 185 && neutral) a[p] = 0.7
    }
  const span = X1 - X0
  // верх: тёмная линия фурнитуры/уплотнителя под верхним профилем (самая тёмная строка в 180..260),
  // и не выше первой строки с широким небом
  let skyTop = 0
  for (let y = 120; y < H / 2; y++) {
    let n = 0
    for (let x = X0; x < X1; x++) n += sky[y * W + x]
    if (n > span * 0.25) { skyTop = y; break }
  }
  let darkRow = 0, darkVal = 1e9
  for (let y = 180; y < 262; y++) {
    let s = 0
    for (let x = X0 + 20; x < X1 - 20; x++) s += lum[y * W + x]
    if (s < darkVal) { darkVal = s; darkRow = y }
  }
  const top = Math.max(skyTop, darkRow + 2)
  let bottom = H
  for (let y = H - 120; y > H / 2; y--) {
    let n = 0
    for (let x = X0; x < X1; x++) n += foliage[y * W + x] // низ — по траве в самом проёме
    if (n > span * 0.25) { bottom = y; break }
  }
  // кадры распахивания: маска из треков кромок (ровные края, стекло створок — с бликом)
  if (i >= GEO_FROM && i <= GEO_TO) {
    const g = new Float32Array(W * H)
    const cols = new Float32Array(W)
    for (let x = X0; x < X1; x++) cols[x] = columnAlpha(i, x)
    for (let y = top; y <= bottom; y++) for (let x = X0; x < X1; x++) g[y * W + x] = cols[x]
    return { a: g, top, bottom }
  }
  // тёмные пятна у линии деревьев: тёмное и «толстое» в обе стороны (уплотнители и тени профилей — тонкие)
  const dark = (p) => lum[p] < 75
  for (let y = top; y <= bottom; y++)
    for (let x = X0; x < X1; x++) {
      const p = y * W + x
      if (a[p] >= 0.5 || !dark(p)) continue
      let h = 1, v = 1
      for (let d = 1; d < 8 && x - d >= X0 && dark(p - d); d++) h++
      for (let d = 1; d < 8 && x + d < X1 && dark(p + d); d++) h++
      for (let d = 1; d < 8 && y - d >= top && dark(p - d * W); d++) v++
      for (let d = 1; d < 8 && y + d <= bottom && dark(p + d * W); d++) v++
      if (h >= 7 && v >= 7) a[p] = 1
    }
  for (let y = 0; y < H; y++) if (y < top || y > bottom + 1) for (let x = 0; x < W; x++) a[y * W + x] = 0
  // заливка дыр (касание верхней границы допустимо — это облака)
  const seen = new Uint8Array(W * H)
  const stack = []
  for (let y = top; y <= bottom; y++)
    for (let x = X0; x < X1; x++) {
      const s = y * W + x
      if (a[s] >= 0.5 || seen[s]) continue // поиск дыр — только в проёме X0..X1
      const pts = []
      let touches = false
      stack.push(s)
      seen[s] = 1
      while (stack.length) {
        const p = stack.pop()
        pts.push(p)
        const px = p % W, py = (p / W) | 0
        if (px <= X0 || px >= X1 - 1 || py >= bottom) touches = true
        for (const q of [p - 1, p + 1, p - W, p + W]) {
          const qx = q % W, qy = (q / W) | 0
          if (qx < X0 || qx >= X1 || qy < top || qy > bottom || Math.abs(qx - px) > 1) continue
          if (a[q] < 0.5 && !seen[q]) {
            seen[q] = 1
            stack.push(q)
          }
        }
      }
      if (!touches && pts.length < 6000) for (const p of pts) a[p] = 1
    }
  // мелкие острова маски (блики, крапинки на раме и стене) — убрать
  const seen2 = new Uint8Array(W * H)
  for (let s = 0; s < W * H; s++) {
    if (a[s] < 0.5 || seen2[s]) continue
    const pts = []
    stack.push(s)
    seen2[s] = 1
    while (stack.length) {
      const p = stack.pop()
      pts.push(p)
      const px = p % W
      for (const q of [p - 1, p + 1, p - W, p + W]) {
        if (q < 0 || q >= W * H || Math.abs((q % W) - px) > 1) continue
        if (a[q] >= 0.5 && !seen2[q]) {
          seen2[q] = 1
          stack.push(q)
        }
      }
    }
    if (pts.length < 150) for (const p of pts) a[p] = 0
  }
  return { a, top, bottom }
}

// ---------- вид на Познань (синий час), в координатах увеличенного кадра ----------
let viewCache = null
async function viewPlate() {
  if (viewCache) return viewCache
  // проём ~ x 70..412, y 190..650 (кадр 480×858). Пластина шире проёма, центр — на улице к ратуше
  const PW = Math.round(760 * K), PH = Math.round(760 * K * (1601 / 2400))
  const plate = await sharp(VIEW)
    .resize(PW, PH)
    .modulate({ brightness: 0.8, saturation: 1.12 })
    .linear([0.88, 0.96, 1.15], [-2, 4, 18])
    .gamma(1.1)
    .removeAlpha()
    .raw()
    .toBuffer()
  // смещение пластины относительно кадра (увеличенного): центр пластины → центр проёма
  const ox = Math.round(((X0 + X1) / 2) * K - PW / 2)
  const oy = Math.round(415 * K - PH / 2)
  viewCache = { plate, PW, PH, ox, oy }
  return viewCache
}

// ---------- кадр ----------
export async function composeFrame(i, alpha, gain = 1) {
  const OW = W * K, OH = CROP_H * K
  // исходник: апскейл lanczos3 + шумоподавление + резкость
  const src = await sharp(frameFile(i))
    .removeAlpha()
    .extract({ left: 0, top: 0, width: W, height: CROP_H })
    .median(3)
    .resize(OW, OH, { kernel: 'lanczos3' })
    .sharpen({ sigma: 0.9, m1: 0.6, m2: 2.2 })
    .raw()
    .toBuffer()
  // маска: апскейл со сглаживанием (мягкий край)
  const aBuf = Buffer.alloc(W * CROP_H)
  for (let p = 0; p < W * CROP_H; p++) aBuf[p] = Math.round(Math.min(1, alpha[p]) * 255)
  const aUp = await sharp(aBuf, { raw: { width: W, height: CROP_H, channels: 1 } })
    .resize(OW, OH, { kernel: 'cubic' })
    .blur(0.8)
    .extractChannel(0)
    .raw()
    .toBuffer()
  const { plate, PW, PH, ox, oy } = await viewPlate()
  const out = Buffer.alloc(OW * OH * 3)
  for (let y = 0; y < OH; y++)
    for (let x = 0; x < OW; x++) {
      const p = y * OW + x
      const a = aUp[p] / 255
      // интерьер → сумерки: темнее и холоднее, белое ПВХ остаётся светлым
      let r = src[p * 3] * gain, g = src[p * 3 + 1] * gain, b = src[p * 3 + 2] * gain
      const L = (r + g + b) / 3
      // стена уходит в ночной синий (~#1b2436), освещённое окном (подоконник, кромки) остаётся светлым
      const k = 0.34 + 0.5 * Math.min(1, Math.max(0, (L - 110) / 140))
      r = Math.pow(r / 255, 1.12) * 255 * k * 0.62
      g = Math.pow(g / 255, 1.12) * 255 * k * 0.84
      b = Math.pow(b / 255, 1.12) * 255 * k * 1.25
      if (a > 0.001) {
        const px = x - ox, py = y - oy
        if (px >= 0 && py >= 0 && px < PW && py < PH) {
          const q = (py * PW + px) * 3
          r = r * (1 - a) + plate[q] * a
          g = g * (1 - a) + plate[q + 1] * a
          b = b * (1 - a) + plate[q + 2] * a
        }
      }
      out[p * 3] = Math.max(0, Math.min(255, r))
      out[p * 3 + 1] = Math.max(0, Math.min(255, g))
      out[p * 3 + 2] = Math.max(0, Math.min(255, b))
    }
  return sharp(out, { raw: { width: OW, height: OH, channels: 3 } })
}

// яркость «комнаты» (стена у краёв кадра, вне окна) — для дефликера
async function roomLuma(i) {
  const b = await sharp(frameFile(i)).removeAlpha().raw().toBuffer()
  let s = 0, n = 0
  for (let y = 120; y < 760; y += 2)
    for (const x of [6, 12, 18, 24, 456, 462, 468, 474]) {
      const p = (y * W + x) * 3
      s += b[p] + b[p + 1] + b[p + 2]
      n += 3
    }
  return s / n
}

if (process.argv[2] === 'all') {
  const N = 124
  const outDir = process.argv[3]
  fs.mkdirSync(outDir, { recursive: true })
  // 1) маски всех кадров
  const masks = []
  for (let i = 0; i < N; i++) masks.push((await rawMask(i)).a)
  console.log('masks ready')
  // 2) сглаживание во времени (1-2-1)
  const smooth = masks.map((m, i) => {
    const pm = masks[Math.max(0, i - 1)], nm = masks[Math.min(N - 1, i + 1)]
    const o = new Float32Array(W * H)
    for (let p = 0; p < W * H; p++) o[p] = 0.25 * pm[p] + 0.5 * m[p] + 0.25 * nm[p]
    return o
  })
  // 3) дефликер: яркость комнаты → скользящее среднее по 15 кадрам
  const luma = []
  for (let i = 0; i < N; i++) luma.push(await roomLuma(i))
  const target = luma.map((_, i) => {
    let s = 0, n = 0
    for (let j = Math.max(0, i - 7); j <= Math.min(N - 1, i + 7); j++) { s += luma[j]; n++ }
    return s / n
  })
  const gains = luma.map((l, i) => Math.max(0.85, Math.min(1.15, target[i] / l)))
  console.log('gains', gains.map((g) => g.toFixed(2)).filter((_, i) => i % 8 === 0).join(' '))
  // 4) рендер
  for (let i = 0; i < N; i++) {
    const img = await composeFrame(i, smooth[i], gains[i])
    await img.png({ compressionLevel: 3 }).toFile(`${outDir}/c${String(i).padStart(3, '0')}.png`)
    if (i % 20 === 0) console.log('frame', i)
  }
  console.log('done')
}

if (process.argv[2] === 'proto') {
  const tiles = []
  for (const i of [0, 30, 60, 90, 123]) {
    const { a, top, bottom } = await rawMask(i)
    console.log(i, top, bottom)
    const img = await composeFrame(i, a)
    tiles.push(await img.resize(480).jpeg({ quality: 90 }).toBuffer())
    if (i === 60) await (await composeFrame(i, a)).jpeg({ quality: 92 }).toFile(S + 'comp-60-full.jpg')
  }
  const c = tiles.map((input, k) => ({ input, left: k * 490, top: 0 }))
  await sharp({ create: { width: 490 * tiles.length, height: CROP_H, channels: 3, background: '#fff' } }).composite(c).jpeg({ quality: 88 }).toFile(S + 'comp-proto.jpg')
}
