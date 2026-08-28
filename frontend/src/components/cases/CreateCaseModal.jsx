import React, { useState } from 'react';
import { X, FolderPlus, ShieldCheck, Lock, AlertTriangle, Calendar, User, FileText } from 'lucide-react';
import { useCases } from '../../context/CaseContext';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { VENDORS_DATA } from '../../data/devices';

export const CreateCaseModal = ({ isOpen, onClose, onCaseCreated }) => {
  const { addCase } = useCases();
  const { currentUser } = useAuth();
  const { notifySuccess } = useNotification();

  const [formData, setFormData] = useState({
    title: '',
    caseNumber: `FIR-2026/${Math.floor(1000 + Math.random() * 9000)}`,
    investigator: currentUser.name,
    investigatorBadge: currentUser.badgeId,
    agency: currentUser.agency,
    jurisdiction: 'Cyber Crime Police Station, Central District',
    incidentDate: new Date().toISOString().substring(0, 16),
    deviceVendor: 'hikvision',
    deviceModel: 'Hikvision DS-7616NI-K2 (16-Channel 4K NVR)',
    storageSeized: '2x 4TB Surveillance SATA HDDs',
    writeBlockerUsed: 'Tableau T8u USB 3.0 Forensic SATA Bridge (Hardware Write-Locked)',
    priority: 'HIGH',
    description: '',
    tags: ['Surveillance Seizure', 'Write-Block Acquired']
  });

  const [tagInput, setTagInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const created = addCase(formData);
    notifySuccess(`Case Created: ${created.id}`, `Registered on forensic blockchain ledger (FIR: ${created.caseNumber})`);
    if (onCaseCreated) onCaseCreated(created);
    onClose();
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <FolderPlus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Create New Forensic Investigation Case</h2>
            <p className="text-xs text-slate-400 font-mono">Secured chain-of-custody registration & FIR anchoring</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1 font-mono uppercase tracking-wider text-[11px]">
                Investigation / Case Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Commercial Complex Cash Vault Intrusion"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 font-mono uppercase tracking-wider text-[11px]">
                Police Station FIR / Crime Diary No. *
              </label>
              <input
                type="text"
                required
                value={formData.caseNumber}
                onChange={e => setFormData({ ...formData, caseNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-cyan-300 font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 font-mono uppercase tracking-wider text-[11px]">
                Lead Forensic Examiner / Officer
              </label>
              <input
                type="text"
                value={formData.investigator}
                onChange={e => setFormData({ ...formData, investigator: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 font-mono uppercase tracking-wider text-[11px]">
                Examiner Badge / Official ID
              </label>
              <input
                type="text"
                value={formData.investigatorBadge}
                onChange={e => setFormData({ ...formData, investigatorBadge: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-cyan-300 font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 font-mono uppercase tracking-wider text-[11px]">
                Police Jurisdiction / Lab Division
              </label>
              <input
                type="text"
                value={formData.jurisdiction}
                onChange={e => setFormData({ ...formData, jurisdiction: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 font-mono uppercase tracking-wider text-[11px]">
                Incident Date & Time
              </label>
              <input
                type="datetime-local"
                value={formData.incidentDate}
                onChange={e => setFormData({ ...formData, incidentDate: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 font-mono uppercase tracking-wider text-[11px]">
                Target DVR / NVR Hardware Architecture
              </label>
              <select
                value={formData.deviceVendor}
                onChange={e => setFormData({ ...formData, deviceVendor: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 focus:border-cyan-500 focus:outline-none"
              >
                {VENDORS_DATA.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.deviceType})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 font-mono uppercase tracking-wider text-[11px]">
                Investigation Priority
              </label>
              <select
                value={formData.priority}
                onChange={e => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 focus:border-cyan-500 focus:outline-none"
              >
                <option value="CRITICAL">CRITICAL (Priority Action / Red Notice)</option>
                <option value="HIGH">HIGH (Standard Active Felony)</option>
                <option value="MEDIUM">MEDIUM (Routine Investigation)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1 font-mono uppercase tracking-wider text-[11px]">
              Seizure Background & Case Synopsis
            </label>
            <textarea
              rows={3}
              placeholder="Detail the circumstances of seizure, DVR physical condition, damaged cables, or known suspect entry times..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-slate-300 font-medium mb-1 font-mono uppercase tracking-wider text-[11px]">
              Case Tags & Keywords
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Add tag (e.g. Heist, White SUV)..."
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-medium"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {formData.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 text-xs"
                >
                  <span>#{tag}</span>
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-rose-400">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Creating this case automatically instantiates Genesis Block #140300 on the ForenCCTV Immutable Audit Chain.
            </span>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Create Investigation Case</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
