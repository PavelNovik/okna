import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'

// Просмотр фото на <dialog>: стрелки ←/→, Esc, клик по фону — закрыть
export default function Lightbox({ items, index, onChange, labels }) {
  const ref = useRef(null)
  const open = index !== null

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onChange((index + 1) % items.length)
      if (e.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, index, items.length, onChange])

  const item = open ? items[index] : null
  const step = (d) => onChange((index + d + items.length) % items.length)
  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={item?.alt}
      onClose={() => onChange(null)}
      onClick={(e) => e.target === ref.current && onChange(null)}
    >
      {item && (
        <figure className="lightbox__figure">
          <img src={item.src} alt={item.alt} />
          <figcaption>
            {item.alt}{' '}
            <span>
              {index + 1} / {items.length}
            </span>
          </figcaption>
        </figure>
      )}
      {items.length > 1 && (
        <>
          <button type="button" className="lightbox__nav lightbox__nav--prev" aria-label={labels.prev} onClick={() => step(-1)}>
            <Icon name="prev" />
          </button>
          <button type="button" className="lightbox__nav lightbox__nav--next" aria-label={labels.next} onClick={() => step(1)}>
            <Icon name="next" />
          </button>
        </>
      )}
      <button type="button" className="lightbox__close" aria-label={labels.close} onClick={() => onChange(null)}>
        <Icon name="close" />
      </button>
    </dialog>
  )
}
