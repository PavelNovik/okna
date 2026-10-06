import { img } from '../config.js'
import { priceFrom } from '../content/services.js'
import { posts, postPath } from '../content/posts.js'
import PageHero from '../components/PageHero.jsx'
import Services from '../components/Services.jsx'
import Faq from '../components/Faq.jsx'
import Contact from '../components/Contact.jsx'
import Icon from '../components/Icon.jsx'
import { useLang } from '../i18n/index.jsx'

// Страница услуги: проблема → что делаем → цена → примеры работ → FAQ → связанные услуги → форма
export default function ServicePage({ service: s }) {
  const { t } = useLang()
  const articles = posts.filter((p) => p.related.includes(s.id))
  return (
    <>
      <PageHero
        crumbs={[[t.nav.home, '/'], ['Usługi', '/uslugi/'], [s.name, null]]}
        title={s.h1}
        lead={s.lead}
        facts={[
          ['tag', `Cena: ${priceFrom(s)}`],
          ['shield', 'Gwarancja do 24 miesięcy'],
          ['pin', 'Poznań i Wielkopolska'],
        ]}
        image={{ src: img(s.img, 'sm'), alt: s.name }}
      />

      <section className="section" aria-labelledby="signs-title">
        <div className="container panel split">
          <div>
            <h2 id="signs-title" className="section-title section-title--sm">
              Kiedy potrzebna jest ta usługa?
            </h2>
            <ul className="ticks">
              {s.signs.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="split__aside">
            <h3>Skąd biorą się te problemy?</h3>
            <p>{s.causes}</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="steps-title">
        <div className="container panel">
          <h2 id="steps-title" className="section-title section-title--sm">
            Jak wygląda usługa?
          </h2>
          <ol className="steps">
            {s.steps.map(([title, text]) => (
              <li key={title}>
                <strong>{title}</strong> — {text}
              </li>
            ))}
          </ol>
          <p className="note">
            <Icon name="shield" size={20} /> {s.note}
          </p>
        </div>
      </section>

      <section className="section" id="cennik" aria-labelledby="price-title">
        <div className="container panel price-box">
          <div>
            <h2 id="price-title" className="section-title section-title--sm">
              Orientacyjny cennik
            </h2>
            <p className="muted">
              Ceny zależą od stanu okna, typu okuć i miejscowości. Ostateczną cenę podajemy po diagnozie — przed
              rozpoczęciem pracy. Dojazd i wycena na miejscu są bezpłatne.
            </p>
            <p>
              <a className="link-arrow" href="/cennik/">
                Pełny cennik usług <Icon name="arrow" size={18} />
              </a>
            </p>
          </div>
          <table className="prices">
            <thead>
              <tr>
                <th scope="col">Usługa</th>
                <th scope="col">Cena</th>
              </tr>
            </thead>
            <tbody>
              {s.prices.map(([label, price]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {s.photos.length > 0 && (
        <section className="section" aria-labelledby="photos-title">
          <div className="container panel">
            <h2 id="photos-title" className="section-title section-title--sm">
              Z naszych realizacji
            </h2>
            <ul className="photos">
              {s.photos.map((id) => (
                <li key={id}>
                  <figure>
                    <img src={img(id, 'sm')} alt={t.gallery.items[id]} width="640" height="480" loading="lazy" decoding="async" />
                    <figcaption>{t.gallery.items[id]}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Faq id="faq" eyebrow="FAQ" title={`Pytania: ${s.name.toLowerCase()}`} items={s.faq.map(([q, a]) => ({ q, a }))} />

      <section className="section" aria-labelledby="related-title">
        <div className="container">
          <div className="panel panel--head">
            <h2 id="related-title" className="section-title section-title--sm">
              Powiązane usługi
            </h2>
            {articles.length > 0 && (
              <p className="related-posts">
                Przydatne porady:{' '}
                {articles.map((p, i) => (
                  <span key={p.slug}>
                    {i > 0 && ', '}
                    <a href={postPath(p)}>{p.title}</a>
                  </span>
                ))}
              </p>
            )}
          </div>
          <Services only={s.related} headless />
        </div>
      </section>

      <Contact initialService={s.id} />
    </>
  )
}
