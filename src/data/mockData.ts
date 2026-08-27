/**
 * Demo data layer for KisanMandi.
 *
 * Everything here is mock data shaped like a real API response so it can be
 * swapped for a Node/Express backend or Agmarknet / e-NAM feed later:
 * replace the functions at the bottom with fetch() calls returning the same types.
 */

export type Crop = {
  id: string;
  name: string;
  hindi: string;
  emoji: string;
  category: string;
  avgPrice: number; // Rs per quintal
  changePct: number;
  unit: string;
};

export type MarketPrice = {
  cropId: string;
  min: number;
  max: number;
  modal: number;
  changePct: number;
};

export type Market = {
  id: string;
  name: string;
  state: string;
  district: string;
  address: string;
  distanceKm: number;
  buyers: number;
  hours: string;
  facilities: string[];
  prices: MarketPrice[];
};

export type Listing = {
  id: string;
  cropId: string;
  cropName: string;
  emoji: string;
  variety: string;
  quantity: number;
  unit: string;
  price: number;
  location: string;
  state: string;
  harvestDate: string;
  quality: "A Grade" | "B Grade" | "Organic";
  farmer: { name: string; phone: string; since: number; rating: number };
  description: string;
  status: "Active" | "Sold" | "Pending";
  listedOn: string;
};

export const CROPS: Crop[] = [
  { id: "wheat", name: "Wheat", hindi: "गेहूँ", emoji: "🌾", category: "Cereal", avgPrice: 2380, changePct: 3.2, unit: "₹/quintal" },
  { id: "rice", name: "Rice", hindi: "चावल", emoji: "🍚", category: "Cereal", avgPrice: 3120, changePct: 1.4, unit: "₹/quintal" },
  { id: "potato", name: "Potato", hindi: "आलू", emoji: "🥔", category: "Vegetable", avgPrice: 1280, changePct: -2.6, unit: "₹/quintal" },
  { id: "onion", name: "Onion", hindi: "प्याज़", emoji: "🧅", category: "Vegetable", avgPrice: 1840, changePct: 6.1, unit: "₹/quintal" },
  { id: "tomato", name: "Tomato", hindi: "टमाटर", emoji: "🍅", category: "Vegetable", avgPrice: 2260, changePct: -4.8, unit: "₹/quintal" },
  { id: "maize", name: "Maize", hindi: "मक्का", emoji: "🌽", category: "Cereal", avgPrice: 2090, changePct: 0, unit: "₹/quintal" },
  { id: "mustard", name: "Mustard", hindi: "सरसों", emoji: "🌱", category: "Oilseed", avgPrice: 5480, changePct: 2.1, unit: "₹/quintal" },
  { id: "cotton", name: "Cotton", hindi: "कपास", emoji: "☁️", category: "Fibre", avgPrice: 7320, changePct: 1.9, unit: "₹/quintal" },
  { id: "soybean", name: "Soybean", hindi: "सोयाबीन", emoji: "🫘", category: "Oilseed", avgPrice: 4640, changePct: -1.1, unit: "₹/quintal" },
  { id: "sugarcane", name: "Sugarcane", hindi: "गन्ना", emoji: "🎋", category: "Cash Crop", avgPrice: 385, changePct: 0.6, unit: "₹/quintal" },
];

export const STATES = [
  "Uttar Pradesh",
  "Madhya Pradesh",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Bihar",
];

export const DISTRICTS: Record<string, string[]> = {
  "Uttar Pradesh": ["Prayagraj", "Kanpur Nagar", "Lucknow", "Varanasi"],
  "Madhya Pradesh": ["Indore", "Bhopal"],
  Maharashtra: ["Nashik", "Pune"],
  Punjab: ["Ludhiana", "Amritsar"],
  Rajasthan: ["Kota", "Jaipur"],
  Bihar: ["Patna", "Muzaffarpur"],
};

/** Deterministic pseudo-random so SSR and client render identically. */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

type MarketSeed = {
  id: string;
  name: string;
  state: string;
  district: string;
  address: string;
  distanceKm: number;
  buyers: number;
  hours: string;
  facilities: string[];
  bias: number;
};

const MARKET_SEEDS: MarketSeed[] = [
  { id: "prayagraj-mandi", name: "Prayagraj Mandi", state: "Uttar Pradesh", district: "Prayagraj", address: "Mundera Mandi Samiti, Prayagraj, UP 211011", distanceKm: 12, buyers: 48, hours: "6:00 AM – 6:00 PM", facilities: ["Weighbridge", "Cold Storage", "Loading Bay", "Canteen", "Parking"], bias: 1.0 },
  { id: "kanpur-mandi", name: "Kanpur Grain Mandi", state: "Uttar Pradesh", district: "Kanpur Nagar", address: "Naubasta Krishi Utpadan Mandi, Kanpur, UP 208021", distanceKm: 85, buyers: 63, hours: "5:30 AM – 7:00 PM", facilities: ["Weighbridge", "Auction Hall", "Bank Branch", "Parking"], bias: 1.031 },
  { id: "lucknow-mandi", name: "Lucknow Navin Mandi", state: "Uttar Pradesh", district: "Lucknow", address: "Navin Galla Mandi, Sitapur Road, Lucknow, UP 226021", distanceKm: 120, buyers: 71, hours: "6:00 AM – 8:00 PM", facilities: ["Cold Storage", "Grading Unit", "Weighbridge", "Rest House", "e-NAM Counter"], bias: 1.048 },
  { id: "varanasi-mandi", name: "Varanasi Pahadia Mandi", state: "Uttar Pradesh", district: "Varanasi", address: "Pahadia Mandi, Varanasi, UP 221002", distanceKm: 132, buyers: 39, hours: "6:00 AM – 5:00 PM", facilities: ["Weighbridge", "Loading Bay", "Parking"], bias: 0.982 },
  { id: "indore-mandi", name: "Indore Choithram Mandi", state: "Madhya Pradesh", district: "Indore", address: "Choithram Sabzi Mandi, Indore, MP 452001", distanceKm: 486, buyers: 88, hours: "5:00 AM – 8:00 PM", facilities: ["Cold Storage", "Grading Unit", "e-NAM Counter", "Canteen"], bias: 1.021 },
  { id: "nashik-mandi", name: "Nashik APMC", state: "Maharashtra", district: "Nashik", address: "Lasalgaon APMC, Nashik, MH 422306", distanceKm: 1042, buyers: 96, hours: "7:00 AM – 6:00 PM", facilities: ["Auction Hall", "Cold Storage", "Weighbridge", "Export Desk"], bias: 1.064 },
  { id: "ludhiana-mandi", name: "Ludhiana Grain Market", state: "Punjab", district: "Ludhiana", address: "Jagraon Bridge Mandi, Ludhiana, PB 141008", distanceKm: 774, buyers: 57, hours: "6:00 AM – 7:00 PM", facilities: ["Weighbridge", "Bank Branch", "Loading Bay"], bias: 1.038 },
  { id: "kota-mandi", name: "Kota Bhamashah Mandi", state: "Rajasthan", district: "Kota", address: "Bhamashah Krishi Upaj Mandi, Kota, RJ 324007", distanceKm: 612, buyers: 44, hours: "6:30 AM – 6:00 PM", facilities: ["Weighbridge", "Auction Hall", "Parking"], bias: 0.994 },
  { id: "patna-mandi", name: "Patna Mithapur Mandi", state: "Bihar", district: "Patna", address: "Mithapur Mandi, Patna, BR 800001", distanceKm: 402, buyers: 35, hours: "6:00 AM – 5:30 PM", facilities: ["Loading Bay", "Canteen", "Parking"], bias: 0.968 },
];

export const MARKETS: Market[] = MARKET_SEEDS.map((m) => {
  const rand = seeded(m.id);
  return {
    ...m,
    prices: CROPS.map((c) => {
      const modal = Math.round((c.avgPrice * m.bias * (0.96 + rand() * 0.08)) / 5) * 5;
      return {
        cropId: c.id,
        modal,
        min: Math.round((modal * (0.92 - rand() * 0.02)) / 5) * 5,
        max: Math.round((modal * (1.05 + rand() * 0.03)) / 5) * 5,
        changePct: Math.round((rand() * 12 - 5) * 10) / 10,
      };
    }),
  };
});

export function getMarket(id: string) {
  return MARKETS.find((m) => m.id === id);
}

export function getCrop(id: string) {
  return CROPS.find((c) => c.id === id);
}

export function getPrice(market: Market, cropId: string) {
  return market.prices.find((p) => p.cropId === cropId) ?? market.prices[0];
}

export type PricePoint = { date: string; price: number };

/** Historical series generator — replace with a real time-series endpoint later. */
export function getPriceHistory(cropId: string, marketId: string, days: number): PricePoint[] {
  const crop = getCrop(cropId) ?? CROPS[0];
  const market = getMarket(marketId) ?? MARKETS[0];
  const base = getPrice(market, cropId).modal;
  const rand = seeded(`${cropId}-${marketId}-${days}`);
  const points = days <= 7 ? 7 : days <= 30 ? 30 : 24;
  const stepDays = days <= 30 ? 1 : 7;
  const out: PricePoint[] = [];
  let value = base * (0.9 + rand() * 0.06);
  for (let i = points - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i * stepDays);
    value = value * (1 + (rand() - 0.44) * 0.035);
    out.push({
      date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
      price: Math.max(Math.round(value / 5) * 5, Math.round(crop.avgPrice * 0.5)),
    });
  }
  out[out.length - 1] = { ...out[out.length - 1], price: base };
  return out;
}

export const LISTINGS: Listing[] = [
  { id: "l-1001", cropId: "wheat", cropName: "Wheat", emoji: "🌾", variety: "HD-2967", quantity: 120, unit: "Quintal", price: 2420, location: "Prayagraj, Uttar Pradesh", state: "Uttar Pradesh", harvestDate: "2026-04-12", quality: "A Grade", farmer: { name: "Ramesh Yadav", phone: "+91 98xxx 41220", since: 2019, rating: 4.7 }, description: "Clean, machine-threshed wheat with low moisture. Stored in jute bags at the farm godown.", status: "Active", listedOn: "2026-08-14" },
  { id: "l-1002", cropId: "onion", cropName: "Onion", emoji: "🧅", variety: "Nashik Red", quantity: 300, unit: "Quintal", price: 1920, location: "Nashik, Maharashtra", state: "Maharashtra", harvestDate: "2026-06-02", quality: "A Grade", farmer: { name: "Sunita Patil", phone: "+91 97xxx 88104", since: 2016, rating: 4.9 }, description: "Export-grade red onion, 45–60mm size, cured and graded.", status: "Active", listedOn: "2026-08-18" },
  { id: "l-1003", cropId: "potato", cropName: "Potato", emoji: "🥔", variety: "Kufri Jyoti", quantity: 210, unit: "Quintal", price: 1310, location: "Kanpur Nagar, Uttar Pradesh", state: "Uttar Pradesh", harvestDate: "2026-03-08", quality: "B Grade", farmer: { name: "Dinesh Kushwaha", phone: "+91 96xxx 55129", since: 2021, rating: 4.3 }, description: "Cold-store lifted potato, uniform size, suitable for chips and table use.", status: "Active", listedOn: "2026-08-11" },
  { id: "l-1004", cropId: "mustard", cropName: "Mustard", emoji: "🌱", variety: "Pusa Bold", quantity: 65, unit: "Quintal", price: 5650, location: "Kota, Rajasthan", state: "Rajasthan", harvestDate: "2026-03-25", quality: "Organic", farmer: { name: "Bhanwar Lal Meena", phone: "+91 94xxx 30217", since: 2014, rating: 4.8 }, description: "Certified organic mustard with 40%+ oil content. No chemical inputs used.", status: "Active", listedOn: "2026-08-20" },
  { id: "l-1005", cropId: "rice", cropName: "Rice", emoji: "🍚", variety: "Pusa Basmati 1121", quantity: 180, unit: "Quintal", price: 3350, location: "Ludhiana, Punjab", state: "Punjab", harvestDate: "2025-11-04", quality: "A Grade", farmer: { name: "Gurpreet Singh", phone: "+91 99xxx 76510", since: 2012, rating: 4.6 }, description: "Long-grain basmati paddy, sun-dried, moisture under 14%.", status: "Sold", listedOn: "2026-07-29" },
  { id: "l-1006", cropId: "tomato", cropName: "Tomato", emoji: "🍅", variety: "Abhinav Hybrid", quantity: 90, unit: "Quintal", price: 2180, location: "Indore, Madhya Pradesh", state: "Madhya Pradesh", harvestDate: "2026-07-19", quality: "B Grade", farmer: { name: "Kavita Verma", phone: "+91 93xxx 12440", since: 2020, rating: 4.4 }, description: "Firm hybrid tomatoes, crated and ready for immediate pickup.", status: "Pending", listedOn: "2026-08-22" },
  { id: "l-1007", cropId: "soybean", cropName: "Soybean", emoji: "🫘", variety: "JS-9560", quantity: 140, unit: "Quintal", price: 4720, location: "Indore, Madhya Pradesh", state: "Madhya Pradesh", harvestDate: "2025-10-18", quality: "A Grade", farmer: { name: "Mahesh Patidar", phone: "+91 90xxx 66388", since: 2017, rating: 4.5 }, description: "Well-cleaned soybean lot, low foreign matter, ready for crushing units.", status: "Active", listedOn: "2026-08-06" },
  { id: "l-1008", cropId: "cotton", cropName: "Cotton", emoji: "☁️", variety: "Shankar-6", quantity: 75, unit: "Quintal", price: 7480, location: "Nashik, Maharashtra", state: "Maharashtra", harvestDate: "2025-12-30", quality: "A Grade", farmer: { name: "Anil Deshmukh", phone: "+91 95xxx 20714", since: 2015, rating: 4.7 }, description: "Hand-picked cotton, 29mm staple length, minimal trash content.", status: "Active", listedOn: "2026-08-02" },
];

export function getListing(id: string) {
  return LISTINGS.find((l) => l.id === id);
}

export const PRICE_ALERTS = [
  { id: "a1", cropId: "wheat", marketId: "prayagraj-mandi", text: "Wheat price in Prayagraj Mandi increased by 6% today.", tone: "up" as const },
  { id: "a2", cropId: "onion", marketId: "nashik-mandi", text: "Onion price in Nashik APMC is at a 30-day high.", tone: "up" as const },
  { id: "a3", cropId: "potato", marketId: "kanpur-mandi", text: "Potato price in Kanpur Grain Mandi fell by 2.6% this week.", tone: "down" as const },
];

export const DEMO_DISCLAIMER =
  "Demo data — connect to a live mandi/Agmarknet/e-NAM data source for real prices.";
