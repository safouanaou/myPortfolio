import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function setupFinaleMotion(root) {
  const mark = root.querySelector(".falling-mark");
  const home = root.querySelector(".atom-home");
  const finale = root.querySelector(".finale");
  const slot = root.querySelector(".footer-atom-slot");
  const letter = root.querySelector(".footer-o");
  const footer = root.querySelector(".site-footer");
  const words = [...root.querySelectorAll(".finale-word")];
  const studies = [...root.querySelectorAll(".study")];
  const playhead = { scroll: 0 };
  const clamp = gsap.utils.clamp(0, 1);
  const mix = gsap.utils.interpolate;
  const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
  let geometry;
  let lastFrame = "";

  function measure() {
    lastFrame = "";
    const scroll = window.scrollY;
    const origin = home.getBoundingClientRect();
    const destination = slot.getBoundingClientRect();
    const ending = finale.getBoundingClientRect();
    const size = mark.clientWidth;
    const start = origin.top + scroll - window.innerHeight * 0.2;
    const through = ending.bottom + scroll - window.innerHeight * 0.35;
    const end = ScrollTrigger.maxScroll(window);
    const restingBounds = element => {
      const rect = element.getBoundingClientRect();
      const offsetX = Number(gsap.getProperty(element, "x")) || 0;
      return { left: rect.left - offsetX, right: rect.right - offsetX,
        top: rect.top + scroll, bottom: rect.bottom + scroll };
    };
    const rows = new Map();
    studies.forEach(study => {
      const rect = restingBounds(study);
      // The layout determines the side, never the atom's moving position.
      const side = (rect.left + rect.right) / 2 <= window.innerWidth / 2 ? "left" : "right";
      const key = `${study.offsetTop}:${side}`;
      const row = rows.get(key) || { side, items: [], rect: { ...rect } };
      row.items.push(study);
      row.rect.left = Math.min(row.rect.left, rect.left);
      row.rect.right = Math.max(row.rect.right, rect.right);
      rows.set(key, row);
    });
    geometry = {
      rows: [...rows.values()],
      words: words.map(element => ({ element, side: element.dataset.side, rect: restingBounds(element) })),
      start, through, end, size,
      homeX: origin.left + origin.width / 2,
      homeY: origin.top + scroll + origin.height / 2,
      targetX: destination.left + destination.width / 2,
      targetY: destination.top + scroll + destination.height * 0.51,
      targetSize: destination.width / 0.9,
      footerTop: footer.getBoundingClientRect().top + scroll,
      paper: getComputedStyle(footer).color,
    };
  }

  function clearPath(x, y, size) {
    const radius = size * 0.46;
    const clearance = 8;
    // Open over a generous approach distance, hold the narrow corridor while
    // the atom passes, then ease closed over the same distance in either direction.
    const transitionDistance = Math.max(180, window.innerHeight * 0.28);
    const displacement = (rect, side) => {
      const worldY = y + window.scrollY;
      const dy = Math.max(rect.top - worldY, worldY - rect.bottom, 0);
      const reach = radius + clearance;
      const opening = smooth((reach + transitionDistance - dy) / transitionDistance);
      const shift = side === "left"
        ? Math.min(0, x - reach - rect.right)
        : Math.max(0, x + reach - rect.left);
      return shift * opening;
    };
    geometry.words.forEach(({ element, rect, side }) => {
      gsap.set(element, { x: displacement(rect, side) });
    });
    // Cached row geometry avoids repeated layout reads during animation.
    geometry.rows.forEach(({ items, rect, side }) => {
      gsap.set(items, { x: displacement(rect, side) });
    });
  }

  function render() {
    if (!geometry) return;
    const frame = `${playhead.scroll}:${window.scrollY}`;
    if (frame === lastFrame) return;
    lastFrame = frame;
    const g = geometry;
    const scroll = playhead.scroll;
    const progress = clamp((scroll - g.start) / (g.through - g.start));
    const footerProgress = clamp((scroll - g.through) / Math.max(1, g.end - g.through));
    const landing = smooth(footerProgress);
    const travel = smooth(progress / 0.4);
    const center = window.innerWidth / 2;
    const size = mix(g.size * (0.85 + 0.15 * progress), g.targetSize, landing);
    const x = mix(mix(g.homeX, center, travel), g.targetX, landing);
    const throughY = g.through + window.innerHeight * 0.4 + g.size / 2;
    const worldY = scroll < g.start ? g.homeY : scroll <= g.through
      ? scroll + mix(g.homeY - g.start, window.innerHeight * 0.4 + g.size / 2, progress)
      : mix(throughY, g.targetY, footerProgress);
    const y = worldY - window.scrollY;
    const colorProgress = smooth((worldY - (g.footerTop - size / 2)) / size);
    gsap.set(mark, {
      visibility: "visible",
      x: x - g.size / 2, y: y - g.size / 2,
      scale: size / g.size,
      rotation: mix(-70 + progress * 190, 180, landing),
      color: mix("#2544eb", g.paper, colorProgress),
    });
    gsap.set(letter, { opacity: 1 - smooth((landing - 0.65) / 0.35) });
    clearPath(x, y, size);
  }

  measure();
  const motion = gsap.to(playhead, {
    scroll: () => ScrollTrigger.maxScroll(window), ease: "none",
    scrollTrigger: {
      start: 0, end: "max", scrub: 0.45, invalidateOnRefresh: true,
      onRefresh: measure,
    },
  });
  gsap.ticker.add(render);
  render();
  return () => {
    gsap.ticker.remove(render);
    motion.scrollTrigger.kill();
    motion.kill();
    gsap.set([...words, ...studies, mark, letter], { clearProps: "transform,opacity,visibility,color" });
  };
}
