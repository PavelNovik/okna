import { useState } from 'react'
import { gallery, img } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'
import Lightbox from './Lightbox.jsx'
import SectionHead from './SectionHead.jsx'

export default function Gallery() {
  const { t } = useLang()
  const g = t.gallery
  const [open, setOpen] = useState(null)
  const items = gallery.map((id) => ({ src: img(id), alt: g.items[id] }))
  return (
    <section className="section" id="gallery" aria-labelledby="gallery-title">
      <div className="container panel">
        <SectionHead id="gallery-title" eyebrow={g.eyebrow} title={g.title} lead={g.lead} />
        <ul className="gallery">
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
      </div>
      <Lightbox items={items} index={open} onChange={setOpen} labels={g} />
    </section>
  )
}
