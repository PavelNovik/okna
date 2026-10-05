import { brand, tel, waLink } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

export default function CtaBand() {
  const { t } = useLang()
  const c = t.cta
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta__box" data-reveal>
          <div>
            <h2 id="cta-title">{c.title}</h2>
            <p>{c.text}</p>
          </div>
          <div className="cta__actions">
            <a className="btn btn--wa btn--lg" href={waLink(t.wa.hello)} target="_blank" rel="noopener">
              <Icon name="whatsapp" size={22} /> {c.btn}
            </a>
            <a className="cta__phone" href={tel}>
              <Icon name="phone" size={20} /> {brand.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
