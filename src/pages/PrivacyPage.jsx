import { Link } from 'react-router-dom'
import { useLocale, useLocalizedPath } from '../i18n/LocaleContext'

const s = {
  page: {
    minHeight: '100vh',
    maxWidth: '680px',
    margin: '0 auto',
    padding: '6rem 2rem 4rem',
  },
  eyebrow: {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-muted, #888)',
    marginBottom: '0.75rem',
  },
  h1: {
    fontSize: '1.75rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    lineHeight: 1.2,
  },
  date: {
    fontSize: '0.85rem',
    color: 'var(--color-muted, #888)',
    marginBottom: '3rem',
  },
  h2: {
    fontSize: '1rem',
    fontWeight: 700,
    marginTop: '2rem',
    marginBottom: '0.5rem',
  },
  p: {
    fontSize: '0.95rem',
    lineHeight: 1.7,
    color: 'var(--color-text, #111)',
    marginBottom: '0.75rem',
  },
  back: {
    display: 'inline-block',
    marginTop: '3rem',
    fontSize: '0.85rem',
    color: 'var(--color-muted, #888)',
    textDecoration: 'none',
  },
}

const T = {
  fr: {
    eyebrow: 'iOS · SwiftUI · MapKit',
    title: 'Politique de confidentialité',
    date: 'Boîtes à Livres · Dernière mise à jour : 11 mai 2026',
    sections: [
      { h: 'Données collectées', p: "Boîtes à Livres ne collecte aucune donnée personnelle. L'application ne nécessite pas de compte, d'inscription, ni d'authentification d'aucune sorte." },
      { h: 'Localisation', p: "L'application peut demander l'accès à votre position géographique afin de centrer la carte sur votre position actuelle. Cette donnée est utilisée uniquement localement, sur votre appareil, via le système MapKit d'Apple. Elle n'est jamais transmise, stockée sur un serveur, ni partagée avec des tiers." },
      { h: 'Trackers et analytics', p: "L'application ne contient aucun outil de tracking, aucun SDK publicitaire et aucune solution d'analytics. Aucune donnée de comportement ou d'usage n'est collectée." },
      { h: 'Partage avec des tiers', p: "Aucune donnée n'est vendue, louée ou partagée avec des tiers, quels qu'ils soient." },
      { h: "Données stockées sur l'appareil", p: "Les préférences de l'application (favoris, filtres) sont conservées localement sur votre appareil et restent sous votre contrôle. Vous pouvez les supprimer à tout moment en désinstallant l'application." },
    ],
    contactH: 'Contact',
    contactP: 'Pour toute question relative à cette politique, vous pouvez me contacter à',
    back: '← Retour au projet',
  },
  en: {
    eyebrow: 'iOS · SwiftUI · MapKit',
    title: 'Privacy Policy',
    date: 'Boîtes à Livres · Last updated: May 11, 2026',
    sections: [
      { h: 'Data collected', p: "Boîtes à Livres does not collect any personal data. The app does not require an account, sign-up, or any form of authentication." },
      { h: 'Location', p: "The app may request access to your geographic location to center the map on your current position. This data is used only locally, on your device, through Apple's MapKit framework. It is never transmitted, stored on a server, or shared with third parties." },
      { h: 'Trackers and analytics', p: 'The app contains no tracking tools, no advertising SDK, and no analytics solution. No behavioral or usage data is collected.' },
      { h: 'Sharing with third parties', p: 'No data is sold, rented, or shared with any third party.' },
      { h: 'Data stored on the device', p: 'App preferences (favorites, filters) are stored locally on your device and remain under your control. You can delete them at any time by uninstalling the app.' },
    ],
    contactH: 'Contact',
    contactP: 'For any question about this policy, you can reach me at',
    back: '← Back to the project',
  },
}

export default function PrivacyPage() {
  const locale = useLocale()
  const withLocale = useLocalizedPath()
  const t = T[locale]

  return (
    <div style={s.page}>
      <p style={s.eyebrow}>{t.eyebrow}</p>
      <h1 style={s.h1}>{t.title}</h1>
      <p style={s.date}>{t.date}</p>

      {t.sections.map((sec) => (
        <div key={sec.h}>
          <h2 style={s.h2}>{sec.h}</h2>
          <p style={s.p}>{sec.p}</p>
        </div>
      ))}

      <h2 style={s.h2}>{t.contactH}</h2>
      <p style={s.p}>
        {t.contactP}{' '}
        <a href="mailto:karaoui.malik@gmail.com" style={{ color: 'inherit' }}>
          karaoui.malik@gmail.com
        </a>.
      </p>

      <Link to={withLocale('/')} style={s.back}>
        {t.back}
      </Link>
    </div>
  )
}
