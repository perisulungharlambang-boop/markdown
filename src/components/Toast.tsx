import React, { useEffect } from "react";
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";

export interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const styles = {
    success: {
      bg: "bg-slate-900/90 border-emerald-500/30 text-emerald-300",
      icon: <CheckCircle id="success-icon" className="w-5 h-5 text-emerald-400 shrink-0" />,
    },
    error: {
      bg: "bg-slate-900/90 border-rose-500/30 text-rose-300",
      icon: <AlertTriangle id="error-icon" className="w-5 h-5 text-rose-400 shrink-0" />,
    },
    info: {
      bg: "bg-slate-900/90 border-blue-500/30 text-blue-300",
      icon: <Info id="info-icon" className="w-5 h-5 text-blue-400 shrink-0" />,
    },
  };

  return (
    <div
      id="toast-notification"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 border rounded-xl shadow-xl backdrop-blur-md animate-fade-in ${styles[type].bg}`}
    >
      {styles[type].icon}
      <p id="toast-message" className="text-sm font-medium tracking-wide">
        {message}
      </p>
      <button
        id="toast-close-btn"
        onClick={onClose}
        className="p-1 text-slate-400 hover:text-slate-100 transition-colors rounded-lg hover:bg-slate-850"
        title="Tutup"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
