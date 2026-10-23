import React from 'react'
import { FiGithub, FiLinkedin, FiTwitter, FiCode, FiHeart } from 'react-icons/fi'
import { personalInfo } from '../../data/portfolio'
import styles from './Footer.module.css'

const navLinks = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog',     href: '#blog' },
  { label: 'Contact',  href: '#contact' },
]

export default function Footer() {
  const handleNav = (href) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span>Eng<span className={styles.accent}>Tech</span><span className={styles.pro}>.Pro</span></span>
          </div>
          <p className={styles.tagline}>{personalInfo.tagline}</p>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <nav className={styles.nav} aria-label="Footer navigation">
            {navLinks.map(({ label, href }) => (
              <button key={label} className={styles.navLink} onClick={() => handleNav(href)}>
                {label}
              </button>
            ))}
          </nav>

          <div className={styles.socials}>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.socialLink}>
              <FiGithub size={18} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialLink}>
              <FiLinkedin size={18} />
            </a>
            <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={styles.socialLink}>
              <FiTwitter size={18} />
            </a>
          </div>
        </div>

        <p className={styles.copyright}>
          © {new Date().getFullYear()} {personalInfo.name}. Built with{' '}
          <FiHeart className={styles.heart} aria-label="love" /> using React &amp; Framer Motion.
        </p>
      </div>
    </footer>
  )
}
