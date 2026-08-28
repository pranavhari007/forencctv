import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  KeyRound, 
  ArrowRight, 
  Binary, 
  Layers, 
  FileCheck2, 
  AlertTriangle,
  Fingerprint,
  Radio,
  Cpu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

export const LoginPage = ({ onLoginSuccess, onOpenProblemBanner }) => {
  const { login, demoProfiles } = useAuth();
  const { notifySuccess } = useNotification();

  const [email, setEmail] = useState('rajesh.sharma@cybercell.gov.in');
  const [password, setPassword] = useState('ForensicSecure#2026');
  const [selectedBadge, setSelectedBadge] = useState('officer-01');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, selectedBadge);
    notifySuccess('Authentication Successful', 'Digital Forensic Clearance Verified (Level 4 Top Secret)');
    if (onLoginSuccess) onLoginSuccess();
  };

  const handleDemoSelect = (profileId) => {
    const profile = demoProfiles.find(p => p.id === profileId);
    if (profile) {
      setSelectedBadge(profileId);
      setEmail(profile.email);
      setPassword('ForensicSecure#2026');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between relative overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Top Bar */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Binary className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-white font-mono tracking-tight">ForenCCTV</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
                PROTOTYPE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">Unified DVR/NVR Forensic Analysis Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenProblemBanner}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>SIH 2026 PS: SIH26150</span>
          </button>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-4">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
          
          {/* Left: Investigator Information Panel */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs mb-4">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Forensic Investigator Portal</span>
              </div>

              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Secure Law Enforcement & Cyber Cell Access
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Admissible CCTV acquisition, unallocated carving, proprietary vendor decoding, and Section 65B forensic audit anchoring.
              </p>

              {/* Quick Profile Selectors */}
              <div className="mt-6">
                <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider mb-2 font-semibold flex items-center justify-between">
                  <span>1-Click Demo Profiles</span>
                  <span className="text-cyan-400">Select to test</span>
                </div>

                <div className="space-y-2">
                  {demoProfiles.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleDemoSelect(p.id)}
                      className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-start gap-3 ${
                        selectedBadge === p.id
                          ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200 shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white shrink-0 mt-0.5">
                        {p.avatar}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-100 truncate">{p.name}</span>
                          <span className="text-[10px] font-mono text-cyan-400 shrink-0">{p.badgeId}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">{p.role}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 flex items-center justify-between">
              <span>ECDSA-256 Auth</span>
              <span className="text-emerald-400">FIPS 140-2 Compliant</span>
            </div>
          </div>

          {/* Right: Login Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white">Investigator Credentials</h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Enter authorized digital forensic credentials or use demo credentials
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                  Official Email / Investigator ID
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-xs font-mono focus:border-cyan-500 focus:outline-none"
                    placeholder="investigator@cybercell.gov.in"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5">
                  Cryptographic Token / Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-xs font-mono focus:border-cyan-500 focus:outline-none"
                    placeholder="••••••••••••••••"
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 font-mono flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Session protected by Hardware Security Token & Dual-Hash Audit</span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authenticate & Launch Platform</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-3 border-t border-slate-800/80 bg-slate-950/80 text-center text-xs font-mono text-slate-500">
        Smart India Hackathon 2026 • PS ID: SIH26150 (Blockchain & Cybersecurity) • ForenCCTV Prototype
      </footer>
    </div>
  );
};

