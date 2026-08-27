import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin, Package, Phone } from "lucide-react";
import { toast } from "sonner";
import type { Listing } from "@/data/mockData";
import { formatDate, formatINR, formatNumber } from "@/lib/format";
import { Button } from "@/components/ui/button";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="surface-card flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <div className="relative grid h-40 place-items-center bg-secondary/70 text-6xl">
        <span aria-hidden>{listing.emoji}</span>
        <span className="absolute right-3 top-3 rounded-full bg-card px-2.5 py-1 text-[11px] font-bold text-foreground shadow-sm">
          {listing.quality}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-bold">{listing.cropName}</h3>
          <p className="text-sm text-muted-foreground">Variety: {listing.variety}</p>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-2xl font-bold text-primary">
            {formatINR(listing.price)}
          </span>
          <span className="text-xs text-muted-foreground">/ quintal</span>
        </div>

        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Package className="size-4" /> {formatNumber(listing.quantity)} {listing.unit} available
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="size-4" /> {listing.location}
          </li>
          <li className="flex items-center gap-2">
            <CalendarDays className="size-4" /> Harvested {formatDate(listing.harvestDate)}
          </li>
        </ul>

        <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row">
          <Button variant="outline" asChild className="flex-1">
            <Link to="/crop/$id" params={{ id: listing.id }}>
              View Details
            </Link>
          </Button>
          <Button
            className="flex-1"
            onClick={() => toast.success(`Contact shared: ${listing.farmer.name} · ${listing.farmer.phone}`)}
          >
            <Phone /> Contact Farmer
          </Button>
        </div>
      </div>
    </article>
  );
}
