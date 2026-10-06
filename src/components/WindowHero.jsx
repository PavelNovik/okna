import { brand, tel } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

// Hero «пролёт через окно»: стена с вырезом-маской и ПВХ-рамой поверх фиксированного вида на Познань
// (.scene в App). Прогресс прокрутки hero — CSS-переменная --hp на <html> (useEffectsFx): ручка
// поворачивается, створки открываются внутрь, окно растёт — и мы «вылетаем» в вид на Stary Rynek.
// Подача — как в референсе (Aurelia Residences): антиква капителью, тонкие линии, золотая кнопка.
export default function WindowHero() {
  const { t } = useLang()
  const h = t.hero
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__stage">
        <div className="room" aria-hidden="true">
          <div className="room__wall" />
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
          <p className="hero__place">{h.place}</p>
          <h1 id="hero-title" className="hero__title">
            {h.title[0]}
            <em>{h.title[1]}</em>
            {h.title[2]}
          </h1>
          <p className="hero__lead">{h.lead}</p>
          <div className="hero__actions">
            <a className="btn btn--sun btn--lg" href={tel}>
              <Icon name="phone" size={18} /> {brand.phone}
            </a>
            <a className="btn btn--ghost btn--lg" href="#services">
              {h.explore}
            </a>
          </div>
          <ul className="hero__meta">
            <li>{h.price}</li>
            <li>{h.free}</li>
            <li>{h.hours}</li>
          </ul>
        </div>

        <a className="hero__scroll" href="#perks">
          <span className="hero__scroll-line" aria-hidden="true" />
          <span>{h.scroll}</span>
        </a>
      </div>
    </section>
  )
}
