import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useNotification();

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
      default: return <Info className="w-5 h-5 text-cyan-400 shrink-0" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'success': return 'border-emerald-500/40 bg-slate-900/95';
      case 'error': return 'border-rose-500/40 bg-slate-900/95';
      case 'warning': return 'border-amber-500/40 bg-slate-900/95';
      default: return 'border-cyan-500/40 bg-slate-900/95';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none p-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border shadow-xl backdrop-blur-md ${getBorderColor(toast.type)}`}
          >
            {getIcon(toast.type)}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-100">{toast.message}</p>
              {toast.details && (
                <p className="text-xs text-slate-400 mt-0.5 font-mono">{toast.details}</p>
              )}
              <span className="text-[10px] text-slate-500 mt-1 block">{toast.timestamp}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-200 p-1 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
