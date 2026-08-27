import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Lightbulb } from "lucide-react";
import { CROPS, MARKETS, getCrop, getMarket, getPriceHistory } from "@/data/mockData";
import { formatINR } from "@/lib/format";
import { PageHeader } from "@/components/PageHeader";
import { FilterPanel, FilterSelect } from "@/components/FilterPanel";
import { PriceChart } from "@/components/PriceChart";
import { PriceChange } from "@/components/PriceChange";
import { DemoNotice } from "@/components/DemoNotice";

export const Route = createFileRoute("/price-trends")({
  head: () => ({
    meta: [
      { title: "Crop Price Trends & Analytics — KisanMandi" },
      {
        name: "description",
        content:
          "Track 7-day, 30-day and 6-month crop price trends across mandis, with best-time-to-sell insights based on demo data.",
      },
      { property: "og:title", content: "Crop Price Trends — KisanMandi" },
      {
        property: "og:description",
        content: "Charts, highs, lows and estimated selling-window insights for Indian crops.",
      },
    ],
  }),
  component: PriceTrendsPage,
});

const RANGES = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "180", label: "Last 6 months" },
];

function PriceTrendsPage() {
  const [cropId, setCropId] = useState("wheat");
  const [marketId, setMarketId] = useState("prayagraj-mandi");
  const [range, setRange] = useState("30");

  const crop = getCrop(cropId) ?? CROPS[0]!;
  const market = getMarket(marketId) ?? MARKETS[0]!;
  const data = useMemo(
    () => getPriceHistory(cropId, marketId, Number(range)),
    [cropId, marketId, range],
  );

  const prices = data.map((d) => d.price);
  const current = prices[prices.length - 1] ?? 0;
  const first = prices[0] ?? 1;
  const high = Math.max(...prices);
  const low = Math.min(...prices);
  const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  const changePct = Math.round(((current - first) / first) * 1000) / 10;
  const rangeLabel = RANGES.find((r) => r.value === range)?.label.toLowerCase() ?? "";

  const sellNow = current >= avg;

  return (
    <>
      <PageHeader
        eyebrow="Analytics"
        title="Crop Price Trends"
        subtitle="Understand how your crop has moved so you can pick a better selling window."
      />

      <div className="section-shell space-y-6 py-10">
        <FilterPanel>
          <FilterSelect
            id="t-crop"
            label="Crop"
            value={cropId}
            onChange={setCropId}
            options={CROPS.map((c) => ({ value: c.id, label: `${c.emoji} ${c.name}` }))}
          />
          <FilterSelect
            id="t-market"
            label="Market"
            value={marketId}
            onChange={setMarketId}
            options={MARKETS.map((m) => ({ value: m.id, label: m.name }))}
          />
          <FilterSelect
            id="t-range"
            label="Time period"
            value={range}
            onChange={setRange}
            options={RANGES}
          />
        </FilterPanel>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "Current price", value: formatINR(current) },
            { label: "Highest price", value: formatINR(high) },
            { label: "Lowest price", value: formatINR(low) },
            { label: "Average price", value: formatINR(avg) },
          ].map((s) => (
            <div key={s.label} className="surface-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {s.label}
              </p>
              <p className="font-display text-2xl font-bold">{s.value}</p>
            </div>
          ))}
          <div className="surface-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Change
            </p>
            <PriceChange size="md" value={changePct} className="mt-1" />
          </div>
        </div>

        <section className="surface-card p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            {crop.emoji} {crop.name} Price Trend
          </h2>
          <p className="text-sm text-muted-foreground">
            ₹/Quintal · {market.name} · {rangeLabel}
          </p>
          <div className="mt-6">
            <PriceChart data={data} height={380} />
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="surface-card flex gap-4 p-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
              <Lightbulb className="size-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold">Insight</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {crop.name} prices {changePct >= 0 ? "increased" : "decreased"} by{" "}
                <strong className="text-foreground">{Math.abs(changePct).toFixed(1)}%</strong> at{" "}
                {market.name} over the {rangeLabel}. The average was {formatINR(avg)} with a high of{" "}
                {formatINR(high)}.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Estimated insight from demo data — not a guaranteed price.
              </p>
            </div>
          </div>

          <div className="surface-card flex gap-4 p-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-wheat/25 text-wheat-foreground">
              <CalendarClock className="size-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold">Best Time to Sell</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {sellNow
                  ? `Current price (${formatINR(current)}) is above the period average. Selling within the next 5–7 days looks favourable.`
                  : `Current price (${formatINR(current)}) is below the period average of ${formatINR(avg)}. Holding 2–3 weeks may help, if storage allows.`}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Recommendation is an estimated insight, not a guaranteed outcome.
              </p>
            </div>
          </div>
        </div>

        <DemoNotice />
      </div>
    </>
  );
}
