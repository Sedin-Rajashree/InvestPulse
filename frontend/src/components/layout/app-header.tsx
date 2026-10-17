"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PieChart,
  Receipt,
  UploadCloud,
  ShieldCheck,
  Cpu,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    name: "Overview",
    href: "/",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Portfolio & Assets",
    href: "/investments",
    icon: PieChart,
    badge: "5 Classes",
  },
  {
    name: "Operating Spend",
    href: "/spend",
    icon: Receipt,
    badge: "Runway",
  },
  {
    name: "Imports & Feeds",
    href: "/import",
    icon: UploadCloud,
    badge: "Local CSV",
  },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/90 backdrop-blur-md shadow-xs">
      {/* Top Protocol Status Bar */}
      <div className="bg-forest-900 text-cream-100 text-xs px-4 py-1.5 border-b border-forest-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-gold-400">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              Allocation-Safe Ledger Invariant
            </span>
            <span className="text-forest-500">|</span>
            <span className="text-cream-300 hidden sm:inline">
              Investment capital strictly isolated from operating expenses
            </span>
          </div>

          <div className="flex items-center gap-3 text-cream-300">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <Cpu className="w-3 h-3 text-cream-400" />
              Simulated Connector: Offline Prototype
            </span>
            <span className="text-forest-500">|</span>
            <span className="font-mono text-gold-400">USD ($)</span>
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Identity */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="group flex items-center gap-3 transition-opacity hover:opacity-95"
            >
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-sm ring-1 ring-gold-500/30 group-hover:ring-gold-500 transition-all">
                <Layers className="w-5 h-5 text-gold-400" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl font-bold tracking-tight text-primary leading-none">
                    InvestPulse
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-gold-500/15 text-gold-700 border border-gold-500/30">
                    Prototype
                  </span>
                </div>
                <span className="text-xs text-muted-foreground font-sans mt-0.5">
                  Portfolio & Spend Analytics
                </span>
              </div>
            </Link>
          </div>

          {/* Primary Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                      : "text-foreground/80 hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-colors",
                      isActive ? "text-gold-400" : "text-muted-foreground"
                    )}
                  />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        "ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-mono font-medium",
                        isActive
                          ? "bg-gold-500/20 text-gold-300 border border-gold-400/30"
                          : "bg-muted text-muted-foreground border border-border"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Context */}
          <div className="flex items-center gap-2.5">
            <div className="hidden lg:flex flex-col text-right pr-2">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                Portfolio AUM
              </span>
              <span className="font-sans font-bold text-sm text-primary">
                $4,850,000
              </span>
            </div>

            <Link
              href="/import"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground hover:bg-border transition-colors border border-border shadow-2xs"
            >
              <UploadCloud className="w-3.5 h-3.5 text-primary" />
              <span>Import Data</span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-border scrollbar-none">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-foreground/80 hover:bg-secondary"
                )}
              >
                <Icon
                  className={cn(
                    "w-3.5 h-3.5",
                    isActive ? "text-gold-400" : "text-muted-foreground"
                  )}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
