import Link from "next/link";
import { Shield, FileText, Activity } from "lucide-react";

export function AppFooter() {
  return (
    <footer className="w-full border-t border-border bg-card/60 mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-primary text-sm">
              InvestPulse
            </span>
            <span>—</span>
            <span>Local Investor Portfolio & Spend Analytics Prototype</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-gold-600" />
              Allocation-Safe Prototype Engine
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-gain-green" />
              Local-First Sandbox
            </span>
            <Link
              href="/import"
              className="hover:text-primary transition-colors inline-flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              Data Specs & Ingestion
            </Link>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/50 text-[11px] text-muted-foreground/80 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            Prototype environment: No real live broker or bank credentials required. Calculations maintain strict capital allocation invariants.
          </p>
          <p className="font-mono text-[10px]">
            Sprint Day 1/60 · Next.js 16 + Tailwind v4 + shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
}
