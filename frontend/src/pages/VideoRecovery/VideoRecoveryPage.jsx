import React, { useState } from 'react';
import { 
  ScanSearch, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  HardDrive, 
  Layers, 
  ArrowRight, 
  RefreshCw, 
  FileCheck2, 
  Eye, 
  Sparkles,
  Download,
  Terminal,
  Binary
} from 'lucide-react';
import { useCases } from '../../context/CaseContext';
import { useNotification } from '../../context/NotificationContext';
import { HashBadge } from '../../components/common/HashBadge';
import { StatusBadge } from '../../components/common/StatusBadge';

export const VideoRecoveryPage = ({ setCurrentTab }) => {
  const { activeCase, activeCarvedFiles, addCarvedFile } = useCases();
  const { notifySuccess, notifyInfo } = useNotification();

  const [isScanningSectors, setIsScanningSectors] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedCluster, setSelectedCluster] = useState(activeCarvedFiles[0] || null);
  const [activeTabFilter, setActiveTabFilter] = useState('ALL');

  const handleRunDeepCarve = () => {
    setIsScanningSectors(true);
    setScanProgress(0);
    notifyInfo('Deep Forensic Carver Initialized', 'Scanning unallocated LBA sectors for orphaned H.264/H.265 NAL units & DHAV payloads...');

    let current = 0;
    const interval = setInterval(() => {
      current += 15;
      setScanProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setIsScanningSectors(false);

        const newCarved = addCarvedFile({
          cameraRef: 'CAM-01 (Lobby Entrance)',
          originalFileName: `rec_ch01_deleted_stream_${Math.floor(1000 + Math.random() * 9000)}.dav (DELETED)`,
          carvedFileName: `CARVED_CH01_DHAV_0x${(Math.random() * 0xFFFFFF).toString(16).toUpperCase().substring(0, 8)}.dav`,
          startSector: `0x0B400000 (Cluster #${Math.floor(350000 + Math.random() * 50000)})`,
          endSector: `0x0B800000 (Cluster #${Math.floor(410000 + Math.random() * 50000)})`,
          recoveredSize: '412.8 MB',
          detectedSignature: 'DHAV Frame Index Generator v2.4 (Magic 0x44484156)',
          recoveryConfidence: 97.8,
          status: 'Fully Recovered & Re-indexed',
          duration: '14m 20s (21,500 frames)',
          frameDrops: '0 missing I-Frames',
          sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
          reconstructionMethod: 'DHFS 4.1 Orphan Block Stitcher',
          keyEvidenceFound: 'Suspect entry sequence recovered from unallocated space.',
          previewAvailable: true
        });

        setSelectedCluster(newCarved);
        notifySuccess(
          `Sector Carving Complete: ${newCarved.carvedFileName}`,
          '100% video stream rebuilt from unallocated disk clusters. Added to case evidence.'
        );
      }
    }, 250);
  };

  const filteredCarved = activeCarvedFiles.filter(f => {
    if (activeTabFilter === 'ALL') return true;
    return f.status.includes(activeTabFilter);
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Forensic Video Carving & Sector Recovery</h1>
            <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono text-xs font-bold border border-indigo-500/30">
              DEEP CARVING ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Signature-based reconstruction of deleted surveillance footage from unallocated sectors, broken index tables, and corrupted ring-buffers
          </p>
        </div>

        <button
          onClick={() => setCurrentTab('timeline')}
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/20 self-start sm:self-auto font-mono"
        >
          <span>Correlate in Timeline</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Prototype Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 backdrop-blur-md flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <span className="font-bold text-amber-300 uppercase tracking-wider font-mono">
              [PROTOTYPE / DEMO RECOVERY ENGINE - SIH 2026]
            </span>
            <p className="text-slate-300 mt-0.5">
              Simulates signature-based frame extraction (SPS/PPS NAL reconstruction & proprietary vendor chunk stitching) from raw unallocated disk sectors.
            </p>
          </div>
        </div>

        <button
          onClick={handleRunDeepCarve}
          disabled={isScanningSectors}
          className={`px-4 py-2 rounded-lg font-mono font-bold text-xs transition-all shrink-0 flex items-center gap-2 ${
            isScanningSectors
              ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
          }`}
        >
          {isScanningSectors ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-300" />
              <span>Carving Sectors ({scanProgress}%)...</span>
            </>
          ) : (
            <>
              <ScanSearch className="w-4 h-4" />
              <span>Scan Unallocated Space</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Unallocated Cluster Map */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-indigo-400" />
              <span>Disk LBA Allocation Radar & Carved Fragment Map</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Physical Disk Sectors 0x00000000 to 0x1FFFFFFF (4TB Surveillance Volume)
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 font-semibold">
            {activeCarvedFiles.length} Carved Stream Fragments
          </span>
        </div>

        {/* Visualized Sector Blocks Grid */}
        <div className="mt-4 grid grid-cols-12 sm:grid-cols-24 lg:grid-cols-48 gap-1 p-3 rounded-xl bg-slate-950 border border-slate-800">
          {Array.from({ length: 96 }).map((_, i) => {
            const isCarved = i === 18 || i === 19 || i === 34 || i === 35 || i === 62 || i === 78;
            const isAllocated = i < 15 || (i > 22 && i < 30) || (i > 45 && i < 58);
            const isBad = i === 88;

            return (
              <div
                key={i}
                title={`Sector Block #${i * 32768} - ${isCarved ? 'RECOVERED DELETED STREAM' : isAllocated ? 'Allocated Video Stream' : isBad ? 'Corrupted Sector' : 'Unallocated Space'}`}
                className={`h-4 rounded-xs transition-transform hover:scale-125 cursor-pointer ${
                  isCarved
                    ? 'bg-indigo-500 shadow-sm shadow-indigo-500 animate-pulse'
                    : isAllocated
                      ? 'bg-slate-700 hover:bg-slate-600'
                      : isBad
                        ? 'bg-rose-600'
                        : 'bg-slate-900 hover:bg-slate-800 border border-slate-800'
                }`}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-indigo-500 inline-block" />
              <span>Carved / Recovered Fragment</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-slate-700 inline-block" />
              <span>Allocated Stream</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-slate-900 border border-slate-800 inline-block" />
              <span>Unallocated Space</span>
            </div>
          </div>
          <span className="text-emerald-400 font-semibold">Carver Accuracy: 98.4% Frame Continuity</span>
        </div>
      </div>

      {/* Recovered Streams Table & Preview Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recovered Streams Table */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-xs font-mono uppercase text-slate-300 font-bold tracking-wider flex items-center gap-2">
              <ScanSearch className="w-4 h-4 text-cyan-400" />
              <span>Recoverable Stream Registry ({activeCarvedFiles.length})</span>
            </h3>
          </div>

          <div className="space-y-3 mt-4">
            {activeCarvedFiles.map((file) => {
              const isSelected = selectedCluster?.id === file.id;
              return (
                <div
                  key={file.id}
                  onClick={() => setSelectedCluster(file)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-950/40'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-cyan-400">{file.id}</span>
                        <span className="text-slate-500">|</span>
                        <span className="font-mono text-xs text-indigo-300 font-semibold">{file.cameraRef}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-200 mt-1 font-mono">{file.carvedFileName}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-through">{file.originalFileName}</p>
                    </div>

                    <div className="text-right">
                      <div className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                        {file.recoveryConfidence}% Match
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 mt-1 block">{file.recoveredSize}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Sectors: {file.startSector.split(' ')[0]}</span>
                    <span className="text-cyan-400 font-medium">{file.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Carved Fragment Deep Inspection */}
        <div className="lg:col-span-5 space-y-4">
          {selectedCluster ? (
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-xs font-mono uppercase text-white font-bold tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Carved Stream Deep Inspection</span>
                </h3>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold">
                  RECONSTRUCTED
                </span>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Cluster Range:</span>
                  <span className="text-cyan-300 font-semibold">{selectedCluster.startSector}</span>
                </div>

                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Detected Signature:</span>
                  <span className="text-slate-200 truncate max-w-[200px]">{selectedCluster.detectedSignature}</span>
                </div>

                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Reconstruction Engine:</span>
                  <span className="text-emerald-400 font-semibold">{selectedCluster.reconstructionMethod}</span>
                </div>

                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Frame Continuity:</span>
                  <span className="text-slate-200">{selectedCluster.frameDrops}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
                  Critical Evidence Recovered in Fragment:
                </span>
                <p className="text-xs text-cyan-200 leading-relaxed font-sans font-medium">
                  "{selectedCluster.keyEvidenceFound}"
                </p>
              </div>

              <div className="pt-2">
                <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">
                  SHA-256 Carved File Hash
                </div>
                <HashBadge hash={selectedCluster.sha256} truncate={false} className="w-full justify-between" />
              </div>

              <button
                onClick={() => notifySuccess('Carved Video Stream Exported', `${selectedCluster.carvedFileName} exported with S-65B integrity envelope.`)}
                className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs font-mono transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
              >
                <Download className="w-4 h-4" />
                <span>Export Carved Footage Container</span>
              </button>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 text-center text-slate-500 font-mono text-xs">
              Select a carved stream fragment on the left to inspect reconstructed headers.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

