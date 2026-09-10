import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import ScrollExpand from "./ScrollExpand";
import { setupServicesMotion } from "./servicesMotion";
import { setupFinaleMotion } from "./finaleMotion";
import { setupSmoothScroll } from "./smoothScroll";
const GridScan = lazy(() => import("./GridScan"));
gsap.registerPlugin(ScrollTrigger, SplitText);

const processSteps = [
  {
    number: "01",
    title: "Discover",
    copy: "We clarify the goal, audience and atmosphere your business needs to communicate.",
  },
  {
    number: "02",
    title: "Shape",
    copy: "I turn the direction into a clear structure, visual language and confident concept.",
  },
  {
    number: "03",
    title: "Build",
    copy: "The experience comes to life through responsive design, careful detail and useful interaction.",
  },
  {
    number: "04",
    title: "Launch",
    copy: "We test, refine and hand over a polished presence ready to move your business forward.",
  },
];

const serviceBundles = [
  {
    number: "01",
    name: "Essential Presence",
    audience:
      "For a new or small business that needs one strong, credible place online.",
    price: "€750",
    timeline: "2–3 weeks",
    cta: "Enquire about Essential",
    features: [
      "Custom one-page website",
      "Responsive desktop and mobile design",
      "Focused typography and colour direction",
      "Contact form, map and primary action",
    ],
  },
  {
    number: "02",
    name: "Signature Experience",
    audience:
      "For an established business ready for a more complete and distinctive presence.",
    price: "€1,500",
    timeline: "4–6 weeks",
    cta: "Enquire about Signature",
    featured: true,
    features: [
      "Custom website with up to five pages",
      "Visual direction for type, colour, imagery and voice",
      "Print or digital menu or service list",
      "Enquiry or reservation integration",
    ],
  },
  {
    number: "03",
    name: "Complete Brand Presence",
    audience:
      "For a launch or repositioning that needs one coherent system across screen, print and place.",
    price: "€2,500",
    timeline: "To be scoped",
    cta: "Enquire about Complete",
    features: [
      "Brand positioning and visual identity",
      "Custom website with up to eight pages",
      "Compact guidelines and reusable asset library",
      "Three collateral items",
    ],
  },
];

function Arrow({ down = false }) {
  return (
    <svg
      className={down ? "arrow arrow-down" : "arrow"}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function Mark({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="50"
          rx="15"
          ry="45"
          stroke="currentColor"
          strokeWidth="1.2"
          transform={`rotate(${i * 22.5} 50 50)`}
        />
      ))}
    </svg>
  );
}
function Header({ quiet, setQuiet }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  useEffect(() => {
    if (!open || quiet) return;
    ScrollTrigger.refresh();
    const reveal = gsap.fromTo(".main-nav a, .main-nav button",
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 0.5, stagger: 0.06, ease: "power3.out", clearProps: "clipPath" });
    return () => reveal.kill();
  }, [open, quiet]);
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <a href="#top" className="wordmark" aria-label="Safouan home">
        safouan
      </a>
      <span className="header-role">
        Independent design
        <br />& development
      </span>
      <button
        ref={menuButton}
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="main-nav"
      >
        {open ? "Close" : "Menu"}{" "}
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <nav
        id="main-nav"
        className={open ? "main-nav is-open" : "main-nav"}
        aria-label="Main navigation"
      >
        {[
          ["Work", "work"],
          ["About", "about"],
          ["Services", "services"],
          ["Let’s talk", "contact"],
        ].map(([name, id]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {name}
            {id === "contact" && <Arrow />}
          </a>
        ))}
        <button
          className="motion-toggle"
          aria-pressed={quiet}
          onClick={() => setQuiet(!quiet)}
        >
          {quiet ? "Motion off" : "Motion on"}
          <span className="toggle-indicator" />
        </button>
      </nav>
    </header>
  );
}

const mockups = [
  {
    name: "Bar César.",
    type: "Restaurant website · Concept",
    file: "bar-cesar",
    image: "/projects/bar-cesar.webp",
    alt: "Bar César interior photography featured in the restaurant website concept",
    url: "/projects/bar-cesar/index.html",
    theme: "cesar",
    copy: "A responsive restaurant concept with interactive menus, galleries and a guided enquiry flow.",
  },
  {
    name: "An identity with feeling.",
    type: "Identity mockup",
    file: "identity",
    theme: "orange",
    copy: "A space for a future brand identity.",
  },
  {
    name: "Made for every screen.",
    type: "Mobile mockup",
    file: "mobile",
    theme: "sage",
    copy: "A space for a future digital experience.",
  },
];

export default function App() {
  const root = useRef(null);
  const [systemReduced, setSystemReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [quiet, setQuiet] = useState(false);
  const [emailReady, setEmailReady] = useState(false);
  const [gridReady, setGridReady] = useState(false);
  const reduceMotion = quiet || systemReduced;
  useEffect(() => {
    if (!reduceMotion) return setupSmoothScroll();
  }, [reduceMotion]);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (reduceMotion) {
      setGridReady(false);
      return;
    }

    // Three.js and shader compilation are decorative, so keep them out of the
    // critical first-paint path. The CSS grid remains visible in the meantime.
    const timer = window.setTimeout(() => setGridReady(true), 1000);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);
  useEffect(() => {
    if (reduceMotion) return;
    let animationCleanup = () => {};
    const initializeAnimations = () => {
      if (!root.current) return;
    const splits = [];
    let cleanupServices = () => {};
    let cleanupFinale = () => {};
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const textTargets = gsap.utils.toArray(
        "main h1, main h2, main h3, .service-name, .footer-top > span"
      ).filter(el => !el.closest(".scroll-expand__overlay, .services-section, .process-section"));
      textTargets.forEach((el) => {
        const display = el.matches("h1, h2, h3, .finale-word, .footer-wordmark, .service-name");
        const accessibleText = el.getAttribute("aria-label") || el.innerText.replace(/\s+/g, " ").trim();
        const split = SplitText.create(el, {
          type: "words,chars", tag: "span", aria: "auto",
          wordsClass: "fold-word", charsClass: "fold-char",
        });
        el.setAttribute("aria-label", accessibleText);
        splits.push(split);
        gsap.from(split.chars, {
          rotationX: display ? -90 : -65,
          yPercent: display ? 85 : 65,
          transformOrigin: "50% 100%",
          transformPerspective: 700,
          duration: display ? 0.85 : 0.55,
          stagger: { amount: Math.min(display ? 0.65 : 0.4, split.chars.length * 0.018), from: "start" },
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 94%", once: true },
          clearProps: "transform,transformOrigin",
        });
      });
      gsap.fromTo(".finale > div", { clipPath: "inset(0 100% 0 0)" }, {
        clipPath: "inset(0 0% 0 0)", duration: 0.85, stagger: 0.08,
        ease: "power3.out", clearProps: "clipPath",
        scrollTrigger: { trigger: ".finale", start: "top 95%", once: true },
      });
      gsap.to(".hero-frame", {
        clipPath: "inset(3% 7% 14% 7% round 4px)",
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-track",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
      gsap.to(".hero-portrait", {
        scale: 0.96,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-track",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      const t = gsap.timeline({
        scrollTrigger: {
          trigger: ".statement",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      t.fromTo(
        ".statement-mark",
        { rotation: -100, rotateY: -55, y: 90 },
        { rotation: 100, rotateY: 45, y: -70, ease: "none" },
      );
      mm.add("(min-width: 761px)", () => {
        const chapters = gsap.utils.toArray(".work-chapter");
        gsap.set(chapters.slice(1), { yPercent: 100 });
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".chapters",
            pin: ".chapter-stage",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.65,
          },
        });
        chapters
          .slice(1)
          .forEach((chapter, i) =>
            timeline
              .to(chapter, { yPercent: 0, ease: "none", duration: 1 }, i)
              .to(
                chapters[i].querySelector(".mockup-image"),
                { scale: 0.88, yPercent: -12, duration: 1, ease: "none" },
                i,
              ),
          );
        gsap.to(".about-portrait img", {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
      cleanupServices = setupServicesMotion(root.current);
      const process = root.current.querySelector(".process-section");
      const processCards = gsap.utils.toArray(".process-card");
      const cardEntranceDuration = 1.6;
      const cardEntranceStagger = 1.1;
      gsap.set(process, { className: "process-section process-section--animated" });
      const processTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: process,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });
      processTimeline
        .fromTo(".process-heading-line > span", { yPercent: 115, rotation: 3 }, {
          yPercent: 0, rotation: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
        }, 0)
        .fromTo(".process-heading-caption > p", { yPercent: 110 }, {
          yPercent: 0, duration: 0.65, ease: "power3.out",
        }, 0.25)
        .to(".process-heading-line > span", {
          yPercent: -120, rotation: -3, stagger: 0.08, duration: 0.6, ease: "power3.inOut",
        }, 1.5)
        .to(".process-heading-caption > p", {
          yPercent: -120, duration: 0.45, ease: "power3.inOut",
        }, 1.55);
      processCards.forEach((card, index) => {
        processTimeline.fromTo(card, {
          y: () => window.innerHeight + card.offsetHeight,
          rotation: [ -14, 10, -10, 14 ][index],
        }, {
          y: [12, -12, 8, -5][index],
          rotation: [-6, 3, -3, 6][index],
          duration: cardEntranceDuration,
          ease: "power2.inOut",
        }, 2.15 + index * cardEntranceStagger);
        // Follow each arrival on narrow screens; the settled deck remains
        // freely swipeable so every full-size card can be read again.
        processTimeline.to(".process-deck", {
          scrollLeft: () => window.innerWidth <= 760
            ? index * (processCards[1].offsetLeft - processCards[0].offsetLeft)
            : 0,
          duration: cardEntranceDuration,
          ease: "power2.inOut",
        }, 2.15 + index * cardEntranceStagger);
      });
      processTimeline.fromTo(".process-swipe-hint", { visibility: "hidden" }, { visibility: "visible", duration: 0 }, 2.15);
      processTimeline.to({}, { duration: 0.8 });
      cleanupFinale = setupFinaleMotion(root.current);

    }, root);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    animationCleanup = () => {
      window.removeEventListener("load", refresh);
      cleanupServices();
      cleanupFinale();
      mm.revert();
      ctx.revert();
      gsap.killTweensOf(".finale-word");
      gsap.set(".finale-word", { clearProps: "transform" });
      splits.forEach(split => split.revert());
    };
    };

    let idleId;
    let timerId;
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(initializeAnimations, { timeout: 800 });
    } else {
      timerId = window.setTimeout(initializeAnimations, 0);
    }

    return () => {
      if (idleId) window.cancelIdleCallback(idleId);
      if (timerId) window.clearTimeout(timerId);
      animationCleanup();
    };
  }, [reduceMotion]);

  function contact(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\nProject details:\n${data.get("project")}`;
    window.location.href = `mailto:aouezgharsafouan@gmail.com?subject=${encodeURIComponent(`Project enquiry from ${data.get("name")}`)}&body=${encodeURIComponent(body)}`;
    setEmailReady(true);
  }
  return (
    <div
      ref={root}
      className={`portfolio ${reduceMotion ? "reduced-motion" : ""}`}
      id="top"
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header quiet={reduceMotion} setQuiet={setQuiet} />
      <main id="main">
        <section className="hero-track" aria-labelledby="hero-title">
          <div className="hero-frame">
            <div className="hero-grid" aria-hidden="true">
              {gridReady && (
                <Suspense fallback={null}>
                  <GridScan />
                </Suspense>
              )}
            </div>
            <div className="hero-caption">
              <span>Safouan Aouezghar</span>
              <span>Ghent, BE — Working worldwide</span>
            </div>
            <h1 id="hero-title">
              <span className="hero-line">
                <span>DESIGN</span>
              </span>
              <span className="hero-line hero-line-front">
                <span>WITH FEELING.</span>
              </span>
            </h1>
            <img
              className="hero-portrait"
              src="/portrait.webp"
              srcSet="/portrait-720.webp 720w, /portrait.webp 1145w"
              sizes="(max-width: 760px) 88vw, 56vw"
              alt="Illustrated portrait of Safouan Aouezghar"
              width="1145"
              height="1209"
              fetchPriority="high"
            />
            <div className="hero-side-note">
              A thoughtful eye.
              <br />A hands-on approach.
            </div>
            <div className="hero-bottom">
              <a href="#work" className="round-link">
                <span className="round-icon">
                  <Arrow down />
                </span>
                Explore the work
              </a>
              <p>
                Distinctive websites & identities.
                <br />
                From the first idea to the final detail.
              </p>
              <a href="#contact" className="text-link">
                Let’s make something <Arrow />
              </a>
            </div>
          </div>
        </section>

        <section className="statement section-pad">
          <div className="section-topline">
            <span>Good design makes you feel something.</span>
            <span>Great design makes it work.</span>
          </div>
          <h2>
            <span className="rise">
              <span>A little instinct.</span>
            </span>
            <span className="statement-middle rise">
              <span>
                A lot of <em>intention.</em>
              </span>
            </span>
          </h2>
          <Mark className="statement-mark" />
          <div className="statement-copy">
            <p>
              I bring visual direction, design and development together to build
              digital experiences with a point of view. Thoughtful in the
              details. Clear in their purpose.
            </p>
            <a className="text-link" href="#about">
              Meet the person behind the pixels <Arrow />
            </a>
          </div>
        </section>

        <section
          className="expansion"
          aria-label="Design detail expanding into a full visual composition"
        >
          <ScrollExpand
            src="/details-bigger-picture.webp"
            alt="Illustrated design workspace with a laptop, colour swatches, stationery and a plant"
            useWindowScroll
            enabled={!reduceMotion}
            startWidth={30}
            startHeight={46}
            startRadius={4}
            mediaZoom={1.1}
            scrollDistance={0.9}
            holdDistance={0.12}
            overlayScrim={1}
            title="The details. The bigger picture."
            scrollHint="Keep scrolling — see it open up."
          >
            <p>From a single idea.</p>
            <h2>
              To a whole
              <br />
              <em>new perspective.</em>
            </h2>
          </ScrollExpand>
        </section>

        <section
          id="work"
          className="work-section"
          aria-labelledby="work-title"
        >
          <div className="work-heading section-pad">
            <h2 id="work-title" className="rise">
              <span>
                Selected <em>works.</em>
              </span>
            </h2>
            <div>
              <span className="work-status">Portfolio in progress</span>
              <p>
                A website concept, brought to life.
                <br />
                More projects to come. Two explorations remain placeholders.
              </p>
            </div>
          </div>
          <div className="chapters">
            <div className="chapter-stage">
              {mockups.map((mockup, i) => (
                <article
                  className={`work-chapter theme-${mockup.theme}`}
                  key={mockup.file}
                >
                  <div className="chapter-top">
                    <span>{mockup.type}</span>
                    {mockup.url ? (
                      <a className="text-link project-link" href={mockup.url} target="_blank" rel="noopener noreferrer">
                        View project <Arrow />
                      </a>
                    ) : <span>Project placeholder</span>}
                  </div>
                  {mockup.url ? (
                    <a className="project-preview-link" href={mockup.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${mockup.name} website`}>
                  <img
                    className={`mockup-image${mockup.image ? " project-image" : ""}`}
                    src={mockup.image || `/mockups/${mockup.file}.svg`}
                    alt={mockup.alt || `${mockup.type}: unbranded concept placeholder, not a completed client project`}
                    loading="lazy"
                    width={mockup.image ? 1672 : 1600}
                    height={mockup.image ? 941 : 1000}
                  />
                    </a>
                  ) : (
                  <img
                    className={`mockup-image${mockup.image ? " project-image" : ""}`}
                    src={mockup.image || `/mockups/${mockup.file}.svg`}
                    alt={mockup.alt || `${mockup.type}: unbranded concept placeholder, not a completed client project`}
                    loading="lazy"
                    width={mockup.image ? 1672 : 1600}
                    height={mockup.image ? 941 : 1000}
                  />
                  )}
                  <div className="chapter-bottom">
                    <h3>{mockup.name}</h3>
                    <p>{mockup.copy}</p>
                    <span className="chapter-count">{String(i + 1).padStart(2, "0")} / {String(mockups.length).padStart(2, "0")}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="about-portrait">
            <div className="portrait-label">
              <span>
                The person
                <br />
                behind the work.
              </span>
              <Mark />
            </div>
            <img
              src="/portrait.webp"
              alt="Safouan, independent designer and developer"
              loading="lazy"
              width="1145"
              height="1209"
            />
            <span className="portrait-signature">Safouan.</span>
          </div>
          <div className="about-editorial">
            <h2 className="rise">
              <span>
                A designer’s eye.
                <br />
                <em>A developer’s mind.</em>
              </span>
            </h2>
            <p className="large-copy">
              I’m Safouan Aouezghar. I create thoughtful digital experiences for
              independent businesses with something to say.
            </p>
            <p>
              Working across visual direction, interface design and frontend
              development lets me protect the central idea from the first sketch
              to the finished website.
            </p>
            <p>
              I care about the atmosphere a website creates. And just as much
              about how naturally it works.
            </p>
            <div className="about-details">
              <span>Based in Ghent, Belgium</span>
              <span>English · Français · العربية</span>
              <span>Working worldwide</span>
            </div>
            <a className="text-link" href="#contact">
              Say hello <Arrow />
            </a>
            <div className="detail-pair">
              <div>
                <span className="service-atom-origin"><Mark /></span>
                <span>Considered by design.</span>
              </div>
              <div>
                <span className="code-art">&lt; / &gt;</span>
                <span>Built with intention.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section" id="services" aria-label="Services">
          <div className="services-stage">
            {serviceBundles.map((bundle) => (
              <article className="service-bundle" key={bundle.number}>
                <h2>{bundle.name}</h2>
                <div className="bundle-details">
                  <p className="bundle-audience">{bundle.audience}</p>
                  <div className="bundle-terms">
                    <p>From <strong>{bundle.price}</strong></p>
                    <span>Typical timeline: {bundle.timeline}</span>
                  </div>
                  <ul>
                    {bundle.features.map(feature => <li key={feature}>{feature}</li>)}
                  </ul>
                  <a className="text-link" href="#contact">{bundle.cta}<Arrow /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="process-section" id="process" aria-labelledby="process-title">
          <div className="process-stage">
            <div className="process-heading">
              <h2 id="process-title" aria-label="From the first “what if.”">
                <span className="process-heading-line"><span>From the first</span></span>
                <span className="process-heading-line"><span><em>“what if.”</em></span></span>
              </h2>
              <div className="process-heading-caption">
                <p>A clear process. Room to explore. And care at every step.</p>
              </div>
            </div>
            <div className="process-deck" role="region" aria-label="The four steps of the process" tabIndex={0}>
              <div className="process-list">
                {processSteps.map((step, index) => (
                  <article className="process-card" key={step.number} style={{ "--card-index": index, "--card-angle": `${[-6, 3, -3, 6][index]}deg` }}>
                    <img src={`/images/process/${step.title.toLowerCase()}-card.png`} alt="" width="1086" height="1448" loading="lazy" />
                    <div className="process-card-copy">
                      <span className="process-card-number">{step.number}</span>
                      <h3>{step.title}</h3>
                      <p>{step.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <p className="process-swipe-hint">Swipe to explore the four steps</p>
          </div>
        </section>

        <div className="finale-sequence">
        <section className="playground section-pad" aria-label="Visual studies">
          <div className="playground-heading">
            <div className="playground-title">
              <h2>Always <em>exploring.</em></h2>
              <span className="atom-home" aria-hidden="true" />
            </div>
            <p>
              A visual playground.
              <br />
              Studies in form, rhythm and possibility.
            </p>
          </div>
          <div className="study-grid">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className={`study study-${i % 6}`}
                aria-hidden="true"
              >
                {i % 3 === 0 ? (
                  <Mark />
                ) : i % 3 === 1 ? (
                  <span>Aa</span>
                ) : (
                  <div className="study-shape" />
                )}
              </div>
            ))}
          </div>
        </section>

        <section
          className="finale"
          aria-label="Made with feeling, built with purpose"
        >
          <div className="finale-left"><span className="finale-word" data-side="left">MADE</span>{" "}<span className="finale-word" data-side="right">WITH</span></div>
          <div className="finale-right">
            <em className="finale-word" data-side="right">FEELING.</em>
          </div>
          <div className="finale-left"><span className="finale-word" data-side="left">BUILT</span>{" "}<span className="finale-word" data-side="right">WITH</span></div>
          <div className="finale-right">
            <em className="finale-word" data-side="right">PURPOSE.</em>
          </div>
          <div className="finale-last"><span className="finale-word" data-side="left">ALWAYS.</span></div>
        </section>

        </div>

        <section className="contact-section section-pad" id="contact">
          <div className="contact-copy">
            <h2>
              Have a good
              <br />
              <em>feeling?</em>
            </h2>
            <p>
              Tell me what you’re imagining.
              <br />
              Let’s find out what we can make together.
            </p>
            <a
              className="contact-email text-link"
              href="mailto:aouezgharsafouan@gmail.com"
            >
              aouezgharsafouan@gmail.com <Arrow />
            </a>
          </div>
          <form className="contact-form" onSubmit={contact}>
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Alex Smith"
              required
            />
            <label htmlFor="email">Your email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="alex@company.com"
              required
            />
            <label htmlFor="project">What do you have in mind?</label>
            <textarea
              id="project"
              name="project"
              rows="3"
              placeholder="The idea, the ambition, the details…"
              required
            />
            <button type="submit" className="send-button">
              Let’s start a conversation <Arrow />
            </button>
            <p className="form-note" role="status">
              {emailReady
                ? "Your draft is ready in your email app. Review it there and send when you’re ready."
                : "Opens your email app with a draft. Nothing is sent automatically."}
            </p>
          </form>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <a href="#top" className="text-link">
            Back to the beginning <Arrow />
          </a>
          <span>
            Independent by choice.
            <br />
            Thoughtful by nature.
          </span>
        </div>
        <a
          className="footer-wordmark"
          href="#top"
          aria-label="Safouan, back to top"
        >
          <span className="footer-letters" aria-hidden="true">SAF<span className="footer-atom-slot"><span className="footer-o">O</span></span>UAN</span>
        </a>
        <div className="footer-bottom">
          <span>© 2026 Safouan Aouezghar</span>
          <nav aria-label="Footer navigation">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <span>Ghent, Belgium</span>
        </div>
      </footer>
      <Mark className="falling-mark" />
    </div>
  );
}
