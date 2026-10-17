/**
 * InvestPulse — Core Financial Domain Types
 * Strict separation between Investment Portfolio Capital and Operating Spend
 */

export type AssetCategory =
  | "Equities"
  | "Venture"
  | "Real Estate"
  | "Fixed Income"
  | "Cash";

export interface Holding {
  id: string;
  name: string;
  symbol: string;
  category: AssetCategory;
  targetWeight: number; // Percentage (e.g. 30.0)
  currentWeight: number; // Percentage (e.g. 28.5)
  costBasis: number;
  currentValue: number;
  unrealizedGain: number;
  unrealizedGainPct: number;
}

export type ExpenseCategory =
  | "Engineering"
  | "Legal & Compliance"
  | "Management"
  | "Operations";

export interface ExpenseItem {
  id: string;
  payee: string;
  category: ExpenseCategory;
  date: string;
  account: string;
  amount: number;
  isRecurring: boolean;
}

export interface CashAccount {
  id: string;
  name: string;
  institution: string;
  type: "Operating Reserves" | "Treasury Cash" | "Escrow";
  balance: number;
  currency: string;
  lastReconciled: string;
}

export type FeedType = "Brokerage" | "Banking" | "Cap Table";
export type FeedStatus = "Connected (Simulated)" | "Idle" | "Syncing";

export interface SimulatedFeed {
  id: string;
  name: string;
  type: FeedType;
  status: FeedStatus;
  lastSync: string;
  recordsCount: number;
}

export type AccountingDimension = "Portfolio Capital" | "Operating Spend";

export interface TransactionRecord {
  id: string;
  name: string;
  type: "Investment Outflow" | "Operating Expense" | "Investment Yield";
  dimension: AccountingDimension;
  amount: number;
  date: string;
  status: "Settled" | "Realized" | "Pending";
}

export interface AssetAllocation {
  name: string;
  category: AssetCategory;
  value: number;
  percent: number;
  targetPercent: number;
  color: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalCost: number;
  unrealizedGain: number;
  unrealizedGainPct: number;
  allocationSum: number;
  isAllocationSafe: boolean;
  monthlyBurn: number;
  liquidReserves: number;
  runwayMonths: number | null;
  ytdSpend: number;
}
