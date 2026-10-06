import { useEffect, useState } from 'react'
import { brand, tel } from '../config.js'
import { langPath, useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'
import LangSwitcher from './LangSwitcher.jsx'
import Logo from './Logo.jsx'

// Шапка как в референсе: тонкая служебная строка (часы, телефон, язык) + строка с логотипом,
// навигацией капителью и прямоугольной золотой кнопкой
export default function Header() {
  const { t, lang, path } = useLang()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`header${open ? ' is-open' : ''}`}>
      <div className="header__util">
        <div className="header__row">
          <p className="header__note">
            <Icon name="clock" size={14} /> {t.contact.hoursValue}
            <span aria-hidden="true">·</span>
            <Icon name="pin" size={14} /> {t.nav.area}
          </p>
          <div className="header__util-end">
            <a href={tel} className="header__tel">
              <Icon name="phone" size={14} /> {brand.phone}
            </a>
            <LangSwitcher />
          </div>
        </div>
      </div>

      <div className="header__main">
        <div className="header__row">
          <a className="header__logo" href={langPath(lang)} aria-label={`${brand.name} — ${t.nav.home}`}>
            <Logo />
          </a>

          <nav className="nav" id="site-nav" aria-label={t.nav.menu}>
            <ul>
              {t.nav.links.map(([href, label]) => (
                <li key={href}>
                  <a href={href} aria-current={href === path ? 'page' : undefined} onClick={() => setOpen(false)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a className="nav__tel" href={tel}>
              <Icon name="phone" size={18} /> {brand.phone}
            </a>
          </nav>

          <div className="header__actions">
            <a className="btn btn--sun header__call" href={tel} aria-label={`${t.nav.cta}: ${brand.phone}`}>
              <Icon name="phone" size={16} />
              <span>{t.nav.cta}</span>
            </a>
            <button
              type="button"
              className="burger"
              aria-expanded={open}
              aria-controls="site-nav"
              aria-label={open ? t.nav.close : t.nav.menu}
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
