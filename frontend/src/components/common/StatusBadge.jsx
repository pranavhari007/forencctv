import React from 'react';

export const StatusBadge = ({ status, size = 'sm', className = '' }) => {
  const configs = {
    'ACTIVE': { label: 'Active Inquiry', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
    'IN_ACQUISITION': { label: 'Acquisition In Progress', bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 animate-pulse' },
    'ANALYSIS_COMPLETE': { label: 'Analysis Completed', bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
    'REPORT_GENERATED': { label: 'Sec 65B Report Certified', bg: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
    'CRITICAL': { label: 'Critical Priority', bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
    'HIGH': { label: 'High Priority', bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
    'MEDIUM': { label: 'Medium Priority', bg: 'bg-slate-500/10 text-slate-300 border-slate-500/30' },
    'VERIFIED_MATCH': { label: '100% Hash Match', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
    'CONFIRMED_ON_CHAIN': { label: 'Anchored On Blockchain', bg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' },
    'CARVED': { label: 'Forensic Carved Fragment', bg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30' },
    'TAMPER_ALERT': { label: 'HASH MISMATCH // TAMPERED', bg: 'bg-rose-600/20 text-rose-300 border-rose-500/80 animate-pulse font-bold' }
  };

  const config = configs[status] || { label: status, bg: 'bg-slate-800 text-slate-300 border-slate-700' };

  const sizeClasses = size === 'xs' 
    ? 'px-1.5 py-0.5 text-[10px]' 
    : size === 'lg' 
      ? 'px-3 py-1.5 text-sm font-semibold' 
      : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium tracking-wide ${config.bg} ${sizeClasses} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {config.label}
    </span>
  );
};
