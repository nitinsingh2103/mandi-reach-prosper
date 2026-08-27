import { Link } from "@tanstack/react-router";
import type { Crop } from "@/data/mockData";
import { formatINR } from "@/lib/format";
import { PriceChange } from "@/components/PriceChange";

export function CropCard({ crop }: { crop: Crop }) {
  return (
    <Link
      to="/market-prices"
      search={{ crop: crop.id }}
      className="surface-card group flex flex-col gap-3 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="flex items-start justify-between">
        <span className="grid size-14 place-items-center rounded-2xl bg-secondary text-3xl transition-transform duration-200 group-hover:scale-105">
          {crop.emoji}
        </span>
        <PriceChange value={crop.changePct} />
      </div>
      <div>
        <h3 className="text-lg font-bold">{crop.name}</h3>
        <p className="text-sm text-muted-foreground">{crop.hindi}</p>
      </div>
      <div className="mt-auto">
        <p className="font-display text-2xl font-bold text-primary">{formatINR(crop.avgPrice)}</p>
        <p className="text-xs font-medium text-muted-foreground">{crop.unit} · avg. across mandis</p>
      </div>
    </Link>
  );
}
