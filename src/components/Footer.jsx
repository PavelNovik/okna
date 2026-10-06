import { brand, mailLink, socials, tel, waLink } from '../config.js'
import { services, servicePath } from '../content/services.js'
import { useLang } from '../i18n/index.jsx'
import { openCookieSettings } from './CookieConsent.jsx'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'

export default function Footer() {
  const { t, lang } = useLang()
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

        <nav aria-label={f.services}>
          <p className="footer__title">{f.services}</p>
          <ul className="footer__nav">
            {services.map((s) => (
              <li key={s.id}>
                {/* страницы услуг есть только на польском */}
                <a href={servicePath(s)} hrefLang={lang === 'pl' ? undefined : 'pl'}>
                  {t.services.items[s.id].name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={f.company}>
          <p className="footer__title">{f.company}</p>
          <ul className="footer__nav">
            {t.nav.links.map(([href, label]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
            <li>
              <a href="/polityka-prywatnosci/" hrefLang={lang === 'pl' ? undefined : 'pl'}>
                {f.privacy}
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer__contact">
          <p className="footer__title">{f.contact}</p>
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
            {brand.legalName}
            <br />
            {brand.street}, {brand.postalCode} {brand.city}
            <br />
            NIP {brand.nip}
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
