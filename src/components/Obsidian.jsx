import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import ObsidianGraph from './ObsidianGraph'
import { useStrings } from '../i18n/LocaleContext'
import './Obsidian.css'

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Obsidian() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const t = useStrings()
  const stats = t.obsidian.stats
  const pipeline = t.obsidian.pipeline

  return (
    <section id="obsidian" ref={ref} className="obsidian">
      <div className="container">
        <motion.p
          className="section-index"
          variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'} custom={0}
        >
          {t.obsidian.index}
        </motion.p>

        <div className="obsidian__header">
          <motion.h2
            className="obsidian__title"
            variants={fadeUp} initial="hidden"
            animate={inView ? 'visible' : 'hidden'} custom={1}
          >
            {t.obsidian.titleLine1}<br />
            <em>{t.obsidian.titleLine2}</em>
          </motion.h2>
          <motion.p
            className="obsidian__lead"
            variants={fadeUp} initial="hidden"
            animate={inView ? 'visible' : 'hidden'} custom={2}
          >
            {t.obsidian.lead}
          </motion.p>
        </div>

        <motion.div
          className="obsidian__graph-wrap"
          variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'} custom={3}
        >
          <ObsidianGraph />
          <div className="obsidian__graph-label">
            <span>{t.obsidian.graphLabel}</span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="obsidian__stats"
          variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'} custom={4}
        >
          {stats.map((s) => (
            <div key={s.unit} className="obsidian__stat">
              <span className="obsidian__stat-val">{s.val}</span>
              <span className="obsidian__stat-unit">{s.unit}</span>
              <span className="obsidian__stat-sub">{s.sub}</span>
            </div>
          ))}
        </motion.div>

        {/* Pipeline */}
        <motion.div
          className="obsidian__pipeline"
          variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'} custom={5}
        >
          {pipeline.map((step, i) => (
            <div key={step.name} className="obsidian__pipe-item">
              <div className="obsidian__pipe-step">
                <span className="obsidian__pipe-tech">{step.tech}</span>
                <span className="obsidian__pipe-name">{step.name}</span>
                <span className="obsidian__pipe-desc">{step.desc}</span>
              </div>
              {i < pipeline.length - 1 && (
                <span className="obsidian__pipe-arrow" aria-hidden="true">→</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
