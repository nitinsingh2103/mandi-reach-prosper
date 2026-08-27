import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Navigation, Users } from "lucide-react";
import type { Market } from "@/data/mockData";
import { getPrice } from "@/data/mockData";
import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { BestPriceBadge, PriceChange } from "@/components/PriceChange";

export function MarketCard({
  market,
  cropId,
  best = false,
}: {
  market: Market;
  cropId: string;
  best?: boolean;
}) {
  const price = getPrice(market, cropId);

  return (
    <article className="surface-card flex flex-col gap-4 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold leading-snug">{market.name}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5" /> {market.district}, {market.state}
          </p>
        </div>
        {best && <BestPriceBadge />}
      </div>

      <div className="flex items-end justify-between rounded-xl bg-secondary/60 px-4 py-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground">Modal price today</p>
          <p className="font-display text-2xl font-bold text-primary">{formatINR(price.modal)}</p>
        </div>
        <PriceChange value={price.changePct} />
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Navigation className="size-3.5" /> {market.distanceKm} km
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="size-3.5" /> {market.buyers} buyers
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="size-3.5" /> Open today
        </span>
      </div>

      <p className="text-xs text-muted-foreground">{market.hours}</p>

      <Button variant="outline" asChild className="mt-auto w-full">
        <Link to="/market/$id" params={{ id: market.id }} search={{ crop: cropId }}>
          View Market Details
        </Link>
      </Button>
    </article>
  );
}
