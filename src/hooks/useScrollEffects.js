import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

if (import.meta.env.DEV) window.__ST = ScrollTrigger

// Compte à rebours d'un nombre affiché ("1 809", "1,809", "99,9 %", "3 200+", "< 1 s"…)
// en préservant exactement son format d'origine (séparateurs, préfixe/suffixe).
function countUp(el) {
  // La valeur d'origine est mémorisée sur l'élément : l'effet peut se rejouer
  // (StrictMode, retour de navigation) sans repartir d'un texte déjà mis à zéro.
  const original = el.dataset.countOriginal ?? el.textContent
  el.dataset.countOriginal = original
  const m = original.match(/\d[\d\s  .,]*\d|\d/)
  if (!m) return
  const raw = m[0]
  const cleaned = raw.replace(/[\s  ]/g, '')
  const lastComma = cleaned.lastIndexOf(',')
  let decimals = 0
  let target
  if (
    lastComma > -1 &&
    cleaned.indexOf(',') === lastComma &&
    cleaned.length - lastComma - 1 <= 2 &&
    !cleaned.includes('.')
  ) {
    decimals = cleaned.length - lastComma - 1
    target = parseFloat(cleaned.replace(',', '.'))
  } else {
    target = parseFloat(cleaned.replace(/,/g, ''))
  }
  if (!Number.isFinite(target)) return

  const spaceMatch = raw.match(/[\s  ]/)
  const thousandsSep = spaceMatch ? spaceMatch[0] : (raw.includes(',') && decimals === 0 ? ',' : '')

  const format = (v) => {
    const s = v.toFixed(decimals)
    const [int, dec] = s.split('.')
    const intFmt = thousandsSep ? int.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep) : int
    return dec ? intFmt + ',' + dec : intFmt
  }

  const obj = { v: 0 }
  el.textContent = original.replace(raw, format(0))
  gsap.to(obj, {
    v: target,
    duration: 1.4,
    ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    onUpdate: () => { el.textContent = original.replace(raw, format(obj.v)) },
  })
}

export default function useScrollEffects() {
  const { pathname } = useLocation()

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {

      // ── Accueil : hero parallax (contenu monte plus vite que le scroll)
      if (document.querySelector('.hero__content')) {
        gsap.to('.hero__content', {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }

      // ── Accueil : lignes de compétences scrubbed
      if (document.querySelector('#about .about__row')) {
        gsap.fromTo('.about__row',
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#about',
              start: 'top 75%',
              end: 'center center',
              scrub: 0.8,
            },
          }
        )
      }

      // ── Accueil : graph Obsidian scale-in
      if (document.querySelector('.obsidian__graph-wrap')) {
        gsap.fromTo('.obsidian__graph-wrap',
          { scale: 0.94, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.obsidian__graph-wrap',
              start: 'top 80%',
              end: 'top 40%',
              scrub: 1,
            },
          }
        )
      }

      // ── Accueil : chaque ligne projet glisse à l'entrée
      gsap.utils.toArray('.project-row').forEach((row) => {
        gsap.fromTo(row,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 0.6,
            },
          }
        )
      })

      // ── Libellés de section : clip reveal
      gsap.utils.toArray('.section-index').forEach((el) => {
        gsap.fromTo(el,
          { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
          {
            clipPath: 'inset(0% 0 0 0)',
            opacity: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'top 65%',
              scrub: 0.5,
            },
          }
        )
      })

      // ── Chiffres : count-up à l'entrée (bandes de stats, stats Obsidian)
      gsap.utils.toArray('.project-stats__value, .obsidian__stat-val').forEach(countUp)

      // ── Bannières hero : parallax léger en scrub
      gsap.utils.toArray('.project-hero img, .boites-hero img, .lunii-hero img').forEach((img) => {
        gsap.fromTo(img,
          { yPercent: -8, scale: 1.12 },
          {
            yPercent: 8,
            scale: 1.12,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        )
      })

      // ── Figures d'articles et de pages projet : reveal net au scroll
      gsap.utils.toArray('.project-page__figure img, .blogpost__figure img').forEach((img) => {
        gsap.fromTo(img,
          { clipPath: 'inset(7% 5% 7% 5% round 4px)', scale: 1.04 },
          {
            clipPath: 'inset(0% 0% 0% 0% round 4px)',
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: img, start: 'top 85%', once: true },
          }
        )
      })

    })

    return () => mm.revert()
  }, [pathname])
}
