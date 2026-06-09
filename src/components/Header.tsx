import React from "react";
import { Database, FileText } from "lucide-react";

export default function Header() {
  return (
    <header
      id="app-header"
      className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 z-40"
    >
      <div id="header-branding" className="flex items-center gap-3">
        <div id="header-logo-container" className="p-2 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 rounded-xl">
          <FileText id="app-logo-icon" className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h1 id="app-title" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            README.md Blueprint Generator <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md font-mono">Lokal & Instan</span>
          </h1>
          <p id="app-subtitle" className="text-xs text-slate-400 mt-0.5">
            Panduan Struktur & Blueprint Otomatis untuk Workspace IDE (VS Code / Cursor / Windsurf) Tanpa API AI
          </p>
        </div>
      </div>

      <div id="header-meta-actions" className="flex items-center gap-3 font-mono text-xs">
        <div
          id="status-persistence-indicator"
          className="flex items-center gap-2 bg-slate-850 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-400"
        >
          <Database className="w-3.5 h-3.5 text-indigo-400" />
          <span>Database: </span>
          <span className="text-emerald-400 font-semibold">IndexedDB Ready</span>
        </div>
      </div>
    </header>
  );
}
