// Frame-rate-independent motion with a hard velocity ceiling and no overshoot.
export function advanceScroll(position, target, velocity, seconds, maxSpeed) {
  const dt = Math.min(seconds, 0.05);
  const distance = target - position;
  const desired = Math.max(-maxSpeed, Math.min(maxSpeed, distance * 7));
  const nextVelocity = velocity + (desired - velocity) * (1 - Math.exp(-dt / 0.09));
  const step = nextVelocity * dt;
  if (Math.abs(step) >= Math.abs(distance) && Math.sign(step) === Math.sign(distance)) {
    return { position: target, velocity: 0 };
  }
  return { position: position + step, velocity: nextVelocity };
}

export function setupSmoothScroll() {
  let position = window.scrollY;
  let target = window.scrollY;
  let velocity = 0;
  let frame = 0;
  let lastTime = 0;
  let expectedY = window.scrollY;
  const limit = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const clamp = value => Math.max(0, Math.min(limit(), value));

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    velocity = 0;
    target = window.scrollY;
    position = window.scrollY;
    expectedY = window.scrollY;
  }

  function tick(time) {
    const seconds = Math.max(0, (time - lastTime) / 1000);
    lastTime = time;
    target = clamp(target);
    const next = advanceScroll(position, target, velocity, seconds,
      Math.min(900, window.innerHeight * 1.1));
    velocity = next.velocity;
    position = clamp(next.position);
    expectedY = position;
    window.scrollTo({ top: expectedY, behavior: "instant" });
    // Use the browser's actual subpixel position for external-scroll detection.
    expectedY = window.scrollY;
    if (Math.abs(target - expectedY) < 0.75 && Math.abs(velocity) < 6) {
      stop();
      return;
    }
    frame = requestAnimationFrame(tick);
  }

  function onWheel(event) {
    if (!event.cancelable || event.ctrlKey || event.metaKey || event.shiftKey ||
      Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
    const delta = event.deltaY * unit * 0.7;
    if (canScrollInside(event, delta)) { stop(); return; }
    event.preventDefault();
    enqueue(delta);
  }

  function canScrollInside(event, delta) {
    return event.composedPath().some(element => {
      if (!(element instanceof HTMLElement) || element === document.body ||
        element === document.documentElement) return false;
      return element.scrollHeight > element.clientHeight &&
        /auto|scroll/.test(getComputedStyle(element).overflowY) &&
        (delta < 0 ? element.scrollTop > 0 :
          element.scrollTop + element.clientHeight < element.scrollHeight - 1);
    });
  }

  function enqueue(delta) {
    if (!frame) target = window.scrollY;
    if (Math.sign(delta) !== Math.sign(target - window.scrollY)) {
      target = window.scrollY;
      velocity = 0;
    }
    // Prevent a burst of wheel events from building a long, laggy scroll queue.
    const queue = Math.min(450, window.innerHeight * 0.5);
    target = clamp(Math.max(window.scrollY - queue,
      Math.min(window.scrollY + queue, target + delta)));
    if (!frame) {
      position = window.scrollY;
      lastTime = performance.now();
      frame = requestAnimationFrame(tick);
    }
  }

  let touch = null;
  function onTouchStart(event) {
    stop();
    const point = event.touches[0];
    touch = event.touches.length === 1 &&
      !event.target.closest("input, textarea, select, [contenteditable]")
      ? { x: point.clientX, y: point.clientY, axis: null } : null;
  }
  function onTouchMove(event) {
    if (!touch || event.touches.length !== 1 || !event.cancelable) {
      touch = null;
      stop();
      return;
    }
    const point = event.touches[0];
    const dx = touch.x - point.clientX;
    const dy = touch.y - point.clientY;
    if (!touch.axis && Math.max(Math.abs(dx), Math.abs(dy)) < 5) return;
    touch.axis ||= Math.abs(dy) > Math.abs(dx) ? "y" : "x";
    if (touch.axis === "x" || canScrollInside(event, dy)) {
      touch = null;
      stop();
      return;
    }
    event.preventDefault();
    touch.x = point.clientX;
    touch.y = point.clientY;
    enqueue(dy * 0.7);
  }
  function onTouchEnd() { touch = null; }
  function onTouchCancel() { touch = null; stop(); }

  function onNativeScroll() {
    if (frame && Math.abs(window.scrollY - expectedY) > 1) stop();
  }
  function onKey(event) {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) stop();
  }
  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("scroll", onNativeScroll, { passive: true });
  window.addEventListener("keydown", onKey);
  window.addEventListener("pointerdown", stop, { passive: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: false });
  window.addEventListener("touchend", onTouchEnd, { passive: true });
  window.addEventListener("touchcancel", onTouchCancel, { passive: true });
  return () => {
    stop();
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("scroll", onNativeScroll);
    window.removeEventListener("keydown", onKey);
    window.removeEventListener("pointerdown", stop);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("touchcancel", onTouchCancel);
  };
}
