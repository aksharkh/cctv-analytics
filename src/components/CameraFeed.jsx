import React, { useState, useEffect, useRef } from 'react';
import { 
  Maximize2, 
  Eye, 
  EyeOff, 
  Flame, 
  ShieldAlert, 
  Activity, 
  Crosshair, 
  ZoomIn, 
  ZoomOut,
  AlertTriangle,
  Move
} from 'lucide-react';

export const CameraFeed = ({ 
  camera, 
  onSelectCamera, 
  onTriggerAlert, 
  onOpenTripwire,
  isExpanded = false,
  showHeatmapGlobal = false,
  showBoxesGlobal = true
}) => {
  const [showBoxes, setShowBoxes] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [videoError, setVideoError] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [dynamicDetections, setDynamicDetections] = useState(camera.detections || []);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  // Sync with global toggles
  useEffect(() => {
    setShowBoxes(showBoxesGlobal);
  }, [showBoxesGlobal]);

  useEffect(() => {
    setShowHeatmap(showHeatmapGlobal);
  }, [showHeatmapGlobal]);

  // Dynamic subtle jitter / simulated object movement for live realism
  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicDetections(prev => 
        prev.map(det => {
          const deltaX = (Math.random() - 0.5) * 1.2;
          const deltaY = (Math.random() - 0.5) * 1.0;
          return {
            ...det,
            box: [
              Math.max(5, Math.min(80, det.box[0] + deltaX)),
              Math.max(10, Math.min(75, det.box[1] + deltaY)),
              det.box[2],
              det.box[3]
            ],
            conf: Math.min(0.99, Math.max(0.85, +(det.conf + (Math.random() - 0.5) * 0.02).toFixed(2)))
          };
        })
      );
    }, 1200);

    return () => clearInterval(interval);
  }, [camera]);

  // Fallback Canvas Surveillance Simulation if video fails or for high-FPS synthetic feed
  useEffect(() => {
    if (!videoError) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let tick = 0;
    const render = () => {
      tick++;
      ctx.fillStyle = '#060a12';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw perspective grid (Surveillance room floor)
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j < canvas.height; j += 30) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
      }

      // Draw simulated architectural structures based on sceneType
      ctx.fillStyle = 'rgba(30, 41, 59, 0.5)';
      if (camera.sceneType === 'vault') {
        ctx.fillRect(40, 50, 80, 180);
        ctx.fillRect(360, 50, 80, 180);
      } else if (camera.sceneType === 'traffic' || camera.sceneType === 'parking') {
        ctx.fillStyle = '#111827';
        ctx.fillRect(0, 140, canvas.width, 100);
        ctx.strokeStyle = '#374151';
        ctx.setLineDash([10, 10]);
        ctx.beginPath();
        ctx.moveTo(0, 190);
        ctx.lineTo(canvas.width, 190);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw subtle CCTV noise grain
      for (let n = 0; n < 80; n++) {
        const nx = Math.random() * canvas.width;
        const ny = Math.random() * canvas.height;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(nx, ny, 2, 2);
      }

      // Scanning radar line
      const scanY = (tick * 1.5) % canvas.height;
      ctx.fillStyle = 'rgba(6, 182, 212, 0.08)';
      ctx.fillRect(0, scanY, canvas.width, 3);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [videoError, camera.sceneType]);

  const handleZoom = (direction) => {
    setZoomLevel(prev => {
      if (direction === 'in') return Math.min(prev + 0.25, 2.0);
      if (direction === 'out') return Math.max(prev - 0.25, 1.0);
      return 1.0;
    });
  };

  const handlePan = (direction) => {
    setPanOffset(prev => {
      const step = 15;
      if (direction === 'left') return { ...prev, x: prev.x - step };
      if (direction === 'right') return { ...prev, x: prev.x + step };
      if (direction === 'up') return { ...prev, y: prev.y - step };
      if (direction === 'down') return { ...prev, y: prev.y + step };
      return { x: 0, y: 0 };
    });
  };

  return (
    <div className={`relative group bg-[#070b14] border border-slate-800/90 rounded-xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col ${
      camera.activeThreats > 0 ? 'border-red-500/60 ring-1 ring-red-500/30 glow-red' : 'hover:border-slate-700'
    } ${isExpanded ? 'h-[75vh]' : 'h-[310px]'}`}>

      {/* Feed Container */}
      <div className="relative flex-1 bg-black overflow-hidden select-none">
        
        {/* Stream Visual (Video with Fallback Canvas) */}
        <div 
          className="w-full h-full relative overflow-hidden transition-transform duration-200"
          style={{ 
            transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
            transformOrigin: 'center center' 
          }}
        >
          {!videoError ? (
            <video
              ref={videoRef}
              src={camera.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover filter contrast-[1.1] brightness-90 saturate-[0.85]"
            />
          ) : (
            <canvas 
              ref={canvasRef} 
              width={480} 
              height={270} 
              className="w-full h-full object-cover" 
            />
          )}

          {/* Surveillance Scanlines & Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#00000000_60%,#000000ee_100%)] opacity-70"></div>
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40"></div>

          {/* Crowd Density Heatmap Simulation Layer */}
          {showHeatmap && (
            <div className="absolute inset-0 pointer-events-none opacity-60 mix-blend-screen transition-opacity duration-300">
              <div className="absolute top-[25%] left-[20%] w-[35%] h-[45%] rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 blur-2xl opacity-75 animate-pulse"></div>
              <div className="absolute top-[40%] right-[15%] w-[30%] h-[35%] rounded-full bg-gradient-to-r from-blue-500 via-emerald-500 to-amber-500 blur-xl opacity-60"></div>
            </div>
          )}

          {/* YOLO AI Bounding Box Overlays */}
          {showBoxes && dynamicDetections.map((det) => {
            const [x, y, w, h] = det.box;
            const isAlert = det.color === '#ef4444' || det.label.includes('INTRUDER');
            return (
              <div
                key={det.id}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${w}%`,
                  height: `${h}%`,
                  borderColor: det.color
                }}
                className={`absolute border-2 transition-all duration-500 pointer-events-none ${
                  isAlert ? 'border-red-500 bg-red-500/15 animate-pulse-fast' : 'bg-cyan-500/5'
                }`}
              >
                {/* Corner reticle marks */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2" style={{ borderColor: det.color }}></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2" style={{ borderColor: det.color }}></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2" style={{ borderColor: det.color }}></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2" style={{ borderColor: det.color }}></div>

                {/* AI Label Pill */}
                <div 
                  className="absolute -top-6 left-0 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded flex items-center gap-1.5 whitespace-nowrap shadow-md"
                  style={{ backgroundColor: det.color, color: det.color === '#f59e0b' ? '#000' : '#fff' }}
                >
                  <span>{det.label}</span>
                  <span className="opacity-80 font-normal">{(det.conf * 100).toFixed(0)}%</span>
                  {det.trackId && <span className="opacity-70 text-[9px] bg-black/30 px-1 rounded">#{det.trackId}</span>}
                </div>
              </div>
            );
          })}

          {/* Virtual Tripwire Geofence Marker */}
          {camera.activeThreats > 0 && (
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full">
                <line 
                  x1="15%" y1="70%" x2="85%" y2="70%" 
                  stroke="#ef4444" 
                  strokeWidth="2" 
                  strokeDasharray="6,4" 
                  className="animate-pulse"
                />
                <text x="18%" y="67%" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  [VIRTUAL TRIPWIRE BREACHED]
                </text>
              </svg>
            </div>
          )}
        </div>

        {/* Top HUD: Camera ID, Name, Location & Recording indicator */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10 text-white font-mono text-[11px]">
          <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded border border-slate-700/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="font-bold text-cyan-400">{camera.id}</span>
            <span className="text-slate-400">|</span>
            <span className="truncate max-w-[140px] text-slate-200">{camera.name}</span>
          </div>

          <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded border border-slate-700/60">
            <span className="text-red-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              REC
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">{camera.fps} FPS</span>
          </div>
        </div>

        {/* Bottom Left HUD: Resolution, Model, Person & Vehicle Counters */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 pointer-events-none z-10 font-mono text-[10px]">
          <span className="bg-black/75 px-1.5 py-0.5 rounded text-slate-300 border border-slate-800">
            {camera.resolution}
          </span>
          <span className="bg-black/75 px-1.5 py-0.5 rounded text-emerald-400 border border-slate-800">
            P: {camera.peopleCount}
          </span>
          {camera.vehicleCount > 0 && (
            <span className="bg-black/75 px-1.5 py-0.5 rounded text-cyan-400 border border-slate-800">
              V: {camera.vehicleCount}
            </span>
          )}
          {camera.activeThreats > 0 && (
            <span className="bg-red-950/90 text-red-400 px-1.5 py-0.5 rounded font-bold border border-red-700 animate-pulse flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              ALERT
            </span>
          )}
        </div>

        {/* Hover / On-Screen Controls */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 z-20 opacity-90 group-hover:opacity-100 transition-opacity">
          
          {/* Toggle Bounding Boxes */}
          <button
            onClick={() => setShowBoxes(!showBoxes)}
            className={`p-1.5 rounded bg-black/80 hover:bg-slate-800 text-slate-300 border border-slate-700/80 transition-colors ${
              showBoxes ? 'text-cyan-400' : 'text-slate-500'
            }`}
            title="Toggle YOLO Bounding Boxes"
          >
            {showBoxes ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>

          {/* Toggle Heatmap */}
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`p-1.5 rounded bg-black/80 hover:bg-slate-800 border border-slate-700/80 transition-colors ${
              showHeatmap ? 'text-amber-400 bg-amber-950/40' : 'text-slate-400'
            }`}
            title="Toggle Crowd Density Heatmap"
          >
            <Flame className="w-3.5 h-3.5" />
          </button>

          {/* Draw Virtual Tripwire Button */}
          <button
            onClick={() => onOpenTripwire(camera)}
            className="p-1.5 rounded bg-black/80 hover:bg-slate-800 text-emerald-400 border border-slate-700/80 transition-colors"
            title="Draw Virtual Tripwire / Geofence"
          >
            <Crosshair className="w-3.5 h-3.5" />
          </button>

          {/* PTZ Zoom in/out */}
          <button
            onClick={() => handleZoom('in')}
            className="p-1.5 rounded bg-black/80 hover:bg-slate-800 text-slate-300 border border-slate-700/80"
            title="Simulated PTZ Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          
          {zoomLevel > 1 && (
            <button
              onClick={() => { setZoomLevel(1); setPanOffset({ x: 0, y: 0 }); }}
              className="p-1.5 rounded bg-black/80 hover:bg-slate-800 text-slate-300 border border-slate-700/80"
              title="Reset Zoom"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Expand Fullscreen / Single Camera Mode */}
          <button
            onClick={() => onSelectCamera(camera)}
            className="p-1.5 rounded bg-black/80 hover:bg-slate-800 text-slate-300 border border-slate-700/80"
            title="Expand Camera Focus"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Footer Info Strip */}
      <div className="bg-[#0b101d] px-3 py-1.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="truncate max-w-[180px]">{camera.location}</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-1.5 py-0.2 rounded border border-cyan-800/50">
            {camera.model.split(' ')[0]}
          </span>
          <span className="text-emerald-400">● {camera.status}</span>
        </div>
      </div>

    </div>
  );
};
