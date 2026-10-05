// Линейные иконки 24×24 (stroke = currentColor); соцсети и звезда — заливкой
const paths = {
  // услуги
  adjust: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M12 3v18M9.5 11v2.5" />
      <path d="M15 7.5l2-2M17 5.5l1.5 1.5" />
    </>
  ),
  glass: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <rect x="7" y="6" width="10" height="12" rx=".5" />
      <path d="m9 13 4-4M11 15l3-3" />
    </>
  ),
  hinge: (
    <>
      <rect x="9" y="3" width="6" height="18" rx="3" />
      <path d="M9 12h6M5 6v12M19 6v12" />
    </>
  ),
  fittings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
    </>
  ),
  handle: (
    <>
      <rect x="7" y="3" width="6" height="11" rx="3" />
      <path d="M10 8.5v0M10 8.5h8.5a1.5 1.5 0 0 1 0 3H12" />
      <path d="M10 14v7" />
    </>
  ),
  maintenance: (
    <>
      <path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L3.5 17.5a1.4 1.4 0 0 0 2 2l5.7-5.7a4 4 0 0 0 5.3-5.3l-2.3 2.3-2-.5-.5-2z" />
      <path d="M17 15.5l1.5 1.5 3-3" />
    </>
  ),
  seal: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <rect x="6.5" y="5.5" width="11" height="13" rx="1" strokeDasharray="2 1.6" />
    </>
  ),
  shutter: (
    <>
      <rect x="3.5" y="3" width="17" height="4" rx="1" />
      <path d="M5 7v13h14V7M5 10.5h14M5 14h14M5 17.5h14" />
    </>
  ),
  roof: (
    <>
      <path d="M2.5 12 12 4l9.5 8" />
      <path d="m8 11.5 6-2.5 2 5-6 2.5z" />
      <path d="M5 10v10h14V10" />
    </>
  ),
  // преимущества
  shield: (
    <>
      <path d="M12 2.5 20 5.5v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10v-6z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  bolt: <path d="M13 2.5 4.5 13.5H11L10 21.5l8.5-11H12z" />,
  van: (
    <>
      <path d="M2.5 6.5h11v10h-11zM13.5 9.5h4l3 3.5v3.5h-7" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="16.5" cy="17.5" r="1.8" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z" />
      <circle cx="8" cy="8" r="1.5" />
    </>
  ),
  tools: (
    <>
      <path d="m14 6 4-4 4 4-4 4M18 6 9.5 14.5" />
      <path d="M3 21l4.5-1.5 9-9-3-3-9 9z" />
    </>
  ),
  // диагностика
  thermo: (
    <>
      <rect x="5" y="2.5" width="14" height="13" rx="2" />
      <circle cx="12" cy="9" r="3.5" />
      <path d="M9 15.5 8 21.5h8l-1-6" />
    </>
  ),
  wind: <path d="M3 8h10a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7" />,
  doc: (
    <>
      <path d="M6 2.5h8.5L19 7v14.5H6z" />
      <path d="M14 2.5V7h5M9 12h7M9 15.5h7M9 9h3" />
    </>
  ),
  // контакты и UI
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" />
      <circle cx="12" cy="9.5" r="2.6" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 6.5 9 6.5 9-6.5" />
    </>
  ),
  phone: <path d="M5 3.5h3.5l1.8 4.5-2.3 1.5a11 11 0 0 0 6.5 6.5l1.5-2.3 4.5 1.8V19a2 2 0 0 1-2 2A16.5 16.5 0 0 1 3 5.5a2 2 0 0 1 2-2z" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  prev: <path d="m15 6-6 6 6 6" />,
  next: <path d="m9 6 6 6-6 6" />,
  zoom: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5M11 8.5v5M8.5 11h5" />
    </>
  ),
  quote: <path d="M5 18c2.5-1 4-3 4-6V7H4v5h4M15 18c2.5-1 4-3 4-6V7h-5v5h4" />,
  mouse: (
    <>
      <rect x="6.5" y="3" width="11" height="18" rx="5.5" />
      <path d="M12 7v3" />
    </>
  ),
}

const filled = {
  whatsapp: (
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.3-1.4A9.9 9.9 0 1 0 12.04 2zm0 18.1a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3a8.2 8.2 0 1 1 7 3.9zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3z" />
  ),
  instagram: (
    <path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 3.9 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zm0 4.7a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6zm5.3-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" />
  ),
  facebook: <path d="M13.5 21.5v-8h2.7l.4-3.2h-3.1V8.3c0-.9.3-1.5 1.6-1.5h1.6V4a22 22 0 0 0-2.4-.1c-2.4 0-4 1.5-4 4.1v2.3H7.6v3.2h2.7v8z" />,
  tiktok: <path d="M16.6 2.5h-3.2v13a2.8 2.8 0 1 1-2-2.7V9.5a6 6 0 1 0 5.2 6V9a7.7 7.7 0 0 0 4.4 1.4V7.2a4.5 4.5 0 0 1-4.4-4.7z" />,
  star: <path d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.3l-5.7 3 1.1-6.3-4.6-4.5 6.4-.9z" />,
  google: (
    <>
      <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" />
      <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" />
      <path fill="#FBBC05" d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2z" />
      <path fill="#EA4335" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.4L6.4 10c.8-2.4 3-4.1 5.6-4.1z" />
    </>
  ),
}

export default function Icon({ name, size = 24, className = '', ...rest }) {
  const isFilled = name in filled
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFilled ? 'currentColor' : 'none'}
      stroke={isFilled ? 'none' : 'currentColor'}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {isFilled ? filled[name] : paths[name]}
    </svg>
  )
}
