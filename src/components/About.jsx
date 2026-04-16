import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import './About.css'

const expertise = [
  { label: 'Produits', value: 'Conception web, extensions Chrome, interfaces orientées usage.' },
  { label: 'IA locale', value: 'Python, Ollama, RAG, génération de bilans DOCX et PDF.' },
  { label: 'Protocoles', value: 'Architectures décentralisées et communications souveraines.' },
  { label: 'Stack', value: 'React, Vite, JavaScript, TypeScript, Firebase, API REST, SQL.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref}>
      <div className="container">
        <motion.p className="section-index" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}>
          01 — À propos
        </motion.p>

        <div className="about__grid">
          <motion.div className="about__left" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}>
            <h2 className="about__title">
              Du produit<br />
              <em>avant l&apos;effet.</em>
            </h2>
            <p className="about__bio">
              Basé à <strong>Annecy</strong>, entre la France et la Suisse, je construis
              des outils à l&apos;intersection de l&apos;<strong>IA</strong>,
              du <strong>web</strong> et des <strong>protocoles décentralisés</strong>.
              Curieux par nature, chaque projet est une exploration.
            </p>
            <p className="about__certs">
              <span>Python — Nomades Technologies, Genève</span>
              <span className="about__dot">·</span>
              <span>JavaScript Engineer</span>
            </p>
          </motion.div>

          <div className="about__right">
            {expertise.map((item, i) => (
              <motion.div
                key={item.label}
                className="about__row"
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={i + 2}
              >
                <span className="about__row-label">{item.label}</span>
                <p className="about__row-value">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
