import React, { useState } from "react";
import { Copy, Check, FileDown, Terminal, Eye, Sparkles, BookOpen } from "lucide-react";
import { GeneratedInsight } from "../types";

interface MarkdownViewerProps {
  markdown: string;
  insights?: GeneratedInsight;
  projectName: string;
  onCopySuccess: () => void;
}

export default function MarkdownViewer({
  markdown,
  insights,
  projectName,
  onCopySuccess,
}: MarkdownViewerProps) {
  const [activeTab, setActiveTab] = useState<"code" | "insights">("code");
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      onCopySuccess();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin teks:", err);
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      // Clean filename
      const cleanName = projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "project";
      link.download = `README-${cleanName}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Gagal mendownload file:", err);
    }
  };

  // Safe highlighted rendering text search
  const filteredMarkdown = () => {
    if (!searchQuery) return markdown;
    // Just a clean fallback or text mapping
    return markdown;
  };

  return (
    <div id="readme-viewer-container" className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[80vh] shadow-xl overflow-hidden">
      {/* Viewer Header Toolbar */}
      <div id="viewer-toolbar" className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800/80">
        <div id="viewer-tabs" className="flex items-center gap-1.5">
          <button
            id="tab-btn-code"
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === "code"
                ? "bg-indigo-500/10 border border-indigo-500/20 text-indigo-400"
                : "text-slate-500 hover:text-slate-300 border border-transparent"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Kode Markdown (.md)</span>
          </button>
          
          <button
            id="tab-btn-insights"
            onClick={() => setActiveTab("insights")}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === "insights"
                ? "bg-indigo-500/10 border border-indigo-500/20 text-indigo-400"
                : "text-slate-500 hover:text-slate-300 border border-transparent"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Struktur Blueprint Modular</span>
          </button>
        </div>

        {markdown && (
          <div id="viewer-actions" className="flex items-center gap-2">
            <button
              id="action-btn-copy"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-705 text-slate-300 text-xs font-medium rounded-lg transition-all active:scale-95"
              title="Salin isi file"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin</span>
                </>
              )}
            </button>

            <button
              id="action-btn-download"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-all active:scale-95"
              title="Download README.md secara langsung"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div id="viewer-body-container" className="flex-1 overflow-hidden relative">
        {!markdown ? (
          <div id="viewer-empty-state" className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-600">
            <BookOpen className="w-12 h-12 opacity-20 mb-3 text-slate-400" />
            <h3 className="text-base font-semibold text-slate-400">Siap untuk Generate</h3>
            <p className="text-xs max-w-sm mt-1.5 text-slate-500 leading-relaxed">
              Silakan isi formulir atau pilih riwayat proyek di sebelah kiri, kemudian klik tombol untuk menyusun blueprint otomatis.
            </p>
          </div>
        ) : activeTab === "code" ? (
          <div id="code-tab-panel" className="h-full flex flex-col">
            {/* Find Search Input within text */}
            <div id="code-search-bar" className="px-4 py-2 bg-slate-950/40 border-b border-slate-800/60 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Nama File target: <span className="text-indigo-400 lowercase font-semibold">README.md</span>
              </span>
              <input
                id="search-markdown-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kata kunci dalam file..."
                className="bg-slate-950 border border-slate-850 px-2.5 py-1 text-xs rounded-lg text-slate-300 placeholder-slate-650 focus:outline-none focus:border-indigo-500 w-44"
              />
            </div>
            
            {/* Scrollable code viewer */}
            <pre
              id="markdown-code-block"
              className="flex-1 p-5 text-xs font-mono text-slate-300 overflow-auto bg-slate-950 leading-relaxed select-text custom-scrollbar"
            >
              <code>{filteredMarkdown()}</code>
            </pre>
          </div>
        ) : (
          <div id="insights-tab-panel" className="h-full p-6 overflow-y-auto bg-slate-950/80 custom-scrollbar space-y-5">
            <div id="insights-main-card" className="border border-slate-800 bg-slate-900/40 p-5 rounded-2xl space-y-4">
              <div id="insights-title flex" className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-200">Arsitektur & Rekomendasi Workspace</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rangkaian struktur berikut di-analisis secara modular oleh sistem untuk merampingkan proses Vibe Coding di IDE Anda. Letakkan types utama sedini mungkin.
              </p>

              <div id="suggested-files-sub" className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">File & Folder Penting yang Disarankan:</h4>
                <div id="suggested-files-list" className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(insights?.suggestedFiles || [
                    "/src/types.ts",
                    "/src/hooks/useIndexedDB.ts",
                    "/src/components/common",
                    "/src/views/Dashboard.tsx",
                  ]).map((file, i) => (
                    <div
                      key={i}
                      id={`suggested-file-${i}`}
                      className="bg-slate-950 border border-slate-850 px-3 py-2 rounded-xl text-xs font-mono text-slate-300 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span>{file}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div id="complexity-sub" className="pt-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Prakiraan Kompleksitas Struktur:</h4>
                <div id="complexity-indicator" className="mt-1.5 inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 font-mono text-xs">
                  <span>Skala Kompleksitas:</span>
                  <span className="font-bold uppercase text-[11px] tracking-wide">{insights?.estimatedComplexity || "Medium/High modular setup"}</span>
                </div>
              </div>
            </div>

            <div id="insights-guidelines-box" className="border border-slate-800 bg-slate-900/20 p-5 rounded-2xl">
              <h4 className="text-xs font-bold text-slate-300 mb-2">Tips Vibe Coding yang Maksimal:</h4>
              <ul id="insights-tips-list" className="list-disc pl-4 text-xs text-slate-400 space-y-2 leading-relaxed">
                <li>Berikan file <span className="font-mono text-indigo-400 text-[11px]">README.md</span> ini ke editor IDE Anda dengan instruksi <span className="italic">"Tolong pelajari file README.md ini dan bertindaklah sesuai requirement di dalamnya"</span>.</li>
                <li>Mulai dengan membuat file <span className="font-mono text-indigo-400 text-[11px]">/src/types.ts</span> terlebih dahulu agar seluruh komponen memiliki landasan tipe data yang kokoh.</li>
                <li>Persistensikan state lokal menggunakan IndexedDB (bisa meniru template utilitas <span className="font-mono text-indigo-400 text-[11px]">src/db.ts</span> di aplikasi ini) untuk kinerja modular yang aman.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
