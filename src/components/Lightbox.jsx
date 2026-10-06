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

  // Свайп влево/вправо на телефоне — следующее/предыдущее фото
  const touch = useRef(null)
  const swiped = useRef(false) // после свайпа браузер может прислать click по фону — не закрываем
  const onTouchStart = (e) => {
    const p = e.touches[0]
    touch.current = { x: p.clientX, y: p.clientY }
    swiped.current = false
  }
  const onTouchEnd = (e) => {
    const start = touch.current
    touch.current = null
    if (!start) return
    const p = e.changedTouches[0]
    const dx = p.clientX - start.x
    const dy = p.clientY - start.y
    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) swiped.current = true
    if (items.length > 1 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1)
  }
  const onBackdropClick = (e) => {
    if (swiped.current) {
      swiped.current = false
      return
    }
    if (e.target === ref.current) onChange(null)
  }

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={item?.alt}
      onClose={() => onChange(null)}
      onClick={onBackdropClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
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
