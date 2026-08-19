import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'

const ease = [0.22, 1, 0.36, 1]

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

function Header() {
  return (
    <motion.header
      className="site-header"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
    >
      <a className="monogram" href="#home" aria-label="Safouan Aouezghar, home">S.</a>

      <nav aria-label="Primary navigation">
        {navItems.map((item, index) => (
          <a className={index === 0 ? 'is-active' : ''} key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </motion.header>
  )
}

function Portfolio() {
  const heroRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 })
  const heroScale = useTransform(progress, [0, 0.62, 1], [1, 1, 0.92])
  const heroOpacity = useTransform(progress, [0, 0.62, 0.94, 1], [1, 1, 0.45, 0.12])
  const heroY = useTransform(progress, [0, 0.58, 1], [0, 0, -76])

  return (
    <main className="portfolio">
      <section
        className="hero-scroll"
        id="home"
        ref={heroRef}
      >
        <motion.div
          className="hero"
          style={reduceMotion ? undefined : { scale: heroScale, opacity: heroOpacity, y: heroY }}
        >
          <Header />

          <div className="hero-content">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, x: -44 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.18, ease }}
            >
              <span className="eyebrow">Independent creative · Brussels</span>
              <h1>Web<br /><em>designer</em></h1>
              <p>
                I shape thoughtful digital experiences for people and brands
                with something meaningful to say.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">Hire me <span>↗</span></a>
                <a className="button button-ghost" href="#work">View my work <span>↓</span></a>
              </div>
            </motion.div>

            <motion.div
              className="hero-portrait"
              initial={{ opacity: 0, x: 48, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.05, delay: 0.32, ease }}
            >
              <div className="portrait-shape" aria-hidden="true" />
              <img src="/portrait.png" alt="Portrait of Safouan Aouezghar" />
              <span className="portrait-note">Available for select projects <i>✳</i></span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="about-section" id="about">
        <motion.div
          className="about-inner"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="about-heading">
            <h2>About me</h2>
            <span>02 / 04</span>
          </div>
          <p className="about-copy">
            I’m a web designer based in Brussels, focused on helping ambitious
            businesses turn their ideas into clear, memorable digital experiences.
            I combine thoughtful visual design with smooth interaction to create
            websites that feel modern, fast, and easy to use.
          </p>
        </motion.div>

        <span className="anchor" id="work" aria-hidden="true" />
        <span className="anchor" id="contact" aria-hidden="true" />
      </section>
    </main>
  )
}

export default Portfolio
