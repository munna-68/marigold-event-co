import { withBase } from "@/lib/withBase";
/** Harbor Blueprint style: a service-led introduction that trades decorative claims for clear operational reassurance. */
import { ArrowRight, Check, Clock3, MapPinned, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function About() {
  return <div className="app-shell about-page"><SiteHeader />
    <main><section className="about-hero"><div><p className="eyebrow eyebrow--gold">A SMALL BUSINESS WITH A STEADY SYSTEM</p><h1>The event details<br /><em>shouldn’t be a scavenger hunt.</em></h1></div><p>Marigold Event Co. is a portfolio demonstration of a more transparent way to rent for real celebrations: exact inventory, visible dates, clear deposits, and delivery that is part of the conversation from the start.</p></section>
      <section className="about-image-band"><img src={withBase("/images/marigold-photo-booth_12d81f3a.jpg")} alt="An event rental photo booth in a dusk reception setting" /><div><p className="eyebrow eyebrow--gold">A BETTER RENTAL RHYTHM</p><h2>Less back-and-forth.<br />More room for the actual event.</h2><p>This site is designed to show what a local event-rental business can offer when the quote is a working planning tool rather than a form at the end of a brochure.</p></div></section>
      <section className="standards-section"><div><p className="eyebrow">THE USEFUL PARTS</p><h2>What stays visible<br />throughout your plan.</h2></div><div className="standard-list"><article><CalendarIcon /><div><h3>Availability by item</h3><p>A tent may be booked while your chairs are free. Each product carries its own date logic, so your choice becomes clearer sooner.</p></div></article><article><MapPinned size={24} /><div><h3>Delivery in the quote</h3><p>A five-digit ZIP estimates the delivery band immediately—before a host has to wonder what the final call will add.</p></div></article><article><ShieldCheck size={24} /><div><h3>Deposits in plain sight</h3><p>Rental charges and refundable deposits stay separate, with the return standard stated on the item and in the final request.</p></div></article><article><Clock3 size={24} /><div><h3>One coherent handoff</h3><p>The customer submits a reviewed plan, including notes for access and setup. The event line begins with context, not a blank email.</p></div></article></div></section>
      <section id="contact" className="contact-panel"><div><p className="eyebrow eyebrow--gold">LET’S TALK THROUGH THE SHAPE OF IT</p><h2>Need a quick second opinion?</h2><p>For a production business, this would be the direct line to the team that knows the inventory and service area.</p></div><div className="contact-panel__links"><a href="tel:+15550142290">(555) 014-2290 <ArrowRight size={17} /></a><a href="mailto:hello@marigoldevent.co">hello@marigoldevent.co <ArrowRight size={17} /></a><Link href="/browse" className="button button--gold">Or build a quote <ArrowRight size={17} /></Link></div></section>
    </main><SiteFooter />
  </div>;
}

function CalendarIcon() { return <div className="calendar-icon"><span /><b>24</b></div>; }
