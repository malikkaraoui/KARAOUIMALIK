import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useScrollEffects() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero parallax — content monte plus vite que le scroll
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

      // Hero gradient background parallax (plus lent → profondeur)
      gsap.to('.hero::before', {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 3,
        },
      })

      // ── Section About — lignes de compétences scrubbed
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

      // ── Obsidian section — graph scale-in depuis légèrement réduit
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

      // ── Projects — chaque ligne glisse depuis la droite
      gsap.utils.toArray('.project-row').forEach((row, i) => {
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

      // ── Section index labels — clip reveal (glissement du bas)
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

    })

    return () => ctx.revert()
  }, [])
}
