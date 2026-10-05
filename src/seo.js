import { brand, cities, img, services, socials } from './config.js'
import { dictionaries, languages, defaultLang, langPath } from './i18n/index.jsx'

const abs = (path) => brand.siteUrl.replace(/\/$/, '') + path

// Schema.org: сервис окон и дверей (HomeAndConstructionBusiness) с зоной обслуживания, услугами и FAQ —
// для Google, карт и ИИ-ассистентов
export function jsonLd(lang) {
  const t = dictionaries[lang]
  const url = abs(langPath(lang))
  const bizId = abs('/#business')
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HomeAndConstructionBusiness',
        '@id': bizId,
        name: brand.fullName,
        legalName: brand.legalName,
        description: t.meta.description,
        url: abs('/'),
        logo: abs('/logo.png'),
        image: [abs('/og-image.jpg'), abs(img('rej1')), abs(img('rej4'))],
        telephone: brand.phone,
        email: brand.email,
        sameAs: socials.map((s) => s.href),
        priceRange: '$',
        currenciesAccepted: 'PLN',
        areaServed: [{ '@type': 'AdministrativeArea', name: 'Wielkopolska' }, ...cities.map((name) => ({ '@type': 'City', name }))],
        knowsLanguage: languages,
        address: {
          '@type': 'PostalAddress',
          streetAddress: brand.street,
          postalCode: brand.postalCode,
          addressLocality: brand.city,
          addressRegion: brand.region,
          addressCountry: brand.country,
        },
        openingHoursSpecification: brand.hours.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.days,
          opens: h.opens,
          closes: h.closes,
        })),
        hasCredential: t.certs.items.map((c) => ({ '@type': 'EducationalOccupationalCredential', name: c.title, description: c.text })),
        potentialAction: {
          '@type': 'CommunicateAction',
          target: { '@type': 'EntryPoint', urlTemplate: `https://wa.me/${brand.whatsapp}`, actionPlatform: 'https://schema.org/MobileWebPlatform' },
          name: t.wa.label,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: t.services.title,
          itemListElement: services.map((id) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: t.services.items[id].name,
              description: t.services.items[id].text,
              provider: { '@id': bizId },
              areaServed: { '@type': 'AdministrativeArea', name: 'Wielkopolska' },
            },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        '@id': url + '#faq',
        inLanguage: lang,
        mainEntity: t.faq.items.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'WebPage',
        '@id': url + '#webpage',
        url,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: lang,
        about: { '@id': bizId },
        primaryImageOfPage: abs('/og-image.jpg'),
        isPartOf: { '@type': 'WebSite', name: brand.fullName, url: abs('/') },
      },
    ],
  }
}

function headTags(lang) {
  const t = dictionaries[lang]
  const { title, description } = t.meta
  const url = abs(langPath(lang))
  const image = abs('/og-image.jpg')
  return [
    ['meta', { name: 'description', content: description }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' }],
    ['meta', { name: 'geo.region', content: 'PL-30' }],
    ['meta', { name: 'geo.placename', content: brand.city }],
    ['link', { rel: 'canonical', href: url }],
    ...languages.map((l) => ['link', { rel: 'alternate', hreflang: l, href: abs(langPath(l)) }]),
    ['link', { rel: 'alternate', hreflang: 'x-default', href: abs(langPath(defaultLang)) }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: brand.name }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:image', content: image }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:locale', content: t.locale }],
    ...languages
      .filter((l) => l !== lang)
      .map((l) => ['meta', { property: 'og:locale:alternate', content: dictionaries[l].locale }]),
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: image }],
    ['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd(lang)).replace(/</g, '\\u003c')],
  ]
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function renderHead(lang) {
  const tags = headTags(lang).map(([tag, attrs, text]) => {
    const a = Object.entries(attrs).map(([k, v]) => ` ${k}="${esc(v)}"`).join('')
    return tag === 'script' ? `<script data-seo${a}>${text}</script>` : `<${tag} data-seo${a}>`
  })
  return [`<title>${esc(dictionaries[lang].meta.title)}</title>`, ...tags].join('\n    ')
}

export function applyHead(lang) {
  document.documentElement.lang = lang
  document.title = dictionaries[lang].meta.title
  document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove())
  const frag = document.createDocumentFragment()
  headTags(lang).forEach(([tag, attrs, text]) => {
    const el = document.createElement(tag)
    el.setAttribute('data-seo', '')
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
    if (text) el.textContent = text
    frag.appendChild(el)
  })
  document.head.appendChild(frag)
}

export function robotsTxt() {
  const aiBots = [
    'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
    'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot',
    'CCBot', 'meta-externalagent', 'DuckAssistBot',
  ]
  return [
    'User-agent: *',
    'Allow: /',
    '',
    '# AI search & assistants are welcome',
    ...aiBots.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']),
    `Sitemap: ${abs('/sitemap.xml')}`,
    '',
  ].join('\n')
}

export function sitemapXml() {
  const today = new Date().toISOString().slice(0, 10)
  const alternates = [
    ...languages.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(langPath(l))}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(langPath(defaultLang))}"/>`,
  ].join('\n')
  const urls = languages.map(
    (l) => `  <url>
    <loc>${abs(langPath(l))}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${l === defaultLang ? '1.0' : '0.9'}</priority>
${alternates}
  </url>`
  )
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
}

// llms.txt — краткое описание фирмы в Markdown для языковых моделей (llmstxt.org)
export function llmsTxt() {
  const pl = dictionaries.pl
  const de = dictionaries.de
  return [
    `# ${brand.name}`,
    '',
    `> ${pl.meta.description}`,
    '',
    `${brand.name} (${brand.legalName}, ${brand.city}) repairs, adjusts and services PVC and wooden windows and doors in the Greater Poland region (Wielkopolska): ${cities.join(', ')} and other towns. Warranty up to 24 months, free quotes, most faults fixed on the day of the call, open daily 8:00-20:00. Authorised WINKHAUS fittings service; FAKRO-trained. Site languages: Polish and German.`,
    '',
    '## Pages',
    '',
    ...languages.map((l) => `- [${dictionaries[l].name}](${abs(langPath(l))}): ${dictionaries[l].meta.title}`),
    '',
    '## Services',
    '',
    ...services.map((id) => `- ${pl.services.items[id].name} (${de.services.items[id].name}): ${pl.services.items[id].text}`),
    `- ${pl.diag.title}: ${pl.diag.lead}`,
    '',
    '## FAQ',
    '',
    ...pl.faq.items.flatMap((f) => [`### ${f.q}`, '', f.a, '']),
    '## Contact',
    '',
    `- Phone: ${brand.phone}`,
    `- WhatsApp: ${brand.whatsappDisplay} (https://wa.me/${brand.whatsapp})`,
    `- Email: ${brand.email}`,
    `- Hours: ${pl.contact.hoursValue}`,
    ...socials.map((s) => `- ${s.label}: ${s.href}`),
    '',
  ].join('\n')
}
