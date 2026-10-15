"use client";

import React from "react";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  delta: string;
  isPositive: boolean;
  periodText?: string;
  icon: LucideIcon;
  subtext?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export default function MetricCard({
  title,
  value,
  delta,
  isPositive,
  periodText = "vs previous period",
  icon: Icon,
  subtext,
  onClick,
  isActive = false,
}: MetricCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border p-4 transition-all bg-white ${
        isActive
          ? "border-sky-500 ring-1 ring-sky-500/20 shadow-xs"
          : "border-slate-200/90 hover:border-sky-300 shadow-xs"
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
          <Icon className="h-3.5 w-3.5" />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="text-2xl font-light text-slate-900 tracking-tight">
          {value}
        </div>
        <div
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.2 text-[11px] font-medium ${
            isPositive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          <span>{delta}</span>
        </div>
      </div>

      <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
        <span>{periodText}</span>
        {subtext && <span className="text-slate-500">{subtext}</span>}
      </div>
    </div>
  );
}
