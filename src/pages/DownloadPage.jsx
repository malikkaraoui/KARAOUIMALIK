import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { initializeApp, getApps } from 'firebase/app'
import { connectFunctionsEmulator } from 'firebase/functions'
import { useLocale, useLocalizedPath } from '../i18n/LocaleContext'

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
  fr: {
    macos: {
      primary: {
        label: 'Télécharger pour macOS · Apple Silicon (.dmg)',
        href: 'https://github.com/malikkaraoui/Synchro_boite_a_histoires/releases/latest/download/LuniiSync-macOS-AppleSilicon.dmg',
      },
      secondary: {
        label: 'Télécharger pour macOS · Intel (.dmg)',
        href: 'https://github.com/malikkaraoui/Synchro_boite_a_histoires/releases/latest/download/LuniiSync-macOS-Intel.dmg',
      },
      note: 'Choisis Apple Silicon pour M1 / M2 / M3 / M4. Choisis Intel si ton Mac est un ancien modèle Intel.',
      other: 'windows',
      otherLabel: 'Télécharger Windows',
    },
    windows: {
      primary: {
        label: 'Télécharger pour Windows (.exe)',
        href: 'https://github.com/malikkaraoui/Synchro_boite_a_histoires/releases/latest/download/LuniiSync-Windows.exe',
      },
      note: "Télécharge puis lance l'application. Windows peut afficher une alerte SmartScreen au premier lancement : cliquer « Informations complémentaires » → « Exécuter quand même ».",
      other: 'macos',
      otherLabel: 'Télécharger macOS',
    },
  },
  en: {
    macos: {
      primary: {
        label: 'Download for macOS · Apple Silicon (.dmg)',
        href: 'https://github.com/malikkaraoui/Synchro_boite_a_histoires/releases/latest/download/LuniiSync-macOS-AppleSilicon.dmg',
      },
      secondary: {
        label: 'Download for macOS · Intel (.dmg)',
        href: 'https://github.com/malikkaraoui/Synchro_boite_a_histoires/releases/latest/download/LuniiSync-macOS-Intel.dmg',
      },
      note: 'Choose Apple Silicon for M1 / M2 / M3 / M4. Choose Intel if your Mac is an older Intel model.',
      other: 'windows',
      otherLabel: 'Download for Windows',
    },
    windows: {
      primary: {
        label: 'Download for Windows (.exe)',
        href: 'https://github.com/malikkaraoui/Synchro_boite_a_histoires/releases/latest/download/LuniiSync-Windows.exe',
      },
      note: 'Download it, then launch the app. Windows may show a SmartScreen warning on first launch: click "More info" then "Run anyway".',
      other: 'macos',
      otherLabel: 'Download for macOS',
    },
  },
}

const T = {
  fr: {
    verifying: 'Vérification du paiement…',
    errorTitle: 'Erreur de vérification',
    invalidTitle: 'Paiement non reconnu',
    errorBody: 'Une erreur est survenue. Réessaie dans quelques instants.',
    invalidBody: "Ce lien de téléchargement n'est pas valide ou a expiré.",
    backToProject: 'Retourner à la page Synchro Boite à Histoires',
    thankYou: 'Merci pour ton achat !',
    ready: 'Synchro Boite à Histoires est prêt à être téléchargé.',
    needOther: "Besoin de l'autre version ?",
    backToSite: '← Retour au site',
  },
  en: {
    verifying: 'Verifying your payment…',
    errorTitle: 'Verification error',
    invalidTitle: 'Payment not recognized',
    errorBody: 'Something went wrong. Please try again in a moment.',
    invalidBody: 'This download link is invalid or has expired.',
    backToProject: 'Back to the Synchro Boite à Histoires page',
    thankYou: 'Thanks for your purchase!',
    ready: 'Synchro Boite à Histoires is ready to download.',
    needOther: 'Need the other version?',
    backToSite: '← Back to site',
  },
}

export default function DownloadPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('loading')
  const [platform, setPlatform] = useState(null)
  const locale = useLocale()
  const withLocale = useLocalizedPath()
  const t = T[locale]
  const downloads = DOWNLOADS[locale]

  useEffect(() => {
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      navigate(withLocale('/projects/luniisync'), { replace: true })
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
          {t.verifying}
        </p>
      </div>
    )
  }

  if (status === 'invalid' || status === 'error') {
    return (
      <div style={centeredStyle}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          {status === 'error' ? t.errorTitle : t.invalidTitle}
        </h1>
        <p style={{ color: 'var(--text-secondary, #888)', marginBottom: '2rem' }}>
          {status === 'error' ? t.errorBody : t.invalidBody}
        </p>
        <Link to={withLocale('/projects/luniisync')} className="project-page__link">
          {t.backToProject}
        </Link>
      </div>
    )
  }

  const download = downloads[platform]
  const otherPlatform = downloads[download.other]

  return (
    <div style={centeredStyle}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        {t.thankYou}
      </h1>
      <p style={{ color: 'var(--text-secondary, #888)', marginBottom: '2rem' }}>
        {t.ready}
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
          {t.needOther}{' '}
          <a href={otherPlatform.primary.href} style={{ color: 'inherit' }}>
            {download.otherLabel}
          </a>
        </p>
      </div>

      <Link to={withLocale('/')} style={{ marginTop: '3rem', fontSize: '0.85rem', color: 'var(--text-secondary, #888)' }}>
        {t.backToSite}
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
