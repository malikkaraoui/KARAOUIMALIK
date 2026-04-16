import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

const ease = [0.16, 1, 0.3, 1]

export default function Hero() {
  const [text, setText] = useState('')
  const fullName = 'Malik Karaoui'

  useEffect(() => {
    let i = 0
    const delay = setTimeout(() => {
      const timer = setInterval(() => {
        i += 1
        setText(fullName.slice(0, i))
        if (i >= fullName.length) clearInterval(timer)
      }, 100)
      return () => clearInterval(timer)
    }, 500)
    return () => clearTimeout(delay)
  }, [])

  return (
    <section className="hero">
      <div className="container hero__content">
        <motion.span
          className="hero__label"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          Développeur · Annecy, FR
        </motion.span>

        <h1 className="hero__title">
          <span className="hero__typewriter">{text}</span>
          <span className="hero__cursor" aria-hidden="true" />
        </h1>

        <motion.p
          className="hero__lead"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.52, ease }}
        >
          Je construis des produits web, des outils d&apos;IA locale
          et des protocoles expérimentaux.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.66, ease }}
        >
          <a href="#projects" className="hero__cta">
            Voir les projets
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#contact" className="hero__cta hero__cta--ghost">
            Me contacter
          </a>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        aria-hidden="true"
      >
        <div className="hero__scroll-line" />
      </motion.div>
    </section>
  )
}
