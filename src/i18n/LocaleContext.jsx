import { createContext, useContext, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { strings } from './strings'

const LocaleContext = createContext('fr')

const META = {
  fr: {
    title: 'Malik Karaoui',
    description: "Malik Karaoui, développeur indépendant. Produits IA, second cerveau Obsidian, harnais Claude Code, iOS. Local-first.",
    ogTitle: 'Malik Karaoui · Développeur & Builder IA',
    ogDescription: 'Produits numériques, IA locale, second cerveau Obsidian et harnais Claude Code open-source.',
  },
  en: {
    title: 'Malik Karaoui',
    description: 'Malik Karaoui, independent developer. AI products, Obsidian second brain, Claude Code harness, iOS. Local-first.',
    ogTitle: 'Malik Karaoui · Developer & AI Builder',
    ogDescription: 'Digital products, local AI, Obsidian second brain, and the open-source Claude Code harness.',
  },
}

export function localeFromPathname(pathname) {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr'
}

export function LocaleProvider({ children }) {
  const { pathname } = useLocation()
  const locale = localeFromPathname(pathname)

  useEffect(() => {
    const meta = META[locale]
    document.documentElement.lang = locale
    document.title = meta.title
    const setMeta = (selector, attr, value) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute(attr, value)
    }
    setMeta('meta[name="description"]', 'content', meta.description)
    setMeta('meta[property="og:title"]', 'content', meta.ogTitle)
    setMeta('meta[property="og:description"]', 'content', meta.ogDescription)
    setMeta('meta[property="og:url"]', 'content', `https://malikkaraoui.com${locale === 'en' ? '/en' : ''}`)
  }, [locale])

  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  return useContext(LocaleContext)
}

export function useStrings() {
  const locale = useLocale()
  return strings[locale]
}

// Turns a French-canonical path ('/', '/projects/slug', '/blog/slug', ...) into
// the locale-appropriate path (prefixed with /en when the current locale is English).
export function useLocalizedPath() {
  const locale = useLocale()
  return (path) => {
    if (locale !== 'en') return path
    return path === '/' ? '/en' : `/en${path}`
  }
}

// Strips a leading /en so callers can recover the French-canonical path from
// the current location (useful for the language switch link and for
// deriving a slug from useParams-free routes).
export function stripLocalePrefix(pathname) {
  if (pathname === '/en') return '/'
  if (pathname.startsWith('/en/')) return pathname.slice(3)
  return pathname
}

// A <Link> that automatically prefixes /en when the app is in English.
export function LocaleLink({ to, ...props }) {
  const withLocale = useLocalizedPath()
  return <Link to={withLocale(to)} {...props} />
}
