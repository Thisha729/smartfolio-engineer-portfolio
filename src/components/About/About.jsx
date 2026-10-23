import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiBriefcase, FiAward, FiCode, FiUsers, FiMapPin, FiMail, FiCheckCircle } from 'react-icons/fi'
import { personalInfo, experience } from '../../data/portfolio'
import styles from './About.module.css'

const stats = [
  { icon: <FiBriefcase />, value: '5+', label: 'Years Experience' },
  { icon: <FiCode />, value: '40+', label: 'Projects Completed' },
  { icon: <FiAward />, value: '15+', label: 'Happy Clients' },
  { icon: <FiUsers />, value: '10+', label: 'Team Members Led' },
]

const infoRows = [
  {
    label: 'Location',
    icon: <FiMapPin size={13} />,
    value: personalInfo.location,
    type: 'location',
  },
  {
    label: 'Email',
    icon: <FiMail size={13} />,
    value: personalInfo.email,
    type: 'email',
  },
  {
    label: 'Availability',
    icon: <FiCheckCircle size={13} />,
    value: 'Open to Work',
    type: 'available',
  },
]

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedInfoRow({ icon, label, value, type, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = React.useState(false)

  const colorMap = {
    location:  { color: '#4f8ef7', glow: 'rgba(79,142,247,0.18)',  border: 'rgba(79,142,247,0.55)'  },
    email:     { color: '#38d9b4', glow: 'rgba(56,217,180,0.18)',  border: 'rgba(56,217,180,0.55)'  },
    available: { color: '#4ade80', glow: 'rgba(74,222,128,0.18)',  border: 'rgba(74,222,128,0.55)'  },
  }
  const theme = colorMap[type] || colorMap.location

  return (
    <motion.div
      ref={ref}
      className={`${styles.infoItem} ${styles[`infoItem_${type}`]}`}
      style={{ '--row-color': theme.color, '--row-glow': theme.glow }}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.015 }}
    >
      {/* Hover background glow */}
      <motion.div
        className={styles.infoRowBg}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ background: `radial-gradient(ellipse at left, ${theme.glow}, transparent 70%)` }}
      />

      {/* Left group: icon + label */}
      <div className={styles.infoLabelGroup}>
        <motion.span
          className={`${styles.infoIconBox} ${styles[`infoIcon_${type}`]}`}
          style={{
            background: `${theme.color}18`,
            border: `1px solid ${hovered ? theme.border : theme.color + '30'}`,
            color: theme.color,
            boxShadow: hovered ? `0 0 12px ${theme.glow}` : 'none',
          }}
          animate={hovered ? { scale: 1.12 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.span>
        <span className={styles.infoLabel}
          style={{ color: hovered ? theme.color : undefined }}>
          {label}
        </span>
      </div>

      {/* Right: value */}
      <motion.span
        className={`${styles.infoValue} ${type === 'available' ? styles.available : ''}`}
        animate={{ color: hovered ? theme.color : undefined }}
        transition={{ duration: 0.2 }}
      >
        {type === 'available' && <span className={styles.dot} />}
        {value}
      </motion.span>

      {/* Animated sweep line at bottom */}
      <motion.div
        className={styles.infoHighlight}
        style={{ background: `linear-gradient(90deg, ${theme.color}55, transparent)` }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.65, delay: delay + 0.18, ease: 'easeOut' }}
      />

      {/* Shimmer on entry */}
      {inView && (
        <motion.div
          className={styles.infoShimmer}
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 0.9, delay: delay + 0.25, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <AnimatedSection>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Get to know me</p>
            <h2 className={styles.sectionTitle}>About Me</h2>
          </div>
        </AnimatedSection>

        <div className={styles.grid}>
          {/* Left: Bio */}
          <AnimatedSection delay={0.1}>
            <div className={styles.bioCard}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatar}>
                  <img
                    src="/avatar.jpg"
                    alt="Engineer Techno Professional"
                    className={styles.avatarPhoto}
                    onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
                  />
                  <span className={styles.avatarText} style={{ display: 'none' }}>ET</span>
                </div>
                <div className={styles.avatarRing} />
              </div>

              <div className={styles.bioText}>
                {personalInfo.about.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className={styles.infoGrid}>
                {infoRows.map((row, i) => (
                  <AnimatedInfoRow
                    key={row.label}
                    icon={row.icon}
                    label={row.label}
                    value={row.value}
                    type={row.type}
                    delay={0.15 + i * 0.12}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Stats + Experience */}
          <div className={styles.rightCol}>
            <AnimatedSection delay={0.2}>
              <div className={styles.statsGrid}>
                {stats.map(({ icon, value, label }) => (
                  <div className={styles.statCard} key={label}>
                    <span className={styles.statIcon}>{icon}</span>
                    <span className={styles.statValue}>{value}</span>
                    <span className={styles.statLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className={styles.experience}>
                <h3 className={styles.expTitle}>Experience</h3>
                <div className={styles.timeline}>
                  {experience.map((exp, i) => (
                    <div className={styles.timelineItem} key={i}>
                      <div className={styles.timelineDot} />
                      <div className={styles.timelineContent}>
                        <div className={styles.expHeader}>
                          <span className={styles.expRole}>{exp.role}</span>
                          <span className={styles.expPeriod}>{exp.period}</span>
                        </div>
                        <span className={styles.expCompany}>{exp.company}</span>
                        <p className={styles.expDesc}>{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
