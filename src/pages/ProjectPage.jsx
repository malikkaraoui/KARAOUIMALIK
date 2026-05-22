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

function StripeTicket({ link }) {
  const isMac = link.platform === 'macos'
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`lunii-ticket lunii-ticket--${isMac ? 'mac' : 'win'}`}
    >
      <span className="lunii-ticket__os">
        <span className="lunii-ticket__dot" aria-hidden="true" />
        {isMac ? 'macOS' : 'Windows'}
      </span>
      <span className="lunii-ticket__price">9,99 €</span>
      <span className="lunii-ticket__sub">One-time · Lifetime</span>
      <svg className="lunii-ticket__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
  )
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

  const { title, eyebrow, description, tags, links, content, mediumUrl } = project
  const isLunii = slug === 'luniisync'
  const isBoites = slug === 'boites-a-livres'

  const stripeLinks = links.filter(l => l.kind === 'stripe')
  const otherLinks = links.filter(l => l.kind !== 'stripe')

  return (
    <div className={`project-page${isLunii ? ' project-page--lunii' : ''}${isBoites ? ' project-page--boites' : ''}`}>
      {isLunii && (
        <motion.div
          className="lunii-hero"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <img src="/luniisync/hero.png" alt="Synchro Boite à Histoires — Glissez. Synchronisez. Écoutez." />
        </motion.div>
      )}
      {isBoites && (
        <motion.div
          className="boites-hero"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <img src="/boites-a-livres/hero.png" alt="Boîtes à Livres — La France lit. Partout." />
        </motion.div>
      )}

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

          {mediumUrl !== undefined && (
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3.5}>
              {mediumUrl ? (
                <a
                  href={mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-page__medium-btn project-page__medium-btn--live"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                  </svg>
                  Lire sur Medium
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              ) : (
                <span className="project-page__medium-btn project-page__medium-btn--draft">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                  </svg>
                  Article · Bientôt sur Medium
                </span>
              )}
            </motion.div>
          )}

          {isLunii && stripeLinks.length > 0 && (
            <motion.div className="lunii-tickets" variants={fadeUp} initial="hidden" animate="visible" custom={4}>
              {stripeLinks.map(link => (
                <StripeTicket key={link.label} link={link} />
              ))}
            </motion.div>
          )}

          {!isLunii && links.length > 0 && (
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

          {isLunii && otherLinks.length > 0 && (
            <motion.div className="project-page__links" variants={fadeUp} initial="hidden" animate="visible" custom={5}>
              {otherLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="project-page__link">
                  {renderLinkIcon(link.kind)}
                  <span>{link.label}</span>
                </a>
              ))}
            </motion.div>
          )}
        </div>

        {isBoites && (
          <motion.div className="boites-screens" variants={fadeUp} initial="hidden" animate="visible" custom={5}>
            {[
              { src: '/boites-a-livres/screen-hero.png',       alt: 'Écran d\'accueil — Des histoires à chaque coin de rue' },
              { src: '/boites-a-livres/screen-carte.png',      alt: 'Carte interactive — Une carte, mille lectures' },
              { src: '/boites-a-livres/screen-detail.png',     alt: 'Détail boîte — Un livre déposé, une histoire qui voyage' },
              { src: '/boites-a-livres/screen-contribuer.png', alt: 'Contribuer — Ce sont les lecteurs qui font vivre l\'app' },
            ].map(s => (
              <img key={s.src} src={s.src} alt={s.alt} loading="lazy" />
            ))}
          </motion.div>
        )}

        {isBoites && project.stats && (
          <motion.div className="boites-stats" variants={fadeUp} initial="hidden" animate="visible" custom={5}>
            <div className="boites-stats__highlights">
              {project.stats.highlights.map(h => (
                <div key={h.label} className="boites-stats__highlight">
                  <span className="boites-stats__value">{h.value}</span>
                  <span className="boites-stats__label">{h.label}</span>
                </div>
              ))}
            </div>
            <div className="boites-stats__tables">
              <div className="boites-stats__table">
                <h3 className="boites-stats__table-title">Par zone</h3>
                <table>
                  <thead><tr><th>Zone</th><th>Boîtes</th></tr></thead>
                  <tbody>
                    {project.stats.regions.map(r => (
                      <tr key={r.name}>
                        <td>{r.flag} {r.name}</td>
                        <td>{r.count} <span className="boites-stats__pct">({r.pct})</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="boites-stats__table">
                <h3 className="boites-stats__table-title">Top pays</h3>
                <table>
                  <thead><tr><th>Pays</th><th>Total</th></tr></thead>
                  <tbody>
                    {project.stats.topCountries.map(c => (
                      <tr key={c.name}>
                        <td>{c.flag} {c.name}</td>
                        <td>{c.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        <div className="project-page__body">
          {isLunii ? (
            <>
              <motion.div className="project-page__section lunii-section--illus" variants={fadeUp} initial="hidden" animate="visible" custom={5}>
                <div className="lunii-section__text">
                  <h2 className="project-page__section-title">Le problème</h2>
                  <p className="project-page__section-body">{content.problem}</p>
                </div>
                <div className="lunii-section__img">
                  <img src="/luniisync/problem.png" alt="Le problème" loading="lazy" />
                </div>
              </motion.div>

              <motion.div className="project-page__section lunii-section--illus lunii-section--reverse" variants={fadeUp} initial="hidden" animate="visible" custom={6}>
                <div className="lunii-section__text">
                  <h2 className="project-page__section-title">La solution</h2>
                  <p className="project-page__section-body">{content.solution}</p>
                </div>
                <div className="lunii-section__img">
                  <img src="/luniisync/solution.png" alt="La solution" loading="lazy" />
                </div>
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

              <motion.div
                className="project-page__section lunii-section--devices"
                variants={fadeUp} initial="hidden" animate="visible" custom={7 + content.sections.length}
              >
                <img src="/luniisync/devices.png" alt="Lunii device variations" loading="lazy" />
              </motion.div>

              <motion.div
                className="lunii-screens"
                variants={fadeUp} initial="hidden" animate="visible" custom={8 + content.sections.length}
              >
                {[
                  { src: '/luniisync/screen-1.png', alt: "Interface Synchro Boite à Histoires — vue principale" },
                  { src: '/luniisync/screen-2.png', alt: "Interface Synchro Boite à Histoires — synchronisation" },
                  { src: '/luniisync/screen-3.png', alt: "Interface Synchro Boite à Histoires — liste des histoires" },
                ].map(s => (
                  <img key={s.src} src={s.src} alt={s.alt} loading="lazy" />
                ))}
              </motion.div>
            </>
          ) : (
            <>
              <motion.div className="project-page__section" variants={fadeUp} initial="hidden" animate="visible" custom={6}>
                <h2 className="project-page__section-title">Le problème</h2>
                <p className="project-page__section-body">{content.problem}</p>
              </motion.div>

              <motion.div className="project-page__section" variants={fadeUp} initial="hidden" animate="visible" custom={7}>
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}
