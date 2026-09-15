import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Client-side navigation keeps the previous scroll offset, which drops a
 * visitor into the middle of a new page. Reset to the top on route change and
 * leave in-page anchors alone.
 */
export default function ScrollReset() {
  const [location] = useLocation();

  useEffect(() => {
    if (window.location.hash) return;
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previous;
  }, [location]);

  return null;
}
