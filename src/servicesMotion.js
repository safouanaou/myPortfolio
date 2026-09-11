import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// The fixed atom and reveals share the actual, already-smoothed page scroll.
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
      homeLeft: home.left + home.width / 2,
      homeWidth: Math.min(home.width, home.height),
      stageHeight: stage.clientHeight,
      titleYs: titles.map(title => {
        const rect = title.getBoundingClientRect();
        return rect.top - stage.getBoundingClientRect().top + rect.height / 2;
      }),
      homeTop: home.top + window.scrollY + home.height / 2,
      distance: section.offsetHeight - stage.clientHeight,
      width: panel.width,
      left: panel.left,
      size: Math.min(120, window.innerWidth * 0.16),
    };
    gsap.set(atom, { position: "fixed", left: 0, top: 0, width: geometry.homeWidth, height: geometry.homeWidth, zIndex: 8, pointerEvents: "none", willChange: "transform" });
  }

  function render() {
    if (!geometry) return;
    const offscreen = window.scrollY < geometry.homeTop - geometry.stageHeight ||
      window.scrollY > geometry.top + geometry.distance + geometry.stageHeight;
    const frameKey = offscreen ? "offscreen" : `${window.scrollY}`;
    if (frameKey === lastFrame) return;
    lastFrame = frameKey;
    gsap.set(atom, { visibility: offscreen ? "hidden" : "visible" });
    if (offscreen) return;
    const { top, start, distance, width, left, size } = geometry;
    const scroll = window.scrollY;
    const descent = clamp((scroll - start) / (top - start));
    const progress = clamp((scroll - top) / distance) * panels.length;
    const index = Math.min(panels.length - 1, Math.floor(progress));
    const phase = progress - index;
    // Arrive at the exact stage center; unfold the first title from that point.
    const reveal = clamp(phase / 0.25);
    const erase = index === panels.length - 1 ? 0 : clamp((phase - 0.76) / 0.24);
    const initialX = index === 0 ? window.innerWidth / 2 : left;
    const edge = mix(mix(initialX, left + width, reveal), left, erase);
    const stageTop = Math.max(top - scroll, Math.min(0, top + distance - scroll));
    const titleCenter = stageTop + geometry.titleYs[index];
    const targetY = titleCenter;
    const homeX = geometry.homeLeft;
    const homeY = geometry.homeTop - scroll;
    const x = scroll < top ? mix(homeX, window.innerWidth / 2, descent) : edge;
    // Interpolate in viewport space so the atom visibly descends as the page rises.
    const y = scroll < top ? mix(homeY, stageTop + geometry.titleYs[0], descent) : targetY;
    gsap.set(atom, {
      x: (scroll <= start ? homeX : x) - geometry.homeWidth / 2,
      y: (scroll <= start ? homeY : y) - geometry.homeWidth / 2,
      scale: mix(1, size / geometry.homeWidth, descent),
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
  const refresh = () => { measure(); render(); };
  ScrollTrigger.addEventListener("refresh", refresh);
  gsap.ticker.add(render);
  render();
  return () => {
    gsap.ticker.remove(render);
    ScrollTrigger.removeEventListener("refresh", refresh);
    gsap.set(atom, { clearProps: "transform,color,position,left,top,width,height,zIndex,pointerEvents,willChange,visibility" });
    gsap.set(panels, { clearProps: "visibility" });
    gsap.set([...titles, ...details.flat()], { clearProps: "transform,clipPath,opacity" });
    section.classList.remove("services-animated");
    origin.parentElement.classList.remove("atom-departure");
    panels.forEach(panel => { panel.inert = false; panel.removeAttribute("aria-hidden"); });
  };
}
