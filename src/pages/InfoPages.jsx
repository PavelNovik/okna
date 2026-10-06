import { brand, cities, img } from '../config.js'
import { pages } from '../content/pages.js'
import { serviceById, servicePath } from '../content/services.js'
import PageHero from '../components/PageHero.jsx'
import Services from '../components/Services.jsx'
import PriceList from '../components/PriceList.jsx'
import CtaBand from '../components/CtaBand.jsx'
import Process from '../components/Process.jsx'
import About from '../components/About.jsx'
import Certificates from '../components/Certificates.jsx'
import Reviews from '../components/Reviews.jsx'
import Contact from '../components/Contact.jsx'
import Blog from '../components/Blog.jsx'
import Icon from '../components/Icon.jsx'
import { useLang } from '../i18n/index.jsx'

const MONTHS = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia']

const crumbs = (t, page) => [[t.nav.home, '/'], [page.crumb, null]]

export function ServicesPage() {
  const { t } = useLang()
  const p = pages.services
  return (
    <>
      <PageHero crumbs={crumbs(t, p)} title={p.h1} lead={p.lead} />
      <section className="section" aria-label={p.h1}>
        <div className="container">
          <Services headless headingLevel={2} />
        </div>
      </section>
      <Process />
      <CtaBand />
    </>
  )
}

export function PricesPage() {
  const { t } = useLang()
  const p = pages.prices
  return (
    <>
      <PageHero crumbs={crumbs(t, p)} title={p.h1} lead={p.lead} />
      <section className="section" aria-labelledby="pricelist-title">
        <div className="container panel">
          <h2 id="pricelist-title" className="section-title section-title--sm">
            Ceny usług
          </h2>
          <PriceList />
        </div>
      </section>
      <section className="section" aria-labelledby="how-title">
        <div className="container panel">
          <h2 id="how-title" className="section-title section-title--sm">
            {p.howTitle}
          </h2>
          <ol className="steps">
            {p.how.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
          <p className="note">
            <Icon name="shield" size={20} /> Na wykonaną usługę udzielamy gwarancji do 24 miesięcy.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  )
}

export function AboutPage() {
  const { t } = useLang()
  const p = pages.about
  return (
    <>
      <PageHero crumbs={crumbs(t, p)} title={p.h1} lead={p.lead} />
      <About />
      <Certificates />
      <Reviews />
      <section className="section" aria-labelledby="company-title">
        <div className="container panel">
          <h2 id="company-title" className="section-title section-title--sm">
            {p.companyTitle}
          </h2>
          <dl className="company">
            <dt>Nazwa</dt>
            <dd>{brand.legalName} (marka Liwserwis)</dd>
            <dt>Adres</dt>
            <dd>
              {brand.street}, {brand.postalCode} {brand.city}
            </dd>
            <dt>NIP</dt>
            <dd>{brand.nip}</dd>
            <dt>Obszar działania</dt>
            <dd>{cities.join(', ')} i okolice — cała Wielkopolska</dd>
          </dl>
        </div>
      </section>
      <CtaBand />
    </>
  )
}

export function ContactPage() {
  const { t } = useLang()
  const p = pages.contact
  return (
    <>
      <PageHero crumbs={crumbs(t, p)} title={p.h1} lead={p.lead} />
      <Contact />
    </>
  )
}

export function BlogPage() {
  const { t } = useLang()
  const p = pages.blog
  return (
    <>
      <PageHero crumbs={crumbs(t, p)} title={p.h1} lead={p.lead} />
      <section className="section" aria-label={p.h1}>
        <div className="container">
          <Blog headless headingLevel={2} />
        </div>
      </section>
      <CtaBand />
    </>
  )
}

export function PostPage({ post }) {
  const { t } = useLang()
  const [y, m, d] = post.date.split('-').map(Number)
  const date = `${d} ${MONTHS[m - 1]} ${y}`
  return (
    <>
      <PageHero
        crumbs={[[t.nav.home, '/'], ['Porady', '/porady/'], [post.title, null]]}
        title={post.title}
        lead={post.excerpt}
        image={{ src: img(post.img, 'sm'), alt: '' }}
      >
        <p className="page-hero__meta">
          <time dateTime={post.date}>{date}</time> · {brand.name}
        </p>
      </PageHero>
      <article className="section" aria-labelledby="page-title">
        <div className="container panel prose">
          <Blocks blocks={post.blocks} />
          <aside className="prose__aside" aria-label="Powiązane usługi">
            <p>
              <strong>Potrzebujesz pomocy serwisanta?</strong> Zobacz:{' '}
              {post.related.map((id, i) => (
                <span key={id}>
                  {i > 0 && ', '}
                  <a href={servicePath(serviceById[id])}>{serviceById[id].name.toLowerCase()}</a>
                </span>
              ))}
              .
            </p>
          </aside>
        </div>
      </article>
      <CtaBand />
    </>
  )
}

export function PrivacyPage() {
  const { t } = useLang()
  const p = pages.privacy
  return (
    <>
      <PageHero crumbs={crumbs(t, p)} title={p.h1}>
        <></>
      </PageHero>
      <section className="section" aria-label={p.h1}>
        <div className="container panel prose">
          <Blocks blocks={p.blocks} />
        </div>
      </section>
    </>
  )
}

export function NotFoundPage() {
  const { t } = useLang()
  const p = pages.notFound
  return (
    <>
      <PageHero crumbs={crumbs(t, p)} title={p.h1} lead={p.lead} />
      <section className="section" aria-label="Usługi">
        <div className="container">
          <Services headless headingLevel={2} />
        </div>
      </section>
    </>
  )
}

function Blocks({ blocks }) {
  return blocks.map(([type, body], i) => {
    if (type === 'h2') return <h2 key={i}>{body}</h2>
    if (type === 'ul')
      return (
        <ul key={i}>
          {body.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      )
    return <p key={i}>{body}</p>
  })
}
