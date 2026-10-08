import React, { useState } from 'react';
import { 
  X, 
  Crosshair, 
  AlertTriangle, 
  RotateCcw,
  Play
} from 'lucide-react';

export const TripwireModal = ({ 
  isOpen, 
  onClose, 
  camera, 
  onAddAlert 
}) => {
  const [points, setPoints] = useState([
    { x: 25, y: 70 },
    { x: 75, y: 70 }
  ]);
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
    setTimeout(() => setTestBreached(false), 2200);

    onAddAlert({
      id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
      camId: camera.id,
      camName: camera.name,
      type: 'Boundary Line Crossed',
      severity: 'critical',
      confidence: '97.5%',
      timestamp: 'Just now',
      timeExact: new Date().toLocaleTimeString(),
      description: `Subject crossed virtual security boundary set on ${camera.name}.`,
      objectClass: 'Unauthorized Person',
      status: 'ACTIVE'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-950 border border-zinc-700 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-3.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-zinc-300" />
            <h3 className="text-sm font-semibold text-white">
              Tripwire Boundary Configurator: {camera.id}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Canvas Area */}
        <div className="p-4 bg-black flex flex-col items-center justify-center">
          <div 
            onClick={handleCanvasClick}
            className="relative w-full aspect-video bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 cursor-crosshair select-none flex items-center justify-center"
          >
            {/* Simple camera view simulation */}
            <div className="absolute inset-0 bg-[#16181f] flex items-center justify-center">
              <span className="text-zinc-600 font-mono text-xs select-none">
                [LIVE FEED PREVIEW: {camera.name}]
              </span>
            </div>

            {/* SVG Boundary Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {points.length >= 2 && (
                <polyline
                  points={points.map(p => `${p.x}%,${p.y}%`).join(' ')}
                  fill="none"
                  stroke={testBreached ? '#ef4444' : '#22c55e'}
                  strokeWidth="2.5"
                  strokeDasharray="6,4"
                />
              )}

              {points.map((p, idx) => (
                <circle
                  key={idx}
                  cx={`${p.x}%`}
                  cy={`${p.y}%`}
                  r="5"
                  fill={testBreached ? '#ef4444' : '#22c55e'}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              ))}
            </svg>

            {testBreached && (
              <div className="absolute inset-0 bg-red-600/25 flex items-center justify-center pointer-events-none">
                <div className="bg-black/90 border border-red-500 text-white font-mono text-xs px-4 py-2 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>BOUNDARY BREACH DETECTED</span>
                </div>
              </div>
            )}

            <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-zinc-400 border border-zinc-800">
              Click anywhere to place boundary line coordinates
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between text-xs">
          <button
            onClick={() => setPoints([{ x: 25, y: 70 }, { x: 75, y: 70 }])}
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Line</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTestBreach}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-red-700 hover:bg-red-600 text-white font-medium transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simulate Breach</span>
            </button>

            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
