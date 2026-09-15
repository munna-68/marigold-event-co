import { withBase } from "@/lib/withBase";
export type Category = "Tents" | "Tables & Chairs" | "Inflatables" | "Linens" | "Extras";

export type RentalItem = {
  id: string;
  name: string;
  category: Category;
  shortDescription: string;
  description: string;
  price: number;
  deposit: number;
  capacity?: string;
  image: string;
  featured?: boolean;
  bookedDates: string[];
  included: string[];
  setupNote: string;
};

export const categories: Category[] = ["Tents", "Tables & Chairs", "Inflatables", "Linens", "Extras"];

export const inventory: RentalItem[] = [
  {
    id: "sailcloth-20x30",
    name: "20 × 30 Sailcloth Tent",
    category: "Tents",
    shortDescription: "A luminous, weather-ready gathering place.",
    description: "A sculptural sailcloth tent for dinners, showers, and celebrations that need a little more sky. The translucent canopy keeps the room bright during the day and glows beautifully after dark.",
    price: 760,
    deposit: 225,
    capacity: "Up to 48 seated",
    image: withBase("/images/marigold-hero_0f3301e5.jpg"),
    featured: true,
    bookedDates: ["2026-08-29", "2026-09-05", "2026-09-12", "2026-09-19"],
    included: ["Tent installation", "Anchoring or weighted base", "Weather sidewall consultation"],
    setupNote: "A 30 × 40 ft clear setup area is required."
  },
  {
    id: "frame-20x20",
    name: "20 × 20 Frame Tent",
    category: "Tents",
    shortDescription: "Flexible cover for a polished backyard plan.",
    description: "A clean-lined frame tent that makes patios, lawns, and driveways feel event-ready. A practical favorite for dinners, open houses, and family celebrations.",
    price: 425,
    deposit: 150,
    capacity: "Up to 32 seated",
    image: withBase("/images/marigold-frame-tent_80199d06.jpg"),
    bookedDates: ["2026-08-24", "2026-08-30", "2026-09-06"],
    included: ["Tent installation", "Weighted-base option", "Basic rain plan"],
    setupNote: "A 25 × 25 ft clear setup area is required."
  },
  {
    id: "farm-table",
    name: "8 ft Harvest Table",
    category: "Tables & Chairs",
    shortDescription: "Solid oak warmth for eight to ten guests.",
    description: "A generously proportioned wood table with a softly weathered finish. Pair several end-to-end for long communal dinners or use one as a food or dessert table.",
    price: 68,
    deposit: 25,
    capacity: "Seats 8–10",
    image: withBase("/images/marigold-table-setting_660fd7a9.jpg"),
    featured: true,
    bookedDates: ["2026-08-30", "2026-09-12"],
    included: ["Wiped and event-ready surface", "Standard placement"],
    setupNote: "Available in a quantity of 18."
  },
  {
    id: "bistro-chair",
    name: "Bistro Chair",
    category: "Tables & Chairs",
    shortDescription: "A lightweight café chair with a thoughtful silhouette.",
    description: "Natural wood bistro seating that works for intimate ceremonies, garden dinners, and standing-room cocktail setups.",
    price: 7,
    deposit: 3,
    capacity: "Single chair",
    image: withBase("/images/marigold-seating_42b840e5.jpg"),
    bookedDates: ["2026-08-23", "2026-09-05", "2026-09-19"],
    included: ["Cleaned event-ready chair", "Standard placement"],
    setupNote: "Available in a quantity of 120."
  },
  {
    id: "crossback-chair",
    name: "Crossback Chair",
    category: "Tables & Chairs",
    shortDescription: "A dressier seat with a quiet vintage reference.",
    description: "A warm wood crossback chair with a tailored profile for ceremonies, long-table meals, and receptions.",
    price: 9,
    deposit: 4,
    capacity: "Single chair",
    image: withBase("/images/marigold-seating_42b840e5.jpg"),
    bookedDates: ["2026-08-29", "2026-09-12"],
    included: ["Cleaned event-ready chair", "Standard placement"],
    setupNote: "Available in a quantity of 80."
  },
  {
    id: "white-bounce",
    name: "White Garden Bounce",
    category: "Inflatables",
    shortDescription: "A clean, camera-friendly classic for the young set.",
    description: "A crisp white inflatable with sculptural arches and a soft, modern profile. Built for joyful movement without overtaking the rest of your gathering.",
    price: 295,
    deposit: 125,
    capacity: "Ages 3–10",
    image: withBase("/images/marigold-bounce-house_c762631c.jpg"),
    featured: true,
    bookedDates: ["2026-08-22", "2026-08-29", "2026-09-13", "2026-09-20"],
    included: ["Inflatable blower", "Safety mat", "Stakes or weights"],
    setupNote: "Requires a level 15 × 15 ft outdoor area and nearby outlet."
  },
  {
    id: "rainbow-run",
    name: "Rainbow Run Obstacle",
    category: "Inflatables",
    shortDescription: "A bright, active centerpiece for a bigger kid crowd.",
    description: "A modular obstacle course with a cheerful, considered color range and plenty of forward motion for school events and birthday groups.",
    price: 430,
    deposit: 175,
    capacity: "Ages 5–12",
    image: withBase("/images/marigold-bounce-house_c762631c.jpg"),
    bookedDates: ["2026-08-23", "2026-09-06", "2026-09-19"],
    included: ["Inflatable blower", "Safety mat", "Stakes or weights"],
    setupNote: "Requires a level 15 × 35 ft outdoor area and nearby outlet."
  },
  {
    id: "ink-linen",
    name: "Ink Blue Linen",
    category: "Linens",
    shortDescription: "A deep blue table layer with a tailored drape.",
    description: "A floor-length navy linen for round or rectangle tables. It adds dimension and a sense of evening to a simple dining setup.",
    price: 22,
    deposit: 10,
    capacity: "90 × 132 in",
    image: withBase("/images/marigold-table-setting_660fd7a9.jpg"),
    bookedDates: ["2026-09-05", "2026-09-12"],
    included: ["Freshly laundered linen", "Protective transport bag"],
    setupNote: "Available in a quantity of 40."
  },
  {
    id: "fog-runner",
    name: "Fog Table Runner",
    category: "Linens",
    shortDescription: "A soft gray layer to bring a table together.",
    description: "A subtly textured gray runner that feels elevated but unfussy across harvest tables and service stations.",
    price: 12,
    deposit: 6,
    capacity: "14 × 108 in",
    image: withBase("/images/marigold-table-setting_660fd7a9.jpg"),
    bookedDates: ["2026-08-30", "2026-09-19"],
    included: ["Freshly laundered runner", "Protective transport bag"],
    setupNote: "Available in a quantity of 30."
  },
  {
    id: "photo-booth",
    name: "Open-Air Photo Booth",
    category: "Extras",
    shortDescription: "A candid corner with tangible takeaways.",
    description: "A refined, attendant-free photo booth with a clean backdrop, instant prints, and a digital gallery for guests. It earns its place without feeling like a gimmick.",
    price: 520,
    deposit: 200,
    capacity: "3-hour base rental",
    image: withBase("/images/marigold-photo-booth_12d81f3a.jpg"),
    featured: true,
    bookedDates: ["2026-08-29", "2026-09-12", "2026-09-26"],
    included: ["Backdrop", "Unlimited prints", "Digital gallery link"],
    setupNote: "Requires a 10 × 10 ft indoor or covered area and one outlet."
  },
  {
    id: "bistro-lights",
    name: "Bistro String Lights",
    category: "Extras",
    shortDescription: "The simple switch that changes the whole evening.",
    description: "Warm, commercial-grade string lighting installed overhead for patios, tents, and open-air dinners. Measured and planned to make an event comfortable after sunset.",
    price: 175,
    deposit: 75,
    capacity: "100 ft strand",
    image: withBase("/images/marigold-extras_ba359788.jpg"),
    bookedDates: ["2026-09-05", "2026-09-19"],
    included: ["One 100 ft strand", "Professional installation", "Power-cable planning"],
    setupNote: "Add multiple strands for broader coverage."
  },
  {
    id: "heaters",
    name: "Patio Heater",
    category: "Extras",
    shortDescription: "A steady pocket of warmth for cool evenings.",
    description: "A commercial patio heater that keeps transition-season outdoor events comfortable without filling the setup with visual noise.",
    price: 85,
    deposit: 65,
    capacity: "Propane included",
    image: withBase("/images/marigold-extras_ba359788.jpg"),
    bookedDates: ["2026-08-29", "2026-09-05"],
    included: ["Full propane tank", "Safety check", "Basic positioning"],
    setupNote: "Available in a quantity of 10."
  }
];

export const deliveryBands = [
  { label: "Within 10 miles", fee: 35 },
  { label: "10–20 miles", fee: 65 },
  { label: "20–35 miles", fee: 95 },
  { label: "35–50 miles", fee: 135 }
];

export function deliveryForZip(zip: string): { fee: number; label: string; valid: boolean } {
  const normalized = zip.replace(/\D/g, "");
  if (normalized.length !== 5) return { fee: 0, label: "Enter a five-digit ZIP to estimate delivery.", valid: false };
  const lastTwo = Number(normalized.slice(-2));
  if (lastTwo <= 24) return { fee: 35, label: "Within 10 miles", valid: true };
  if (lastTwo <= 49) return { fee: 65, label: "Estimated 10–20 miles", valid: true };
  if (lastTwo <= 74) return { fee: 95, label: "Estimated 20–35 miles", valid: true };
  return { fee: 135, label: "Estimated 35–50 miles", valid: true };
}

/** Local calendar key. Never derived from toISOString(), which shifts the day. */
export function dayKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function isAvailable(item: RentalItem, date: Date | undefined) {
  if (!date) return true;
  const dateKey = date.toISOString().slice(0, 10);
  return !item.bookedDates.includes(dateKey);
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}
