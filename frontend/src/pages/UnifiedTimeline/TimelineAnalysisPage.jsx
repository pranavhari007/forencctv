import React, { useState } from 'react';
import { 
  GitCommit, 
  Clock, 
  Calendar, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Tv, 
  Sliders, 
  Search, 
  Play, 
  Pause,
  MapPin,
  Flame,
  User,
  Car
} from 'lucide-react';
import { useCases } from '../../context/CaseContext';
import { useNotification } from '../../context/NotificationContext';
import { StatusBadge } from '../../components/common/StatusBadge';

export const TimelineAnalysisPage = ({ setCurrentTab }) => {
  const { activeCase, activeTimelineEvents, activeEvidence } = useCases();
  const { notifySuccess, notifyInfo } = useNotification();

  const [driftOffsetMinutes, setDriftOffsetMinutes] = useState(4);
  const [driftOffsetSeconds, setDriftOffsetSeconds] = useState(17);
  const [isDriftCalibrated, setIsDriftCalibrated] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(activeTimelineEvents[0] || null);
  const [selectedCameraTrack, setSelectedCameraTrack] = useState('ALL');

  const cameras = ['CAM-01', 'CAM-02', 'CAM-03', 'CAM-04'];

  const filteredEvents = activeTimelineEvents.filter(e => {
    if (selectedCameraTrack === 'ALL') return true;
    return e.camera === selectedCameraTrack || e.correlatedCameras?.includes(selectedCameraTrack);
  });

  const handleApplyCalibration = () => {
    setIsDriftCalibrated(true);
    notifySuccess(
      'Timestamp Drift Calibrated',
      `Applied -${driftOffsetMinutes}m ${driftOffsetSeconds}s offset to CAM-02 DVR internal clock. Unified timeline synchronized.`
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Unified Multi-Camera Timeline & Chronological Sync</h1>
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
              UTC NORMALIZED
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Cross-camera event correlation, suspect path reconstruction, and DVR hardware RTC clock drift compensation
          </p>
        </div>

        <button
          onClick={() => setCurrentTab('custody')}
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/20 self-start sm:self-auto font-mono"
        >
          <span>View Blockchain Chain of Custody</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Clock Drift Calibration Box */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>DVR Hardware RTC Clock Drift Compensator</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Target Channel: <span className="text-cyan-300 font-mono font-semibold">CAM-02 (Vault Corridor)</span> • Internal RTC was running ahead of Master UTC
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="text-slate-400">Drift Offset:</span>
              <span className="text-amber-400 font-bold">+{driftOffsetMinutes}m {driftOffsetSeconds}s</span>
            </div>
            <button
              onClick={handleApplyCalibration}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold transition-colors"
            >
              Re-Calculate Sync
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">CAM-01 (Lobby)</span>
            <span className="text-emerald-400 font-bold mt-1 block">02:22:15 UTC (Exact)</span>
            <span className="text-[10px] text-slate-400">NTP Synced Server</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-amber-500/40 bg-amber-950/10">
            <span className="text-slate-500 block text-[10px] uppercase">CAM-02 (Corridor)</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-cyan-300 font-bold">02:24:32 UTC</span>
              <span className="text-[10px] text-slate-500 line-through">(Raw: 02:28:49)</span>
            </div>
            <span className="text-[10px] text-emerald-400">Calibrated (-4m 17s)</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">CAM-03 (Vault Interior)</span>
            <span className="text-cyan-300 font-bold mt-1 block">02:44:18 UTC</span>
            <span className="text-[10px] text-indigo-400">Rebuilt from Carved Stream</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">CAM-04 (Alleyway Dock)</span>
            <span className="text-emerald-400 font-bold mt-1 block">03:04:22 UTC (Exact)</span>
            <span className="text-[10px] text-slate-400">NTP Synced Gateway</span>
          </div>
        </div>
      </div>

      {/* Camera Track Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Filter Track:</span>
          <div className="flex flex-wrap gap-1.5">
            {['ALL', 'CAM-01', 'CAM-02', 'CAM-03', 'CAM-04'].map((cam) => (
              <button
                key={cam}
                onClick={() => setSelectedCameraTrack(cam)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  selectedCameraTrack === cam
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cam}
              </button>
            ))}
          </div>
        </div>

        <span className="text-xs font-mono text-slate-400">
          Showing {filteredEvents.length} Synchronized Events
        </span>
      </div>

      {/* Main Chronological Timeline Stream & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Timeline Tracks */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative pl-6 sm:pl-8 border-l-2 border-cyan-500/30 space-y-6">
            {filteredEvents.map((evt, idx) => {
              const isSelected = selectedEvent?.id === evt.id;
              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt)}
                  className={`relative p-5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-br from-slate-900 to-cyan-950/60 border-cyan-500 shadow-xl shadow-cyan-950/40'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Timeline Dot Indicator */}
                  <div className={`absolute -left-[31px] sm:-left-[39px] top-6 w-4 h-4 rounded-full border-2 transition-transform ${
                    isSelected 
                      ? 'bg-cyan-400 border-white scale-125 shadow-lg shadow-cyan-400' 
                      : 'bg-slate-900 border-cyan-500'
                  }`} />

                  {/* Top Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
                        {evt.displayTime} UTC
                      </span>
                      <span className="font-mono text-xs font-semibold text-slate-300">
                        [{evt.camera}] {evt.cameraName}
                      </span>
                    </div>

                    <StatusBadge status={evt.severity === 'CRITICAL' ? 'CRITICAL' : 'HIGH'} size="xs" />
                  </div>

                  {/* Title & Summary */}
                  <h4 className="text-sm font-bold text-white mt-3">{evt.title}</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {evt.summary}
                  </p>

                  {/* Footer info: Raw time vs Calibrated */}
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                    <span>Hardware RTC: {evt.rawDeviceTime}</span>
                    <span className="text-cyan-400">Correlated: {evt.correlatedCameras?.join(' ? ')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Suspect Movement Path Diagram & Inspection */}
        <div className="lg:col-span-4 space-y-4">
          {/* Suspect Path Stepper Card */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
            <h3 className="text-xs font-mono uppercase text-white font-bold tracking-wider mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Suspect Movement Route Map</span>
            </h3>

            <div className="space-y-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
              {[
                { time: '02:18:10 AM', node: 'CAM-04 Rear Dock', desc: 'White SUV Arrival', status: 'done' },
                { time: '02:22:15 AM', node: 'CAM-01 Main Lobby', desc: 'RFID Keycard Breach', status: 'done' },
                { time: '02:24:32 AM', node: 'CAM-02 Corridor', desc: 'Thermal Lance Infiltration', status: 'done' },
                { time: '02:44:18 AM', node: 'CAM-03 Vault', desc: 'Drilling & Mask Drop', status: 'done' },
                { time: '02:59:40 AM', node: 'CAM-02 Corridor', desc: 'Loot Bag Egress', status: 'done' },
                { time: '03:04:22 AM', node: 'CAM-04 Rear Dock', desc: 'Getaway Departure', status: 'done' }
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs font-mono">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-200">{step.node}</span>
                      <span className="text-cyan-400 text-[10px]">{step.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Event Details */}
          {selectedEvent && (
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-cyan-400">{selectedEvent.id}</span>
                <span className="text-xs font-mono text-slate-400">{selectedEvent.camera}</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {selectedEvent.summary}
              </p>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
                <span className="text-slate-500 block text-[10px]">Linked Evidence File:</span>
                <span className="text-cyan-300 font-bold">{selectedEvent.evidenceRef}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

