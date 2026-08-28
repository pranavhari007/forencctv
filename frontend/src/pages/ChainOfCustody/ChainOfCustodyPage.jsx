import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  ArrowRight, 
  Terminal, 
  Layers, 
  KeyRound, 
  Fingerprint, 
  Database,
  Cpu,
  FileCheck2
} from 'lucide-react';
import { useCases } from '../../context/CaseContext';
import { useNotification } from '../../context/NotificationContext';
import { HashBadge } from '../../components/common/HashBadge';
import { StatusBadge } from '../../components/common/StatusBadge';

export const ChainOfCustodyPage = ({ setCurrentTab }) => {
  const { 
    activeCase, 
    custodyLog, 
    activeCustodyLog, 
    tamperedBlockIndex, 
    simulateTampering, 
    resetTampering 
  } = useCases();
  const { notifySuccess, notifyError, notifyWarning } = useNotification();

  const [selectedBlock, setSelectedBlock] = useState(activeCustodyLog[0] || custodyLog[0]);
  const [isVerifyingAll, setIsVerifyingAll] = useState(false);

  const handleRunIntegrityVerification = () => {
    setIsVerifyingAll(true);
    setTimeout(() => {
      setIsVerifyingAll(false);
      if (tamperedBlockIndex !== null) {
        notifyError(
          'CRYPTOGRAPHIC INTEGRITY FAILURE DETECTED',
          `Block #${activeCustodyLog[tamperedBlockIndex]?.blockHeight || '140292'} has broken Merkle root hash! Evidence may be altered.`
        );
      } else {
        notifySuccess(
          'Blockchain Custody Ledger 100% Verified',
          `All ${activeCustodyLog.length} forensic custody blocks match cryptographic parent hashes.`
        );
      }
    }, 800);
  };

  const handleToggleTamper = (index) => {
    if (tamperedBlockIndex === index) {
      resetTampering();
      notifySuccess('Integrity Restored', 'Reverted simulated payload tampering. Hash valid.');
    } else {
      simulateTampering(index);
      notifyWarning(
        'Simulated Tampering Injected',
        `Modified 1 byte in Block #${activeCustodyLog[index]?.blockHeight}. SHA-256 checksum recalculated to mismatch.`
      );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Immutable Blockchain Chain-of-Custody Ledger</h1>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
              TAMPER-EVIDENT SEC 65B
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Cryptographic audit trail anchoring every acquisition, analysis, and forensic carving step with ECDSA-secp256k1 signatures
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunIntegrityVerification}
            disabled={isVerifyingAll}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-emerald-600/30"
          >
            {isVerifyingAll ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            <span>Verify Blockchain Integrity</span>
          </button>

          <button
            onClick={() => setCurrentTab('reports')}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/20 font-mono"
          >
            <span>Generate Court Report</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tamper Alert Banner if Tampering is Simulated */}
      {tamperedBlockIndex !== null && (
        <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-500 shadow-xl shadow-rose-950/50 flex items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold font-mono text-rose-200 uppercase tracking-wider">
                SECURITY INTEGRITY ALERT: HASH MISMATCH DETECTED ON BLOCK #{activeCustodyLog[tamperedBlockIndex]?.blockHeight}
              </h4>
              <p className="text-xs text-rose-300/90 mt-0.5">
                A single bit flip in the evidence stream invalidated the Merkle root. Court admissibility would be rejected under Section 65B.
              </p>
            </div>
          </div>
          <button
            onClick={resetTampering}
            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold transition-colors shrink-0"
          >
            Reset Integrity Simulation
          </button>
        </div>
      )}

      {/* Ledger Architecture KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Total Blocks Anchored</span>
          <span className="text-2xl font-extrabold font-mono text-cyan-400 mt-1 block">
            #{activeCustodyLog[0]?.blockHeight || 140296}
          </span>
          <span className="text-xs text-slate-500 font-mono mt-1 block">Consensus: Proof-of-Authority (POA)</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Digital Signature Standard</span>
          <span className="text-base font-bold font-mono text-white mt-1 block truncate">
            ECDSA (secp256k1)
          </span>
          <span className="text-xs text-emerald-400 font-mono mt-1 block">FSL Cryptographic Certified</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Ledger Verification Status</span>
          <span className={`text-base font-bold font-mono mt-1 block ${tamperedBlockIndex !== null ? 'text-rose-400' : 'text-emerald-400'}`}>
            {tamperedBlockIndex !== null ? 'FAILED (TAMPERED)' : '100% UNBROKEN CHAIN'}
          </span>
          <span className="text-xs text-slate-500 font-mono mt-1 block">SHA-256 Merkle Tree</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Legal Admissibility Tag</span>
          <span className="text-base font-bold font-mono text-purple-300 mt-1 block">
            Section 65B (IEA)
          </span>
          <span className="text-xs text-slate-500 font-mono mt-1 block">ISO/IEC 27037 Digital Proof</span>
        </div>
      </div>

      {/* Main Ledger Table & Block Inspector Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Chain of Custody Table */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                <span>Cryptographic Custody Ledger Entries ({activeCustodyLog.length})</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Click any block to inspect raw Merkle root and signatures</p>
            </div>
            <span className="text-xs font-mono text-slate-400">Node Cluster: ForenCCTV-01</span>
          </div>

          <div className="space-y-3 mt-4">
            {activeCustodyLog.map((block, idx) => {
              const isTampered = tamperedBlockIndex === idx;
              const isSelected = selectedBlock?.blockHeight === block.blockHeight;

              return (
                <div
                  key={block.blockHeight}
                  onClick={() => setSelectedBlock(block)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isTampered
                      ? 'bg-rose-950/40 border-rose-500'
                      : isSelected
                        ? 'bg-gradient-to-br from-slate-900 to-cyan-950/60 border-cyan-500 shadow-md shadow-cyan-950'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-cyan-400">
                          Block #{block.blockHeight}
                        </span>
                        <span className="text-slate-500">|</span>
                        <span className="font-mono text-xs font-bold text-white">
                          {block.action.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-snug">{block.details}</p>
                    </div>

                    <div className="text-right shrink-0">
                      {isTampered ? (
                        <StatusBadge status="TAMPER_ALERT" size="xs" />
                      ) : (
                        <StatusBadge status="CONFIRMED_ON_CHAIN" size="xs" />
                      )}
                      <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                        {block.timestamp.substring(0, 19)}
                      </span>
                    </div>
                  </div>

                  {/* Hash & Signature Bar */}
                  <div className="mt-3 pt-2 border-t border-slate-900 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span>Officer:</span>
                      <span className="text-slate-200">{block.officer} ({block.badgeId})</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleTamper(idx);
                      }}
                      className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold transition-colors ${
                        isTampered
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-rose-400'
                      }`}
                    >
                      {isTampered ? 'Revert Tampering' : 'Simulate Tamper'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Block Deep Inspector */}
        <div className="lg:col-span-4 space-y-4">
          {selectedBlock && (
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-xs font-mono uppercase text-white font-bold tracking-wider flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-400" />
                  <span>Block #{selectedBlock.blockHeight} Payload</span>
                </h3>
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono font-bold">
                  IMMUTABLE
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Block Hash</span>
                  <span className="text-cyan-300 break-all text-[11px] font-bold mt-0.5 block">{selectedBlock.blockHash}</span>
                </div>

                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Merkle Root</span>
                  <span className="text-slate-200 break-all text-[11px] mt-0.5 block">{selectedBlock.merkleRoot}</span>
                </div>

                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">ECDSA Cryptographic Signature</span>
                  <span className="text-emerald-400 break-all text-[11px] mt-0.5 block">{selectedBlock.digitalSignature}</span>
                </div>

                <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-500">Hardware Asset:</span>
                  <span className="text-slate-200 truncate max-w-[180px]">{selectedBlock.hardwareAsset}</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">
                  SHA-256 Sealed Evidence Hash
                </div>
                <HashBadge hash={selectedBlock.sha256} truncate={false} className="w-full justify-between" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

