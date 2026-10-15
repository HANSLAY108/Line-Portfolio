"use client";

import React, { useState, useEffect, useMemo } from "react";

// Types
type Region = "eu-central-zurich" | "us-east-virginia" | "ap-northeast-tokyo";
type TimeWindow = "1m" | "5m" | "15m" | "1h";
type MetricTab = "throughput" | "latency" | "memory";

interface TopologyNode {
  id: string;
  name: string;
  type: "edge" | "gateway" | "service" | "queue" | "database";
  status: "healthy" | "warning";
  rps: string;
  latency: string;
  cpu: number;
  memory: string;
  replicas: number;
  description: string;
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: "INFO" | "METRIC" | "WARN";
  service: string;
  message: string;
  latencyMs: number;
}

const NODES: TopologyNode[] = [
  {
    id: "edge",
    name: "Anycast Edge Gateway",
    type: "edge",
    status: "healthy",
    rps: "2.84M / s",
    latency: "1.2 ms",
    cpu: 24,
    memory: "16.4 GB",
    replicas: 32,
    description: "Cloudflare Workers & BGP Anycast routing SSL termination and DDoS scrubbing.",
  },
  {
    id: "envoy",
    name: "Envoy Proxy Mesh (Go)",
    type: "gateway",
    status: "healthy",
    rps: "2.81M / s",
    latency: "3.4 ms",
    cpu: 48,
    memory: "38.2 GB",
    replicas: 24,
    description: "High-concurrency Go proxy handling mTLS handshake and dynamic load balancing.",
  },
  {
    id: "kafka",
    name: "Kafka Ingest Cluster",
    type: "queue",
    status: "healthy",
    rps: "1.92M / s",
    latency: "2.1 ms",
    cpu: 62,
    memory: "128.0 GB",
    replicas: 12,
    description: "Distributed commit log with 1,280 partitioned topics and zero-lag replication.",
  },
  {
    id: "analytics",
    name: "Nova Real-Time Engine",
    type: "service",
    status: "healthy",
    rps: "1.45M / s",
    latency: "4.8 ms",
    cpu: 56,
    memory: "64.5 GB",
    replicas: 16,
    description: "Streaming aggregation worker written in Go/C++ computing rolling percentiles.",
  },
  {
    id: "storage",
    name: "PostgreSQL & Redis Cache",
    type: "database",
    status: "healthy",
    rps: "890k / s",
    latency: "0.8 ms",
    cpu: 38,
    memory: "96.0 GB",
    replicas: 8,
    description: "Multi-master Redis cache layer over horizontally sharded PostgreSQL nodes.",
  },
];

export default function NovaAnalyticsApp() {
  const [region, setRegion] = useState<Region>("eu-central-zurich");
  const [timeWindow, setTimeWindow] = useState<TimeWindow>("5m");
  const [activeTab, setActiveTab] = useState<MetricTab>("throughput");
  const [selectedNode, setSelectedNode] = useState<TopologyNode | null>(NODES[1] ?? null);
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [logFilter, setLogFilter] = useState<string>("ALL");
  const [logSearch, setLogSearch] = useState<string>("");
  
  // Real-time fluctuating metrics
  const [throughput, setThroughput] = useState(2841920);
  const [latency, setLatency] = useState(6.8);
  const [errorRate, setErrorRate] = useState(0.0014);

  // Live wave data generator
  const [chartPoints, setChartPoints] = useState<number[]>([
    45, 52, 48, 65, 72, 68, 80, 85, 78, 88, 92, 86, 95, 91, 89, 94, 98, 95, 99, 94,
    91, 96, 102, 98, 94, 105, 108, 101, 110, 114
  ]);

  // Live terminal logs
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "log-1",
      timestamp: "19:24:02.108",
      level: "INFO",
      service: "kafka.producer",
      message: "Batch partition sync confirmed across 12 brokers (offset 4920491)",
      latencyMs: 1.8,
    },
    {
      id: "log-2",
      timestamp: "19:24:02.482",
      level: "METRIC",
      service: "gateway.envoy",
      message: "gRPC mTLS stream throughput: 284.1k msg/s, p99=4.2ms",
      latencyMs: 4.2,
    },
    {
      id: "log-3",
      timestamp: "19:24:03.012",
      level: "INFO",
      service: "engine.aggregator",
      message: "Flushed 50,000 telemetry datapoints to clickhouse shards",
      latencyMs: 2.4,
    },
    {
      id: "log-4",
      timestamp: "19:24:03.551",
      level: "METRIC",
      service: "redis.cluster",
      message: "Cache hit ratio 99.41% over 4,200,000 read ops",
      latencyMs: 0.6,
    },
    {
      id: "log-5",
      timestamp: "19:24:04.119",
      level: "WARN",
      service: "node.monitor",
      message: "Worker pod pool auto-scaled from 14 to 16 replicas (CPU > 55%)",
      latencyMs: 5.1,
    },
  ]);

  // Live periodic simulation effect
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      // Fluctuate throughput
      const delta = (Math.random() - 0.48) * 8500;
      setThroughput((prev) => Math.round(prev + delta));

      // Fluctuate latency
      setLatency((prev) => {
        const next = prev + (Math.random() - 0.5) * 0.2;
        return Number(Math.max(4.5, Math.min(9.5, next)).toFixed(2));
      });

      // Update wave chart
      setChartPoints((prev) => {
        const last = prev[prev.length - 1] ?? 100;
        const nextVal = Math.round(Math.max(40, Math.min(130, last + (Math.random() - 0.48) * 8)));
        return [...prev.slice(1), nextVal];
      });

      // Append live log entry
      const sampleMessages = [
        { level: "METRIC" as const, service: "gateway.envoy", message: "Health probe OK across 32 anycast nodes", lat: 1.1 },
        { level: "INFO" as const, service: "kafka.ingest", message: "Kafka consumer group 'analytics-v2' committed lag=0", lat: 2.2 },
        { level: "METRIC" as const, service: "db.shards", message: "WAL checkpoint finished in 84ms on master db-01", lat: 0.9 },
        { level: "INFO" as const, service: "grpc.router", message: "Dispatched 128 routing tokens to Zurich worker cluster", lat: 3.0 },
      ];
      const pick = sampleMessages[Math.floor(Math.random() * sampleMessages.length)]!;
      const d = new Date();
      const timeStr = `${d.toTimeString().split(" ")[0]}.${d.getMilliseconds().toString().padStart(3, "0")}`;

      setLogs((prev) => [
        {
          id: `log-${Date.now()}`,
          timestamp: timeStr,
          level: pick.level,
          service: pick.service,
          message: pick.message,
          latencyMs: pick.lat,
        },
        ...prev.slice(0, 19),
      ]);
    }, 1500);

    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  // Filtered logs
  const filteredLogs = useMemo(() => {
    return logs.filter((l) => {
      const matchLevel = logFilter === "ALL" || l.level === logFilter;
      const matchSearch =
        l.message.toLowerCase().includes(logSearch.toLowerCase()) ||
        l.service.toLowerCase().includes(logSearch.toLowerCase());
      return matchLevel && matchSearch;
    });
  }, [logs, logFilter, logSearch]);

  // SVG chart path calculation
  const pathData = useMemo(() => {
    const width = 800;
    const height = 220;
    const step = width / (chartPoints.length - 1);
    const minVal = 30;
    const maxVal = 140;

    const coords = chartPoints.map((val, i) => {
      const x = i * step;
      const y = height - ((val - minVal) / (maxVal - minVal)) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    return `M 0,${coords[0]?.split(",")[1]} ` + coords.map((c) => `L ${c}`).join(" ");
  }, [chartPoints]);

  const areaData = useMemo(() => {
    return `${pathData} L 800,220 L 0,220 Z`;
  }, [pathData]);

  return (
    <div className="min-h-screen bg-[#06080E] text-[#F0F4FC]">
      {/* 1. TOP TELEMETRY STATUS BAR */}
      <div className="border-b border-[#131926] bg-[#0A0D15]/95 px-6 py-2.5 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          {/* Cluster Status Indicator */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#10B981]" />
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#10B981]">
              CLUSTER STATUS: OPTIMAL
            </span>
            <span className="hidden sm:inline-block text-[#323D52]">|</span>
            <span className="hidden sm:inline-block font-mono text-xs text-[#8A95A8]">
              48/48 Microservice Pods Synchronized
            </span>
          </div>

          {/* Region & Time Window Selectors */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-lg border border-[#1A2234] bg-[#0D121F] px-3 py-1 text-xs">
              <span className="text-[#64748B]">Region:</span>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as Region)}
                className="cursor-pointer bg-transparent font-medium text-white outline-none"
              >
                <option value="eu-central-zurich" className="bg-[#0D121F]">EU-Central (Zürich)</option>
                <option value="us-east-virginia" className="bg-[#0D121F]">US-East (N. Virginia)</option>
                <option value="ap-northeast-tokyo" className="bg-[#0D121F]">AP-East (Tokyo)</option>
              </select>
            </div>

            <div className="flex items-center rounded-lg border border-[#1A2234] bg-[#0D121F] p-0.5 text-xs">
              {(["1m", "5m", "15m", "1h"] as TimeWindow[]).map((tw) => (
                <button
                  key={tw}
                  onClick={() => setTimeWindow(tw)}
                  className={`rounded-md px-2.5 py-1 font-mono transition-colors ${
                    timeWindow === tw
                      ? "bg-[#00F2FE]/15 font-semibold text-[#00F2FE]"
                      : "text-[#64748B] hover:text-white"
                  }`}
                >
                  {tw}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsLiveStreaming(!isLiveStreaming)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1 font-mono text-xs font-semibold transition-all ${
                isLiveStreaming
                  ? "border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981]"
                  : "border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F59E0B]"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${isLiveStreaming ? "bg-[#10B981] animate-pulse" : "bg-[#F59E0B]"}`} />
              {isLiveStreaming ? "STREAMING" : "PAUSED"}
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="border-b border-[#131926] bg-[#080B12]/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#00F2FE] to-[#6366F1] shadow-[0_0_20px_rgba(0,242,254,0.3)]">
              <svg className="h-5 w-5 text-[#06080E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xl font-bold tracking-tight text-white">
                  NOVA<span className="text-[#00F2FE]">.TELEMETRY</span>
                </span>
                <span className="rounded-full border border-[#00F2FE]/20 bg-[#00F2FE]/10 px-2 py-0.5 text-[10px] font-mono text-[#00F2FE]">
                  v3.8.4-PROD
                </span>
              </div>
              <p className="text-[11px] text-[#7888A4]">
                Architected by Line Morelle · Go / Kafka / gRPC Distributed Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                alert("Simulating automated health diagnostic: All 48 microservice pods responded with OK in 14ms.");
              }}
              className="rounded-full border border-[#1A2234] bg-[#0D121F] px-4 py-2 text-xs font-semibold text-[#CBD5E1] transition-colors hover:border-[#00F2FE] hover:text-white"
            >
              Run Diagnostic
            </button>
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-[#00F2FE]/30 bg-[#00F2FE]/10 px-4 py-2 text-xs font-semibold text-[#00F2FE]">
              <span>Zero Drop Ingest</span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. KEY METRICS GRID */}
      <section className="mx-auto max-w-7xl px-6 pt-10 lg:px-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Metric 1 */}
          <div className="relative overflow-hidden rounded-2xl border border-[#161F33] bg-[#0A0E18] p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#73839E]">
                Ingestion Throughput
              </span>
              <span className="rounded-md bg-[#00F2FE]/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-[#00F2FE]">
                +6.2%
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="font-mono text-3xl font-bold text-white tracking-tight">
                {(throughput / 1000000).toFixed(2)}M
              </p>
              <span className="font-mono text-xs text-[#8A95A8]">events/s</span>
            </div>
            <p className="mt-2 text-xs text-[#62738E]">
              Peak: 3.14M/s · Sustained edge Kafka streaming
            </p>
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-[#161F33]">
              <div className="h-full bg-gradient-to-r from-[#00F2FE] to-[#6366F1] w-[88%]" />
            </div>
          </div>

          {/* Metric 2 */}
          <div className="relative overflow-hidden rounded-2xl border border-[#161F33] bg-[#0A0E18] p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#73839E]">
                P99 Request Latency
              </span>
              <span className="rounded-md bg-[#10B981]/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-[#10B981]">
                LOWEST
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="font-mono text-3xl font-bold text-[#10B981] tracking-tight">
                {latency}
              </p>
              <span className="font-mono text-xs text-[#8A95A8]">ms</span>
            </div>
            <p className="mt-2 text-xs text-[#62738E]">
              SLA target &lt; 15.0ms · Edge Go Envoy proxy
            </p>
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-[#161F33]">
              <div className="h-full bg-[#10B981] w-[35%]" />
            </div>
          </div>

          {/* Metric 3 */}
          <div className="relative overflow-hidden rounded-2xl border border-[#161F33] bg-[#0A0E18] p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#73839E]">
                Error Rate (Global)
              </span>
              <span className="rounded-md bg-[#10B981]/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-[#10B981]">
                99.998% UPTIME
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="font-mono text-3xl font-bold text-white tracking-tight">
                {errorRate}%
              </p>
              <span className="font-mono text-xs text-[#8A95A8]">5xx</span>
            </div>
            <p className="mt-2 text-xs text-[#62738E]">
              Zero critical outages across last 90 days
            </p>
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-[#161F33]">
              <div className="h-full bg-[#10B981] w-[2%]" />
            </div>
          </div>

          {/* Metric 4 */}
          <div className="relative overflow-hidden rounded-2xl border border-[#161F33] bg-[#0A0E18] p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#73839E]">
                Memory Saturation
              </span>
              <span className="rounded-md bg-[#6366F1]/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-[#6366F1]">
                STABLE
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="font-mono text-3xl font-bold text-white tracking-tight">
                42.6%
              </p>
              <span className="font-mono text-xs text-[#8A95A8]">of 512GB</span>
            </div>
            <p className="mt-2 text-xs text-[#62738E]">
              Automated garbage collection in Go 1.23 runtime
            </p>
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-[#161F33]">
              <div className="h-full bg-[#6366F1] w-[42%]" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. REAL-TIME WAVEFORM CHART */}
      <section className="mx-auto max-w-7xl px-6 pt-10 lg:px-10">
        <div className="rounded-2xl border border-[#161F33] bg-[#0A0E18] p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#141B2D]">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono text-lg font-bold text-white">
                  Real-Time Cluster Telemetry Stream
                </h3>
                <span className="flex h-2 w-2 rounded-full bg-[#00F2FE] animate-ping" />
              </div>
              <p className="text-xs text-[#73839E]">
                Dynamic continuous stream aggregated across Zurich, Virginia, and Tokyo nodes.
              </p>
            </div>

            {/* Metric Mode Tabs */}
            <div className="flex items-center rounded-lg border border-[#1A2234] bg-[#070A12] p-1 text-xs">
              {(["throughput", "latency", "memory"] as MetricTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-md px-3 py-1 font-mono uppercase tracking-wider transition-colors ${
                    activeTab === tab
                      ? "bg-[#00F2FE] font-bold text-[#06080E] shadow-sm"
                      : "text-[#73839E] hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Wave Canvas */}
          <div className="relative mt-6 h-64 w-full overflow-hidden rounded-xl bg-[#060911] border border-[#131A2B] p-2 flex flex-col justify-between">
            {/* Grid overlay lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-4">
              <div className="w-full border-b border-white/[0.04]" />
              <div className="w-full border-b border-white/[0.04]" />
              <div className="w-full border-b border-white/[0.04]" />
              <div className="w-full border-b border-white/[0.04]" />
            </div>

            {/* Top right stats */}
            <div className="relative z-10 flex justify-between px-4 pt-2 text-xs font-mono text-[#62738E]">
              <span>Max: 3.20M rps</span>
              <span className="text-[#00F2FE]">Live: {(throughput / 1000000).toFixed(2)}M rps</span>
            </div>

            {/* SVG Wave Curve */}
            <div className="relative h-44 w-full">
              <svg
                className="h-full w-full"
                viewBox="0 0 800 220"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#00F2FE" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <path d={areaData} fill="url(#waveGradient)" />
                <path
                  d={pathData}
                  fill="none"
                  stroke="#00F2FE"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Time labels bottom */}
            <div className="relative z-10 flex justify-between px-4 pb-2 text-[10px] font-mono text-[#52637D]">
              <span>- 5 minutes</span>
              <span>- 4 min</span>
              <span>- 3 min</span>
              <span>- 2 min</span>
              <span>- 1 min</span>
              <span className="text-[#00F2FE] font-bold">Now (0s)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE TOPOLOGY & INSPECTOR */}
      <section className="mx-auto max-w-7xl px-6 pt-10 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Topology diagram */}
          <div className="lg:col-span-2 rounded-2xl border border-[#161F33] bg-[#0A0E18] p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#141B2D]">
              <div>
                <h3 className="font-mono text-base font-bold text-white">
                  Distributed Topology & Mesh Routing
                </h3>
                <p className="text-xs text-[#73839E]">
                  Click on any infrastructure layer to inspect live runtime metrics.
                </p>
              </div>
              <span className="font-mono text-[11px] text-[#10B981]">
                Zero Bottlenecks
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {NODES.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? "border-[#00F2FE] bg-[#00F2FE]/10 shadow-[0_0_20px_rgba(0,242,254,0.1)]"
                        : "border-[#141C2E] bg-[#080B13] hover:border-[#1E2B47] hover:bg-[#0D1322]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          node.status === "healthy" ? "bg-[#10B981]" : "bg-[#F59E0B]"
                        }`}
                      />
                      <div>
                        <h4 className="font-mono text-sm font-semibold text-white">
                          {node.name}
                        </h4>
                        <p className="text-xs text-[#6F809B]">{node.description}</p>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-6 text-right font-mono text-xs">
                      <div>
                        <p className="text-white">{node.rps}</p>
                        <p className="text-[10px] text-[#55657E]">Load</p>
                      </div>
                      <div>
                        <p className="text-[#10B981]">{node.latency}</p>
                        <p className="text-[10px] text-[#55657E]">Latency</p>
                      </div>
                      <div className="w-16">
                        <p className="text-white">{node.cpu}%</p>
                        <div className="h-1 w-full bg-[#182136] rounded-full overflow-hidden mt-1">
                          <div
                            className="h-full bg-[#00F2FE]"
                            style={{ width: `${node.cpu}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Node Detail Inspector */}
          <div className="rounded-2xl border border-[#161F33] bg-[#0A0E18] p-6 shadow-xl flex flex-col justify-between">
            {selectedNode ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#00F2FE]">
                      Target Node Inspector
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#10B981]">
                      ● HEALTHY
                    </span>
                  </div>
                  <h4 className="mt-1 font-mono text-xl font-bold text-white">
                    {selectedNode.name}
                  </h4>
                  <p className="mt-1 text-xs text-[#73839E]">
                    {selectedNode.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="rounded-xl border border-[#141C2E] bg-[#070A12] p-3">
                    <span className="text-[10px] uppercase text-[#61718B]">Throughput</span>
                    <p className="mt-1 text-sm font-bold text-white">{selectedNode.rps}</p>
                  </div>
                  <div className="rounded-xl border border-[#141C2E] bg-[#070A12] p-3">
                    <span className="text-[10px] uppercase text-[#61718B]">Latency</span>
                    <p className="mt-1 text-sm font-bold text-[#10B981]">{selectedNode.latency}</p>
                  </div>
                  <div className="rounded-xl border border-[#141C2E] bg-[#070A12] p-3">
                    <span className="text-[10px] uppercase text-[#61718B]">CPU Usage</span>
                    <p className="mt-1 text-sm font-bold text-white">{selectedNode.cpu}%</p>
                  </div>
                  <div className="rounded-xl border border-[#141C2E] bg-[#070A12] p-3">
                    <span className="text-[10px] uppercase text-[#61718B]">Memory</span>
                    <p className="mt-1 text-sm font-bold text-[#6366F1]">{selectedNode.memory}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-[#141C2E] bg-[#070A12] p-4 font-mono text-xs space-y-2">
                  <span className="text-[10px] uppercase text-[#61718B]">Architecture Specs</span>
                  <div className="flex justify-between text-[#8E9EB8]">
                    <span>Replicas:</span>
                    <span className="text-white">{selectedNode.replicas} pods</span>
                  </div>
                  <div className="flex justify-between text-[#8E9EB8]">
                    <span>Orchestrator:</span>
                    <span className="text-white">Kubernetes v1.30</span>
                  </div>
                  <div className="flex justify-between text-[#8E9EB8]">
                    <span>Runtime:</span>
                    <span className="text-white">Go 1.23 + eBPF</span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Simulating rolling restart of ${selectedNode.name}: 0 dropped packets.`)}
                  className="w-full rounded-xl border border-[#00F2FE]/40 bg-[#00F2FE]/10 py-2.5 font-mono text-xs font-semibold text-[#00F2FE] hover:bg-[#00F2FE]/20 transition-all"
                >
                  Trigger Rolling Hot-Reload
                </button>
              </div>
            ) : (
              <p className="text-center text-xs text-[#73839E]">Select a node to inspect</p>
            )}
          </div>
        </div>
      </section>

      {/* 6. STREAMING KAFKA EVENT LOGS */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="rounded-2xl border border-[#161F33] bg-[#0A0E18] p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#141B2D]">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono text-base font-bold text-white">
                  Real-Time Kafka Event Ledger
                </h3>
                <span className="font-mono text-[10px] text-[#00F2FE]">
                  Topic: telemetry.ingress.v1
                </span>
              </div>
              <p className="text-xs text-[#73839E]">
                High-throughput distributed event stream recorded across microservice pipelines.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="Filter messages..."
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
                className="rounded-lg border border-[#1A2234] bg-[#070A12] px-3 py-1 text-xs font-mono text-white placeholder:text-[#52637D] outline-none focus:border-[#00F2FE]"
              />

              <div className="flex items-center rounded-lg border border-[#1A2234] bg-[#070A12] p-0.5 text-xs font-mono">
                {["ALL", "INFO", "METRIC", "WARN"].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setLogFilter(lvl)}
                    className={`rounded px-2.5 py-1 transition-colors ${
                      logFilter === lvl
                        ? "bg-[#182338] font-bold text-white"
                        : "text-[#62738E] hover:text-white"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Terminal Box */}
          <div className="mt-4 max-h-72 overflow-y-auto rounded-xl border border-[#131A2B] bg-[#04060A] p-4 font-mono text-xs divide-y divide-[#0D1424]">
            {filteredLogs.map((log) => (
              <div key={log.id} className="py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <span className="text-[#55657E] shrink-0">{log.timestamp}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                      log.level === "INFO"
                        ? "bg-blue-500/10 text-blue-400"
                        : log.level === "METRIC"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {log.level}
                  </span>
                  <span className="text-[#7F93B0] shrink-0">{log.service}</span>
                  <span className="text-[#DDE6F5] truncate">{log.message}</span>
                </div>

                <span className="text-[10px] text-[#61718B] shrink-0">
                  {log.latencyMs}ms
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t border-[#131926] bg-[#04060A] py-8 text-center text-xs font-mono text-[#62738E]">
        <div className="mx-auto max-w-7xl px-6">
          <p>
            NOVA Telemetry Platform · Designed and Engineered by <span className="text-white">Line Morelle</span>
          </p>
          <p className="mt-1 text-[11px] text-[#475569]">
            Go 1.23 Microservices · Apache Kafka Event Ingest · High-Performance Web Architecture
          </p>
        </div>
      </footer>
    </div>
  );
}
