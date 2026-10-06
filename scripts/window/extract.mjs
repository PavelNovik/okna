// Раскадровка видео через Chrome (без ffmpeg): node scripts/window/extract.mjs raw/window/source.mp4 raw/window/frames
// Нужен puppeteer-core (npm i -D puppeteer-core) и установленный Chrome; путь к Chrome — ниже.
// Видео проигрывается замедленно; каждый показанный кадр (requestVideoFrameCallback) рисуется в canvas
// и сохраняется под номером round(mediaTime·fps). Пропущенные кадры добираются повторными проходами.
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
const puppeteer = createRequire(import.meta.url)('puppeteer-core')

const [, , video, outDir] = process.argv
fs.mkdirSync(outDir, { recursive: true })
const page0 = `<!doctype html><video id="v" src="/v.mp4" muted playsinline preload="auto"></video><canvas id="c"></canvas>`
const server = http
  .createServer((req, res) => {
    if (req.url === '/') return res.end(page0)
    if (req.url === '/v.mp4') {
      res.setHeader('Content-Type', 'video/mp4')
      return fs.createReadStream(video).pipe(res)
    }
    res.statusCode = 404
    res.end()
  })
  .listen(4290)

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--autoplay-policy=no-user-gesture-required'],
})
const page = await browser.newPage()
const frames = new Map()
await page.exposeFunction('saveFrame', (i, data) => {
  if (!frames.has(i)) frames.set(i, data)
})
await page.goto('http://localhost:4290/')
const info = await page.evaluate(async () => {
  const v = document.getElementById('v')
  await new Promise((r) => (v.readyState >= 2 ? r() : (v.onloadeddata = r)))
  return { duration: v.duration, w: v.videoWidth, h: v.videoHeight }
})
const fps = 24
const count = Math.floor(info.duration * fps + 1e-6)
console.log({ ...info, fps, count })

for (let pass = 0; pass < 6 && frames.size < count; pass++) {
  const have = [...frames.keys()]
  await page.evaluate(
    async (fps, have, rate) => {
      const v = document.getElementById('v')
      const c = document.getElementById('c')
      c.width = v.videoWidth
      c.height = v.videoHeight
      const ctx = c.getContext('2d')
      const done = new Set(have)
      v.currentTime = 0
      await new Promise((r) => (v.onseeked = r))
      v.playbackRate = rate
      await new Promise((resolve) => {
        const cb = async (now, meta) => {
          const i = Math.round(meta.mediaTime * fps)
          if (!done.has(i)) {
            done.add(i)
            ctx.drawImage(v, 0, 0)
            await window.saveFrame(i, c.toDataURL('image/png'))
          }
          if (v.ended) resolve()
          else v.requestVideoFrameCallback(cb)
        }
        v.onended = resolve
        v.requestVideoFrameCallback(cb)
        v.play()
      })
    },
    fps,
    have,
    Math.max(0.0625, 0.25 / (pass + 1))
  )
  console.log('pass', pass, 'frames', frames.size)
}

for (const [i, data] of frames) {
  if (i < 0 || i >= count) continue
  fs.writeFileSync(path.join(outDir, `f${String(i).padStart(3, '0')}.png`), Buffer.from(data.split(',')[1], 'base64'))
}
const missing = Array.from({ length: count }, (_, i) => i).filter((i) => !frames.has(i))
console.log('saved', count - missing.length, 'missing', missing)
await browser.close()
server.close()
