import { useStrings } from '../i18n/LocaleContext'
import './Footer.css'

export default function Footer() {
  const t = useStrings()

  return (
    <footer className="footer">
      <div className="container">
        <p>{t.contact.footer}</p>
      </div>
    </footer>
  )
}
