import { useMemo, useState } from "react";
import { Calculator, TrendingUp } from "lucide-react";
import { CROPS, MARKETS, getPrice } from "@/data/mockData";
import { formatINR } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProfitCalculator({ defaultCrop = "wheat" }: { defaultCrop?: string }) {
  const [cropId, setCropId] = useState(defaultCrop);
  const [quantity, setQuantity] = useState("100");
  const [price, setPrice] = useState("2400");

  const qty = Number(quantity) || 0;
  const rate = Number(price) || 0;

  const options = useMemo(() => {
    const list = MARKETS.slice(0, 5).map((m) => ({
      id: m.id,
      name: m.name,
      modal: getPrice(m, cropId).modal,
    }));
    return list.sort((a, b) => b.modal - a.modal);
  }, [cropId]);

  const best = options[0];
  const worst = options[options.length - 1];
  const extra = best && worst ? (best.modal - worst.modal) * qty : 0;

  return (
    <div className="surface-card overflow-hidden">
      <div className="flex items-center gap-3 border-b border-border bg-secondary/50 px-6 py-5">
        <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Calculator className="size-5" />
        </span>
        <div>
          <h3 className="text-lg font-bold">Profit Calculator</h3>
          <p className="text-sm text-muted-foreground">
            Estimate your revenue and compare mandi options
          </p>
        </div>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="calc-crop">Crop</Label>
            <Select value={cropId} onValueChange={setCropId}>
              <SelectTrigger id="calc-crop" className="h-12">
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

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="calc-qty">Quantity (quintal)</Label>
              <Input
                id="calc-qty"
                inputMode="numeric"
                className="h-12"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value.replace(/[^\d]/g, ""))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calc-price">Expected price (₹)</Label>
              <Input
                id="calc-price"
                inputMode="numeric"
                className="h-12"
                value={price}
                onChange={(e) => setPrice(e.target.value.replace(/[^\d]/g, ""))}
              />
            </div>
          </div>

          <div className="rounded-2xl bg-primary px-5 py-4 text-primary-foreground">
            <p className="text-xs font-semibold uppercase tracking-wide opacity-85">
              Estimated revenue
            </p>
            <p className="font-display text-3xl font-bold">{formatINR(qty * rate)}</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold">Same crop, different mandis</p>
          {options.map((o, i) => (
            <div
              key={o.id}
              className="flex items-center justify-between rounded-xl border border-border px-4 py-3"
            >
              <span className="text-sm font-medium">{o.name}</span>
              <span className="flex items-center gap-2">
                <span className="text-sm font-bold">{formatINR(o.modal)}</span>
                {i === 0 && (
                  <span className="rounded-full bg-success/12 px-2 py-0.5 text-[11px] font-bold text-success">
                    BEST
                  </span>
                )}
              </span>
            </div>
          ))}
          {best && (
            <div className="rounded-2xl bg-success/10 px-5 py-4">
              <p className="flex items-center gap-2 text-sm font-bold text-success">
                <TrendingUp className="size-4" /> Best option: {best.name}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Potential additional revenue vs. the lowest mandi:{" "}
                <strong className="text-foreground">{formatINR(extra)}</strong> on {qty} quintal.
              </p>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Estimated insight based on demo data — not a guaranteed price.
          </p>
        </div>
      </div>
    </div>
  );
}
