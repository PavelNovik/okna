import { useState } from 'react'
import { certs, img } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'
import Lightbox from './Lightbox.jsx'
import SectionHead from './SectionHead.jsx'

export default function Certificates() {
  const { t } = useLang()
  const c = t.certs
  const [open, setOpen] = useState(null)
  const items = certs.map((id, i) => ({ src: img(id), alt: c.items[i].title }))
  return (
    <section className="section" id="certs" aria-labelledby="certs-title">
      <div className="container panel">
        <SectionHead id="certs-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
        <ul className="certs">
          {certs.map((id, i) => (
            <li key={id} data-reveal style={{ '--d': `${i * 70}ms` }}>
              <button type="button" className="cert" onClick={() => setOpen(i)}>
                <span className="cert__paper">
                  <img src={img(id, 'sm')} alt="" width="420" height="594" loading="lazy" decoding="async" />
                  <Icon name="zoom" size={22} className="cert__zoom" />
                </span>
                <strong>{c.items[i].title}</strong>
                <span>{c.items[i].text}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Lightbox items={items} index={open} onChange={setOpen} labels={t.gallery} />
    </section>
  )
}
