import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './GitHub.css'

const REFRESH_MS = 5 * 60 * 1000

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  const h = Math.floor(m / 60)
  const d = Math.floor(h / 24)
  if (d > 0) return `${d}j`
  if (h > 0) return `${h}h`
  if (m > 0) return `${m}min`
  return 'maintenant'
}

function aggregateEvents(data) {
  const pushes = data.filter(e => e.type === 'PushEvent').length
  const prs = data.filter(e => e.type === 'PullRequestEvent').length
  const repos = new Set(data.map(e => e.repo?.name).filter(Boolean)).size
  const commits = data
    .filter(e => e.type === 'PushEvent')
    .reduce((sum, e) => sum + (e.payload?.size ?? e.payload?.commits?.length ?? 0), 0)
  return { pushes, prs, repos, commits }
}

function AnthropicLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="agent-logo">
      <path d="M13.8 3.5h-3.6L3.5 20.5h3.4l1.4-3.8h7.6l1.4 3.8H20.5L13.8 3.5zm-2.3 10.5 2.5-6.8 2.5 6.8h-5z"/>
    </svg>
  )
}

function CopilotLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="agent-logo">
      <path fillRule="evenodd" clipRule="evenodd" d="
        M12 2C6.48 2 2 6.2 2 11.2V15c0 3.87 3.13 7 7 7h6c3.87 0 7-3.13 7-7v-3.8C22 6.2 17.52 2 12 2z
        M2.5 9h8.75c.41 0 .75.34.75.75v5.5c0 .41-.34.75-.75.75H2.5a.75.75 0 0 1-.75-.75V9.75c0-.41.34-.75.75-.75z
        M12.75 9H21.5c.41 0 .75.34.75.75v5.5c0 .41-.34.75-.75.75h-8.75a.75.75 0 0 1-.75-.75V9.75c0-.41.34-.75.75-.75z
        M3.5 17.5H6v2.5H3.5V17.5z
        M8 17.5h2.5V20H8v-2.5z
        M13.5 17.5H16V20h-2.5v-2.5z
        M18 17.5h2.5V20H18v-2.5z
      "/>
    </svg>
  )
}

function OpenAILogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="agent-logo">
      <path d="M22.28 9.28a5.998 5.998 0 0 0-.52-4.93 6.07 6.07 0 0 0-6.52-2.91A6 6 0 0 0 10.72 0a6.07 6.07 0 0 0-5.78 4.2 5.99 5.99 0 0 0-4 2.91 6.07 6.07 0 0 0 .74 7.12 5.99 5.99 0 0 0 .52 4.93 6.07 6.07 0 0 0 6.52 2.91A6 6 0 0 0 13.28 24a6.07 6.07 0 0 0 5.78-4.2 5.99 5.99 0 0 0 4-2.91 6.07 6.07 0 0 0-.78-7.61zM13.28 22.5a4.5 4.5 0 0 1-2.89-1.04l.14-.08 4.8-2.77a.78.78 0 0 0 .4-.68v-6.77l2.03 1.17a.07.07 0 0 1 .04.05v5.6a4.52 4.52 0 0 1-4.52 4.52zm-9.7-4.14a4.5 4.5 0 0 1-.54-3.03l.14.09 4.8 2.77a.78.78 0 0 0 .78 0l5.86-3.38v2.34a.07.07 0 0 1-.03.06l-4.85 2.8a4.52 4.52 0 0 1-6.16-1.65zM2.4 8.24a4.5 4.5 0 0 1 2.35-1.98v5.7a.78.78 0 0 0 .4.68l5.85 3.38-2.03 1.17a.07.07 0 0 1-.07 0L3.97 14.4A4.52 4.52 0 0 1 2.4 8.24zm16.63 3.88-5.85-3.38 2.03-1.17a.07.07 0 0 1 .07 0l4.93 2.85a4.52 4.52 0 0 1-.7 7.29v-5.7a.78.78 0 0 0-.48-.89zm2.02-3.04-.14-.09-4.8-2.77a.78.78 0 0 0-.78 0L9.47 9.6V7.26a.07.07 0 0 1 .03-.06l4.85-2.79a4.52 4.52 0 0 1 6.7 4.67zm-12.7 4.18-2.03-1.17a.07.07 0 0 1-.04-.05V6.44a4.52 4.52 0 0 1 7.41-3.47l-.14.08-4.8 2.77a.78.78 0 0 0-.4.68v6.77zm1.1-2.37 2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5V10.9z"/>
    </svg>
  )
}

function OllamaLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="agent-logo">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
      <circle cx="8.5" cy="6" r="1.5"/>
      <circle cx="15.5" cy="6" r="1.5"/>
    </svg>
  )
}

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
  const [stats, setStats] = useState(null)
  const [updatedAt, setUpdatedAt] = useState(null)
  const [ollamaModels, setOllamaModels] = useState([])

  const fetchEvents = async () => {
    try {
      const res = await fetch('https://api.github.com/users/malikkaraoui/events?per_page=100')
      if (!res.ok) return
      const data = await res.json()
      setStats(aggregateEvents(data))
      setUpdatedAt(new Date())
    } catch { /* silent */ }
  }

  useEffect(() => {
    fetchEvents()
    const id = setInterval(fetchEvents, REFRESH_MS)
    return () => clearInterval(id)
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

  const statItems = stats ? [
    { label: 'pushes', value: stats.pushes },
    { label: 'commits', value: stats.commits },
    { label: 'pull requests', value: stats.prs },
    { label: 'repos actifs', value: stats.repos },
  ] : []

  const agents = [
    {
      key: 'claude',
      logo: <AnthropicLogo />,
      name: 'Claude',
      models: ['Opus 4.7', 'Sonnet 4.6'],
      color: 'var(--accent-warm)',
    },
    {
      key: 'copilot',
      logo: <CopilotLogo />,
      name: 'Copilot',
      models: ['GPT-5.5'],
      color: '#2563eb',
    },
    {
      key: 'ollama',
      logo: <OllamaLogo />,
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
          {updatedAt && (
            <span className="github__refresh">
              <span className="github__dot" aria-hidden="true" />
              live · {timeAgo(updatedAt.toISOString())}
            </span>
          )}
        </motion.div>

        <motion.div className="github__chart" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}>
          <img
            src="https://ghchart.rshah.org/409b5e/malikkaraoui"
            alt="Graphe de contributions GitHub — Malik Karaoui"
            className="github__chart-img"
            key={updatedAt?.toISOString()}
          />
        </motion.div>

        {stats && (
          <motion.div className="github__stats" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={3}>
            {statItems.map(({ label, value }) => (
              <div key={label} className="github__stat">
                <span className="github__stat-value">{value}</span>
                <span className="github__stat-label">{label}</span>
              </div>
            ))}
          </motion.div>
        )}

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
