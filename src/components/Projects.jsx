import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import './Projects.css'

const projects = [
  {
    title: 'ToM Protocol',
    description:
      'Protocole décentralisé hérité de la vision WH4F. Architecture peer-to-peer pour une communication libre et souveraine.',
    tags: ['TypeScript', 'P2P', 'Protocole'],
    github: 'https://github.com/malikkaraoui/ToM-protocol',
    live: null,
    accent: 'var(--accent)',
  },
  {
    title: 'Co-Pilot',
    description:
      'Extension Chrome propulsée par l\'IA. Un assistant intelligent directement intégré dans le navigateur, bientôt sur le Chrome Web Store.',
    tags: ['Python', 'Chrome Extension', 'IA'],
    github: 'https://github.com/malikkaraoui/Co-Pilot',
    live: null,
    accent: '#10B981',
  },
  {
    title: 'Pizzaella.fr',
    description:
      'Plateforme de commande pizza en ligne. Migration complète depuis Prestashop vers un stack moderne React + Firebase.',
    tags: ['React', 'Firebase', 'Vite'],
    github: 'https://github.com/malikkaraoui/PLANIZZA-',
    live: null,
    accent: '#F59E0B',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref}>
      <div className="container">
        <motion.div
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0}
        >
          Projets
        </motion.div>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              className="project-card"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={i + 1}
            >
              <div
                className="project-card__accent"
                style={{ background: project.accent }}
              />

              <div className="project-card__content">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>

                <div className="project-card__tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-card__tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-card__links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card__link"
                      aria-label={`Voir ${project.title} sur GitHub`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                      <span>Code</span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card__link"
                      aria-label={`Voir ${project.title} en ligne`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                      <span>Live</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
