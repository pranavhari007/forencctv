import React, { useState, useEffect, useRef } from 'react';
import { 
  Film, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  ZoomIn, 
  ZoomOut, 
  Sliders, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  Clock, 
  Layers, 
  Tv,
  ArrowRight,
  Eye
} from 'lucide-react';
import { useCases } from '../../context/CaseContext';
import { drawCctvScene } from '../../utils/cctvCanvas';
import { HashBadge } from '../../components/common/HashBadge';
import { StatusBadge } from '../../components/common/StatusBadge';

export const EvidenceAnalysisPage = ({ setCurrentTab }) => {
  const { activeCase, activeEvidence, activeAiDetections } = useCases();

  const [selectedEvidenceId, setSelectedEvidenceId] = useState(() => {
    return activeEvidence[0]?.id || '';
  });

  const [isPlaying, setIsPlaying] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [filterMode, setFilterMode] = useState('normal');
  const [timeOffset, setTimeOffset] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [showAiBoxes, setShowAiBoxes] = useState(true);
  const canvasRef = useRef(null);

  const currentEvidence = activeEvidence.find(e => e.id === selectedEvidenceId) || activeEvidence[0];

  useEffect(() => {
    let animationFrame;
    const render = () => {
      if (canvasRef.current && currentEvidence) {
        const boxes = showAiBoxes 
          ? activeAiDetections
              .filter(a => a.camera.includes(currentEvidence.cameraNumber))
              .map(a => ({
                ...a.boundingBox,
                label: a.label.split('(')[0],
                confidence: a.confidence,
                color: a.type === 'person' ? '#38bdf8' : a.type === 'face' ? '#4ade80' : a.type === 'vehicle' ? '#f59e0b' : '#ef4444'
              }))
          : [];

        drawCctvScene(canvasRef.current, {
          sceneType: currentEvidence.videoPlaceholderType || 'bank_lobby',
          timeOffset: timeOffset,
          isPlaying: isPlaying,
          zoom: zoom,
          filterMode: filterMode,
          cameraTag: `${currentEvidence.cameraNumber} [${currentEvidence.cameraLocation?.split(' ')[0] || 'LOBBY'}]`,
          timestampText: `2026-08-21 02:22:${String(Math.floor((timeOffset / 100) % 60)).padStart(2, '0')}.890 UTC`,
          boundingBoxes: boxes
        });
      }

      if (isPlaying) {
        setTimeOffset(prev => prev + 15 * speed);
      }
      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, zoom, filterMode, currentEvidence, timeOffset, speed, showAiBoxes, activeAiDetections]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Forensic Evidence Analysis & Frame Player</h1>
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
              4K Frame Accurate
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Optical zoom enhancement, low-light thermal/edge reconstruction, PTS/DTS drift inspection, and neural detection overlay
          </p>
        </div>

        <button
          onClick={() => setCurrentTab('ai-analysis')}
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/20 self-start sm:self-auto font-mono"
        >
          <span>Run AI Face & CV Search</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {activeEvidence.map((ev) => {
          const isSel = ev.id === (currentEvidence?.id || '');
          return (
            <button
              key={ev.id}
              onClick={() => setSelectedEvidenceId(ev.id)}
              className={`p-3 rounded-xl border text-left transition-all flex items-start justify-between ${
                isSel
                  ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-950'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-cyan-400">{ev.cameraNumber}</span>
                  <span className={`w-2 h-2 rounded-full ${isSel ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`} />
                </div>
                <div className="text-xs font-bold text-slate-100 mt-1 truncate max-w-[150px]">
                  {ev.cameraLocation?.split('&')[0] || ev.cameraLocation}
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                  {ev.resolution?.split(' ')[0]} • {ev.codec?.split('/')[0]}
                </div>
              </div>
              <Tv className="w-4 h-4 text-slate-500 shrink-0 mt-1" />
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-3">
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
            <canvas
              ref={canvasRef}
              width={800}
              height={450}
              className="w-full h-auto aspect-video block bg-slate-950"
            />

            <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
              <span className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700 text-[10px] font-mono text-cyan-300 backdrop-blur-md">
                ZOOM: {zoom.toFixed(1)}x
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700 text-[10px] font-mono text-emerald-300 backdrop-blur-md uppercase">
                FILTER: {filterMode}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400">02:22:15</span>
              <input
                type="range"
                min="0"
                max="10000"
                value={timeOffset % 10000}
                onChange={(e) => setTimeOffset(Number(e.target.value))}
                className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-xs font-mono text-slate-400">03:30:00</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTimeOffset(prev => Math.max(0, prev - 300))}
                  title="Step Backward (1 Frame)"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors shadow-md shadow-cyan-500/20"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setTimeOffset(prev => prev + 300)}
                  title="Step Forward (1 Frame)"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1 ml-2 font-mono text-xs text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                  <button onClick={() => setSpeed(0.5)} className={speed === 0.5 ? 'text-cyan-400 font-bold' : ''}>0.5x</button>
                  <span>•</span>
                  <button onClick={() => setSpeed(1)} className={speed === 1 ? 'text-cyan-400 font-bold' : ''}>1x</button>
                  <span>•</span>
                  <button onClick={() => setSpeed(2)} className={speed === 2 ? 'text-cyan-400 font-bold' : ''}>2x</button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setZoom(prev => Math.max(1, prev - 0.5))}
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-mono text-cyan-300 px-1">{zoom.toFixed(1)}x</span>
                  <button
                    onClick={() => setZoom(prev => Math.min(8, prev + 0.5))}
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
                  {['normal', 'edge', 'night_vision', 'thermal'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setFilterMode(mode)}
                      className={`px-2 py-1 rounded capitalize ${
                        filterMode === mode ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {mode.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowAiBoxes(!showAiBoxes)}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-semibold flex items-center gap-1.5 ${
                    showAiBoxes
                      ? 'bg-indigo-950 text-indigo-300 border-indigo-500/50'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Boxes {showAiBoxes ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-mono uppercase text-slate-300 font-bold tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Forensic Stream Header</span>
              </h3>
              <StatusBadge status={currentEvidence?.verificationStatus || 'VERIFIED_MATCH'} size="xs" />
            </div>

            <div className="space-y-2.5 mt-3 text-xs font-mono">
              <div className="p-2 rounded bg-slate-950 border border-slate-800/80 flex justify-between">
                <span className="text-slate-500">Camera ID:</span>
                <span className="text-cyan-300 font-bold">{currentEvidence?.cameraNumber}</span>
              </div>

              <div className="p-2 rounded bg-slate-950 border border-slate-800/80 flex justify-between">
                <span className="text-slate-500">Video Codec:</span>
                <span className="text-slate-200">{currentEvidence?.codec}</span>
              </div>

              <div className="p-2 rounded bg-slate-950 border border-slate-800/80 flex justify-between">
                <span className="text-slate-500">Resolution:</span>
                <span className="text-slate-200">{currentEvidence?.resolution}</span>
              </div>

              <div className="p-2 rounded bg-slate-950 border border-slate-800/80 flex justify-between">
                <span className="text-slate-500">Bitrate:</span>
                <span className="text-slate-200">{currentEvidence?.bitrate}</span>
              </div>

              <div className="p-2 rounded bg-slate-950 border border-slate-800/80 flex justify-between">
                <span className="text-slate-500">Duration:</span>
                <span className="text-slate-200">{currentEvidence?.duration}</span>
              </div>

              <div className="p-2 rounded bg-slate-950 border border-slate-800/80 flex justify-between">
                <span className="text-slate-500">RTC Clock Drift:</span>
                <span className="text-amber-400 font-bold">{currentEvidence?.ptsDtsDrift}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">
                Cryptographic Seal (SHA-256)
              </div>
              <HashBadge hash={currentEvidence?.sha256} truncate={false} className="w-full justify-between" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
            <span className="font-mono text-[10px] uppercase text-slate-400 font-bold block mb-1">
              Examiner Observation Notes:
            </span>
            <p className="text-slate-300 leading-relaxed font-sans">
              {currentEvidence?.notes || 'Surveillance recording intact. Frame rate continuity verified without GOP corruption.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

