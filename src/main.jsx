import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import { langFromPath } from './i18n/index.jsx'
// Шрифты с нашего домена (без Google Fonts CDN — RODO); latin-ext — польские буквы.
// Manrope — заголовки и цифры, Inter — текст
import '@fontsource/manrope/latin-600.css'
import '@fontsource/manrope/latin-ext-600.css'
import '@fontsource/manrope/latin-800.css'
import '@fontsource/manrope/latin-ext-800.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-ext-400.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-ext-600.css'
import './styles/variables.css'
import './styles/global.css'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App initialLang={langFromPath(location.pathname)} />
  </StrictMode>
)

if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
