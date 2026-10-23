import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiArrowRight, FiCalendar, FiClock, FiTag } from 'react-icons/fi'
import styles from './Blog.module.css'

const articles = [
  {
    id: 1,
    tag: 'React',
    tagColor: '#4f8ef7',
    title: 'Building Scalable React Apps with Clean Architecture',
    excerpt: 'How to structure large React applications using feature-based architecture, custom hooks, and proper state management patterns.',
    date: 'Oct 10, 2026',
    readTime: '6 min read',
    gradient: ['#1a2e50', '#0f1e38'],
    pattern: 'M20 60 H80 V40 H140 V60 H200 V30 H260',
  },
  {
    id: 2,
    tag: 'Node.js',
    tagColor: '#38d9b4',
    title: 'REST API Best Practices Every Engineer Should Know',
    excerpt: 'A deep dive into versioning, authentication, rate limiting, and error handling that makes your APIs production-ready.',
    date: 'Sep 22, 2026',
    readTime: '8 min read',
    gradient: ['#0f2a1e', '#0a1e18'],
    pattern: 'M20 50 H60 V80 H120 V50 H180 V90 H260',
  },
  {
    id: 3,
    tag: 'DevOps',
    tagColor: '#a78bfa',
    title: 'CI/CD Pipelines: From Zero to Production in One Hour',
    excerpt: 'Step-by-step guide to setting up automated testing, Docker builds, and deployment pipelines using GitHub Actions.',
    date: 'Aug 15, 2026',
    readTime: '10 min read',
    gradient: ['#1e1a35', '#14102a'],
    pattern: 'M20 70 H70 V40 H130 V70 H190 V50 H250',
  },
  {
    id: 4,
    tag: 'System Design',
    tagColor: '#fb923c',
    title: 'Designing Microservices: Lessons from the Trenches',
    excerpt: 'Real-world patterns and anti-patterns I learned building distributed systems that handle millions of requests daily.',
    date: 'Jul 30, 2026',
    readTime: '12 min read',
    gradient: ['#2a1a0f', '#1e1208'],
    pattern: 'M20 40 H80 V70 H150 V40 H210 V65 H270',
  },
  {
    id: 5,
    tag: 'TypeScript',
    tagColor: '#38bdf8',
    title: 'Advanced TypeScript Patterns for Large Codebases',
    excerpt: 'Utility types, conditional types, template literal types — the TypeScript features that separate good code from great code.',
    date: 'Jun 18, 2026',
    readTime: '7 min read',
    gradient: ['#0f1e2a', '#081622'],
    pattern: 'M20 55 H90 V35 H160 V55 H220 V80 H270',
  },
  {
    id: 6,
    tag: 'Performance',
    tagColor: '#facc15',
    title: 'Web Performance Optimization: The Complete Playbook',
    excerpt: 'Core Web Vitals, lazy loading, code splitting, caching strategies — everything you need for a blazing fast web app.',
    date: 'May 5, 2026',
    readTime: '9 min read',
    gradient: ['#1e1a0a', '#141208'],
    pattern: 'M20 65 H75 V40 H145 V65 H200 V45 H265',
  },
]

function BlogCard({ article, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
    >
      {/* Card image / pattern area */}
      <div
        className={styles.cardImage}
        style={{ background: `linear-gradient(135deg, ${article.gradient[0]}, ${article.gradient[1]})` }}
      >
        <svg width="100%" height="100%" viewBox="0 0 280 120" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <path d={article.pattern} stroke={article.tagColor} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5"/>
          {/* Window dots */}
          <circle cx="20" cy="15" r="3" fill="rgba(255,255,255,0.15)"/>
          <circle cx="30" cy="15" r="3" fill="rgba(255,255,255,0.1)"/>
          <circle cx="40" cy="15" r="3" fill="rgba(255,255,255,0.07)"/>
          {/* Decorative lines */}
          <line x1="20" y1="25" x2="120" y2="25" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
          <line x1="20" y1="32" x2="90"  y2="32" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        </svg>
        {/* Top accent line */}
        <div className={styles.cardAccent} style={{ background: article.tagColor }} />
      </div>

      <div className={styles.cardBody}>
        {/* Tag */}
        <span
          className={styles.cardTag}
          style={{ color: article.tagColor, background: `${article.tagColor}18`, borderColor: `${article.tagColor}35` }}
        >
          <FiTag size={10} /> {article.tag}
        </span>

        <h3 className={styles.cardTitle}>{article.title}</h3>
        <p className={styles.cardExcerpt}>{article.excerpt}</p>

        <div className={styles.cardMeta}>
          <span className={styles.metaItem}><FiCalendar size={11} /> {article.date}</span>
          <span className={styles.metaItem}><FiClock size={11} /> {article.readTime}</span>
        </div>

        <button className={styles.readBtn}>
          Read Article <FiArrowRight size={13} />
        </button>
      </div>
    </motion.article>
  )
}

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function Blog() {
  return (
    <section id="blog" className={styles.blog}>
      <div className={styles.container}>
        <AnimatedSection>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Thoughts &amp; Insights</p>
            <h2 className={styles.sectionTitle}>Blog &amp; Articles</h2>
            <p className={styles.sectionSubtitle}>
              I write about engineering, architecture, and the lessons I've learned building real-world systems.
            </p>
          </div>
        </AnimatedSection>

        <div className={styles.grid}>
          {articles.map((article, i) => (
            <BlogCard key={article.id} article={article} index={i} />
          ))}
        </div>

        <AnimatedSection delay={0.2}>
          <div className={styles.viewAllWrapper}>
            <button className={styles.viewAllBtn}>
              View All Articles <FiArrowRight size={15} />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
