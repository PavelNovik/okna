import { useEffect, useRef } from 'react'
import { brand, tel } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

// Hero «окно открывается»: раскадровка видео (scripts/window/*) — створки распахиваются в вид на Познань.
// Кадры рисуются в <canvas> по прогрессу прокрутки (--hp, как в useEffectsFx): 0…OPEN_END — открытие,
// дальше CSS (--zoom) увеличивает панель от центра проёма и растворяет её в полноэкранном виде (.scene в App).
// Первый кадр — обычная <picture> (видна сразу, это LCP), canvas появляется поверх, когда кадры загружены.
export const FRAMES = 62
export const OPEN_END = 0.6
const frameUrl = (size, i, ext) => `/window/${size}/${String(i).padStart(2, '0')}.${ext}`

export default function WindowHero() {
  const { t } = useLang()
  const h = t.hero
  const stage = useRef(null)
  const film = useRef(null)
  const canvas = useRef(null)

  // Кадры по прокрутке
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = stage.current
    const box = film.current
    const cv = canvas.current
    const ctx = cv.getContext('2d')
    const hero = el.parentElement
    const frames = new Array(FRAMES)
    let cancelled = false
    let raf = 0
    let shown = -1

    const progress = () => {
      const span = hero.offsetHeight - window.innerHeight
      return span > 0 ? Math.min(1, Math.max(0, (window.scrollY - hero.offsetTop) / span)) : 0
    }
    const nearest = (i) => {
      for (let d = 0; d < FRAMES; d++) {
        if (frames[i - d]) return i - d
        if (frames[i + d]) return i + d
      }
      return -1
    }
    const draw = () => {
      raf = 0
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.round(box.clientWidth * dpr), hgt = Math.round(box.clientHeight * dpr)
      if (cv.width !== w || cv.height !== hgt) {
        cv.width = w
        cv.height = hgt
        shown = -1
      }
      const f = (Math.min(1, progress() / OPEN_END)) * (FRAMES - 1)
      const i0 = nearest(Math.floor(f))
      if (i0 < 0) return
      const key = i0 + (f - Math.floor(f)) * 0.999
      if (key === shown) return
      shown = key
      // как object-fit: cover — без искажений, если пропорции панели отличаются от кадра
      const img0 = frames[i0]
      const sc = Math.max(w / img0.naturalWidth, hgt / img0.naturalHeight)
      const dw = img0.naturalWidth * sc, dh = img0.naturalHeight * sc
      const dx = (w - dw) / 2, dy = (hgt - dh) / 2
      ctx.globalAlpha = 1
      ctx.drawImage(img0, dx, dy, dw, dh)
      // плавный переход к следующему кадру, если он уже загружен
      const i1 = Math.floor(f) + 1
      const frac = f - Math.floor(f)
      if (i0 === Math.floor(f) && frac > 0.02 && frames[i1]) {
        ctx.globalAlpha = frac
        ctx.drawImage(frames[i1], dx, dy, dw, dh)
        ctx.globalAlpha = 1
      }
      box.classList.add('is-live')
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw)
    }

    ;(async () => {
      // кадры грузим после загрузки страницы и в простое — не мешаем первому экрану (LCP)
      if (document.readyState !== 'complete') await new Promise((r) => window.addEventListener('load', r, { once: true }))
      await new Promise((r) => (window.requestIdleCallback ? requestIdleCallback(r, { timeout: 1200 }) : setTimeout(r, 300)))
      if (cancelled) return
      // формат и размер — те же, что браузер выбрал для первого кадра в <picture> (AVIF/WebP, l/s)
      const poster = box.querySelector('.film__poster')
      if (!poster.complete) await new Promise((r) => poster.addEventListener('load', r, { once: true }))
      const chosen = poster.currentSrc || poster.src
      const ext = chosen.endsWith('.avif') ? 'avif' : 'webp'
      const size = chosen.includes('/s/') ? 's' : 'l'
      // порядок загрузки: первый, последний, затем «прореживание» — чтобы анимация работала сразу, уточняясь
      const order = [0, FRAMES - 1]
      for (const step of [16, 8, 4, 2, 1])
        for (let i = 0; i < FRAMES; i += step) if (!order.includes(i)) order.push(i)
      let next = 0
      const worker = async () => {
        while (!cancelled && next < order.length) {
          const i = order[next++]
          const img = new Image()
          img.decoding = 'async'
          img.src = frameUrl(size, i, ext)
          try {
            await img.decode()
          } catch {
            continue
          }
          if (cancelled) return
          frames[i] = img
          shown = -1
          schedule()
        }
      }
      await Promise.all([worker(), worker(), worker(), worker()])
    })()

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelled = true
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__stage" ref={stage}>
        <div className="hero__bg" aria-hidden="true" />
        <div className="film" ref={film} aria-hidden="true">
          <picture>
            <source
              type="image/avif"
              media="(max-width: 860px)"
              srcSet={frameUrl('s', 0, 'avif')}
            />
            <source type="image/avif" srcSet={frameUrl('l', 0, 'avif')} />
            <source type="image/webp" media="(max-width: 860px)" srcSet={frameUrl('s', 0, 'webp')} />
            <img
              className="film__poster"
              src={frameUrl('l', 0, 'webp')}
              alt=""
              width="720"
              height="1185"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <canvas className="film__canvas" ref={canvas} />
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
