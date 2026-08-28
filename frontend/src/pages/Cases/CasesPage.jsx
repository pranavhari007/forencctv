import React, { useState } from 'react';
import { 
  FolderLock, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  HardDrive, 
  ShieldCheck, 
  ChevronRight, 
  Tag, 
  User,
  ArrowRight
} from 'lucide-react';
import { useCases } from '../../context/CaseContext';
import { StatusBadge } from '../../components/common/StatusBadge';

export const CasesPage = ({ setCurrentTab, onOpenNewCase }) => {
  const { cases, activeCaseId, setActiveCaseId } = useCases();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [vendorFilter, setVendorFilter] = useState('ALL');

  const filteredCases = cases.filter((c) => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.investigator.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    const matchesVendor = vendorFilter === 'ALL' || c.deviceVendor === vendorFilter;

    return matchesSearch && matchesStatus && matchesVendor;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Forensic Case Registry</h1>
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
              {cases.length} Total Cases
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Cryptographically anchored investigation records, FIR linkages, and write-blocked surveillance disk images
          </p>
        </div>

        <button
          onClick={onOpenNewCase}
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/20 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Investigation Case</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Case ID, FIR, Title, Investigator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:border-cyan-500 focus:outline-none font-mono"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:border-cyan-500 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active Inquiry</option>
            <option value="IN_ACQUISITION">In Acquisition</option>
            <option value="ANALYSIS_COMPLETE">Analysis Complete</option>
            <option value="REPORT_GENERATED">Report Generated</option>
          </select>

          <select
            value={vendorFilter}
            onChange={(e) => setVendorFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:border-cyan-500 focus:outline-none font-mono"
          >
            <option value="ALL">All DVR/NVR Vendors</option>
            <option value="hikvision">Hikvision</option>
            <option value="dahua">Dahua</option>
            <option value="cpplus">CP Plus</option>
            <option value="honeywell">Honeywell</option>
            <option value="tplink">TP-Link</option>
            <option value="godrej">Godrej</option>
            <option value="uniview">Uniview</option>
            <option value="matrix">Matrix</option>
          </select>
        </div>
      </div>

      {/* Case Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredCases.map((c) => {
          const isActive = c.id === activeCaseId;
          return (
            <div
              key={c.id}
              onClick={() => {
                setActiveCaseId(c.id);
              }}
              className={`p-5 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between ${
                isActive
                  ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-950/40'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850/80'
              }`}
            >
              <div>
                {/* Top Row: Case ID, Status, Priority */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-cyan-400">{c.id}</span>
                    <span className="text-slate-500">|</span>
                    <span className="font-mono text-xs text-slate-400">{c.caseNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={c.status} size="xs" />
                    {isActive && (
                      <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-mono text-[10px] font-bold">
                        ACTIVE IN FOCUS
                      </span>
                    )}
                  </div>
                </div>

                {/* Case Title & Description */}
                <h3 className="text-base font-bold text-white mt-3 group-hover:text-cyan-300 transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {c.description}
                </p>

                {/* Seized Hardware & Forensic Specs */}
                <div className="grid grid-cols-2 gap-2 mt-4 p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Seized Device</span>
                    <span className="text-slate-200 font-semibold truncate block mt-0.5">
                      {c.deviceModel || 'DVR Hardware Unit'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Write-Blocker</span>
                    <span className="text-emerald-400 font-semibold truncate block mt-0.5">
                      {c.writeBlockerUsed?.split(' ')[0] || 'Hardware Locked'}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {c.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60 text-[10px] font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Row: Officer, Evidence Counts & Navigation */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px] text-cyan-300 font-mono">
                    {c.investigator?.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-slate-300 font-medium">{c.investigator}</span>
                    <span className="text-[10px] text-slate-500 font-mono block leading-none">
                      {c.jurisdiction?.split(',')[0]}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCaseId(c.id);
                      setCurrentTab('case-details');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1 font-mono"
                  >
                    <span>Launch Workflow</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

