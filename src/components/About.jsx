import { brands, img } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'
import SectionHead from './SectionHead.jsx'

export default function About() {
  const { t } = useLang()
  const a = t.about
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container panel about">
        <div className="about__text">
          <SectionHead id="about-title" eyebrow={a.eyebrow} title={a.title} />
          {a.text.map((p) => (
            <p key={p} className="about__p" data-reveal>
              {p}
            </p>
          ))}
          <ul className="stats" data-reveal>
            {a.stats.map((s) => (
              <li key={s.label}>
                <strong>
                  {s.value}
                  {s.unit && <small>{s.unit}</small>}
                </strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <figure className="about__media" data-reveal>
          <img src={img('adjust')} alt={t.services.items.adjust.name} width="793" height="516" loading="lazy" decoding="async" />
          <figcaption className="about__badge">
            <Icon name="shield" size={22} /> {a.winkhaus}
          </figcaption>
        </figure>

        <div className="brands">
          <p className="brands__title">{a.brandsTitle}</p>
          <div className="marquee">
            <ul className="marquee__track">
              {[...brands, ...brands].map((b, i) => (
                <li key={i} aria-hidden={i >= brands.length ? 'true' : undefined}>
                  <img src={`/brands/${b.id}.png`} alt={b.name} height="40" loading="lazy" decoding="async" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
