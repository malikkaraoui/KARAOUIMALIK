import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import './Projects.css'

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

export function renderLinkIcon(kind) {
  if (kind === 'store') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    )
  }

  if (kind === 'code') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    )
  }

  if (kind === 'spotify') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    )
  }

  if (kind === 'apple-podcast') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.34 0A5.328 5.328 0 0 0 0 5.34v13.32A5.328 5.328 0 0 0 5.34 24h13.32A5.328 5.328 0 0 0 24 18.66V5.34A5.328 5.328 0 0 0 18.66 0zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.608 1.684 2.447 3.64 2.47 5.96.024 2.48-.904 4.854-2.625 6.512a8.088 8.088 0 0 1-5.89 2.333 8.042 8.042 0 0 1-5.89-2.333 8.618 8.618 0 0 1-2.624-6.512c.022-2.32.861-4.276 2.47-5.96a8.207 8.207 0 0 1 6.033-2.587zm0 1.643a6.37 6.37 0 0 0-4.668 2.015 6.837 6.837 0 0 0-1.919 4.608c-.019 1.926.702 3.768 2.034 5.05a6.23 6.23 0 0 0 4.553 1.806 6.23 6.23 0 0 0 4.552-1.806 6.725 6.725 0 0 0 2.035-5.05 6.837 6.837 0 0 0-1.92-4.608 6.37 6.37 0 0 0-4.667-2.015zm0 2.99c1.783 0 3.23 1.442 3.23 3.22 0 1.066-.53 2.01-1.337 2.59.102.293.17.6.17.921 0 1.143-.93 2.075-2.075 2.075-1.144 0-2.075-.932-2.075-2.075 0-.32.068-.628.17-.92a3.23 3.23 0 0 1-1.338-2.591c0-1.778 1.447-3.22 3.255-3.22zm0 1.356a1.864 1.864 0 1 0 0 3.729 1.864 1.864 0 0 0 0-3.73z"/>
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
              key={project.slug}
              className="project-row"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={i + 1}
            >
              <div className="project-row__meta">
                <p className="project-row__eyebrow">{project.eyebrow}</p>
                <Link to={`/projects/${project.slug}`} className="project-row__title-link">
                  <h3 className="project-row__title">{project.title}</h3>
                  <span className="project-row__arrow" aria-hidden="true">→</span>
                </Link>
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
                  <Link
                    to={`/projects/${project.slug}`}
                    className="project-row__link project-row__link--detail"
                    aria-label={`Voir le détail de ${project.title}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                    <span>En savoir plus</span>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
