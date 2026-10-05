import { brand, cities, tel, waLink } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

// Hero «пролёт через окно»: стена с проёмом и ПВХ-рамой поверх фиксированного пейзажа (.scene в App).
// Прогресс прокрутки hero — CSS-переменная --hp на <html> (useEffectsFx): сначала поворачивается ручка
// и створки открываются внутрь, затем комната увеличивается от центра окна — и мы «вылетаем» наружу.
export default function WindowHero() {
  const { t } = useLang()
  const h = t.hero
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__stage">
        <div className="room" aria-hidden="true">
          <div className="win">
            <div className="win__frame">
              <div className="win__sash win__sash--l">
                <div className="win__glass" />
              </div>
              <div className="win__sash win__sash--r">
                <div className="win__glass" />
                <span className="win__handle">
                  <i />
                </span>
              </div>
            </div>
            <div className="win__sill" />
          </div>
          <div className="room__glow" />
        </div>

        <div className="hero__content container">
          <p className="eyebrow eyebrow--light">{h.eyebrow}</p>
          <h1 id="hero-title" className="hero__title">
            {h.title[0]}
            <em>{h.title[1]}</em>
            {h.title[2]}
          </h1>
          <p className="hero__lead">{h.lead}</p>
          <div className="hero__actions">
            <a className="btn btn--sun btn--lg" href={tel}>
              <Icon name="phone" size={20} /> {brand.phone}
            </a>
            <a className="btn btn--wa btn--lg" href={waLink(t.wa.hello)} target="_blank" rel="noopener">
              <Icon name="whatsapp" size={22} /> {h.secondary}
            </a>
          </div>
          <ul className="hero__meta">
            <li>
              <Icon name="clock" size={18} /> {h.hours}
            </li>
            <li>
              <Icon name="tag" size={18} /> <strong>{h.free}</strong>
            </li>
          </ul>
          <ul className="hero__cities" aria-label={t.contact.area}>
            {cities.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <a className="hero__scroll" href="#perks">
          <Icon name="mouse" size={22} />
          <span>{h.scroll}</span>
        </a>
      </div>
    </section>
  )
}
