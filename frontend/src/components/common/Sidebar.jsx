import React from 'react';
import { 
  LayoutDashboard, 
  FolderLock, 
  Cpu, 
  HardDriveDownload, 
  Film, 
  Sparkles, 
  ScanSearch, 
  GitCommit, 
  ShieldAlert, 
  FileText, 
  Workflow, 
  Settings,
  HelpCircle,
  Radio,
  Binary
} from 'lucide-react';
import { useCases } from '../../context/CaseContext';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'Overview' },
  { id: 'cases', label: 'Cases & Registry', icon: FolderLock, badge: 'casesCount', category: 'Overview' },
  { id: 'case-details', label: 'Case Workflow', icon: Workflow, category: 'Overview' },
  
  { id: 'device-id', label: 'Device Identification', icon: Cpu, badge: 'vendors', category: 'Forensic Pipeline' },
  { id: 'acquisition', label: 'Evidence Acquisition', icon: HardDriveDownload, badge: 'evidenceCount', category: 'Forensic Pipeline' },
  { id: 'analysis', label: 'Evidence Analysis', icon: Film, category: 'Forensic Pipeline' },
  { id: 'recovery', label: 'Video Recovery (Carving)', icon: ScanSearch, badge: 'carvedCount', category: 'Forensic Pipeline' },
  { id: 'ai-analysis', label: 'AI Forensic CV', icon: Sparkles, badge: 'aiCount', category: 'Forensic Pipeline' },
  { id: 'timeline', label: 'Unified Timeline', icon: GitCommit, category: 'Forensic Pipeline' },
  
  { id: 'custody', label: 'Chain of Custody', icon: ShieldAlert, badge: 'custodyCount', category: 'Integrity & Legal' },
  { id: 'reports', label: 'Forensic Reports (S-65B)', icon: FileText, category: 'Integrity & Legal' },
  { id: 'settings', label: 'Settings & Profiles', icon: Settings, category: 'System' },
];

export const Sidebar = ({ currentTab, setCurrentTab, isMobileOpen, setIsMobileOpen, onOpenProblemBanner }) => {
  const { cases, activeEvidence, activeCarvedFiles, activeAiDetections, activeCustodyLog } = useCases();

  const getBadgeValue = (badgeType) => {
    switch (badgeType) {
      case 'casesCount': return cases.length;
      case 'vendors': return '8';
      case 'evidenceCount': return activeEvidence.length;
      case 'carvedCount': return activeCarvedFiles.length;
      case 'aiCount': return activeAiDetections.length;
      case 'custodyCount': return activeCustodyLog.length;
      default: return null;
    }
  };

  const renderNavLinks = () => {
    const categories = ['Overview', 'Forensic Pipeline', 'Integrity & Legal', 'System'];

    return categories.map((cat) => {
      const itemsInCat = NAV_ITEMS.filter(item => item.category === cat);
      return (
        <div key={cat} className="mb-4">
          <div className="px-3 mb-1 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold">
            {cat}
          </div>
          <div className="space-y-0.5">
            {itemsInCat.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              const badgeVal = item.badge ? getBadgeValue(item.badge) : null;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    if (isMobileOpen) setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-950'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-850/90'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {badgeVal && (
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                        : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-300'
                    }`}>
                      {badgeVal}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Brand Header */}
        <div className="h-16 flex items-center gap-3 px-4 border-b border-slate-800 bg-slate-925">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 shadow-md shadow-cyan-500/20 text-white">
            <Binary className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-white font-mono">ForenCCTV</span>
              <span className="px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[9px] font-mono font-bold">v2.4</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono leading-none">Unified DVR/NVR Forensics</p>
          </div>
        </div>

        {/* Scrollable Nav Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          {renderNavLinks()}
        </div>

        {/* SIH 2026 Problem Statement Explainer Card */}
        <div className="p-3 border-t border-slate-800 bg-slate-925/90">
          <button
            onClick={onOpenProblemBanner}
            className="w-full p-2.5 rounded-lg bg-gradient-to-r from-cyan-950/70 via-slate-900 to-blue-950/70 border border-cyan-500/30 hover:border-cyan-400/60 transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300 font-mono">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>SIH Problem & USP</span>
              </div>
              <span className="text-[10px] text-slate-500 group-hover:text-cyan-400 font-mono">PS ID SIH26150</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              Why proprietary DVR formats break evidence & how ForenCCTV unifies it.
            </p>
          </button>
        </div>
      </aside>
    </>
  );
};
