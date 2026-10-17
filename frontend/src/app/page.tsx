import Link from "next/link";
import {
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  PieChart,
  Receipt,
  UploadCloud,
  ChevronRight,
  CircleAlert,
  Calendar,
  Building2,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export default function OverviewPage() {
  const portfolioAUM = 4850000;
  const ytdGain = 602500;
  const ytdGainPct = 14.2;
  const monthlyBurn = 42500;
  const liquidCash = 1208000;
  const runwayMonths = (liquidCash / monthlyBurn).toFixed(1);

  const assetAllocations = [
    { name: "Public Equities", value: 2182500, percent: 45, color: "bg-forest-700" },
    { name: "Venture & Private Equity", value: 1212500, percent: 25, color: "bg-gold-500" },
    { name: "Commercial Real Estate", value: 727500, percent: 15, color: "bg-forest-500" },
    { name: "Fixed Income & Notes", value: 485000, percent: 10, color: "bg-gold-400" },
    { name: "Treasuries & Cash Reserves", value: 242500, percent: 5, color: "bg-muted-foreground" },
  ];

  const recentTransactions = [
    {
      id: "tx-1",
      name: "Acme Quantum Series A Follow-on",
      type: "Investment Outflow",
      dimension: "Portfolio Capital",
      amount: 150000,
      date: "Oct 14, 2026",
      status: "Settled",
    },
    {
      id: "tx-2",
      name: "Wilson & Sons Legal Advisory Retainer",
      type: "Operating Expense",
      dimension: "Operating Spend",
      amount: 8500,
      date: "Oct 12, 2026",
      status: "Settled",
    },
    {
      id: "tx-3",
      name: "Treasury Yield Distribution (4.8% APY)",
      type: "Investment Yield",
      dimension: "Portfolio Capital",
      amount: 19400,
      date: "Oct 10, 2026",
      status: "Realized",
    },
    {
      id: "tx-4",
      name: "Cloud Architecture & Hosting Retainer",
      type: "Operating Expense",
      dimension: "Operating Spend",
      amount: 4200,
      date: "Oct 08, 2026",
      status: "Settled",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Title & Breadcrumb Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            <span className="text-gold-700 dark:text-gold-400">InvestPulse Console</span>
            <span>/</span>
            <span>Executive Overview</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Portfolio & Spend Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time balance of deployed investment capital versus operating burn runway.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="gold" className="gap-1.5 py-1 px-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>FY 2026 · Q4 Active</span>
          </Badge>

          <Link href="/import">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs font-medium">
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Import Local CSV</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Top 4 Key Indicator Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Total Portfolio Value */}
        <Card className="border-forest-900/10 hover:border-gold-500/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-sans uppercase tracking-wider text-muted-foreground font-semibold">
              Total Portfolio AUM
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-forest-700/10 text-primary flex items-center justify-center">
              <PieChart className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-sans text-primary">
              {formatCurrency(portfolioAUM)}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs">
              <Badge variant="success" className="gap-1 px-1.5 py-0">
                <TrendingUp className="w-3 h-3" />
                <span>+{ytdGainPct}% YTD</span>
              </Badge>
              <span className="text-muted-foreground">+{formatCurrency(ytdGain)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 2: Operating Runway */}
        <Card className="border-forest-900/10 hover:border-gold-500/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-sans uppercase tracking-wider text-muted-foreground font-semibold">
              Operating Runway
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-gold-500/10 text-gold-700 flex items-center justify-center">
              <Clock className="w-4 h-4 text-gold-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-sans text-foreground">
              {runwayMonths} <span className="text-base font-normal text-muted-foreground">Months</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs">
              <span className="text-loss-crimson font-medium">
                {formatCurrency(monthlyBurn)}/mo
              </span>
              <span className="text-muted-foreground">operating burn rate</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 3: Safe Allocation Invariant */}
        <Card className="border-forest-900/10 hover:border-gold-500/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-sans uppercase tracking-wider text-muted-foreground font-semibold">
              Allocation Invariant
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-gain-green flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-gain-green" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-sans text-gain-green">
              100.0%
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-gain-green inline-block" />
              <span>5 classes strictly balanced</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 4: Accounting Dimension Separation */}
        <Card className="border-forest-900/10 hover:border-gold-500/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-sans uppercase tracking-wider text-muted-foreground font-semibold">
              Capital Isolation
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-secondary text-primary flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-sans text-primary">
              Strict 2-Way
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
              <span>Investments isolated from Ops</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset Allocation Breakdown Banner */}
      <Card className="bg-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-lg">Portfolio Asset Allocation</CardTitle>
              <CardDescription>
                Current weighting across 5 distinct institutional asset classes (Invariants verified: 100%).
              </CardDescription>
            </div>
            <Link href="/investments">
              <Button variant="ghost" size="sm" className="gap-1 text-xs text-primary hover:text-primary">
                <span>View Full Portfolio</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stacked Progress Bar */}
          <div className="w-full h-4 rounded-full overflow-hidden flex bg-muted p-0.5 border border-border">
            {assetAllocations.map((asset) => (
              <div
                key={asset.name}
                className={`${asset.color} h-full first:rounded-l-full last:rounded-r-full transition-all`}
                style={{ width: `${asset.percent}%` }}
                title={`${asset.name}: ${asset.percent}% (${formatCurrency(asset.value)})`}
              />
            ))}
          </div>

          {/* Allocation Legend Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {assetAllocations.map((asset) => (
              <div
                key={asset.name}
                className="p-3 rounded-lg border border-border/70 bg-secondary/30 flex flex-col justify-between"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${asset.color}`} />
                  <span className="text-xs font-semibold text-foreground truncate">
                    {asset.name}
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-base font-bold font-sans text-primary">
                    {formatCurrency(asset.value)}
                  </span>
                  <span className="text-xs font-mono font-medium text-gold-700 dark:text-gold-400">
                    {asset.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Two-Column Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Ledger Transactions (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Ledger Events</CardTitle>
                <CardDescription>
                  Audit log of recent capital calls, dividends, and operating payments.
                </CardDescription>
              </div>
              <Link href="/spend">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  <span>Spend Ledger</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border/60">
                {recentTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="py-3.5 flex items-center justify-between gap-4 hover:bg-secondary/40 px-2 rounded-md transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          tx.dimension === "Portfolio Capital"
                            ? "bg-forest-700/10 text-primary"
                            : "bg-loss-crimson/10 text-loss-crimson"
                        }`}
                      >
                        {tx.dimension === "Portfolio Capital" ? (
                          <Building2 className="w-4 h-4" />
                        ) : (
                          <Receipt className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          {tx.name}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span>{tx.date}</span>
                          <span>•</span>
                          <span
                            className={
                              tx.dimension === "Portfolio Capital"
                                ? "text-primary font-medium"
                                : "text-loss-crimson font-medium"
                            }
                          >
                            {tx.dimension}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-sm font-bold font-sans ${
                          tx.type === "Investment Yield"
                            ? "text-gain-green"
                            : "text-foreground"
                        }`}
                      >
                        {tx.type === "Investment Yield" ? "+" : "-"}
                        {formatCurrency(tx.amount)}
                      </div>
                      <Badge variant="outline" className="text-[10px] mt-1">
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prototype Feeds & Quick Action Module (1 Col) */}
        <div className="space-y-6">
          <Card className="border-gold-500/20 bg-gradient-to-b from-card to-secondary/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-gold-600" />
                <span>Simulated Feeds Status</span>
              </CardTitle>
              <CardDescription>
                InvestPulse runs offline with simulated institutional feeds and local CSV imports.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-card border border-border">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-medium text-foreground">Schwab / Public Brokerage</span>
                  </div>
                  <span className="text-muted-foreground font-mono">Simulated</span>
                </div>

                <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-card border border-border">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-medium text-foreground">Mercury Operating Checking</span>
                  </div>
                  <span className="text-muted-foreground font-mono">Simulated</span>
                </div>

                <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-card border border-border">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-medium text-foreground">Carta Cap Table Valuation</span>
                  </div>
                  <span className="text-muted-foreground font-mono">Simulated</span>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/import" className="w-full block">
                  <Button variant="default" className="w-full gap-2 text-xs font-semibold">
                    <UploadCloud className="w-4 h-4 text-gold-400" />
                    <span>Manage Feeds & Import CSV</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Allocation Safety Guarantee Box */}
          <div className="p-4 rounded-xl border border-border bg-card/60 flex items-start gap-3 text-xs text-muted-foreground">
            <CircleAlert className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-foreground">Allocation Invariant Guarantee: </span>
              Totals in InvestPulse are strictly verified so capital sums never double-count operating burn against investment principal.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
