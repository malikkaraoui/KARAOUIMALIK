import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './GitHub.css'

const REFRESH_MS = 5 * 60 * 1000

const EVENT_LABELS = {
  PushEvent: 'push',
  CreateEvent: 'create',
  ForkEvent: 'fork',
  WatchEvent: 'star',
  PullRequestEvent: 'pull request',
  IssuesEvent: 'issue',
  DeleteEvent: 'delete',
  ReleaseEvent: 'release',
}

function describeEvent(event) {
  switch (event.type) {
    case 'PushEvent': {
      const n = event.payload?.commits?.length ?? 0
      return `${n} commit${n > 1 ? 's' : ''}`
    }
    case 'CreateEvent':
      return `${event.payload?.ref_type || 'repo'}${event.payload?.ref ? ` "${event.payload.ref}"` : ''}`
    case 'ForkEvent':
      return `→ ${event.payload?.forkee?.full_name || ''}`
    case 'PullRequestEvent':
    case 'IssuesEvent':
      return event.payload?.action || ''
    default:
      return ''
  }
}

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
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatedAt, setUpdatedAt] = useState(null)

  const fetchEvents = async () => {
    try {
      const res = await fetch('https://api.github.com/users/malikkaraoui/events?per_page=20')
      if (!res.ok) return
      const data = await res.json()
      setEvents(
        data
          .filter(e => EVENT_LABELS[e.type])
          .slice(0, 10)
      )
      setUpdatedAt(new Date())
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
    const id = setInterval(fetchEvents, REFRESH_MS)
    return () => clearInterval(id)
  }, [])

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
              live · mis à jour {timeAgo(updatedAt.toISOString())}
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

        <motion.div className="github__events" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={3}>
          {loading ? (
            <p className="github__empty">Chargement…</p>
          ) : events.length === 0 ? (
            <p className="github__empty">Aucun événement public récent.</p>
          ) : events.map((event) => (
            <div key={event.id} className="github__event">
              <span className="github__event-type">{EVENT_LABELS[event.type]}</span>
              <span className="github__event-repo">
                {event.repo?.name?.replace('malikkaraoui/', '')}
              </span>
              <span className="github__event-desc">{describeEvent(event)}</span>
              <span className="github__event-time">{timeAgo(event.created_at)}</span>
            </div>
          ))}
        </motion.div>

        <motion.a
          href="https://github.com/malikkaraoui"
          target="_blank"
          rel="noopener noreferrer"
          className="github__cta"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={4}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
          github.com/malikkaraoui
        </motion.a>
      </div>
    </section>
  )
}
