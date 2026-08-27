import { Info } from "lucide-react";
import { DEMO_DISCLAIMER } from "@/data/mockData";
import { cn } from "@/lib/utils";

export function DemoNotice({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 rounded-xl border border-wheat/40 bg-wheat/12 px-4 py-3 text-sm text-wheat-foreground",
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0" />
      <span>{DEMO_DISCLAIMER}</span>
    </p>
  );
}
