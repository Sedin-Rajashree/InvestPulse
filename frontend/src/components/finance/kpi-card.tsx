"use client";

import * as React from "react";
import { TrendingUp, TrendingDown, Minus, Info, LucideIcon, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, cn } from "@/lib/utils";

export interface KPICardProps {
  title: string;
  value?: number | string | null;
  currency?: string;
  isCurrency?: boolean;
  valueUnit?: string;
  change?: number | null;
  changePeriod?: string;
  trend?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
  subtitle?: React.ReactNode;
  tooltip?: string;
  badgeText?: string;
  badgeVariant?: "default" | "secondary" | "gold" | "success" | "destructive" | "outline";
  statusIndicator?: "safe" | "warning" | "danger" | "neutral";
  isLoading?: boolean;
  emptyText?: string;
  className?: string;
}

export function KPICard({
  title,
  value,
  currency = "USD",
  isCurrency = true,
  valueUnit,
  change,
  changePeriod = "YTD",
  trend,
  icon: Icon,
  subtitle,
  tooltip,
  badgeText,
  badgeVariant = "outline",
  statusIndicator,
  isLoading = false,
  emptyText = "No data available",
  className,
}: KPICardProps) {
  // Infer trend if not explicitly provided
  const resolvedTrend =
    trend ||
    (typeof change === "number"
      ? change > 0
        ? "positive"
        : change < 0
        ? "negative"
        : "neutral"
      : undefined);

  // Format value display
  const renderValue = () => {
    if (value == null) {
      return <span className="text-muted-foreground text-sm font-normal">{emptyText}</span>;
    }

    if (typeof value === "number") {
      return (
        <span>
          {isCurrency ? formatCurrency(value, currency) : value.toLocaleString()}
          {valueUnit && <span className="text-base font-normal text-muted-foreground ml-1.5">{valueUnit}</span>}
        </span>
      );
    }

    return (
      <span>
        {value}
        {valueUnit && <span className="text-base font-normal text-muted-foreground ml-1.5">{valueUnit}</span>}
      </span>
    );
  };

  return (
    <Card
      className={cn(
        "border-forest-900/10 hover:border-gold-500/50 transition-all duration-200 shadow-2xs group relative overflow-hidden",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex items-center gap-1.5">
          <CardTitle className="text-xs font-sans uppercase tracking-wider text-muted-foreground font-semibold">
            {title}
          </CardTitle>
          {tooltip && (
            <div className="relative group/tooltip">
              <Info className="w-3.5 h-3.5 text-muted-foreground/60 hover:text-muted-foreground cursor-help" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover/tooltip:block z-50 w-48 p-2 text-[11px] leading-tight text-cream-100 bg-forest-900 rounded-md shadow-md">
                {tooltip}
              </div>
            </div>
          )}
        </div>

        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-forest-700/10 text-primary flex items-center justify-center group-hover:bg-gold-500/15 group-hover:text-gold-700 transition-colors">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-2 py-1">
            <div className="h-7 w-32 bg-muted animate-pulse rounded" />
            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold font-sans tracking-tight text-primary">
              {renderValue()}
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
              {/* Trend Pill */}
              {change != null && (
                <Badge
                  variant={
                    resolvedTrend === "positive"
                      ? "success"
                      : resolvedTrend === "negative"
                      ? "destructive"
                      : "secondary"
                  }
                  className="gap-1 px-1.5 py-0 font-medium"
                >
                  {resolvedTrend === "positive" && <TrendingUp className="w-3 h-3" />}
                  {resolvedTrend === "negative" && <TrendingDown className="w-3 h-3" />}
                  {resolvedTrend === "neutral" && <Minus className="w-3 h-3" />}
                  <span>
                    {change > 0 ? "+" : ""}
                    {change.toFixed(1)}% {changePeriod}
                  </span>
                </Badge>
              )}

              {/* Status Invariant Badge */}
              {statusIndicator === "safe" && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gain-green">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Reconciled</span>
                </span>
              )}

              {badgeText && (
                <Badge variant={badgeVariant} className="text-[10px] py-0 px-1.5">
                  {badgeText}
                </Badge>
              )}

              {/* Context Subtitle */}
              {subtitle && (
                <span className="text-muted-foreground text-xs">{subtitle}</span>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
