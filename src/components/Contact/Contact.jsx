import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FiMail, FiMapPin, FiPhone, FiSend,
  FiGithub, FiLinkedin, FiChevronDown, FiMap,
} from 'react-icons/fi'
import { personalInfo } from '../../data/portfolio'
import styles from './Contact.module.css'

const topics = [
  'Select a topic',
  'Full-time Opportunity',
  'Freelance / Contract',
  'Project Collaboration',
  'Open Source',
  'Mentorship',
  'Just saying hi!',
]

// Color theme per contact type
const contactDetails = [
  {
    icon: <FiMail />,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: '#4f8ef7',
    glow: 'rgba(79,142,247,0.25)',
  },
  {
    icon: <FiPhone />,
    label: 'Phone',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    color: '#38d9b4',
    glow: 'rgba(56,217,180,0.25)',
  },
  {
    icon: <FiMapPin />,
    label: 'Location',
    value: personalInfo.location,
    href: null,
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.25)',
  },
]

/* ── Animated contact row ── */
function ContactRow({ icon, label, value, href, color, glow, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      className={styles.contactItem}
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ '--row-color': color, '--row-glow': glow }}
    >
      {/* Glowing icon box */}
      <motion.span
        className={styles.contactIcon}
        animate={hovered ? { scale: 1.15 } : { scale: 1 }}
        transition={{ duration: 0.2 }}
        style={{ color, boxShadow: hovered ? `0 0 14px ${glow}` : 'none' }}
      >
        {icon}
      </motion.span>

      <div className={styles.contactTextGroup}>
        <span className={styles.contactLabel}>{label}</span>
        {href ? (
          <a href={href} className={styles.contactValue} style={{ color: hovered ? color : undefined }}>
            {value}
          </a>
        ) : (
          <span className={styles.contactValue} style={{ color: hovered ? color : undefined }}>
            {value}
          </span>
        )}
      </div>

      {/* Sweep highlight line */}
      <motion.div
        className={styles.rowHighlight}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.55, delay: delay + 0.18, ease: 'easeOut' }}
        style={{ background: `linear-gradient(90deg, ${color}44, transparent)` }}
      />
    </motion.div>
  )
}

/* ── Animated social button ── */
function SocialBtn({ href, icon, label, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={styles.socialBtn}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      whileHover={{ y: -3, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {icon} {label}
    </motion.a>
  )
}

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

// Map component — geocodes via Nominatim then shows precise OSM embed
function LiveMap({ location }) {
  const [mapUrl, setMapUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    if (!location || location.trim().length < 3) {
      setMapUrl(null)
      setLoading(false)
      setError(false)
      return
    }

    setLoading(true)
    setError(false)

    // Debounce 900ms, then geocode with Nominatim
    timerRef.current = setTimeout(async () => {
      try {
        const q = encodeURIComponent(location.trim())
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`,
          { headers: { 'Accept-Language': 'en' } }
        )
        const data = await res.json()

        if (data && data.length > 0) {
          const { lat, lon, boundingbox } = data[0]
          const zoom = 13

          // Build bbox from bounding box for better fit
          const south = parseFloat(boundingbox[0])
          const north = parseFloat(boundingbox[1])
          const west  = parseFloat(boundingbox[2])
          const east  = parseFloat(boundingbox[3])

          // OSM embed with exact coords + marker
          const url =
            `https://www.openstreetmap.org/export/embed.html` +
            `?bbox=${west},${south},${east},${north}` +
            `&layer=mapnik` +
            `&marker=${lat},${lon}`

          setMapUrl(url)
          setError(false)
        } else {
          setError(true)
          setMapUrl(null)
        }
      } catch {
        setError(true)
        setMapUrl(null)
      } finally {
        setLoading(false)
      }
    }, 900)

    return () => clearTimeout(timerRef.current)
  }, [location])

  if (!mapUrl && !loading) {
    return (
      <div className={styles.mapPlaceholder}>
        <FiMap size={28} className={styles.mapPlaceholderIcon} />
        {error
          ? <p>Location not found.<br />Try a more specific address.</p>
          : <p>Type your city or address above<br />to see it on the map</p>
        }
      </div>
    )
  }

  return (
    <div className={styles.mapWrapper}>
      {loading && (
        <div className={styles.mapLoading}>
          <span className={styles.mapSpinner} />
          <span>Searching location...</span>
        </div>
      )}
      {mapUrl && (
        <iframe
          key={mapUrl}
          title="Location Map"
          src={mapUrl}
          className={styles.mapIframe}
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          loading="lazy"
        />
      )}
      <div className={styles.mapOverlayLabel}>
        <FiMapPin size={12} />
        <span>{location}</span>
      </div>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    topic: 'Select a topic',
    message: '',
    agree: false,
  })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.topic === 'Select a topic') return
    setStatus('sending')
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('sent')
    setForm({
      firstName: '', lastName: '', email: '', phone: '',
      location: '', topic: 'Select a topic', message: '', agree: false,
    })
    setTimeout(() => setStatus(null), 5000)
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        {/* Header */}
        <AnimatedSection>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Let's work together</p>
            <h2 className={styles.sectionTitle}>Get In Touch</h2>
            <p className={styles.sectionSubtitle}>
              Fill out the form below and I'll get back to you within 24 hours.
            </p>
          </div>
        </AnimatedSection>

        <div className={styles.grid}>
          {/* ── LEFT: Info Panel ── */}
          <AnimatedSection delay={0.1}>
            <div className={styles.infoPanel}>
              {/* Heading + text */}
              <motion.div
                className={styles.infoPanelTop}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              >
                <h3 className={styles.infoHeading}>Let's create something great together</h3>
                <p className={styles.infoText}>
                  I'm open to new opportunities — full-time roles, freelance contracts,
                  or interesting collaborations. Whether you have a question or just want
                  to connect, feel free to reach out.
                </p>
              </motion.div>

              {/* Animated contact rows */}
              <div className={styles.contactList}>
                {contactDetails.map((item, i) => (
                  <ContactRow key={item.label} {...item} delay={0.2 + i * 0.12} />
                ))}
              </div>

              {/* Animated social buttons */}
              <div className={styles.socialRow}>
                <SocialBtn href={personalInfo.github} icon={<FiGithub size={17} />} label="GitHub" delay={0.55} />
                <SocialBtn href={personalInfo.linkedin} icon={<FiLinkedin size={17} />} label="LinkedIn" delay={0.65} />
              </div>

              {/* Animated response badge */}
              <motion.div
                className={styles.responseBadge}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: 0.75, ease: 'easeOut' }}
              >
                <span className={styles.responseDot} />
                Typically responds within 24 hours
              </motion.div>
            </div>
          </AnimatedSection>

          {/* ── RIGHT: Form + Map ── */}
          <AnimatedSection delay={0.2}>
            <div className={styles.formColumn}>

              {/* Live Map */}
              <div className={styles.mapSection}>
                <LiveMap location={form.location} />
              </div>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <p className={styles.formHeading}>Send a message</p>

                {/* Row 1: First + Last name */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName" className={styles.label}>First name</label>
                    <input
                      id="firstName" name="firstName" type="text"
                      className={styles.input} placeholder="John"
                      value={form.firstName} onChange={handleChange} required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="lastName" className={styles.label}>Last name</label>
                    <input
                      id="lastName" name="lastName" type="text"
                      className={styles.input} placeholder="Doe"
                      value={form.lastName} onChange={handleChange} required
                    />
                  </div>
                </div>

                {/* Row 2: Email + Phone */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                      id="email" name="email" type="email"
                      className={styles.input} placeholder="john@example.com"
                      value={form.email} onChange={handleChange} required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>Phone number</label>
                    <input
                      id="phone" name="phone" type="tel"
                      className={styles.input} placeholder="+1 (555) 333-9494"
                      value={form.phone} onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Location field — triggers live map */}
                <div className={styles.formGroup}>
                  <label htmlFor="location" className={styles.label}>
                    <FiMapPin size={12} style={{ marginRight: '0.3rem' }} />
                    Your Location / City
                    <span className={styles.liveTag}>LIVE MAP</span>
                  </label>
                  <input
                    id="location" name="location" type="text"
                    className={`${styles.input} ${styles.locationInput}`}
                    placeholder="e.g. Chennai, New York, London..."
                    value={form.location} onChange={handleChange}
                  />
                </div>

                {/* Topic dropdown */}
                <div className={styles.formGroup}>
                  <label htmlFor="topic" className={styles.label}>Choose a topic</label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="topic" name="topic"
                      className={`${styles.select} ${form.topic === 'Select a topic' ? styles.selectPlaceholder : ''}`}
                      value={form.topic} onChange={handleChange} required
                    >
                      {topics.map((t) => (
                        <option key={t} value={t} disabled={t === 'Select a topic'}>{t}</option>
                      ))}
                    </select>
                    <FiChevronDown className={styles.selectIcon} size={16} />
                  </div>
                </div>

                {/* Message */}
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Message</label>
                  <textarea
                    id="message" name="message"
                    className={styles.textarea} placeholder="Type your message..."
                    rows={4} value={form.message} onChange={handleChange} required
                  />
                </div>

                {/* Terms checkbox */}
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox" name="agree" className={styles.checkbox}
                    checked={form.agree} onChange={handleChange} required
                  />
                  <span className={styles.checkboxText}>
                    I accept the <a href="#" className={styles.termsLink}>Terms &amp; Privacy Policy</a>
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit" className={styles.submitBtn}
                  disabled={status === 'sending' || !form.agree}
                >
                  {status === 'sending' ? (
                    <span className={styles.spinner} />
                  ) : (
                    <><FiSend size={15} />{status === 'sent' ? 'Message Sent!' : 'Send Message'}</>
                  )}
                </button>

                {status === 'sent' && (
                  <p className={styles.successMsg}>✓ Thanks! I'll get back to you soon.</p>
                )}
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
