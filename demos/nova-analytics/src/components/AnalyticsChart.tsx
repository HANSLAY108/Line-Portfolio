"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface ChartDataPoint {
  date: string;
  visitors: number;
  pageviews: number;
}

interface AnalyticsChartProps {
  data: ChartDataPoint[];
}

export default function AnalyticsChart({ data }: AnalyticsChartProps) {
  const [metric, setMetric] = useState<"both" | "visitors" | "pageviews">("both");

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900">Traffic Over Time</h3>
          <p className="text-xs text-slate-500">Aggregated daily unique visitors & total pageviews</p>
        </div>

        <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 p-1 text-xs font-semibold text-slate-600 self-start sm:self-auto">
          <button
            onClick={() => setMetric("both")}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              metric === "both"
                ? "bg-white text-sky-700 shadow-sm"
                : "hover:text-slate-900"
            }`}
          >
            All Traffic
          </button>
          <button
            onClick={() => setMetric("visitors")}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              metric === "visitors"
                ? "bg-white text-sky-700 shadow-sm"
                : "hover:text-slate-900"
            }`}
          >
            Visitors Only
          </button>
          <button
            onClick={() => setMetric("pageviews")}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              metric === "pageviews"
                ? "bg-white text-sky-700 shadow-sm"
                : "hover:text-slate-900"
            }`}
          >
            Pageviews Only
          </button>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPageviews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284c7" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#0284c7" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="date"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v))}
            />
            <Tooltip
              content={({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-xl border border-sky-100 bg-white/95 p-3 shadow-lg shadow-sky-900/10 backdrop-blur-sm text-xs">
                      <p className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1">{label}</p>
                      {payload.map((entry: any, index: number) => (
                        <div key={`item-${index}`} className="flex items-center justify-between gap-4 py-0.5">
                          <span className="flex items-center gap-1.5 text-slate-600">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            {entry.name === "visitors" ? "Unique Visitors" : "Pageviews"}
                          </span>
                          <span className="font-bold text-slate-900">
                            {Number(entry.value).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            {(metric === "both" || metric === "pageviews") && (
              <Area
                type="monotone"
                dataKey="pageviews"
                stroke="#38bdf8"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPageviews)"
                name="pageviews"
              />
            )}
            {(metric === "both" || metric === "visitors") && (
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#0284c7"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorVisitors)"
                name="visitors"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-500 border-t border-slate-100 pt-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#0284c7]"></span>
          <span>Unique Visitors</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#38bdf8]"></span>
          <span>Total Pageviews</span>
        </div>
      </div>
    </div>
  );
}
