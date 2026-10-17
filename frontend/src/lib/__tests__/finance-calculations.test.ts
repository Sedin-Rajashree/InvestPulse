import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatCompactCurrency,
  formatPercentage,
} from "../utils";
import {
  calculateTotalValuation,
  calculateTotalCostBasis,
  calculateUnrealizedGain,
  calculateAllocationSum,
  verifyAllocationInvariant,
  calculateAssetAllocations,
  calculateOperatingRunway,
  calculateBudgetUtilization,
  calculatePercentageVariance,
} from "../finance-calculations";
import { INITIAL_HOLDINGS } from "../fixtures/financial-data";
import { Holding } from "../types/finance";

describe("Financial Currency & Percentage Formatting", () => {
  it("formats standard USD currency with no decimal places", () => {
    expect(formatCurrency(4850000)).toBe("$4,850,000");
    expect(formatCurrency(0)).toBe("$0");
    expect(formatCurrency(1208000)).toBe("$1,208,000");
    expect(formatCurrency(-42500)).toBe("-$42,500");
  });

  it("formats compact currency notations", () => {
    expect(formatCompactCurrency(4850000)).toBe("$4.9M");
    expect(formatCompactCurrency(250000)).toBe("$250K");
    expect(formatCompactCurrency(0)).toBe("$0");
  });

  it("formats signed percentage strings with 2 decimal precision", () => {
    expect(formatPercentage(14.2)).toBe("+14.20%");
    expect(formatPercentage(-5.75)).toBe("-5.75%");
    expect(formatPercentage(0)).toBe("+0.00%");
  });
});

describe("Portfolio Valuation & Cost Basis Calculations", () => {
  it("calculates exact total portfolio valuation from holdings", () => {
    const totalVal = calculateTotalValuation(INITIAL_HOLDINGS);
    expect(totalVal).toBe(4850000);
  });

  it("calculates exact total cost basis from holdings", () => {
    const totalCost = calculateTotalCostBasis(INITIAL_HOLDINGS);
    expect(totalCost).toBe(3942500);
  });

  it("safely handles empty holdings arrays", () => {
    expect(calculateTotalValuation([])).toBe(0);
    expect(calculateTotalCostBasis([])).toBe(0);
  });

  it("safely filters non-finite or corrupted values", () => {
    const corruptedHoldings: Holding[] = [
      {
        ...INITIAL_HOLDINGS[0],
        currentValue: (NaN as unknown) as number,
        costBasis: (Infinity as unknown) as number,
      },
    ];
    expect(calculateTotalValuation(corruptedHoldings)).toBe(0);
    expect(calculateTotalCostBasis(corruptedHoldings)).toBe(0);
  });
});

describe("Unrealized Gains & Yield Calculations", () => {
  it("computes dollar gain and percentage gain correctly", () => {
    const result = calculateUnrealizedGain(4850000, 3942500);
    expect(result.gain).toBe(907500);
    expect(result.gainPct).toBe(23.02);
  });

  it("prevents division by zero when cost basis is zero", () => {
    const result = calculateUnrealizedGain(100000, 0);
    expect(result.gain).toBe(100000);
    expect(result.gainPct).toBe(0);
  });

  it("returns zero gain for non-finite values", () => {
    const result = calculateUnrealizedGain(NaN, 500000);
    expect(result.gain).toBe(0);
    expect(result.gainPct).toBe(0);
  });
});

describe("Asset Allocation Weights & Invariant Verification", () => {
  it("calculates exact allocation weight sum for demo holdings", () => {
    const sum = calculateAllocationSum(INITIAL_HOLDINGS);
    expect(sum).toBe(100.0);
  });

  it("verifies allocation invariant is safe when weights sum to 100.0%", () => {
    expect(verifyAllocationInvariant(INITIAL_HOLDINGS)).toBe(true);
  });

  it("detects allocation invariant violations when weights diverge", () => {
    const unbalancedHoldings: Holding[] = [
      { ...INITIAL_HOLDINGS[0], currentWeight: 20.0 }, // Dropped by 8.5%
      ...INITIAL_HOLDINGS.slice(1),
    ];
    expect(verifyAllocationInvariant(unbalancedHoldings)).toBe(false);
  });

  it("safely returns false and 0 for empty holdings", () => {
    expect(calculateAllocationSum([])).toBe(0);
    expect(verifyAllocationInvariant([])).toBe(false);
  });
});

describe("Asset Allocation Class Aggregations", () => {
  it("aggregates holdings across 5 standard asset classes", () => {
    const allocations = calculateAssetAllocations(INITIAL_HOLDINGS);
    expect(allocations).toHaveLength(5);

    const equities = allocations.find((a) => a.category === "Equities");
    expect(equities).toBeDefined();
    expect(equities?.value).toBe(2182500);
    expect(equities?.percent).toBe(45);

    const venture = allocations.find((a) => a.category === "Venture");
    expect(venture).toBeDefined();
    expect(venture?.value).toBe(1212500);
    expect(venture?.percent).toBe(25);

    const realEstate = allocations.find((a) => a.category === "Real Estate");
    expect(realEstate).toBeDefined();
    expect(realEstate?.value).toBe(727500);
    expect(realEstate?.percent).toBe(15);

    const fixedIncome = allocations.find((a) => a.category === "Fixed Income");
    expect(fixedIncome).toBeDefined();
    expect(fixedIncome?.value).toBe(485000);
    expect(fixedIncome?.percent).toBe(10);

    const cash = allocations.find((a) => a.category === "Cash");
    expect(cash).toBeDefined();
    expect(cash?.value).toBe(242500);
    expect(cash?.percent).toBe(5);
  });

  it("returns empty array when holdings array is empty", () => {
    expect(calculateAssetAllocations([])).toEqual([]);
  });
});

describe("Operating Runway & Spend Analytics", () => {
  it("calculates operating runway months from liquid cash and monthly burn", () => {
    const runway = calculateOperatingRunway(1208000, 42500);
    expect(runway).toBe(28.4);
  });

  it("returns null when monthly burn is zero or negative (prevents infinite runway)", () => {
    expect(calculateOperatingRunway(1208000, 0)).toBeNull();
    expect(calculateOperatingRunway(1208000, -5000)).toBeNull();
  });

  it("returns null when liquid cash is missing, zero, or negative", () => {
    expect(calculateOperatingRunway(0, 42500)).toBeNull();
    expect(calculateOperatingRunway(-1000, 42500)).toBeNull();
    expect(calculateOperatingRunway(null, 42500)).toBeNull();
    expect(calculateOperatingRunway(undefined, 42500)).toBeNull();
  });

  it("calculates budget envelope utilization percentage", () => {
    const util = calculateBudgetUtilization(425000, 450000);
    expect(util).toBe(94.4);
  });

  it("returns null for invalid budget envelope inputs", () => {
    expect(calculateBudgetUtilization(425000, 0)).toBeNull();
    expect(calculateBudgetUtilization(425000, -1000)).toBeNull();
    expect(calculateBudgetUtilization(null, 450000)).toBeNull();
  });
});

describe("Percentage Variance Calculations", () => {
  it("calculates positive and negative percentage variance", () => {
    expect(calculatePercentageVariance(110, 100)).toBe(10.0);
    expect(calculatePercentageVariance(85, 100)).toBe(-15.0);
  });

  it("returns null when baseline is zero or missing", () => {
    expect(calculatePercentageVariance(100, 0)).toBeNull();
    expect(calculatePercentageVariance(null, 100)).toBeNull();
    expect(calculatePercentageVariance(100, undefined)).toBeNull();
  });
});
