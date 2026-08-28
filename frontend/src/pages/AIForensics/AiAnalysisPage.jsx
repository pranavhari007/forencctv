import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Filter, 
  User, 
  Car, 
  Package, 
  Flame, 
  ShieldAlert, 
  Scan, 
  ArrowRight, 
  CheckCircle2, 
  Check, 
  Clock, 
  MapPin, 
  Eye,
  Layers
} from 'lucide-react';
import { useCases } from '../../context/CaseContext';
import { useNotification } from '../../context/NotificationContext';
import { HashBadge } from '../../components/common/HashBadge';
import { StatusBadge } from '../../components/common/StatusBadge';

export const AiAnalysisPage = ({ setCurrentTab }) => {
  const { activeCase, activeAiDetections, activeEvidence } = useCases();
  const { notifySuccess, notifyInfo } = useNotification();

  const [filterType, setFilterType] = useState('ALL'); // ALL, person, face, vehicle, object, motion
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDetection, setSelectedDetection] = useState(activeAiDetections[0] || null);

  const filteredDetections = activeAiDetections.filter((d) => {
    const matchesType = filterType === 'ALL' || d.type === filterType;
    const matchesSearch = 
      d.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.camera.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.attributes?.upperClothing && d.attributes.upperClothing.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (d.attributes?.licensePlate && d.attributes.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesType && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'person': return <User className="w-4 h-4 text-cyan-400" />;
      case 'face': return <Scan className="w-4 h-4 text-emerald-400" />;
      case 'vehicle': return <Car className="w-4 h-4 text-amber-400" />;
      case 'object': return <Package className="w-4 h-4 text-purple-400" />;
      case 'motion': return <Flame className="w-4 h-4 text-rose-400" />;
      default: return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">AI Forensic Computer Vision & Multi-Camera Search</h1>
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
              NEURAL INFERENCE SUITE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Face biometric recognition, vehicle license plate OCR, weapon/tool detection, and cross-camera subject appearance matching
          </p>
        </div>

        <button
          onClick={() => setCurrentTab('timeline')}
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/20 self-start sm:self-auto font-mono"
        >
          <span>Correlate in Unified Timeline</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* AI Search & Type Filters */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search attribute: 'Red jacket', 'White SUV', 'Masked', 'Plate DL 08'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:border-cyan-500 focus:outline-none font-mono"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'ALL', label: 'All Detections', count: activeAiDetections.length },
            { id: 'person', label: 'Person', count: activeAiDetections.filter(d => d.type === 'person').length },
            { id: 'face', label: 'Face Rec', count: activeAiDetections.filter(d => d.type === 'face').length },
            { id: 'vehicle', label: 'Vehicles', count: activeAiDetections.filter(d => d.type === 'vehicle').length },
            { id: 'object', label: 'Weapons & Tools', count: activeAiDetections.filter(d => d.type === 'object').length },
            { id: 'motion', label: 'Heatmap / Thermal', count: activeAiDetections.filter(d => d.type === 'motion').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                filterType === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1 py-0.2 rounded text-[10px] ${
                filterType === tab.id ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-900 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Detections Cards & Deep Attribute Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Detection Stream Cards */}
        <div className="lg:col-span-7 space-y-3">
          {filteredDetections.map((det) => {
            const isSelected = selectedDetection?.id === det.id;
            return (
              <div
                key={det.id}
                onClick={() => setSelectedDetection(det)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-slate-900 to-cyan-950/60 border-cyan-500 shadow-lg shadow-cyan-950/40'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0 mt-0.5">
                      {getTypeIcon(det.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-cyan-400">{det.id}</span>
                        <span className="text-slate-500">|</span>
                        <span className="font-mono text-xs text-slate-300 font-semibold">{det.camera}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1">{det.label}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{det.notes}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                      {det.confidence}% Conf.
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                      {det.timestamp.substring(11, 19)} UTC
                    </span>
                  </div>
                </div>

                {/* Attributes Chips */}
                <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono">
                  {det.attributes?.upperClothing && (
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      Upper: {det.attributes.upperClothing}
                    </span>
                  )}
                  {det.attributes?.licensePlate && (
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
                      PLATE: {det.attributes.licensePlate} ({det.attributes.plateConfidence}%)
                    </span>
                  )}
                  {det.attributes?.fslDatabaseMatch && (
                    <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30 font-bold">
                      {det.attributes.fslDatabaseMatch}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Subject Cross-Camera Correlation Inspector */}
        <div className="lg:col-span-5 space-y-4">
          {selectedDetection ? (
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-mono uppercase text-white font-bold tracking-wider">
                    Neural Profile & Biometrics
                  </h3>
                </div>
                <StatusBadge status={selectedDetection.threatLevel === 'CRITICAL' ? 'CRITICAL' : 'HIGH'} size="xs" />
              </div>

              {/* Bounding Box Visualizer Mock */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2 text-xs font-mono">
                  <span className="text-slate-400">Target Visual Crop</span>
                  <span className="text-cyan-400 font-bold">{selectedDetection.camera}</span>
                </div>
                <div className="h-32 rounded bg-slate-900/80 border border-cyan-500/40 relative flex items-center justify-center">
                  <div className="text-center p-3">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/40 mx-auto flex items-center justify-center text-cyan-300 mb-1">
                      {getTypeIcon(selectedDetection.type)}
                    </div>
                    <span className="text-xs font-bold text-slate-200 block">{selectedDetection.label}</span>
                    <span className="text-[10px] font-mono text-cyan-400">Confidence: {selectedDetection.confidence}%</span>
                  </div>
                </div>
              </div>

              {/* Attributes Table */}
              <div className="space-y-2 text-xs font-mono">
                {Object.entries(selectedDetection.attributes || {}).map(([key, val]) => {
                  if (Array.isArray(val)) val = val.join(', ');
                  return (
                    <div key={key} className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between gap-2">
                      <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="text-slate-200 font-medium text-right truncate max-w-[220px]">{String(val)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Cross-Camera Matches */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-2">
                  Cross-Camera Appearance Correlation:
                </span>
                <div className="space-y-1.5">
                  {selectedDetection.crossCameraMatches?.map((match, i) => (
                    <div key={i} className="text-xs font-mono text-cyan-300 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{match}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  notifySuccess('Subject Anchored in Investigation Dossier', `${selectedDetection.label} linked with timestamp anchors.`);
                }}
                className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <Check className="w-4 h-4" />
                <span>Anchor Subject in Forensic Dossier</span>
              </button>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 text-center text-slate-500 font-mono text-xs">
              Select an AI detection card on the left to inspect neural attributes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

