import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getPostBySlug } from '../data/posts'
import './BlogPost.css'

const ease = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease },
  }),
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="reading-progress__track" aria-hidden="true">
      <div className="reading-progress__bar" style={{ width: `${progress}%` }} />
    </div>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="blogpost__not-found">
        <p>Article introuvable.</p>
        <Link to="/blog" className="blogpost__back">← Blog</Link>
      </div>
    )
  }

  let sectionIndex = 0

  return (
    <>
      <ReadingProgress />
      <div className="blogpost">
        <div className="container blogpost__container">
          <motion.div
            className="blogpost__nav"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <button onClick={() => navigate('/blog')} className="blogpost__back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Blog
            </button>
          </motion.div>

          <article>
            <header className="blogpost__header">
              <motion.div className="blogpost__meta" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                <time className="blogpost__date" dateTime={post.date}>{formatDate(post.date)}</time>
                <div className="blogpost__tags">
                  {post.tags.map(t => (
                    <span key={t} className="project-row__tag">{t}</span>
                  ))}
                </div>
              </motion.div>

              <motion.h1 className="blogpost__title" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                {post.title}
              </motion.h1>
            </header>

            <div className="blogpost__body">
              {post.content.map((block, i) => {
                if (block.type === 'lead') {
                  return (
                    <motion.p key={i} className="blogpost__lead" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                      {block.body}
                    </motion.p>
                  )
                }

                if (block.type === 'table') {
                  sectionIndex++
                  return (
                    <motion.section key={i} className="blogpost__section" variants={fadeUp} initial="hidden" animate="visible" custom={3 + sectionIndex}>
                      <h2 className="blogpost__section-title">{block.title}</h2>
                      <table className="blogpost__table">
                        <tbody>
                          {block.rows.map(([col1, col2], ri) => (
                            <tr key={ri}>
                              <td className="blogpost__table-key">{col1}</td>
                              <td className="blogpost__table-val">{col2}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.section>
                  )
                }

                sectionIndex++
                return (
                  <motion.section key={i} className="blogpost__section" variants={fadeUp} initial="hidden" animate="visible" custom={3 + sectionIndex}>
                    <h2 className="blogpost__section-title">{block.title}</h2>
                    {block.body.split('\n\n').map((para, pi) => (
                      <p key={pi} className="blogpost__paragraph">{para}</p>
                    ))}
                  </motion.section>
                )
              })}
            </div>
          </article>

          <footer className="blogpost__footer">
            <div className="blogpost__author">
              <span className="blogpost__author-name">Malik Karaoui</span>
              <span className="blogpost__author-role">Développeur · Annecy, FR</span>
            </div>
            <Link to="/blog" className="blogpost__back-link">
              ← Tous les articles
            </Link>
          </footer>
        </div>
      </div>
    </>
  )
}
