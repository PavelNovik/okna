import { useRef, useState } from 'react'
import { gallery, img } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'
import Lightbox from './Lightbox.jsx'
import SectionHead from './SectionHead.jsx'

// На десктопе — сетка, на телефоне — горизонтальная лента со свайпом (scroll-snap) и точками-индикатором
export default function Gallery() {
  const { t } = useLang()
  const g = t.gallery
  const [open, setOpen] = useState(null)
  const [active, setActive] = useState(0)
  const track = useRef(null)
  const items = gallery.map((id) => ({ src: img(id), alt: g.items[id] }))

  const onScroll = () => {
    const el = track.current
    const first = el?.firstElementChild
    if (!first) return
    const step = first.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || 0)
    setActive(Math.min(gallery.length - 1, Math.round(el.scrollLeft / step)))
  }

  const goTo = (i) => {
    const el = track.current
    el?.children[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }

  return (
    <section className="section" id="realizacje" aria-labelledby="gallery-title">
      <div className="container panel">
        <SectionHead id="gallery-title" eyebrow={g.eyebrow} title={g.title} lead={g.lead} />
        <ul className="gallery" ref={track} onScroll={onScroll}>
          {gallery.map((id, i) => (
            <li key={id} className={`gallery__item${i === 0 ? ' gallery__item--wide' : ''}`} data-reveal style={{ '--d': `${(i % 3) * 60}ms` }}>
              <button type="button" onClick={() => setOpen(i)}>
                <img src={img(id, i === 0 ? undefined : 'sm')} alt={g.items[id]} width="640" height="480" loading="lazy" decoding="async" />
                <span className="gallery__cap" aria-hidden="true">
                  {g.items[id]}
                  <Icon name="zoom" size={18} />
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="gallery__dots" aria-hidden="true">
          {gallery.map((id, i) => (
            <button key={id} type="button" tabIndex={-1} className={i === active ? 'is-active' : undefined} onClick={() => goTo(i)} />
          ))}
        </div>
      </div>
      <Lightbox items={items} index={open} onChange={setOpen} labels={g} />
    </section>
  )
}
