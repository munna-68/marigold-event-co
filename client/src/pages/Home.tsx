import { withBase } from "@/lib/withBase";
/** Harbor Blueprint style: an asymmetrical dark editorial hero with precise operational signals. */
import { ArrowRight, CalendarDays, Check, MapPin, PackageCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { inventory } from "@/lib/catalog";

const categoryCards = [
  { label: "Tents", detail: "Cover, light, and a little room to breathe.", image: withBase("/images/marigold-hero_0f3301e5.jpg"), href: "/browse?category=Tents" },
  { label: "Tables + Chairs", detail: "The pieces that hold the whole table together.", image: withBase("/images/marigold-table-setting_660fd7a9.jpg"), href: "/browse?category=Tables%20%26%20Chairs" },
  { label: "Play + Extras", detail: "The memorable parts, thoughtfully handled.", image: withBase("/images/marigold-bounce-house_c762631c.jpg"), href: "/browse?category=Inflatables" }
];

export default function Home() {
  const spotlights = inventory.filter((item) => item.featured).slice(0, 4);
  return (
    <div className="app-shell home-page">
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="hero__image" aria-hidden="true" />
          <div className="hero__wash" aria-hidden="true" />
          <div className="hero__content">
            <p className="eyebrow eyebrow--gold"><span className="eyebrow-dot" /> EVENT RENTALS · LINDEN METRO</p>
            <h1>A better event starts with the pieces that make it run.</h1>
            <p className="hero__lede">Find the tent, table, bounce house, or finishing detail. Check its date. Build a quote that understands the whole plan.</p>
            <div className="hero__actions">
              <Link href="/browse" className="button button--gold">Browse what’s available <ArrowRight size={18} /></Link>
              <Link href="/about" className="text-action">How the booking works <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div className="hero__availability-card">
            <div className="availability-stamp"><span>01</span><p>One practical<br />starting point</p></div>
            <div><p className="card-label">LIVE INVENTORY</p><p className="availability-title">Every item has<br />its own calendar.</p></div>
            <Link href="/browse" className="round-arrow" aria-label="See availability"><ArrowRight size={18} /></Link>
          </div>
          <div className="hero__scroll-note"><span /> Scroll to plan with more certainty</div>
        </section>

        <section className="service-strip">
          <div><CalendarDays size={19} /><span><b>Item-level availability</b> See what actually works for your date.</span></div>
          <div><MapPin size={19} /><span><b>Delivery that adds up clearly</b> Get a ZIP-based estimate before you ask.</span></div>
          <div><PackageCheck size={19} /><span><b>Deposits spelled out</b> Kept separate and returned after a good return.</span></div>
        </section>

        <section className="section section--categories">
          <div className="section-heading section-heading--split">
            <div><p className="eyebrow">THE BUILDING BLOCKS</p><h2>Start with the moment<br />you’re making room for.</h2></div>
            <p>Quiet dinner, active birthday, open-air reception—choose a direction, then build it piece by piece.</p>
          </div>
          <div className="category-rail">
            {categoryCards.map((card, index) => <Link href={card.href} className="category-card" key={card.label}>
              <img src={card.image} alt="" />
              <div className="category-card__shade" />
              <div className="category-card__content"><span>0{index + 1}</span><h3>{card.label}</h3><p>{card.detail}</p><i><ArrowRight size={18} /></i></div>
            </Link>)}
          </div>
        </section>

        <section className="section section--spotlight">
          <div className="spotlight-intro">
            <p className="eyebrow eyebrow--gold">A FEW GOOD PIECES</p>
            <h2>Make a strong plan.<br /><em>Then let it get easy.</em></h2>
            <p>Most events need more than one thing. Keep the details in one live quote as you go.</p>
            <Link href="/browse" className="button button--outline-light">Explore the full inventory <ArrowRight size={18} /></Link>
          </div>
          <div className="spotlight-list">
            {spotlights.map((item, index) => <Link href={`/rentals/${item.id}`} className="spotlight-row" key={item.id}>
              <span className="spotlight-row__number">0{index + 1}</span><img src={item.image} alt="" /><div><p>{item.category}</p><h3>{item.name}</h3></div><span className="spotlight-row__price">from ${item.price}<ArrowRight size={17} /></span>
            </Link>)}
          </div>
        </section>

        <section className="process-band">
          <div className="process-band__title"><p className="eyebrow">THE MARIGOLD WAY</p><h2>Clear enough to decide.<br />Flexible enough to host.</h2></div>
          <div className="process-steps">
            <article><span>01</span><h3>Choose a date</h3><p>Look at the calendar on the exact item you want. No generic “maybe” availability.</p></article>
            <article><span>02</span><h3>Build your quote</h3><p>Bring every item, its refundable deposit, and estimated delivery into one running plan.</p></article>
            <article><span>03</span><h3>Send the request</h3><p>Review every detail before it reaches our event line. We’ll follow up with the final confirmation.</p></article>
          </div>
        </section>

        <section className="closing-cta">
          <div><p className="eyebrow eyebrow--gold"><Sparkles size={14} /> MAKE THE NEXT STEP SMALL</p><h2>Your event is already taking shape.</h2><p>Start a working quote in a few minutes. We will keep the logistics visible from the first item to the final request.</p></div>
          <Link href="/browse" className="button button--gold">Start with inventory <ArrowRight size={18} /></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
