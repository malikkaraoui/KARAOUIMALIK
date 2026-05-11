import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const DOWNLOADS = {
  macos: {
    label: 'Télécharger pour macOS (.dmg)',
    href: 'https://github.com/malikkaraoui/lunii-sync/releases/latest/download/LuniiSync-macOS.dmg',
    note: 'DMG signé et notarisé — glisser-déposer dans Applications.',
  },
  windows: {
    label: 'Télécharger pour Windows (.zip)',
    href: 'https://github.com/malikkaraoui/lunii-sync/releases/latest/download/LuniiSync-Windows.zip',
    note: 'Extraire le ZIP puis lancer LuniiSync.exe. SmartScreen peut afficher une alerte au premier lancement — cliquer "Informations complémentaires" → "Exécuter quand même".',
  },
}

export default function DownloadPage() {
  const [platform, setPlatform] = useState(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('lunii_platform')
    if (saved) {
      setPlatform(saved)
      sessionStorage.removeItem('lunii_platform')
    }
  }, [])

  const download = platform ? DOWNLOADS[platform] : null

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Merci pour ton achat !</h1>
      <p style={{ color: 'var(--color-muted, #888)', marginBottom: '2rem' }}>LuniiSync est prêt à être téléchargé.</p>

      {download ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <a
            href={download.href}
            className="project-page__link"
            style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>{download.label}</span>
          </a>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-muted, #888)', maxWidth: '400px' }}>{download.note}</p>
          <p style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
            Besoin de l'autre version ?{' '}
            {platform === 'macos'
              ? <a href={DOWNLOADS.windows.href} style={{ color: 'inherit' }}>Télécharger Windows</a>
              : <a href={DOWNLOADS.macos.href} style={{ color: 'inherit' }}>Télécharger macOS</a>
            }
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <a href={DOWNLOADS.macos.href} className="project-page__link" style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}>
            <span>Télécharger macOS (.dmg)</span>
          </a>
          <a href={DOWNLOADS.windows.href} className="project-page__link" style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}>
            <span>Télécharger Windows (.zip)</span>
          </a>
        </div>
      )}

      <Link to="/" style={{ marginTop: '3rem', fontSize: '0.85rem', color: 'var(--color-muted, #888)' }}>
        ← Retour au site
      </Link>
    </div>
  )
}
