import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProjectBySlugForLocale } from '../data/locale'
import { useLocale, useStrings, useLocalizedPath } from '../i18n/LocaleContext'
import { renderLinkIcon } from '../components/Projects'
import './ProjectPage.css'

const ease = [0.16, 1, 0.3, 1]

const PRESENTATION = {
  fr: {
    luniiHeroAlt: 'Synchro Boite à Histoires. Glissez. Synchronisez. Écoutez.',
    boitesHeroAlt: 'Boîtes à Livres. La France lit. Partout.',
    problemAlt: 'Le problème',
    solutionAlt: 'La solution',
    lithoDevices: 'Variantes de Lunii',
    boitesScreens: [
      { src: '/boites-a-livres/screen-hero.png', alt: "Écran d'accueil : des histoires à chaque coin de rue" },
      { src: '/boites-a-livres/screen-carte.png', alt: 'Carte interactive : une carte, mille lectures' },
      { src: '/boites-a-livres/screen-detail.png', alt: 'Détail boîte : un livre déposé, une histoire qui voyage' },
      { src: '/boites-a-livres/screen-contribuer.png', alt: "Contribuer : ce sont les lecteurs qui font vivre l'app" },
    ],
    luniiScreens: [
      { src: '/luniisync/screen-1.png', alt: 'Interface Synchro Boite à Histoires, vue principale' },
      { src: '/luniisync/screen-3.png', alt: 'Interface Synchro Boite à Histoires, liste des histoires' },
    ],
  },
  en: {
    luniiHeroAlt: 'Synchro Boite à Histoires. Drag it in. Sync it. Listen.',
    boitesHeroAlt: 'Boîtes à Livres. Street libraries, everywhere.',
    problemAlt: 'The problem',
    solutionAlt: 'The solution',
    lithoDevices: 'Lunii device variations',
    boitesScreens: [
      { src: '/boites-a-livres/screen-hero.png', alt: 'Home screen: a story on every street corner' },
      { src: '/boites-a-livres/screen-carte.png', alt: 'Interactive map: one map, a thousand reads' },
      { src: '/boites-a-livres/screen-detail.png', alt: 'Box detail: a book dropped off, a story on the move' },
      { src: '/boites-a-livres/screen-contribuer.png', alt: 'Contribute: readers keep the app alive' },
    ],
    luniiScreens: [
      { src: '/luniisync/screen-1.png', alt: 'Synchro Boite à Histoires interface, main view' },
      { src: '/luniisync/screen-3.png', alt: 'Synchro Boite à Histoires interface, story list' },
    ],
  },
}

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
  const [lightbox, setLightbox] = useState(null)
  const locale = useLocale()
  const t = useStrings()
  const withLocale = useLocalizedPath()
  const p = PRESENTATION[locale]
  const project = getProjectBySlugForLocale(slug, locale)

  if (!project) {
    return (
      <div className="project-page__not-found">
        <p>{t.projectPage.notFound}</p>
        <Link to={withLocale('/')} className="project-page__back">{t.projectPage.backArrow}</Link>
      </div>
    )
  }

  const { title, eyebrow, description, tags, links, content, mediumUrl } = project
  const isLunii = slug === 'luniisync'
  const isBoites = slug === 'boites-a-livres'
  const hasRichSections = content.sections.some(s => s.table || s.image)

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
          <img src="/luniisync/hero.png" alt={p.luniiHeroAlt} />
        </motion.div>
      )}
      {isBoites && (
        <motion.div
          className="boites-hero"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <img src="/boites-a-livres/hero.png" alt={p.boitesHeroAlt} />
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
            {t.projectPage.back}
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
                  {t.projectPage.readOnMedium}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              ) : (
                <span className="project-page__medium-btn project-page__medium-btn--draft">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                  </svg>
                  {t.projectPage.soonOnMedium}
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
            {p.boitesScreens.map(s => (
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
                <h3 className="boites-stats__table-title">{t.projectPage.byZone}</h3>
                <table>
                  <thead><tr><th>{t.projectPage.zone}</th><th>{t.projectPage.boxes}</th></tr></thead>
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
                <h3 className="boites-stats__table-title">{t.projectPage.topCountries}</h3>
                <table>
                  <thead><tr><th>{t.projectPage.country}</th><th>{t.projectPage.total}</th></tr></thead>
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

        <div className={`project-page__body${hasRichSections ? ' project-page__body--single' : ''}`}>
          {isLunii ? (
            <>
              <motion.div className="project-page__section lunii-section--illus" variants={fadeUp} initial="hidden" animate="visible" custom={5}>
                <div className="lunii-section__text">
                  <h2 className="project-page__section-title">{t.projectPage.problem}</h2>
                  <p className="project-page__section-body">{content.problem}</p>
                </div>
                <div className="lunii-section__img">
                  <img src="/luniisync/problem.png" alt={p.problemAlt} loading="lazy" />
                </div>
              </motion.div>

              <motion.div className="project-page__section lunii-section--illus lunii-section--reverse" variants={fadeUp} initial="hidden" animate="visible" custom={6}>
                <div className="lunii-section__text">
                  <h2 className="project-page__section-title">{t.projectPage.solution}</h2>
                  <p className="project-page__section-body">{content.solution}</p>
                </div>
                <div className="lunii-section__img">
                  <img src="/luniisync/solution.png" alt={p.solutionAlt} loading="lazy" />
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
                <img src="/luniisync/devices.png" alt={p.lithoDevices} loading="lazy" />
              </motion.div>

              <motion.div
                className="lunii-screens"
                variants={fadeUp} initial="hidden" animate="visible" custom={8 + content.sections.length}
              >
                {p.luniiScreens.map(s => (
                  <img
                    key={s.src}
                    src={s.src}
                    alt={s.alt}
                    loading="lazy"
                    className="lunii-screens__img"
                    onClick={() => setLightbox(s)}
                  />
                ))}
              </motion.div>

              {lightbox && (
                <div className="lunii-lightbox" onClick={() => setLightbox(null)}>
                  <img src={lightbox.src} alt={lightbox.alt} />
                </div>
              )}
            </>
          ) : (
            <>
              <motion.div className="project-page__section" variants={fadeUp} initial="hidden" animate="visible" custom={6}>
                <h2 className="project-page__section-title">{t.projectPage.problem}</h2>
                <p className="project-page__section-body">{content.problem}</p>
              </motion.div>

              <motion.div className="project-page__section" variants={fadeUp} initial="hidden" animate="visible" custom={7}>
                <h2 className="project-page__section-title">{t.projectPage.solution}</h2>
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
                  {s.body && s.body.split('\n\n').map((para, pi) => (
                    <p key={pi} className="project-page__section-body">{para}</p>
                  ))}
                  {s.table && (
                    <table className="project-page__table">
                      <tbody>
                        {s.table.rows.map((cols, ri) => (
                          <tr key={ri}>
                            {cols.map((col, ci) => (
                              <td key={ci} className={ci === 0 ? 'project-page__table-key' : 'project-page__table-val'}>{col}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {s.image && (
                    <figure className="project-page__figure">
                      <img src={s.image.src} alt={s.image.alt} loading="lazy" />
                      {s.image.caption && <figcaption>{s.image.caption}</figcaption>}
                    </figure>
                  )}
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
