import React, { useState } from 'react';
import { 
  X, 
  Crosshair, 
  AlertTriangle, 
  ShieldAlert, 
  Check, 
  Trash2, 
  Play,
  RotateCcw
} from 'lucide-react';

export const TripwireModal = ({ 
  isOpen, 
  onClose, 
  camera, 
  onAddAlert 
}) => {
  const [points, setPoints] = useState([
    { x: 20, y: 70 },
    { x: 80, y: 70 }
  ]);
  const [isArmed, setIsArmed] = useState(true);
  const [testBreached, setTestBreached] = useState(false);

  if (!isOpen || !camera) return null;

  const handleCanvasClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    if (points.length >= 4) {
      setPoints([{ x, y }]);
    } else {
      setPoints([...points, { x, y }]);
    }
  };

  const handleTestBreach = () => {
    setTestBreached(true);
    setTimeout(() => setTestBreached(false), 2500);

    // Dispatch real alert into system
    onAddAlert({
      id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
      camId: camera.id,
      camName: camera.name,
      type: 'Virtual Tripwire Breach',
      severity: 'critical',
      confidence: '98.9%',
      timestamp: 'Just now',
      timeExact: new Date().toLocaleTimeString(),
      description: `Target object crossed defined geometric boundary line at coordinates (${points[0]?.x}%, ${points[0]?.y}%).`,
      objectClass: 'Unauthorized Subject',
      status: 'ACTIVE'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0b1220] border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Crosshair className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono">
                INTERACTIVE VIRTUAL TRIPWIRE & GEOFENCE CONFIGURATOR
              </h3>
              <p className="text-xs text-slate-400">
                Click on the feed below to reposition points or set custom restricted security perimeters
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Video / Canvas Zone */}
        <div className="p-4 bg-black flex flex-col items-center justify-center">
          <div 
            onClick={handleCanvasClick}
            className="relative w-full aspect-video max-w-2xl bg-slate-950 rounded-xl overflow-hidden border border-slate-800 cursor-crosshair select-none"
          >
            {/* Background Stream */}
            <video
              src={camera.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover filter brightness-75 contrast-125 pointer-events-none"
            />

            {/* SVG Tripwire Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {points.length >= 2 && (
                <polyline
                  points={points.map(p => `${p.x}%,${p.y}%`).join(' ')}
                  fill="none"
                  stroke={testBreached ? '#ef4444' : isArmed ? '#10b981' : '#64748b'}
                  strokeWidth="3"
                  strokeDasharray={testBreached ? '4,4' : '8,4'}
                  className={testBreached ? 'animate-pulse' : ''}
                />
              )}

              {/* Points */}
              {points.map((p, idx) => (
                <circle
                  key={idx}
                  cx={`${p.x}%`}
                  cy={`${p.y}%`}
                  r="6"
                  fill={testBreached ? '#ef4444' : isArmed ? '#10b981' : '#94a3b8'}
                  stroke="#fff"
                  strokeWidth="2"
                />
              ))}
            </svg>

            {/* Test Breach Alert Banner */}
            {testBreached && (
              <div className="absolute inset-0 bg-red-600/30 backdrop-blur-[2px] flex items-center justify-center pointer-events-none animate-pulse">
                <div className="bg-red-950/95 border-2 border-red-500 text-white font-mono font-bold px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-400 animate-bounce" />
                  <div>
                    <div className="text-base">CRITICAL TRIPWIRE BREACH DETECTED!</div>
                    <div className="text-xs text-red-300">Automated Alarm Triggered • Snapshot Logged</div>
                  </div>
                </div>
              </div>
            )}

            {/* Guide overlay */}
            <div className="absolute top-2 left-2 bg-black/75 px-2 py-1 rounded text-[11px] font-mono text-slate-300 border border-slate-800 pointer-events-none">
              Click anywhere on video to place boundary coordinates ({points.length} points)
            </div>

            <div className="absolute bottom-2 right-2 bg-black/75 px-2 py-1 rounded text-[11px] font-mono text-emerald-400 border border-slate-800 pointer-events-none">
              STATUS: {isArmed ? 'ARMED & SENSING' : 'DISARMED'}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsArmed(!isArmed)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                isArmed 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isArmed ? 'Tripwire Armed' : 'Disarmed'}</span>
            </button>

            <button
              onClick={() => setPoints([{ x: 20, y: 70 }, { x: 80, y: 70 }])}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Line</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* College Demo Button */}
            <button
              onClick={handleTestBreach}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold font-mono shadow-lg shadow-red-950 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Test Simulated Intrusion</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono rounded-lg transition-colors"
            >
              Done
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
