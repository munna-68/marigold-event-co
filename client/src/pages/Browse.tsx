/** Harbor Blueprint style: a calm field-guide catalog where filters behave like a practical planning rail. */
import { ArrowRight, Filter, Search, SlidersHorizontal } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { categories, formatMoney, inventory, type Category } from "@/lib/catalog";

export default function Browse() {
  const [location] = useLocation();
  const initialCategory = new URLSearchParams(location.split("?")[1]).get("category") as Category | null;
  const [active, setActive] = useState<Category | "All">(initialCategory && categories.includes(initialCategory) ? initialCategory : "All");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => inventory.filter((item) => (active === "All" || item.category === active) && `${item.name} ${item.shortDescription}`.toLowerCase().includes(query.toLowerCase())), [active, query]);
  return <div className="app-shell page-with-rail"><SiteHeader />
    <main className="catalog-page">
      <div className="catalog-intro"><div><p className="eyebrow eyebrow--gold">THE RENTAL FIELD GUIDE</p><h1>Pieces worth<br /><em>planning around.</em></h1></div><div className="catalog-intro__note"><div className="route-milestone route-milestone--ink"><span>01</span><i /><p>Find the piece</p></div><p>Start wide or get specific. Each item shows its rental rate, refundable deposit, and its own availability before it joins your quote.</p></div></div>
      <div className="catalog-layout">
        <aside className="catalog-rail">
          <div className="rail-title"><SlidersHorizontal size={16} /> Filter inventory</div>
          <div className="category-filter"><button onClick={() => setActive("All")} className={active === "All" ? "filter-button filter-button--active" : "filter-button"}>All pieces <span>{inventory.length}</span></button>{categories.map((category) => <button key={category} onClick={() => setActive(category)} className={active === category ? "filter-button filter-button--active" : "filter-button"}>{category}<span>{inventory.filter((item) => item.category === category).length}</span></button>)}</div>
          <div className="rail-note"><Filter size={15} /><p>Availability is checked once you choose a date on an item page.</p></div>
        </aside>
        <section className="catalog-results">
          <div className="results-toolbar"><p><b>{visible.length}</b> pieces in view</p><label className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search inventory" aria-label="Search inventory" /></label></div>
          <div className="inventory-grid">{visible.map((item) => <Link href={`/rentals/${item.id}`} className="rental-card" key={item.id}><div className="rental-card__image"><img src={item.image} alt="" /><span>{item.category}</span></div><div className="rental-card__body"><div><h2>{item.name}</h2><p>{item.shortDescription}</p></div><div className="rental-card__meta"><span><b>{formatMoney(item.price)}</b> rental</span><span><b>{formatMoney(item.deposit)}</b> deposit</span></div><div className="card-availability"><i /> Item calendar ready</div><div className="card-arrow">Choose a date <ArrowRight size={16} /></div></div></Link>)}</div>
          {!visible.length && <div className="empty-state"><p className="eyebrow">NOTHING IN THIS CORNER</p><h2>Try a different search or reset the category.</h2><button className="button button--navy" onClick={() => { setQuery(""); setActive("All"); }}>Show all inventory</button></div>}
        </section>
      </div>
    </main>
    <SiteFooter />
  </div>;
}
