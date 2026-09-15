/**
 * Harbor Blueprint motion system.
 *
 * One IntersectionObserver settles every reveal and count-up, one
 * rAF-throttled scroll listener writes scroll state onto <html>, and one
 * MutationObserver re-registers elements after route changes and list
 * re-renders. Nothing here touches React state, so no frame costs a render.
 *
 * Reveal state lives in a data attribute rather than a class. React rewrites
 * className whenever a component's class string changes, which silently wipes
 * classes added imperatively; attributes React never renders are left alone.
 *
 * Elements carrying data-parallax must not also receive a React `style` prop,
 * because the parallax pass writes onto the element's style attribute.
 */

const REVEAL = "data-reveal";
const PARALLAX = "data-parallax";
const COUNT = "data-count-to";
const STATE = "data-reveal-state";
const MOTION = "data-motion";
const SCROLLED_CLASS = "has-scrolled";
const SCROLL_STATE_CLASS = "scrolled";

const TRACKED = `[${REVEAL}], [${COUNT}]`;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function inViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

export function startMotion(): () => void {
  const root = document.documentElement;
  root.setAttribute(MOTION, "on");

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reduced = motionPreference.matches;

  let parallaxTargets: HTMLElement[] = [];
  let scrollFrame = 0;
  let scrollQueued = false;

  const countFrames = new WeakMap<HTMLElement, number>();
  const countedValues = new WeakMap<HTMLElement, string>();

  const writeCount = (element: HTMLElement, value: number) => {
    const prefix = element.getAttribute("data-count-prefix") ?? "";
    const suffix = element.getAttribute("data-count-suffix") ?? "";
    element.textContent = `${prefix}${Math.round(value)}${suffix}`;
  };

  const runCount = (element: HTMLElement) => {
    const raw = element.getAttribute(COUNT);
    if (raw === null) return;
    const target = Number(raw);
    if (!Number.isFinite(target)) return;
    if (countedValues.get(element) === raw) return;
    countedValues.set(element, raw);

    const pending = countFrames.get(element);
    if (pending) cancelAnimationFrame(pending);

    const duration = Number(element.getAttribute("data-count-duration") ?? 900);
    if (reduced || !Number.isFinite(duration) || duration <= 0) {
      writeCount(element, target);
      return;
    }

    const started = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / duration);
      writeCount(element, target * easeOutCubic(progress));
      countFrames.set(element, progress < 1 ? requestAnimationFrame(tick) : 0);
    };
    countFrames.set(element, requestAnimationFrame(tick));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        if (element.hasAttribute(REVEAL)) element.setAttribute(STATE, "in");
        if (element.hasAttribute(COUNT)) runCount(element);
        observer.unobserve(element);
      }
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.1 },
  );

  const register = (scope: ParentNode) => {
    scope.querySelectorAll<HTMLElement>(TRACKED).forEach((element) => {
      if (element.getAttribute(STATE) === "in") return;
      observer.observe(element);
    });
  };

  const refreshParallax = () => {
    parallaxTargets = reduced
      ? []
      : Array.from(document.querySelectorAll<HTMLElement>(`[${PARALLAX}]`));
  };

  const paintParallax = () => {
    const viewportHeight = window.innerHeight;
    for (const element of parallaxTargets) {
      const speed = Number(element.getAttribute(PARALLAX) ?? "0.12");
      if (!Number.isFinite(speed) || speed === 0) continue;
      const rect = element.getBoundingClientRect();
      if (rect.bottom < -240 || rect.top > viewportHeight + 240) continue;
      const distance = rect.top + rect.height / 2 - viewportHeight / 2;
      /* Clamped to the headroom the element's own scale provides, so a
         parallaxed image can never expose an edge inside its clipping box. */
      const headroom = rect.height * 0.05;
      const offset = Math.max(-headroom, Math.min(headroom, -distance * speed));
      element.style.setProperty("--parallax", `${offset.toFixed(2)}px`);
    }
  };

  const paintScroll = () => {
    scrollQueued = false;
    const scrollable = root.scrollHeight - window.innerHeight;
    const offset = window.scrollY;
    const progress = scrollable > 0 ? Math.min(1, Math.max(0, offset / scrollable)) : 0;
    root.style.setProperty("--scroll-y", offset.toFixed(0));
    root.style.setProperty("--scroll-progress", progress.toFixed(4));
    root.classList.toggle(SCROLLED_CLASS, offset > 24);
    root.classList.toggle(SCROLL_STATE_CLASS, offset > 24);
    if (!reduced) paintParallax();
  };

  const onScroll = () => {
    if (scrollQueued) return;
    scrollQueued = true;
    scrollFrame = requestAnimationFrame(paintScroll);
  };

  const onResize = () => {
    refreshParallax();
    onScroll();
  };

  const releaseSubtree = (node: Node) => {
    if (!(node instanceof Element)) return;
    observer.unobserve(node);
    node.querySelectorAll(TRACKED).forEach((child) => observer.unobserve(child));
  };

  const mutations = new MutationObserver((records) => {
    let structureChanged = false;

    for (const record of records) {
      if (record.type === "childList") {
        Array.from(record.removedNodes).forEach(releaseSubtree);
        if (Array.from(record.addedNodes).some((node) => node instanceof Element)) {
          structureChanged = true;
        }
      } else if (record.attributeName === COUNT && record.target instanceof HTMLElement) {
        const element = record.target;
        countedValues.delete(element);
        if (element.getAttribute(STATE) === "in" && inViewport(element)) runCount(element);
      }
    }

    if (!structureChanged) return;
    register(document);
    refreshParallax();
  });

  const onPreferenceChange = (event: MediaQueryListEvent) => {
    reduced = event.matches;
    refreshParallax();
    if (reduced) {
      for (const element of Array.from(document.querySelectorAll<HTMLElement>(`[${PARALLAX}]`))) {
        element.style.removeProperty("--parallax");
      }
    }
    register(document);
    onScroll();
  };

  register(document);
  refreshParallax();
  paintScroll();

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  motionPreference.addEventListener("change", onPreferenceChange);
  mutations.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: [COUNT],
  });

  return () => {
    observer.disconnect();
    mutations.disconnect();
    motionPreference.removeEventListener("change", onPreferenceChange);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    if (scrollFrame) cancelAnimationFrame(scrollFrame);
    root.removeAttribute(MOTION);
    root.classList.remove(SCROLLED_CLASS, SCROLL_STATE_CLASS);
    root.style.removeProperty("--scroll-y");
    root.style.removeProperty("--scroll-progress");
  };
}
