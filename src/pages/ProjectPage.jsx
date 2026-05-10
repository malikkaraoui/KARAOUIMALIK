import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProjectBySlug } from '../data/projects'
import { renderLinkIcon } from '../components/Projects'
import './ProjectPage.css'

const ease = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease },
  }),
}

export default function ProjectPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = getProjectBySlug(slug)

  if (!project) {
    return (
      <div className="project-page__not-found">
        <p>Projet introuvable.</p>
        <Link to="/" className="project-page__back">← Retour</Link>
      </div>
    )
  }

  const { title, eyebrow, description, tags, links, content } = project

  return (
    <div className="project-page">
      <div className="container">
        <motion.div
          className="project-page__nav"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <button onClick={() => navigate(-1)} className="project-page__back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Projets
          </button>
        </motion.div>

        <div className="project-page__header">
          <motion.p className="project-page__eyebrow" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            {eyebrow}
          </motion.p>
          <motion.h1 className="project-page__title" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            {title}
          </motion.h1>
          <motion.p className="project-page__desc" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            {description}
          </motion.p>

          <motion.div className="project-page__tags" variants={fadeUp} initial="hidden" animate="visible" custom={3}>
            {tags.map((t) => (
              <span key={t} className="project-row__tag">{t}</span>
            ))}
          </motion.div>

          {links.length > 0 && (
            <motion.div className="project-page__links" variants={fadeUp} initial="hidden" animate="visible" custom={4}>
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-page__link"
                >
                  {renderLinkIcon(link.kind)}
                  {link.kind === 'live' && <span className="project-row__live-dot" />}
                  <span>{link.label}</span>
                </a>
              ))}
            </motion.div>
          )}
        </div>

        <div className="project-page__body">
          <motion.div className="project-page__section" variants={fadeUp} initial="hidden" animate="visible" custom={5}>
            <h2 className="project-page__section-title">Le problème</h2>
            <p className="project-page__section-body">{content.problem}</p>
          </motion.div>

          <motion.div className="project-page__section" variants={fadeUp} initial="hidden" animate="visible" custom={6}>
            <h2 className="project-page__section-title">La solution</h2>
            <p className="project-page__section-body">{content.solution}</p>
          </motion.div>

          {content.sections.map((s, i) => (
            <motion.div
              key={s.title}
              className="project-page__section"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={7 + i}
            >
              <h2 className="project-page__section-title">{s.title}</h2>
              <p className="project-page__section-body">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
