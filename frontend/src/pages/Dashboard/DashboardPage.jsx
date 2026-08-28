import React from 'react';
import { 
  FolderLock, 
  Cpu, 
  HardDriveDownload, 
  ScanSearch, 
  Sparkles, 
  GitCommit, 
  ShieldCheck, 
  FileText,
  AlertTriangle,
  Radio,
  Layers,
  ArrowRight
} from 'lucide-react';
import { StatsOverview } from '../../components/dashboard/StatsOverview';
import { VendorMatrixCard } from '../../components/dashboard/VendorMatrixCard';
import { RecentCasesTable } from '../../components/dashboard/RecentCasesTable';
import { LiveActivityStream } from '../../components/dashboard/LiveActivityStream';
import { QuickWorkflowActions } from '../../components/dashboard/QuickWorkflowActions';
import { useCases } from '../../context/CaseContext';

export const DashboardPage = ({ setCurrentTab, onOpenNewCase, onOpenProblemBanner }) => {
  const { activeCase } = useCases();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner: SIH Context Callout */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-blue-950/80 border border-cyan-500/40 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg shadow-cyan-950/30">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shrink-0">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-mono text-[10px] font-extrabold uppercase">
                SIH 2026 Solution
              </span>
              <span className="text-xs font-mono text-cyan-300 font-bold">PS ID: SIH26150</span>
              <span className="text-slate-500">|</span>
              <span className="text-xs text-amber-300 font-medium">Theme: Blockchain & Cybersecurity</span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white mt-1">
              Unified DVR/NVR Forensic Analysis & Court-Admissible Verification
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Overcoming proprietary surveillance file fragmentation across 8+ vendors with hardware-blocked acquisition, AI cross-camera timeline sync, and immutable blockchain custody.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenProblemBanner}
          className="px-4 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 self-start md:self-auto"
        >
          <span>View Problem & Architecture</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* KPI Stats Grid */}
      <StatsOverview onNavigate={setCurrentTab} />

      {/* Quick Workflow Action Shortcuts */}
      <QuickWorkflowActions onNavigate={setCurrentTab} onOpenNewCase={onOpenNewCase} />

      {/* Vendor Architecture Hub */}
      <VendorMatrixCard onNavigate={setCurrentTab} />

      {/* Split Grid: Recent Cases & Live Custody Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <RecentCasesTable onNavigate={setCurrentTab} />
        </div>
        <div className="lg:col-span-5">
          <LiveActivityStream onNavigate={setCurrentTab} />
        </div>
      </div>
    </div>
  );
};

