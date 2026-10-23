import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiDownload, FiArrowRight } from 'react-icons/fi'
import { HiCheckBadge } from 'react-icons/hi2'
import { personalInfo } from '../../data/portfolio'
import styles from './Hero.module.css'

// ── Typewriter roles ──
const roles = [
  'Full Stack Engineer',
  'React Developer',
  'Node.js Expert',
  'Cloud Architect',
  'Problem Solver',
]

function Typewriter() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed]  = useState('')
  const [phase, setPhase]           = useState('typing') // typing | pause | deleting

  useEffect(() => {
    const current = roles[roleIndex]

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 65)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('pause'), 1800)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'pause') {
      const t = setTimeout(() => setPhase('deleting'), 400)
      return () => clearTimeout(t)
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38)
        return () => clearTimeout(t)
      } else {
        setRoleIndex((i) => (i + 1) % roles.length)
        setPhase('typing')
      }
    }
  }, [displayed, phase, roleIndex])

  return (
    <span className={styles.typewriterWrap}>
      <span className={styles.typewriterText}>{displayed}</span>
      <span className={styles.cursor} aria-hidden="true" />
    </span>
  )
}

const stats = [
  { value: '5+',  label: 'Years Exp.' },
  { value: '40+', label: 'Projects' },
  { value: '15+', label: 'Clients' },
  { value: '99%', label: 'Satisfaction' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}
const leftVariants  = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } } }
const rightVariants = { hidden: { opacity: 0, x: 40  }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut', delay: 0.25 } } }
const itemVariants  = { hidden: { opacity: 0, y: 20  }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }

// ── Profile photo — uses SVG avatar by default ──
// To use your real photo: add profile.jpg to portfolio/public/
const PHOTO_SRC = '/profile.jpg'
const AVATAR_SRC = '/profile.svg'

export default function Hero() {
  const [photoError, setPhotoError] = useState(false)

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />

      <motion.div className={styles.inner} variants={containerVariants} initial="hidden" animate="visible">

        {/* ── LEFT ── */}
        <motion.div className={styles.left} variants={leftVariants}>

          {/* ── Animated Heading ── */}
          <motion.div className={styles.headingBlock} variants={itemVariants}>
            <motion.p className={styles.headingName}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <span className={styles.nameHi}>👩‍💻</span>
              <span className={styles.nameText}>Priya Sharma</span>
            </motion.p>

            <h1 className={styles.heading}>
              <motion.span
                className={styles.nameWord}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
              >
                Software
              </motion.span>
              <br />
              <motion.span
                className={styles.roleRow}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6, ease: 'easeOut' }}
              >
                <Typewriter />
              </motion.span>
            </h1>

            <motion.div
              className={styles.headingBar}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.7, ease: 'easeOut' }}
            />
          </motion.div>

          <motion.p className={styles.sub} variants={itemVariants}>
            {personalInfo.tagline}. Transforming complex technical challenges
            into elegant, high-performance digital products.
          </motion.p>

          {/* ── Quick Links ── */}
          <motion.div className={styles.quickLinks} variants={itemVariants}>
            {[
              { label: 'About Me',   href: '#about',    icon: '👤' },
              { label: 'My Skills',  href: '#skills',   icon: '⚡' },
              { label: 'Projects',   href: '#projects', icon: '💼' },
              { label: 'Contact',    href: '#contact',  icon: '✉️' },
            ].map(({ label, href, icon }) => (
              <button
                key={label}
                className={styles.quickBtn}
                onClick={() => document.getElementById(href.replace('#',''))?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className={styles.quickIcon}>{icon}</span>
                {label}
              </button>
            ))}
          </motion.div>

          <motion.div className={styles.actions} variants={itemVariants}>
            <button
              className={styles.primaryBtn}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Portfolio <FiArrowRight size={15} />
            </button>
            <a href="#" className={styles.secondaryBtn} download>
              <FiDownload size={15} /> Download CV
            </a>
          </motion.div>

          <motion.div className={styles.socials} variants={itemVariants}>
            <a href={personalInfo.github}   target="_blank" rel="noopener noreferrer" aria-label="GitHub"   className={styles.socialLink}><FiGithub   size={18} /></a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialLink}><FiLinkedin size={18} /></a>
            <a href={personalInfo.twitter}  target="_blank" rel="noopener noreferrer" aria-label="Twitter"  className={styles.socialLink}><FiTwitter  size={18} /></a>
          </motion.div>

          {/* ── Stats row ── */}
          <motion.div className={styles.statsRow} variants={itemVariants}>
            {stats.map(({ value, label }, i) => (
              <React.Fragment key={label}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{value}</span>
                  <span className={styles.statLabel}>{label}</span>
                </div>
                {i < stats.length - 1 && <div className={styles.statDivider} />}
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Circular Photo ── */}
        <motion.div className={styles.right} variants={rightVariants}>
          <div className={styles.circleWrapper}>
            <div className={styles.outerRing} aria-hidden="true" />
            <div className={styles.middleRing} aria-hidden="true" />

            <div className={styles.circlePhoto}>
              {!photoError ? (
                <>
                  <img
                    src={PHOTO_SRC}
                    alt="Profile"
                    className={styles.profilePhoto}
                    onError={() => setPhotoError(true)}
                  />
                  <div className={styles.photoOverlay} />
                </>
              ) : (
                <>
                  <img
                    src={AVATAR_SRC}
                    alt="Engineer Techno Professional"
                    className={styles.profilePhoto}
                    style={{ borderRadius: '50%' }}
                  />
                  <div className={styles.photoOverlay} />
                </>
              )}
            </div>

            {/* Floating badge — IN FRONT of photo (z-index > circlePhoto) */}
            <motion.div
              className={styles.floatingBadge}
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              <HiCheckBadge size={16} className={styles.floatingBadgeIcon} />
              Available for work
            </motion.div>

            {/* Floating chip — IN FRONT of photo */}
            <motion.div
              className={styles.floatingChip}
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
            >
              <span className={styles.chipValue}>40+</span>
              <span className={styles.chipLabel}>Projects Done</span>
            </motion.div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}
