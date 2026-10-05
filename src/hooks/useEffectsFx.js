import { useEffect } from 'react'

// Визуальные эффекты страницы (только в браузере, без влияния на пререндер). CSS-переменные на <html>:
// --scroll — прокрутка в px (параллакс пейзажа; без background-attachment:fixed, который ломается на iOS);
// --hp — прогресс hero 0…1 («открыть окно и пролететь сквозь него», см. WindowHero.jsx);
// --mxn / --myn — положение курсора от -0.5 до 0.5 (лёгкий сдвиг пейзажа и бликов на стекле).
export function useEffectsFx() {
  useEffect(() => {
    const root = document.documentElement
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hero = document.querySelector('.hero')
    let raf = 0

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const y = window.scrollY
        root.classList.toggle('is-scrolled', y > 24)
        if (reduced) return
        root.style.setProperty('--scroll', String(y))
        if (hero) {
          const span = hero.offsetHeight - window.innerHeight
          const p = span > 0 ? Math.min(1, Math.max(0, (y - hero.offsetTop) / span)) : 1
          root.style.setProperty('--hp', p.toFixed(4))
          root.classList.toggle('is-through', p > 0.92)
        }
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    // Курсор — только для мыши/тачпада
    const fine = window.matchMedia('(pointer: fine)').matches && !reduced
    let moveRaf = 0
    let last = null
    const onMove = (e) => {
      last = e
      if (moveRaf) return
      moveRaf = requestAnimationFrame(() => {
        moveRaf = 0
        root.style.setProperty('--mxn', (last.clientX / window.innerWidth - 0.5).toFixed(3))
        root.style.setProperty('--myn', (last.clientY / window.innerHeight - 0.5).toFixed(3))
      })
    }
    if (fine) window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
      cancelAnimationFrame(moveRaf)
    }
  }, [])
}
