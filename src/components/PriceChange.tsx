import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { trendOf } from "@/lib/format";

export function PriceChange({
  value,
  className,
  size = "sm",
}: {
  value: number;
  className?: string;
  size?: "sm" | "md";
}) {
  const trend = trendOf(value);
  const Icon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : ArrowRight;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-semibold",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        trend === "up" && "bg-success/12 text-success",
        trend === "down" && "bg-destructive/12 text-destructive",
        trend === "flat" && "bg-muted text-muted-foreground",
        className,
      )}
    >
      <Icon className="size-3.5" />
      {value > 0 ? "+" : ""}
      {value.toFixed(1)}%
    </span>
  );
}

export function BestPriceBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-success px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-success-foreground shadow-sm",
        className,
      )}
    >
      🏆 Best Price
    </span>
  );
}
