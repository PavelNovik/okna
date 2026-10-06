import { brand, cities, img, socials } from './config.js'
import { services, servicePath } from './content/services.js'
import { posts, postPath } from './content/posts.js'
import { pages } from './content/pages.js'
import { dictionaries, languages, defaultLang, langPath } from './i18n/index.jsx'
import { routes } from './routes.js'

const abs = (path) => brand.siteUrl.replace(/\/$/, '') + path
const bizId = () => abs('/#business')

// ---------- Мета страницы ----------
export function routeMeta(route) {
  const t = dictionaries[route.lang]
  const home = (path) => [t.nav.home, path]
  switch (route.page) {
    case 'home':
      return { title: t.meta.title, description: t.meta.description, image: '/og-image.jpg', crumbs: null }
    case 'service': {
      const s = route.service
      return {
        title: s.title,
        description: s.description,
        image: img(s.img),
        crumbs: [home('/'), ['Usługi', '/uslugi/'], [s.name, route.path]],
      }
    }
    case 'post': {
      const p = route.post
      return {
        title: p.metaTitle,
        description: p.description,
        image: img(p.img),
        type: 'article',
        crumbs: [home('/'), ['Porady', '/porady/'], [p.title, route.path]],
      }
    }
    default: {
      const p = pages[route.page]
      return {
        title: p.title,
        description: p.description,
        image: '/og-image.jpg',
        crumbs: [home('/'), [p.crumb, route.path]],
      }
    }
  }
}

// ---------- Schema.org ----------
// Одна сущность фирмы (@id …/#business) на всех страницах; услуги, статьи и страницы ссылаются на неё.
// AggregateRating/Review не размечаем: отзывы с Google нельзя переносить в разметку,
// а self-serving отзывы LocalBusiness Google не показывает в расширенных результатах.
function business(t) {
  return {
    '@type': 'HomeAndConstructionBusiness',
    '@id': bizId(),
    name: brand.name,
    legalName: brand.legalName,
    description: dictionaries.pl.meta.description,
    url: abs('/'),
    logo: abs('/logo.png'),
    image: [abs('/og-image.jpg'), abs(img('rej1')), abs(img('adjust'))],
    telephone: brand.phone.replace(/\s/g, ''),
    email: brand.email,
    taxID: brand.nip,
    priceRange: 'od 30 zł',
    currenciesAccepted: 'PLN',
    address: {
      '@type': 'PostalAddress',
      streetAddress: brand.street,
      postalCode: brand.postalCode,
      addressLocality: brand.city,
      addressRegion: brand.region,
      addressCountry: brand.country,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'województwo wielkopolskie' },
      ...cities.map((name) => ({ '@type': 'City', name })),
    ],
    openingHoursSpecification: brand.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: socials.map((s) => s.href),
    knowsLanguage: ['pl'],
    hasCredential: dictionaries.pl.certs.items.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.title,
      description: c.text,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Usługi serwisu okien i drzwi',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: abs(servicePath(s)) },
      })),
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: brand.phone.replace(/\s/g, ''),
      availableLanguage: ['pl'],
      areaServed: 'PL',
    },
  }
}

const website = () => ({
  '@type': 'WebSite',
  '@id': abs('/#website'),
  url: abs('/'),
  name: brand.name,
  inLanguage: 'pl',
  publisher: { '@id': bizId() },
})

const breadcrumbs = (url, crumbs) => ({
  '@type': 'BreadcrumbList',
  '@id': url + '#breadcrumbs',
  itemListElement: crumbs.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
})

const faqPage = (url, lang, items) => ({
  '@type': 'FAQPage',
  '@id': url + '#faq',
  inLanguage: lang,
  mainEntity: items.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
})

const pageTypes = { about: 'AboutPage', contact: 'ContactPage', services: 'CollectionPage', blog: 'CollectionPage' }

export function jsonLd(route) {
  const t = dictionaries[route.lang]
  const meta = routeMeta(route)
  const url = abs(route.path)
  const graph = [business(t), website()]
  const page = {
    '@type': pageTypes[route.page] ?? 'WebPage',
    '@id': url + '#webpage',
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: route.lang,
    isPartOf: { '@id': abs('/#website') },
    about: { '@id': bizId() },
    primaryImageOfPage: abs(meta.image),
  }
  graph.push(page)
  if (meta.crumbs) {
    graph.push(breadcrumbs(url, meta.crumbs))
    page.breadcrumb = { '@id': url + '#breadcrumbs' }
  }
  if (route.page === 'home') graph.push(faqPage(url, route.lang, t.faq.items))
  if (route.page === 'service') {
    const s = route.service
    graph.push({
      '@type': 'Service',
      '@id': url + '#service',
      name: s.name,
      description: s.lead,
      serviceType: s.name,
      url,
      image: abs(img(s.img)),
      provider: { '@id': bizId() },
      areaServed: { '@type': 'AdministrativeArea', name: 'województwo wielkopolskie' },
      ...(s.from && {
        offers: {
          '@type': 'Offer',
          priceCurrency: 'PLN',
          priceSpecification: { '@type': 'PriceSpecification', minPrice: s.from, priceCurrency: 'PLN' },
          url: url + '#cennik',
        },
      }),
    })
    page.mainEntity = { '@id': url + '#service' }
    graph.push(faqPage(url, 'pl', s.faq.map(([q, a]) => ({ q, a }))))
  }
  if (route.page === 'post') {
    const p = route.post
    graph.push({
      '@type': 'BlogPosting',
      '@id': url + '#article',
      headline: p.title,
      description: p.description,
      image: abs(img(p.img)),
      datePublished: p.date,
      inLanguage: 'pl',
      author: { '@id': bizId() },
      publisher: { '@id': bizId() },
      mainEntityOfPage: { '@id': url + '#webpage' },
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

// ---------- <head> ----------
function headTags(route) {
  const t = dictionaries[route.lang]
  const { title, description, image, type } = routeMeta(route)
  const url = abs(route.path)
  const imageUrl = abs(image)
  const isHome = route.page === 'home'
  const tags = [
    ['meta', { name: 'description', content: description }],
    [
      'meta',
      {
        name: 'robots',
        content: route.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1',
      },
    ],
  ]
  if (!route.noindex) tags.push(['link', { rel: 'canonical', href: url }])
  // hreflang — только между польской и немецкой главной (у остальных страниц нет перевода)
  if (isHome) {
    tags.push(
      ...languages.map((l) => ['link', { rel: 'alternate', hreflang: l, href: abs(langPath(l)) }]),
      ['link', { rel: 'alternate', hreflang: 'x-default', href: abs(langPath(defaultLang)) }]
    )
  }
  tags.push(
    ['meta', { property: 'og:type', content: type ?? 'website' }],
    ['meta', { property: 'og:site_name', content: brand.name }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:image', content: imageUrl }],
    ['meta', { property: 'og:locale', content: t.locale }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: imageUrl }]
  )
  if (image === '/og-image.jpg') {
    tags.push(['meta', { property: 'og:image:width', content: '1200' }], ['meta', { property: 'og:image:height', content: '630' }])
  }
  if (isHome) {
    tags.push(
      ...languages
        .filter((l) => l !== route.lang)
        .map((l) => ['meta', { property: 'og:locale:alternate', content: dictionaries[l].locale }])
    )
  }
  if (route.page === 'post') tags.push(['meta', { property: 'article:published_time', content: route.post.date }])
  if (!route.noindex) {
    tags.push(['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd(route)).replace(/</g, '\\u003c')])
  }
  return tags
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function renderHead(route) {
  const tags = headTags(route).map(([tag, attrs, text]) => {
    const a = Object.entries(attrs).map(([k, v]) => ` ${k}="${esc(v)}"`).join('')
    return tag === 'script' ? `<script data-seo${a}>${text}</script>` : `<${tag} data-seo${a}>`
  })
  return [`<title>${esc(routeMeta(route).title)}</title>`, ...tags].join('\n    ')
}

export function applyHead(route) {
  document.documentElement.lang = route.lang
  document.title = routeMeta(route).title
  document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove())
  const frag = document.createDocumentFragment()
  headTags(route).forEach(([tag, attrs, text]) => {
    const el = document.createElement(tag)
    el.setAttribute('data-seo', '')
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
    if (text) el.textContent = text
    frag.appendChild(el)
  })
  document.head.appendChild(frag)
}

// ---------- robots.txt, sitemap.xml, llms.txt ----------
export function robotsTxt() {
  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${abs('/sitemap.xml')}`, ''].join('\n')
}

export function sitemapXml() {
  const today = new Date().toISOString().slice(0, 10)
  const homeAlternates = [
    ...languages.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(langPath(l))}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(langPath(defaultLang))}"/>`,
  ].join('\n')
  const priority = (r) => (r.path === '/' ? '1.0' : r.page === 'service' || r.page === 'prices' ? '0.9' : r.page === 'home' ? '0.6' : '0.7')
  const urls = routes.map(
    (r) => `  <url>
    <loc>${abs(r.path)}</loc>
    <lastmod>${r.post?.date ?? today}</lastmod>
    <priority>${priority(r)}</priority>${r.page === 'home' ? `\n${homeAlternates}` : ''}
  </url>`
  )
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
}

// llms.txt — краткая «визитка» фирмы для языковых моделей (llmstxt.org). Это не фактор ранжирования,
// а удобная выжимка; главное для AI-поиска — тот же контент в HTML страниц и Schema.org.
export function llmsTxt() {
  const pl = dictionaries.pl
  return [
    `# ${brand.name}`,
    '',
    `> ${pl.meta.description}`,
    '',
    `${brand.name} (${brand.legalName}, NIP ${brand.nip}) is a window and door repair service based in ${brand.city}, Poland. It repairs, adjusts and maintains PVC and wooden windows, balcony and terrace doors, external roller shutters and roof windows across the Greater Poland region (${cities.join(', ')} and surrounding towns). Authorised WINKHAUS fittings service; FAKRO roof-window training. Warranty up to 24 months on the service. Open daily 8:00–20:00. Website in Polish (German landing page at /de/).`,
    '',
    '## Services and prices (PLN, from)',
    '',
    ...services.map((s) => `- [${s.name}](${abs(servicePath(s))}): ${s.short} Price: ${s.from ? `from ${s.from} zł` : 'individual quote'}.`),
    '',
    '## Pages',
    '',
    `- [Cennik (prices)](${abs('/cennik/')})`,
    `- [O nas (about)](${abs('/o-nas/')})`,
    `- [Kontakt](${abs('/kontakt/')})`,
    `- [Deutsch](${abs('/de/')})`,
    ...posts.map((p) => `- [${p.title}](${abs(postPath(p))})`),
    '',
    '## FAQ',
    '',
    ...pl.faq.items.flatMap((f) => [`### ${f.q}`, '', f.a, '']),
    '## Contact',
    '',
    `- Phone: ${brand.phone} (daily 8:00–20:00)`,
    `- WhatsApp: ${brand.whatsappDisplay} (https://wa.me/${brand.whatsapp})`,
    `- Email: ${brand.email}`,
    ...socials.map((s) => `- ${s.label}: ${s.href}`),
    '',
  ].join('\n')
}
