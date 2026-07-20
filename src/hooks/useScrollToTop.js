import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getLenis } from './useLenis'

export default function useScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Lenis pilote le scroll : window.scrollTo est réappliqué à chaque rAF,
    // donc le reset doit passer par l'API Lenis (sinon on reste où on était).
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])
}
