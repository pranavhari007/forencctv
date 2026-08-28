import React, { useState } from 'react';
import { 
  HardDriveDownload, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  Play, 
  RefreshCw, 
  HardDrive, 
  AlertTriangle, 
  FileCheck2, 
  Copy,
  Layers,
  ArrowRight,
  Database
} from 'lucide-react';
import { useCases } from '../../context/CaseContext';
import { useNotification } from '../../context/NotificationContext';
import { HashBadge } from '../../components/common/HashBadge';
import { StatusBadge } from '../../components/common/StatusBadge';

export const EvidenceAcquisitionPage = ({ setCurrentTab }) => {
  const { activeCase, activeEvidence, addEvidence } = useCases();
  const { notifySuccess, notifyInfo, notifyWarning } = useNotification();

  const [isAcquiring, setIsAcquiring] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSector, setCurrentSector] = useState('0x00000000');
  const [speed, setSpeed] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState('E01');
  const [sourceChannel, setSourceChannel] = useState('CAM-05 (Server Room)');

  const handleStartAcquisition = () => {
    setIsAcquiring(true);
    setProgress(0);
    setSpeed(184.2);
    notifyInfo('Acquisition Initialized', 'Hardware write-block confirmed on Tableau T8u Bridge. Starting bitstream imaging...');

    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setProgress(current);
      setCurrentSector(`0x${(current * 144200).toString(16).toUpperCase()}`);
      setSpeed(Number((180 + Math.random() * 10).toFixed(1)));

      if (current >= 100) {
        clearInterval(interval);
        setIsAcquiring(false);
        setSpeed(0);

        const newEv = addEvidence({
          cameraNumber: sourceChannel.split(' ')[0],
          cameraLocation: sourceChannel.split('(')[1]?.replace(')', '') || 'Surveillance Feed',
          fileName: `${sourceChannel.split(' ')[0]}_20260821_020000_ACQUIRED.${selectedFormat.toLowerCase()}`,
          sourceType: `Physical Bitstream Image (.${selectedFormat})`,
          vendor: activeCase.deviceVendor || 'hikvision',
          fileSize: '4.95 GB',
          duration: '01:30:00 (5,400 sec)',
          resolution: '3840x2160 (4K UHD @ 25fps)',
          codec: 'H.265 / HEVC Main Profile',
          bitrate: '8,200 kbps CBR',
          sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
          md5: '5d41402abc4b2a76b9719d911017c592',
          acquiredBy: activeCase.investigator,
          writeBlockerHardware: 'Tableau T8u Hardware Locked (Serial #TB-9021)',
          notes: 'Freshly acquired live surveillance stream under write-block protection.'
        });

        notifySuccess(
          `Bit-Stream Acquisition Completed: ${newEv.fileName}`,
          'Pre-hash & Post-hash SHA-256 match 100%. Block sealed on blockchain ledger.'
        );
      }
    }, 300);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Forensic Evidence Acquisition & Write-Blocked Imaging</h1>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
              WRITE-BLOCK ACTIVE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Physical bit-stream image generation (.E01 / .DD / .RAW) with simultaneous dual-hash SHA-256 / MD5 validation
          </p>
        </div>

        <button
          onClick={() => setCurrentTab('analysis')}
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/20 self-start sm:self-auto font-mono"
        >
          <span>Open Evidence Analysis</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/50 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="font-bold text-emerald-400">HARDWARE WRITE-BLOCK BRIDGE: LOCKED (READ-ONLY)</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">PASS-THROUGH BLOCKED</span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Device: <span className="text-slate-100 font-mono font-semibold">Tableau T8u USB 3.0 Forensic SATA Bridge</span> (Firmware v2.4.1) • Host OS write commands intercepted and rejected.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-300 shrink-0">
          <span className="text-emerald-400 font-bold">0 Bad Sectors</span>
          <span>•</span>
          <span>Read Mode: Bit-Exact Physical Clone</span>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <HardDriveDownload className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Forensic Bit-Stream Imager Engine</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Target Case: {activeCase.id}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 font-semibold mb-1">
              Source CCTV Stream Channel:
            </label>
            <select
              value={sourceChannel}
              onChange={(e) => setSourceChannel(e.target.value)}
              disabled={isAcquiring}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs font-mono focus:border-cyan-500 focus:outline-none"
            >
              <option value="CAM-05 (Server Room)">CAM-05 (Server Room & Rack Access)</option>
              <option value="CAM-06 (Emergency Exit)">CAM-06 (Emergency Stairwell Exit)</option>
              <option value="CAM-07 (Perimeter North)">CAM-07 (Perimeter Fence North)</option>
              <option value="CAM-08 (Basement Parking)">CAM-08 (Basement Parking Slot 14)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 font-semibold mb-1">
              Forensic Container Format:
            </label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              disabled={isAcquiring}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs font-mono focus:border-cyan-500 focus:outline-none"
            >
              <option value="E01">Expert Witness Format (.E01 - EnCase Standard)</option>
              <option value="DD">Raw Bit-by-Bit DD Image (.dd)</option>
              <option value="RAW">AFF4 Advanced Forensic Format (.aff4)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleStartAcquisition}
              disabled={isAcquiring}
              className={`w-full py-2.5 rounded-lg font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 ${
                isAcquiring
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
              }`}
            >
              {isAcquiring ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>Acquiring Bitstream...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Start Bit-Stream Acquisition</span>
                </>
              )}
            </button>
          </div>
        </div>

        {isAcquiring && (
          <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-cyan-500/40">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold">Progress: {progress}%</span>
                <span className="text-slate-400">Sector: {currentSector}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">Throughput: {speed} MB/s</span>
                <span className="text-amber-400">Est. Remaining: {Math.max(0, Math.floor((100 - progress) * 0.05))}s</span>
              </div>
            </div>

            <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-cyan-400" />
              <span>Acquired Evidence Feeds ({activeEvidence.length})</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Write-blocked forensic images verified with SHA-256 pre/post calculation
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Hash Matched</span>
          </span>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3">Evidence ID / Camera</th>
                <th className="py-2.5 px-3">File Name & Format</th>
                <th className="py-2.5 px-3">Size / Resolution</th>
                <th className="py-2.5 px-3">SHA-256 Digital Seal</th>
                <th className="py-2.5 px-3">Acquisition Timestamp</th>
                <th className="py-2.5 px-3 text-right">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {activeEvidence.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-850/80 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-mono font-bold text-cyan-400">{ev.id}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{ev.cameraNumber} - {ev.cameraLocation}</div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-mono text-slate-200 font-medium truncate max-w-xs">{ev.fileName}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{ev.sourceType}</div>
                  </td>

                  <td className="py-3 px-3 font-mono">
                    <div className="text-slate-200">{ev.fileSize}</div>
                    <div className="text-[10px] text-slate-400">{ev.resolution}</div>
                  </td>

                  <td className="py-3 px-3">
                    <HashBadge hash={ev.sha256} />
                  </td>

                  <td className="py-3 px-3 font-mono text-[11px] text-slate-400">
                    <div>{ev.acquisitionTimestamp.substring(0, 19)}</div>
                    <div className="text-[10px] text-slate-500">{ev.acquiredBy?.split('(')[0]}</div>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <StatusBadge status={ev.verificationStatus} size="xs" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

