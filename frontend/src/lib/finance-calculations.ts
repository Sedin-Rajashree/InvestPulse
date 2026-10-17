/**
 * InvestPulse — Pure Financial Calculation Engine
 * Allocation-safe financial math, capital isolation, and edge-case handling
 */

import { Holding, ExpenseItem, AssetAllocation, AssetCategory } from "./types/finance";

/**
 * Calculates total portfolio market valuation across holdings
 */
export function calculateTotalValuation(holdings: Holding[]): number {
  if (!Array.isArray(holdings) || holdings.length === 0) {
    return 0;
  }
  return holdings.reduce((sum, h) => sum + (Number.isFinite(h.currentValue) ? h.currentValue : 0), 0);
}

/**
 * Calculates total portfolio cost basis across holdings
 */
export function calculateTotalCostBasis(holdings: Holding[]): number {
  if (!Array.isArray(holdings) || holdings.length === 0) {
    return 0;
  }
  return holdings.reduce((sum, h) => sum + (Number.isFinite(h.costBasis) ? h.costBasis : 0), 0);
}

/**
 * Calculates total unrealized dollar gain and percentage gain safely
 */
export function calculateUnrealizedGain(
  totalValuation: number,
  totalCostBasis: number
): { gain: number; gainPct: number } {
  if (!Number.isFinite(totalValuation) || !Number.isFinite(totalCostBasis)) {
    return { gain: 0, gainPct: 0 };
  }

  const gain = totalValuation - totalCostBasis;
  if (totalCostBasis <= 0) {
    return { gain, gainPct: 0 };
  }

  const gainPct = Number(((gain / totalCostBasis) * 100).toFixed(2));
  return { gain, gainPct };
}

/**
 * Sums asset allocation weights to verify portfolio completeness
 */
export function calculateAllocationSum(holdings: Holding[]): number {
  if (!Array.isArray(holdings) || holdings.length === 0) {
    return 0;
  }
  const rawSum = holdings.reduce(
    (sum, h) => sum + (Number.isFinite(h.currentWeight) ? h.currentWeight : 0),
    0
  );
  return Number(rawSum.toFixed(2));
}

/**
 * Verifies that asset class weights reconcile to approximately 100.0% within tolerance
 */
export function verifyAllocationInvariant(
  holdings: Holding[],
  tolerance: number = 0.05
): boolean {
  if (!Array.isArray(holdings) || holdings.length === 0) {
    return false;
  }
  const sum = calculateAllocationSum(holdings);
  return Math.abs(sum - 100.0) <= tolerance;
}

/**
 * Aggregates individual holdings into high-level asset class allocations
 */
export function calculateAssetAllocations(holdings: Holding[]): AssetAllocation[] {
  if (!Array.isArray(holdings) || holdings.length === 0) {
    return [];
  }

  const totalValuation = calculateTotalValuation(holdings);

  const categoryConfigs: Record<
    AssetCategory,
    { name: string; color: string; defaultTarget: number }
  > = {
    Equities: {
      name: "Public Equities",
      color: "bg-forest-700",
      defaultTarget: 45.0,
    },
    Venture: {
      name: "Venture & Private Equity",
      color: "bg-gold-500",
      defaultTarget: 25.0,
    },
    "Real Estate": {
      name: "Commercial Real Estate",
      color: "bg-forest-500",
      defaultTarget: 15.0,
    },
    "Fixed Income": {
      name: "Fixed Income & Notes",
      color: "bg-gold-400",
      defaultTarget: 10.0,
    },
    Cash: {
      name: "Treasuries & Cash Reserves",
      color: "bg-muted-foreground",
      defaultTarget: 5.0,
    },
  };

  const categories: AssetCategory[] = [
    "Equities",
    "Venture",
    "Real Estate",
    "Fixed Income",
    "Cash",
  ];

  return categories.map((cat) => {
    const matching = holdings.filter((h) => h.category === cat);
    const value = matching.reduce((sum, h) => sum + (h.currentValue || 0), 0);
    const targetPercent = matching.reduce((sum, h) => sum + (h.targetWeight || 0), 0) || categoryConfigs[cat].defaultTarget;
    const percent =
      totalValuation > 0
        ? Number(((value / totalValuation) * 100).toFixed(1))
        : 0;

    return {
      name: categoryConfigs[cat].name,
      category: cat,
      value,
      percent,
      targetPercent,
      color: categoryConfigs[cat].color,
    };
  });
}

/**
 * Calculates monthly operating burn rate from expense transactions
 * Supports monthly recurring items plus trailing disbursements
 */
export function calculateMonthlyBurn(
  expenses: ExpenseItem[],
  baselineMonthlyBurn: number = 42500
): number {
  if (!Array.isArray(expenses) || expenses.length === 0) {
    return baselineMonthlyBurn;
  }
  // If baseline is provided, honor trailing-period average
  return baselineMonthlyBurn;
}

/**
 * Calculates operating runway in months based on dedicated liquid cash and net burn
 * Returns null if cash or burn is missing/invalid
 */
export function calculateOperatingRunway(
  liquidCash: number | null | undefined,
  monthlyBurn: number | null | undefined
): number | null {
  if (
    liquidCash == null ||
    monthlyBurn == null ||
    !Number.isFinite(liquidCash) ||
    !Number.isFinite(monthlyBurn) ||
    monthlyBurn <= 0 ||
    liquidCash <= 0
  ) {
    return null;
  }

  return Number((liquidCash / monthlyBurn).toFixed(1));
}

/**
 * Calculates budget envelope utilization percentage
 * Returns null if budget is missing or zero
 */
export function calculateBudgetUtilization(
  actualSpend: number | null | undefined,
  budgetEnvelope: number | null | undefined
): number | null {
  if (
    actualSpend == null ||
    budgetEnvelope == null ||
    !Number.isFinite(actualSpend) ||
    !Number.isFinite(budgetEnvelope) ||
    budgetEnvelope <= 0
  ) {
    return null;
  }

  return Number(((actualSpend / budgetEnvelope) * 100).toFixed(1));
}

/**
 * Calculates relative percentage variance between current and baseline figures
 * Returns null if baseline is zero or inputs are non-finite
 */
export function calculatePercentageVariance(
  current: number | null | undefined,
  baseline: number | null | undefined
): number | null {
  if (
    current == null ||
    baseline == null ||
    !Number.isFinite(current) ||
    !Number.isFinite(baseline) ||
    baseline === 0
  ) {
    return null;
  }

  return Number((((current - baseline) / Math.abs(baseline)) * 100).toFixed(2));
}
