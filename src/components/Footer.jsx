import { brand, mailLink, navIds, socials, tel, waLink } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import { openCookieSettings } from './CookieConsent.jsx'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'

export default function Footer() {
  const { t } = useLang()
  const f = t.footer
  const year = 2026
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo />
          <p>{f.tagline}</p>
          <ul className="socials">
            {socials.map((s) => (
              <li key={s.id}>
                <a href={s.href} target="_blank" rel="noopener" aria-label={s.label}>
                  <Icon name={s.id} size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label={t.nav.menu}>
          <ul className="footer__nav">
            {navIds.map((id) => (
              <li key={id}>
                <a href={`#${id}`}>{t.nav.items[id]}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer__contact">
          <p>
            <a href={tel}>{brand.phone}</a>
          </p>
          <p>
            <a href={waLink(t.wa.hello)} target="_blank" rel="noopener">
              WhatsApp {brand.whatsappDisplay}
            </a>
          </p>
          <p>
            <a href={mailLink()}>{brand.email}</a>
          </p>
          <p>{t.contact.hoursValue}</p>
          <p className="footer__ids">
            {brand.legalName} · {brand.street}, {brand.postalCode} {brand.city}
          </p>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>
          © {year} {brand.name}. {f.rights}
        </p>
        <p className="footer__meta">
          <button type="button" className="link-btn" onClick={openCookieSettings}>
            {f.cookies}
          </button>
          <span>{f.photos}</span>
          <a href="#main">{f.top} ↑</a>
        </p>
      </div>
    </footer>
  )
}
