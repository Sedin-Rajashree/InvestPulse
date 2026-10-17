"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UploadCloud,
  CheckCircle2,
  RefreshCw,
  Cpu,
  ShieldCheck,
  Download,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SimulatedFeed {
  id: string;
  name: string;
  type: "Brokerage" | "Banking" | "Cap Table";
  status: "Connected (Simulated)" | "Idle" | "Syncing";
  lastSync: string;
  recordsCount: number;
}

export default function ImportPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const [feeds, setFeeds] = useState<SimulatedFeed[]>([
    {
      id: "feed-1",
      name: "Schwab Institutional Equity Feed",
      type: "Brokerage",
      status: "Connected (Simulated)",
      lastSync: "Today at 09:30 AM",
      recordsCount: 14,
    },
    {
      id: "feed-2",
      name: "Mercury Bank Operating Ledger",
      type: "Banking",
      status: "Connected (Simulated)",
      lastSync: "Today at 08:15 AM",
      recordsCount: 48,
    },
    {
      id: "feed-3",
      name: "Carta Private Equity Holdings",
      type: "Cap Table",
      status: "Connected (Simulated)",
      lastSync: "Yesterday at 04:00 PM",
      recordsCount: 6,
    },
  ]);

  const handleSyncFeeds = () => {
    setIsSyncing(true);
    setSyncMessage(null);

    setTimeout(() => {
      setIsSyncing(false);
      setSyncMessage(
        "Simulated connector ingestion complete: 68 ledger entries reconciled. Allocation invariant verified (100.0%)."
      );
      setFeeds((prev) =>
        prev.map((f) => ({
          ...f,
          lastSync: "Just now",
        }))
      );
    }, 1200);
  };

  const sampleCsvRows = [
    {
      symbol: "VTI",
      name: "Vanguard Total Stock Market",
      category: "Equities",
      cost_basis: "1100000",
      market_val: "1382250",
      target_wt: "30.0",
      actual_wt: "28.5",
    },
    {
      symbol: "APEX-II",
      name: "Apex AI Infra Fund II",
      category: "Venture",
      cost_basis: "500000",
      market_val: "717800",
      target_wt: "15.0",
      actual_wt: "14.8",
    },
    {
      symbol: "MLC-LP",
      name: "Metropolitan Logistics Center",
      category: "Real Estate",
      cost_basis: "650000",
      market_val: "727500",
      target_wt: "15.0",
      actual_wt: "15.0",
    },
  ];

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
            <span className="text-gold-700 dark:text-gold-400">Data Ingestion</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Local CSV Imports & Simulated Feeds
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Reconcile offline portfolio ledgers and mock external connectors without live credentials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="success" className="gap-1.5 py-1 px-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Simulated Engine Ready</span>
          </Badge>

          <Button
            variant="default"
            size="sm"
            disabled={isSyncing}
            onClick={handleSyncFeeds}
            className="gap-2 text-xs font-semibold"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
            <span>{isSyncing ? "Reconciling..." : "Sync All Feeds"}</span>
          </Button>
        </div>
      </div>

      {/* Sync Status Banner */}
      {syncMessage && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 text-sm flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-gain-green shrink-0" />
          <span className="font-medium">{syncMessage}</span>
        </div>
      )}

      {/* Top Notice: Local Prototype Principles */}
      <div className="p-4 rounded-xl border border-gold-500/30 bg-gold-500/10 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-gold-700 dark:text-gold-400 shrink-0 mt-0.5" />
        <div className="text-xs text-foreground/90 space-y-1">
          <span className="font-bold text-primary">Local Sandbox Guarantee: </span>
          InvestPulse is designed strictly as an offline prototype. Connectors simulate real-world ledger
          payloads using deterministic mock generators. Live third-party credentials or API keys are never required.
        </div>
      </div>

      {/* Simulated Feeds Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-serif text-primary">
            Simulated External Connectors
          </h2>
          <span className="text-xs text-muted-foreground font-mono">
            3 Active Prototype Connectors
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {feeds.map((feed) => (
            <Card key={feed.id} className="border-forest-900/10">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[11px]">
                    {feed.type}
                  </Badge>
                  <span className="flex items-center gap-1.5 text-[11px] text-gain-green font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Simulated
                  </span>
                </div>
                <CardTitle className="text-base mt-2">{feed.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>Reconciled Records:</span>
                    <span className="font-mono font-semibold text-foreground">
                      {feed.recordsCount} items
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Synchronization:</span>
                    <span className="font-mono text-foreground">{feed.lastSync}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs gap-1.5"
                  disabled={isSyncing}
                  onClick={handleSyncFeeds}
                >
                  <RefreshCw className={`w-3 h-3 ${isSyncing ? "animate-spin" : ""}`} />
                  <span>Sync {feed.type}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Local CSV Ingestion Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-serif text-primary">
            Local CSV File Import
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
              onClick={() => alert("Downloading portfolio_template.csv...")}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Portfolio Template</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
              onClick={() => alert("Downloading spend_template.csv...")}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Spend Template</span>
            </Button>
          </div>
        </div>

        {/* Upload Dropzone Preview */}
        <div className="border-2 border-dashed border-border rounded-xl p-8 bg-card/50 text-center hover:border-gold-500/60 transition-colors cursor-pointer">
          <div className="max-w-md mx-auto flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-forest-700/10 text-primary flex items-center justify-center">
              <UploadCloud className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">
                Drop your CSV ledger file here, or click to browse
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Supports Portfolio Holdings CSV and Operating Disbursements CSV formats.
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="mt-2 text-xs font-semibold"
              onClick={() => alert("Select a local CSV file to parse holdings or spend")}
            >
              Select Local CSV File
            </Button>
          </div>
        </div>

        {/* Sample Parsed Structure Preview Table */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Sample CSV Ledger Schema</CardTitle>
                <CardDescription>
                  Preview of expected columns for allocation-safe portfolio holdings import.
                </CardDescription>
              </div>
              <Badge variant="gold" className="text-xs font-mono">
                Schema v1.0
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary/60 uppercase tracking-wider text-muted-foreground border-b border-border">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Symbol</th>
                    <th className="py-2.5 px-3 font-semibold">Asset Name</th>
                    <th className="py-2.5 px-3 font-semibold">Category</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Cost Basis</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Market Value</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Target Wt (%)</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Actual Wt (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 font-mono">
                  {sampleCsvRows.map((row) => (
                    <tr key={row.symbol} className="hover:bg-secondary/30">
                      <td className="py-2.5 px-3 font-bold text-primary">{row.symbol}</td>
                      <td className="py-2.5 px-3 font-sans text-foreground">{row.name}</td>
                      <td className="py-2.5 px-3 font-sans">
                        <Badge variant="outline" className="text-[10px]">
                          {row.category}
                        </Badge>
                      </td>
                      <td className="py-2.5 px-3 text-right text-muted-foreground">
                        ${row.cost_basis}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-foreground">
                        ${row.market_val}
                      </td>
                      <td className="py-2.5 px-3 text-right text-muted-foreground">
                        {row.target_wt}%
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-gold-700 dark:text-gold-400">
                        {row.actual_wt}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
