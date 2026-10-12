"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setMounted(true);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 5 seconds display before revealing the site
    const closeTimer = setTimeout(() => {
      setIsClosing(true);
    }, 5000);

    const doneTimer = setTimeout(() => {
      setIsDone(true);
      document.body.style.overflow = originalOverflow;
    }, 6000);

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!mounted || isDone) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white transition-all duration-1000 ease-in-out ${
        isClosing
          ? "pointer-events-none opacity-0 scale-[0.98]"
          : "opacity-100 scale-100"
      }`}
    >
      <div className="relative flex max-w-4xl flex-col items-center px-8 text-center select-none">
        {/* Subtle refined LM emblem */}
        <div className="mb-6 flex items-center justify-center">
          <span className="font-serif text-xl sm:text-2xl font-semibold tracking-[0.3em] text-[#ec4899]/70 uppercase">
            LM
          </span>
        </div>

        {/* Big Pink Welcome Title */}
        <h1
          className="font-serif font-normal tracking-tight text-[#db2777] transition-transform duration-1000"
          style={{
            fontSize: "clamp(3.2rem, 9vw, 6.75rem)",
            color: "#db2777",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Welcome
        </h1>

        {/* Elegant Pink Subtitle */}
        <p
          className="mt-6 font-serif italic font-light tracking-normal text-[#f472b6] sm:mt-8"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            color: "#ec4899",
            lineHeight: 1.3,
          }}
        >
          Let&rsquo;s build something great together
        </p>

        {/* Subtle breathing accent dot */}
        <div className="mt-10 flex items-center justify-center">
          <span className="h-1.5 w-1.5 rounded-full bg-[#f472b6]/60 animate-pulse" />
        </div>
      </div>
    </div>
  );
}



