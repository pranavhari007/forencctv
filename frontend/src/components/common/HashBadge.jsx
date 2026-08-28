import React, { useState } from 'react';
import { Copy, Check, ShieldCheck } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export const HashBadge = ({ hash, label = 'SHA-256', truncate = true, verified = true, className = '' }) => {
  const [copied, setCopied] = useState(false);
  const { notifyHashCopied } = useNotification();

  if (!hash) return null;

  const displayHash = truncate && hash.length > 20 
    ? `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}` 
    : hash;

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hash);
    setCopied(true);
    notifyHashCopied(hash);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={handleCopy}
      title={`Click to copy full ${label}: ${hash}`}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700/70 hover:border-cyan-500/60 transition-colors font-mono text-xs cursor-pointer group select-all ${className}`}
    >
      {verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
      {label && <span className="text-slate-400 font-sans font-semibold text-[10px] uppercase tracking-wider">{label}:</span>}
      <span className="text-cyan-300 font-mono tracking-tight group-hover:text-cyan-200">{displayHash}</span>
      <button 
        type="button" 
        className="ml-1 text-slate-500 group-hover:text-cyan-400 transition-colors p-0.5 rounded"
      >
        {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
      </button>
    </div>
  );
};
