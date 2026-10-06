import Icon from './Icon.jsx'

// Точки и стрелки под лентой (useSnapSlider). Показываются, только если есть что листать;
// точек столько, сколько у ленты разных положений.
export default function SliderControls({ slider, labels, arrows = true }) {
  const { scrollable, active, pages, edges, goTo, prev, next } = slider
  return (
    <div className={`slider-controls${scrollable ? '' : ' is-static'}`}>
      {arrows && (
        <button type="button" className="slider-controls__arrow" onClick={prev} disabled={edges.start} aria-label={labels.prev}>
          <Icon name="prev" size={20} />
        </button>
      )}
      <div className="slider-controls__dots" aria-hidden="true">
        {Array.from({ length: pages }, (_, i) => (
          <button key={i} type="button" tabIndex={-1} className={i === active ? 'is-active' : undefined} onClick={() => goTo(i)} />
        ))}
      </div>
      {arrows && (
        <button type="button" className="slider-controls__arrow" onClick={next} disabled={edges.end} aria-label={labels.next}>
          <Icon name="next" size={20} />
        </button>
      )}
    </div>
  )
}
