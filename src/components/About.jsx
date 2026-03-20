import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import './About.css'

const expertise = [
  {
    label: 'Produits',
    value: 'Conception web, extensions Chrome, interfaces orientées usage.',
  },
  {
    label: 'IA locale',
    value: 'Python, Ollama, RAG, génération de bilans DOCX et PDF.',
  },
  {
    label: 'Protocoles',
    value: 'Architectures décentralisées et communications souveraines.',
  },
  {
    label: 'Stack',
    value: 'React, Vite, JavaScript, TypeScript, Firebase, API REST, SQL.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref}>
      <div className="container">
        <motion.div
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0}
        >
          À propos
        </motion.div>

        <div className="about__grid">
          <motion.div
            className="about__bio"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={1}
          >
            <h2 className="about__title">
              Du produit avant l&apos;effet.
            </h2>
            <p>
              Basé à <strong>Annecy</strong>, entre la France et la Suisse, je construis
              des outils à l&apos;intersection de l&apos;<strong>IA</strong>,
              du <strong>web</strong> et des <strong>protocoles décentralisés</strong>.
            </p>
            <p>
              Curieux par nature, je travaille autant sur des produits concrets que sur
              des sujets exploratoires. Chaque projet est une exploration.
            </p>
          </motion.div>

          <div className="about__details">
            {expertise.map((item, groupIdx) => (
              <motion.div
                key={item.label}
                className="about__detail-row"
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={groupIdx + 2}
              >
                <span className="about__detail-label">{item.label}</span>
                <p className="about__detail-value">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="about__certifications"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={7}
        >
          <span className="about__cert-label">Certifications</span>
          <span className="about__cert-item">Python — Nomades Technologies, Genève</span>
          <span className="about__cert-sep">·</span>
          <span className="about__cert-item">JavaScript Engineer</span>
        </motion.div>
      </div>
    </section>
  )
}
