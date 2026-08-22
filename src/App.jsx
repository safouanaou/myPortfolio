import { useEffect, useRef, useState } from 'react'
import { StructureFlowCollection } from '@designcodeio/threeui'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Selected work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const processSteps = [
  { number: '01', title: 'Discover', copy: 'We clarify the goal, audience and atmosphere your business needs to communicate.' },
  { number: '02', title: 'Shape', copy: 'I turn the direction into a clear structure, visual language and confident concept.' },
  { number: '03', title: 'Build', copy: 'The experience comes to life through responsive design, careful detail and useful interaction.' },
  { number: '04', title: 'Launch', copy: 'We test, refine and hand over a polished presence ready to move your business forward.' },
]

const serviceBundles = [
  {
    number: '01',
    name: 'Essential Presence',
    audience: 'For a new or small business that needs one strong, credible place online.',
    price: '€750',
    timeline: '2–3 weeks',
    cta: 'Enquire about Essential',
    features: ['Custom one-page website', 'Responsive desktop and mobile design', 'Focused typography and colour direction', 'Contact form, map and primary action'],
  },
  {
    number: '02',
    name: 'Signature Experience',
    audience: 'For an established business ready for a more complete and distinctive presence.',
    price: '€1,500',
    timeline: '4–6 weeks',
    cta: 'Enquire about Signature',
    featured: true,
    features: ['Custom website with up to five pages', 'Visual direction for type, colour, imagery and voice', 'Print or digital menu or service list', 'Enquiry or reservation integration'],
  },
  {
    number: '03',
    name: 'Complete Brand Presence',
    audience: 'For a launch or repositioning that needs one coherent system across screen, print and place.',
    price: '€2,500',
    timeline: 'To be scoped',
    cta: 'Enquire about Complete',
    features: ['Brand positioning and visual identity', 'Custom website with up to eight pages', 'Compact guidelines and reusable asset library', 'Three collateral items'],
  },
]

function ArrowIcon() {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13 13 3M5 3h8v8" /></svg>
}

function ThemeToggle({ isLight, onToggle }) {
  return (
    <label className="theme-switch" aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}>
      <input type="checkbox" checked={isLight} onChange={onToggle} />
      <span className="theme-slider">
        <span className="theme-sun" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg></span>
        <span className="theme-moon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 15.7A8.5 8.5 0 0 1 8.3 4 8.5 8.5 0 1 0 20 15.7Z" /></svg></span>
      </span>
    </label>
  )
}

function Header({ isLight, onToggle }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Safouan home">S<span>/</span></a>
      <ThemeToggle isLight={isLight} onToggle={onToggle} />
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>
        <span>Menu</span><span className={`menu-icon ${menuOpen ? 'is-open' : ''}`} aria-hidden="true"><i /><i /></span>
      </button>
      <nav id="main-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        {navItems.map((item, index) => <a href={item.href} key={item.label} onClick={() => setMenuOpen(false)}><span className="nav-index">0{index + 1}</span>{item.label}</a>)}
      </nav>
    </header>
  )
}

function Footer() {
  const waveRef = useRef(null)

  useEffect(() => {
    let lastScroll = window.scrollY
    let lastTime = performance.now()
    let targetBounce = 0
    let bounce = 0
    let frameId

    const updateScrollSpeed = () => {
      const now = performance.now()
      const elapsed = Math.max(16, now - lastTime)
      const speed = Math.abs(window.scrollY - lastScroll) / elapsed
      targetBounce = Math.min(1, speed * 0.32)
      lastScroll = window.scrollY
      lastTime = now
    }

    const animateWave = () => {
      bounce += (targetBounce - bounce) * 0.16
      targetBounce *= 0.9
      if (waveRef.current) {
        const curve = (156 * bounce).toFixed(2)
        waveRef.current.setAttribute('d', `M0-0.3C0-0.3,464,${curve},1139,${curve}S2278-0.3,2278-0.3V683H0V-0.3z`)
      }
      frameId = window.requestAnimationFrame(animateWave)
    }

    window.addEventListener('scroll', updateScrollSpeed, { passive: true })
    animateWave()
    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', updateScrollSpeed)
    }
  }, [])

  return (
    <footer className="site-footer">
      <svg className="footer-wave" preserveAspectRatio="none" viewBox="0 0 2278 683" aria-hidden="true">
        <defs>
          <linearGradient id="footer-gradient" x1="0" y1="0" x2="2278" y2="683" gradientUnits="userSpaceOnUse">
            <stop offset=".15" stopColor="#162316" />
            <stop offset=".58" stopColor="#2d471d" />
            <stop offset=".9" stopColor="#8ba52f" />
          </linearGradient>
        </defs>
        <path ref={waveRef} className="footer-wave-path" fill="url(#footer-gradient)" d="M0-0.3C0-0.3,464,0,1139,0S2278-0.3,2278-0.3V683H0V-0.3z" />
      </svg>
      <div className="footer-grain" aria-hidden="true" />
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="footer-mark" href="#top" aria-label="Safouan home">S<span>/</span></a>
            <p>Independent designer and developer creating thoughtful digital experiences for businesses with something to say.</p>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <span className="footer-label">Explore</span>
            <a href="#about">About</a>
            <a href="#work">Selected work</a>
            <a href="#services">Services</a>
            <a href="#process">Process</a>
          </nav>
          <div className="footer-contact">
            <span className="footer-label">Get in touch</span>
            <a href="mailto:aouezgharsafouan@gmail.com">aouezgharsafouan@gmail.com <span>↗</span></a>
            <p>Ghent, Belgium<br />Working worldwide</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Safouan Aouezghar</span>
          <span>English · Français · العربية</span>
          <a href="#top">Back to top ↗</a>
        </div>
      </div>
    </footer>
  )
}

const Eyebrow = ({ children }) => <p className="eyebrow"><span className="eyebrow-dot" />{children}</p>

function FluidField() {
  return (
    <div className="section-shader" aria-hidden="true">
      <StructureFlowCollection variant="fluid-field" hue={-166} saturation={1.00} brightness={1.25} />
    </div>
  )
}

export default function App() {
  const aboutRef = useRef(null)
  const [isLight, setIsLight] = useState(false)

  const handleContactSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const project = formData.get('project')
    const subject = `Project enquiry from ${name}`
    const body = `Name: ${name}\nEmail: ${email}\n\nProject details:\n${project}`
    window.location.href = `mailto:aouezgharsafouan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  useEffect(() => {
    let targetProgress = 0
    let currentProgress = 0
    let frameId

    const updateAboutProgress = () => {
      if (!aboutRef.current) return
      const { top, height } = aboutRef.current.getBoundingClientRect()
      const viewport = window.innerHeight
      const start = viewport * 0.92
      const end = -height * 0.5
      targetProgress = Math.min(1, Math.max(0, (start - top) / (start - end)))
    }

    const easeAboutProgress = () => {
      currentProgress += (targetProgress - currentProgress) * 0.055
      if (aboutRef.current) aboutRef.current.style.setProperty('--about-progress', currentProgress.toFixed(3))
      frameId = window.requestAnimationFrame(easeAboutProgress)
    }

    updateAboutProgress()
    easeAboutProgress()
    window.addEventListener('scroll', updateAboutProgress, { passive: true })
    window.addEventListener('resize', updateAboutProgress)
    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', updateAboutProgress)
      window.removeEventListener('resize', updateAboutProgress)
    }
  }, [])

  return (
    <main className={`portfolio ${isLight ? 'theme-light' : ''}`} id="top">
      <Header isLight={isLight} onToggle={() => setIsLight((light) => !light)} />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-shader" aria-hidden="true">
          <StructureFlowCollection variant="fluid-field" hue={-166} saturation={1.00} brightness={1.25} />
        </div>
        <div className="hero-copy">
          <Eyebrow>Independent designer / developer</Eyebrow>
          <h1 id="hero-title">WEB<br /><em>DESIGNER</em></h1>
          <div className="hero-intro"><span className="intro-line" aria-hidden="true" /><p>I create thoughtful digital experiences where bold direction meets clear, useful interaction.</p></div>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">Hire me <ArrowIcon /></a>
            <a className="button button-quiet" href="#work">View my work <span className="button-arrow">↗</span></a>
          </div>
        </div>
        <div className="hero-visual" aria-label="Portrait of Safouan">
          <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
          <div className="portrait-disc">
            <img className="portrait-image" src="/portrait.png" alt="Safouan smiling in a black shirt" />
          </div>
          <p className="visual-note">Based in Belgium<br />Working worldwide</p><span className="visual-number">01</span>
        </div>
        <div className="hero-footer"><span>Scroll to explore</span><span className="footer-rule" /><span>© 2026</span></div>
      </section>
      <section className="about-section" id="about" ref={aboutRef}>
        <div className="about-heading">
          <Eyebrow>A little more about me</Eyebrow>
          <h2>Design that feels<br /><em>like you.</em></h2>
        </div>
        <div className="about-copy">
          <p className="about-lead">I’m Safouan Aouezghar, a designer and developer working across visual direction, interface design and frontend development.</p>
          <p>Combining those disciplines lets me protect the central idea from the first concept to the finished website.</p>
          <p>I focus on independent businesses where atmosphere matters and the digital experience still needs to remain clear and useful.</p>
          <div className="about-meta">
            <span>Ghent, Belgium</span>
            <span>English · French · Arabic</span>
            <span>Booking from September 2026</span>
          </div>
        </div>
      </section>
      <section className="work-section" id="work">
        <FluidField />
        <div className="work-heading">
          <Eyebrow>Selected work</Eyebrow>
          <h2>Coming into<br /><em>focus.</em></h2>
        </div>
        <div className="work-grid" aria-label="Selected work projects">
          <article className="work-card" data-project="01"><span>01</span><div className="work-card-canvas" /></article>
          <article className="work-card" data-project="02"><span>02</span><div className="work-card-canvas" /></article>
          <article className="work-card" data-project="03"><span>03</span><div className="work-card-canvas" /></article>
        </div>
      </section>
      <section className="services-section" id="services">
        <div className="services-heading">
          <Eyebrow>Ways to work together</Eyebrow>
          <h2>Choose the right<br /><em>level of detail.</em></h2>
          <p>Clear packages for businesses that want a more thoughtful presence online, without losing sight of what needs to get done.</p>
        </div>
        <div className="services-list">
          {serviceBundles.map((bundle) => (
            <article className={`service-card ${bundle.featured ? 'is-featured' : ''}`} key={bundle.number}>
              <div className="service-card-top">
                <span className="service-number">{bundle.number}</span>
                {bundle.featured && <span className="service-badge">Most chosen</span>}
              </div>
              <h3>{bundle.name}</h3>
              <p className="service-audience">{bundle.audience}</p>
              <div className="service-price"><span>From</span><strong>{bundle.price}</strong></div>
              <ul>{bundle.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <div className="service-card-bottom">
                <span className="service-timeline">Typical timeline · {bundle.timeline}</span>
                <a href="https://safouanaouezghar.com/#contact" className="service-link">{bundle.cta} <span>↗</span></a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="process-section" id="process" aria-labelledby="process-title">
        <FluidField />
        <div className="process-heading">
          <Eyebrow>A clear way forward</Eyebrow>
          <h2 id="process-title">From first idea<br /><em>to launch.</em></h2>
          <p>A thoughtful process keeps the work focused, collaborative and moving in the right direction.</p>
        </div>
        <div className="process-list">
          {processSteps.map((step) => (
            <article className="process-step" key={step.number}>
              <span className="process-number">{step.number}</span>
              <div className="process-step-copy">
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
              <span className="process-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>
      <section className="contact-section" id="contact">
        <div className="contact-layout">
          <div className="contact-copy">
            <Eyebrow>Have a project in mind?</Eyebrow>
            <h2>Let’s make<br /><em>work that matters.</em></h2>
            <p>Tell me what you’re building, where you’re headed and what you need help making clearer.</p>
            <a className="contact-email" href="mailto:aouezgharsafouan@gmail.com">aouezgharsafouan@gmail.com <span>↗</span></a>
          </div>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <label htmlFor="contact-name">Your name</label>
            <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Name" required />
            <label htmlFor="contact-email">Your email</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
            <label htmlFor="contact-project">Tell me about the project</label>
            <textarea id="contact-project" name="project" rows="4" placeholder="A few words about what you need..." required />
            <button className="button button-primary" type="submit">Start a conversation <ArrowIcon /></button>
            <p className="form-note">This opens your email app with the message ready to send.</p>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  )
}
