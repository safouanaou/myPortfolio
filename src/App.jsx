import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'

const ease = [0.22, 1, 0.36, 1]

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Me', href: '#why-me' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const specialties = [
  { id: '#01', title: 'UI/UX & Web Design' },
  { id: '#02', title: 'Interactive Motion' },
  { id: '#03', title: 'Frontend Development' },
  { id: '#04', title: 'Design Systems' },
]

const techStack = [
  {
    name: 'Figma',
    icon: (
      <svg width="18" height="22" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
      </svg>
    ),
  },
  {
    name: 'React',
    icon: (
      <svg width="22" height="20" viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="#58c4dc">
        <circle cx="0" cy="0" r="2.05" fill="#58c4dc"/>
        <g stroke="#58c4dc" strokeWidth="1.2" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    ),
  },
  {
    name: 'Next.js',
    icon: (
      <svg width="22" height="22" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" fill="currentColor" fillOpacity="0.15" r="88" stroke="currentColor" strokeWidth="6"/>
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="currentColor" />
        <rect fill="currentColor" height="72" width="12" x="115" y="54" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M4.5 9h6M7.5 9v9M13 16.5c.7.7 1.5 1 2.4 1 1.1 0 1.9-.5 1.9-1.4 0-1-.8-1.4-1.9-1.8-1.4-.5-2.4-1.1-2.4-2.4 0-1.3 1-2.2 2.4-2.2.9 0 1.6.3 2.2.8M13 9" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    icon: (
      <svg width="22" height="20" viewBox="0 0 24 24" fill="#38BDF8">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
      </svg>
    ),
  },
  {
    name: 'Framer Motion',
    icon: (
      <svg width="18" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
  },
]

/* ─── CONCEPT PROJECT DATA FOR 5x3 SUBGRID ─── */
const scalerProject = {
  id: '01',
  title: 'Nexus OS — AI Analytics',
  type: 'dashboard',
  url: 'nexus.app',
}

const layer1Projects = [
  { id: '02', title: 'Verve — Spatial Audio', type: 'store', url: 'verve.audio' },
  { id: '03', title: 'Krona — Architecture', type: 'editorial', url: 'krona.studio' },
  { id: '04', title: 'Apex — Fitness Tracker', type: 'fitness', url: 'apex.vitality' },
  { id: '05', title: 'Lumina — Cloud Platform', type: 'saas', url: 'lumina.cloud' },
  { id: '06', title: 'Prism — Design Tokens', type: 'tokens', url: 'prism.tokens' },
  { id: '07', title: 'Aura — Creative Studio', type: 'editorial', url: 'aura.design' },
]

const layer2Projects = [
  { id: '08', title: 'Flux — Crypto Terminal', type: 'dashboard', url: 'flux.exchange' },
  { id: '09', title: 'Hype — Sneaker Drops', type: 'store', url: 'hype.store' },
  { id: '10', title: 'Zenith — Task OS', type: 'saas', url: 'zenith.io' },
  { id: '11', title: 'Pulse — Audio Waves', type: 'fitness', url: 'pulse.fm' },
  { id: '12', title: 'Nova — 3D Spatial Canvas', type: 'tokens', url: 'nova.3d' },
  { id: '13', title: 'Echo — Minimal Podcast', type: 'store', url: 'echo.audio' },
]

const layer3Projects = [
  { id: '14', title: 'Vortex — AI Chat System', type: 'dashboard', url: 'vortex.ai' },
  { id: '15', title: 'Horizon — Travel Agency', type: 'editorial', url: 'horizon.travel' },
]

function SlidingArrowIcon({ isWhite = false }) {
  return (
    <div className={`icon-circle arrow-slide-circle ${isWhite ? 'white-circle' : ''}`}>
      <svg className="arrow-svg arrow-main" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
      <svg className="arrow-svg arrow-clone" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </div>
  )
}

function Header() {
  const [activeNav, setActiveNav] = useState('Home')

  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="#home" className="brand-logo" aria-label="Safouan Home">
          Safouan<span className="brand-dot">.</span>
        </a>

        <nav className="header-nav" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`nav-link ${activeNav === item.label ? 'active' : ''}`}
              onClick={() => setActiveNav(item.label)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="pill-btn header-cta">
          <span>Get in touch</span>
          <SlidingArrowIcon />
        </a>
      </div>
    </header>
  )
}

function MockupDivSkeleton({ type }) {
  if (type === 'dashboard') {
    return (
      <div className="skeleton-canvas dashboard-canvas">
        <div className="skeleton-sidebar">
          <div className="skeleton-bar bar-logo" />
          <div className="skeleton-bar bar-item active" />
          <div className="skeleton-bar bar-item" />
          <div className="skeleton-bar bar-item" />
        </div>
        <div className="skeleton-main">
          <div className="skeleton-top-row">
            <div className="skeleton-card-mini">
              <div className="skeleton-metric-num" />
              <div className="skeleton-bar bar-sub" />
            </div>
            <div className="skeleton-card-mini">
              <div className="skeleton-metric-num accent-glow" />
              <div className="skeleton-bar bar-sub" />
            </div>
          </div>
          <div className="skeleton-chart-box">
            <div className="skeleton-chart-bars">
              <span style={{ height: '40%' }} />
              <span style={{ height: '65%' }} />
              <span style={{ height: '35%' }} />
              <span style={{ height: '85%' }} className="accent-bar" />
              <span style={{ height: '55%' }} />
              <span style={{ height: '75%' }} />
              <span style={{ height: '90%' }} className="accent-bar" />
              <span style={{ height: '50%' }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'store') {
    return (
      <div className="skeleton-canvas store-canvas">
        <div className="skeleton-hero-banner">
          <div className="skeleton-badge-pill" />
          <div className="skeleton-title-large" />
          <div className="skeleton-bar bar-sub" style={{ width: '55%' }} />
        </div>
        <div className="skeleton-product-grid">
          <div className="skeleton-prod-card">
            <div className="skeleton-prod-img" />
            <div className="skeleton-bar bar-title" />
          </div>
          <div className="skeleton-prod-card">
            <div className="skeleton-prod-img accent-border" />
            <div className="skeleton-bar bar-title" />
          </div>
          <div className="skeleton-prod-card">
            <div className="skeleton-prod-img" />
            <div className="skeleton-bar bar-title" />
          </div>
        </div>
      </div>
    )
  }

  if (type === 'editorial') {
    return (
      <div className="skeleton-canvas editorial-canvas">
        <div className="editorial-split">
          <div className="editorial-left">
            <div className="skeleton-hero-big-text" />
            <div className="skeleton-hero-big-text" style={{ width: '70%' }} />
            <div className="skeleton-bar bar-sub" style={{ marginTop: '10px' }} />
            <div className="skeleton-bar bar-sub" style={{ width: '60%' }} />
          </div>
          <div className="editorial-right-frame">
            <div className="editorial-img-placeholder" />
          </div>
        </div>
      </div>
    )
  }

  if (type === 'saas') {
    return (
      <div className="skeleton-canvas saas-canvas">
        <div className="saas-hero-bar">
          <div className="skeleton-badge-pill" style={{ margin: '0 auto 6px' }} />
          <div className="skeleton-title-large" style={{ margin: '0 auto', width: '75%' }} />
        </div>
        <div className="saas-bento-row">
          <div className="saas-bento-card">
            <div className="skeleton-metric-num accent-glow" style={{ width: '35px' }} />
            <div className="skeleton-bar bar-sub" />
          </div>
          <div className="saas-bento-card">
            <div className="terminal-dots">
              <span className="dot dot-red" style={{ width: '5px', height: '5px' }} />
              <span className="dot dot-yellow" style={{ width: '5px', height: '5px' }} />
              <span className="dot dot-green" style={{ width: '5px', height: '5px' }} />
            </div>
            <div className="skeleton-bar bar-sub" style={{ width: '80%' }} />
          </div>
        </div>
      </div>
    )
  }

  if (type === 'tokens') {
    return (
      <div className="skeleton-canvas tokens-canvas">
        <div className="tokens-palette-row">
          <div className="token-swatch orange-swatch" />
          <div className="token-swatch cyan-swatch" />
          <div className="token-swatch purple-swatch" />
          <div className="token-swatch white-swatch" />
        </div>
        <div className="tokens-comp-row">
          <div className="token-btn-pill active" />
          <div className="token-btn-pill" />
          <div className="token-btn-pill" />
        </div>
      </div>
    )
  }

  return (
    <div className="skeleton-canvas fitness-canvas">
      <div className="fitness-rings-row">
        <div className="fitness-ring-graphic">
          <div className="ring-inner" />
        </div>
        <div className="fitness-stats-col">
          <div className="skeleton-bar bar-title" style={{ width: '60px' }} />
          <div className="skeleton-metric-num accent-glow" style={{ width: '38px' }} />
          <div className="skeleton-bar bar-sub" style={{ width: '50px' }} />
        </div>
      </div>
      <div className="fitness-schedule-row">
        <div className="fitness-sched-pill active" />
        <div className="fitness-sched-pill" />
        <div className="fitness-sched-pill" />
      </div>
    </div>
  )
}

function CompactMockupCard({ project, isFeatured = false }) {
  return (
    <div className={`mockup-grid-card ${isFeatured ? 'is-scaler-card' : ''}`}>
      <div className="mockup-window-header">
        <div className="window-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <div className="window-url-bar">
          <span className="lock-icon">🔒</span>
          <span className="url-text">{project.url}</span>
        </div>
        <span className="live-indicator-dot" />
      </div>

      <div className="mockup-canvas-container">
        <MockupDivSkeleton type={project.type} />
        <div className="mockup-hover-overlay">
          <span className="hover-badge">Explore Case Study</span>
        </div>
      </div>

      <div className="mockup-card-footer">
        <span className="project-idx">{project.id}</span>
        <span className="project-name">{project.title}</span>
      </div>
    </div>
  )
}

function SelectedWorksScrollSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.28 })

  // Center Scaler Zoom
  const scalerScale = useTransform(progress, [0, 0.52], [2.15, 1])
  const scalerRadius = useTransform(progress, [0, 0.52], ['26px', '14px'])

  // Layer 1: Outermost Columns (1 & 5)
  const layer1Opacity = useTransform(progress, [0.08, 0.38], [0, 1])
  const layer1Scale = useTransform(progress, [0.08, 0.52], [0.1, 1])

  // Layer 2: Mid Columns (2 & 4)
  const layer2Opacity = useTransform(progress, [0.18, 0.48], [0, 1])
  const layer2Scale = useTransform(progress, [0.18, 0.62], [0.1, 1])

  // Layer 3: Top/Bottom Center (Column 3)
  const layer3Opacity = useTransform(progress, [0.28, 0.58], [0, 1])
  const layer3Scale = useTransform(progress, [0.28, 0.72], [0.1, 1])

  const headerOpacity = useTransform(progress, [0, 0.18, 0.85, 1], [1, 1, 0.8, 0.2])
  const headerY = useTransform(progress, [0, 0.5], [0, -18])

  return (
    <section className="scroll-works-section" id="projects" ref={sectionRef}>
      <div className="scroll-sticky-viewport">
        {/* Floating section header */}
        <motion.div
          className="scroll-works-header"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <span className="section-badge-orange">Selected Works</span>
          <h2 className="scroll-works-title">Scroll To Explore Concept Grid</h2>
        </motion.div>

        {/* The 5x3 Playbook Grid */}
        <div className="playbook-grid">
          {/* Layer 1 (Outer Columns) */}
          <motion.div
            className="grid-layer layer-1"
            style={{ opacity: layer1Opacity, scale: layer1Scale }}
          >
            {layer1Projects.map((p) => (
              <div key={p.id} className="grid-cell">
                <CompactMockupCard project={p} />
              </div>
            ))}
          </motion.div>

          {/* Layer 2 (Mid Columns) */}
          <motion.div
            className="grid-layer layer-2"
            style={{ opacity: layer2Opacity, scale: layer2Scale }}
          >
            {layer2Projects.map((p) => (
              <div key={p.id} className="grid-cell">
                <CompactMockupCard project={p} />
              </div>
            ))}
          </motion.div>

          {/* Layer 3 (Top & Bottom Center) */}
          <motion.div
            className="grid-layer layer-3"
            style={{ opacity: layer3Opacity, scale: layer3Scale }}
          >
            {layer3Projects.map((p) => (
              <div key={p.id} className="grid-cell">
                <CompactMockupCard project={p} />
              </div>
            ))}
          </motion.div>

          {/* Center Scaler Card */}
          <motion.div
            className="grid-scaler"
            style={{ scale: scalerScale, borderRadius: scalerRadius }}
          >
            <CompactMockupCard project={scalerProject} isFeatured={true} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── CAPABILITIES / SERVICES BENTO GRID COMPONENT ─── */
function ServicesBentoSection() {
  const [activeDevice, setActiveDevice] = useState('Desktop')

  return (
    <section className="services-bento-section" id="services">
      <div className="services-bento-container">
        {/* Section Header */}
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="section-badge-orange">Capabilities & Services</span>
          <h2 className="services-main-title">Crafting Digital Excellence End-to-End</h2>
          <p className="services-header-desc">
            A balanced synthesis of visual artistry, human psychology, and modern frontend engineering.
          </p>
        </motion.div>

        {/* The Bento Grid Container */}
        <div className="bento-grid">
          {/* Bento Card 1: UI/UX & Web Design (Wide 2-Column Card) */}
          <motion.div
            className="bento-card bento-card-wide"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <div className="bento-card-content">
              <div className="bento-card-header">
                <span className="bento-tag">01 / Design Architecture</span>
                <h3 className="bento-title">Bespoke UI/UX & Web Design</h3>
                <p className="bento-desc">
                  Crafting high-converting, user-centric web layouts with striking visual hierarchy, intentional negative space, and deep aesthetic polish.
                </p>
              </div>

              <div className="bento-tags-row">
                <span className="bento-tag-pill">Responsive Architecture</span>
                <span className="bento-tag-pill">Wireframing & IA</span>
                <span className="bento-tag-pill">Conversion Design</span>
              </div>
            </div>

            {/* Interactive Viewport Mockup Element */}
            <div className="bento-card-visual visual-design-viewport">
              <div className="viewport-controls">
                <div className="viewport-toggle-group">
                  {['Desktop', 'Tablet', 'Mobile'].map((dev) => (
                    <button
                      key={dev}
                      className={`viewport-btn ${activeDevice === dev ? 'active' : ''}`}
                      onClick={() => setActiveDevice(dev)}
                      type="button"
                    >
                      {dev}
                    </button>
                  ))}
                </div>
                <span className="resolution-badge">
                  {activeDevice === 'Desktop' ? '1440 × 900' : activeDevice === 'Tablet' ? '834 × 1194' : '390 × 844'}
                </span>
              </div>

              <div className={`viewport-preview-screen device-${activeDevice.toLowerCase()}`}>
                <div className="screen-header-bar">
                  <div className="dots-mini"><span /><span /><span /></div>
                  <div className="url-mini">portfolio.safouan.design</div>
                </div>
                <div className="screen-wireframe-body">
                  <div className="wireframe-hero-badge" />
                  <div className="wireframe-hero-text" />
                  <div className="wireframe-cta-pill" />
                  <div className="wireframe-floating-stat">
                    <span className="stat-dot" />
                    <span>Contrast 14.2:1</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2: Interactive Motion & Micro-Interactions (1-Column Card) */}
          <motion.div
            className="bento-card bento-card-tall"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            <div className="bento-card-content">
              <div className="bento-card-header">
                <span className="bento-tag">02 / Kinetic Experience</span>
                <h3 className="bento-title">60fps Interactive Motion</h3>
                <p className="bento-desc">
                  Transforming static wireframes into fluid digital experiences with responsive spring physics.
                </p>
              </div>

              <div className="bento-tags-row">
                <span className="bento-tag-pill">Scroll Triggers</span>
                <span className="bento-tag-pill">Spring Physics</span>
                <span className="bento-tag-pill">Zero Jitter</span>
              </div>
            </div>

            {/* Kinetic Orb / Spring Visual */}
            <div className="bento-card-visual visual-motion-orbit">
              <div className="motion-orbit-container">
                <motion.div
                  className="motion-orbit-ring outer-ring"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                >
                  <span className="orbit-particle orange-particle" />
                </motion.div>
                <motion.div
                  className="motion-orbit-ring mid-ring"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                >
                  <span className="orbit-particle cyan-particle" />
                </motion.div>
                <div className="motion-center-core">
                  <span className="core-glow" />
                  <span className="core-fps">60 FPS</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 3: Modern Frontend & Clean Code (1-Column Card) */}
          <motion.div
            className="bento-card bento-card-tall"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          >
            <div className="bento-card-content">
              <div className="bento-card-header">
                <span className="bento-tag">03 / Code Craft</span>
                <h3 className="bento-title">Modern React & Clean Code</h3>
                <p className="bento-desc">
                  Bridging the gap between Figma designs and production-grade, lightning-fast web code.
                </p>
              </div>

              <div className="bento-tags-row">
                <span className="bento-tag-pill">React 19</span>
                <span className="bento-tag-pill">TypeScript</span>
                <span className="bento-tag-pill">Semantic HTML</span>
              </div>
            </div>

            {/* Mini Code Terminal Visual */}
            <div className="bento-card-visual visual-code-terminal">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <span className="terminal-tab-name">App.tsx</span>
                <span className="lighthouse-badge">⚡ 100</span>
              </div>
              <div className="terminal-code-body">
                <div className="code-line"><span className="kw">import</span> {'{ motion }'} <span className="kw">from</span> <span className="str">'motion/react'</span></div>
                <div className="code-line"><span className="kw">export default function</span> <span className="fn">Portfolio</span>() {'{'}</div>
                <div className="code-line indent"><span className="kw">return</span> (</div>
                <div className="code-line indent2">&lt;<span className="tag-name">motion.div</span> <span className="prop">animate</span>={'{{ scale: 1 }}'} /&gt;</div>
                <div className="code-line indent">)</div>
                <div className="code-line">{'}'}</div>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 4: Scalable Design Systems (Wide 2-Column Card) */}
          <motion.div
            className="bento-card bento-card-wide"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
          >
            <div className="bento-card-content">
              <div className="bento-card-header">
                <span className="bento-tag">04 / Scale & Foundations</span>
                <h3 className="bento-title">Scalable Design Systems & UI Kits</h3>
                <p className="bento-desc">
                  Building modular, token-driven component libraries that keep digital products visually coherent and effortless to maintain.
                </p>
              </div>

              <div className="bento-tags-row">
                <span className="bento-tag-pill">Design Tokens</span>
                <span className="bento-tag-pill">Component Architecture</span>
                <span className="bento-tag-pill">WCAG AA Compliant</span>
              </div>
            </div>

            {/* Design System Tokens Interactive Visual */}
            <div className="bento-card-visual visual-tokens-system">
              <div className="tokens-interactive-board">
                {/* Color Tokens Swatches */}
                <div className="token-palette-group">
                  <div className="token-swatch-item">
                    <span className="swatch-box bg-orange" />
                    <span className="swatch-hex">#FF4D00</span>
                  </div>
                  <div className="token-swatch-item">
                    <span className="swatch-box bg-cyan" />
                    <span className="swatch-hex">#38BDF8</span>
                  </div>
                  <div className="token-swatch-item">
                    <span className="swatch-box bg-slate" />
                    <span className="swatch-hex">#17181C</span>
                  </div>
                  <div className="token-swatch-item">
                    <span className="swatch-box bg-white" />
                    <span className="swatch-hex">#FFFFFF</span>
                  </div>
                </div>

                {/* Component Buttons States */}
                <div className="token-components-preview">
                  <div className="token-btn-sample btn-sample-primary">
                    <span>Action CTA</span>
                    <span className="mini-arrow">→</span>
                  </div>
                  <div className="token-btn-sample btn-sample-ghost">
                    <span>Secondary</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── "WHY WORK WITH ME" / THE COMPETITIVE EDGE SECTION ─── */
const whyMePillars = [
  {
    id: '01',
    badge: 'Zero Translation Loss',
    title: 'The Hybrid Advantage: Design + Code in One',
    desc: 'No designer-to-developer disconnect. Because I write the frontend code myself, every curve, shadow, and interaction looks 100% faithful to the design.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 18l6-6-6-6" />
        <path d="M8 6l-6 6 6 6" />
        <path d="M12 4v16" />
      </svg>
    ),
    metric: '100% Pixel Match',
  },
  {
    id: '02',
    badge: 'Performance & Speed',
    title: 'Sub-Second Speeds & Lighthouse Excellence',
    desc: 'Bloated themes kill conversion rates. I build lightweight, hardware-accelerated code with optimal Core Web Vitals and zero cumulative layout shift.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    metric: '< 0.8s Load Time',
  },
  {
    id: '03',
    badge: 'Craft & Engagement',
    title: '60fps Micro-interactions & Tactile Details',
    desc: 'Websites should feel alive. With subtle scroll physics and responsive micro-animations, your brand immediately stands out in the memory of visitors.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    metric: '60 FPS Physics',
  },
  {
    id: '04',
    badge: 'Agile & Direct',
    title: 'Direct Collaboration, Zero Agency Bureaucracy',
    desc: 'Skip multiple account managers and weeks of red tape. Work directly with the creator building your product for rapid iterations and total transparency.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    metric: 'Direct Slack / Async',
  },
]

const comparisonData = [
  { feature: 'Workflow', agency: 'Figma tossed to 3rd party devs', me: 'Code-native designer (Zero Loss)' },
  { feature: 'Turnaround Time', agency: 'Weeks of bureaucratic layers', me: 'Rapid sprints & direct feedback' },
  { feature: 'Tech Stack', agency: 'Bloated page builders / WordPress', me: 'Modern React 19, Next.js & Vanilla CSS' },
  { feature: 'Motion & Polish', agency: 'Static templates or basic effects', me: 'Custom 60fps spring scroll physics' },
]

function WhyWorkWithMeSection() {
  return (
    <section className="why-me-section" id="why-me">
      <div className="why-me-container">
        {/* Section Header */}
        <motion.div
          className="why-me-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="section-badge-orange">Why Work With Me</span>
          <h2 className="why-me-title">The Competitive Edge: Fast, Precise & Code-Native</h2>
          <p className="why-me-desc">
            Why partnering with a dedicated hybrid designer-developer delivers higher quality, faster turnaround, and superior conversion rates.
          </p>
        </motion.div>

        {/* 4 Pillars Grid */}
        <div className="why-me-grid">
          {whyMePillars.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              className="why-pillar-card"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease }}
            >
              <div className="pillar-top-row">
                <div className="pillar-icon-box">
                  {pillar.icon}
                </div>
                <span className="pillar-metric-badge">{pillar.metric}</span>
              </div>

              <div className="pillar-body">
                <span className="pillar-badge-num">{pillar.id} / {pillar.badge}</span>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.desc}</p>
              </div>

              <div className="pillar-glow-accent" />
            </motion.div>
          ))}
        </div>

        {/* Comparative Advantage Table */}
        <motion.div
          className="comparison-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="comparison-header">
            <div className="comp-title-group">
              <span className="section-badge-orange">The Difference</span>
              <h3 className="comp-main-heading">Traditional Agencies vs. Working With Me</h3>
            </div>
            <a href="#contact" className="pill-btn orange-btn comp-cta-btn">
              <span>Let's talk</span>
              <SlidingArrowIcon isWhite={true} />
            </a>
          </div>

          <div className="comparison-table">
            <div className="table-row table-header-row">
              <div className="table-col col-feature">Dimension</div>
              <div className="table-col col-agency">Traditional Agency</div>
              <div className="table-col col-me">Working With Safouan</div>
            </div>

            {comparisonData.map((row) => (
              <div className="table-row" key={row.feature}>
                <div className="table-col col-feature">{row.feature}</div>
                <div className="table-col col-agency">
                  <span className="cross-icon">✕</span>
                  <span>{row.agency}</span>
                </div>
                <div className="table-col col-me">
                  <span className="check-icon">✓</span>
                  <span>{row.me}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── INTERACTIVE CONTACT FORM SECTION ─── */
function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Design (UI/UX)',
    budget: '$1k - $3k',
    message: '',
  })
  const [copied, setCopied] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@safouan.design')
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const servicesOptions = [
    'Web Design (UI/UX)',
    'Frontend / React',
    'Full Website Build',
    'Design System & Tokens',
    'Internship / Hiring',
  ]

  const budgetOptions = ['< $1k', '$1k - $3k', '$3k - $5k', '$5k+']

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <motion.div
          className="contact-layout-wrapper"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease }}
        >
          {/* Left Column: Direct Touch & Status */}
          <div className="contact-info-panel">
            <div className="contact-status-pill">
              <span className="status-live-dot" />
              <span>Available for projects & internships</span>
            </div>

            <div className="contact-heading-group">
              <h2 className="contact-title">Let’s Build Something Remarkable.</h2>
              <p className="contact-desc">
                Have a project idea in mind, need a design-to-code creator, or want to discuss an internship or opportunity? Let's connect.
              </p>
            </div>

            {/* Direct Details Box */}
            <div className="contact-quick-details">
              <div className="contact-detail-item">
                <span className="contact-item-label">Direct Email</span>
                <div className="contact-email-row">
                  <a href="mailto:contact@safouan.design" className="contact-email-link">
                    contact@safouan.design
                  </a>
                  <button
                    type="button"
                    className={`copy-email-btn ${copied ? 'copied' : ''}`}
                    onClick={handleCopyEmail}
                    title="Copy Email Address"
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="contact-detail-item">
                <span className="contact-item-label">Location & Availability</span>
                <span className="contact-item-value">Brussels, Belgium · Remote Worldwide</span>
              </div>

              <div className="contact-detail-item">
                <span className="contact-item-label">Typical Response</span>
                <span className="contact-item-value highlight-orange">⚡ Within 24 hours</span>
              </div>
            </div>

            {/* Social Network Pills */}
            <div className="contact-social-row">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-pill">
                <span>GitHub</span>
                <span className="social-arrow">↗</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-pill">
                <span>LinkedIn</span>
                <span className="social-arrow">↗</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-pill">
                <span>Twitter / X</span>
                <span className="social-arrow">↗</span>
              </a>
              <a href="https://figma.com" target="_blank" rel="noopener noreferrer" className="social-pill">
                <span>Figma</span>
                <span className="social-arrow">↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-panel">
            {isSubmitted ? (
              <motion.div
                className="form-success-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease }}
              >
                <div className="success-icon-box">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="success-title">Message Received!</h3>
                <p className="success-desc">
                  Thanks for reaching out, <strong>{formData.name || 'there'}</strong>. I have received your message and will get back to you shortly at <strong>{formData.email}</strong>.
                </p>
                <button
                  type="button"
                  className="pill-btn orange-btn reset-form-btn"
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({ name: '', email: '', service: 'Web Design (UI/UX)', budget: '$1k - $3k', message: '' })
                  }}
                >
                  <span>Send another message</span>
                </button>
              </motion.div>
            ) : (
              <form className="interactive-contact-form" onSubmit={handleSubmit}>
                <div className="form-header">
                  <span className="form-header-badge">Get In Touch</span>
                  <h3 className="form-header-title">Send a Direct Message</h3>
                </div>

                <div className="form-grid-2col">
                  {/* Name Input */}
                  <div className="form-group">
                    <label htmlFor="user-name" className="form-label">Your Name</label>
                    <input
                      id="user-name"
                      type="text"
                      className="form-input"
                      placeholder="Alex Morgan"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  {/* Email Input */}
                  <div className="form-group">
                    <label htmlFor="user-email" className="form-label">Email Address</label>
                    <input
                      id="user-email"
                      type="email"
                      className="form-input"
                      placeholder="alex@company.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Service Needed Pill Selector */}
                <div className="form-group">
                  <label className="form-label">What service are you looking for?</label>
                  <div className="form-pills-row">
                    {servicesOptions.map((srv) => (
                      <button
                        key={srv}
                        type="button"
                        className={`form-option-pill ${formData.service === srv ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, service: srv })}
                      >
                        {srv}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Estimated Budget Pill Selector */}
                <div className="form-group">
                  <label className="form-label">Estimated Budget / Scope (Optional)</label>
                  <div className="form-pills-row">
                    {budgetOptions.map((bud) => (
                      <button
                        key={bud}
                        type="button"
                        className={`form-option-pill ${formData.budget === bud ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, budget: bud })}
                      >
                        {bud}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="form-group">
                  <label htmlFor="user-message" className="form-label">Project Details & Goals</label>
                  <textarea
                    id="user-message"
                    className="form-textarea"
                    rows={4}
                    placeholder="Tell me about your brand, goals, target timeline, or reference links..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {/* Submit Action Button */}
                <div className="form-submit-row">
                  <button type="submit" className="pill-btn orange-btn submit-btn">
                    <span>Send Message</span>
                    <SlidingArrowIcon isWhite={true} />
                  </button>
                  <span className="submit-note">🔒 No spam, ever. Response guaranteed within 24h.</span>
                </div>
              </form>
            )}
          </div>
        </motion.div>

        {/* Minimalist Footer */}
        <footer className="site-footer">
          <div className="footer-left">
            <span className="footer-logo">Safouan.</span>
            <span className="footer-copy">© {new Date().getFullYear()} Safouan. Crafted with precision.</span>
          </div>
          <a href="#home" className="footer-back-top">
            <span>Back to top</span>
            <span className="back-top-arrow">↑</span>
          </a>
        </footer>
      </div>
    </section>
  )
}

export default function App() {
  const topStageRef = useRef(null)
  const aboutRef = useRef(null)

  // Track scroll progress of Hero / Top stage
  const { scrollYProgress: topStageScroll } = useScroll({
    target: topStageRef,
    offset: ['start start', 'end start'],
  })

  // Track scroll progress for About section
  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ['start end', 'center center'],
  })

  const smoothHeroScroll = useSpring(topStageScroll, { stiffness: 90, damping: 24, mass: 0.28 })
  const smoothAboutScroll = useSpring(aboutScroll, { stiffness: 90, damping: 24, mass: 0.28 })

  // Parallax values for Hero Elements
  const heroImgY = useTransform(smoothHeroScroll, [0, 1], ['0%', '16%'])
  const heroImgScale = useTransform(smoothHeroScroll, [0, 1], [1, 1.08])
  const heroLeftY = useTransform(smoothHeroScroll, [0, 1], [0, -65])
  const heroRightY = useTransform(smoothHeroScroll, [0, 1], [0, -45])
  const heroBottomRowY = useTransform(smoothHeroScroll, [0, 1], [0, -25])
  const heroFadeOpacity = useTransform(smoothHeroScroll, [0, 0.65, 1], [1, 0.9, 0.25])
  const topStageScale = useTransform(smoothHeroScroll, [0, 1], [1, 0.95])
  const topStageY = useTransform(smoothHeroScroll, [0, 1], [0, -35])

  // Parallax values for About Section
  const aboutBadgeY = useTransform(smoothAboutScroll, [0, 1], [50, 0])
  const aboutHeadingY = useTransform(smoothAboutScroll, [0, 1], [65, 0])
  const aboutLeadY = useTransform(smoothAboutScroll, [0, 1], [80, 0])
  const aboutCtaY = useTransform(smoothAboutScroll, [0, 1], [95, 0])
  const aboutOpacity = useTransform(smoothAboutScroll, [0, 0.8], [0.15, 1])
  const aboutAmbientGlowY = useTransform(smoothAboutScroll, [0, 1], [-80, 40])
  const aboutAmbientGlowOpacity = useTransform(smoothAboutScroll, [0, 0.5, 1], [0, 0.35, 0.15])

  return (
    <div className="portfolio-app">
      {/* ─── TOP STAGE COMPOSITE (Radiant Hero + Dark Charcoal Tech Banner) ─── */}
      <motion.div
        className="top-stage-container"
        ref={topStageRef}
        style={{ scale: topStageScale, y: topStageY }}
      >
        {/* 1. Radiant Hero Card with Rounded Bottom Edge */}
        <section className="hero-stage-card" id="home">
          <div className="hero-backdrop">
            <motion.img
              src="/portrait-2.png"
              alt="Safouan portrait background"
              className="hero-bg-img"
              style={{ y: heroImgY, scale: heroImgScale }}
            />
            <div className="hero-ambient-glow" />
            <div className="hero-gradient-overlay" />
          </div>

          <Header />

          {/* Hero Content with Parallax drift */}
          <div className="hero-stage-content">
            <div className="hero-grid">
              {/* Left Column */}
              <motion.div
                className="hero-col-left"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.15, ease }}
                style={{ y: heroLeftY, opacity: heroFadeOpacity }}
              >
                <span className="hero-eyebrow">Hey, I'm a</span>
                <h1 className="hero-title">
                  Web<br />
                  Designer
                </h1>
              </motion.div>

              {/* Center spacer */}
              <div className="hero-col-center" />

              {/* Right Column */}
              <motion.div
                className="hero-col-right"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.3, ease }}
                style={{ y: heroRightY, opacity: heroFadeOpacity }}
              >
                <h2 className="hero-quote">
                  Great websites should<br className="hide-mobile" /> feel effortless.
                </h2>
                <p className="hero-quote-desc">
                  From wireframes to interactive code, I design modern web experiences that captivate and convert.
                </p>
              </motion.div>
            </div>

            {/* Bottom Specialties Row inside Hero Card */}
            <motion.div
              className="hero-specialties-row"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.45, ease }}
              style={{ y: heroBottomRowY, opacity: heroFadeOpacity }}
            >
              {specialties.map((item) => (
                <div className="specialty-item" key={item.id}>
                  <span className="specialty-num">{item.id}</span>
                  <h3 className="specialty-title">{item.title}</h3>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 2. Charcoal Gray Tech Banner directly under Hero Curve */}
        <section className="tech-banner">
          <div className="tech-container">
            <div className="tech-label">
              Technologies & Tools<br className="hide-mobile" /> I Build With
            </div>
            <div className="tech-list">
              {techStack.map((tech) => (
                <div className="tech-pill" key={tech.name}>
                  <span className="tech-icon">{tech.icon}</span>
                  <span className="tech-name">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>

      {/* ─── PITCH BLACK SECTIONS: ABOUT / BEHIND THE DESIGNS (Parallax Scroll Reveal) ─── */}
      <section className="behind-designs-section" id="about" ref={aboutRef}>
        {/* Ambient floating flare */}
        <motion.div
          className="about-parallax-glow"
          style={{ y: aboutAmbientGlowY, opacity: aboutAmbientGlowOpacity }}
        />

        <div className="behind-container">
          {/* Left Column */}
          <div className="behind-col-left">
            <motion.span
              className="section-badge-orange"
              style={{ y: aboutBadgeY, opacity: aboutOpacity }}
            >
              About me <span className="badge-line" aria-hidden="true" />
            </motion.span>
            <motion.h2
              className="behind-heading"
              style={{ y: aboutHeadingY, opacity: aboutOpacity }}
            >
              Designing with clarity, building with intent.
            </motion.h2>
            <motion.p
              className="behind-supporting-copy"
              style={{ y: aboutHeadingY, opacity: aboutOpacity }}
            >
              I’m Safouan, a web designer and frontend developer who turns complex ideas into digital experiences that feel simple, considered, and unmistakably human.
            </motion.p>
          </div>

          {/* Right Column */}
          <div className="behind-col-right">
            <motion.p
              className="behind-lead"
              style={{ y: aboutLeadY, opacity: aboutOpacity }}
            >
              The best work sits at the intersection of a sharp idea and a thoughtful interaction.
            </motion.p>

            <motion.div
              className="behind-details"
              style={{ y: aboutLeadY, opacity: aboutOpacity }}
            >
              <div className="behind-detail-row">
                <span className="detail-label">My approach</span>
                <span className="detail-value">Research → structure → refine</span>
              </div>
              <div className="behind-detail-row">
                <span className="detail-label">I care about</span>
                <span className="detail-value">Useful details, honest motion, fast interfaces</span>
              </div>
              <div className="behind-detail-row">
                <span className="detail-label">Based in</span>
                <span className="detail-value">Belgium · working worldwide</span>
              </div>
            </motion.div>

            <motion.div
              className="behind-cta-block"
              style={{ y: aboutCtaY, opacity: aboutOpacity }}
            >
              <span className="cta-subtext">Ready to bring your next website to life?</span>
              <a href="#contact" className="pill-btn orange-btn">
                <span>Start a project</span>
                <SlidingArrowIcon isWhite={true} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CAPABILITIES / SERVICES BENTO GRID SECTION ─── */}
      <ServicesBentoSection />

      {/* ─── "WHY WORK WITH ME" / THE COMPETITIVE EDGE SECTION ─── */}
      <WhyWorkWithMeSection />

      {/* ─── SELECTED WORKS: SCROLL GRID REVEAL (Playbook Architecture) ─── */}
      <SelectedWorksScrollSection />

      {/* ─── CONTACT SECTION & INTERACTIVE FORM ─── */}
      <ContactSection />
    </div>
  )
}
