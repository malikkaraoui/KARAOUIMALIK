import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Obsidian from './components/Obsidian'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ProjectPage from './pages/ProjectPage'
import DownloadPage from './pages/DownloadPage'
import PrivacyPage from './pages/PrivacyPage'
import useLenis from './hooks/useLenis'
import useScrollEffects from './hooks/useScrollEffects'

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Obsidian />
      <Projects />
      <Contact />
    </main>
  )
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  useLenis()
  useScrollEffects()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggle} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/privacy/boites-a-livres" element={<PrivacyPage />} />
      </Routes>
    </>
  )
}
