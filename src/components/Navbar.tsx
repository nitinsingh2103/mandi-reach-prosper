import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Sprout, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/market-prices", label: "Market Prices" },
  { to: "/sell", label: "Sell Crop" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/price-trends", label: "Price Trends" },
  { to: "/dashboard", label: "Dashboard" },
] as const;

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Sprout className="size-5" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-bold tracking-tight">KisanMandi</span>
        {!compact && (
          <span className="block text-[11px] font-medium text-muted-foreground">
            किसान मंडी · Best price, every day
          </span>
        )}
      </span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <nav className="section-shell flex h-18 items-center justify-between py-3">
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button variant="hero" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>

      {open && (
        <div className="border-t border-border bg-card lg:hidden">
          <div className="section-shell flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-secondary text-secondary-foreground" }}
                className="rounded-xl px-4 py-3 text-base font-medium text-muted-foreground"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Button variant="outline" asChild onClick={() => setOpen(false)}>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="hero" asChild onClick={() => setOpen(false)}>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
