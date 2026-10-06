import { useEffect, useState } from 'react'
import { waLink } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

// «Лифтовый» индикатор как в референсе: справа — вертикальная шкала уровней (секций главной),
// внизу справа — название текущего уровня крупной антиквой и круглая золотая кнопка WhatsApp.
// На внутренних страницах — только кнопка; на телефонах всё заменяет MobileBar.
export default function Dock() {
  const { t, path } = useLang()
  const isHome = path === '/' || path === '/de/'
  const levels = [
    ['top', null],
    ['services', t.services.eyebrow],
    ['prices', t.services.pricesTitle],
    ['process', t.process.eyebrow],
    ['about', t.about.eyebrow],
    ['realizacje', t.gallery.eyebrow],
    ['reviews', t.reviews.eyebrow],
    ['faq', t.faq.eyebrow],
    ['contact', t.contact.eyebrow],
  ]
  const [state, setState] = useState({ list: levels.filter(([id]) => id !== 'prices'), index: 0, stage: 0 })

  useEffect(() => {
    if (!isHome) return
    const list = levels.filter(([id]) => document.getElementById(id))
    const hero = document.querySelector('.hero')
    let raf = 0
    const update = () => {
      raf = 0
      const mark = window.innerHeight * 0.45
      let index = 0
      list.forEach(([id], i) => {
        if (document.getElementById(id).getBoundingClientRect().top <= mark) index = i
      })
      let stage = 2
      if (hero) {
        const span = hero.offsetHeight - window.innerHeight
        const p = span > 0 ? Math.min(1, Math.max(0, (window.scrollY - hero.offsetTop) / span)) : 1
        stage = p < 0.07 ? 0 : p < 0.42 ? 1 : 2
      }
      setState((s) => (s.index === index && s.stage === stage && s.list.length === list.length ? s : { list, index, stage }))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
    // levels зависят только от языка, который на странице не меняется
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome])

  const { list, index, stage } = state
  const label = index === 0 ? t.hero.stages[stage] : list[index][1]
  const num = String(index + 1).padStart(2, '0')

  return (
    <>
      {isHome && (
        <nav className="rail" aria-label={t.nav.menu}>
          <span className="rail__num" aria-hidden="true">
            {num}
          </span>
          <ol className="rail__list" style={{ '--n': list.length, '--i': index }}>
            {list.map(([id, name], i) => (
              <li key={id} className={i === index ? 'is-active' : undefined}>
                <a href={`#${id}`} aria-label={name ?? t.nav.home} aria-current={i === index ? 'location' : undefined} />
              </li>
            ))}
          </ol>
          <span className="rail__label" aria-hidden="true">
            {label}
          </span>
        </nav>
      )}
      <div className="dock">
        {isHome && (
          <p className="dock__level" aria-hidden="true">
            <span>
              {t.hero.stageLabel} {num}
            </span>
            {label}
          </p>
        )}
        <a className="dock__wa" href={waLink(t.wa.hello)} target="_blank" rel="noopener" aria-label={t.wa.label}>
          <Icon name="whatsapp" size={26} />
        </a>
      </div>
    </>
  )
}
