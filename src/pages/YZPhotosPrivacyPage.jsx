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
    eyebrow: 'iOS · iPhone · Application photo',
    title: 'Politique de confidentialité',
    date: 'YZPhotos · Dernière mise à jour : 1 juillet 2026',
    sections: [
      { h: 'Données collectées', p: "YZPhotos ne collecte aucune donnée personnelle. L'application ne nécessite pas de compte, d'inscription, ni d'authentification d'aucune sorte. Elle fonctionne intégralement hors-ligne, sur votre appareil." },
      { h: 'Accès à vos photos', p: "Pour remplir sa fonction, YZPhotos peut demander l'accès à votre photothèque. Vos photos sont lues et traitées uniquement en local, sur votre appareil, via le système Photos d'Apple. Elles ne sont jamais téléversées, transmises à un serveur, ni partagées avec des tiers." },
      { h: 'Trackers et analytics', p: "L'application ne contient aucun outil de tracking, aucun SDK publicitaire et aucune solution d'analytics. Aucune donnée de comportement ou d'usage n'est collectée." },
      { h: 'Partage avec des tiers', p: "Aucune donnée n'est vendue, louée ou partagée avec des tiers, quels qu'ils soient." },
      { h: "Données stockées sur l'appareil", p: "Les préférences de l'application (réglages, favoris) sont conservées localement sur votre appareil et restent sous votre contrôle. Vous pouvez les supprimer à tout moment en désinstallant l'application." },
    ],
    contactH: 'Contact',
    contactP: 'Pour toute question relative à cette politique, vous pouvez me contacter à',
    back: '← Retour à YZPhotos',
  },
  en: {
    eyebrow: 'iOS · iPhone · Photo app',
    title: 'Privacy Policy',
    date: 'YZPhotos · Last updated: July 1, 2026',
    sections: [
      { h: 'Data collected', p: 'YZPhotos does not collect any personal data. The app does not require an account, sign-up, or any form of authentication. It works entirely offline, on your device.' },
      { h: 'Access to your photos', p: "To do its job, YZPhotos may request access to your photo library. Your photos are read and processed only locally, on your device, through Apple's Photos framework. They are never uploaded, sent to a server, or shared with third parties." },
      { h: 'Trackers and analytics', p: 'The app contains no tracking tools, no advertising SDK, and no analytics solution. No behavioral or usage data is collected.' },
      { h: 'Sharing with third parties', p: 'No data is sold, rented, or shared with any third party.' },
      { h: 'Data stored on the device', p: 'App preferences (settings, favorites) are stored locally on your device and remain under your control. You can delete them at any time by uninstalling the app.' },
    ],
    contactH: 'Contact',
    contactP: 'For any question about this policy, you can reach me at',
    back: '← Back to YZPhotos',
  },
}

export default function YZPhotosPrivacyPage() {
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

      <Link to={withLocale('/YZPhotos')} style={s.back}>
        {t.back}
      </Link>
    </div>
  )
}
