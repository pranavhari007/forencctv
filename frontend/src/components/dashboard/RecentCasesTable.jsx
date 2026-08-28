import React from 'react';
import { FolderLock, ArrowRight, ShieldCheck, HardDrive, Calendar } from 'lucide-react';
import { useCases } from '../../context/CaseContext';
import { StatusBadge } from '../common/StatusBadge';

export const RecentCasesTable = ({ onNavigate }) => {
  const { cases, activeCaseId, setActiveCaseId } = useCases();

  return (
    <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FolderLock className="w-4 h-4 text-cyan-400" />
            <span>Active Forensic Case Repositories</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Registered investigations with write-blocked evidence images & blockchain custody records
          </p>
        </div>
        <button
          onClick={() => onNavigate('cases')}
          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
        >
          <span>All Cases ({cases.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="overflow-x-auto mt-3">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
              <th className="py-2.5 px-3">Case ID / FIR</th>
              <th className="py-2.5 px-3">Investigation Title</th>
              <th className="py-2.5 px-3">Device / Format</th>
              <th className="py-2.5 px-3">Investigator</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {cases.slice(0, 4).map((c) => {
              const isActive = c.id === activeCaseId;
              return (
                <tr 
                  key={c.id} 
                  className={`hover:bg-slate-850/80 transition-colors ${
                    isActive ? 'bg-cyan-950/30' : ''
                  }`}
                >
                  <td className="py-3 px-3">
                    <div className="font-mono font-bold text-cyan-400">{c.id}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{c.caseNumber}</div>
                  </td>

                  <td className="py-3 px-3 max-w-xs">
                    <div className="font-semibold text-slate-100 truncate">{c.title}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{c.incidentDate.substring(0, 16)}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-mono text-slate-300 font-medium text-[11px] truncate max-w-[160px]">
                      {c.deviceModel?.split('(')[0] || c.deviceVendor}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {c.evidenceCount} Feeds • {c.recoveredCount || 0} Carved
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="text-slate-200 font-medium">{c.investigator}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{c.investigatorBadge}</div>
                  </td>

                  <td className="py-3 px-3">
                    <StatusBadge status={c.status} size="xs" />
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => {
                        setActiveCaseId(c.id);
                        onNavigate('case-details');
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                        isActive
                          ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                      }`}
                    >
                      {isActive ? 'Active Case' : 'Open Case'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
