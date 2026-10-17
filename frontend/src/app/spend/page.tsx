"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  TrendingDown,
  DollarSign,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface ExpenseItem {
  id: string;
  payee: string;
  category: "Engineering" | "Legal & Compliance" | "Management" | "Operations";
  date: string;
  account: string;
  amount: number;
  isRecurring: boolean;
}

const EXPENSES_DATA: ExpenseItem[] = [
  {
    id: "exp-1",
    payee: "Apex Cloud Infrastructure & GPUs",
    category: "Engineering",
    date: "Oct 15, 2026",
    account: "Mercury Ops Checking (••4910)",
    amount: 14200,
    isRecurring: true,
  },
  {
    id: "exp-2",
    payee: "Sullivan & Cromwell LLP — Regulatory Retainer",
    category: "Legal & Compliance",
    date: "Oct 12, 2026",
    account: "Mercury Ops Checking (••4910)",
    amount: 8500,
    isRecurring: true,
  },
  {
    id: "exp-3",
    payee: "Kanakku Fund Administration & Audit",
    category: "Management",
    date: "Oct 09, 2026",
    account: "Mercury Ops Checking (••4910)",
    amount: 6500,
    isRecurring: true,
  },
  {
    id: "exp-4",
    payee: "Bloomberg Terminal & Market Feeds",
    category: "Operations",
    date: "Oct 05, 2026",
    account: "SVB Corporate Card (••8812)",
    amount: 2800,
    isRecurring: true,
  },
  {
    id: "exp-5",
    payee: "Principal Engineering Contractors (2)",
    category: "Engineering",
    date: "Oct 01, 2026",
    account: "Mercury Ops Checking (••4910)",
    amount: 18000,
    isRecurring: true,
  },
  {
    id: "exp-6",
    payee: "Deloitte Q3 Tax & Regulatory Filing",
    category: "Legal & Compliance",
    date: "Sep 28, 2026",
    account: "Mercury Ops Checking (••4910)",
    amount: 5500,
    isRecurring: false,
  },
];

export default function SpendPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const monthlyBurn = 42500;
  const liquidReserves = 1208000;
  const runwayMonths = (liquidReserves / monthlyBurn).toFixed(1);
  const ytdSpend = 425000;

  const categories = ["All", "Engineering", "Legal & Compliance", "Management", "Operations"];

  const filteredExpenses =
    selectedCategory === "All"
      ? EXPENSES_DATA
      : EXPENSES_DATA.filter((e) => e.category === selectedCategory);

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
            <span className="text-gold-700 dark:text-gold-400">Operating Spend</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Operating Spend & Runway Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Operational cash flow monitoring isolated from invested portfolio capital.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="gold" className="gap-1.5 py-1 px-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Runway: {runwayMonths} Months</span>
          </Badge>

          <Link href="/import">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs font-medium">
              <span>Import Bank Ledger</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="border-forest-900/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-sans uppercase tracking-wider text-muted-foreground font-semibold">
              Net Monthly Burn Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-sans text-loss-crimson flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-loss-crimson" />
              <span>{formatCurrency(monthlyBurn)}/mo</span>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Trailing 3-month average operating burn
            </div>
          </CardContent>
        </Card>

        <Card className="border-forest-900/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-sans uppercase tracking-wider text-muted-foreground font-semibold">
              Operating Runway
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-sans text-foreground">
              {runwayMonths} Months
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Supported by {formatCurrency(liquidReserves)} in dedicated cash reserves
            </div>
          </CardContent>
        </Card>

        <Card className="border-forest-900/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-sans uppercase tracking-wider text-muted-foreground font-semibold">
              YTD Operating Outflows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-sans text-primary">
              {formatCurrency(ytdSpend)}
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Within approved budget envelope (94.2% utilized)
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dimension Isolation Notice */}
      <div className="p-4 rounded-xl border border-gold-500/30 bg-gold-500/10 flex items-start gap-3">
        <DollarSign className="w-5 h-5 text-gold-700 dark:text-gold-400 shrink-0 mt-0.5" />
        <div className="text-xs text-foreground/90 space-y-1">
          <span className="font-bold text-primary">Accounting Dimension Separation: </span>
          All operating expenses shown above represent corporate overhead, advisory retainers, and infrastructure costs.
          Under InvestPulse architecture rules, these operational expenses are segregated and cannot deplete or distort investment portfolio capital returns.
        </div>
      </div>

      {/* Expense Filter Controls */}
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
          Showing <span className="font-semibold text-foreground">{filteredExpenses.length}</span> recorded operating disbursements
        </div>
      </div>

      {/* Spend Records Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Operating Disbursements Ledger</CardTitle>
          <CardDescription>
            Audit log of verified operating disbursements mapped to accounting categories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <tr>
                  <th className="py-3 px-4 font-semibold">Vendor / Payee</th>
                  <th className="py-3 px-4 font-semibold">Category</th>
                  <th className="py-3 px-4 font-semibold">Account / Method</th>
                  <th className="py-3 px-4 font-semibold">Date</th>
                  <th className="py-3 px-4 font-semibold">Recurrence</th>
                  <th className="py-3 px-4 font-semibold text-right">Disbursement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredExpenses.map((exp) => (
                  <tr
                    key={exp.id}
                    className="hover:bg-secondary/30 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-medium text-foreground">
                      {exp.payee}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant="outline" className="text-xs font-normal">
                        {exp.category}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-mono text-muted-foreground">
                      {exp.account}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-muted-foreground">
                      {exp.date}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={exp.isRecurring ? "secondary" : "outline"}
                        className="text-[10px]"
                      >
                        {exp.isRecurring ? "Monthly Recurring" : "One-off"}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-loss-crimson">
                      -{formatCurrency(exp.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
