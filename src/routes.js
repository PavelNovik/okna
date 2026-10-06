// Все страницы сайта. Польский — основной язык (все страницы), немецкий — одна посадочная /de/
// (отдельные немецкие страницы услуг не делаем: спроса на немецком в Познани не видно, а тонкие
// машинные копии вредят больше, чем помогают). Пререндер: scripts/prerender.js
import { services, servicePath } from './content/services.js'
import { posts, postPath } from './content/posts.js'

export const routes = [
  { path: '/', page: 'home', lang: 'pl' },
  { path: '/de/', page: 'home', lang: 'de' },
  { path: '/uslugi/', page: 'services', lang: 'pl' },
  ...services.map((s) => ({ path: servicePath(s), page: 'service', lang: 'pl', service: s })),
  { path: '/cennik/', page: 'prices', lang: 'pl' },
  { path: '/o-nas/', page: 'about', lang: 'pl' },
  { path: '/kontakt/', page: 'contact', lang: 'pl' },
  { path: '/porady/', page: 'blog', lang: 'pl' },
  ...posts.map((p) => ({ path: postPath(p), page: 'post', lang: 'pl', post: p })),
  { path: '/polityka-prywatnosci/', page: 'privacy', lang: 'pl' },
]

export const notFoundRoute = { path: '/404/', page: 'notFound', lang: 'pl', noindex: true }

const normalize = (p) => {
  const clean = (p || '/').split(/[?#]/)[0]
  return clean.endsWith('/') ? clean : `${clean}/`
}

export const findRoute = (path) => routes.find((r) => r.path === normalize(path)) ?? notFoundRoute

// Старые адреса WordPress → новые (301 в vercel.json, генерируется в scripts/prerender.js)
export const redirects = [
  ['/service/', '/uslugi/'],
  ...services.filter((s) => s.old).map((s) => [s.old, servicePath(s)]),
  ...posts.map((p) => [p.old, postPath(p)]),
  ['/privacy-policy/', '/polityka-prywatnosci/'],
  ['/thank-you/', '/kontakt/'],
  ['/category/:slug*', '/porady/'],
  ['/author/:slug*', '/o-nas/'],
  ['/feed/', '/porady/'],
]
