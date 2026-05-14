import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './GitHub.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function GitHub() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [contributions, setContributions] = useState(null)
  const [profile, setProfile] = useState(null)
  const [ollamaModels, setOllamaModels] = useState([])

  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/malikkaraoui?y=last')
      .then(r => r.json())
      .then(d => setContributions(d.total?.lastYear ?? null))
      .catch(() => {})
  }, [])

  useEffect(() => {
    fetch('https://api.github.com/users/malikkaraoui')
      .then(r => r.json())
      .then(d => setProfile(d))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const ctrl = new AbortController()
    const timeout = setTimeout(() => ctrl.abort(), 2000)
    fetch('http://localhost:11434/api/tags', { signal: ctrl.signal })
      .then(r => r.json())
      .then(d => setOllamaModels((d.models || []).map(m => m.name)))
      .catch(() => {})
      .finally(() => clearTimeout(timeout))
  }, [])

  const statItems = [
    { label: '12 derniers mois', value: contributions ?? '…' },
    { label: 'repos publics', value: profile?.public_repos ?? '…' },
    { label: 'followers', value: profile?.followers ?? '…' },
    { label: 'following', value: profile?.following ?? '…' },
  ]

  const agents = [
    {
      key: 'claude',
      logo: <img src="/icons/anthropic.png" alt="Anthropic" className="agent-logo" />,
      name: 'Claude',
      models: ['Opus 4.7', 'Sonnet 4.6'],
      color: 'var(--accent-warm)',
    },
    {
      key: 'copilot',
      logo: <img src="/icons/copilot.png" alt="GitHub Copilot" className="agent-logo" />,
      name: 'Copilot',
      models: ['GPT-5.5'],
      color: '#2563eb',
    },
    {
      key: 'ollama',
      logo: <img src="/icons/ollama.png" alt="Ollama" className="agent-logo" />,
      name: 'Ollama',
      models: ollamaModels.length > 0 ? ollamaModels : ['local'],
      color: '#6366f1',
    },
  ]

  return (
    <section id="github" className="github" ref={ref}>
      <div className="container">
        <motion.p className="section-index" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}>
          GitHub
        </motion.p>

        <motion.div className="github__header" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}>
          <h2 className="github__title">Activité<em>.</em></h2>
        </motion.div>

        <motion.div className="github__chart" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}>
          <img
            src="https://ghchart.rshah.org/409b5e/malikkaraoui"
            alt="Graphe de contributions GitHub — Malik Karaoui"
            className="github__chart-img"
          />
        </motion.div>

        <motion.div className="github__stats" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={3}>
          {statItems.map(({ label, value }) => (
            <div key={label} className="github__stat">
              <span className="github__stat-value">{value}</span>
              <span className="github__stat-label">{label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div className="github__team" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={4}>
          <p className="github__team-label">Mon équipe IA</p>
          <div className="github__agents">
            {agents.map(agent => (
              <div key={agent.key} className="github__agent" style={{ '--agent-color': agent.color }}>
                <div className="github__agent-icon">
                  {agent.logo}
                </div>
                <span className="github__agent-name">{agent.name}</span>
                <div className="github__agent-models">
                  {agent.models.map(m => (
                    <span key={m} className="github__agent-model">{m}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
