import { brand, tel, waLink } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

// Шапка внутренней страницы: хлебные крошки (BreadcrumbList в seo.js строится из тех же crumbs), H1, лид, CTA
export default function PageHero({ crumbs, title, lead, facts, image, children }) {
  const { t } = useLang()
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <div className={`container panel panel--dark page-hero__box${image ? ' page-hero__box--media' : ''}`}>
        <div className="page-hero__text">
          <Breadcrumbs crumbs={crumbs} />
          <h1 id="page-title" className="page-hero__title">
            {title}
          </h1>
          {lead && <p className="page-hero__lead">{lead}</p>}
          {facts && (
            <ul className="facts">
              {facts.map(([icon, label]) => (
                <li key={label}>
                  <Icon name={icon} size={18} /> {label}
                </li>
              ))}
            </ul>
          )}
          {children ?? (
            <div className="page-hero__actions">
              <a className="btn btn--sun btn--lg" href={tel}>
                <Icon name="phone" size={20} /> {brand.phone}
              </a>
              <a className="btn btn--wa btn--lg" href={waLink(t.wa.hello)} target="_blank" rel="noopener">
                <Icon name="whatsapp" size={22} /> WhatsApp
              </a>
            </div>
          )}
        </div>
        {image && (
          <figure className="page-hero__media">
            <img src={image.src} alt={image.alt} width="640" height="480" fetchPriority="high" decoding="async" />
          </figure>
        )}
      </div>
    </section>
  )
}

export function Breadcrumbs({ crumbs }) {
  const { t } = useLang()
  return (
    <nav className="crumbs" aria-label={t.nav.crumbs}>
      <ol>
        {crumbs.map(([label, href], i) => (
          <li key={label}>
            {i < crumbs.length - 1 ? <a href={href}>{label}</a> : <span aria-current="page">{label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
