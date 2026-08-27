import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CROPS, DISTRICTS, MARKETS, STATES, getCrop, getPrice } from "@/data/mockData";
import { PageHeader } from "@/components/PageHeader";
import { FilterPanel, FilterSelect } from "@/components/FilterPanel";
import { PriceTable } from "@/components/PriceTable";
import { DemoNotice } from "@/components/DemoNotice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Search = { crop?: string; state?: string };

export const Route = createFileRoute("/market-prices")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    crop: typeof search.crop === "string" ? search.crop : undefined,
    state: typeof search.state === "string" ? search.state : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Compare Mandi Prices — KisanMandi" },
      {
        name: "description",
        content:
          "Compare min, max and modal crop prices across Indian mandis, sorted by best price, distance or profitability.",
      },
      { property: "og:title", content: "Compare Mandi Prices — KisanMandi" },
      {
        property: "og:description",
        content: "Side-by-side mandi price comparison for wheat, rice, onion, potato and more.",
      },
    ],
  }),
  component: MarketPricesPage,
});

const SORTS = [
  { value: "highest", label: "Highest price" },
  { value: "lowest", label: "Lowest price" },
  { value: "nearest", label: "Nearest market" },
  { value: "profit", label: "Most profitable (price − travel)" },
];

function MarketPricesPage() {
  const params = Route.useSearch();
  const [cropId, setCropId] = useState(params.crop ?? "wheat");
  const [state, setState] = useState(params.state ?? "all");
  const [district, setDistrict] = useState("all");
  const [marketId, setMarketId] = useState("all");
  const [sort, setSort] = useState("highest");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const crop = getCrop(cropId) ?? CROPS[0]!;

  const rows = useMemo(() => {
    let list = MARKETS.filter(
      (m) =>
        (state === "all" || m.state === state) &&
        (district === "all" || m.district === district) &&
        (marketId === "all" || m.id === marketId),
    );
    list = [...list].sort((a, b) => {
      const pa = getPrice(a, cropId).modal;
      const pb = getPrice(b, cropId).modal;
      if (sort === "lowest") return pa - pb;
      if (sort === "nearest") return a.distanceKm - b.distanceKm;
      if (sort === "profit") return pb - b.distanceKm * 1.5 - (pa - a.distanceKm * 1.5);
      return pb - pa;
    });
    return list;
  }, [cropId, state, district, marketId, sort]);

  const districts = state === "all" ? [] : (DISTRICTS[state] ?? []);
  const marketOptions = MARKETS.filter(
    (m) => (state === "all" || m.state === state) && (district === "all" || m.district === district),
  );

  return (
    <>
      <PageHeader
        eyebrow="Price comparison"
        title="Compare Mandi Prices"
        subtitle="Filter by crop and location to see where your harvest fetches the highest modal price today."
      />

      <div className="section-shell space-y-6 py-10">
        <FilterPanel>
          <FilterSelect
            id="f-crop"
            label="Crop"
            value={cropId}
            onChange={setCropId}
            options={CROPS.map((c) => ({ value: c.id, label: `${c.emoji} ${c.name}` }))}
          />
          <FilterSelect
            id="f-state"
            label="State"
            value={state}
            onChange={(v) => {
              setState(v);
              setDistrict("all");
              setMarketId("all");
            }}
            options={[
              { value: "all", label: "All states" },
              ...STATES.map((s) => ({ value: s, label: s })),
            ]}
          />
          <FilterSelect
            id="f-district"
            label="District"
            value={district}
            onChange={(v) => {
              setDistrict(v);
              setMarketId("all");
            }}
            options={[
              { value: "all", label: "All districts" },
              ...districts.map((d) => ({ value: d, label: d })),
            ]}
          />
          <FilterSelect
            id="f-market"
            label="Market"
            value={marketId}
            onChange={setMarketId}
            options={[
              { value: "all", label: "All markets" },
              ...marketOptions.map((m) => ({ value: m.id, label: m.name })),
            ]}
          />
          <div className="space-y-2">
            <Label htmlFor="f-date">Date</Label>
            <Input
              id="f-date"
              type="date"
              className="h-12"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </FilterPanel>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Showing <strong className="text-foreground">{rows.length}</strong> mandis for{" "}
            <strong className="text-foreground">
              {crop.emoji} {crop.name}
            </strong>{" "}
            · prices in ₹/quintal
          </p>
          <div className="w-full sm:w-64">
            <FilterSelect
              id="f-sort"
              label="Sort by"
              value={sort}
              onChange={setSort}
              options={SORTS}
            />
          </div>
        </div>

        <PriceTable markets={rows} cropId={cropId} cropName={crop.name} />
        <DemoNotice />
      </div>
    </>
  );
}
