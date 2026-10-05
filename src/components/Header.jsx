import { useEffect, useState } from 'react'
import { brand, navIds, tel } from '../config.js'
import { langPath, useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'
import LangSwitcher from './LangSwitcher.jsx'
import Logo from './Logo.jsx'

export default function Header() {
  const { t, lang } = useLang()
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
      <div className="header__inner">
        <a className="header__logo" href={langPath(lang)} aria-label="Liwserwis">
          <Logo />
        </a>

        <nav className="nav" id="site-nav" aria-label={t.nav.menu}>
          <ul>
            {navIds.map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setOpen(false)}>
                  {t.nav.items[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <LangSwitcher />
          <a className="btn btn--sun btn--small header__call" href={tel} aria-label={`${t.nav.cta}: ${brand.phone}`}>
            <Icon name="phone" size={18} />
            <span>{brand.phone}</span>
          </a>
          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  )
}
