import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
// Шрифты с нашего домена (без Google Fonts CDN — RODO); latin-ext — польские буквы.
// Cormorant Garamond — заголовки (антиква, как в референсе), Inter — текст и навигация
import '@fontsource/cormorant-garamond/latin-500.css'
import '@fontsource/cormorant-garamond/latin-ext-500.css'
import '@fontsource/cormorant-garamond/latin-500-italic.css'
import '@fontsource/cormorant-garamond/latin-ext-500-italic.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-ext-400.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-ext-600.css'
import './styles/variables.css'
import './styles/global.css'
import './styles/pages.css'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App path={location.pathname} />
  </StrictMode>
)

if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
