import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CookieConsent from './components/CookieConsent.jsx'
import Dock from './components/Dock.jsx'
import MobileBar from './components/MobileBar.jsx'
import Home from './pages/Home.jsx'
import ServicePage from './pages/ServicePage.jsx'
import {
  AboutPage,
  BlogPage,
  ContactPage,
  NotFoundPage,
  PostPage,
  PricesPage,
  PrivacyPage,
  ServicesPage,
} from './pages/InfoPages.jsx'
import { img } from './config.js'
import { useReveal } from './hooks/useReveal.js'
import { useEffectsFx } from './hooks/useEffectsFx.js'
import { LangProvider, useLang } from './i18n/index.jsx'
import { findRoute } from './routes.js'
import { applyHead } from './seo.js'

// Многостраничный сайт: каждая страница пререндерится в свой HTML (scripts/prerender.js),
// в браузере React «оживляет» только текущую страницу; переходы — обычные ссылки.
export default function App({ path }) {
  const route = findRoute(path)
  const [preset, setPreset] = useState(null) // { service, at } — услуга, выбранная в карточке
  useReveal(route.path)
  useEffectsFx()

  // в dev-режиме (без пререндера) head собирается в браузере
  useEffect(() => {
    if (import.meta.env.DEV) applyHead(route)
  }, [route])

  // Кнопка «запросить» в карточке: выбрать услугу в форме и прокрутить к ней
  const ask = useCallback((service = '') => {
    const form = document.getElementById('contact')
    if (!form) {
      location.href = '/kontakt/'
      return
    }
    setPreset({ service, at: Date.now() })
    form.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <LangProvider value={{ lang: route.lang, path: route.path, ask, preset }}>
      <SkipLink />
      {/* вид на Познань за окном — только на главной (hero «пролёт через окно») */}
      {route.page === 'home' && (
        <div className="scene" aria-hidden="true">
          <img
            className="scene__view"
            src={img('view')}
            srcSet={`${img('view', 'sm')} 1100w, ${img('view')} 2400w`}
            sizes="100vw"
            alt=""
            fetchPriority="high"
          />
        </div>
      )}
      <Header />
      <main id="main" tabIndex={-1} className={route.page === 'home' ? 'is-home' : 'is-inner'}>
        <Page route={route} />
      </main>
      <Footer />
      <Dock />
      <MobileBar />
      <CookieConsent />
    </LangProvider>
  )
}

function Page({ route }) {
  switch (route.page) {
    case 'home':
      return <Home />
    case 'service':
      return <ServicePage service={route.service} />
    case 'services':
      return <ServicesPage />
    case 'prices':
      return <PricesPage />
    case 'about':
      return <AboutPage />
    case 'contact':
      return <ContactPage />
    case 'blog':
      return <BlogPage />
    case 'post':
      return <PostPage post={route.post} />
    case 'privacy':
      return <PrivacyPage />
    default:
      return <NotFoundPage />
  }
}

function SkipLink() {
  const { t } = useLang()
  return (
    <a href="#main" className="skip-link">
      {t.nav.skip}
    </a>
  )
}
