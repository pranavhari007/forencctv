import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Lock, 
  Cpu, 
  HardDrive, 
  Terminal, 
  FileCheck2, 
  Check, 
  RefreshCw,
  Sliders,
  Database
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export const SettingsPage = () => {
  const { notifySuccess } = useNotification();

  const [settings, setSettings] = useState({
    defaultHash: 'SHA256',
    dualHashEnabled: true,
    writeBlockEnforcement: 'STRICT_BLOCK',
    autoCarveOnAcquisition: true,
    blockchainNode: 'https://node1.forencctv.gov.in:8545',
    consensusMechanism: 'Proof-of-Authority (FSL Network)',
    hardwareBridge: 'Tableau T8u USB 3.0',
    exportFormat: 'PDF_65B',
    offlineMode: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    notifySuccess('Settings Saved', 'Forensic configuration updated and cryptographic policy enforced.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Forensic Platform Configuration & Security Policies</h1>
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
              FIPS 140-2
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Configure cryptographic hashing algorithms, write-block bridge drivers, and blockchain consensus settings
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs font-mono">
        {/* Security & Hashing */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-4">
          <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Cryptographic Hashing & Verification Standards</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Primary Hash Algorithm</label>
              <select
                value={settings.defaultHash}
                onChange={e => setSettings({ ...settings, defaultHash: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="SHA256">SHA-256 (NIST FIPS 180-4 - Recommended)</option>
                <option value="SHA512">SHA-512 (High Security)</option>
                <option value="SHA3_256">SHA3-256 (Keccak)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Hardware Write-Block Enforcement</label>
              <select
                value={settings.writeBlockEnforcement}
                onChange={e => setSettings({ ...settings, writeBlockEnforcement: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-emerald-400 font-bold focus:border-cyan-500 focus:outline-none"
              >
                <option value="STRICT_BLOCK">Strict Hardware Lock (Reject software writes)</option>
                <option value="KERNEL_BLOCK">Kernel-Level Read-Only Mount</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="dualHash"
              checked={settings.dualHashEnabled}
              onChange={e => setSettings({ ...settings, dualHashEnabled: e.target.checked })}
              className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-cyan-500 h-4 w-4"
            />
            <label htmlFor="dualHash" className="text-slate-300 cursor-pointer">
              Simultaneous Dual-Hash Verification (Generate both SHA-256 & MD5 on all acquired bitstreams)
            </label>
          </div>
        </div>

        {/* Blockchain Node Settings */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-4">
          <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Forensic Blockchain & Audit Trail Node</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Blockchain RPC Node URI</label>
              <input
                type="text"
                value={settings.blockchainNode}
                onChange={e => setSettings({ ...settings, blockchainNode: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-cyan-300 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Consensus Mechanism</label>
              <input
                type="text"
                disabled
                value={settings.consensusMechanism}
                className="w-full px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <Check className="w-4 h-4" />
            <span>Save Forensic Policy Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};

