/** Harbor Blueprint style: a planning desk that turns a short brief into a real, editable quote. */
import { ArrowRight, Check, ChevronLeft, Plus, RotateCcw, Sparkles } from "lucide-react";
import { useMemo, useState, type CSSProperties } from "react";
import { Link } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { formatMoney } from "@/lib/catalog";
import {
  bookedDateSummary,
  bundleTotals,
  bundles,
  extraOptions,
  guestOptions,
  linesFor,
  occasionOptions,
  recommend,
  recommendationTotals,
  settingOptions,
  type ExtraId,
  type GuestId,
  type OccasionId,
  type PlannerAnswers,
  type SettingId
} from "@/lib/planner";
import { useRental } from "@/contexts/RentalContext";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

const STEP_LABELS = ["Occasion", "Guests", "Setting", "Extras"];

export default function Plan() {
  const { addManyToQuote } = useRental();
  const [step, setStep] = useState(0);
  const [occasion, setOccasion] = useState<OccasionId | null>(null);
  const [guests, setGuests] = useState<GuestId | null>(null);
  const [setting, setSetting] = useState<SettingId | null>(null);
  const [extras, setExtras] = useState<ExtraId[]>([]);
  const [built, setBuilt] = useState(false);

  const live = useMemo(() => bookedDateSummary(45), []);

  const answers: PlannerAnswers | null = occasion && guests && setting ? { occasion, guests, setting, extras } : null;
  const recommendation = useMemo(
    () => (built && occasion && guests && setting ? recommend({ occasion, guests, setting, extras }) : []),
    [built, occasion, guests, setting, extras]
  );
  const totals = useMemo(() => recommendationTotals(recommendation), [recommendation]);

  const answered = [occasion, guests, setting].filter(Boolean).length;
  const canAdvance = step === 0 ? Boolean(occasion) : step === 1 ? Boolean(guests) : step === 2 ? Boolean(setting) : true;
  const lastStep = step === STEP_LABELS.length - 1;

  const toggleExtra = (id: ExtraId) => {
    setExtras((current) => (current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id]));
  };

  const build = () => {
    setBuilt(true);
    setStep(STEP_LABELS.length - 1);
    window.setTimeout(() => {
      const target = document.getElementById("plan-result");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  const reset = () => {
    setBuilt(false);
    setStep(0);
    setOccasion(null);
    setGuests(null);
    setSetting(null);
    setExtras([]);
  };

  const chosen = [
    occasion ? occasionOptions.find((option) => option.id === occasion)?.label : null,
    guests ? `${guestOptions.find((option) => option.id === guests)?.label} guests` : null,
    setting ? settingOptions.find((option) => option.id === setting)?.label : null
  ].filter(Boolean) as string[];

  return <div className="app-shell plan-page"><SiteHeader />
    <main className="plan-page__main">
      <section className="plan-hero">
        <div>
          <p className="eyebrow eyebrow--gold" data-reveal="up">PLAN AN EVENT</p>
          <h1 data-reveal="up" style={delay(90)}>Four questions,<br /><em>then a working plan.</em></h1>
        </div>
        <div className="plan-hero__note" data-reveal="up" style={delay(180)}>
          <p className="live-status"><i aria-hidden="true" /> LIVE INVENTORY · {live.dates} booked dates across {live.items} pieces in the next {live.daysAhead} days</p>
          <p>Nothing here is a guess. Each answer narrows real inventory, and everything you accept lands in the same quote you would send.</p>
        </div>
      </section>

      <div className="plan-layout">
        <section className="plan-quiz" data-reveal="up">
          <div className="plan-progress">
            <div className="plan-progress__labels">
              {STEP_LABELS.map((label, index) => <span key={label} className={index === step ? "plan-progress__label plan-progress__label--active" : index < step ? "plan-progress__label plan-progress__label--done" : "plan-progress__label"}>{index < step ? <Check size={13} /> : <b>{index + 1}</b>}{label}</span>)}
            </div>
            <div className="plan-progress__track"><span style={{ width: `${((step + 1) / STEP_LABELS.length) * 100}%` }} /></div>
          </div>

          {step === 0 && <fieldset className="plan-step">
            <legend><p className="eyebrow">STEP 1 · OCCASION</p><h2>What are you making room for?</h2></legend>
            <div className="plan-options">{occasionOptions.map((option) => <button type="button" key={option.id} onClick={() => setOccasion(option.id)} className={occasion === option.id ? "plan-option plan-option--active" : "plan-option"} aria-pressed={occasion === option.id}><b>{option.label}</b><span>{option.detail}</span></button>)}</div>
          </fieldset>}

          {step === 1 && <fieldset className="plan-step">
            <legend><p className="eyebrow">STEP 2 · GUESTS</p><h2>How many people are you seating?</h2></legend>
            <div className="plan-options plan-options--compact">{guestOptions.map((option) => <button type="button" key={option.id} onClick={() => setGuests(option.id)} className={guests === option.id ? "plan-option plan-option--active" : "plan-option"} aria-pressed={guests === option.id}><b>{option.label}</b><span>{option.seated} covered seats</span></button>)}</div>
          </fieldset>}

          {step === 2 && <fieldset className="plan-step">
            <legend><p className="eyebrow">STEP 3 · SETTING</p><h2>Where does it happen?</h2></legend>
            <div className="plan-options">{settingOptions.map((option) => <button type="button" key={option.id} onClick={() => setSetting(option.id)} className={setting === option.id ? "plan-option plan-option--active" : "plan-option"} aria-pressed={setting === option.id}><b>{option.label}</b><span>{option.detail}</span></button>)}</div>
          </fieldset>}

          {step === 3 && <fieldset className="plan-step">
            <legend><p className="eyebrow">STEP 4 · EXTRAS</p><h2>Anything that would make it easier?</h2></legend>
            <div className="plan-chips">{extraOptions.map((option) => <button type="button" key={option.id} onClick={() => toggleExtra(option.id)} className={extras.includes(option.id) ? "plan-chip plan-chip--active" : "plan-chip"} aria-pressed={extras.includes(option.id)}>{extras.includes(option.id) ? <Check size={14} /> : <Plus size={14} />}{option.label}</button>)}</div>
            <p className="plan-step__note">Optional. Skip it and the rest of your answers still build a complete plan.</p>
          </fieldset>}

          <div className="plan-nav">
            <button type="button" className="button button--navy" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}><ChevronLeft size={16} /> Back</button>
            {lastStep
              ? <button type="button" className="button button--gold" onClick={build} disabled={!answers}>Build my plan <Sparkles size={16} /></button>
              : <button type="button" className="button button--gold" onClick={() => setStep(step + 1)} disabled={!canAdvance}>Continue <ArrowRight size={16} /></button>}
          </div>
        </section>

        <aside className="plan-summary" data-reveal="up" style={delay(90)}>
          <p className="eyebrow eyebrow--gold">YOUR BRIEF SO FAR</p>
          <h2>{answered === 0 ? "Nothing answered yet." : `${answered} of 3 answered.`}</h2>
          <ul className="plan-summary__list">
            {chosen.length ? chosen.map((entry) => <li key={entry}><Check size={15} />{entry}</li>) : <li className="plan-summary__empty">Pick an occasion to begin.</li>}
            {extras.length ? <li><Check size={15} />{extras.length} optional {extras.length === 1 ? "extra" : "extras"}</li> : null}
          </ul>
          {built && recommendation.length > 0 && <div className="plan-summary__totals">
            <span><b>{recommendation.length}</b> item{recommendation.length === 1 ? "" : "s"} recommended</span>
            <span><b>{formatMoney(totals.rental)}</b> rental estimate</span>
            <span><b>{formatMoney(totals.deposit)}</b> refundable deposits</span>
          </div>}
          {built && <button type="button" className="button button--outline-light button--full" onClick={reset}><RotateCcw size={15} /> Start over</button>}
        </aside>
      </div>

      {built && recommendation.length > 0 && <section className="plan-result" id="plan-result" data-reveal="up">
        <div className="plan-result__head">
          <div><p className="eyebrow eyebrow--gold">YOUR RECOMMENDED PLAN</p><h2>{recommendation.length} pieces, chosen for a reason.</h2></div>
          <p>Every line explains itself. Add the whole plan, then change quantities or dates in the quote.</p>
        </div>
        <ol className="plan-result__list">
          {recommendation.map((line, index) => <li key={`${line.item.id}-${index}`} data-reveal="up" style={delay(index * 55)}>
            <img src={line.item.image} alt="" />
            <div><p className="eyebrow">{line.item.category}</p><h3>{line.item.name}</h3><span className="plan-result__reason">{line.reason}</span></div>
            <div className="plan-result__meta"><b>{line.quantity} × {formatMoney(line.item.price)}</b><small>{formatMoney(line.item.price * line.quantity)} rental</small></div>
          </li>)}
        </ol>
        <div className="plan-result__foot">
          <div className="plan-result__totals"><span>Rental estimate <b>{formatMoney(totals.rental)}</b></span><span>Refundable deposits <b>{formatMoney(totals.deposit)}</b></span></div>
          <button type="button" className="button button--gold" onClick={() => addManyToQuote(recommendation.map((line) => ({ item: line.item, quantity: line.quantity })), `Added ${recommendation.length} recommended items`)}>Add all {totals.units} units to my quote <ArrowRight size={17} /></button>
        </div>
      </section>}

      <section className="plan-bundles" data-reveal="up">
        <div className="section-heading section-heading--split">
          <div><p className="eyebrow">OR START FROM A PACKAGE</p><h2>Plans people<br />ask for by name.</h2></div>
          <p>Each package is a real set of inventory with a real total. Add one, then shape it in the quote.</p>
        </div>
        <div className="bundle-rail">
          {bundles.map((bundle, index) => {
            const lines = linesFor(bundle);
            const bundleTotal = bundleTotals(bundle);
            return <article className="bundle-card" key={bundle.id} data-reveal="up" style={delay(index * 80)}>
              <p className="eyebrow eyebrow--gold">{bundle.fits}</p>
              <h3>{bundle.name}</h3>
              <p className="bundle-card__summary">{bundle.summary}</p>
              <ul className="bundle-card__lines">{lines.map((line) => <li key={line.item.id}><span>{line.quantity} × {line.item.name}</span><b>{formatMoney(line.item.price * line.quantity)}</b></li>)}</ul>
              <div className="bundle-card__foot">
                <span className="bundle-card__total">{formatMoney(bundleTotal.rental)}<small> + {formatMoney(bundleTotal.deposit)} deposit</small></span>
                <button type="button" className="button button--navy" onClick={() => addManyToQuote(lines.map((line) => ({ item: line.item, quantity: line.quantity })), `Added the ${bundle.name} package`)}>Add package <ArrowRight size={16} /></button>
              </div>
            </article>;
          })}
        </div>
      </section>

      <section className="plan-cta" data-reveal="up">
        <div><p className="eyebrow eyebrow--gold">READY WHEN YOU ARE</p><h2>Nothing is charged until a real person confirms it.</h2></div>
        <div className="plan-cta__links"><Link href="/browse" className="button button--gold">Browse the full inventory <ArrowRight size={17} /></Link><Link href="/quote" className="text-action">Open my quote <ArrowRight size={16} /></Link></div>
      </section>
    </main>

    <div className="plan-sticky">
      <div className="plan-sticky__info">
        <b>{built && recommendation.length ? `${totals.units} units · ${formatMoney(totals.rental)}` : chosen[0] ?? "Start with an occasion"}</b>
        <small>{built && recommendation.length ? "Recommended plan ready" : `Step ${step + 1} of ${STEP_LABELS.length} · ${STEP_LABELS[step]}`}</small>
      </div>
      {built && recommendation.length
        ? <button type="button" className="button button--gold" onClick={() => addManyToQuote(recommendation.map((line) => ({ item: line.item, quantity: line.quantity })), `Added ${recommendation.length} recommended items`)}>Add all to quote</button>
        : <button type="button" className="button button--gold" onClick={() => (lastStep ? build() : setStep(step + 1))} disabled={!canAdvance}>{lastStep ? "Build my plan" : "Continue"}</button>}
    </div>

    <SiteFooter />
  </div>;
}
