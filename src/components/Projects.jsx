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
    gradient: 'radial-gradient(circle at 20% 30%, #1e3a5f 0%, #0f172a 40%, #1a1a2e 100%)',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="14" cy="14" r="4" stroke="rgba(147,197,253,0.6)" strokeWidth="1.5" />
        <circle cx="34" cy="14" r="4" stroke="rgba(147,197,253,0.6)" strokeWidth="1.5" />
        <circle cx="24" cy="34" r="4" stroke="rgba(147,197,253,0.6)" strokeWidth="1.5" />
        <line x1="17" y1="16" x2="21" y2="31" stroke="rgba(147,197,253,0.3)" strokeWidth="1" />
        <line x1="31" y1="16" x2="27" y2="31" stroke="rgba(147,197,253,0.3)" strokeWidth="1" />
        <line x1="18" y1="14" x2="30" y2="14" stroke="rgba(147,197,253,0.3)" strokeWidth="1" />
      </svg>
    ),
  },
  {
    title: 'Co-Pilot',
    description:
      'Extension Chrome propulsée par l\'IA. Un assistant intelligent directement intégré dans le navigateur, bientôt sur le Chrome Web Store.',
    tags: ['Python', 'Chrome Extension', 'IA'],
    github: 'https://github.com/malikkaraoui/Co-Pilot',
    live: null,
    gradient: 'radial-gradient(circle at 70% 20%, #1e293b 0%, #0f172a 45%, #1a1a2e 100%)',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="12" width="32" height="22" rx="4" stroke="rgba(167,139,250,0.6)" strokeWidth="1.5" />
        <line x1="8" y1="20" x2="40" y2="20" stroke="rgba(167,139,250,0.2)" strokeWidth="1" />
        <circle cx="24" cy="30" r="3" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5" />
        <path d="M20 28 Q24 24 28 28" stroke="rgba(167,139,250,0.4)" strokeWidth="1" fill="none" />
        <line x1="24" y1="34" x2="24" y2="38" stroke="rgba(167,139,250,0.3)" strokeWidth="1.5" />
        <line x1="18" y1="38" x2="30" y2="38" stroke="rgba(167,139,250,0.3)" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'Pizzaella.fr',
    description:
      'Plateforme SaaS dédiée aux pizzaïolos et food-trucks. Gestion des commandes, paiements et livraisons depuis une interface unique pour simplifier la vente en ligne multi-points.',
    tags: ['React', 'Firebase', 'Vite'],
    github: 'https://github.com/malikkaraoui/PLANIZZA-',
    live: 'https://pizzaella.fr',
    gradient: 'radial-gradient(circle at 30% 70%, #1c1917 0%, #0f172a 50%, #1a1a2e 100%)',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="14" stroke="rgba(251,191,36,0.5)" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="10" stroke="rgba(251,191,36,0.2)" strokeWidth="1" />
        <circle cx="19" cy="20" r="2" fill="rgba(239,68,68,0.4)" />
        <circle cx="28" cy="22" r="1.5" fill="rgba(239,68,68,0.3)" />
        <circle cx="22" cy="28" r="1.5" fill="rgba(74,222,128,0.4)" />
        <circle cx="29" cy="27" r="1" fill="rgba(74,222,128,0.3)" />
      </svg>
    ),
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
                className="project-card__visual"
                style={{ background: project.gradient }}
              >
                <div className="project-card__icon">{project.icon}</div>
              </div>

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
                      <span className="project-card__live-dot" />
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
