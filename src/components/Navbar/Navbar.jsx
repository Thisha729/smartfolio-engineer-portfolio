import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiUser, FiZap, FiBriefcase, FiMail, FiHome, FiBookOpen, FiRss } from 'react-icons/fi'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'Home',     href: '#home',     icon: <FiHome size={18}/> },
  { label: 'About',    href: '#about',    icon: <FiUser size={18}/> },
  { label: 'Skills',   href: '#skills',   icon: <FiZap size={18}/> },
  { label: 'Projects', href: '#projects', icon: <FiBriefcase size={18}/> },
  { label: 'Blog',     href: '#blog',     icon: <FiRss size={18}/> },
  { label: 'Contact',  href: '#contact',  icon: <FiMail size={18}/> },
]

// App-icon grid items shown BELOW the nav list
const appLinks = [
  { label: 'About Me',  href: '#about',    icon: '👤', color: '#4f8ef7' },
  { label: 'My Skills', href: '#skills',   icon: '⚡', color: '#38d9b4' },
  { label: 'Projects',  href: '#projects', icon: '💼', color: '#a78bfa' },
  { label: 'Blog',      href: '#blog',     icon: '📝', color: '#fb923c' },
  { label: 'Contact',   href: '#contact',  icon: '✉️', color: '#4ade80' },
  { label: 'Resume',    href: '#',         icon: '📄', color: '#38bdf8', download: true },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [active,    setActive]    = useState('home')

  /* Lock body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    setTimeout(() => {
      const id = href.replace('#', '')
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <>
      <motion.nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className={styles.container}>
          {/* Logo */}
          <button className={styles.logo} onClick={() => handleNavClick('#home')}>
            <span>Eng<span className={styles.accent}>Tech</span><span className={styles.pro}>.Pro</span></span>
          </button>

          {/* Desktop links */}
          <ul className={styles.links}>
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <button
                  className={`${styles.link} ${active === href.replace('#', '') ? styles.activeLink : ''}`}
                  onClick={() => handleNavClick(href)}
                >
                  {label}
                  {active === href.replace('#', '') && (
                    <motion.span className={styles.underline} layoutId="underline" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop Resume */}
          <a href="#" className={styles.resumeBtn} download>Resume</a>

          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* ── Full-screen mobile overlay — outside nav so it covers everything ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-down panel */}
            <motion.div
              className={styles.mobilePanel}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {/* Header row inside panel */}
              <div className={styles.panelHeader}>
                <span className={styles.panelLogo}>
                  Eng<span className={styles.accent}>Tech</span><span className={styles.pro}>.Pro</span>
                </span>
                <button
                  className={styles.closeBtn}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <FiX size={22} />
                </button>
              </div>

              {/* Nav links */}
              <nav className={styles.panelLinks}>
                {navLinks.map(({ label, href, icon }, i) => (
                  <motion.button
                    key={label}
                    className={`${styles.panelLink} ${active === href.replace('#', '') ? styles.panelLinkActive : ''}`}
                    onClick={() => handleNavClick(href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <span className={styles.panelLinkIcon}>{icon}</span>
                    {label}
                    {active === href.replace('#', '') && (
                      <span className={styles.panelActiveDot} />
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* ── App icon grid ── */}
              <div className={styles.appGridLabel}>Quick Access</div>
              <motion.div
                className={styles.appGrid}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.25 }}
              >
                {appLinks.map(({ label, href, icon, color, download }, i) => (
                  <motion.button
                    key={label}
                    className={styles.appItem}
                    onClick={() => {
                      if (!download) handleNavClick(href)
                      else setMenuOpen(false)
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.24 + i * 0.05, duration: 0.2 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <span
                      className={styles.appIconBox}
                      style={{ background: `${color}22`, border: `1.5px solid ${color}44` }}
                    >
                      <span className={styles.appEmoji}>{icon}</span>
                    </span>
                    <span className={styles.appLabel}>{label}</span>
                  </motion.button>
                ))}
              </motion.div>

              {/* Resume button */}
              <motion.a
                href="#"
                className={styles.panelResume}
                download
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.22 }}
              >
                📄 Download Resume
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
