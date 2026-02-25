import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import './About.css'

const skillGroups = [
  {
    domain: 'IA & LLM',
    skills: ['Python', 'LLM', 'IA locale', 'Prompt Engineering'],
  },
  {
    domain: 'Web',
    skills: ['React', 'Vite', 'JavaScript', 'TypeScript', 'CSS'],
  },
  {
    domain: 'Backend & Data',
    skills: ['Java', 'Firebase', 'SQL', 'API REST'],
  },
  {
    domain: 'Blockchain & P2P',
    skills: ['Blockchain', 'P2P', 'Protocoles'],
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
            <p>
              Basé à <strong>Annecy</strong>, je construis des outils à l'intersection
              de l'<strong>intelligence artificielle</strong>, du <strong>web</strong> et
              des <strong>protocoles décentralisés</strong>.
            </p>
            <p>
              Curieux par nature, je m'intéresse autant aux architectures techniques
              qu'aux questions de société que la technologie soulève. Chaque projet
              est une exploration.
            </p>
          </motion.div>

          <div className="about__skills">
            {skillGroups.map((group, groupIdx) => (
              <motion.div
                key={group.domain}
                className="about__skill-group"
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={groupIdx + 2}
              >
                <span className="about__skill-domain">{group.domain}</span>
                <div className="about__skill-pills">
                  {group.skills.map((skill) => (
                    <span key={skill} className="about__pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
