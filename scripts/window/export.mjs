// Экспорт кадров для сайта: raw/window/comp/c###.png (960×1580) → public/window/{l,s}/NN.{avif,webp}
// l — 720 px по ширине (десктоп), s — 540 px (телефоны); каждый второй кадр (62 шт.).
// Печатает цвета стены по краям кадра — из них собран фон hero (.hero__bg в global.css).
//   node scripts/window/export.mjs
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'raw/window/comp'
const OUT = 'public/window'
const STEP = 2
const SIZES = { l: 720, s: 540 }

const files = fs.readdirSync(SRC).filter((f) => /^c\d{3}\.png$/.test(f)).sort()
const picked = files.filter((_, i) => i % STEP === 0)
for (const [name, width] of Object.entries(SIZES)) fs.mkdirSync(path.join(OUT, name), { recursive: true })

let bytes = { avif: 0, webp: 0 }
for (const [n, f] of picked.entries()) {
  const id = String(n).padStart(2, '0')
  for (const [name, width] of Object.entries(SIZES)) {
    const img = sharp(path.join(SRC, f)).resize(width)
    const avif = await img.clone().avif({ quality: 48, effort: 5 }).toBuffer()
    const webp = await img.clone().webp({ quality: 70, effort: 5 }).toBuffer()
    fs.writeFileSync(path.join(OUT, name, `${id}.avif`), avif)
    fs.writeFileSync(path.join(OUT, name, `${id}.webp`), webp)
    if (name === 'l') {
      bytes.avif += avif.length
      bytes.webp += webp.length
    }
  }
}
console.log(`frames: ${picked.length}; l total: avif ${(bytes.avif / 1048576).toFixed(2)} MB, webp ${(bytes.webp / 1048576).toFixed(2)} MB`)

// цвет стены по краям первого кадра (для бесшовного фона вокруг панели)
const { data, info } = await sharp(path.join(SRC, files[0])).raw().toBuffer({ resolveWithObject: true })
const stops = []
for (const t of [0, 0.07, 0.12, 0.3, 0.5, 0.7, 0.9, 1]) {
  const y = Math.min(info.height - 1, Math.round(t * (info.height - 1)))
  let r = 0, g = 0, b = 0, n = 0
  for (const x of [2, 6, 10, 14, info.width - 15, info.width - 11, info.width - 7, info.width - 3]) {
    const p = (y * info.width + x) * info.channels
    r += data[p]; g += data[p + 1]; b += data[p + 2]; n++
  }
  stops.push(`rgb(${Math.round(r / n)} ${Math.round(g / n)} ${Math.round(b / n)}) ${Math.round(t * 100)}%`)
}
console.log('wall gradient:', stops.join(', '))
