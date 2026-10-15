"use client";

import React, { useState, useEffect, useRef } from "react";

// Types
type AppId = "code" | "canvas" | "terminal" | "files" | "settings";
type WallpaperTheme = "aurora" | "obsidian" | "swiss";

interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

export default function AetherOSApp() {
  const [time, setTime] = useState("");
  const [wallpaper, setWallpaper] = useState<WallpaperTheme>("aurora");
  const [activeApp, setActiveApp] = useState<AppId | null>("code");
  const [highestZ, setHighestZ] = useState(10);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(85);

  // Windows management
  const [windows, setWindows] = useState<Record<AppId, WindowState>>({
    code: {
      id: "code",
      title: "Aether Code Studio — main.rs",
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      x: 80,
      y: 60,
      width: 700,
      height: 480,
      zIndex: 5,
    },
    canvas: {
      id: "canvas",
      title: "Spatial Geometry Engine — WebGPU Canvas",
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      x: 320,
      y: 120,
      width: 620,
      height: 420,
      zIndex: 6,
    },
    terminal: {
      id: "terminal",
      title: "aether-sh — 80×24",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 140,
      y: 160,
      width: 600,
      height: 380,
      zIndex: 4,
    },
    files: {
      id: "files",
      title: "Finder — Line Morelle Projects",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 200,
      y: 100,
      width: 640,
      height: 400,
      zIndex: 3,
    },
    settings: {
      id: "settings",
      title: "System Settings",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 260,
      y: 140,
      width: 520,
      height: 380,
      zIndex: 2,
    },
  });

  // Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) +
          "  " +
          now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Bring window to focus
  const focusWindow = (id: AppId) => {
    const nextZ = highestZ + 1;
    setHighestZ(nextZ);
    setActiveApp(id);
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: false, zIndex: nextZ },
    }));
  };

  const toggleWindow = (id: AppId) => {
    const win = windows[id];
    if (!win.isOpen) {
      const nextZ = highestZ + 1;
      setHighestZ(nextZ);
      setActiveApp(id);
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: nextZ },
      }));
    } else if (win.isMinimized) {
      focusWindow(id);
    } else if (activeApp === id) {
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], isMinimized: true },
      }));
      setActiveApp(null);
    } else {
      focusWindow(id);
    }
  };

  const closeWindow = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
    if (activeApp === id) setActiveApp(null);
  };

  const minimizeWindow = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
    if (activeApp === id) setActiveApp(null);
  };

  const maximizeWindow = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
    }));
  };

  // Dragging window state
  const [dragState, setDragState] = useState<{
    id: AppId;
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
  } | null>(null);

  const startDrag = (id: AppId, e: React.MouseEvent) => {
    focusWindow(id);
    if (windows[id].isMaximized) return;
    setDragState({
      id,
      startX: e.clientX,
      startY: e.clientY,
      initialX: windows[id].x,
      initialY: windows[id].y,
    });
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragState) return;
      const dx = e.clientX - dragState.startX;
      const dy = e.clientY - dragState.startY;
      setWindows((prev) => ({
        ...prev,
        [dragState.id]: {
          ...prev[dragState.id],
          x: Math.max(0, dragState.initialX + dx),
          y: Math.max(30, dragState.initialY + dy),
        },
      }));
    };

    const onMouseUp = () => setDragState(null);

    if (dragState) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragState]);

  // Canvas visual animation ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 90;

      // Draw rotating 3D geometric ring nodes
      const pointsCount = 18;
      const pts: { x: number; y: number; z: number }[] = [];

      for (let i = 0; i < pointsCount; i++) {
        const theta = (i / pointsCount) * Math.PI * 2 + angle;
        const x = Math.cos(theta) * radius;
        const y = Math.sin(theta) * (radius * 0.45);
        const z = Math.sin(theta + angle);
        pts.push({ x: centerX + x, y: centerY + y, z });
      }

      // Connecting laser strands
      ctx.strokeStyle = "rgba(0, 242, 254, 0.45)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < pts.length; i++) {
        const p1 = pts[i]!;
        const p2 = pts[(i + 1) % pts.length]!;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        // Core chords
        const p3 = pts[(i + 7) % pts.length]!;
        ctx.lineTo(p3.x, p3.y);
      }
      ctx.stroke();

      // Nodes
      pts.forEach((p) => {
        ctx.fillStyle = "#FF7EB6";
        ctx.shadowColor = "#00F2FE";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      angle += 0.015;
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [windows.canvas.isOpen, windows.canvas.isMinimized]);

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "AETHER OS Kernel v2.4.0 (x86_64-wasm-unknown)",
    "Type 'help' to inspect available system commands.",
    "",
  ]);
  const [terminalInput, setTerminalInput] = useState("");

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    const next = [...terminalHistory, `aether@linemorelle:~$ ${terminalInput}`];

    if (cmd === "help") {
      next.push(
        "Available commands:",
        "  neofetch    - Display Aether OS system architecture",
        "  ls          - List directory files & projects",
        "  whoami      - Author identity & role",
        "  clear       - Clear terminal window",
        "  theme       - Current wallpaper theme"
      );
    } else if (cmd === "neofetch") {
      next.push(
        "       /\\         OS: Aether OS v2.4 (Spatial Web Desktop)",
        "      /  \\        Host: Browser WebAssembly Engine",
        "     / /\\ \\       Kernel: Rust 1.82 / WASM Virtual Machine",
        "    / ____ \\      Uptime: 42 hours, 14 mins",
        "   /_/    \\_\\     Shell: aether-sh 1.2",
        "                  Author: Line Morelle (Zurich, CH)"
      );
    } else if (cmd === "whoami") {
      next.push("Line Morelle — High-Performance Software Engineer & System Architect");
    } else if (cmd === "ls") {
      next.push("salesboost.app   veloce-commerce/   nova-analytics/   aether-os/   cv.pdf");
    } else if (cmd === "clear") {
      setTerminalHistory([]);
      setTerminalInput("");
      return;
    } else if (cmd === "theme") {
      next.push(`Active wallpaper: ${wallpaper}`);
    } else if (cmd !== "") {
      next.push(`Command not found: ${cmd}. Type 'help' for available commands.`);
    }

    setTerminalHistory(next);
    setTerminalInput("");
  };

  // Wallpapers
  const wallpaperClass =
    wallpaper === "aurora"
      ? "bg-gradient-to-br from-[#0c0d1a] via-[#1a1226] to-[#070e1b]"
      : wallpaper === "obsidian"
        ? "bg-gradient-to-br from-[#0a0a0d] via-[#121318] to-[#050508]"
        : "bg-gradient-to-br from-[#1e2738] via-[#141b29] to-[#0b0e14]";

  return (
    <div
      className={`relative h-screen w-screen overflow-hidden select-none font-sans ${wallpaperClass}`}
      style={{ filter: `brightness(${brightness}%)` }}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#FF7EB6]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#00F2FE]/15 blur-[120px] pointer-events-none" />

      {/* 1. TOP SYSTEM MENU BAR */}
      <div className="relative z-50 flex h-7 w-full items-center justify-between border-b border-white/10 bg-black/40 px-4 text-xs font-medium text-white/90 backdrop-blur-xl">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 cursor-pointer font-bold tracking-wider">
            <span className="text-[#00F2FE]">✦</span>
            <span>AETHER OS</span>
          </div>

          <span className="hidden sm:inline-block font-semibold text-white/80">
            {activeApp ? windows[activeApp]?.title.split("—")[0] : "Desktop"}
          </span>

          <div className="hidden md:flex items-center gap-4 text-white/60 text-[11px]">
            <span className="cursor-pointer hover:text-white">File</span>
            <span className="cursor-pointer hover:text-white">Edit</span>
            <span className="cursor-pointer hover:text-white">View</span>
            <span className="cursor-pointer hover:text-white">Window</span>
            <span className="cursor-pointer hover:text-white">Help</span>
          </div>
        </div>

        {/* Right Status Tray */}
        <div className="flex items-center gap-4 text-[11px] text-white/80">
          <span className="hidden sm:inline-block font-mono text-emerald-400">● 60 FPS</span>
          <span className="hidden sm:inline-block">WiFi 5GHz</span>
          <span className="hidden sm:inline-block">🔋 98%</span>

          <button
            onClick={() => setControlCenterOpen(!controlCenterOpen)}
            className="flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-white/10"
          >
            <span>Control</span>
          </button>

          <span className="font-mono text-xs">{time}</span>
        </div>
      </div>

      {/* Control Center Popover */}
      {controlCenterOpen && (
        <div className="absolute top-9 right-4 z-50 w-72 rounded-2xl border border-white/20 bg-black/70 p-4 shadow-2xl backdrop-blur-2xl">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">
            Quick Settings
          </h4>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-white/80 mb-1">
                <span>Display Brightness</span>
                <span>{brightness}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="120"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full accent-[#00F2FE]"
              />
            </div>

            <div>
              <div className="flex justify-between text-white/80 mb-1">
                <span>Output Volume</span>
                <span>{volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-[#FF7EB6]"
              />
            </div>

            <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[11px]">
              <span className="text-white/70">Virtual Machine</span>
              <span className="font-mono text-emerald-400">WebAssembly 1.0</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. WINDOWS WORKSPACE */}
      <div className="relative h-[calc(100vh-3.5rem)] w-full">
        {/* WINDOW 1: CODE STUDIO */}
        {windows.code.isOpen && !windows.code.isMinimized && (
          <div
            onClick={() => focusWindow("code")}
            style={{
              position: "absolute",
              left: windows.code.isMaximized ? 0 : windows.code.x,
              top: windows.code.isMaximized ? 0 : windows.code.y,
              width: windows.code.isMaximized ? "100%" : windows.code.width,
              height: windows.code.isMaximized ? "100%" : windows.code.height,
              zIndex: windows.code.zIndex,
            }}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#0B0D14]/90 shadow-2xl backdrop-blur-xl"
          >
            {/* Titlebar */}
            <div
              onMouseDown={(e) => startDrag("code", e)}
              className="flex h-10 items-center justify-between border-b border-white/10 bg-white/5 px-4 cursor-move"
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => closeWindow("code")}
                  className="h-3 w-3 rounded-full bg-[#FF5F56] hover:opacity-80"
                />
                <button
                  onClick={() => minimizeWindow("code")}
                  className="h-3 w-3 rounded-full bg-[#FFBD2E] hover:opacity-80"
                />
                <button
                  onClick={() => maximizeWindow("code")}
                  className="h-3 w-3 rounded-full bg-[#27C93F] hover:opacity-80"
                />
                <span className="ml-3 font-mono text-xs text-white/70">
                  {windows.code.title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert("Simulating Rust/Wasm compiler: 0 errors. Executable ready in 48ms.")}
                  className="rounded-md bg-[#00F2FE]/20 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#00F2FE] hover:bg-[#00F2FE]/30"
                >
                  ▶ Run Wasm
                </button>
              </div>
            </div>

            {/* Code editor content */}
            <div className="flex-1 overflow-auto p-4 font-mono text-xs text-[#E6EDF3] leading-relaxed">
              <div className="text-white/40">// Aether Spatial OS — Core Compositor</div>
              <div className="text-white/40">// Architected by Line Morelle (Zürich)</div>
              <br />
              <div>
                <span className="text-[#FF7EB6]">use</span> wasm_bindgen::prelude::*;
              </div>
              <div>
                <span className="text-[#FF7EB6]">use</span> webgpu_core::geometry::Mesh;
              </div>
              <br />
              <div>
                <span className="text-[#00F2FE]">#[wasm_bindgen]</span>
              </div>
              <div>
                <span className="text-[#FF7EB6]">pub struct</span> SpatialEngine &#123;
              </div>
              <div className="pl-4">
                nodes_count: <span className="text-[#79C0FF]">usize</span>,
              </div>
              <div className="pl-4">
                fps_target: <span className="text-[#79C0FF]">u32</span>,
              </div>
              <div className="pl-4">
                frame_latency_ms: <span className="text-[#79C0FF]">f32</span>,
              </div>
              <div>&#125;</div>
              <br />
              <div>
                <span className="text-[#00F2FE]">#[wasm_bindgen]</span>
              </div>
              <div>
                <span className="text-[#FF7EB6]">impl</span> SpatialEngine &#123;
              </div>
              <div className="pl-4">
                <span className="text-[#FF7EB6]">pub fn</span> new() -&gt; Self &#123;
              </div>
              <div className="pl-8 text-white/70">
                Self &#123; nodes_count: <span className="text-[#FFA657]">1280</span>, fps_target: <span className="text-[#FFA657]">60</span>, frame_latency_ms: <span className="text-[#FFA657]">1.2</span> &#125;
              </div>
              <div className="pl-4">&#125;</div>
              <br />
              <div className="pl-4">
                <span className="text-[#FF7EB6]">pub fn</span> dispatch_frame(&amp;<span className="text-[#FF7EB6]">self</span>) -&gt; <span className="text-[#79C0FF]">bool</span> &#123;
              </div>
              <div className="pl-8 text-emerald-400">
                // Hardware accelerated zero-copy surface rasterization
              </div>
              <div className="pl-8">
                <span className="text-[#FF7EB6]">true</span>
              </div>
              <div className="pl-4">&#125;</div>
              <div>&#125;</div>
            </div>
          </div>
        )}

        {/* WINDOW 2: SPATIAL CANVAS */}
        {windows.canvas.isOpen && !windows.canvas.isMinimized && (
          <div
            onClick={() => focusWindow("canvas")}
            style={{
              position: "absolute",
              left: windows.canvas.isMaximized ? 0 : windows.canvas.x,
              top: windows.canvas.isMaximized ? 0 : windows.canvas.y,
              width: windows.canvas.isMaximized ? "100%" : windows.canvas.width,
              height: windows.canvas.isMaximized ? "100%" : windows.canvas.height,
              zIndex: windows.canvas.zIndex,
            }}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#090C14]/90 shadow-2xl backdrop-blur-xl"
          >
            {/* Titlebar */}
            <div
              onMouseDown={(e) => startDrag("canvas", e)}
              className="flex h-10 items-center justify-between border-b border-white/10 bg-white/5 px-4 cursor-move"
            >
              <div className="flex items-center gap-2">
                <button onClick={() => closeWindow("canvas")} className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                <button onClick={() => minimizeWindow("canvas")} className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <button onClick={() => maximizeWindow("canvas")} className="h-3 w-3 rounded-full bg-[#27C93F]" />
                <span className="ml-3 font-mono text-xs text-white/70">{windows.canvas.title}</span>
              </div>
              <span className="font-mono text-[10px] text-[#00F2FE]">60.0 FPS · Canvas2D</span>
            </div>

            {/* Canvas Area */}
            <div className="relative flex-1 bg-radial from-[#121626] to-[#060810] flex items-center justify-center p-4">
              <canvas
                ref={canvasRef}
                width={560}
                height={320}
                className="rounded-xl border border-white/10 bg-black/40 shadow-inner"
              />
              <div className="absolute bottom-6 left-6 text-[10px] font-mono text-white/60">
                Interactive Generative Geometry Shader · Live WebGL/Canvas
              </div>
            </div>
          </div>
        )}

        {/* WINDOW 3: TERMINAL */}
        {windows.terminal.isOpen && !windows.terminal.isMinimized && (
          <div
            onClick={() => focusWindow("terminal")}
            style={{
              position: "absolute",
              left: windows.terminal.isMaximized ? 0 : windows.terminal.x,
              top: windows.terminal.isMaximized ? 0 : windows.terminal.y,
              width: windows.terminal.isMaximized ? "100%" : windows.terminal.width,
              height: windows.terminal.isMaximized ? "100%" : windows.terminal.height,
              zIndex: windows.terminal.zIndex,
            }}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-black/90 shadow-2xl backdrop-blur-xl"
          >
            <div
              onMouseDown={(e) => startDrag("terminal", e)}
              className="flex h-10 items-center justify-between border-b border-white/10 bg-white/5 px-4 cursor-move"
            >
              <div className="flex items-center gap-2">
                <button onClick={() => closeWindow("terminal")} className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                <button onClick={() => minimizeWindow("terminal")} className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <button onClick={() => maximizeWindow("terminal")} className="h-3 w-3 rounded-full bg-[#27C93F]" />
                <span className="ml-3 font-mono text-xs text-white/70">{windows.terminal.title}</span>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 font-mono text-xs text-[#00F2FE]">
              {terminalHistory.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap leading-relaxed">{line}</div>
              ))}
              <form onSubmit={handleTerminalSubmit} className="mt-2 flex items-center gap-2">
                <span className="text-[#FF7EB6]">aether@linemorelle:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="flex-1 bg-transparent text-white outline-none"
                  autoFocus
                />
              </form>
            </div>
          </div>
        )}

        {/* WINDOW 4: FILES */}
        {windows.files.isOpen && !windows.files.isMinimized && (
          <div
            onClick={() => focusWindow("files")}
            style={{
              position: "absolute",
              left: windows.files.isMaximized ? 0 : windows.files.x,
              top: windows.files.isMaximized ? 0 : windows.files.y,
              width: windows.files.isMaximized ? "100%" : windows.files.width,
              height: windows.files.isMaximized ? "100%" : windows.files.height,
              zIndex: windows.files.zIndex,
            }}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#0B0D14]/90 shadow-2xl backdrop-blur-xl"
          >
            <div
              onMouseDown={(e) => startDrag("files", e)}
              className="flex h-10 items-center justify-between border-b border-white/10 bg-white/5 px-4 cursor-move"
            >
              <div className="flex items-center gap-2">
                <button onClick={() => closeWindow("files")} className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                <button onClick={() => minimizeWindow("files")} className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <button onClick={() => maximizeWindow("files")} className="h-3 w-3 rounded-full bg-[#27C93F]" />
                <span className="ml-3 font-mono text-xs text-white/70">{windows.files.title}</span>
              </div>
            </div>

            <div className="flex-1 p-6 grid grid-cols-3 gap-4 text-xs font-mono">
              <div
                onClick={() => alert("Project: Veloce Commerce — Next.js, GraphQL, Redis Headless E-Commerce")}
                className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-4 text-center hover:bg-white/10 transition-colors"
              >
                <div className="text-3xl mb-2">📁</div>
                <p className="font-semibold text-white">veloce-commerce</p>
                <p className="text-[10px] text-white/50">E-Commerce Platform</p>
              </div>

              <div
                onClick={() => alert("Project: Nova Analytics — Go, Kafka, gRPC Real-Time Infrastructure Telemetry")}
                className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-4 text-center hover:bg-white/10 transition-colors"
              >
                <div className="text-3xl mb-2">📊</div>
                <p className="font-semibold text-white">nova-analytics</p>
                <p className="text-[10px] text-white/50">Telemetry Engine</p>
              </div>

              <div
                onClick={() => alert("Project: SalesBoost — High-Converting Sales Automation SaaS Platform")}
                className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-4 text-center hover:bg-white/10 transition-colors"
              >
                <div className="text-3xl mb-2">🚀</div>
                <p className="font-semibold text-white">salesboost.app</p>
                <p className="text-[10px] text-white/50">Live SaaS on Vercel</p>
              </div>
            </div>
          </div>
        )}

        {/* WINDOW 5: SETTINGS */}
        {windows.settings.isOpen && !windows.settings.isMinimized && (
          <div
            onClick={() => focusWindow("settings")}
            style={{
              position: "absolute",
              left: windows.settings.isMaximized ? 0 : windows.settings.x,
              top: windows.settings.isMaximized ? 0 : windows.settings.y,
              width: windows.settings.isMaximized ? "100%" : windows.settings.width,
              height: windows.settings.isMaximized ? "100%" : windows.settings.height,
              zIndex: windows.settings.zIndex,
            }}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#0B0D14]/90 shadow-2xl backdrop-blur-xl"
          >
            <div
              onMouseDown={(e) => startDrag("settings", e)}
              className="flex h-10 items-center justify-between border-b border-white/10 bg-white/5 px-4 cursor-move"
            >
              <div className="flex items-center gap-2">
                <button onClick={() => closeWindow("settings")} className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                <button onClick={() => minimizeWindow("settings")} className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <button onClick={() => maximizeWindow("settings")} className="h-3 w-3 rounded-full bg-[#27C93F]" />
                <span className="ml-3 font-mono text-xs text-white/70">{windows.settings.title}</span>
              </div>
            </div>

            <div className="flex-1 p-6 space-y-6 text-xs">
              <div>
                <h4 className="font-semibold text-white mb-2">Select Desktop Theme</h4>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setWallpaper("aurora")}
                    className={`rounded-xl border p-3 text-center transition-all ${
                      wallpaper === "aurora" ? "border-[#00F2FE] bg-[#00F2FE]/10" : "border-white/10 bg-white/5"
                    }`}
                  >
                    <p className="font-semibold text-white">Aurora Rose</p>
                    <p className="text-[10px] text-white/50">Cosmic Dusk</p>
                  </button>

                  <button
                    onClick={() => setWallpaper("obsidian")}
                    className={`rounded-xl border p-3 text-center transition-all ${
                      wallpaper === "obsidian" ? "border-[#00F2FE] bg-[#00F2FE]/10" : "border-white/10 bg-white/5"
                    }`}
                  >
                    <p className="font-semibold text-white">Obsidian</p>
                    <p className="text-[10px] text-white/50">Deep Black</p>
                  </button>

                  <button
                    onClick={() => setWallpaper("swiss")}
                    className={`rounded-xl border p-3 text-center transition-all ${
                      wallpaper === "swiss" ? "border-[#00F2FE] bg-[#00F2FE]/10" : "border-white/10 bg-white/5"
                    }`}
                  >
                    <p className="font-semibold text-white">Swiss Alpine</p>
                    <p className="text-[10px] text-white/50">Minimal Blue</p>
                  </button>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 text-[11px] text-white/60 space-y-1">
                <p>Aether Spatial OS v2.4.0</p>
                <p>Designed and Implemented by Line Morelle</p>
                <p>Built with Rust, WebAssembly, and Canvas API</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. FLOATING GLASS DOCK */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center z-50 pointer-events-auto">
        <div className="flex items-center gap-3 rounded-3xl border border-white/20 bg-white/10 px-4 py-2.5 shadow-2xl backdrop-blur-2xl transition-all">
          {/* Code Studio */}
          <button
            onClick={() => toggleWindow("code")}
            className="group relative flex flex-col items-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#3B82F6] to-[#00F2FE] shadow-lg transition-transform group-hover:scale-115 active:scale-95 text-xl">
              💻
            </div>
            {windows.code.isOpen && !windows.code.isMinimized && (
              <span className="mt-1 h-1 w-1 rounded-full bg-white" />
            )}
          </button>

          {/* Spatial Canvas */}
          <button
            onClick={() => toggleWindow("canvas")}
            className="group relative flex flex-col items-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#EC4899] to-[#8B5CF6] shadow-lg transition-transform group-hover:scale-115 active:scale-95 text-xl">
              🎨
            </div>
            {windows.canvas.isOpen && !windows.canvas.isMinimized && (
              <span className="mt-1 h-1 w-1 rounded-full bg-white" />
            )}
          </button>

          {/* Terminal */}
          <button
            onClick={() => toggleWindow("terminal")}
            className="group relative flex flex-col items-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#1E293B] to-[#0F172A] border border-white/20 shadow-lg transition-transform group-hover:scale-115 active:scale-95 text-xl">
              ⌨️
            </div>
            {windows.terminal.isOpen && !windows.terminal.isMinimized && (
              <span className="mt-1 h-1 w-1 rounded-full bg-white" />
            )}
          </button>

          {/* Files */}
          <button
            onClick={() => toggleWindow("files")}
            className="group relative flex flex-col items-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#0EA5E9] to-[#38BDF8] shadow-lg transition-transform group-hover:scale-115 active:scale-95 text-xl">
              📁
            </div>
            {windows.files.isOpen && !windows.files.isMinimized && (
              <span className="mt-1 h-1 w-1 rounded-full bg-white" />
            )}
          </button>

          {/* Settings */}
          <button
            onClick={() => toggleWindow("settings")}
            className="group relative flex flex-col items-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#64748B] to-[#475569] shadow-lg transition-transform group-hover:scale-115 active:scale-95 text-xl">
              ⚙️
            </div>
            {windows.settings.isOpen && !windows.settings.isMinimized && (
              <span className="mt-1 h-1 w-1 rounded-full bg-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
