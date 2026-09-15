import { withBase } from "@/lib/withBase";
/** Harbor Blueprint style: operational navy rail, sparse gold signals, and left-aligned editorial hierarchy. */
import { Link, useLocation } from "wouter";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useRental } from "@/contexts/RentalContext";

const navItems = [
  { href: "/plan", label: "Plan an event" },
  { href: "/browse", label: "Inventory" },
  { href: "/about", label: "How it works" },
  { href: "/about#contact", label: "Contact" }
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { itemCount } = useRental();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand" aria-label="Marigold Event Co. home">
          <img src={withBase("/images/marigold-mark_a8e48b51.png")} alt="" className="brand__mark" />
          <span className="brand__type"><strong>Marigold<span className="brand__signal" aria-hidden="true" /></strong><small>Event Co.</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => <Link key={item.href} href={item.href} className={location === item.href.split("#")[0] ? "nav-link nav-link--active" : "nav-link"}>{item.label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link href="/quote" className="quote-chip" aria-label={`Your quote has ${itemCount} items`}>
            <ShoppingBag size={17} strokeWidth={1.8} />
            <span>Quote</span>
            <b>{itemCount}</b>
          </Link>
          <button className="mobile-menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        <Link href="/quote" onClick={() => setOpen(false)}>Your quote · {itemCount} items</Link>
      </nav>}
    </header>
  );
}
