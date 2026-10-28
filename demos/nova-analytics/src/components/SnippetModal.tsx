"use client";

import React, { useState } from "react";
import { Copy, Check, X, Code2, Terminal } from "lucide-react";

interface SnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteId: string;
  domain: string;
}

export default function SnippetModal({
  isOpen,
  onClose,
  siteId,
  domain,
}: SnippetModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"html" | "nextjs" | "wordpress">("html");

  if (!isOpen) return null;

  const htmlSnippet = `<script defer src="https://nova-analytics.app/tracker.js" data-site-id="${siteId}"></script>`;
  const nextSnippet = `import Script from 'next/script';

<Script
  strategy="afterInteractive"
  src="https://nova-analytics.app/tracker.js"
  data-site-id="${siteId}"
/>`;
  const wpSnippet = `<!-- Add this to your theme header.php or via a Header & Footer Code plugin -->\n<script defer src="https://nova-analytics.app/tracker.js" data-site-id="${siteId}"></script>`;

  const activeSnippet =
    activeTab === "html" ? htmlSnippet : activeTab === "nextjs" ? nextSnippet : wpSnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full sm:max-w-xl rounded-t-2xl sm:rounded-2xl border border-sky-100 bg-white p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Install Tracking Script</h3>
              <p className="text-xs text-slate-500">Site: <span className="font-semibold text-slate-700">{domain}</span></p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="my-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-700">Choose your stack:</span>
            <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setActiveTab("html")}
                className={`rounded-md px-3 py-1 transition-all ${
                  activeTab === "html" ? "bg-white text-sky-700 shadow-xs" : "text-slate-600"
                }`}
              >
                Standard HTML
              </button>
              <button
                onClick={() => setActiveTab("nextjs")}
                className={`rounded-md px-3 py-1 transition-all ${
                  activeTab === "nextjs" ? "bg-white text-sky-700 shadow-xs" : "text-slate-600"
                }`}
              >
                Next.js
              </button>
              <button
                onClick={() => setActiveTab("wordpress")}
                className={`rounded-md px-3 py-1 transition-all ${
                  activeTab === "wordpress" ? "bg-white text-sky-700 shadow-xs" : "text-slate-600"
                }`}
              >
                WordPress
              </button>
            </div>
          </div>

          <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-sky-300">
            <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {activeSnippet}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-500 transition-all shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-300" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <div className="rounded-xl bg-sky-50/70 border border-sky-100 p-3 text-xs text-sky-800 leading-relaxed">
            💡 <strong>Privacy Guarantee:</strong> This script weighs less than 1KB, does not store any cookies, creates no persistent identifiers, and does not track users across domains.
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-100 px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
