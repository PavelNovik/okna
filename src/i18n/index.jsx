import { createContext, useContext } from 'react'
import pl from './pl.js'
import de from './de.js'

export const dictionaries = { pl, de }
export const languages = ['pl', 'de']
export const defaultLang = 'pl'

// Польский — весь сайт, немецкий — посадочная /de/ (см. src/routes.js)
export const langPath = (lang) => (lang === defaultLang ? '/' : `/${lang}/`)

const LangContext = createContext(null)

export function LangProvider({ value, children }) {
  return <LangContext.Provider value={{ ...value, t: dictionaries[value.lang] }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
