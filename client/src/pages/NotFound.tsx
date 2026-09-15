/** Harbor Blueprint style: a dead end that still looks like the rest of the building. */
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return <div className="app-shell not-found-page">
    <SiteHeader />
    <main className="not-found">
      <div className="not-found__card" data-reveal="scale">
        <div className="not-found__mark"><AlertCircle size={26} /></div>
        <p className="eyebrow eyebrow--gold">404</p>
        <h1>Page Not Found</h1>
        <p>Sorry, the page you are looking for doesn't exist. It may have been moved or deleted.</p>
        <button className="button button--gold" onClick={() => setLocation("/")}><Home size={16} /> Go Home</button>
      </div>
    </main>
    <SiteFooter />
  </div>;
}
