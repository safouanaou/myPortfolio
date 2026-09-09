import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// One smoothed scroll playhead drives both the atom and every reveal.
export function setupServicesMotion(root) {
  const section = root.querySelector(".services-section");
  const stage = section.querySelector(".services-stage");
  const origin = root.querySelector(".service-atom-origin");
  const atom = origin.querySelector("svg");
  const panels = [...section.querySelectorAll(".service-bundle")];
  const titles = panels.map(panel => panel.querySelector("h2"));
  const details = panels.map(panel => [...panel.querySelectorAll(".bundle-details > *")] );
  const clamp = gsap.utils.clamp(0, 1);
  const mix = gsap.utils.interpolate;
  let geometry;
  let lastFrame = "";
  const playhead = { scroll: window.scrollY };
  section.classList.add("services-animated");
  origin.parentElement.classList.add("atom-departure");

  function measure() {
    lastFrame = "";
    const home = origin.getBoundingClientRect();
    const bounds = section.getBoundingClientRect();
    const panel = panels[0].getBoundingClientRect();
    const top = bounds.top + window.scrollY;
    geometry = {
      top,
      start: Math.min(top - stage.clientHeight * 0.25, home.top + window.scrollY + home.height / 2 - stage.clientHeight * 0.35),
      homeTop: home.top + window.scrollY + home.height / 2,
      distance: section.offsetHeight - stage.clientHeight,
      width: panel.width,
      left: panel.left,
      titleY: panels[0].offsetTop + titles[0].offsetTop + parseFloat(getComputedStyle(titles[0]).lineHeight) / 2,
      size: Math.min(120, window.innerWidth * 0.16),
    };
  }

  function render() {
    if (!geometry) return;
    const frameKey = `${playhead.scroll}:${window.scrollY}`;
    if (frameKey === lastFrame) return;
    lastFrame = frameKey;
    const { top, start, distance, width, left, size } = geometry;
    const scroll = playhead.scroll;
    const home = origin.getBoundingClientRect();
    const frame = stage.getBoundingClientRect();
    const descent = clamp((scroll - start) / (top - start));
    const progress = clamp((scroll - top) / distance) * panels.length;
    const index = Math.min(panels.length - 1, Math.floor(progress));
    const phase = progress - index;
    // Arrive at the exact stage center; unfold the first title from that point.
    const reveal = clamp(phase / 0.25);
    const erase = index === panels.length - 1 ? 0 : clamp((phase - 0.76) / 0.24);
    const initialX = index === 0 ? window.innerWidth / 2 : left;
    const edge = mix(mix(initialX, left + width, reveal), left, erase);
    const titleCenter = frame.top + geometry.titleY;
    const targetY = titleCenter;
    const homeX = home.left + home.width / 2;
    const homeY = home.top + home.height / 2;
    const x = scroll < top ? mix(homeX, window.innerWidth / 2, descent) : edge;
    // Interpolate in viewport space so the atom visibly descends as the page rises.
    const y = scroll < top ? mix(geometry.homeTop - start, geometry.titleY, descent) : targetY;
    gsap.set(atom, {
      x: scroll <= start ? 0 : x - homeX,
      y: scroll <= start ? 0 : y - homeY,
      scale: mix(1, size / home.width, descent),
      rotation: descent * 180 + progress * 120,
      color: scroll <= start ? "#f1f0e9" : "#b8caef",
    });
    panels.forEach((panel, i) => {
      const active = scroll >= top && i === index;
      panel.inert = !active || phase < 0.5 || erase > 0;
      panel.setAttribute("aria-hidden", String(!active));
      gsap.set(panel, { visibility: active ? "visible" : "hidden" });
      const opening = i === 0 ? (window.innerWidth / 2 - left) * (1 - reveal) : 0;
      gsap.set(titles[i], {
        x: opening,
        clipPath: reveal === 1 && erase === 0 ? "none" : `inset(0 ${100 * (1 - reveal * (1 - erase))}% 0 0)`,
      });
      details[i].forEach((item, j) => {
        const amount = clamp((phase - 0.27 - j * 0.045) / 0.14);
        gsap.set(item, {
          opacity: amount * (1 - erase),
          y: 18 * (1 - amount),
          clipPath: `inset(0 ${erase * 100}% 0 0)`,
        });
      });
    });
  }
  measure();
  const motion = gsap.to(playhead, {
    scroll: () => ScrollTrigger.maxScroll(window),
    ease: "none",
    scrollTrigger: {
      start: 0, end: "max", scrub: 0.4, invalidateOnRefresh: true,
      onRefresh: () => { measure(); render(); },
    },
  });
  // Compensate for the origin's viewport movement on the same animation frame.
  gsap.ticker.add(render);
  render();
  return () => {
    gsap.ticker.remove(render);
    motion.scrollTrigger.kill();
    motion.kill();
    gsap.set(atom, { clearProps: "transform,color" });
    gsap.set(panels, { clearProps: "visibility" });
    gsap.set([...titles, ...details.flat()], { clearProps: "transform,clipPath,opacity" });
    section.classList.remove("services-animated");
    origin.parentElement.classList.remove("atom-departure");
    panels.forEach(panel => { panel.inert = false; panel.removeAttribute("aria-hidden"); });
  };
}
