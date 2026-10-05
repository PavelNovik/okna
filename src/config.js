// Данные Liwserwis (с liwserwis.com, октябрь 2026). Тексты — в src/i18n/*.js
// __SITE_URL__ подставляет Vite; при запуске из node (scripts/fetch-images.js) его нет.
const envSiteUrl = typeof __SITE_URL__ !== 'undefined' ? __SITE_URL__ : ''

export const brand = {
  name: 'Liwserwis',
  fullName: 'Liwserwis — naprawa okien i drzwi',
  // TODO: проверить домен перед запуском (или задать SITE_URL при сборке)
  siteUrl: envSiteUrl || 'https://liwserwis.com',
  phone: '+48 453 506 360',
  // WhatsApp на сайте — отдельный номер
  whatsapp: '48886227715',
  whatsappDisplay: '+48 886 227 715',
  email: 'liwserwis@gmail.com',
  // Реквизиты — со «Świadectwa autoryzowanego serwisu» Winkhaus на сайте
  legalName: 'LIVANS sp. z o.o.',
  street: 'ul. Ułańska 15/93',
  postalCode: '60-748',
  city: 'Poznań',
  region: 'wielkopolskie',
  country: 'PL',
  hours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
    },
  ],
  rating: { value: '5,0', count: 28 },
}

export const socials = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/liwserwis_livans' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61579170192348' },
  { id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@liwserwis' },
]

export const googleReviews = 'https://www.google.com/search?q=Liwserwis+naprawa+okien'

export const tel = `tel:${brand.phone.replace(/\s/g, '')}`
export const waLink = (text = '') => `https://wa.me/${brand.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
export const mailLink = (subject = '', body = '') => {
  const q = [subject && `subject=${encodeURIComponent(subject)}`, body && `body=${encodeURIComponent(body)}`].filter(Boolean).join('&')
  return `mailto:${brand.email}${q ? `?${q}` : ''}`
}

export const img = (name, size) => `/images/${name}${size === 'sm' ? '-sm' : ''}.webp`

// Города, перечисленные на сайте («i inne»)
export const cities = ['Poznań', 'Kalisz', 'Piła', 'Leszno', 'Gniezno']

// Услуги (порядок как на сайте); иконка = id в Icon.jsx; тексты — t.services.items[id]
export const services = ['adjust', 'glass', 'hinge', 'fittings', 'handle', 'maintenance', 'seal', 'shutter', 'roof']

// Реализации — фото с liwserwis.com (public/images/<id>.webp); подписи — t.gallery.items[id]
export const gallery = ['rej1', 'rej2', 'rej3', 'rej4', 'rej5', 'rej6', 'rej7', 'rej8', 'rej9']

// Сертификаты — фото с сайта (вертикальные); подписи — t.certs.items[i]
export const certs = ['cert-winkhaus-service', 'cert-winkhaus', 'cert-fakro', 'cert-krishome']

// Профильные системы и фурнитура — логотипы с сайта (public/brands/<id>.png)
export const brands = [
  { id: 'roto', name: 'Roto' },
  { id: 'winkhaus', name: 'Winkhaus' },
  { id: 'veka', name: 'VEKA' },
  { id: 'kbe', name: 'KBE' },
  { id: 'rehau', name: 'REHAU' },
  { id: 'maco', name: 'MACO' },
  { id: 'velux', name: 'VELUX' },
  { id: 'schuco', name: 'Schüco' },
]

// Статьи блога — на текущем сайте
export const posts = [
  { img: 'post-faults', href: 'https://liwserwis.com/rodzaje-usterek-okien-plastikowych-i-sposoby-ich-zapobiegania/' },
  { img: 'post-season', href: 'https://liwserwis.com/tryb-zimowy-i-letni-jak-dziala-sezonowaregulacja-okien/' },
]

// Разделы в меню (якоря)
export const navIds = ['about', 'services', 'gallery', 'reviews', 'faq', 'contact']
