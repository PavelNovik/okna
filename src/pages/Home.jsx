import WindowHero from '../components/WindowHero.jsx'
import Perks from '../components/Perks.jsx'
import Services from '../components/Services.jsx'
import Process from '../components/Process.jsx'
import PriceList from '../components/PriceList.jsx'
import About from '../components/About.jsx'
import CtaBand from '../components/CtaBand.jsx'
import Diagnostics from '../components/Diagnostics.jsx'
import Gallery from '../components/Gallery.jsx'
import Reviews from '../components/Reviews.jsx'
import Certificates from '../components/Certificates.jsx'
import Blog from '../components/Blog.jsx'
import Faq from '../components/Faq.jsx'
import Contact from '../components/Contact.jsx'
import SectionHead from '../components/SectionHead.jsx'
import { useLang } from '../i18n/index.jsx'

// Главная (PL и DE). Порядок по воронке: кто/что/где → услуги и цены → как работаем → доверие → FAQ → контакт
export default function Home() {
  const { lang } = useLang()
  return (
    <>
      <WindowHero />
      <Perks />
      <Services />
      {lang !== 'pl' && <DePrices />}
      <Process />
      <CtaBand />
      <About />
      <Diagnostics />
      <Gallery />
      <Reviews />
      <Certificates />
      {lang === 'pl' && <Blog />}
      <Faq />
      <Contact />
    </>
  )
}

// На немецкой посадочной цены — прямо на странице (отдельного /cennik/ на немецком нет)
function DePrices() {
  const { t } = useLang()
  return (
    <section className="section" id="prices" aria-labelledby="prices-title">
      <div className="container panel">
        <SectionHead id="prices-title" eyebrow={t.services.eyebrow} title={t.services.pricesTitle} lead={t.services.pricesNote} />
        <PriceList />
      </div>
    </section>
  )
}
