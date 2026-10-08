import React, { useState, useEffect, useRef } from 'react';
import { 
  Maximize2, 
  Eye, 
  EyeOff, 
  Crosshair, 
  ZoomIn, 
  ZoomOut,
  AlertCircle,
  Activity
} from 'lucide-react';

export const CameraFeed = ({ 
  camera, 
  onSelectCamera, 
  onOpenTripwire,
  isExpanded = false,
  showBoxesGlobal = true,
  scenarioData = null
}) => {
  const [showBoxes, setShowBoxes] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentTime, setCurrentTime] = useState(new Date());
  const canvasRef = useRef(null);
  const objectsRef = useRef([]);

  useEffect(() => {
    setShowBoxes(showBoxesGlobal);
  }, [showBoxesGlobal]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync objects with scenario data when stage updates (every 10 seconds)
  useEffect(() => {
    if (scenarioData?.objects) {
      // Clone objects with internal position trackers
      objectsRef.current = scenarioData.objects.map(obj => ({
        ...obj,
        currentX: obj.x,
        currentY: obj.y
      }));
    } else {
      objectsRef.current = [];
    }
  }, [scenarioData]);

  // Canvas Surveillance Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.fillStyle = '#101216';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Architectural Floor & Wall
      ctx.fillStyle = '#1b1e24';
      ctx.fillRect(0, 95, canvas.width, canvas.height - 95);

      ctx.strokeStyle = '#282d37';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 95);
      ctx.lineTo(canvas.width, 95);
      ctx.stroke();

      // Floor grid perspective
      for (let x = -80; x < canvas.width + 80; x += 55) {
        ctx.beginPath();
        ctx.moveTo(x + 25, 95);
        ctx.lineTo(x * 1.35, canvas.height);
        ctx.stroke();
      }

      // Specific background details based on scene
      if (camera.sceneType === 'vault') {
        // Server racks
        ctx.fillStyle = '#0d0f12';
        ctx.fillRect(35, 25, 65, 125);
        ctx.fillRect(260, 25, 65, 125);
        ctx.fillStyle = '#262930';
        ctx.fillRect(40, 35, 55, 105);
        ctx.fillRect(265, 35, 55, 105);
        // Server blinkers
        for (let row = 0; row < 6; row++) {
          ctx.fillStyle = (frame + row * 10) % 30 > 15 ? '#22c55e' : '#15803d';
          ctx.fillRect(45, 42 + row * 15, 3, 3);
          ctx.fillRect(270, 42 + row * 15, 3, 3);
        }
      } else if (camera.sceneType === 'traffic' || camera.sceneType === 'parking') {
        // Road / Parking boundary lines
        ctx.strokeStyle = '#383f4d';
        ctx.setLineDash([8, 8]);
        ctx.beginPath();
        ctx.moveTo(0, 145);
        ctx.lineTo(canvas.width, 145);
        ctx.stroke();
        ctx.setLineDash([]);
      } else {
        // Doorway
        ctx.fillStyle = '#0c0e12';
        ctx.fillRect(145, 25, 60, 85);
        ctx.strokeStyle = '#333a46';
        ctx.strokeRect(145, 25, 60, 85);
      }

      // 2. Animate and Render Active Scenario Objects
      const activeObjects = objectsRef.current;
      activeObjects.forEach(obj => {
        // Move object along its velocity vector
        obj.currentX += obj.vx;
        if (obj.currentX > canvas.width - 45) obj.vx = -Math.abs(obj.vx);
        if (obj.currentX < 25) obj.vx = Math.abs(obj.vx);

        const x = obj.currentX;
        const y = obj.currentY;

        if (obj.type === 'person' || obj.type === 'intruder') {
          // Silhouette
          ctx.fillStyle = obj.type === 'intruder' ? '#5a1e1e' : '#2b3342';
          // Head
          ctx.beginPath();
          ctx.arc(x + 10, y - 28, 6.5, 0, Math.PI * 2);
          ctx.fill();
          // Body
          ctx.fillRect(x + 5, y - 21, 10, 26);
          // Legs
          ctx.fillRect(x + 5, y + 5, 3.5, 18);
          ctx.fillRect(x + 11.5, y + 5, 3.5, 18);
        } else if (obj.type === 'car') {
          // Car shape
          ctx.fillStyle = '#2d3748';
          ctx.fillRect(x, y - 12, 55, 22);
          ctx.fillRect(x + 8, y - 25, 36, 14);
          // Wheels
          ctx.fillStyle = '#0a0d14';
          ctx.beginPath();
          ctx.arc(x + 13, y + 10, 5.5, 0, Math.PI * 2);
          ctx.arc(x + 42, y + 10, 5.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (obj.type === 'bag') {
          // Unattended Backpack
          ctx.fillStyle = '#92400e';
          ctx.fillRect(x, y - 8, 16, 14);
          ctx.fillStyle = '#b45309';
          ctx.fillRect(x + 2, y - 6, 12, 10);
        }

        // 3. Draw Clean OpenCV Bounding Box
        if (showBoxes) {
          const isRed = obj.type === 'intruder' || (scenarioData?.threatCount > 0 && obj.type !== 'car');
          const isAmber = obj.type === 'bag' || obj.label.includes('Loitering');
          const boxColor = isRed ? '#ef4444' : isAmber ? '#f59e0b' : '#22c55e';

          const bw = obj.type === 'car' ? 62 : obj.type === 'bag' ? 22 : 26;
          const bh = obj.type === 'car' ? 48 : obj.type === 'bag' ? 24 : 64;
          const bx = x - 3;
          const by = y - (obj.type === 'bag' ? 12 : 36);

          // Thin 1.5px clean OpenCV rectangle
          ctx.strokeStyle = boxColor;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(bx, by, bw, bh);

          // Standard text tag
          const labelText = `${obj.label} ${obj.conf}%`;
          ctx.font = '10px Consolas, monospace';
          const tw = ctx.measureText(labelText).width;

          ctx.fillStyle = boxColor;
          ctx.fillRect(bx, by - 13, tw + 5, 13);

          ctx.fillStyle = '#ffffff';
          ctx.fillText(labelText, bx + 2.5, by - 3);
        }
      });

      // Subtle CCTV Grain
      ctx.fillStyle = 'rgba(255,255,255,0.012)';
      for (let i = 0; i < 30; i++) {
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
      }

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [camera, showBoxes, scenarioData]);

  const hasThreat = scenarioData?.threatCount > 0 || camera.activeThreats > 0;

  return (
    <div className={`bg-zinc-950 border rounded-lg overflow-hidden flex flex-col transition-all ${
      hasThreat ? 'border-red-600 ring-1 ring-red-600/40' : 'border-zinc-800 hover:border-zinc-700'
    } ${isExpanded ? 'h-[75vh]' : 'h-[285px]'}`}>

      {/* Screen Header - Simple CCTV OSD */}
      <div className="bg-black px-3 py-1.5 border-b border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-300">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">{camera.id}</span>
          <span className="text-zinc-600">|</span>
          <span className="truncate max-w-[150px]">{camera.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-red-500 font-bold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            REC
          </span>
          <span className="text-zinc-500">|</span>
          <span className="text-zinc-400 text-[11px]">{camera.fps} FPS</span>
        </div>
      </div>

      {/* Video / Canvas Area */}
      <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
        
        <div 
          className="w-full h-full relative transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <canvas 
            ref={canvasRef} 
            width={400} 
            height={225} 
            className="w-full h-full object-cover" 
          />

          {/* Simple CCTV Date Timecode (Bottom Left) */}
          <div className="absolute bottom-2 left-2 pointer-events-none font-mono text-[10px] text-zinc-300 bg-black/80 px-2 py-0.5 rounded border border-zinc-800">
            {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </div>

          {/* Current Motion Badge (Top Left) */}
          {scenarioData?.description && (
            <div className="absolute top-2 left-2 pointer-events-none font-mono text-[9px] text-zinc-400 bg-black/75 px-1.5 py-0.5 rounded border border-zinc-800 flex items-center gap-1">
              <Activity className="w-2.5 h-2.5 text-zinc-400" />
              <span>{scenarioData.description}</span>
            </div>
          )}

          {/* Alert Warning if active */}
          {hasThreat && (
            <div className="absolute top-2 right-2 pointer-events-none font-mono text-[10px] text-white bg-red-600 px-2 py-0.5 rounded font-bold flex items-center gap-1 animate-pulse">
              <AlertCircle className="w-3 h-3" />
              <span>ALERT DETECTED</span>
            </div>
          )}
        </div>

        {/* Student Controls on Bottom Right */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 z-20">
          <button
            onClick={() => setShowBoxes(!showBoxes)}
            className={`p-1.5 rounded border text-xs transition-colors ${
              showBoxes 
                ? 'bg-zinc-800 border-zinc-600 text-white' 
                : 'bg-black/80 border-zinc-800 text-zinc-500'
            }`}
            title="Toggle Bounding Boxes"
          >
            {showBoxes ? <Eye className="w-3 h-3 text-green-400" /> : <EyeOff className="w-3 h-3" />}
          </button>

          <button
            onClick={() => onOpenTripwire(camera)}
            className="p-1.5 rounded bg-black/80 border border-zinc-800 hover:bg-zinc-800 text-zinc-300"
            title="Tripwire Config"
          >
            <Crosshair className="w-3 h-3" />
          </button>

          <button
            onClick={() => setZoomLevel(prev => prev === 1 ? 1.4 : 1)}
            className="p-1.5 rounded bg-black/80 border border-zinc-800 hover:bg-zinc-800 text-zinc-300"
            title="Zoom"
          >
            {zoomLevel > 1 ? <ZoomOut className="w-3 h-3" /> : <ZoomIn className="w-3 h-3" />}
          </button>

          <button
            onClick={() => onSelectCamera(camera)}
            className="p-1.5 rounded bg-black/80 border border-zinc-800 hover:bg-zinc-800 text-zinc-300"
            title="Maximize View"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Footer Info Strip */}
      <div className="bg-zinc-900 px-3 py-1 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400">
        <span className="truncate">{camera.location}</span>
        <div className="flex items-center gap-2">
          <span>{camera.resolution}</span>
          <span className="text-emerald-500">● Online</span>
        </div>
      </div>

    </div>
  );
};
