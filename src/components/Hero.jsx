import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

const FULL_NAME = 'Malik Karaoui'

export default function Hero() {
  const [text, setText] = useState('')

  useEffect(() => {
    let i = 0
    const delay = setTimeout(() => {
      const timer = setInterval(() => {
        i++
        setText(FULL_NAME.slice(0, i))
        if (i >= FULL_NAME.length) clearInterval(timer)
      }, 140)
      return () => clearInterval(timer)
    }, 400)
    return () => clearTimeout(delay)
  }, [])

  return (
    <section className="hero">
      {/* Subtle gradient orb */}
      <div className="hero__orb" />

      <div className="hero__content container">
        <motion.p
          className="hero__greeting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Bonjour, je suis
        </motion.p>

        <h1 className="hero__name">
          <span className="hero__typewriter">{text}</span>
        </h1>

        <motion.div
          className="hero__line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="hero__tag">Développeur</span>
          <span className="hero__tag-sep" aria-hidden="true" />
          <span className="hero__tag">Explorateur</span>
          <span className="hero__tag-sep" aria-hidden="true" />
          <span className="hero__tag">Bâtisseur</span>
        </motion.p>

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Python &middot; IA &middot; LLM &middot; Blockchain &middot; P2P
        </motion.p>
      </div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
      >
        <a href="#about" className="hero__scroll-link" aria-label="Scroll vers le contenu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </a>
      </motion.div>
    </section>
  )
}
