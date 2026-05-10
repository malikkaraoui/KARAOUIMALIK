import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import ObsidianGraph from './ObsidianGraph'
import './Obsidian.css'

const stats = [
  { val: '43+',   unit: 'notes',             sub: 'vault local' },
  { val: '563',   unit: 'connexions',         sub: 'graphe de liens' },
  { val: '<10ms', unit: 'latence',            sub: 'requête QMD' },
  { val: '0',     unit: 'bytes uploadés',     sub: 'local-first absolu' },
]

const pipeline = [
  { name: 'Vault',    tech: 'Obsidian',   desc: 'Notes & décisions' },
  { name: 'Index',    tech: 'QMD',        desc: 'BM25 + vecteurs' },
  { name: 'LLM',      tech: 'Ollama',     desc: 'RAG sans cloud' },
  { name: 'Agents',   tech: 'Claude',     desc: 'Mémoire persistante' },
]

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

  return (
    <section id="obsidian" ref={ref} className="obsidian">
      <div className="container">
        <motion.p
          className="section-index"
          variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'} custom={0}
        >
          02 — Second cerveau
        </motion.p>

        <div className="obsidian__header">
          <motion.h2
            className="obsidian__title"
            variants={fadeUp} initial="hidden"
            animate={inView ? 'visible' : 'hidden'} custom={1}
          >
            La connaissance,<br />
            <em>locale et souveraine.</em>
          </motion.h2>
          <motion.p
            className="obsidian__lead"
            variants={fadeUp} initial="hidden"
            animate={inView ? 'visible' : 'hidden'} custom={2}
          >
            Un vault Obsidian entièrement local, indexé par QMD, consommé par Ollama.
            Mon contexte personnel alimente chaque agent — sans exposer une ligne à un serveur externe.
          </motion.p>
        </div>

        <motion.div
          className="obsidian__graph-wrap"
          variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'} custom={3}
        >
          <ObsidianGraph />
          <div className="obsidian__graph-label">
            <span>Vault Obsidian · {'>'}43 notes · graphe local</span>
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
