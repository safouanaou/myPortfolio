import { useState } from 'react'
import { StructureFlowCollection } from '@designcodeio/threeui'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Selected work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
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

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Safouan home">S<span>/</span></a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>
        <span>Menu</span><span className={`menu-icon ${menuOpen ? 'is-open' : ''}`} aria-hidden="true"><i /><i /></span>
      </button>
      <nav id="main-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        {navItems.map((item, index) => <a href={item.href} key={item.label} onClick={() => setMenuOpen(false)}><span className="nav-index">0{index + 1}</span>{item.label}</a>)}
      </nav>
    </header>
  )
}

const Eyebrow = ({ children }) => <p className="eyebrow"><span className="eyebrow-dot" />{children}</p>

export default function App() {
  return (
    <main className="portfolio" id="top">
      <Header />
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
          <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="portrait-disc" />
          <div className="portrait-frame">
            <img className="portrait-image portrait-body" src="/portrait.png" alt="" aria-hidden="true" />
            <img className="portrait-image portrait-head" src="/portrait.png" alt="Safouan smiling in a black shirt" />
          </div>
          <p className="visual-note">Based in Belgium<br />Working worldwide</p><span className="visual-number">01</span>
        </div>
        <div className="hero-footer"><span>Scroll to explore</span><span className="footer-rule" /><span>© 2026</span></div>
      </section>
      <section className="about-section" id="about">
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
      <section className="contact-section" id="contact"><Eyebrow>Have a project in mind?</Eyebrow><h2>Let’s make<br /><em>something good.</em></h2><a className="button button-primary" href="mailto:contact@safouan.design">Start a conversation <ArrowIcon /></a></section>
    </main>
  )
}
