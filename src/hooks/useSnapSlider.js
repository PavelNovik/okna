import { useCallback, useEffect, useRef, useState } from 'react'

// Слайдер на нативной прокрутке со scroll-snap (свайп пальцем работает сам по себе):
// отслеживает текущий слайд, умеет листать стрелками/точками и сообщает, есть ли что листать
// (если все карточки помещаются — стрелки и точки можно скрыть).
export function useSnapSlider(count) {
  const track = useRef(null)
  const [active, setActive] = useState(0)
  const [pages, setPages] = useState(count) // сколько разных положений у ленты (если видно 2 из 3 — два)
  const [scrollable, setScrollable] = useState(false)
  const [edges, setEdges] = useState({ start: true, end: false })

  const measure = useCallback(() => {
    const el = track.current
    const first = el?.firstElementChild
    if (!first) return
    const step = first.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || 0)
    const max = el.scrollWidth - el.clientWidth
    const total = Math.max(1, Math.min(count, Math.ceil(max / step - 0.05) + 1))
    setScrollable(max > 2)
    setPages(total)
    setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2 })
    // у правого края — последняя позиция, даже если карточка не «прилипла» к началу
    setActive(el.scrollLeft >= max - 2 ? total - 1 : Math.min(total - 1, Math.round(el.scrollLeft / step)))
  }, [count])

  useEffect(() => {
    const el = track.current
    if (!el) return
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure])

  const goTo = useCallback((i) => {
    const el = track.current
    const target = el?.children[Math.max(0, Math.min(count - 1, i))]
    if (!target) return
    el.scrollTo({ left: target.offsetLeft - el.firstElementChild.offsetLeft, behavior: 'smooth' })
  }, [count])

  return { track, active, pages, scrollable, edges, onScroll: measure, goTo, prev: () => goTo(active - 1), next: () => goTo(active + 1) }
}
