import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

export default function Perks() {
  const { t } = useLang()
  return (
    <section className="perks-wrap" id="perks" aria-label={t.hero.free}>
      <ul className="container perks">
        {t.perks.map((p, i) => (
          <li key={p.title} className="perk panel" data-reveal style={{ '--d': `${i * 70}ms` }}>
            <span className="perk__icon">
              <Icon name={p.icon} size={26} />
            </span>
            <h2>{p.title}</h2>
            <p>{p.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
