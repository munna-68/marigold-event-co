import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Client-side navigation keeps the previous scroll offset, which drops a
 * visitor into the middle of a new page. `history.pushState` also skips the
 * browser's own fragment scrolling, so a "#contact" link would land at the top
 * instead of the section it names. Both cases are handled here.
 */
export default function ScrollReset() {
  const [location] = useLocation();

  useEffect(() => {
    const syncScroll = () => {
      const hash = window.location.hash;
      if (hash.length > 1) {
        const target = document.getElementById(hash.slice(1));
        if (target) {
          const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
          return;
        }
      }
      const root = document.documentElement;
      const previous = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      root.style.scrollBehavior = previous;
    };

    syncScroll();
    window.addEventListener("hashchange", syncScroll);
    return () => window.removeEventListener("hashchange", syncScroll);
  }, [location]);

  return null;
}
