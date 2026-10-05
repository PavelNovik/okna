import { createContext, useContext } from 'react'
import pl from './pl.js'
import de from './de.js'

export const dictionaries = { pl, de }
export const languages = ['pl', 'de']
export const defaultLang = 'pl'

// Польский — на корне сайта, немецкий — /de/. Сайт одностраничный: разделы — якоря (#services …)
export const langPath = (lang) => (lang === defaultLang ? '/' : `/${lang}/`)

export function langFromPath(pathname) {
  const seg = pathname.split('/')[1]
  return languages.includes(seg) ? seg : defaultLang
}

// Для scripts/prerender.js: одна страница на язык
export const routes = ['home']
export const routePath = (lang) => langPath(lang)

const LangContext = createContext(null)

export function LangProvider({ value, children }) {
  return <LangContext.Provider value={{ ...value, t: dictionaries[value.lang] }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
