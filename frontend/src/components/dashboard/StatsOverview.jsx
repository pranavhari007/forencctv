import React from 'react';
import { 
  FolderLock, 
  HardDriveDownload, 
  ShieldCheck, 
  ScanSearch, 
  Layers, 
  Sparkles,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { useCases } from '../../context/CaseContext';

export const StatsOverview = ({ onNavigate }) => {
  const { stats, cases, activeEvidence, activeCarvedFiles } = useCases();

  const statCards = [
    {
      id: 'cases',
      title: 'Total Inquiries',
      value: stats.totalCases,
      subValue: `${stats.activeInvestigations} Active Investigations`,
      icon: FolderLock,
      color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/40 text-blue-400',
      actionTab: 'cases'
    },
    {
      id: 'evidence',
      title: 'Evidence Feeds',
      value: stats.evidenceFiles,
      subValue: '100% SHA-256 Verified',
      icon: HardDriveDownload,
      color: 'from-cyan-500/20 to-teal-500/10 border-cyan-500/40 text-cyan-400',
      actionTab: 'acquisition'
    },
    {
      id: 'carved',
      title: 'Carved Stream Recoveries',
      value: stats.carvedRecoveries,
      subValue: 'Deleted Sectors Rebuilt',
      icon: ScanSearch,
      color: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/40 text-indigo-400',
      actionTab: 'recovery'
    },
    {
      id: 'custody',
      title: 'Blockchain Custody Blocks',
      value: stats.blockchainBlocks,
      subValue: 'Sec 65B Certified Ledger',
      icon: ShieldCheck,
      color: 'from-emerald-500/20 to-green-500/10 border-emerald-500/40 text-emerald-400',
      actionTab: 'custody'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            onClick={() => onNavigate(stat.actionTab)}
            className={`p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border transition-all cursor-pointer group hover:scale-[1.02] ${stat.color}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                {stat.title}
              </span>
              <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-current group-hover:text-white transition-colors">
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl lg:text-3xl font-extrabold font-mono text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs font-medium text-slate-400 flex items-center gap-0.5 group-hover:text-cyan-300">
                <span>View</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="mt-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
              <span className="truncate">{stat.subValue}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
