import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useStrings } from '../i18n/LocaleContext'
import './About.css'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const t = useStrings()

  return (
    <section id="about" ref={ref}>
      <div className="container">
        <motion.p className="section-index" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}>
          {t.about.index}
        </motion.p>

        <div className="about__grid">
          <motion.div className="about__left" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}>
            <h2 className="about__title">
              {t.about.titleLine1}<br />
              <em>{t.about.titleLine2}</em>
            </h2>
            <p className="about__bio">
              {t.about.bio.map((seg, i) => seg.strong ? <strong key={i}>{seg.text}</strong> : <span key={i}>{seg.text}</span>)}
            </p>
          </motion.div>

          <div className="about__right">
            {t.about.expertise.map((item, i) => (
              <motion.div
                key={item.label}
                className="about__row"
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={i + 2}
              >
                <span className="about__row-label">{item.label}</span>
                <p className="about__row-value">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
