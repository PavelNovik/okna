// Готовит все изображения сайта в public/:
// 1) фото с liwserwis.com (скачиваются в raw/site) → public/images/<name>.webp и <name>-sm.webp;
// 2) вид за окном (Unsplash) → public/images/view.webp, view-sm.webp;
// 3) логотипы марок → public/brands/<id>.png;
// 4) public/favicon.svg → favicon-32.png, favicon-192.png, apple-touch-icon.png, logo.png;
// 5) og-image.jpg (1200×630).
// Запуск: npm run images
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const pub = path.resolve('public')
const out = path.join(pub, 'images')
const raw = path.resolve('raw/site')
fs.mkdirSync(out, { recursive: true })
fs.mkdirSync(path.join(pub, 'brands'), { recursive: true })
fs.mkdirSync(raw, { recursive: true })

const SITE = 'https://liwserwis.com/wp-content/uploads/'
// Вид из окна: Stary Rynek в Познани сверху (Unsplash, Jakub Żerdzicki), тонируем «под синий час»
const VIEW = 'https://images.unsplash.com/photo-1706858587788-374fd249a9ca?w=2400&q=88&fm=jpg'
// Фон шапок внутренних страниц: kamienice na Starym Rynku (Unsplash, Sergei Gussev)
const RYNEK = 'https://images.unsplash.com/photo-1703022712569-f0d2c15eefbf?w=1800&q=86&fm=jpg'
const blueHour = (img) => img.modulate({ brightness: 0.62, saturation: 1.15 }).linear([0.86, 0.95, 1.18], [-4, 4, 22]).gamma(1.15)

async function download(url, file) {
  if (fs.existsSync(file)) return fs.readFileSync(file)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(file, buf)
  return buf
}
const site = (p) => download(SITE + p, path.join(raw, path.basename(p)))

// name → [путь на сайте, размер -sm (w×h, cover) | null для вертикальных]
const photos = {
  rej1: '2026/03/rej1.jpg',
  rej2: '2026/03/rej2.png',
  rej3: '2026/03/rej3-1.jpg',
  rej4: '2026/03/rej4-1.jpg',
  rej5: '2026/03/rej5-1.jpg',
  rej6: '2026/03/rej6-1.jpg',
  rej7: '2026/03/rej7-1.jpg',
  rej8: '2026/03/rej8-1.jpg',
  rej9: '2026/03/rej9-1.jpg',
  adjust: '2026/03/756705943957799-2.jpg',
  seal: '2026/03/uszczelki-2.jpg',
  glass: '2026/03/service3.jpg',
  handle: '2026/03/service4.jpg',
  hinge: '2026/03/service5.jpg',
  fittings: '2026/03/service6.jpg',
  maintenance: '2026/03/service7.jpg',
  shutter: '2026/03/service8.jpg',
  roof: '2026/03/service9.jpg',
  diagnostic: '2026/03/diagnostic.jpg',
  'post-faults': '2026/03/zdejmowanie-okna-z-zawiasow.jpg',
  'post-season': '2026/03/post.jpg',
}
for (const [name, p] of Object.entries(photos)) {
  const buf = await site(p)
  const meta = await sharp(buf).metadata()
  await sharp(buf).flatten({ background: '#ffffff' }).resize({ width: Math.min(1400, meta.width) }).webp({ quality: 80 }).toFile(path.join(out, `${name}.webp`))
  await sharp(buf).flatten({ background: '#ffffff' }).resize(640, 480, { fit: 'cover' }).webp({ quality: 76 }).toFile(path.join(out, `${name}-sm.webp`))
  console.log(`  ${name}  ${meta.width}×${meta.height}`)
}

const certs = {
  'cert-winkhaus-service': '2026/03/sertyfikat-wink-haus-linkevich.jpg',
  'cert-winkhaus': '2026/03/sertyfikat-linkevich.jpg',
  'cert-fakro': '2026/03/sertyfikat-fakro-linkevich.jpg',
  'cert-krishome': '2026/03/certyfikatdl1.jpg',
}
for (const [name, p] of Object.entries(certs)) {
  const buf = await site(p)
  await sharp(buf).resize({ width: 1100, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(out, `${name}.webp`))
  await sharp(buf).resize(420, 594, { fit: 'cover', position: 'top' }).webp({ quality: 74 }).toFile(path.join(out, `${name}-sm.webp`))
  console.log(`  ${name}`)
}

const brands = { roto: 'roto', winkhaus: 'winks', veka: 'veka', kbe: 'kbe', rehau: 'rehau', maco: 'maco', velux: 'velux', schuco: 'schuco' }
for (const [id, file] of Object.entries(brands)) {
  const buf = await site(`2026/03/${file}.png`)
  await sharp(buf).trim().resize({ height: 80, withoutEnlargement: true }).png().toFile(path.join(pub, 'brands', `${id}.png`))
}
console.log('  brands')

const view = await download(VIEW, path.join(raw, 'view-poznan.jpg'))
await blueHour(sharp(view).resize({ width: 2400 })).webp({ quality: 74 }).toFile(path.join(out, 'view.webp'))
await blueHour(sharp(view).resize({ width: 1100, height: 1500, fit: 'cover', position: 'centre' })).webp({ quality: 72 }).toFile(path.join(out, 'view-sm.webp'))
const rynek = await download(RYNEK, path.join(raw, 'rynek.jpg'))
await blueHour(sharp(rynek).resize({ width: 1800 })).modulate({ brightness: 0.7 }).webp({ quality: 70 }).toFile(path.join(out, 'rynek.webp'))
console.log('  view, rynek')

const icon = fs.readFileSync(path.join(pub, 'favicon.svg'))
for (const [file, size] of [['favicon-32.png', 32], ['favicon-192.png', 192], ['apple-touch-icon.png', 180], ['logo.png', 512]]) {
  await sharp(icon, { density: 600 }).resize(size, size).png().toFile(path.join(pub, file))
}
console.log('  favicons, logo.png')

const bg = await blueHour(sharp(view).resize(1200, 630, { fit: 'cover' })).toBuffer()
const overlay = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#0a1626" stop-opacity=".95"/><stop offset=".6" stop-color="#0a1a33" stop-opacity=".65"/><stop offset="1" stop-color="#0a1a33" stop-opacity=".1"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="760" y="90" width="340" height="450" rx="10" fill="none" stroke="#f4f7fb" stroke-width="22"/>
  <path d="M930 90v450" stroke="#f4f7fb" stroke-width="16"/>
  <rect x="905" y="300" width="12" height="54" rx="6" fill="#f4f7fb"/>
  <g transform="translate(80 170)">
    <text x="0" y="70" font-family="Georgia, serif" font-size="78" letter-spacing="10" fill="#f4f1ea">LIWSERWIS</text>
    <text x="0" y="150" font-family="Arial, sans-serif" font-size="40" fill="#f4f7fb">Naprawa okien i drzwi PCV</text>
    <text x="0" y="210" font-family="Arial, sans-serif" font-size="30" fill="#d8b46a">Gwarancja do 24 mies. · Wielkopolska</text>
  </g>
</svg>`)
await sharp(bg).composite([{ input: overlay }]).jpeg({ quality: 84 }).toFile(path.join(pub, 'og-image.jpg'))
console.log('  og-image.jpg')
