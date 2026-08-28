import React from 'react';
import { 
  FolderLock, 
  Cpu, 
  HardDriveDownload, 
  Film, 
  ScanSearch, 
  Sparkles, 
  GitCommit, 
  ShieldAlert, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Calendar, 
  User,
  HardDrive,
  Lock,
  Layers
} from 'lucide-react';
import { useCases } from '../../context/CaseContext';
import { StatusBadge } from '../../components/common/StatusBadge';

export const CaseDetailsPage = ({ setCurrentTab }) => {
  const { 
    activeCase, 
    activeEvidence, 
    activeCarvedFiles, 
    activeAiDetections, 
    activeTimelineEvents, 
    activeCustodyLog 
  } = useCases();

  const workflowSteps = [
    {
      id: 'step-1',
      title: 'Case Registration',
      tab: 'cases',
      icon: FolderLock,
      status: 'DONE',
      detail: `FIR ${activeCase.caseNumber} anchored on genesis block`
    },
    {
      id: 'step-2',
      title: 'Device Identification',
      tab: 'device-id',
      icon: Cpu,
      status: 'DONE',
      detail: `${activeCase.deviceModel?.split('(')[0] || 'DVR Hardware'} identified (100%)`
    },
    {
      id: 'step-3',
      title: 'Evidence Acquisition',
      tab: 'acquisition',
      icon: HardDriveDownload,
      status: activeEvidence.length > 0 ? 'DONE' : 'READY',
      detail: `${activeEvidence.length} Write-Blocked Bitstream Images (.E01)`
    },
    {
      id: 'step-4',
      title: 'Video Recovery (Carving)',
      tab: 'recovery',
      icon: ScanSearch,
      status: activeCarvedFiles.length > 0 ? 'DONE' : 'READY',
      detail: `${activeCarvedFiles.length} Fragmented Streams Recovered`
    },
    {
      id: 'step-5',
      title: 'Evidence Analysis',
      tab: 'analysis',
      icon: Film,
      status: 'DONE',
      detail: '4K Multi-angle playback & frame inspection'
    },
    {
      id: 'step-6',
      title: 'AI Computer Vision',
      tab: 'ai-analysis',
      icon: Sparkles,
      status: activeAiDetections.length > 0 ? 'DONE' : 'READY',
      detail: `${activeAiDetections.length} Neural detections (Face, Vehicle, Weapons)`
    },
    {
      id: 'step-7',
      title: 'Unified Timeline',
      tab: 'timeline',
      icon: GitCommit,
      status: activeTimelineEvents.length > 0 ? 'DONE' : 'READY',
      detail: `${activeTimelineEvents.length} Synchronized events (RTC drift calibrated)`
    },
    {
      id: 'step-8',
      title: 'Chain of Custody',
      tab: 'custody',
      icon: ShieldAlert,
      status: 'DONE',
      detail: `${activeCustodyLog.length} Immutable blockchain blocks verified`
    },
    {
      id: 'step-9',
      title: 'Forensic Report',
      tab: 'reports',
      icon: FileText,
      status: 'READY',
      detail: 'Section 65B Indian Evidence Act compliant PDF'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Investigation Lifecycle & Forensic Workflow</h1>
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
              {activeCase.id}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            End-to-end procedural status tracking: Seizure ? Device ID ? Acquisition ? Analysis ? Recovery ? S-65B Report
          </p>
        </div>

        <button
          onClick={() => setCurrentTab('reports')}
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/20 self-start sm:self-auto font-mono"
        >
          <span>Open Section 65B Report</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Case Profile Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-cyan-400 font-bold">{activeCase.id}</span>
              <span className="text-slate-500">•</span>
              <span className="font-mono text-xs text-slate-400">{activeCase.caseNumber}</span>
              <span className="text-slate-500">•</span>
              <StatusBadge status={activeCase.status} size="xs" />
            </div>
            <h2 className="text-lg font-bold text-white mt-1">{activeCase.title}</h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-3xl">
              {activeCase.description}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-right shrink-0">
            <span className="text-slate-500 block text-[10px]">Lead Examiner</span>
            <span className="text-white font-bold block">{activeCase.investigator}</span>
            <span className="text-cyan-400 text-[11px] block">{activeCase.investigatorBadge}</span>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Incident Date</span>
            <span className="text-slate-200 mt-0.5 block truncate">{activeCase.incidentDate}</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Seized Device</span>
            <span className="text-slate-200 mt-0.5 block truncate">{activeCase.deviceModel?.split('(')[0]}</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Hardware Write-Blocker</span>
            <span className="text-emerald-400 mt-0.5 block truncate">{activeCase.writeBlockerUsed?.split(' ')[0]}</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Blockchain Status</span>
            <span className="text-cyan-300 mt-0.5 block font-bold">Anchored (Block #140296)</span>
          </div>
        </div>
      </div>

      {/* Stepper Pipeline */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Investigation Workflow Pipeline</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            const isDone = step.status === 'DONE';

            return (
              <div
                key={step.id}
                onClick={() => setCurrentTab(step.tab)}
                className={`p-4 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between ${
                  isDone
                    ? 'bg-slate-950/80 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850/80'
                    : 'bg-slate-950/40 border-slate-850 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg border ${
                        isDone ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 font-semibold">STAGE {idx + 1}</span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      isDone ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isDone ? 'COMPLETED' : 'READY'}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {step.detail}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-500 group-hover:text-cyan-400">
                  <span>Open Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

