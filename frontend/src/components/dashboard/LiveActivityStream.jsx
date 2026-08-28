import React from 'react';
import { ShieldCheck, HardDriveDownload, Sparkles, ScanSearch, FileCheck2, Cpu, Clock } from 'lucide-react';
import { useCases } from '../../context/CaseContext';

export const LiveActivityStream = ({ onNavigate }) => {
  const { custodyLog, activeCase } = useCases();

  const getActionIcon = (action) => {
    if (action.includes('ACQUIRED') || action.includes('SEIZED')) return <HardDriveDownload className="w-4 h-4 text-cyan-400" />;
    if (action.includes('CARVED')) return <ScanSearch className="w-4 h-4 text-indigo-400" />;
    if (action.includes('AI')) return <Sparkles className="w-4 h-4 text-amber-400" />;
    if (action.includes('REPORT') || action.includes('CERTIFIED')) return <FileCheck2 className="w-4 h-4 text-purple-400" />;
    return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
  };

  return (
    <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Forensic Chain-of-Custody Stream</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Real-time immutable blockchain transaction ledger</p>
        </div>
        <button
          onClick={() => onNavigate('custody')}
          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold"
        >
          View Ledger
        </button>
      </div>

      <div className="space-y-3 mt-4 overflow-y-auto max-h-80 pr-1">
        {custodyLog.slice(0, 6).map((log, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-start gap-3"
          >
            <div className="p-2 rounded bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
              {getActionIcon(log.action)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-bold text-slate-200 font-mono truncate">
                  {log.action.replace(/_/g, ' ')}
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30 shrink-0">
                  Block #{log.blockHeight}
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-1 leading-snug">
                {log.details}
              </p>

              <div className="flex items-center justify-between gap-2 mt-2 pt-1.5 border-t border-slate-900 text-[10px] font-mono text-slate-500">
                <span className="truncate">{log.officer}</span>
                <span className="shrink-0">{log.timestamp.substring(11, 19)} UTC</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
