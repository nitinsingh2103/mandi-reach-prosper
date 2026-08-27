import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  BadgeIndianRupee,
  BarChart3,
  Handshake,
  LineChart,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";
import heroImage from "@/assets/hero-farmer.jpg";
import { CROPS, DISTRICTS, MARKETS, STATES } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CropCard } from "@/components/CropCard";
import { DemoNotice } from "@/components/DemoNotice";
import { ProfitCalculator } from "@/components/ProfitCalculator";
import { MarketCard } from "@/components/MarketCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KisanMandi — Compare Mandi Prices & Sell Crops Online" },
      {
        name: "description",
        content:
          "Compare live-style mandi prices across local markets, track crop price trends and sell your harvest directly to buyers on KisanMandi.",
      },
      { property: "og:title", content: "KisanMandi — Sell Your Crops at the Best Market Price" },
      {
        property: "og:description",
        content:
          "Compare prices across local mandis, find the best buyers and make better selling decisions.",
      },
    ],
  }),
  component: HomePage,
});

const STEPS = [
  { icon: Search, title: "Select Your Crop", text: "Pick the crop, state and district you harvest in." },
  { icon: BarChart3, title: "Compare Local Markets", text: "See min, max and modal prices side by side." },
  { icon: BadgeIndianRupee, title: "Find the Best Price", text: "Best-price badge shows where you earn most." },
  { icon: Handshake, title: "Sell Your Crop", text: "List your produce and connect with verified buyers." },
];

const FEATURES = [
  { icon: BarChart3, title: "Mandi price comparison", text: "Compare min, max and modal rates across nearby mandis in one table." },
  { icon: MapPin, title: "Nearby market discovery", text: "Find the closest mandis with distance, buyers and facilities." },
  { icon: LineChart, title: "Historical price trends", text: "7-day, 30-day and 6-month charts to time your sale." },
  { icon: Store, title: "Direct crop selling", text: "List your harvest and let buyers reach you directly." },
  { icon: ShieldCheck, title: "Transparent pricing", text: "No hidden commissions — you see exactly what mandis quote." },
  { icon: Sparkles, title: "Easy to use", text: "Large text, clear buttons and a layout built for the field." },
];

function HomePage() {
  const navigate = useNavigate();
  const [crop, setCrop] = useState("wheat");
  const [state, setState] = useState("Uttar Pradesh");
  const [district, setDistrict] = useState("Prayagraj");
  const [market, setMarket] = useState("all");

  const districts = DISTRICTS[state] ?? [];
  const marketsInDistrict = MARKETS.filter((m) => m.state === state);

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient">
        <div className="section-shell grid items-center gap-12 py-14 md:py-20 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-secondary-foreground">
              <Truck className="size-3.5" /> 9 mandis · 10 crops · daily updates
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] md:text-6xl">
              Sell Your Crops at the <span className="text-primary">Best Market Price</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Compare prices across local mandis, find the best buyers, and make better selling
              decisions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="hero" size="xl" asChild>
                <Link to="/market-prices" search={{ crop }}>
                  <BarChart3 /> Compare Mandi Prices
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/sell">
                  <Store /> Sell Your Crop
                </Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              {[
                { k: "9", v: "Mandis tracked" },
                { k: "10", v: "Crops covered" },
                { k: "₹0", v: "Listing fee" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-2xl font-bold text-primary">{s.k}</dt>
                  <dd className="text-xs text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Indian farmer holding freshly harvested wheat grain in a green field"
              width={1600}
              height={1104}
              className="w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]"
            />
            <div className="surface-card absolute -bottom-6 left-4 hidden w-56 p-4 sm:block">
              <p className="text-xs font-semibold text-muted-foreground">Today · Wheat</p>
              <p className="font-display text-2xl font-bold text-primary">₹2,450</p>
              <p className="text-xs text-muted-foreground">Lucknow Navin Mandi · best of 9</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick price search */}
      <section className="section-shell -mt-2 py-12">
        <div className="surface-card p-6 md:p-8">
          <h2 className="text-2xl font-bold md:text-3xl">Check Today's Mandi Prices</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose your crop and location to jump straight into the comparison table.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-5">
            <div className="space-y-2">
              <Label htmlFor="q-crop">Select Crop</Label>
              <Select value={crop} onValueChange={setCrop}>
                <SelectTrigger id="q-crop" className="h-12 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CROPS.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.emoji} {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="q-state">Select State</Label>
              <Select
                value={state}
                onValueChange={(v) => {
                  setState(v);
                  setDistrict(DISTRICTS[v]?.[0] ?? "");
                  setMarket("all");
                }}
              >
                <SelectTrigger id="q-state" className="h-12 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="q-district">Select District</Label>
              <Select value={district} onValueChange={setDistrict}>
                <SelectTrigger id="q-district" className="h-12 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="q-market">Select Market</Label>
              <Select value={market} onValueChange={setMarket}>
                <SelectTrigger id="q-market" className="h-12 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All markets</SelectItem>
                  {marketsInDistrict.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant="hero"
                size="lg"
                className="h-12 w-full"
                onClick={() => {
                  if (market !== "all") {
                    navigate({ to: "/market/$id", params: { id: market }, search: { crop } });
                  } else {
                    navigate({ to: "/market-prices", search: { crop, state } });
                  }
                }}
              >
                <Search /> Search Prices
              </Button>
            </div>
          </div>

          <DemoNotice className="mt-6" />
        </div>
      </section>

      {/* Popular crops */}
      <section className="section-shell py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Popular Crops</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Average modal price across all tracked mandis, in ₹/quintal.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/market-prices" search={{ crop }}>
              See all prices
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CROPS.slice(0, 8).map((c) => (
            <CropCard key={c.id} crop={c} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/40 py-16">
        <div className="section-shell">
          <h2 className="text-2xl font-bold md:text-3xl">How It Works</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Four simple steps from harvest to a better price.
          </p>
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="surface-card p-6">
                <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
                  <s.icon className="size-5" />
                </span>
                <p className="mt-4 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Nearby markets */}
      <section className="section-shell py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Mandis Near You</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Demo location: Prayagraj, Uttar Pradesh. Browser geolocation can be plugged in later.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/market-prices" search={{ crop }}>
              Compare all mandis
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[...MARKETS]
            .sort((a, b) => a.distanceKm - b.distanceKm)
            .slice(0, 3)
            .map((m, i) => (
              <MarketCard key={m.id} market={m} cropId={crop} best={i === 2} />
            ))}
        </div>
      </section>

      {/* Calculator */}
      <section className="section-shell pb-16">
        <ProfitCalculator defaultCrop={crop} />
      </section>

      {/* Why */}
      <section className="section-shell pb-4">
        <h2 className="text-2xl font-bold md:text-3xl">Why KisanMandi?</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="surface-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-primary">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="rounded-3xl bg-primary px-8 py-14 text-center text-primary-foreground shadow-[var(--shadow-lift)]">
          <h2 className="text-3xl font-bold md:text-4xl">Ready to get a better price?</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-90">
            Create a free farmer account, list your crop and start comparing mandis today.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="wheat" size="xl" asChild>
              <Link to="/signup">Create Free Account</Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/marketplace">Browse Marketplace</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
