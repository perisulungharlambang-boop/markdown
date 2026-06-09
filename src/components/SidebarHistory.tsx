import React from "react";
import { ReadmeItem } from "../types";
import { History, Trash2, CheckCircle2, FileDown, Plus } from "lucide-react";

interface SidebarHistoryProps {
  items: ReadmeItem[];
  selectedId: string | null;
  onSelect: (item: ReadmeItem) => void;
  onDelete: (id: string) => void;
  onNewProject: () => void;
}

export default function SidebarHistory({
  items,
  selectedId,
  onSelect,
  onDelete,
  onNewProject,
}: SidebarHistoryProps) {
  return (
    <div id="history-sidebar" className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col h-[80vh]">
      <div id="history-header" className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div id="history-title-container" className="flex items-center gap-2 text-slate-300">
          <History className="w-4 h-4 text-indigo-400" />
          <h2 className="text-xs font-semibold uppercase tracking-wider">Histori Blueprint</h2>
        </div>
        <button
          id="btn-new-project"
          onClick={onNewProject}
          className="flex items-center gap-1.5 px-2 py-1 bg-slate-950 border border-slate-800 hover:border-slate-700 text-indigo-400 text-xs font-medium rounded-lg transition-colors"
          title="Mulai Proyek Baru"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Baru</span>
        </button>
      </div>

      <div id="history-list-container" className="flex-1 overflow-y-auto mt-4 space-y-2.5 custom-scrollbar pr-1">
        {items.length === 0 ? (
          <div id="history-empty-state" className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
            <CheckCircle2 className="w-8 h-8 opacity-25 mb-2.5 text-slate-400" />
            <p className="text-xs font-medium">Belum ada riwayat blueprint.</p>
            <p className="text-[10px] mt-1 text-slate-600">Tekan tombol generator untuk memulai menyimpan riwayat Anda.</p>
          </div>
        ) : (
          items.map((item) => {
            const isSelected = item.id === selectedId;
            const dateStr = new Date(item.timestamp).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={item.id}
                id={`history-item-${item.id}`}
                className={`group relative flex items-start justify-between gap-3 p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? "bg-indigo-505/10 bg-slate-850/80 border-indigo-500/50 text-slate-100"
                    : "bg-slate-950/60 border-slate-900 text-slate-400 hover:border-slate-800 hover:bg-slate-850/30"
                }`}
                onClick={() => onSelect(item)}
              >
                <div id="item-meta" className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate text-slate-200 group-hover:text-indigo-400 transition-colors">
                    {item.projectName}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-1 font-mono">{dateStr}</p>
                </div>
                <button
                  id={`btn-del-history-${item.id}`}
                  title="Hapus riwayat"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-rose-500/10 hover:text-rose-400 border border-transparent hover:border-rose-500/20 rounded-lg text-slate-500 transition-all shrink-0 self-center"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
