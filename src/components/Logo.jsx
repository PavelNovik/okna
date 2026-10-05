// Логотип: синий «кубик» — дверь и окно (как на liwserwis.com), перерисован в SVG + словесный знак
export function LogoMark({ className = 'logo__mark' }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <g stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" fill="currentColor">
        <path d="M8 18 30 10l26 7-22 8z" />
        <path d="M8 18l26 7v33L8 50z" />
        <path d="M34 25l22-8v32l-22 9z" />
      </g>
      <circle cx="13.5" cy="35" r="1.8" fill="#fff" />
      <path d="M38 27.5 53 22v18.6L38 46z" fill="#fff" />
      <path d="M45.5 24.8v18.5M38 36.8l15-5.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export default function Logo({ sub }) {
  return (
    <span className="logo">
      <LogoMark />
      <span className="logo__text">
        liw<b>serwis</b>
        {sub && <span className="logo__sub">{sub}</span>}
      </span>
    </span>
  )
}
