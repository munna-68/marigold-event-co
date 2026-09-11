/** Harbor Blueprint style: disciplined service footer with route-line details and clear next steps. */
import { Link } from "wouter";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-route" aria-hidden="true"><span /></div>
      <div className="footer-grid">
        <div>
          <p className="eyebrow eyebrow--gold">MARIGOLD EVENT CO.</p>
          <h2>Good gatherings,<br />well supplied.</h2>
          <p className="footer-lede">Tents, tables, celebration details, and a booking process that makes planning feel lighter.</p>
        </div>
        <div className="footer-info">
          <div><p className="footer-label">Service area</p><p><MapPin size={15} /> Greater Linden metro · within 50 mi</p></div>
          <div><p className="footer-label">Event line</p><p><Phone size={15} /> (555) 014-2290</p></div>
        </div>
        <div className="footer-links">
          <Link href="/browse">Browse inventory <ArrowUpRight size={14} /></Link>
          <Link href="/quote">Build a quote <ArrowUpRight size={14} /></Link>
          <Link href="/about#contact">Ask a question <ArrowUpRight size={14} /></Link>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 Marigold Event Co. · Portfolio demonstration</span><span>Clear terms. Considered events.</span></div>
    </footer>
  );
}
