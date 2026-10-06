import { img } from '../config.js'
import { services, servicePath } from '../content/services.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'
import SectionHead from './SectionHead.jsx'

// Карточки услуг. PL — ссылка на страницу услуги; DE — кнопка «запросить» (страниц услуг на немецком нет).
// only — список id (например, связанные услуги на странице услуги); headless — без заголовка секции.
export default function Services({ only, headless = false, headingLevel = 3 }) {
  const { t, lang, ask } = useLang()
  const s = t.services
  const list = only ? only.map((id) => services.find((x) => x.id === id)) : services
  const H = `h${headingLevel}`
  const price = (x) => (x.from ? `${s.from} ${x.from} ${s.currency}` : s.custom)
  const cards = (
    <ul className="services">
      {list.map((x, i) => {
        const item = s.items[x.id]
        const linked = lang === 'pl'
        return (
          <li key={x.id} className={`service panel${linked ? ' service--link' : ''}`} data-reveal style={{ '--d': `${(i % 3) * 70}ms` }}>
            <div className="service__media">
              <img src={img(x.img, 'sm')} alt="" width="640" height="480" loading="lazy" decoding="async" />
              <span className="service__icon">
                <Icon name={x.id} size={24} />
              </span>
              <span className="service__price">{price(x)}</span>
            </div>
            <div className="service__body">
              <H>
                {linked ? (
                  <a className="service__link" href={servicePath(x)}>
                    {x.name}
                  </a>
                ) : (
                  item.name
                )}
              </H>
              <p>{linked ? x.short : item.text}</p>
              {linked ? (
                <span className="link-arrow" aria-hidden="true">
                  {s.more} <Icon name="arrow" size={18} />
                </span>
              ) : (
                <button type="button" className="link-arrow" onClick={() => ask(x.id)}>
                  {s.ask} <Icon name="arrow" size={18} />
                </button>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
  if (headless) return cards
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="panel panel--head">
          <SectionHead id="services-title" eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
        </div>
        {cards}
        {lang === 'pl' && (
          <p className="section-more">
            <a className="btn btn--light" href="/cennik/">
              {s.all} <Icon name="arrow" size={18} />
            </a>
          </p>
        )}
      </div>
    </section>
  )
}
