import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  HardDrive, 
  Sparkles, 
  Lock, 
  FileCheck2,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { VENDORS_DATA } from '../../data/devices';

export const ProblemStatementBanner = ({ isOpen, onClose }) => {
  const [activeVendorTab, setActiveVendorTab] = useState(VENDORS_DATA[0].id);

  if (!isOpen) return null;

  const currentVendor = VENDORS_DATA.find(v => v.id === activeVendorTab) || VENDORS_DATA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-2xl shadow-cyan-950/50 p-6 my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hackathon Header */}
        <div className="flex flex-wrap items-center gap-2.5 pb-4 border-b border-slate-800">
          <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40">
            SMART INDIA HACKATHON 2026
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono text-xs border border-slate-700">
            PS ID: SIH26150
          </span>
          <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 font-mono text-xs border border-amber-500/30">
            Theme: Blockchain & Cybersecurity
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 font-mono text-xs border border-emerald-500/30">
            Category: Software
          </span>
        </div>

        {/* Main Title & USP */}
        <div className="mt-4">
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
            ForenCCTV – Unified DVR/NVR Forensic Analysis Platform
          </h2>
          <p className="text-cyan-400 font-medium text-sm mt-1">
            "One platform to acquire, recover, analyze and verify CCTV evidence from multiple DVR/NVR vendors."
          </p>
        </div>

        {/* SIH Core Problem Workflow Diagram */}
        <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>The Real-World CCTV Forensic Challenge & ForenCCTV Unified Solution</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {/* Step 1 */}
            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-rose-400 block mb-1">01 // THE PROBLEM</span>
                <h4 className="text-xs font-bold text-slate-200">Different DVR/NVR Vendors</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Dahua, Hikvision, CP Plus, Honeywell, TP-Link, Godrej, Uniview, Matrix...
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500">
                8+ Incompatible Brands
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-rose-400 block mb-1">02 // FRAGMENTATION</span>
                <h4 className="text-xs font-bold text-slate-200">Proprietary Formats</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  DHFS, HIKFS, WFS, raw unindexed clusters, proprietary .dav / .264 containers.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500">
                Unplayable in Standard Players
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400 block mb-1">03 // INVESTIGATION PAIN</span>
                <h4 className="text-xs font-bold text-slate-200">Difficult Extraction</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Deleted footage lost in unallocated space, RTC clock drift, broken chain of custody.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500">
                Delayed Crime Solving
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-3.5 rounded-lg bg-gradient-to-b from-cyan-950/90 to-slate-900 border border-cyan-500/50 flex flex-col justify-between shadow-lg shadow-cyan-950">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 block mb-1">04 // FORENCCTV</span>
                <h4 className="text-xs font-bold text-cyan-200">Unified Architecture</h4>
                <p className="text-[11px] text-slate-300 mt-1">
                  Auto-signature parser, frame carving engine, multi-camera AI CV, timestamp sync.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-cyan-900/50 text-[10px] font-mono text-cyan-400 font-semibold">
                Universal Compatibility
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-3.5 rounded-lg bg-slate-900 border border-emerald-500/40 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 block mb-1">05 // OUTCOME</span>
                <h4 className="text-xs font-bold text-emerald-300">Court-Admissible Proof</h4>
                <p className="text-[11px] text-slate-300 mt-1">
                  Blockchain immutable custody ledger + Section 65B Indian Evidence Act certified reports.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-emerald-900/50 text-[10px] font-mono text-emerald-400 font-semibold">
                100% Legal Admissibility
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Matrix Interactive Explorer */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Multi-Vendor DVR/NVR Compatibility Matrix</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">8 Supported Architectures</span>
          </div>

          {/* Vendor Tabs */}
          <div className="flex flex-wrap gap-2 mb-3">
            {VENDORS_DATA.map((vendor) => (
              <button
                key={vendor.id}
                onClick={() => setActiveVendorTab(vendor.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                  vendor.id === activeVendorTab
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-750 border border-slate-700/60'
                }`}
              >
                {vendor.logoText}
              </button>
            ))}
          </div>

          {/* Selected Vendor Deep Dive */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <span className="text-sm font-bold text-white">{currentVendor.name}</span>
                <span className="ml-2 text-xs text-slate-400">({currentVendor.deviceType})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {currentVendor.marketShare}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  Parsing Engine: {currentVendor.parsingEngine}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Magic Bytes Signature</span>
                <p className="font-mono text-cyan-300 font-semibold mt-0.5">{currentVendor.magicBytes}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Proprietary Filesystem</span>
                <p className="font-mono text-slate-200 font-semibold mt-0.5">{currentVendor.filesystem}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Timestamp Encoding</span>
                <p className="font-mono text-slate-200 font-semibold mt-0.5">{currentVendor.timestampEncoding}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 md:col-span-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Partition & Cluster Structure</span>
                <p className="text-slate-300 mt-0.5">{currentVendor.partitionStructure}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Carving Strategy</span>
                <p className="text-emerald-400 font-medium mt-0.5">{currentVendor.carvingSupport}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400 font-mono">
            ForenCCTV • Built for Smart India Hackathon 2026 Evaluation
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <span>Explore Platform</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
