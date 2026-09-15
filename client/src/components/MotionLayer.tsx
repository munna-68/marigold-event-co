import { useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { startMotion } from "@/lib/motion";

/**
 * Mounts the single motion system and the chrome it drives. Holds no state:
 * the rail and the back-to-top control are shown by `has-scrolled` on <html>,
 * which the rAF scroll listener writes.
 */
export default function MotionLayer() {
  useEffect(() => startMotion(), []);

  return (
    <>
      <div className="scroll-rail" aria-hidden="true"><span /></div>
      <button type="button" className="to-top" onClick={() => window.scrollTo(0, 0)} aria-label="Back to top">
        <ArrowUp size={16} />
        <span>Top</span>
      </button>
    </>
  );
}
