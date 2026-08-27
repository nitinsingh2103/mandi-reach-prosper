import { Link } from "@tanstack/react-router";
import type { Market } from "@/data/mockData";
import { getPrice } from "@/data/mockData";
import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { BestPriceBadge, PriceChange } from "@/components/PriceChange";
import { cn } from "@/lib/utils";

export function PriceTable({
  markets,
  cropId,
  cropName,
}: {
  markets: Market[];
  cropId: string;
  cropName: string;
}) {
  const bestId = markets.reduce<{ id: string; modal: number }>(
    (acc, m) => {
      const modal = getPrice(m, cropId).modal;
      return modal > acc.modal ? { id: m.id, modal } : acc;
    },
    { id: "", modal: -1 },
  ).id;

  if (markets.length === 0) {
    return (
      <div className="surface-card p-10 text-center">
        <p className="text-lg font-semibold">No markets match your filters</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try widening the state or district selection.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="surface-card hidden overflow-hidden md:block">
        <table className="w-full border-collapse text-left">
          <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-4 font-bold">Market</th>
              <th className="px-5 py-4 font-bold">Crop</th>
              <th className="px-5 py-4 font-bold">Min Price</th>
              <th className="px-5 py-4 font-bold">Max Price</th>
              <th className="px-5 py-4 font-bold">Modal Price</th>
              <th className="px-5 py-4 font-bold">Distance</th>
              <th className="px-5 py-4 font-bold"></th>
            </tr>
          </thead>
          <tbody>
            {markets.map((m) => {
              const p = getPrice(m, cropId);
              const isBest = m.id === bestId;
              return (
                <tr
                  key={m.id}
                  className={cn(
                    "border-t border-border transition-colors hover:bg-secondary/40",
                    isBest && "bg-success/6",
                  )}
                >
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{m.name}</span>
                      {isBest && <BestPriceBadge />}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {m.district}, {m.state}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm">{cropName}</td>
                  <td className="px-5 py-4 text-sm">{formatINR(p.min)}</td>
                  <td className="px-5 py-4 text-sm">{formatINR(p.max)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-base font-bold text-primary">
                        {formatINR(p.modal)}
                      </span>
                      <PriceChange value={p.changePct} />
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm">{m.distanceKm} km</td>
                  <td className="px-5 py-4">
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/market/$id" params={{ id: m.id }} search={{ crop: cropId }}>
                        View Market Details
                      </Link>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-4 md:hidden">
        {markets.map((m) => {
          const p = getPrice(m, cropId);
          const isBest = m.id === bestId;
          return (
            <div key={m.id} className="surface-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold">{m.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {m.district} · {m.distanceKm} km
                  </p>
                </div>
                {isBest && <BestPriceBadge />}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Modal price</p>
                  <p className="font-display text-xl font-bold text-primary">
                    {formatINR(p.modal)}
                  </p>
                </div>
                <PriceChange value={p.changePct} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Min {formatINR(p.min)} · Max {formatINR(p.max)}
              </p>
              <Button size="sm" variant="outline" asChild className="mt-4 w-full">
                <Link to="/market/$id" params={{ id: m.id }} search={{ crop: cropId }}>
                  View Market Details
                </Link>
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
}
