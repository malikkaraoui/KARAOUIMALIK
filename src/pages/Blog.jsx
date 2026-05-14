import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { posts } from '../data/posts'
import './Blog.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function Blog() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div className="blog-page" ref={ref}>
      <div className="container">
        <motion.div
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0}
        >
          Blog
        </motion.div>

        <motion.h1
          className="blog-page__title"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={1}
        >
          Réflexions & explorations
        </motion.h1>

        <div className="blog-page__list">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              className="blog-card"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={i + 2}
            >
              <div className="blog-card__meta">
                <time className="blog-card__date">{formatDate(post.date)}</time>
                <div className="blog-card__tags">
                  {post.tags.map(t => (
                    <span key={t} className="project-row__tag">{t}</span>
                  ))}
                </div>
              </div>

              <div className="blog-card__body">
                <h2 className="blog-card__title">
                  <Link to={`/blog/${post.slug}`} className="blog-card__title-link">
                    {post.title}
                    <span className="blog-card__arrow" aria-hidden="true">→</span>
                  </Link>
                </h2>
                <p className="blog-card__summary">{post.summary}</p>
                <span className="blog-card__read" aria-hidden="true">
                  Lire l'article
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
