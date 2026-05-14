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
    .reduce((sum, e) => sum + (e.payload?.commits?.length ?? 0), 0)
  return { pushes, prs, repos, commits }
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

  const fetchEvents = async () => {
    try {
      const res = await fetch('https://api.github.com/users/malikkaraoui/events?per_page=100')
      if (!res.ok) return
      const data = await res.json()
      setStats(aggregateEvents(data))
      setUpdatedAt(new Date())
    } catch {
      // silent
    }
  }

  useEffect(() => {
    fetchEvents()
    const id = setInterval(fetchEvents, REFRESH_MS)
    return () => clearInterval(id)
  }, [])

  const statItems = stats ? [
    { label: 'pushes', value: stats.pushes },
    { label: 'commits', value: stats.commits },
    { label: 'pull requests', value: stats.prs },
    { label: 'repos actifs', value: stats.repos },
  ] : []

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

      </div>
    </section>
  )
}
