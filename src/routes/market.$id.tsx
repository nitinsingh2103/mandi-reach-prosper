import { useState } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { CheckCircle2, Clock, MapPin, Navigation, Users } from "lucide-react";
import { toast } from "sonner";
import { CROPS, getCrop, getMarket, getPrice, getPriceHistory } from "@/data/mockData";
import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { PriceChange } from "@/components/PriceChange";
import { PriceChart } from "@/components/PriceChart";
import { DemoNotice } from "@/components/DemoNotice";
import { FilterSelect } from "@/components/FilterPanel";

type Search = { crop?: string };

export const Route = createFileRoute("/market/$id")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    crop: typeof search.crop === "string" ? search.crop : undefined,
  }),
  loader: ({ params }) => {
    const market = getMarket(params.id);
    if (!market) throw notFound();
    return { name: market.name, district: market.district, state: market.state };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Market unavailable — KisanMandi" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.name} Prices — KisanMandi`;
    const description = `Today's crop prices, facilities and price trends for ${loaderData.name}, ${loaderData.district}, ${loaderData.state}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: MarketDetailsPage,
});

const RANGES = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "180", label: "Last 6 months" },
];

function MarketDetailsPage() {
  const { id } = Route.useParams();
  const search = Route.useSearch();
  const market = getMarket(id)!;
  const [cropId, setCropId] = useState(search.crop ?? "wheat");
  const [range, setRange] = useState("30");

  const crop = getCrop(cropId) ?? CROPS[0]!;
  const price = getPrice(market, cropId);
  const history = getPriceHistory(cropId, market.id, Number(range));

  return (
    <div className="section-shell space-y-8 py-10">
      <Link
        to="/market-prices"
        search={{ crop: cropId }}
        className="inline-flex text-sm font-semibold text-primary hover:underline"
      >
        ← Back to price comparison
      </Link>

      <header className="surface-card flex flex-col gap-6 p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">{market.name}</h1>
          <p className="mt-2 flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-4" /> {market.address}
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Navigation className="size-4" /> {market.distanceKm} km away
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-4" /> {market.buyers} active buyers
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" /> {market.hours}
            </span>
          </div>
        </div>
        <Button
          variant="hero"
          size="xl"
          onClick={() => toast.success(`Selling request sent to ${market.name}. A buyer will call you.`)}
        >
          Sell Here
        </Button>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Today's modal price", value: formatINR(price.modal), accent: true },
          { label: "Minimum price", value: formatINR(price.min) },
          { label: "Maximum price", value: formatINR(price.max) },
          { label: "Registered buyers", value: String(market.buyers) },
        ].map((s) => (
          <div key={s.label} className="surface-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {s.label}
            </p>
            <p
              className={`font-display text-2xl font-bold ${s.accent ? "text-primary" : "text-foreground"}`}
            >
              {s.value}
            </p>
            {s.accent && <PriceChange className="mt-1" value={price.changePct} />}
          </div>
        ))}
      </div>

      <section className="surface-card p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              {crop.emoji} {crop.name} price trend
            </h2>
            <p className="text-sm text-muted-foreground">₹/Quintal at {market.name}</p>
          </div>
          <div className="grid w-full gap-3 sm:w-auto sm:grid-cols-2">
            <FilterSelect
              id="m-crop"
              label="Crop"
              value={cropId}
              onChange={setCropId}
              options={CROPS.map((c) => ({ value: c.id, label: `${c.emoji} ${c.name}` }))}
            />
            <FilterSelect
              id="m-range"
              label="Period"
              value={range}
              onChange={setRange}
              options={RANGES}
            />
          </div>
        </div>
        <div className="mt-6">
          <PriceChart data={history} />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="surface-card p-6 md:p-8">
          <h2 className="text-xl font-bold">Available facilities</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {market.facilities.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="size-4 text-primary" /> {f}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            Opening hours: <strong className="text-foreground">{market.hours}</strong>
          </p>
        </section>

        <section className="surface-card p-6 md:p-8">
          <h2 className="text-xl font-bold">All crop prices here today</h2>
          <ul className="mt-4 divide-y divide-border">
            {market.prices.map((p) => {
              const c = getCrop(p.cropId)!;
              return (
                <li key={p.cropId} className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium">
                    {c.emoji} {c.name}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="font-semibold">{formatINR(p.modal)}</span>
                    <PriceChange value={p.changePct} />
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <DemoNotice />
    </div>
  );
}
