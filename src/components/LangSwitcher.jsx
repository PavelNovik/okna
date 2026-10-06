import { dictionaries, languages, langPath, useLang } from '../i18n/index.jsx'

// Обычные ссылки: PL — весь сайт, DE — посадочная /de/
export default function LangSwitcher() {
  const { lang, t } = useLang()
  return (
    <nav className="lang" aria-label={t.nav.lang}>
      <ul>
        {languages.map((l) => (
          <li key={l}>
            <a
              href={langPath(l)}
              hrefLang={l}
              lang={l}
              aria-current={l === lang ? 'true' : undefined}
              aria-label={dictionaries[l].name}
              className={l === lang ? 'is-active' : ''}
            >
              {dictionaries[l].label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
