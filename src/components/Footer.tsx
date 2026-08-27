import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/Navbar";
import { DEMO_DISCLAIMER } from "@/data/mockData";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { to: "/market-prices", label: "Market Prices" },
      { to: "/price-trends", label: "Price Trends" },
      { to: "/marketplace", label: "Crop Marketplace" },
      { to: "/sell", label: "Sell Your Crop" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/about", label: "Contact" },
      { to: "/about", label: "Help Centre" },
      { to: "/dashboard", label: "Farmer Dashboard" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/about", label: "Privacy Policy" },
      { to: "/about", label: "Terms of Use" },
      { to: "/about", label: "Data Sources" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            KisanMandi helps farmers compare mandi prices, discover nearby markets and sell their
            harvest directly — without middlemen guesswork.
          </p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid size-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-bold uppercase tracking-wide text-foreground">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l, i) => (
                <li key={i}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="section-shell flex flex-col gap-2 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} KisanMandi. Built for Indian farmers.</p>
          <p>{DEMO_DISCLAIMER}</p>
        </div>
      </div>
    </footer>
  );
}
