import React from 'react';
import { 
  HardDriveDownload, 
  Cpu, 
  ScanSearch, 
  Sparkles, 
  GitCommit, 
  FileCheck2, 
  Plus 
} from 'lucide-react';

export const QuickWorkflowActions = ({ onNavigate, onOpenNewCase }) => {
  const actions = [
    {
      title: 'Identify DVR/NVR',
      desc: 'Magic byte signature detection',
      icon: Cpu,
      tab: 'device-id',
      badge: '8 Vendors'
    },
    {
      title: 'Acquire Bitstream',
      desc: 'Hardware write-block imaging',
      icon: HardDriveDownload,
      tab: 'acquisition',
      badge: 'SHA-256'
    },
    {
      title: 'Recover Carved Video',
      desc: 'Reconstruct unallocated sectors',
      icon: ScanSearch,
      tab: 'recovery',
      badge: 'NAL Units'
    },
    {
      title: 'Run AI Face & CV',
      desc: 'Cross-camera vehicle/subject search',
      icon: Sparkles,
      tab: 'ai-analysis',
      badge: 'Neural Engine'
    },
    {
      title: 'Synchronize Timeline',
      desc: 'Correct timestamp drift',
      icon: GitCommit,
      tab: 'timeline',
      badge: 'Multi-Cam'
    },
    {
      title: 'Generate Court Report',
      desc: 'Section 65B compliance certificate',
      icon: FileCheck2,
      tab: 'reports',
      badge: 'Admissible'
    }
  ];

  return (
    <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white">Unified Forensic Pipeline Navigation</h3>
          <p className="text-xs text-slate-400 mt-0.5">Quick access to standard digital evidence examination phases</p>
        </div>
        <button
          onClick={onOpenNewCase}
          className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>New Case</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
        {actions.map((act, i) => {
          const Icon = act.icon;
          return (
            <button
              key={i}
              onClick={() => onNavigate(act.tab)}
              className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850/80 transition-all text-left group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-md bg-slate-900 border border-slate-800 text-cyan-400 group-hover:text-cyan-300 group-hover:scale-110 transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                    {act.badge}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {act.title}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                {act.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
