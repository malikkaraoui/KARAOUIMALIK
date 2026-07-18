import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

const ease = [0.16, 1, 0.3, 1]

const STACK = [
  { name: 'Python',     slug: 'python' },
  { name: 'React',      slug: 'react' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Node.js',    slug: 'nodedotjs' },
  { name: 'FastAPI',    slug: 'fastapi' },
  { name: 'Docker',     slug: 'docker' },
  { name: 'Vite',       slug: 'vite' },
  { name: 'Ollama',     slug: 'ollama' },
  { name: 'Claude',     slug: 'anthropic' },
  { name: 'Firebase',   slug: 'firebase' },
  { name: 'Obsidian',   slug: 'obsidian' },
]

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
        <motion.a
          href="https://apps.apple.com/fr/app/bo%C3%AEtes-%C3%A0-livres/id6768351762"
          target="_blank"
          rel="noopener noreferrer"
          className="hero__announcement"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
        >
          <span className="hero__announcement-dot" aria-hidden="true" />
          Boîtes à Livres est sur l&apos;App Store
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </motion.a>

        <motion.span
          className="hero__label"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          Architecte · Bâtisseur · Développeur
        </motion.span>

        <h1 className="hero__title">
          <span className="hero__typewriter">{text}</span>
          <span className="hero__cursor" aria-hidden="true" />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.52, ease }}
        >
          <p className="hero__lead">
            De la feuille blanche à l&apos;architecture, je transforme vos idées
            en applications, outils métier et sites web, avec l&apos;IA au cœur
            pour décupler leur impact.
          </p>
        </motion.div>

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
        className="hero__stack"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        aria-label="Technologies maîtrisées"
      >
        <div className="hero__stack-scroll">
          {[...STACK, ...STACK].map((tech, i) => (
            <div key={`${tech.slug}-${i}`} className="hero__stack-item">
              <img
                src={`https://cdn.simpleicons.org/${tech.slug}`}
                alt={i < STACK.length ? tech.name : ''}
                aria-hidden={i >= STACK.length ? 'true' : undefined}
                className="hero__stack-icon"
                width="22"
                height="22"
                loading="lazy"
              />
              <span className="hero__stack-label">{tech.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
