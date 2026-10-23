import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiMail, FiArrowRight, FiCheck } from 'react-icons/fi'
import styles from './Newsletter.module.css'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // null | 'sending' | 'done'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('sending')
    await new Promise((r) => setTimeout(r, 1400))
    setStatus('done')
    setEmail('')
    setTimeout(() => setStatus(null), 5000)
  }

  return (
    <section id="newsletter" className={styles.newsletter}>
      {/* Background blobs */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />

      <motion.div
        ref={ref}
        className={styles.card}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        {/* Icon */}
        <motion.div
          className={styles.iconWrap}
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        >
          <FiMail size={28} />
        </motion.div>

        <div className={styles.textBlock}>
          <h2 className={styles.title}>Subscribe to my Newsletter</h2>
          <p className={styles.subtitle}>
            Get the best tips on engineering, architecture, and career growth —
            delivered straight to your inbox. No spam, unsubscribe anytime.
          </p>
        </div>

        {/* Perks */}
        <div className={styles.perks}>
          {['Weekly engineering insights', 'Project deep-dives', 'Career tips & resources'].map((p) => (
            <span key={p} className={styles.perk}>
              <FiCheck size={13} /> {p}
            </span>
          ))}
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.inputRow}>
            <div className={styles.inputWrap}>
              <FiMail className={styles.inputIcon} size={16} />
              <input
                type="email"
                className={styles.input}
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'sending' || status === 'done'}
              />
            </div>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === 'sending' || status === 'done'}
            >
              {status === 'sending' ? (
                <span className={styles.spinner} />
              ) : status === 'done' ? (
                <><FiCheck size={15} /> Subscribed!</>
              ) : (
                <>Subscribe <FiArrowRight size={15} /></>
              )}
            </button>
          </div>

          {status === 'done' && (
            <motion.p
              className={styles.successMsg}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              🎉 You're in! Check your inbox for a confirmation.
            </motion.p>
          )}
        </form>

        <p className={styles.privacy}>
          By subscribing, you agree to receive email updates. Your data is safe — no spam ever.
        </p>
      </motion.div>
    </section>
  )
}
