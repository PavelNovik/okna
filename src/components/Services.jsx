import { img, services } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'
import SectionHead from './SectionHead.jsx'

export default function Services() {
  const { t, ask } = useLang()
  const s = t.services
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="panel panel--head">
          <SectionHead id="services-title" eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
        </div>
        <ul className="services">
          {services.map((id, i) => {
            const item = s.items[id]
            return (
              <li key={id} className="service panel" data-reveal style={{ '--d': `${(i % 3) * 70}ms` }}>
                <div className="service__media">
                  <img src={img(id, 'sm')} alt="" width="640" height="480" loading="lazy" decoding="async" />
                  <span className="service__icon">
                    <Icon name={id} size={24} />
                  </span>
                </div>
                <div className="service__body">
                  <h3>{item.name}</h3>
                  <p>{item.text}</p>
                  <button type="button" className="link-arrow" onClick={() => ask(id)}>
                    {s.ask} <Icon name="arrow" size={18} />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
