import { brand, googleReviews } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'
import SectionHead from './SectionHead.jsx'

const Stars = () => (
  <span className="stars" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((i) => (
      <Icon key={i} name="star" size={16} />
    ))}
  </span>
)

export default function Reviews() {
  const { t } = useLang()
  const r = t.reviews
  return (
    <section className="section" id="reviews" aria-labelledby="reviews-title">
      <div className="container">
        <div className="panel panel--head reviews__head">
          <SectionHead id="reviews-title" eyebrow={r.eyebrow} title={r.title} lead={r.lead} />
          <a className="rating" href={googleReviews} target="_blank" rel="noopener" data-reveal>
            <Icon name="google" size={34} />
            <span className="rating__value">{brand.rating.value}</span>
            <span className="rating__meta">
              <Stars />
              <span>
                {r.google} · {brand.rating.count} {r.count}
              </span>
            </span>
          </a>
        </div>
        <ul className="reviews">
          {r.items.map((it, i) => (
            <li key={it.name} className="review panel" data-reveal style={{ '--d': `${i * 80}ms` }}>
              <Icon name="quote" size={30} className="review__quote" />
              <blockquote>
                <p>{it.text}</p>
              </blockquote>
              <footer>
                <span className="review__avatar" aria-hidden="true">
                  {it.name[0]}
                </span>
                <span className="review__who">
                  <strong>{it.name}</strong>
                  <Stars />
                </span>
                <Icon name="google" size={20} className="review__g" />
              </footer>
            </li>
          ))}
        </ul>
        <p className="reviews__more">
          <a className="btn btn--light" href={googleReviews} target="_blank" rel="noopener">
            {r.cta} <Icon name="external" size={18} />
          </a>
          {r.note && <small>{r.note}</small>}
        </p>
      </div>
    </section>
  )
}
