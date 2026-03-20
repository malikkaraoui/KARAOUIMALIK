import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import './Projects.css'

const projects = [
  {
    title: 'OKazCar',
    eyebrow: 'Produit en ligne',
    description:
      'OKazCar analyse les annonces auto en un clic sur Leboncoin, La Centrale et AutoScout24. Le produit combine score de fiabilité, prix marché, alertes utiles et lecture immédiate d’une annonce.',
    tags: ['Chrome Extension', 'Manifest V3', 'JavaScript', 'Python', 'Flask', 'Web app', 'IA intégrée'],
    links: [
      { label: 'Site', href: 'https://okazcar.com', kind: 'live' },
      {
        label: 'Chrome Web Store',
        href: 'https://chromewebstore.google.com/detail/okazcar-analyse-annonces/eakomgkenllkkmfccjjfoegealnchmmo',
        kind: 'store',
      },
    ],
  },
  {
    title: 'ToM Protocol',
    eyebrow: 'Recherche',
    description:
      'ToM Protocol est mon terrain d’exploration autour d’une architecture peer-to-peer pour une communication plus libre, plus résiliente et moins dépendante des plateformes centralisées.',
    tags: ['TypeScript', 'P2P', 'Protocole', 'Xcode', 'iOS'],
    links: [
      { label: 'Code', href: 'https://github.com/malikkaraoui/ToM-protocol', kind: 'code' },
      { label: 'Medium', href: 'https://medium.com/@karaoui.malik', kind: 'article' },
    ],
  },
  {
    title: 'Bilan IA local',
    eyebrow: 'IA locale',
    description:
      'Un script IA qui parcourt des dossiers utilisateur en local, applique un RAG via Ollama, puis génère automatiquement un bilan structuré en DOCX ou PDF, sans sortir les données de la machine.',
    tags: ['Python', 'Ollama', 'RAG', 'DOCX/PDF'],
    links: [
      { label: 'Code', href: 'https://github.com/malikkaraoui/LOCAL.IA.GENERATED_COMPTE_RENDU', kind: 'code' },
      { label: 'Medium', href: 'https://medium.com/@karaoui.malik', kind: 'article' },
    ],
  },
  {
    title: 'Pizzaella.fr',
    eyebrow: 'SaaS',
    description:
      'Plateforme SaaS dédiée aux pizzaïolos et food-trucks. Gestion des commandes, paiements et livraisons depuis une interface unique pour simplifier la vente en ligne multi-points.',
    tags: ['React', 'Firebase', 'Vite', 'Stripe'],
    links: [
      { label: 'Code', href: 'https://github.com/malikkaraoui/PLANIZZA-', kind: 'code' },
      { label: 'Live', href: 'https://pizzaella.fr', kind: 'live' },
    ],
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

function renderLinkIcon(kind) {
  if (kind === 'code') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    )
  }

  if (kind === 'article') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    )
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  )
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

        <div className="projects__list">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              className="project-row"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={i + 1}
            >
              <div className="project-row__meta">
                <p className="project-row__eyebrow">{project.eyebrow}</p>
                <h3 className="project-row__title">{project.title}</h3>
              </div>

              <div className="project-row__body">
                <p className="project-row__desc">{project.description}</p>

                <div className="project-row__tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-row__tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-row__links">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-row__link"
                      aria-label={`Ouvrir ${link.label} pour ${project.title}`}
                    >
                      {renderLinkIcon(link.kind)}
                      {link.kind === 'live' && <span className="project-row__live-dot" />}
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
