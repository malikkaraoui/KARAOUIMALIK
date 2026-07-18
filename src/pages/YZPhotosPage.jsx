import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { renderLinkIcon } from '../components/Projects'
import './ProjectPage.css'

// ── À compléter ──────────────────────────────────────────────────────────────
// Colle ici le lien App Store quand l'app est publiée. Vide = badge « bientôt ».
const APP_STORE_URL = ''
// ─────────────────────────────────────────────────────────────────────────────

const ease = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease },
  }),
}

const TAGS = ['iOS', 'iPhone', 'Photo', '100 % hors-ligne', 'Sans compte']

const SECTIONS = [
  {
    title: '100 % sur votre iPhone',
    body: "Tout ce que fait YZPhotos se passe localement, sur votre appareil. Vos images ne sont ni téléversées, ni copiées sur un serveur, ni analysées à distance. Elles restent là où elles doivent être : entre vos mains.",
  },
  {
    title: 'Aucune donnée collectée',
    body: "YZPhotos ne collecte aucune donnée personnelle. Pas de compte à créer, pas d'e-mail à fournir, pas d'identifiant publicitaire. L'application fonctionne intégralement hors-ligne.",
  },
  {
    title: 'Zéro traqueur, zéro publicité',
    body: "Aucun SDK d'analytics, aucune régie publicitaire, aucun pixel de suivi. YZPhotos ne sait rien de vous, et c'est un choix d'architecture, pas une option à activer.",
  },
]

export default function YZPhotosPage() {
  return (
    <div className="project-page">
      <div className="container">
        <motion.div
          className="project-page__nav"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <Link to="/" className="project-page__back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Accueil
          </Link>
        </motion.div>

        <div className="project-page__header">
          <motion.p className="project-page__eyebrow" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            iOS · iPhone · Application photo
          </motion.p>
          <motion.h1 className="project-page__title" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            YZPhotos
          </motion.h1>
          <motion.p className="project-page__desc" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            YZPhotos est une application photo pour iPhone pensée autour d'un principe
            non négociable : vos images ne quittent jamais votre appareil. Pas de compte,
            pas de cloud, pas de traqueurs : juste vos photos, chez vous.
          </motion.p>

          <motion.div className="project-page__tags" variants={fadeUp} initial="hidden" animate="visible" custom={3}>
            {TAGS.map((t) => (
              <span key={t} className="project-row__tag">{t}</span>
            ))}
          </motion.div>

          <motion.div className="project-page__links" variants={fadeUp} initial="hidden" animate="visible" custom={4}>
            {APP_STORE_URL ? (
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="project-page__link"
              >
                {renderLinkIcon('store')}
                <span>App Store</span>
              </a>
            ) : (
              <span className="project-page__medium-btn project-page__medium-btn--draft">
                Bientôt disponible sur l'App Store
              </span>
            )}
            <Link to="/YZPhotos/privacy" className="project-page__link">
              <span>Confidentialité</span>
            </Link>
          </motion.div>
        </div>

        <div className="project-page__body">
          {SECTIONS.map((s, i) => (
            <motion.div
              key={s.title}
              className="project-page__section"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5 + i}
            >
              <h2 className="project-page__section-title">{s.title}</h2>
              <p className="project-page__section-body">{s.body}</p>
            </motion.div>
          ))}

          <motion.div
            className="project-page__section"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5 + SECTIONS.length}
          >
            <h2 className="project-page__section-title">Confidentialité par conception</h2>
            <p className="project-page__section-body">
              La protection de vos photos n'est pas une promesse marketing : c'est
              l'architecture même de l'application.{' '}
              <Link to="/YZPhotos/privacy" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                Consulter la politique de confidentialité
              </Link>.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
