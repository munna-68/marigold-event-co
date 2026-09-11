import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { deliveryForZip, type RentalItem } from "@/lib/catalog";

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

type RentalContextValue = {
  quoteLines: QuoteLine[];
  zip: string;
  customer: CustomerDetails;
  addToQuote: (item: RentalItem, eventDate?: Date) => void;
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

const RentalContext = createContext<RentalContextValue | undefined>(undefined);

export function RentalProvider({ children }: { children: ReactNode }) {
  const [quoteLines, setQuoteLines] = useState<QuoteLine[]>([]);
  const [zip, setZip] = useState("");
  const [customer, setCustomer] = useState<CustomerDetails>({ name: "", email: "", phone: "", notes: "" });

  const addToQuote = (item: RentalItem, eventDate?: Date) => {
    const normalizedDate = eventDate?.toISOString().slice(0, 10) ?? "undated";
    const lineId = `${item.id}-${normalizedDate}`;
    setQuoteLines((current) => {
      const existing = current.find((line) => line.lineId === lineId);
      if (existing) {
        return current.map((line) => line.lineId === lineId ? { ...line, quantity: line.quantity + 1 } : line);
      }
      return [...current, { lineId, item, quantity: 1, eventDate }];
    });
  };

  const changeQuantity = (lineId: string, nextQuantity: number) => {
    if (nextQuantity <= 0) {
      setQuoteLines((current) => current.filter((line) => line.lineId !== lineId));
      return;
    }
    setQuoteLines((current) => current.map((line) => line.lineId === lineId ? { ...line, quantity: nextQuantity } : line));
  };

  const removeLine = (lineId: string) => setQuoteLines((current) => current.filter((line) => line.lineId !== lineId));
  const clearQuote = () => {
    setQuoteLines([]);
    setZip("");
    setCustomer({ name: "", email: "", phone: "", notes: "" });
  };

  const summary = useMemo(() => {
    const rentalTotal = quoteLines.reduce((total, line) => total + line.item.price * line.quantity, 0);
    const depositTotal = quoteLines.reduce((total, line) => total + line.item.deposit * line.quantity, 0);
    const delivery = deliveryForZip(zip);
    const itemCount = quoteLines.reduce((total, line) => total + line.quantity, 0);
    return { rentalTotal, depositTotal, delivery, grandTotal: rentalTotal + depositTotal + delivery.fee, itemCount };
  }, [quoteLines, zip]);

  return (
    <RentalContext.Provider value={{ quoteLines, zip, customer, addToQuote, changeQuantity, removeLine, setZip, setCustomer, clearQuote, ...summary }}>
      {children}
    </RentalContext.Provider>
  );
}

export function useRental() {
  const context = useContext(RentalContext);
  if (!context) throw new Error("useRental must be used within RentalProvider");
  return context;
}
