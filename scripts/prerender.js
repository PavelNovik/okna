// Пререндер: готовый HTML для каждой страницы (src/routes.js) + 404.html, robots.txt, sitemap.xml, llms.txt.
// Поисковики и AI-краулеры, не исполняющие JS, сразу видят весь контент; в браузере React «оживляет» страницу.
// Также проверяет, что все старые адреса WordPress есть в redirects в vercel.json.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const server = path.resolve('dist-server/entry-server.js')
const { render, renderHead, robotsTxt, sitemapXml, llmsTxt, routes, notFoundRoute, redirects } = await import(
  pathToFileURL(server).href
)

// Шрифт заголовков (Cormorant 500, латиница + польские буквы) — preload: H1 это LCP-элемент
const fonts = fs
  .readdirSync(path.join(dist, 'assets'))
  .filter((f) => /^cormorant-garamond-latin(-ext)?-500-normal-.*\.woff2$/.test(f))
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`)
  .join('\n    ')
const template = fs
  .readFileSync(path.join(dist, 'index.html'), 'utf8')
  .replace('</head>', `  ${fonts}\n  </head>`)
const page = (route) =>
  template
    .replace(/<html lang="[^"]*">/, `<html lang="${route.lang}">`)
    .replace('<!--app-head-->', renderHead(route))
    .replace('<div id="root"></div>', `<div id="root">${render(route.path)}</div>`)
    // фон-пейзаж на главной грузится сразу (LCP), на внутренних страницах preload не нужен
    .replace(route.page === 'home' ? /^$/ : /\s*<link rel="preload" href="\/images\/view[^>]*>/g, '')

for (const route of routes) {
  const dir = path.join(dist, route.path)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), page(route))
}
console.log(`  prerendered ${routes.length} pages`)

fs.writeFileSync(path.join(dist, '404.html'), page(notFoundRoute))
fs.writeFileSync(path.join(dist, 'robots.txt'), robotsTxt())
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemapXml())
fs.writeFileSync(path.join(dist, 'llms.txt'), llmsTxt())
fs.rmSync(path.resolve('dist-server'), { recursive: true, force: true })
console.log('  404.html, robots.txt, sitemap.xml, llms.txt written')

const vercel = JSON.parse(fs.readFileSync(path.resolve('vercel.json'), 'utf8'))
const have = new Set((vercel.redirects ?? []).map((r) => `${r.source} ${r.destination}`))
const missing = redirects.filter(([from, to]) => !have.has(`${from} ${to}`))
if (missing.length) {
  console.warn('  ! vercel.json: нет редиректов:\n' + missing.map(([f, t]) => `    ${f} -> ${t}`).join('\n'))
  process.exitCode = 1
} else console.log(`  redirects ok (${redirects.length})`)
