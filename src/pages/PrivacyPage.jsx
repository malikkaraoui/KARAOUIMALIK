import { Link } from 'react-router-dom'

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

export default function PrivacyPage() {
  return (
    <div style={s.page}>
      <p style={s.eyebrow}>iOS · SwiftUI · MapKit</p>
      <h1 style={s.h1}>Politique de confidentialité</h1>
      <p style={s.date}>Boîtes à Livres — Dernière mise à jour : 11 mai 2026</p>

      <h2 style={s.h2}>Données collectées</h2>
      <p style={s.p}>
        Boîtes à Livres ne collecte aucune donnée personnelle. L'application ne
        nécessite pas de compte, d'inscription, ni d'authentification d'aucune sorte.
      </p>

      <h2 style={s.h2}>Localisation</h2>
      <p style={s.p}>
        L'application peut demander l'accès à votre position géographique afin de
        centrer la carte sur votre position actuelle. Cette donnée est utilisée
        uniquement localement, sur votre appareil, via le système MapKit d'Apple.
        Elle n'est jamais transmise, stockée sur un serveur, ni partagée avec des
        tiers.
      </p>

      <h2 style={s.h2}>Trackers et analytics</h2>
      <p style={s.p}>
        L'application ne contient aucun outil de tracking, aucun SDK publicitaire et
        aucune solution d'analytics. Aucune donnée de comportement ou d'usage n'est
        collectée.
      </p>

      <h2 style={s.h2}>Partage avec des tiers</h2>
      <p style={s.p}>
        Aucune donnée n'est vendue, louée ou partagée avec des tiers, quels qu'ils soient.
      </p>

      <h2 style={s.h2}>Données stockées sur l'appareil</h2>
      <p style={s.p}>
        Les préférences de l'application (favoris, filtres) sont conservées
        localement sur votre appareil et restent sous votre contrôle. Vous pouvez
        les supprimer à tout moment en désinstallant l'application.
      </p>

      <h2 style={s.h2}>Contact</h2>
      <p style={s.p}>
        Pour toute question relative à cette politique, vous pouvez me contacter à{' '}
        <a href="mailto:karaoui.malik@gmail.com" style={{ color: 'inherit' }}>
          karaoui.malik@gmail.com
        </a>.
      </p>

      <Link to="/" style={s.back}>
        ← Retour au projet
      </Link>
    </div>
  )
}
