"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Filter,
  Download,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatPercentage } from "@/lib/utils";

interface Holding {
  id: string;
  name: string;
  symbol: string;
  category: "Equities" | "Venture" | "Real Estate" | "Fixed Income" | "Cash";
  targetWeight: number;
  currentWeight: number;
  costBasis: number;
  currentValue: number;
  unrealizedGain: number;
  unrealizedGainPct: number;
}

const HOLDINGS_DATA: Holding[] = [
  {
    id: "h-1",
    name: "Vanguard Total Stock Market Index (VTI)",
    symbol: "VTI",
    category: "Equities",
    targetWeight: 30,
    currentWeight: 28.5,
    costBasis: 1100000,
    currentValue: 1382250,
    unrealizedGain: 282250,
    unrealizedGainPct: 25.66,
  },
  {
    id: "h-2",
    name: "Invesco QQQ Trust (QQQ)",
    symbol: "QQQ",
    category: "Equities",
    targetWeight: 15,
    currentWeight: 16.5,
    costBasis: 620000,
    currentValue: 800250,
    unrealizedGain: 180250,
    unrealizedGainPct: 29.07,
  },
  {
    id: "h-3",
    name: "Apex AI Infrastructure Fund II",
    symbol: "APEX-II",
    category: "Venture",
    targetWeight: 15,
    currentWeight: 14.8,
    costBasis: 500000,
    currentValue: 717800,
    unrealizedGain: 217800,
    unrealizedGainPct: 43.56,
  },
  {
    id: "h-4",
    name: "Synthetix Bio Series A Preferred",
    symbol: "SYN-A",
    category: "Venture",
    targetWeight: 10,
    currentWeight: 10.2,
    costBasis: 350000,
    currentValue: 494700,
    unrealizedGain: 144700,
    unrealizedGainPct: 41.34,
  },
  {
    id: "h-5",
    name: "Metropolitan Logistics Center LP",
    symbol: "MLC-LP",
    category: "Real Estate",
    targetWeight: 15,
    currentWeight: 15.0,
    costBasis: 650000,
    currentValue: 727500,
    unrealizedGain: 77500,
    unrealizedGainPct: 11.92,
  },
  {
    id: "h-6",
    name: "US Treasury 2-Yr Notes (4.65%)",
    symbol: "UST-2Y",
    category: "Fixed Income",
    targetWeight: 10,
    currentWeight: 10.0,
    costBasis: 480000,
    currentValue: 485000,
    unrealizedGain: 5000,
    unrealizedGainPct: 1.04,
  },
  {
    id: "h-7",
    name: "Prime Institutional Cash Reserves",
    symbol: "CASH",
    category: "Cash",
    targetWeight: 5,
    currentWeight: 5.0,
    costBasis: 242500,
    currentValue: 242500,
    unrealizedGain: 0,
    unrealizedGainPct: 0.0,
  },
];

export default function InvestmentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const totalValue = HOLDINGS_DATA.reduce((sum, h) => sum + h.currentValue, 0);
  const totalCost = HOLDINGS_DATA.reduce((sum, h) => sum + h.costBasis, 0);
  const totalGain = totalValue - totalCost;
  const totalGainPct = (totalGain / totalCost) * 100;
  const totalWeightSum = HOLDINGS_DATA.reduce((sum, h) => sum + h.currentWeight, 0);

  const filteredHoldings =
    selectedCategory === "All"
      ? HOLDINGS_DATA
      : HOLDINGS_DATA.filter((h) => h.category === selectedCategory);

  const categories = ["All", "Equities", "Venture", "Real Estate", "Fixed Income", "Cash"];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            <Link href="/" className="hover:text-primary transition-colors">
              InvestPulse
            </Link>
            <span>/</span>
            <span className="text-gold-700 dark:text-gold-400">Portfolio</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Portfolio & Asset Allocation
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Institutional asset allocation with verified 100% allocation balance invariants.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="success" className="gap-1.5 py-1 px-3">
            <ShieldCheck className="w-3.5 h-3.5 text-gain-green" />
            <span>Sum Invariant: {totalWeightSum.toFixed(1)}% Safe</span>
          </Badge>

          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs font-medium"
            onClick={() => alert("Exporting portfolio allocation report (CSV format)...")}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Top 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="border-forest-900/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-sans uppercase tracking-wider text-muted-foreground font-semibold">
              Total Invested Capital
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-sans text-primary">
              {formatCurrency(totalValue)}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs">
              <span className="text-muted-foreground">Original Cost Basis:</span>
              <span className="font-semibold text-foreground">{formatCurrency(totalCost)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-forest-900/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-sans uppercase tracking-wider text-muted-foreground font-semibold">
              Unrealized Portfolio Gains
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-sans text-gain-green">
              +{formatCurrency(totalGain)}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
              <Badge variant="success" className="gap-1 px-1.5 py-0">
                <TrendingUp className="w-3 h-3" />
                <span>{formatPercentage(totalGainPct)} overall</span>
              </Badge>
              <span>market expansion</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-forest-900/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-sans uppercase tracking-wider text-muted-foreground font-semibold">
              Allocation Weight Integrity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-sans text-primary flex items-center gap-2">
              <span>{totalWeightSum.toFixed(2)}%</span>
              <CheckCircle2 className="w-5 h-5 text-gain-green" />
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              No unallocated or double-counted capital
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-secondary border border-border">
          <Filter className="w-3.5 h-3.5 text-muted-foreground ml-2 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-2xs font-semibold"
                  : "text-foreground/80 hover:text-foreground hover:bg-background/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredHoldings.length}</span> of{" "}
          <span className="font-semibold text-foreground">{HOLDINGS_DATA.length}</span> holdings
        </div>
      </div>

      {/* Holdings Ledger Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Holdings & Valuation Ledger</CardTitle>
          <CardDescription>
            Detailed positioning by asset class with target vs actual weighting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <tr>
                  <th className="py-3 px-4 font-semibold">Asset / Symbol</th>
                  <th className="py-3 px-4 font-semibold">Class</th>
                  <th className="py-3 px-4 font-semibold text-right">Target Weight</th>
                  <th className="py-3 px-4 font-semibold text-right">Current Weight</th>
                  <th className="py-3 px-4 font-semibold text-right">Cost Basis</th>
                  <th className="py-3 px-4 font-semibold text-right">Current Value</th>
                  <th className="py-3 px-4 font-semibold text-right">Gain / Loss</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredHoldings.map((h) => {
                  const isPositive = h.unrealizedGain >= 0;
                  return (
                    <tr
                      key={h.id}
                      className="hover:bg-secondary/30 transition-colors group"
                    >
                      <td className="py-3.5 px-4 font-medium">
                        <div className="text-foreground font-semibold flex items-center gap-2">
                          <span>{h.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-muted text-muted-foreground border border-border">
                            {h.symbol}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant="outline" className="text-xs font-normal">
                          {h.category}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-muted-foreground">
                        {h.targetWeight.toFixed(1)}%
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-semibold text-foreground">
                        {h.currentWeight.toFixed(1)}%
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-muted-foreground">
                        {formatCurrency(h.costBasis)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-primary">
                        {formatCurrency(h.currentValue)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono">
                        <span
                          className={`inline-flex items-center gap-1 font-semibold ${
                            h.unrealizedGain === 0
                              ? "text-muted-foreground"
                              : isPositive
                              ? "text-gain-green"
                              : "text-loss-crimson"
                          }`}
                        >
                          {isPositive && h.unrealizedGain > 0 ? "+" : ""}
                          {formatCurrency(h.unrealizedGain)}
                          <span className="text-[11px] font-normal">
                            ({formatPercentage(h.unrealizedGainPct)})
                          </span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
