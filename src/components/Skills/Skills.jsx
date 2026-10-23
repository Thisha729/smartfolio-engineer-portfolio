import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiCode, FiServer, FiCloud } from 'react-icons/fi'
import { skills } from '../../data/portfolio'
import styles from './Skills.module.css'

const categoryMeta = {
  'Frontend':      { icon: <FiCode size={16}/>,   color: '#4f8ef7', glow: 'rgba(79,142,247,0.22)'  },
  'Backend':       { icon: <FiServer size={16}/>, color: '#38d9b4', glow: 'rgba(56,217,180,0.22)'  },
  'Tools & Cloud': { icon: <FiCloud size={16}/>,  color: '#a78bfa', glow: 'rgba(167,139,250,0.22)' },
}

function levelLabel(n) {
  if (n >= 90) return 'Expert'
  if (n >= 75) return 'Advanced'
  if (n >= 60) return 'Intermediate'
  return 'Beginner'
}

/* ─────────────────────────────────────────
   FRONTEND → Circular SVG arc rings
───────────────────────────────────────── */
function CircleSkill({ name, level, index, color }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const r      = 22
  const circ   = 2 * Math.PI * r          // ≈ 138.2
  const dash   = (level / 100) * circ
  const gap    = circ - dash

  return (
    <motion.div
      ref={ref}
      className={styles.circleSkill}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    >
      <svg width="60" height="60" viewBox="0 0 60 60">
        {/* Track */}
        <circle cx="30" cy="30" r={r} fill="none"
          stroke="rgba(255,255,255,0.07)" strokeWidth="4"/>
        {/* Arc */}
        <motion.circle
          cx="30" cy="30" r={r} fill="none"
          stroke={color} strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${circ}`}
          strokeDashoffset={circ}
          animate={inView ? { strokeDashoffset: circ - dash } : {}}
          transition={{ duration: 1.1, delay: 0.15 + index * 0.09, ease: 'easeOut' }}
          style={{ transformOrigin: '30px 30px', transform: 'rotate(-90deg)' }}
        />
        {/* Glow dot at end */}
        {inView && (
          <motion.circle
            cx="30" cy={30 - r} r="3"
            fill={color}
            style={{
              filter: `drop-shadow(0 0 4px ${color})`,
              transformOrigin: '30px 30px',
            }}
            animate={{ rotate: [-(90), -(90) + (level / 100) * 360] }}
            transition={{ duration: 1.1, delay: 0.15 + index * 0.09, ease: 'easeOut' }}
          />
        )}
        {/* Percent text */}
        <text x="30" y="34" textAnchor="middle"
          fill="#fff" fontSize="10" fontWeight="700" fontFamily="'Fira Code', monospace">
          {level}
        </text>
      </svg>
      <span className={styles.circleName}
        style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.72rem', textAlign: 'center', marginTop: '0.25rem' }}>
        {name}
      </span>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   BACKEND → Wave / liquid fill bars
───────────────────────────────────────── */
function WaveSkill({ name, level, index, color }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      ref={ref}
      className={styles.waveSkill}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className={styles.waveTop}>
        <span className={styles.waveName} style={{ color: hov ? color : undefined }}>{name}</span>
        <span className={styles.waveLevel} style={{ color }}>{level}%</span>
      </div>
      {/* Wave track */}
      <div className={styles.waveTrack}>
        {/* Fill */}
        <motion.div
          className={styles.waveFill}
          style={{
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: `0 0 10px ${color}55`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.1, delay: 0.12 + index * 0.09, ease: 'easeOut' }}
        >
          {/* Wave SVG on leading edge */}
          <svg
            className={styles.waveEdge}
            viewBox="0 0 12 14"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C3,3 3,5 6,7 C9,9 9,11 12,14 L12,0 Z"
              fill={color}
            />
          </svg>
        </motion.div>
        {/* Shimmer */}
        {inView && (
          <motion.div className={styles.waveShimmer}
            initial={{ x: '-100%' }}
            animate={{ x: '300%' }}
            transition={{ duration: 1.4, delay: 0.3 + index * 0.09, ease: 'easeInOut' }}
          />
        )}
      </div>
      {/* Level label on hover */}
      {hov && (
        <motion.span className={styles.waveLevelLabel}
          initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          style={{ color }}>
          {levelLabel(level)}
        </motion.span>
      )}
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   TOOLS & CLOUD → Dot bubble progress
───────────────────────────────────────── */
function DotSkill({ name, level, index, color }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const total  = 10
  const filled = Math.round((level / 100) * total)

  return (
    <motion.div
      ref={ref}
      className={styles.dotSkill}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
    >
      <div className={styles.dotTop}>
        <span className={styles.dotName}>{name}</span>
        <span className={styles.dotPercent} style={{ color }}>{level}%</span>
      </div>
      <div className={styles.dotRow}>
        {Array.from({ length: total }).map((_, i) => (
          <motion.span
            key={i}
            className={styles.dot}
            style={{
              background: i < filled ? color : 'rgba(255,255,255,0.08)',
              boxShadow: i < filled ? `0 0 6px ${color}88` : 'none',
            }}
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{
              duration: 0.35,
              delay: 0.2 + index * 0.06 + i * 0.04,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   Category card wrapper
───────────────────────────────────────── */
function CategoryCard({ group, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
  const [hov, setHov] = useState(false)
  const meta   = categoryMeta[group.category] || categoryMeta['Frontend']

  const SkillComponent =
    group.category === 'Frontend'      ? CircleSkill :
    group.category === 'Backend'       ? WaveSkill   :
    DotSkill

  return (
    <motion.div
      ref={ref}
      className={styles.categoryCard}
      style={{ '--cat-color': meta.color, '--cat-glow': meta.glow }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.13, ease: 'easeOut' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      whileHover={{ y: -6 }}
    >
      {/* Animated top accent line */}
      <motion.div
        className={styles.cardTopLine}
        style={{ background: meta.color }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: index * 0.13 + 0.2 }}
      />

      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={styles.categoryBadge}
          style={{ color: meta.color, background: `${meta.color}18`, borderColor: `${meta.color}35` }}>
          <span className={styles.badgeIcon}>{meta.icon}</span>
          {group.category}
        </div>
        <span className={styles.skillCount} style={{ color: meta.color }}>
          {group.items.length} skills
        </span>
      </div>

      {/* Corner glow */}
      {hov && (
        <motion.div
          className={styles.cornerGlow}
          style={{ background: `radial-gradient(circle at top right, ${meta.glow}, transparent 60%)` }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        />
      )}

      {/* Skills */}
      <div className={group.category === 'Frontend' ? styles.circleGrid : styles.skillsList}>
        {group.items.map((skill, si) => (
          <SkillComponent
            key={skill.name}
            name={skill.name}
            level={skill.level}
            index={si}
            color={meta.color}
          />
        ))}
      </div>

      {/* Top skill */}
      <motion.div
        className={styles.topSkill}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.13 + 0.7 }}
      >
        <span className={styles.topSkillLabel}>Top skill:</span>
        <span className={styles.topSkillName} style={{ color: meta.color }}>
          {group.items.reduce((a, b) => (a.level > b.level ? a : b)).name}
        </span>
      </motion.div>
    </motion.div>
  )
}

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <AnimatedSection>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>What I work with</p>
            <h2 className={styles.sectionTitle}>Technical Skills</h2>
            <p className={styles.sectionSubtitle}>
              A snapshot of the technologies and tools I use to build modern applications.
            </p>
          </div>
        </AnimatedSection>

        <div className={styles.grid}>
          {skills.map((group, gi) => (
            <CategoryCard key={group.category} group={group} index={gi} />
          ))}
        </div>
      </div>
    </section>
  )
}
