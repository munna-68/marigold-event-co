/** Harbor Blueprint style: a focused item dossier pairing atmospheric photography with exact date decisions. */
import { ArrowLeft, ArrowRight, CalendarCheck2, Check, CircleAlert, Minus, Plus, ShieldCheck } from "lucide-react";
import { Link, useRoute, useLocation } from "wouter";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { formatMoney, inventory, isAvailable } from "@/lib/catalog";
import { useRental } from "@/contexts/RentalContext";

export default function RentalDetail() {
  const [, params] = useRoute("/rentals/:id");
  const [, navigate] = useLocation();
  const item = inventory.find((entry) => entry.id === params?.id);
  const { addToQuote } = useRental();
  const [date, setDate] = useState<Date | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  if (!item) return <div className="app-shell"><SiteHeader /><main className="not-found"><h1>That rental is not in the field guide.</h1><Link href="/browse" className="button button--navy">Return to inventory</Link></main><SiteFooter /></div>;
  const available = isAvailable(item, date);
  const disabledDates = item.bookedDates.map((booked) => new Date(`${booked}T12:00:00`));
  const handleAdd = () => { if (!date || !available) return; for (let i = 0; i < quantity; i += 1) addToQuote(item, date); setAdded(true); };
  return <div className="app-shell rental-detail-page"><SiteHeader />
    <main>
      <div className="detail-back"><Link href="/browse"><ArrowLeft size={16} /> Back to inventory</Link><span>{item.category}</span></div>
      <section className="detail-hero">
        <div className="detail-hero__image"><img src={item.image} alt={item.name} /><div className="image-vignette" /><p className="image-caption">Marigold inventory / {item.category}</p></div>
        <div className="detail-hero__summary"><p className="eyebrow eyebrow--gold">{item.category.toUpperCase()}</p><h1>{item.name}</h1><p className="detail-description">{item.description}</p><div className="price-cluster"><div><span>Rental rate</span><b>{formatMoney(item.price)}</b><small>per event</small></div><div><span>Security deposit</span><b>{formatMoney(item.deposit)}</b><small>refundable after return</small></div></div>{item.capacity && <p className="capacity-note"><CalendarCheck2 size={16} /> {item.capacity}</p>}</div>
      </section>
      <section className="detail-grid">
        <article className="detail-info-card"><p className="eyebrow">WHAT’S INCLUDED</p><ul>{item.included.map((line) => <li key={line}><Check size={16} />{line}</li>)}</ul><div className="setup-note"><ShieldCheck size={18} /><p><b>Before we arrive</b>{item.setupNote}</p></div></article>
        <article className="availability-panel"><div className="availability-panel__header"><div><p className="eyebrow eyebrow--gold">STEP 1 · DATE FIRST</p><h2>Does it work for you?</h2></div><span className="availability-key"><i /> Booked dates</span></div><div className="availability-route"><div className="route-milestone"><span>02</span><i /><p>Check the item</p></div><div className="tent-arch" aria-hidden="true" /></div><div className="calendar-wrap"><Calendar mode="single" selected={date} onSelect={setDate} disabled={[{ before: new Date() }, ...disabledDates]} className="marigold-calendar" /></div>{date && <div className={available ? "date-status date-status--available" : "date-status date-status--blocked"}>{available ? <><Check size={18} /><div><b>Available on {date.toLocaleDateString("en-US", { month: "long", day: "numeric" })}</b><span>Save it to your quote while you plan the rest.</span></div></> : <><CircleAlert size={18} /><div><b>Already booked on this date</b><span>Choose another day or keep exploring available options.</span></div></>}</div>}{!date && <div className="date-status"><CalendarCheck2 size={18} /><div><b>Select your event date</b><span>Booked days are disabled in the calendar.</span></div></div>}</article>
        <aside className="add-panel"><p className="eyebrow">STEP 2 · BUILD THE QUOTE</p><h2>Bring it into the plan.</h2><div className="quantity-control"><span>How many?</span><div><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus size={16} /></button><b>{quantity}</b><button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus size={16} /></button></div></div><div className="add-panel__totals"><span>Rental <b>{formatMoney(item.price * quantity)}</b></span><span>Refundable deposits <b>{formatMoney(item.deposit * quantity)}</b></span></div><button onClick={handleAdd} disabled={!date || !available} className="button button--gold button--full">{added ? "Added to quote" : "Add to live quote"}<ArrowRight size={17} /></button>{added && <Link href="/quote" className="view-quote-link">Review my quote <ArrowRight size={15} /></Link>}<p className="deposit-note">Deposits are held separately and refunded within 3 business days after return in good condition.</p></aside>
      </section>
    </main>
    <SiteFooter />
  </div>;
}
