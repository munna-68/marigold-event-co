import { dayKey, inventory, type RentalItem } from "@/lib/catalog";

export type BundleLine = { itemId: string; quantity: number };

export type Bundle = {
  id: string;
  name: string;
  summary: string;
  fits: string;
  lines: BundleLine[];
};

export const bundles: Bundle[] = [
  {
    id: "garden-dinner",
    name: "Backyard dinner",
    summary: "Cover, a long table, and the light that changes the evening.",
    fits: "Around 20 seated",
    lines: [
      { itemId: "frame-20x20", quantity: 1 },
      { itemId: "farm-table", quantity: 2 },
      { itemId: "bistro-chair", quantity: 16 },
      { itemId: "fog-runner", quantity: 2 },
      { itemId: "bistro-lights", quantity: 1 }
    ]
  },
  {
    id: "birthday-bash",
    name: "Birthday party",
    summary: "The active centerpiece plus a table that holds the cake.",
    fits: "Ages 3–10, around 20 guests",
    lines: [
      { itemId: "white-bounce", quantity: 1 },
      { itemId: "farm-table", quantity: 1 },
      { itemId: "bistro-chair", quantity: 8 },
      { itemId: "ink-linen", quantity: 1 }
    ]
  },
  {
    id: "open-air-reception",
    name: "Open-air reception",
    summary: "The full-length version, from seating to the candid corner.",
    fits: "Up to 48 seated",
    lines: [
      { itemId: "sailcloth-20x30", quantity: 1 },
      { itemId: "farm-table", quantity: 5 },
      { itemId: "crossback-chair", quantity: 40 },
      { itemId: "photo-booth", quantity: 1 },
      { itemId: "bistro-lights", quantity: 2 }
    ]
  },
  {
    id: "field-day",
    name: "School field day",
    summary: "Two inflatables that keep a large group moving.",
    fits: "Ages 5–12, larger groups",
    lines: [
      { itemId: "rainbow-run", quantity: 1 },
      { itemId: "white-bounce", quantity: 1 },
      { itemId: "heaters", quantity: 2 }
    ]
  }
];

export type PlannerAnswers = {
  occasion: OccasionId;
  guests: GuestId;
  setting: SettingId;
  extras: ExtraId[];
};

export type OccasionId = "backyard-dinner" | "birthday" | "reception" | "open-house" | "school";
export type GuestId = "under-25" | "25-50" | "50-100" | "100-plus";
export type SettingId = "outdoors" | "indoors" | "not-sure";
export type ExtraId = "lighting" | "photo" | "seating" | "linens" | "play";

export type Recommendation = { item: RentalItem; quantity: number; reason: string };

export const occasionOptions: { id: OccasionId; label: string; detail: string }[] = [
  { id: "backyard-dinner", label: "Backyard dinner", detail: "A long table, low light, people staying late." },
  { id: "birthday", label: "Birthday party", detail: "Something for the kids to run at." },
  { id: "reception", label: "Open-air reception", detail: "Seated guests, speeches, a candid corner." },
  { id: "open-house", label: "Open house", detail: "Standing room and a table that holds it together." },
  { id: "school", label: "School or community event", detail: "High traffic, a wide age range." }
];

export const guestOptions: { id: GuestId; label: string; seated: number }[] = [
  { id: "under-25", label: "Up to 25", seated: 20 },
  { id: "25-50", label: "25–50", seated: 40 },
  { id: "50-100", label: "50–100", seated: 80 },
  { id: "100-plus", label: "100 or more", seated: 120 }
];

export const settingOptions: { id: SettingId; label: string; detail: string }[] = [
  { id: "outdoors", label: "Outdoors", detail: "Lawn, patio, driveway, field." },
  { id: "indoors", label: "Indoors", detail: "Hall, garage, covered space." },
  { id: "not-sure", label: "Still deciding", detail: "We will keep the cover option open." }
];

export const extraOptions: { id: ExtraId; label: string }[] = [
  { id: "lighting", label: "Warm lighting" },
  { id: "photo", label: "Photo booth" },
  { id: "seating", label: "Extra seating" },
  { id: "linens", label: "Linens" },
  { id: "play", label: "Inflatables" }
];

const byId = new Map(inventory.map((item) => [item.id, item]));

export function itemFor(id: string): RentalItem | undefined {
  return byId.get(id);
}

export function linesFor(bundle: Bundle) {
  return bundle.lines
    .map((line) => ({ item: byId.get(line.itemId), quantity: line.quantity }))
    .filter((line): line is { item: RentalItem; quantity: number } => Boolean(line.item));
}

export function bundleTotals(bundle: Bundle) {
  return linesFor(bundle).reduce(
    (totals, line) => ({
      rental: totals.rental + line.item.price * line.quantity,
      deposit: totals.deposit + line.item.deposit * line.quantity,
      units: totals.units + line.quantity
    }),
    { rental: 0, deposit: 0, units: 0 }
  );
}

/** Deterministic and explainable: every line carries the reason it was chosen. */
export function recommend(answers: PlannerAnswers): Recommendation[] {
  const seated = guestOptions.find((option) => option.id === answers.guests)?.seated ?? 40;
  const covered = answers.setting !== "indoors";
  const recommendation: Recommendation[] = [];
  const push = (id: string, quantity: number, reason: string) => {
    const item = byId.get(id);
    if (item && quantity > 0) recommendation.push({ item, quantity, reason });
  };

  if (covered) {
    if (seated <= 32) push("frame-20x20", 1, "Cover for a smaller seated group");
    else push("sailcloth-20x30", 1, "Cover that keeps a larger group in one room");
  }

  const tables = Math.max(1, Math.ceil(seated / 9));
  const dressy = answers.occasion === "reception";
  push("farm-table", tables, `${tables} table${tables === 1 ? "" : "s"} at roughly nine guests each`);
  push(dressy ? "crossback-chair" : "bistro-chair", seated, `Seating for ${seated}`);

  if (answers.extras.includes("linens") || dressy) {
    push("ink-linen", tables, "A layer that pulls the tables together");
  }
  if (answers.extras.includes("lighting") || answers.occasion === "backyard-dinner" || dressy) {
    push("bistro-lights", covered ? 2 : 1, "The switch that changes the evening");
  }
  if (answers.extras.includes("photo") || dressy) {
    push("photo-booth", 1, "A candid corner with takeaway prints");
  }
  if (answers.extras.includes("play") || answers.occasion === "birthday") {
    push("white-bounce", 1, "The active centerpiece for the young set");
  }
  if (answers.occasion === "school") {
    push("rainbow-run", 1, "Forward motion for a wide age range");
  }
  if (answers.extras.includes("seating") && !dressy) {
    push("crossback-chair", Math.round(seated * 0.25), "A dressier seat for part of the room");
  }
  if (covered && (answers.occasion === "open-house" || dressy)) {
    push("heaters", 2, "Steady warmth once the sun drops");
  }

  return recommendation.reverse();
}

export function recommendationTotals(recommendation: Recommendation[]) {
  return recommendation.reduce(
    (totals, line) => ({
      rental: totals.rental + line.item.price * line.quantity,
      deposit: totals.deposit + line.item.deposit * line.quantity,
      units: totals.units + line.quantity
    }),
    { rental: 0, deposit: 0, units: 0 }
  );
}

/** Real numbers pulled from the catalog, so the "live" indicator never invents activity. */
export function bookedDateSummary(daysAhead = 45) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const limit = new Date(today);
  limit.setDate(limit.getDate() + daysAhead);
  const limitKey = dayKey(limit);
  const todayKey = dayKey(today);

  let dates = 0;
  const names = new Set<string>();
  for (const item of inventory) {
    for (const booked of item.bookedDates) {
      if (booked >= todayKey && booked <= limitKey) {
        dates += 1;
        names.add(item.name);
      }
    }
  }
  return { dates, items: names.size, daysAhead };
}
