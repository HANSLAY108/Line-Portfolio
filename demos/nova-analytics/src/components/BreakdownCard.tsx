"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

export interface BreakdownItem {
  label: string;
  count: number;
  percentage: number;
  sublabel?: string;
  icon?: string;
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
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
              <Icon className="h-3.5 w-3.5" />
            </div>
            <h3 className="text-xs font-semibold text-slate-800">{title}</h3>
          </div>

          {tabs && onTabChange && (
            <div className="flex items-center gap-1 rounded-full bg-slate-100 p-0.5 text-[10px] font-medium text-slate-600">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => onTabChange(tab.key)}
                  className={`rounded-full px-2.5 py-0.5 transition-all ${
                    activeTab === tab.key
                      ? "bg-white text-sky-700 shadow-xs font-semibold"
                      : "hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          {displayedItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No telemetry collected yet.
            </div>
          ) : (
            displayedItems.map((item, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-xl border border-slate-100 bg-slate-50/40 p-2 transition-all hover:bg-sky-50/30">
                <div
                  className="absolute inset-y-0 left-0 bg-sky-100/50 transition-all rounded-r"
                  style={{ width: `${Math.min(item.percentage, 100)}%` }}
                />

                <div className="relative flex items-center justify-between text-xs z-10">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    {item.icon && <span className="text-xs shrink-0">{item.icon}</span>}
                    <span className="font-normal text-slate-800 truncate" title={item.label}>
                      {item.label}
                    </span>
                    {item.sublabel && (
                      <span className="text-[10px] text-slate-400 hidden sm:inline truncate">
                        {item.sublabel}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-medium text-slate-800">
                      {item.count.toLocaleString()}
                    </span>
                    <span className="w-8 text-right text-[10px] text-slate-400 font-mono">
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
        <span>Top {displayedItems.length} metrics</span>
        <span>Ranked by {metricName}</span>
      </div>
    </div>
  );
}
