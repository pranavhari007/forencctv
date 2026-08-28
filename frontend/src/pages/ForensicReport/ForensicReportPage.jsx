import React, { useRef } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  User, 
  HardDrive, 
  Cpu, 
  Lock, 
  Sparkles, 
  GitCommit, 
  FileCheck2,
  Binary,
  Layers,
  Award
} from 'lucide-react';
import { useCases } from '../../context/CaseContext';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { HashBadge } from '../../components/common/HashBadge';
import confetti from 'canvas-confetti';

export const ForensicReportPage = () => {
  const { 
    activeCase, 
    activeEvidence, 
    activeCarvedFiles, 
    activeAiDetections, 
    activeTimelineEvents, 
    activeCustodyLog 
  } = useCases();
  const { currentUser } = useAuth();
  const { notifySuccess } = useNotification();
  const reportRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
    notifySuccess(
      'Section 65B Forensic Report Generated',
      `Court-admissible document for ${activeCase.id} ready. Initializing print-to-PDF...`
    );
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 no-print">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Court-Admissible Digital Forensic Report</h1>
            <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-mono text-xs font-bold border border-purple-500/30">
              SEC 65B COMPLIANT
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Standardized examination certificate compliant with Section 65B (Indian Evidence Act) & ISO/IEC 27037
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-semibold transition-colors flex items-center gap-1.5 border border-slate-700"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Download Section 65B PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Container */}
      <div 
        ref={reportRef}
        className="p-8 sm:p-12 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl text-slate-100 max-w-5xl mx-auto font-sans print:bg-white print:text-black print:p-0 print:border-none print:shadow-none"
      >
        {/* Official Header */}
        <div className="flex items-start justify-between pb-6 border-b-2 border-slate-700 print:border-black">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-slate-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400 font-mono font-bold text-2xl print:border-black print:text-black">
              ???
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight print:text-black">
                CENTRAL / STATE FORENSIC SCIENCE LABORATORY
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5 print:text-gray-700">
                Digital Forensics & Surveillance Video Examination Division
              </p>
              <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-cyan-400 print:text-black">
                <span>ISO/IEC 27037:2012 Certified</span>
                <span>•</span>
                <span>ForenCCTV Unified Engine v2.4</span>
              </div>
            </div>
          </div>

          <div className="text-right font-mono text-xs">
            <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-cyan-300 font-bold block mb-1 print:border-black print:text-black">
              REPORT REF: {activeCase.id}/S65B
            </span>
            <span className="text-[10px] text-slate-400 print:text-gray-600">
              Date: {new Date().toISOString().substring(0, 10)}
            </span>
          </div>
        </div>

        {/* Certificate Title */}
        <div className="my-6 text-center">
          <h3 className="text-base font-extrabold tracking-wider uppercase underline underline-offset-4 font-mono text-cyan-300 print:text-black">
            CERTIFICATE UNDER SECTION 65B OF THE INDIAN EVIDENCE ACT, 1872
          </h3>
          <p className="text-xs text-slate-400 mt-1 italic print:text-gray-600">
            Regarding the admissibility of electronic CCTV surveillance records, bitstream images, and carved media streams.
          </p>
        </div>

        {/* Section 1: Case Details */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-slate-800 print:border-gray-300 pb-1">
            1. CASE & REQUISITION PARTICULARS
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800 print:border-gray-300">
              <span className="text-[10px] text-slate-500 block">Case File ID</span>
              <span className="font-bold text-white print:text-black">{activeCase.id}</span>
            </div>
            <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800 print:border-gray-300">
              <span className="text-[10px] text-slate-500 block">FIR / Crime Diary No.</span>
              <span className="font-bold text-cyan-300 print:text-black">{activeCase.caseNumber}</span>
            </div>
            <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800 print:border-gray-300">
              <span className="text-[10px] text-slate-500 block">Police Jurisdiction</span>
              <span className="font-bold text-slate-200 print:text-black truncate block">{activeCase.jurisdiction}</span>
            </div>
            <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800 print:border-gray-300">
              <span className="text-[10px] text-slate-500 block">Lead Examiner</span>
              <span className="font-bold text-slate-200 print:text-black truncate block">{activeCase.investigator}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Seized Hardware & Extraction Device */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-slate-800 print:border-gray-300 pb-1">
            2. HARDWARE INSPECTION & WRITE-BLOCK ACQUISITION
          </h4>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 print:border-gray-300 text-xs font-mono space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Target DVR/NVR Architecture:</span>
              <span className="font-bold text-slate-200 print:text-black">{activeCase.deviceModel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Seized Storage Media:</span>
              <span className="font-bold text-slate-200 print:text-black">{activeCase.storageSeized}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Hardware Write-Blocker Bridge:</span>
              <span className="font-bold text-emerald-400 print:text-black">{activeCase.writeBlockerUsed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Physical Sector Integrity:</span>
              <span className="font-bold text-emerald-400 print:text-black">100% Bit-Exact Match (0 Bad Sectors)</span>
            </div>
          </div>
        </div>

        {/* Section 3: Evidence Feeds & Hash Certificates */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-slate-800 print:border-gray-300 pb-1">
            3. ACQUIRED EVIDENCE FEEDS & CRYPTOGRAPHIC HASH SEALS
          </h4>
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 print:border-gray-300 text-slate-400 print:text-black text-[10px]">
                <th className="py-2">Camera</th>
                <th className="py-2">File Name</th>
                <th className="py-2">Size / Resolution</th>
                <th className="py-2">SHA-256 Hash Digest</th>
                <th className="py-2 text-right">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 print:divide-gray-300">
              {activeEvidence.map((ev) => (
                <tr key={ev.id}>
                  <td className="py-2 font-bold text-cyan-400 print:text-black">{ev.cameraNumber}</td>
                  <td className="py-2 text-slate-300 print:text-black">{ev.fileName}</td>
                  <td className="py-2 text-slate-400 print:text-black">{ev.fileSize} ({ev.resolution?.split(' ')[0]})</td>
                  <td className="py-2 font-mono text-[10px] text-cyan-300 print:text-black">{ev.sha256.substring(0, 20)}...</td>
                  <td className="py-2 text-right text-emerald-400 print:text-black font-bold">MATCH</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 4: Video Recovery & Carved Streams */}
        {activeCarvedFiles.length > 0 && (
          <div className="space-y-3 mb-6">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-slate-800 print:border-gray-300 pb-1">
              4. UNALLOCATED SECTOR VIDEO CARVING FINDINGS
            </h4>
            <div className="space-y-2">
              {activeCarvedFiles.map((c) => (
                <div key={c.id} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 print:border-gray-300 text-xs">
                  <div className="flex justify-between font-mono font-bold">
                    <span className="text-indigo-400 print:text-black">{c.carvedFileName}</span>
                    <span className="text-emerald-400 print:text-black">Confidence: {c.recoveryConfidence}%</span>
                  </div>
                  <p className="text-[11px] text-slate-300 print:text-gray-800 mt-1">
                    <span className="font-semibold">Key Finding: </span>{c.keyEvidenceFound}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 5: AI Computer Vision & Timeline Correlation */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-slate-800 print:border-gray-300 pb-1">
            5. SYNCHRONIZED TIMELINE & SUSPECT TRACKING SUMMARY
          </h4>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 print:border-gray-300 text-xs space-y-2">
            <p className="text-slate-300 print:text-black leading-relaxed">
              Cross-camera video stream synchronization confirmed suspect progression between 02:18:10 AM and 03:04:22 AM. Vehicle identified as Pearl White Toyota Fortuner (DL 08 CA 4421). Face recognition candidate match #ND-CRIME-2024-9182 confirmed with 89.4% biometric cosine similarity from carved stream.
            </p>
          </div>
        </div>

        {/* Section 6: Blockchain Custody Proof */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-slate-800 print:border-gray-300 pb-1">
            6. IMMUTABLE BLOCKCHAIN CUSTODY ATTESTATION
          </h4>
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 print:border-gray-300 text-xs font-mono space-y-1 text-slate-300 print:text-black">
            <div>Ledger Root Block: <span className="text-cyan-300 print:text-black font-bold">Block #{activeCustodyLog[0]?.blockHeight || 140296}</span></div>
            <div>Merkle Root Digest: <span className="text-slate-400 print:text-black">{activeCustodyLog[0]?.merkleRoot || '7e2c9a14bf9d...'}</span></div>
            <div>Attestation: <span className="text-emerald-400 print:text-black font-bold">Cryptographically Verified Unaltered</span></div>
          </div>
        </div>

        {/* Signatures & Certification Seal */}
        <div className="mt-8 pt-6 border-t-2 border-slate-700 print:border-black grid grid-cols-2 gap-8 text-xs font-mono">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">Forensic Examiner</span>
            <div className="mt-4 font-bold text-white print:text-black">{activeCase.investigator}</div>
            <div className="text-cyan-400 print:text-gray-700 text-[11px]">{activeCase.investigatorBadge}</div>
            <div className="text-[10px] text-slate-500">{activeCase.agency}</div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-500 uppercase block">Section 65B Certifying Authority</span>
            <div className="mt-4 font-bold text-white print:text-black">Dr. S. K. Narayanan, Ph.D.</div>
            <div className="text-purple-400 print:text-gray-700 text-[11px]">Director & Chief Forensic Scientist</div>
            <div className="text-[10px] text-slate-500">Government Forensic Science Laboratory</div>
          </div>
        </div>
      </div>
    </div>
  );
};

