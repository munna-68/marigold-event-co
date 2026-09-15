import { withBase } from "@/lib/withBase";
/** Harbor Blueprint style: an asymmetrical dark editorial hero with precise operational signals. */
import { ArrowRight, CalendarDays, MapPin, PackageCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Fragment, type CSSProperties } from "react";
import { Link } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { inventory } from "@/lib/catalog";

const categoryCards = [
  { label: "Tents", detail: "Cover, light, and a little room to breathe.", image: withBase("/images/marigold-hero_0f3301e5.jpg"), href: "/browse?category=Tents" },
  { label: "Tables + Chairs", detail: "The pieces that hold the whole table together.", image: withBase("/images/marigold-table-setting_660fd7a9.jpg"), href: "/browse?category=Tables%20%26%20Chairs" },
  { label: "Play + Extras", detail: "The memorable parts, thoughtfully handled.", image: withBase("/images/marigold-bounce-house_c762631c.jpg"), href: "/browse?category=Inflatables" }
];

const heroHeadline = "A better event starts with the pieces that make it run.".split(" ");

/** Operational standards only. No press logos or testimonials are invented for this demo. */
const marqueeItems = [
  { icon: <CalendarDays size={14} />, label: "Item-level availability", detail: "every date checked per piece" },
  { icon: <Truck size={14} />, label: "Delivery within 50 mi", detail: "ZIP estimate before you ask" },
  { icon: <ShieldCheck size={14} />, label: "Refundable deposits", detail: "returned within 3 business days" },
  { icon: <PackageCheck size={14} />, label: "120 bistro chairs", detail: "80 crossback chairs in stock" },
  { icon: <MapPin size={14} />, label: "Greater Linden metro", detail: "one event line, one handoff" }
];

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export default function Home() {
  const spotlights = inventory.filter((item) => item.featured).slice(0, 4);
  return (
    <div className="app-shell home-page">
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="hero__image" aria-hidden="true" data-parallax="0.16" />
          <div className="hero__wash" aria-hidden="true" />
          <div className="hero__content">
            <p className="eyebrow eyebrow--gold" data-reveal="up" style={delay(0)}><span className="eyebrow-dot" /> EVENT RENTALS · LINDEN METRO</p>
            <h1>
              {heroHeadline.map((word, index) => (
                <Fragment key={`${word}-${index}`}>
                  {index > 0 ? " " : null}
                  <span className="hero__word" data-reveal="up" style={delay(110 + index * 55)}>{word}</span>
                </Fragment>
              ))}
            </h1>
            <p className="hero__lede" data-reveal="up" style={delay(520)}>Find the tent, table, bounce house, or finishing detail. Check its date. Build a quote that understands the whole plan.</p>
            <div className="hero__actions" data-reveal="up" style={delay(620)}>
              <Link href="/browse" className="button button--gold">Browse what’s available <ArrowRight size={18} /></Link>
              <Link href="/about" className="text-action">How the booking works <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div className="hero__availability-card" data-reveal="left" style={delay(700)}>
            <div className="availability-stamp"><span>01</span><p>One practical<br />starting point</p></div>
            <div><p className="card-label">LIVE INVENTORY</p><p className="availability-title">Every item has<br />its own calendar.</p></div>
            <Link href="/browse" className="round-arrow" aria-label="See availability"><ArrowRight size={18} /></Link>
          </div>
          <div className="hero__scroll-note"><span /> Scroll to plan with more certainty</div>
        </section>

        <section className="service-strip">
          <div data-reveal="up" style={delay(0)}><CalendarDays size={19} /><span><b>Item-level availability</b> See what actually works for your date.</span></div>
          <div data-reveal="up" style={delay(90)}><MapPin size={19} /><span><b>Delivery that adds up clearly</b> Get a ZIP-based estimate before you ask.</span></div>
          <div data-reveal="up" style={delay(180)}><PackageCheck size={19} /><span><b>Deposits spelled out</b> Kept separate and returned after a good return.</span></div>
        </section>

        <div className="marquee">
          <div className="marquee__track">
            {[0, 1].map((group) => (
              <div className="marquee__group" key={group} aria-hidden={group === 1}>
                {marqueeItems.map((item) => (
                  <span className="marquee__item" key={`${group}-${item.label}`}>{item.icon}<b>{item.label}</b> · {item.detail}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="section section--categories">
          <div className="section-heading section-heading--split">
            <div><p className="eyebrow" data-reveal="up">THE BUILDING BLOCKS</p><h2 data-reveal="up" style={delay(90)}>Start with the moment<br />you’re making room for.</h2></div>
            <p data-reveal="up" style={delay(180)}>Quiet dinner, active birthday, open-air reception—choose a direction, then build it piece by piece.</p>
          </div>
          <div className="category-rail">
            {categoryCards.map((card, index) => <Link href={card.href} className="category-card" key={card.label} data-reveal="up" style={delay(index * 110)}>
              <img src={card.image} alt="" />
              <div className="category-card__shade" />
              <div className="category-card__content"><span>0{index + 1}</span><h3>{card.label}</h3><p>{card.detail}</p><i><ArrowRight size={18} /></i></div>
            </Link>)}
          </div>
        </section>

        <section className="section section--spotlight">
          <div className="spotlight-intro">
            <p className="eyebrow eyebrow--gold" data-reveal="up">A FEW GOOD PIECES</p>
            <h2 data-reveal="up" style={delay(90)}>Make a strong plan.<br /><em>Then let it get easy.</em></h2>
            <p data-reveal="up" style={delay(180)}>Most events need more than one thing. Keep the details in one live quote as you go.</p>
            <Link href="/browse" className="button button--outline-light" data-reveal="up" style={delay(260)}>Explore the full inventory <ArrowRight size={18} /></Link>
          </div>
          <div className="spotlight-list">
            {spotlights.map((item, index) => <Link href={`/rentals/${item.id}`} className="spotlight-row" key={item.id} data-reveal="up" style={delay(index * 90)}>
              <span className="spotlight-row__number">0{index + 1}</span><img src={item.image} alt="" /><div><p>{item.category}</p><h3>{item.name}</h3></div><span className="spotlight-row__price">from ${item.price}<ArrowRight size={17} /></span>
            </Link>)}
          </div>
        </section>

        <section className="process-band">
          <div className="process-band__title" data-reveal="up"><p className="eyebrow">THE MARIGOLD WAY</p><h2>Clear enough to decide.<br />Flexible enough to host.</h2></div>
          <div className="process-steps">
            <article data-reveal="up" style={delay(0)}><span>01</span><h3>Choose a date</h3><p>Look at the calendar on the exact item you want. No generic “maybe” availability.</p></article>
            <article data-reveal="up" style={delay(110)}><span>02</span><h3>Build your quote</h3><p>Bring every item, its refundable deposit, and estimated delivery into one running plan.</p></article>
            <article data-reveal="up" style={delay(220)}><span>03</span><h3>Send the request</h3><p>Review every detail before it reaches our event line. We’ll follow up with the final confirmation.</p></article>
          </div>
        </section>

        <section className="closing-cta">
          <div data-reveal="up"><p className="eyebrow eyebrow--gold"><Sparkles size={14} /> MAKE THE NEXT STEP SMALL</p><h2>Your event is already taking shape.</h2><p>Start a working quote in a few minutes. We will keep the logistics visible from the first item to the final request.</p></div>
          <Link href="/browse" className="button button--gold" data-reveal="up" style={delay(140)}>Start with inventory <ArrowRight size={18} /></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
