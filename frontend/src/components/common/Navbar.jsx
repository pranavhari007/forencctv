import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  HardDrive, 
  Clock, 
  UserCheck, 
  ChevronDown, 
  AlertTriangle, 
  Search, 
  Plus, 
  LogOut, 
  Layers,
  Menu,
  X,
  FileCheck2,
  Terminal,
  Cpu
} from 'lucide-react';
import { useCases } from '../../context/CaseContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar = ({ onOpenNewCase, toggleMobileSidebar, isMobileSidebarOpen, currentTab, setCurrentTab }) => {
  const { cases, activeCaseId, setActiveCaseId, activeCase } = useCases();
  const { currentUser, switchProfile, demoProfiles, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [caseDropdownOpen, setCaseDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 lg:px-6">
      {/* Left: Mobile Toggle + SIH Badge + Active Case Dropdown */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* SIH Hackathon Meta Tag */}
        <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/40 text-xs">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="font-bold text-cyan-400 font-mono tracking-wider">SIH 2026</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300 font-mono text-[11px]">PS: SIH26150</span>
          <span className="text-slate-500">|</span>
          <span className="text-amber-400 font-medium text-[11px]">Blockchain & Cybersecurity</span>
        </div>

        {/* Active Case Selector */}
        <div className="relative">
          <button
            onClick={() => setCaseDropdownOpen(!caseDropdownOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-850 border border-slate-700/80 hover:border-cyan-500/60 transition-all text-left group"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <div>
              <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1">
                <span>Active Investigation</span>
                <span className="text-cyan-400 font-bold">[{activeCase.id}]</span>
              </div>
              <div className="text-xs font-semibold text-slate-100 truncate max-w-[160px] sm:max-w-[220px]">
                {activeCase.title}
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-transform" />
          </button>

          {caseDropdownOpen && (
            <div 
              className="absolute left-0 top-full mt-1.5 w-80 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
              onMouseLeave={() => setCaseDropdownOpen(false)}
            >
              <div className="flex items-center justify-between px-2 py-1.5 border-b border-slate-800 mb-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Switch Investigation</span>
                <button
                  onClick={() => {
                    setCaseDropdownOpen(false);
                    onOpenNewCase();
                  }}
                  className="text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> New Case
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto space-y-1">
                {cases.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveCaseId(c.id);
                      setCaseDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg transition-colors flex items-start gap-2.5 ${
                      c.id === activeCaseId ? 'bg-cyan-950/60 border border-cyan-500/40 text-cyan-200' : 'hover:bg-slate-800/80 text-slate-300'
                    }`}
                  >
                    <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${c.id === activeCaseId ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono text-[11px] font-bold text-cyan-400">{c.id}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{c.caseNumber}</span>
                      </div>
                      <p className="text-xs font-medium text-slate-200 truncate">{c.title}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
                        <span>{c.deviceModel?.split(' ')[0] || 'DVR/NVR'}</span>
                        <span>•</span>
                        <span>{c.evidenceCount || 0} feeds</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Write-Blocker Status + Live Clocks + Profile */}
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Write-Blocker Status Badge */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono">
          <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="font-semibold tracking-wide">HW WRITE-BLOCK: ACTIVE</span>
          <span className="text-[10px] text-emerald-500 bg-emerald-500/20 px-1 rounded">READ-ONLY</span>
        </div>

        {/* Live Forensic Clock */}
        <div className="hidden lg:flex flex-col items-end text-right font-mono text-[11px]">
          <div className="text-slate-200 font-semibold flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>{currentTime.toISOString().replace('T', ' ').substring(0, 19)} UTC</span>
          </div>
          <span className="text-[10px] text-slate-500">
            IST: {currentTime.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}
          </span>
        </div>

        {/* Investigator Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700/80 transition-all text-left"
          >
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center font-bold text-xs text-white shadow">
              {currentUser.avatar}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-slate-100 flex items-center gap-1">
                <span>{currentUser.name}</span>
              </div>
              <div className="text-[10px] font-mono text-cyan-400 leading-none">
                {currentUser.badgeId}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileDropdownOpen && (
            <div 
              className="absolute right-0 top-full mt-1.5 w-72 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-3 z-50 animate-in fade-in"
              onMouseLeave={() => setProfileDropdownOpen(false)}
            >
              <div className="pb-2.5 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-bold text-white">
                    {currentUser.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-100 truncate">{currentUser.name}</p>
                    <p className="text-[10px] font-mono text-cyan-400">{currentUser.badgeId}</p>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5 leading-tight">{currentUser.agency}</p>
                <div className="mt-2 inline-block px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-[9px] font-mono text-amber-400">
                  {currentUser.clearance}
                </div>
              </div>

              {/* Demo profile switcher */}
              <div className="py-2">
                <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1.5">
                  Switch Demo Investigator:
                </p>
                <div className="space-y-1">
                  {demoProfiles.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        switchProfile(p.id);
                        setProfileDropdownOpen(false);
                      }}
                      className={`w-full text-left p-1.5 rounded text-xs transition-colors flex items-center justify-between ${
                        p.id === currentUser.id ? 'bg-cyan-950 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="truncate">{p.name}</span>
                      <span className="font-mono text-[10px] text-slate-500 shrink-0">{p.badgeId.split('-')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                <button
                  onClick={() => {
                    setCurrentTab('settings');
                    setProfileDropdownOpen(false);
                  }}
                  className="text-xs text-slate-400 hover:text-slate-200"
                >
                  Forensic Settings
                </button>
                <button
                  onClick={() => {
                    logout();
                    setProfileDropdownOpen(false);
                  }}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
