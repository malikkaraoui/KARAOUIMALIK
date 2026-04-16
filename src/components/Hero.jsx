import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

const FULL_NAME = 'Malik Karaoui'

export default function Hero() {
  const [text, setText] = useState('')

  useEffect(() => {
    let i = 0
    let timer
    const delay = setTimeout(() => {
      timer = setInterval(() => {
        i += 1
        setText(FULL_NAME.slice(0, i))
        if (i >= FULL_NAME.length) clearInterval(timer)
      }, 120)
    }, 350)

    return () => {
      clearTimeout(delay)
      if (timer) clearInterval(timer)
    }
  }, [])

  return (
    <section className="hero">
      <div className="hero__content container">
        <motion.p
          className="hero__greeting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Bonjour, je suis
        </motion.p>

        <h1 className="hero__title">
          <span className="hero__typewriter">{text}</span>
        </h1>

        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          Développeur · Explorateur · Bâtisseur
        </motion.p>

        <motion.p
          className="hero__lead"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
        >
          Je construis des produits web, des outils d&apos;IA locale et des protocoles
          expérimentaux — utiles, lisibles et agréables à utiliser.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#projects" className="hero__action">
            Voir les projets
          </a>
          <a href="#contact" className="hero__action hero__action--secondary">
            Me contacter
          </a>
        </motion.div>
      </div>
    </section>
  )
}
