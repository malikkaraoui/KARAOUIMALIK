import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { initializeApp, getApps } from 'firebase/app'
import { connectFunctionsEmulator } from 'firebase/functions'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const functions = getFunctions(app, 'europe-west1')

if (import.meta.env.DEV) {
  connectFunctionsEmulator(functions, '127.0.0.1', 5001)
}

const DOWNLOADS = {
  macos: {
    primary: {
      label: 'Télécharger pour macOS — Apple Silicon (.dmg)',
      href: 'https://github.com/malikkaraoui/Lunii_Synchro/releases/latest/download/LuniiSync-macOS-AppleSilicon.dmg',
    },
    secondary: {
      label: 'Télécharger pour macOS — Intel (.dmg)',
      href: 'https://github.com/malikkaraoui/Lunii_Synchro/releases/latest/download/LuniiSync-macOS-Intel.dmg',
    },
    note: 'Choisis Apple Silicon pour M1 / M2 / M3 / M4. Choisis Intel si ton Mac est un ancien modèle Intel.',
    other: 'windows',
    otherLabel: 'Télécharger Windows',
  },
  windows: {
    primary: {
      label: 'Télécharger pour Windows (.exe)',
      href: 'https://github.com/malikkaraoui/Lunii_Synchro/releases/latest/download/LuniiSync-Windows.exe',
    },
    note: 'Télécharge puis lance LuniiSync.exe. Windows peut afficher une alerte SmartScreen au premier lancement — cliquer « Informations complémentaires » → « Exécuter quand même ».',
    other: 'macos',
    otherLabel: 'Télécharger macOS',
  },
}

export default function DownloadPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('loading')
  const [platform, setPlatform] = useState(null)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      navigate('/projects/luniisync', { replace: true })
      return
    }

    const validateStripeSession = httpsCallable(functions, 'validateStripeSession')

    validateStripeSession({ session_id: sessionId })
      .then((result) => {
        const { valid, platform: serverPlatform } = result.data
        if (valid && (serverPlatform === 'macos' || serverPlatform === 'windows')) {
          setPlatform(serverPlatform)
          setStatus('valid')
        } else {
          setStatus('invalid')
        }
      })
      .catch(() => {
        setStatus('error')
      })
  }, [])

  if (status === 'loading') {
    return (
      <div style={centeredStyle}>
        <div style={spinnerStyle} />
        <p style={{ color: 'var(--text-secondary, #888)', marginTop: '1rem' }}>
          Vérification du paiement…
        </p>
      </div>
    )
  }

  if (status === 'invalid' || status === 'error') {
    return (
      <div style={centeredStyle}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          {status === 'error' ? 'Erreur de vérification' : 'Paiement non reconnu'}
        </h1>
        <p style={{ color: 'var(--text-secondary, #888)', marginBottom: '2rem' }}>
          {status === 'error'
            ? 'Une erreur est survenue. Réessaie dans quelques instants.'
            : "Ce lien de téléchargement n'est pas valide ou a expiré."}
        </p>
        <Link to="/projects/luniisync" className="project-page__link">
          Retourner à la page LuniiSync
        </Link>
      </div>
    )
  }

  const download = DOWNLOADS[platform]
  const otherPlatform = DOWNLOADS[download.other]

  return (
    <div style={centeredStyle}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Merci pour ton achat !
      </h1>
      <p style={{ color: 'var(--text-secondary, #888)', marginBottom: '2rem' }}>
        LuniiSync est prêt à être téléchargé.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <a
          href={download.primary.href}
          className="project-page__link"
          style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>{download.primary.label}</span>
        </a>

        {download.secondary && (
          <a
            href={download.secondary.href}
            className="project-page__link"
            style={{ fontSize: '0.95rem', padding: '0.7rem 1.4rem', opacity: 0.95 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>{download.secondary.label}</span>
          </a>
        )}

        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary, #888)', maxWidth: '400px' }}>
          {download.note}
        </p>
        <p style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
          Besoin de l'autre version ?{' '}
          <a href={otherPlatform.primary.href} style={{ color: 'inherit' }}>
            {download.otherLabel}
          </a>
        </p>
      </div>

      <Link to="/" style={{ marginTop: '3rem', fontSize: '0.85rem', color: 'var(--text-secondary, #888)' }}>
        ← Retour au site
      </Link>
    </div>
  )
}

const centeredStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  textAlign: 'center',
}

const spinnerStyle = {
  width: '32px',
  height: '32px',
  border: '3px solid var(--border, #ccc)',
  borderTopColor: 'var(--text, #111)',
  borderRadius: '50%',
  animation: 'spin 0.8s linear infinite',
}
