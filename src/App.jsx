import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { LocaleProvider, useLocalizedPath } from './i18n/LocaleContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Obsidian from './components/Obsidian'
import Projects from './components/Projects'
import GitHub from './components/GitHub'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectPage from './pages/ProjectPage'
import DownloadPage from './pages/DownloadPage'
import PrivacyPage from './pages/PrivacyPage'
import YZPhotosPage from './pages/YZPhotosPage'
import YZPhotosPrivacyPage from './pages/YZPhotosPrivacyPage'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import useLenis from './hooks/useLenis'
import useScrollEffects from './hooks/useScrollEffects'
import useScrollToTop from './hooks/useScrollToTop'

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Obsidian />
      <Projects />
      <GitHub />
      <Contact />
    </main>
  )
}

function SiteFooter() {
  const { pathname } = useLocation()
  const withLocale = useLocalizedPath()
  const isHome = pathname === withLocale('/')
  return isHome ? null : <Footer />
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  useLenis()
  useScrollEffects()
  useScrollToTop()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return (
    <LocaleProvider>
      <Nav theme={theme} onToggleTheme={toggle} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/projects/boites-a-livres/privacy" element={<PrivacyPage />} />
        <Route path="/YZPhotos" element={<YZPhotosPage />} />
        <Route path="/YZPhotos/privacy" element={<YZPhotosPrivacyPage />} />

        <Route path="/en" element={<Home />} />
        <Route path="/en/projects/:slug" element={<ProjectPage />} />
        <Route path="/en/blog" element={<Blog />} />
        <Route path="/en/blog/:slug" element={<BlogPost />} />
        <Route path="/en/download" element={<DownloadPage />} />
        <Route path="/en/projects/boites-a-livres/privacy" element={<PrivacyPage />} />
        <Route path="/en/YZPhotos" element={<YZPhotosPage />} />
        <Route path="/en/YZPhotos/privacy" element={<YZPhotosPrivacyPage />} />
      </Routes>
      <SiteFooter />
    </LocaleProvider>
  )
}
