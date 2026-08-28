import React from 'react';
import { Layers, ArrowRight, CheckCircle2, Cpu } from 'lucide-react';
import { VENDORS_DATA } from '../../data/devices';

export const VendorMatrixCard = ({ onSelectVendor, onNavigate }) => {
  return (
    <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Supported DVR/NVR Architecture Hub</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Auto-signature recognition & proprietary filesystem parsing across 8 major surveillance vendors
          </p>
        </div>
        <button
          onClick={() => onNavigate('device-id')}
          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
        >
          <span>Open Device Profiler</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        {VENDORS_DATA.map((vendor) => (
          <div
            key={vendor.id}
            onClick={() => {
              if (onSelectVendor) onSelectVendor(vendor.id);
              onNavigate('device-id');
            }}
            className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850/80 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${vendor.badgeColor}`}>
                {vendor.logoText}
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
            </div>

            <div className="mt-2 text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors truncate">
              {vendor.name}
            </div>

            <div className="mt-1 text-[11px] font-mono text-slate-400 truncate">
              FS: {vendor.filesystem.split('/')[0]}
            </div>

            <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>{vendor.rawFormat.split(' ')[0]}</span>
              <span className="text-emerald-400">Ready</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
