"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

export interface BreakdownItem {
  label: string;
  count: number;
  percentage: number;
  sublabel?: string;
  icon?: string; // emoji or icon
}

interface BreakdownCardProps {
  title: string;
  icon: LucideIcon;
  items: BreakdownItem[];
  metricName?: string;
  tabs?: { key: string; label: string }[];
  activeTab?: string;
  onTabChange?: (key: string) => void;
  maxDisplay?: number;
}

export default function BreakdownCard({
  title,
  icon: Icon,
  items,
  metricName = "Visitors",
  tabs,
  activeTab,
  onTabChange,
  maxDisplay = 6,
}: BreakdownCardProps) {
  const displayedItems = items.slice(0, maxDisplay);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
              <Icon className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">{title}</h3>
          </div>

          {tabs && onTabChange && (
            <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-0.5 text-[11px] font-semibold text-slate-600">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => onTabChange(tab.key)}
                  className={`rounded-md px-2 py-1 transition-all ${
                    activeTab === tab.key
                      ? "bg-white text-sky-700 shadow-xs"
                      : "hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2.5">
          {displayedItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No data collected for this period yet.
            </div>
          ) : (
            displayedItems.map((item, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-xl border border-slate-100 bg-slate-50/50 p-2.5 transition-all hover:bg-sky-50/40 hover:border-sky-200">
                {/* Visual Progress Bar in background */}
                <div
                  className="absolute inset-y-0 left-0 bg-sky-100/60 transition-all rounded-r"
                  style={{ width: `${Math.min(item.percentage, 100)}%` }}
                />

                <div className="relative flex items-center justify-between text-xs z-10">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    {item.icon && <span className="text-sm shrink-0">{item.icon}</span>}
                    <span className="font-medium text-slate-800 truncate" title={item.label}>
                      {item.label}
                    </span>
                    {item.sublabel && (
                      <span className="text-[10px] text-slate-400 hidden sm:inline truncate">
                        {item.sublabel}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-semibold text-slate-900">
                      {item.count.toLocaleString()}
                    </span>
                    <span className="w-9 text-right text-[11px] text-slate-500 font-mono">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Top {displayedItems.length} sources</span>
        <span>Ranked by {metricName}</span>
      </div>
    </div>
  );
}
