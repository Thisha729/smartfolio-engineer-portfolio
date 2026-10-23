import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  FiGithub, FiExternalLink, FiChevronDown, FiChevronUp,
  FiX, FiPlay, FiCode, FiMonitor, FiTag,
} from 'react-icons/fi'
import { projects } from '../../data/portfolio'
import styles from './Projects.module.css'

// Color per project image key
const projectColors = {
  project1: ['#4f8ef7', '#a78bfa'],
  project2: ['#06b6d4', '#4f8ef7'],
  project3: ['#10b981', '#38d9b4'],
  project4: ['#f59e0b', '#ef4444'],
  project5: ['#ec4899', '#8b5cf6'],
  project6: ['#14b8a6', '#3b82f6'],
}

// Category badge color
const categoryColors = {
  'Portfolio':  { color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  'Full Stack': { color: '#4f8ef7', bg: 'rgba(79,142,247,0.12)'  },
  'SaaS':       { color: '#38d9b4', bg: 'rgba(56,217,180,0.12)'  },
  'Backend':    { color: '#fb923c', bg: 'rgba(251,146,60,0.12)'  },
  'AI / ML':    { color: '#facc15', bg: 'rgba(250,204,21,0.12)'  },
}

// ── Unique SVG preview per project ──
function ProjectPreviewSVG({ projectId, colors }) {
  const [c1, c2] = colors

  // 1. Portfolio website preview
  if (projectId === 1) return (
    <svg width="100%" height="100%" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
      {/* Navbar */}
      <rect x="0" y="0" width="200" height="18" fill="rgba(255,255,255,0.05)"/>
      <rect x="6" y="5" width="32" height="8" rx="2" fill={c1} opacity="0.7"/>
      <rect x="110" y="6" width="18" height="6" rx="1" fill="rgba(255,255,255,0.2)"/>
      <rect x="133" y="6" width="18" height="6" rx="1" fill="rgba(255,255,255,0.2)"/>
      <rect x="156" y="6" width="18" height="6" rx="1" fill="rgba(255,255,255,0.2)"/>
      <rect x="178" y="5" width="16" height="8" rx="2" fill={c2} opacity="0.5"/>
      {/* Hero left */}
      <rect x="6" y="26" width="55" height="10" rx="3" fill="rgba(255,255,255,0.7)"/>
      <rect x="6" y="40" width="42" height="8" rx="2" fill={c1} opacity="0.9"/>
      <rect x="6" y="52" width="70" height="4" rx="1" fill="rgba(255,255,255,0.2)"/>
      <rect x="6" y="59" width="60" height="4" rx="1" fill="rgba(255,255,255,0.15)"/>
      <rect x="6" y="70" width="30" height="10" rx="3" fill={c1} opacity="0.8"/>
      <rect x="40" y="70" width="30" height="10" rx="3" fill="rgba(255,255,255,0.08)"/>
      {/* Hero right - profile circle */}
      <circle cx="155" cy="62" r="32" fill="rgba(255,255,255,0.03)" stroke={c1} strokeWidth="1" strokeOpacity="0.4"/>
      <circle cx="155" cy="62" r="26" fill={`${c1}18`}/>
      <circle cx="155" cy="55" r="10" fill={`${c1}50`}/>
      <ellipse cx="155" cy="80" rx="16" ry="10" fill={`${c1}40`}/>
      {/* Stats row */}
      {[0,1,2,3].map(i => (
        <rect key={i} x={6 + i*45} y="90" width="38" height="24" rx="4"
          fill="rgba(255,255,255,0.03)" stroke={i%2===0?c1:c2} strokeWidth="0.5" strokeOpacity="0.4"/>
      ))}
      <text x="10"  y="105" fill="#fff" fontSize="7" fontWeight="bold" fontFamily="monospace">5+</text>
      <text x="55"  y="105" fill="#fff" fontSize="7" fontWeight="bold" fontFamily="monospace">40+</text>
      <text x="100" y="105" fill="#fff" fontSize="7" fontWeight="bold" fontFamily="monospace">15+</text>
      <text x="145" y="105" fill="#fff" fontSize="7" fontWeight="bold" fontFamily="monospace">99%</text>
      {/* Glow */}
      <circle cx="185" cy="25" r="2" fill={c1}><animate attributeName="opacity" values="0.8;0.1;0.8" dur="2s" repeatCount="indefinite"/></circle>
    </svg>
  )

  // 2. CloudSync Dashboard
  if (projectId === 2) return (
    <svg width="100%" height="100%" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
      {/* Top bar */}
      <rect x="0" y="0" width="200" height="16" fill="rgba(255,255,255,0.05)"/>
      <rect x="6" y="4" width="40" height="8" rx="2" fill={c1} opacity="0.6"/>
      <circle cx="170" cy="8" r="4" fill="#4ade80"><animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/></circle>
      <rect x="178" y="4" width="16" height="8" rx="2" fill="rgba(255,255,255,0.1)"/>
      {/* Metric cards */}
      {[0,1,2,3].map(i => (
        <React.Fragment key={i}>
          <rect x={6+i*47} y="22" width="42" height="28" rx="4" fill="rgba(255,255,255,0.04)" stroke={i%2===0?c1:c2} strokeWidth="0.6" strokeOpacity="0.35"/>
          <text x={12+i*47} y="33" fill={i%2===0?c1:c2} fontSize="8" fontWeight="bold" fontFamily="monospace">{['72%','1.2k','99.9','48ms'][i]}</text>
          <text x={12+i*47} y="43" fill="rgba(255,255,255,0.3)" fontSize="5" fontFamily="sans-serif">{['CPU','Requests','Uptime','Latency'][i]}</text>
        </React.Fragment>
      ))}
      {/* Line chart */}
      <rect x="6" y="56" width="120" height="50" rx="5" fill="rgba(255,255,255,0.03)" stroke={c1} strokeWidth="0.5" strokeOpacity="0.2"/>
      <text x="10" y="65" fill="rgba(255,255,255,0.4)" fontSize="5">Traffic (24h)</text>
      <polyline points="12,98 28,85 44,90 60,72 76,78 92,65 108,70 120,58"
        fill="none" stroke={c1} strokeWidth="1.5" strokeLinecap="round"/>
      <polygon points="12,98 28,85 44,90 60,72 76,78 92,65 108,70 120,58 120,105 12,105"
        fill={`${c1}15`}/>
      {/* Bar chart */}
      <rect x="132" y="56" width="62" height="50" rx="5" fill="rgba(255,255,255,0.03)" stroke={c2} strokeWidth="0.5" strokeOpacity="0.2"/>
      <text x="136" y="65" fill="rgba(255,255,255,0.4)" fontSize="5">Alerts</text>
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={137+i*11} y={105-[20,35,15,45,28][i]} width="8" height={[20,35,15,45,28][i]} rx="2"
          fill={i===3?'#ef4444':c2} opacity="0.7"/>
      ))}
      {/* Animated pulse */}
      <circle cx="92" cy="65" r="3" fill={c1}><animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite"/></circle>
    </svg>
  )

  // 3. DevCollab Platform
  if (projectId === 3) return (
    <svg width="100%" height="100%" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
      {/* Left sidebar */}
      <rect x="0" y="0" width="45" height="120" fill="rgba(255,255,255,0.04)"/>
      <rect x="5" y="10" width="35" height="8" rx="2" fill={c1} opacity="0.5"/>
      {['Files','PRs','Issues','Sprint'].map((t,i) => (
        <React.Fragment key={t}>
          <rect x="5" y={24+i*14} width="35" height="8" rx="2" fill={i===1?`${c1}30`:'rgba(255,255,255,0.05)'}/>
          <text x="9" y={31+i*14} fill={i===1?c1:'rgba(255,255,255,0.3)'} fontSize="5" fontFamily="sans-serif">{t}</text>
        </React.Fragment>
      ))}
      {/* Code editor */}
      <rect x="48" y="0" width="152" height="65" fill="rgba(255,255,255,0.03)"/>
      <rect x="48" y="0" width="152" height="12" fill="rgba(255,255,255,0.05)"/>
      <text x="52" y="8" fill="rgba(255,255,255,0.3)" fontSize="5" fontFamily="monospace">index.tsx  app.tsx  api.ts</text>
      {/* Code lines */}
      {[
        {x:52, w:30, col:'#c792ea', y:18},
        {x:52, w:55, col:c1, y:25},
        {x:58, w:40, col:'#c3e88d', y:32},
        {x:58, w:60, col:'rgba(255,255,255,0.5)', y:39},
        {x:52, w:20, col:'#f78c6c', y:46},
        {x:52, w:45, col:c2, y:53},
      ].map((l,i) => (
        <rect key={i} x={l.x} y={l.y} width={l.w} height="4" rx="1" fill={l.col} opacity="0.8"/>
      ))}
      {/* Kanban */}
      <rect x="48" y="68" width="152" height="52" fill="rgba(255,255,255,0.02)"/>
      <text x="52" y="77" fill="rgba(255,255,255,0.3)" fontSize="5">Sprint Board</text>
      {['Todo','In Progress','Done'].map((col,ci) => (
        <React.Fragment key={col}>
          <rect x={52+ci*48} y="80" width="44" height="36" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
          <text x={56+ci*48} y="88" fill="rgba(255,255,255,0.3)" fontSize="4">{col}</text>
          {[0,1].map(ri => (
            <rect key={ri} x={56+ci*48} y={92+ri*10} width="36" height="7" rx="2"
              fill={ci===1?`${c1}25`:ci===2?`${c2}20`:'rgba(255,255,255,0.05)'}
              stroke={ci===1?c1:ci===2?c2:'rgba(255,255,255,0.1)'} strokeWidth="0.4"/>
          ))}
        </React.Fragment>
      ))}
    </svg>
  )

  // 4. SmartAPI Gateway
  if (projectId === 4) return (
    <svg width="100%" height="100%" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
      {/* Terminal */}
      <rect x="6" y="6" width="188" height="80" rx="6" fill="#0a0e1a" stroke={c1} strokeWidth="0.8" strokeOpacity="0.4"/>
      <rect x="6" y="6" width="188" height="16" rx="6" fill="rgba(255,255,255,0.06)"/>
      <circle cx="18" cy="14" r="3" fill="#ff5f57"/><circle cx="27" cy="14" r="3" fill="#febc2e"/><circle cx="36" cy="14" r="3" fill="#28c840"/>
      <text x="75" y="17" fill="rgba(255,255,255,0.3)" fontSize="5" fontFamily="monospace">SmartAPI Gateway v2.4</text>
      {/* Terminal lines */}
      {[
        {t:'$ curl -X POST /api/v2/users', col:'rgba(255,255,255,0.7)', y:30},
        {t:'  Authorization: Bearer eyJhbGci...', col:'rgba(255,255,255,0.35)', y:37},
        {t:'✓ Rate limit: 98/100 req/min', col:'#4ade80', y:44},
        {t:'✓ Cache HIT — 0.8ms response', col:c2, y:51},
        {t:'→ 200 OK  {"id":"usr_x92","status":"active"}', col:c1, y:58},
        {t:'$ GET /metrics  →  CPU:23% MEM:41%', col:'rgba(255,255,255,0.4)', y:65},
        {t:'▋', col:c1, y:75},
      ].map((l,i) => (
        <text key={i} x="12" y={l.y} fill={l.col} fontSize="5" fontFamily="monospace">{l.t}</text>
      ))}
      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
      {/* Stats row */}
      {[['10K+','req/s'],['<10ms','latency'],['99.9%','uptime'],['256','endpoints']].map(([v,l],i) => (
        <React.Fragment key={i}>
          <rect x={6+i*47} y="92" width="42" height="22" rx="4" fill="rgba(255,255,255,0.04)" stroke={i%2===0?c1:c2} strokeWidth="0.5" strokeOpacity="0.4"/>
          <text x={10+i*47} y="102" fill={i%2===0?c1:c2} fontSize="7" fontWeight="bold" fontFamily="monospace">{v}</text>
          <text x={10+i*47} y="110" fill="rgba(255,255,255,0.3)" fontSize="4" fontFamily="sans-serif">{l}</text>
        </React.Fragment>
      ))}
    </svg>
  )

  // 5. TaskFlow AI Kanban
  if (projectId === 5) return (
    <svg width="100%" height="100%" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
      {/* Header */}
      <rect x="0" y="0" width="200" height="16" fill="rgba(255,255,255,0.05)"/>
      <rect x="6" y="4" width="40" height="8" rx="2" fill={c1} opacity="0.6"/>
      <rect x="140" y="4" width="30" height="8" rx="3" fill={`${c2}40`} stroke={c2} strokeWidth="0.5"/>
      <text x="144" y="10" fill={c2} fontSize="5" fontFamily="monospace">✦ AI Mode</text>
      {/* 3 columns */}
      {['Backlog','In Progress','Done'].map((col, ci) => (
        <React.Fragment key={col}>
          <rect x={6+ci*64} y="20" width="59" height="96" rx="5" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
          <text x={10+ci*64} y="30" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="sans-serif">{col}</text>
          <rect x={48+ci*64} y="23" width="12" height="6" rx="3" fill="rgba(255,255,255,0.08)"/>
          <text x={50+ci*64} y="28" fill="rgba(255,255,255,0.4)" fontSize="4">{[3,2,4][ci]}</text>
          {/* Task cards */}
          {[0,1,2].slice(0, ci===1?2:ci===2?3:2).map(ti => (
            <React.Fragment key={ti}>
              <rect x={10+ci*64} y={36+ti*22} width="51" height="18" rx="3"
                fill={ci===1?`${c1}18`:ci===2?`${c2}14`:'rgba(255,255,255,0.05)'}
                stroke={ci===1?`${c1}50`:ci===2?`${c2}40`:'rgba(255,255,255,0.1)'} strokeWidth="0.5"/>
              <rect x={13+ci*64} y={40+ti*22} width={[28,35,22][ti]} height="3" rx="1" fill="rgba(255,255,255,0.5)"/>
              <rect x={13+ci*64} y={46+ti*22} width={[20,28,18][ti]} height="3" rx="1" fill="rgba(255,255,255,0.2)"/>
              {ci===1 && <rect x={43+ci*64} y={39+ti*22} width="14" height="5" rx="2" fill={`${c1}40`}/>}
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
      {/* AI chip floating */}
      <rect x="70" y="104" width="60" height="12" rx="6" fill={`${c1}20`} stroke={c1} strokeWidth="0.6"/>
      <text x="82" y="112" fill={c1} fontSize="5" fontFamily="monospace">✦ AI Priority: High</text>
      <circle cx="185" cy="20" r="2" fill={c1}><animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite"/></circle>
    </svg>
  )

  // 6. E-Commerce Engine
  if (projectId === 6) return (
    <svg width="100%" height="100%" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
      {/* Header */}
      <rect x="0" y="0" width="200" height="16" fill="rgba(255,255,255,0.05)"/>
      <rect x="6" y="4" width="45" height="8" rx="2" fill={c1} opacity="0.6"/>
      <rect x="160" y="4" width="22" height="8" rx="3" fill={`${c2}30`} stroke={c2} strokeWidth="0.5"/>
      <text x="163" y="10" fill={c2} fontSize="5">🛒 Cart (3)</text>
      {/* Product grid */}
      {[0,1,2,3,4,5].map(i => (
        <React.Fragment key={i}>
          <rect x={6+(i%3)*63} y={20+(Math.floor(i/3))*48} width="57" height="42" rx="5"
            fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
          {/* Product image placeholder */}
          <rect x={10+(i%3)*63} y={24+(Math.floor(i/3))*48} width="49" height="22" rx="3"
            fill={i%2===0?`${c1}20`:`${c2}18`}/>
          <text x={16+(i%3)*63} y={38+(Math.floor(i/3))*48} fill={i%2===0?c1:c2} fontSize="10">
            {['📦','⚡','🔧','💻','🎨','🚀'][i]}
          </text>
          <rect x={10+(i%3)*63} y={50+(Math.floor(i/3))*48} width="30" height="4" rx="1" fill="rgba(255,255,255,0.5)"/>
          <rect x={10+(i%3)*63} y={57+(Math.floor(i/3))*48} width="20" height="4" rx="1" fill={c1} opacity="0.8"/>
        </React.Fragment>
      ))}
      {/* Stripe badge */}
      <rect x="6" y="108" width="45" height="8" rx="4" fill="rgba(99,91,255,0.2)" stroke="rgba(99,91,255,0.4)" strokeWidth="0.5"/>
      <text x="10" y="114" fill="#a78bfa" fontSize="5" fontFamily="monospace">⚡ Stripe Enabled</text>
    </svg>
  )

  // 7. ML Pipeline Toolkit
  if (projectId === 7) return (
    <svg width="100%" height="100%" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
      {/* Pipeline flow */}
      {[
        {x:8,  label:'Data\nIngest', col:c1},
        {x:50, label:'Preprocess', col:c2},
        {x:92, label:'Train\nModel', col:c1},
        {x:134,label:'Evaluate', col:c2},
        {x:164,label:'Deploy', col:'#4ade80'},
      ].map((s,i) => (
        <React.Fragment key={i}>
          <rect x={s.x} y="10" width="34" height="28" rx="5" fill={`${s.col}20`} stroke={s.col} strokeWidth="0.8" strokeOpacity="0.6"/>
          <text x={s.x+17} y="22" fill={s.col} fontSize="5" fontFamily="monospace" textAnchor="middle">{s.label.split('\n')[0]}</text>
          <text x={s.x+17} y="30" fill={s.col} fontSize="5" fontFamily="monospace" textAnchor="middle" opacity="0.7">{s.label.split('\n')[1]||''}</text>
          {i<4 && <path d={`M${s.x+34},24 L${s.x+44},24`} stroke={s.col} strokeWidth="1" markerEnd="url(#arr)" strokeOpacity="0.5"/>}
          {i<4 && <polygon points={`${s.x+44},21 ${s.x+48},24 ${s.x+44},27`} fill={s.col} opacity="0.5"/>}
        </React.Fragment>
      ))}
      {/* Accuracy chart */}
      <rect x="8" y="48" width="88" height="56" rx="5" fill="rgba(255,255,255,0.03)" stroke={c1} strokeWidth="0.5" strokeOpacity="0.2"/>
      <text x="12" y="57" fill="rgba(255,255,255,0.4)" fontSize="5">Model Accuracy</text>
      <polyline points="12,95 24,88 36,82 48,75 60,70 72,65 84,60 90,56"
        fill="none" stroke={c1} strokeWidth="1.5" strokeLinecap="round"/>
      <polygon points="12,95 24,88 36,82 48,75 60,70 72,65 84,60 90,56 90,100 12,100"
        fill={`${c1}12`}/>
      <text x="72" y="58" fill={c1} fontSize="6" fontWeight="bold">94.2%</text>
      {/* Loss chart */}
      <rect x="104" y="48" width="88" height="56" rx="5" fill="rgba(255,255,255,0.03)" stroke={c2} strokeWidth="0.5" strokeOpacity="0.2"/>
      <text x="108" y="57" fill="rgba(255,255,255,0.4)" fontSize="5">Training Loss</text>
      <polyline points="108,60 120,68 132,74 144,80 156,84 168,87 180,89 188,90"
        fill="none" stroke={c2} strokeWidth="1.5" strokeLinecap="round"/>
      <text x="176" y="89" fill={c2} fontSize="5">0.042</text>
      {/* MLflow badge */}
      <rect x="8" y="108" width="55" height="8" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
      <text x="12" y="114" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="monospace">MLflow tracked ✓</text>
    </svg>
  )

  // Default
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
      <rect x="6" y="6" width="188" height="108" rx="6" fill="rgba(255,255,255,0.03)" stroke={c1} strokeWidth="0.5" strokeOpacity="0.3"/>
      <text x="100" y="60" fill={c1} fontSize="14" textAnchor="middle" fontFamily="monospace">{'</>'}</text>
      <text x="100" y="75" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="middle">Project Preview</text>
    </svg>
  )
}

// ── Demo Modal ──
function DemoModal({ project, onClose }) {
  const colors = projectColors[project.image] || ['#4f8ef7', '#a78bfa']
  const catStyle = categoryColors[project.category] || { color: '#4f8ef7', bg: 'rgba(79,142,247,0.12)' }

  return (
    <motion.div
      className={styles.modalBackdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0, scale: 0.88, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 40 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className={styles.modalAccent}
          style={{ background: `linear-gradient(90deg, ${colors[0]}, ${colors[1]})` }}/>

        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleRow}>
            <FiMonitor size={18} style={{ color: colors[0] }}/>
            <h3 className={styles.modalTitle}>{project.title}</h3>
            <span className={styles.modalCategory}
              style={{ color: catStyle.color, background: catStyle.bg }}>
              {project.category}
            </span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <FiX size={20}/>
          </button>
        </div>

        {/* ── Animated Project Preview (no iframe) ── */}
        <div className={styles.demoArea}
          style={{ background: `linear-gradient(135deg, #080e1c 40%, ${colors[0]}18 100%)` }}>

          {/* Mock browser window */}
          <div className={styles.mockBrowser}>
            <div className={styles.mockBrowserBar}>
              <div className={styles.mockDots}>
                <span style={{ background: '#ff5f57' }}/>
                <span style={{ background: '#febc2e' }}/>
                <span style={{ background: '#28c840' }}/>
              </div>
              <div className={styles.mockUrl}>
                <FiCode size={11} />
                <span>{project.title.toLowerCase().replace(/\s+/g, '-')}.vercel.app</span>
              </div>
            </div>
            <div className={styles.mockScreen}
              style={{ background: `linear-gradient(160deg, #0b1628 0%, ${colors[0]}18 100%)` }}>
              {/* Unique per-project SVG */}
              <ProjectPreviewSVG projectId={project.id} colors={colors} />

              {/* Project name overlay */}
              <div className={styles.previewLabel} style={{ borderColor: `${colors[0]}50` }}>
                <FiMonitor size={12} style={{ color: colors[0] }}/>
                <span>{project.title}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className={styles.modalBody}>
          <p className={styles.modalDesc}>{project.description}</p>

          <div className={styles.highlights}>
            <p className={styles.highlightsTitle}>Key Highlights</p>
            <ul className={styles.highlightsList}>
              {project.highlights.map((h, i) => (
                <motion.li key={i} className={styles.highlightItem}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <span className={styles.highlightDot} style={{ background: colors[0] }}/>
                  {h}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className={styles.modalTechList}>
            {project.tech.map((t) => (
              <span key={t} className={styles.modalTechTag}
                style={{ color: colors[0], borderColor: `${colors[0]}35`, background: `${colors[0]}10` }}>
                {t}
              </span>
            ))}
          </div>

          <div className={styles.modalActions}>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.modalBtn}>
              <FiGithub size={15}/> View Code on GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Project Card ──
function ProjectCard({ project, index, onDemo }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [expanded, setExpanded] = useState(false)
  const colors = projectColors[project.image] || ['#4f8ef7', '#a78bfa']
  const catStyle = categoryColors[project.category] || { color: '#4f8ef7', bg: 'rgba(79,142,247,0.12)' }

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
    >
      {/* Preview area */}
      <div className={styles.previewArea}>
        <div className={styles.screenshot}
          style={{ background: `linear-gradient(135deg, #0b1628 60%, ${colors[0]}12 100%)` }}>
          <ProjectPreviewSVG projectId={project.id} colors={colors} />
        </div>
        <div className={styles.previewAccent}
          style={{ background: `linear-gradient(90deg, ${colors[0]}, ${colors[1]})` }}/>

        {/* Hover overlay */}
        <div className={styles.previewOverlay}>
          <button className={styles.overlayBtn} onClick={() => onDemo(project)}>
            <FiPlay size={14}/> Demo
          </button>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.overlayBtn}>
            <FiGithub size={14}/> Code
          </a>
        </div>
      </div>

      {/* Card body */}
      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <div className={styles.cardTitleRow}>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <span className={styles.categoryBadge}
              style={{ color: catStyle.color, background: catStyle.bg }}>
              {project.category}
            </span>
          </div>
          <div className={styles.cardLinks}>
            <button className={styles.demoBtn} onClick={() => onDemo(project)}
              title="View Demo">
              <FiPlay size={13}/> Demo
            </button>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              aria-label="GitHub" className={styles.iconLink}>
              <FiGithub size={16}/>
            </a>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                aria-label="Live" className={styles.iconLink}>
                <FiExternalLink size={16}/>
              </a>
            )}
          </div>
        </div>

        <p className={styles.cardDesc}>{project.description}</p>

        {/* Expandable highlights */}
        <AnimatePresence>
          {expanded && (
            <motion.ul
              className={styles.highlightsList}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28 }}
            >
              {project.highlights.map((h, i) => (
                <li key={i} className={styles.highlightItem}>
                  <span className={styles.highlightDot} style={{ background: colors[0] }}/>
                  {h}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <button className={styles.readMoreBtn} onClick={() => setExpanded(!expanded)}>
          {expanded
            ? <><FiChevronUp size={13}/> Less</>
            : <><FiChevronDown size={13}/> Details</>}
        </button>

        <div className={styles.techList}>
          {project.tech.map((t) => (
            <span key={t} className={styles.techTag}
              style={{ color: colors[0], borderColor: `${colors[0]}30`, background: `${colors[0]}0d` }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

export default function Projects() {
  const [showAll, setShowAll]       = useState(false)
  const [demoProject, setDemoProject] = useState(null)

  const featured  = projects.filter((p) => p.featured)
  const rest      = projects.filter((p) => !p.featured)
  const displayed = showAll ? projects : featured

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <AnimatedSection>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Things I've built</p>
            <h2 className={styles.sectionTitle}>Projects</h2>
            <p className={styles.sectionSubtitle}>
              Real-world software I've engineered — click <strong>Demo</strong> to see it in action.
            </p>
          </div>
        </AnimatedSection>

        <div className={styles.grid}>
          {displayed.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onDemo={(p) => setDemoProject(p)}
            />
          ))}
        </div>

        {rest.length > 0 && (
          <AnimatedSection delay={0.2}>
            <div className={styles.showMoreWrapper}>
              <button className={styles.showMoreBtn} onClick={() => setShowAll(!showAll)}>
                {showAll ? 'Show Less' : `Show ${rest.length} More Projects`}
              </button>
            </div>
          </AnimatedSection>
        )}
      </div>

      {/* Demo Modal */}
      <AnimatePresence>
        {demoProject && (
          <DemoModal project={demoProject} onClose={() => setDemoProject(null)}/>
        )}
      </AnimatePresence>
    </section>
  )
}
