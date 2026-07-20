import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { renderLinkIcon } from '../components/Projects'
import { useLocale, useLocalizedPath } from '../i18n/LocaleContext'
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

const T = {
  fr: {
    home: 'Accueil',
    iconAlt: "Icône de l'app YZPhotos : une faille sépare deux photos, croix rouge à gauche, coche verte à droite",
    screens: [
      { src: '/yzphotos/screens/trier.jpg', alt: "Écran Trier de YZPhotos : analyse en cours, 2 000 fichiers découverts sur le disque" },
      { src: '/yzphotos/screens/photos-grid.jpg', grid: true, alt: "Bibliothèque photo de YZPhotos qui défile : des dizaines de paysages de montagne chargés en streaming depuis le disque externe" },
      { src: '/yzphotos/screens/stats.jpg', alt: "Écran Statistiques de YZPhotos : 73 097 fichiers et 552 Go indexés, 64 789 photos, 8 308 vidéos" },
    ],
    eyebrow: 'iOS · iPhone · Application photo',
    desc: "YZPhotos est une application photo pour iPhone pensée autour d'un principe non négociable : vos images ne quittent jamais votre appareil. Pas de compte, pas de cloud, pas de traqueurs : juste vos photos, chez vous.",
    tags: ['iOS', 'iPhone', 'Photo', '100 % hors-ligne', 'Sans compte'],
    appStore: 'App Store',
    comingSoon: "Bientôt disponible sur l'App Store",
    privacy: 'Confidentialité',
    sections: [
      { title: '100 % sur votre iPhone', body: "Tout ce que fait YZPhotos se passe localement, sur votre appareil. Vos images ne sont ni téléversées, ni copiées sur un serveur, ni analysées à distance. Elles restent là où elles doivent être : entre vos mains." },
      { title: 'Aucune donnée collectée', body: "YZPhotos ne collecte aucune donnée personnelle. Pas de compte à créer, pas d'e-mail à fournir, pas d'identifiant publicitaire. L'application fonctionne intégralement hors-ligne." },
      { title: 'Zéro traqueur, zéro publicité', body: "Aucun SDK d'analytics, aucune régie publicitaire, aucun pixel de suivi. YZPhotos ne sait rien de vous, et c'est un choix d'architecture, pas une option à activer." },
    ],
    privacyByDesignTitle: 'Confidentialité par conception',
    privacyByDesignBody: "La protection de vos photos n'est pas une promesse marketing : c'est l'architecture même de l'application.",
    privacyByDesignLink: 'Consulter la politique de confidentialité',
  },
  en: {
    home: 'Home',
    iconAlt: 'YZPhotos app icon: a crack splits two photos, red cross on the left, green check on the right',
    screens: [
      { src: '/yzphotos/screens/trier.jpg', alt: 'YZPhotos Sort screen: analysis in progress, 2,000 files discovered on the drive' },
      { src: '/yzphotos/screens/photos-grid.jpg', grid: true, alt: 'YZPhotos photo library scrolling: dozens of mountain landscapes streamed from the external drive' },
      { src: '/yzphotos/screens/stats.jpg', alt: 'YZPhotos Statistics screen: 73,097 files and 552 GB indexed, 64,789 photos, 8,308 videos' },
    ],
    eyebrow: 'iOS · iPhone · Photo app',
    desc: "YZPhotos is an iPhone photo app built around one non-negotiable principle: your images never leave your device. No account, no cloud, no trackers: just your photos, at home.",
    tags: ['iOS', 'iPhone', 'Photo', '100% offline', 'No account'],
    appStore: 'App Store',
    comingSoon: 'Coming soon on the App Store',
    privacy: 'Privacy',
    sections: [
      { title: '100% on your iPhone', body: "Everything YZPhotos does happens locally, on your device. Your images are never uploaded, copied to a server, or analyzed remotely. They stay exactly where they should: in your hands." },
      { title: 'No data collected', body: "YZPhotos does not collect any personal data. No account to create, no email to provide, no advertising identifier. The app works entirely offline." },
      { title: 'Zero trackers, zero ads', body: "No analytics SDK, no ad network, no tracking pixel. YZPhotos knows nothing about you, and that's an architectural choice, not a setting to enable." },
    ],
    privacyByDesignTitle: 'Privacy by design',
    privacyByDesignBody: "Protecting your photos isn't a marketing promise: it's the app's actual architecture.",
    privacyByDesignLink: 'Read the privacy policy',
  },
}

export default function YZPhotosPage() {
  const locale = useLocale()
  const withLocale = useLocalizedPath()
  const t = T[locale]

  return (
    <div className="project-page">
      <div className="container">
        <motion.div
          className="project-page__nav"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <Link to={withLocale('/')} className="project-page__back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            {t.home}
          </Link>
        </motion.div>

        <div className="project-page__header">
          <motion.img
            src="/yzphotos/icon.png"
            alt={t.iconAlt}
            className="yzp-icon"
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
          />
          <motion.p className="project-page__eyebrow" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            {t.eyebrow}
          </motion.p>
          <motion.h1 className="project-page__title" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            YZPhotos
          </motion.h1>
          <motion.p className="project-page__desc" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            {t.desc}
          </motion.p>

          <motion.div className="project-page__tags" variants={fadeUp} initial="hidden" animate="visible" custom={3}>
            {t.tags.map((tag) => (
              <span key={tag} className="project-row__tag">{tag}</span>
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
                <span>{t.appStore}</span>
              </a>
            ) : (
              <span className="project-page__medium-btn project-page__medium-btn--draft">
                {t.comingSoon}
              </span>
            )}
            <Link to={withLocale('/YZPhotos/privacy')} className="project-page__link">
              <span>{t.privacy}</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="yzp-showcase"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
        >
          {t.screens.map((screen) => (
            <div key={screen.src} className={`yzp-iphone${screen.grid ? ' yzp-iphone--main' : ''}`}>
              <div className="yzp-iphone__buttons" aria-hidden="true" />
              <div className="yzp-iphone__screen">
                {screen.grid ? (
                  <div
                    className="yzp-grid"
                    role="img"
                    aria-label={screen.alt}
                    style={{ backgroundImage: `url(${screen.src})` }}
                  />
                ) : (
                  <img src={screen.src} alt={screen.alt} loading="lazy" />
                )}
                <div className="yzp-iphone__island" aria-hidden="true" />
              </div>
            </div>
          ))}
        </motion.div>

        <div className="project-page__body">
          {t.sections.map((s, i) => (
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
            custom={5 + t.sections.length}
          >
            <h2 className="project-page__section-title">{t.privacyByDesignTitle}</h2>
            <p className="project-page__section-body">
              {t.privacyByDesignBody}{' '}
              <Link to={withLocale('/YZPhotos/privacy')} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                {t.privacyByDesignLink}
              </Link>.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
