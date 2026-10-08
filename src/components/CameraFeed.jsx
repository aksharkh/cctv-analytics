import React, { useState, useEffect, useRef } from 'react';
import { 
  Maximize2, 
  Eye, 
  EyeOff, 
  Crosshair, 
  ZoomIn, 
  ZoomOut,
  AlertCircle
} from 'lucide-react';

export const CameraFeed = ({ 
  camera, 
  onSelectCamera, 
  onOpenTripwire,
  isExpanded = false,
  showBoxesGlobal = true
}) => {
  const [showBoxes, setShowBoxes] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentTime, setCurrentTime] = useState(new Date());
  const canvasRef = useRef(null);

  useEffect(() => {
    setShowBoxes(showBoxesGlobal);
  }, [showBoxesGlobal]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Realistic CCTV Surveillance Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let frame = 0;

    // Simulated moving objects positions
    const objects = [
      { x: 30, y: 110, vx: 0.4, vy: 0, label: 'Person', conf: 94, type: 'person' },
      { x: 220, y: 130, vx: -0.3, vy: 0, label: 'Person', conf: 91, type: 'person' }
    ];

    if (camera.sceneType === 'parking') {
      objects.push({ x: 80, y: 150, vx: 0.6, vy: 0, label: 'Car', conf: 97, type: 'car' });
    } else if (camera.sceneType === 'vault') {
      objects.length = 0;
      objects.push({ x: 160, y: 120, vx: 0.2, vy: 0, label: 'Unauthorized', conf: 98, type: 'intruder' });
    }

    const render = () => {
      frame++;
      ctx.fillStyle = '#111317';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Architectural Background (Clean CCTV view)
      ctx.fillStyle = '#1c1f26';
      ctx.fillRect(0, 100, canvas.width, canvas.height - 100);

      // Wall / Floor dividing perspective line
      ctx.strokeStyle = '#2d3340';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 100);
      ctx.lineTo(canvas.width, 100);
      ctx.stroke();

      // Floor tiles perspective lines
      for (let x = -100; x < canvas.width + 100; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x + 30, 100);
        ctx.lineTo(x * 1.4, canvas.height);
        ctx.stroke();
      }

      // Specific background details based on scene
      if (camera.sceneType === 'vault') {
        // Server racks
        ctx.fillStyle = '#0f1115';
        ctx.fillRect(40, 30, 60, 120);
        ctx.fillRect(260, 30, 60, 120);
        ctx.fillStyle = '#333';
        ctx.fillRect(45, 40, 50, 100);
        ctx.fillRect(265, 40, 50, 100);
        // Blinking server LEDs
        for (let row = 0; row < 6; row++) {
          ctx.fillStyle = (frame + row * 10) % 30 > 15 ? '#22c55e' : '#15803d';
          ctx.fillRect(50, 50 + row * 14, 4, 4);
          ctx.fillRect(270, 50 + row * 14, 4, 4);
        }
      } else if (camera.sceneType === 'traffic' || camera.sceneType === 'parking') {
        // Parking slots / Road markings
        ctx.strokeStyle = '#3f4756';
        ctx.setLineDash([8, 8]);
        ctx.beginPath();
        ctx.moveTo(0, 150);
        ctx.lineTo(canvas.width, 150);
        ctx.stroke();
        ctx.setLineDash([]);
      } else {
        // Doorway
        ctx.fillStyle = '#0f1218';
        ctx.fillRect(150, 30, 60, 80);
        ctx.strokeStyle = '#3a4252';
        ctx.strokeRect(150, 30, 60, 80);
      }

      // 2. Animate and Draw Objects
      objects.forEach(obj => {
        obj.x += obj.vx;
        if (obj.x > canvas.width - 50) obj.vx = -Math.abs(obj.vx);
        if (obj.x < 30) obj.vx = Math.abs(obj.vx);

        if (obj.type === 'person' || obj.type === 'intruder') {
          // Draw simple walking silhouette
          ctx.fillStyle = obj.type === 'intruder' ? '#552222' : '#2d3748';
          // Head
          ctx.beginPath();
          ctx.arc(obj.x + 12, obj.y - 30, 7, 0, Math.PI * 2);
          ctx.fill();
          // Body
          ctx.fillRect(obj.x + 6, obj.y - 23, 12, 28);
          // Legs
          ctx.fillRect(obj.x + 6, obj.y + 5, 4, 20);
          ctx.fillRect(obj.x + 14, obj.y + 5, 4, 20);
        } else if (obj.type === 'car') {
          // Draw car silhouette
          ctx.fillStyle = '#334155';
          ctx.fillRect(obj.x, obj.y - 15, 60, 24);
          ctx.fillRect(obj.x + 10, obj.y - 30, 40, 16);
          // Wheels
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.arc(obj.x + 15, obj.y + 10, 6, 0, Math.PI * 2);
          ctx.arc(obj.x + 45, obj.y + 10, 6, 0, Math.PI * 2);
          ctx.fill();
        }

        // 3. Draw OpenCV style Bounding Box
        if (showBoxes) {
          const isRed = obj.type === 'intruder' || camera.activeThreats > 0;
          const boxColor = isRed ? '#ef4444' : '#22c55e'; // Clean Green or Red

          const bw = obj.type === 'car' ? 66 : 28;
          const bh = obj.type === 'car' ? 52 : 70;
          const bx = obj.x - 2;
          const by = obj.y - 40;

          // Simple clean OpenCV bounding rectangle
          ctx.strokeStyle = boxColor;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(bx, by, bw, bh);

          // Standard label tag
          const labelText = `${obj.label} ${obj.conf}%`;
          ctx.font = '10px Consolas, monospace';
          const textWidth = ctx.measureText(labelText).width;

          ctx.fillStyle = boxColor;
          ctx.fillRect(bx, by - 14, textWidth + 6, 14);

          ctx.fillStyle = '#ffffff';
          ctx.fillText(labelText, bx + 3, by - 3);
        }
      });

      // Subtle CCTV Grain
      ctx.fillStyle = 'rgba(255,255,255,0.015)';
      for (let i = 0; i < 40; i++) {
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
      }

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [camera, showBoxes]);

  return (
    <div className={`bg-zinc-950 border rounded-lg overflow-hidden flex flex-col transition-all ${
      camera.activeThreats > 0 ? 'border-red-600 ring-1 ring-red-600/40' : 'border-zinc-800 hover:border-zinc-700'
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

          {/* Alert Warning if active */}
          {camera.activeThreats > 0 && (
            <div className="absolute top-2 right-2 pointer-events-none font-mono text-[10px] text-white bg-red-600 px-2 py-0.5 rounded font-bold flex items-center gap-1 animate-pulse">
              <AlertCircle className="w-3 h-3" />
              <span>ALERT DETECTED</span>
            </div>
          )}
        </div>

        {/* Simple Student Control Bar on Bottom Right */}
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
