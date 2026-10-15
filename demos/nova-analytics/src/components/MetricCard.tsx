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
      className={`group relative rounded-2xl border p-5 transition-all cursor-pointer ${
        isActive
          ? "border-sky-500 bg-white ring-2 ring-sky-500/20 shadow-sm"
          : "border-slate-200/80 bg-white hover:border-sky-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-600 transition-colors">
          {title}
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-sky-600 group-hover:bg-sky-100 transition-colors">
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {value}
        </div>
        <div
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
            isPositive
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
              : "bg-rose-50 text-rose-700 border border-rose-200/60"
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

      <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
        <span>{periodText}</span>
        {subtext && <span className="font-medium text-slate-500">{subtext}</span>}
      </div>
    </div>
  );
}
