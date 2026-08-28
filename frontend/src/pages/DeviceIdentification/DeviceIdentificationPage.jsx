import React, { useState } from 'react';
import { 
  Cpu, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  FileCode, 
  HardDrive, 
  Zap, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Binary,
  Radio,
  FileCheck2
} from 'lucide-react';
import { VENDORS_DATA } from '../../data/devices';
import { useNotification } from '../../context/NotificationContext';
import { useCases } from '../../context/CaseContext';

export const DeviceIdentificationPage = ({ setCurrentTab }) => {
  const { activeCase } = useCases();
  const { notifySuccess, notifyInfo } = useNotification();
  const [selectedVendorId, setSelectedVendorId] = useState('hikvision');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [customFileUploaded, setCustomFileUploaded] = useState(null);

  const currentVendor = VENDORS_DATA.find(v => v.id === selectedVendorId) || VENDORS_DATA[0];
  const sampleDump = currentVendor.sampleDumps[0];

  const handleTriggerScan = (vendorId) => {
    setSelectedVendorId(vendorId);
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          notifySuccess(
            `Device Signature Verified: ${VENDORS_DATA.find(v => v.id === vendorId)?.name}`,
            `Magic bytes matched with 100% confidence. Extractor profile loaded.`
          );
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  const handleFileUploadMock = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomFileUploaded(file.name);
      notifyInfo(`Analyzing uploaded evidence image: ${file.name}`, 'Scanning magic bytes at sector 0x00000000...');
      handleTriggerScan('dahua');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">DVR / NVR Device Identification & Signature Profiler</h1>
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
              8 Vendor Profiles
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Automated magic byte inspection, proprietary filesystem detection (DHFS, HIKFS, WFS), and partition table reconstruction
          </p>
        </div>

        <button
          onClick={() => setCurrentTab('acquisition')}
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/20 self-start sm:self-auto font-mono"
        >
          <span>Proceed to Evidence Acquisition</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {VENDORS_DATA.map((v) => (
          <button
            key={v.id}
            onClick={() => handleTriggerScan(v.id)}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedVendorId === v.id
                ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-950'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
            }`}
          >
            <div className="text-[10px] font-mono text-slate-500 font-semibold truncate uppercase">
              {v.deviceType.split(' ')[0]}
            </div>
            <div className="text-xs font-bold font-mono truncate mt-0.5 text-slate-100">
              {v.logoText}
            </div>
            <div className="mt-2 text-[10px] font-mono flex items-center justify-between text-slate-500">
              <span>{v.id === selectedVendorId ? 'SELECTED' : 'SELECT'}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${v.id === selectedVendorId ? 'bg-cyan-400' : 'bg-slate-600'}`} />
            </div>
          </button>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/80 border border-dashed border-slate-700 hover:border-cyan-500/60 transition-colors backdrop-blur-md text-center relative">
        <input
          type="file"
          onChange={handleFileUploadMock}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          title="Upload or drop raw disk image"
        />
        <div className="flex flex-col items-center justify-center pointer-events-none">
          <div className="p-3 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-3">
            <UploadCloud className="w-6 h-6 animate-bounce" />
          </div>
          <p className="text-sm font-bold text-slate-100">
            {customFileUploaded ? `Loaded: ${customFileUploaded}` : 'Upload Raw Forensic Disk Dump or Stream File'}
          </p>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Accepts <span className="text-cyan-400">.E01, .dd, .raw, .001, .img, .dav, .264, .mp4, .vigi</span> or click any vendor above to test sample dumps
          </p>
        </div>
      </div>

      {isScanning && (
        <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/50 shadow-lg shadow-cyan-950">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-cyan-400 flex items-center gap-2">
              <Binary className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Scanning Sector Header Magic Bytes...</span>
            </span>
            <span className="text-cyan-300 font-bold">{scanProgress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-200"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{currentVendor.name}</h3>
                <span className="text-xs font-mono text-slate-400">Detection Confidence: 100% Match</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>VERIFIED SIGNATURE</span>
            </span>
          </div>

          <div className="space-y-3 mt-4 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Manufacturer / Brand:</span>
              <span className="text-white font-bold">{currentVendor.name}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Hardware Class:</span>
              <span className="text-cyan-300 font-bold">{currentVendor.deviceType}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Detected Firmware Version:</span>
              <span className="text-slate-200">{sampleDump?.firmware || 'V4.74.010 Build 2025'}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Target HDD Model Seized:</span>
              <span className="text-amber-300 font-bold">{sampleDump?.hddModel || 'WD Purple 4TB Surveillance'}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Physical Sector Geometry:</span>
              <span className="text-slate-200">{currentVendor.sectorSize}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Internal RTC Timestamp Encoding:</span>
              <span className="text-cyan-300">{currentVendor.timestampEncoding}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
                  Raw Header Magic Byte Verification
                </h4>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Offset: 0x00000000</span>
            </div>

            <div className="mt-3 p-3.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
              <div className="text-[11px] text-slate-500 pb-1 border-b border-slate-900 flex justify-between">
                <span>00000000: 48 4B 48 20 00 00 01 00 53 4D 41 52 54 32 36 35</span>
                <span className="text-cyan-400 font-bold">{currentVendor.magicBytes.split(' ')[0]}</span>
              </div>
              <div className="text-[11px] text-slate-500 py-1 flex justify-between">
                <span>00000010: 20 26 08 21 02 22 15 00 48 45 56 43 00 00 00 00</span>
                <span className="text-emerald-400 font-semibold">[VALID PAYLOAD]</span>
              </div>
              <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-900 flex justify-between">
                <span>00000020: 00 00 10 00 00 00 40 00 00 00 00 00 00 00 00 00</span>
                <span className="text-slate-400">CRC-32: 0x89A14B2C</span>
              </div>
            </div>

            <div className="mt-3 p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Proprietary Driver Active: </span>
                <span>{currentVendor.parsingEngine} loaded for raw stream extraction and partition decoding.</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
            <div className="text-xs font-bold font-mono uppercase text-slate-300 mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Recommended Forensic Extraction Profile</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentVendor.carvingSupport}
            </p>
            <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-mono">
              <span className="text-slate-400">Cluster Alignment:</span>
              <span className="text-emerald-400 font-semibold">Optimized (4K Boundary Locked)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

