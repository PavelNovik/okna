import { img } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'
import SectionHead from './SectionHead.jsx'

export default function Diagnostics() {
  const { t } = useLang()
  const d = t.diag
  return (
    <section className="section" id="diagnostics" aria-labelledby="diag-title">
      <div className="container panel panel--dark diag">
        <div className="diag__media" data-reveal>
          <img src={img('rej4')} alt={t.gallery.items.rej4} width="1192" height="900" loading="lazy" decoding="async" />
          <img className="diag__inset" src={img('diagnostic', 'sm')} alt="" width="640" height="480" loading="lazy" decoding="async" />
        </div>
        <div className="diag__text">
          <SectionHead id="diag-title" eyebrow={d.eyebrow} title={d.title} lead={d.lead} />
          <ul className="diag__list">
            {d.items.map((it, i) => (
              <li key={it.title} data-reveal style={{ '--d': `${i * 80}ms` }}>
                <span className="diag__icon">
                  <Icon name={it.icon} size={24} />
                </span>
                <div>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
