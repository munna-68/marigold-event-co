import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { dayKey, deliveryForZip, formatMoney, inventory, type RentalItem } from "@/lib/catalog";

export type QuoteLine = {
  lineId: string;
  item: RentalItem;
  quantity: number;
  eventDate?: Date;
};

type CustomerDetails = {
  name: string;
  email: string;
  phone: string;
  notes: string;
};

export type QuoteEntry = {
  item: RentalItem;
  quantity: number;
  eventDate?: Date;
};

type RentalContextValue = {
  quoteLines: QuoteLine[];
  zip: string;
  customer: CustomerDetails;
  addToQuote: (item: RentalItem, eventDate?: Date, quantity?: number) => void;
  addManyToQuote: (entries: QuoteEntry[], label?: string) => void;
  changeQuantity: (lineId: string, nextQuantity: number) => void;
  removeLine: (lineId: string) => void;
  setZip: (zip: string) => void;
  setCustomer: (next: CustomerDetails) => void;
  clearQuote: () => void;
  rentalTotal: number;
  depositTotal: number;
  delivery: ReturnType<typeof deliveryForZip>;
  grandTotal: number;
  itemCount: number;
};

const STORAGE_KEY = "marigold-quote-v1";

const EMPTY_CUSTOMER: CustomerDetails = { name: "", email: "", phone: "", notes: "" };

type StoredQuote = {
  lines: { itemId: string; quantity: number; eventDate?: string }[];
  zip: string;
  customer: CustomerDetails;
};

const RentalContext = createContext<RentalContextValue | undefined>(undefined);

function readStored(): { lines: QuoteLine[]; zip: string; customer: CustomerDetails } {
  const fallback = { lines: [] as QuoteLine[], zip: "", customer: EMPTY_CUSTOMER };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<StoredQuote>;
    const lines = (parsed.lines ?? []).reduce<QuoteLine[]>((kept, line) => {
      const item = inventory.find((entry) => entry.id === line.itemId);
      if (!item || !line.quantity || line.quantity < 1) return kept;
      kept.push({
        lineId: `${item.id}-${line.eventDate ?? "undated"}`,
        item,
        quantity: line.quantity,
        eventDate: line.eventDate ? new Date(`${line.eventDate}T12:00:00`) : undefined
      });
      return kept;
    }, []);
    return { lines, zip: parsed.zip ?? "", customer: { ...EMPTY_CUSTOMER, ...(parsed.customer ?? {}) } };
  } catch {
    return fallback;
  }
}

export function RentalProvider({ children }: { children: ReactNode }) {
  const [stored] = useState(readStored);
  const [quoteLines, setQuoteLines] = useState<QuoteLine[]>(stored.lines);
  const [zip, setZip] = useState(stored.zip);
  const [customer, setCustomer] = useState<CustomerDetails>(stored.customer);

  useEffect(() => {
    const payload: StoredQuote = {
      lines: quoteLines.map((line) => ({ itemId: line.item.id, quantity: line.quantity, eventDate: line.eventDate ? dayKey(line.eventDate) : undefined })),
      zip,
      customer
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* Private mode or a full quota: the quote still works for this session. */
    }
  }, [quoteLines, zip, customer]);

  const addManyToQuote = (entries: QuoteEntry[], label?: string) => {
    const usable = entries.filter((entry) => entry.quantity > 0);
    if (!usable.length) return;
    setQuoteLines((current) => {
      const next = [...current];
      for (const entry of usable) {
        const key = entry.eventDate ? dayKey(entry.eventDate) : "undated";
        const lineId = `${entry.item.id}-${key}`;
        const existing = next.findIndex((line) => line.lineId === lineId);
        if (existing >= 0) next[existing] = { ...next[existing], quantity: next[existing].quantity + entry.quantity };
        else next.push({ lineId, item: entry.item, quantity: entry.quantity, eventDate: entry.eventDate });
      }
      return next;
    });
    const units = usable.reduce((total, entry) => total + entry.quantity, 0);
    toast.success(label ?? `Added ${usable.length === 1 ? usable[0].item.name : `${usable.length} items`}`, {
      description: `${units} ${units === 1 ? "unit" : "units"} now in your working quote.`
    });
  };

  const addToQuote = (item: RentalItem, eventDate?: Date, quantity = 1) => {
    addManyToQuote([{ item, quantity, eventDate }], `Added ${quantity} × ${item.name}`);
  };

  const changeQuantity = (lineId: string, nextQuantity: number) => {
    if (nextQuantity <= 0) {
      removeLine(lineId);
      return;
    }
    setQuoteLines((current) => current.map((line) => (line.lineId === lineId ? { ...line, quantity: nextQuantity } : line)));
  };

  const removeLine = (lineId: string) => {
    const removed = quoteLines.find((line) => line.lineId === lineId);
    setQuoteLines((current) => current.filter((line) => line.lineId !== lineId));
    if (!removed) return;
    toast(`Removed ${removed.item.name}`, {
      description: `${removed.quantity} × ${formatMoney(removed.item.price * removed.quantity)} rental released.`,
      action: {
        label: "Undo",
        onClick: () => {
          setQuoteLines((current) =>
            current.some((line) => line.lineId === lineId)
              ? current
              : [...current, removed]
          );
          toast.success(`Restored ${removed.item.name}`);
        }
      }
    });
  };

  const clearQuote = () => {
    setQuoteLines([]);
    setZip("");
    setCustomer(EMPTY_CUSTOMER);
    toast("Quote cleared", { description: "Your plan is empty and ready for the next event." });
  };

  const summary = useMemo(() => {
    const rentalTotal = quoteLines.reduce((total, line) => total + line.item.price * line.quantity, 0);
    const depositTotal = quoteLines.reduce((total, line) => total + line.item.deposit * line.quantity, 0);
    const delivery = deliveryForZip(zip);
    const itemCount = quoteLines.reduce((total, line) => total + line.quantity, 0);
    return { rentalTotal, depositTotal, delivery, grandTotal: rentalTotal + depositTotal + delivery.fee, itemCount };
  }, [quoteLines, zip]);

  return (
    <RentalContext.Provider value={{ quoteLines, zip, customer, addToQuote, addManyToQuote, changeQuantity, removeLine, setZip, setCustomer, clearQuote, ...summary }}>
      {children}
    </RentalContext.Provider>
  );
}

export function useRental() {
  const context = useContext(RentalContext);
  if (!context) throw new Error("useRental must be used within RentalProvider");
  return context;
}
