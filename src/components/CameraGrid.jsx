import React, { useState } from 'react';
import { CameraFeed } from './CameraFeed';
import { 
  Grid2X2, 
  Grid3X3, 
  Layers, 
  Flame, 
  Eye, 
  PlusCircle, 
  ShieldAlert, 
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';

export const CameraGrid = ({ 
  cameras, 
  onSelectCamera, 
  onTriggerAlert, 
  onOpenTripwire,
  onSimulateNewIncident
}) => {
  const [filter, setFilter] = useState('all');
  const [gridColumns, setGridColumns] = useState('3'); // '2' or '3'
  const [showHeatmapGlobal, setShowHeatmapGlobal] = useState(false);
  const [showBoxesGlobal, setShowBoxesGlobal] = useState(true);

  const filteredCameras = cameras.filter(cam => {
    if (filter === 'all') return true;
    if (filter === 'threats') return cam.activeThreats > 0;
    if (filter === 'entrance') return cam.sceneType === 'traffic' || cam.sceneType === 'lobby';
    if (filter === 'restricted') return cam.sceneType === 'vault' || cam.sceneType === 'perimeter';
    return true;
  });

  return (
    <div className="flex-1 flex flex-col gap-3 min-w-0">
      
      {/* Control & Toolbar */}
      <div className="bg-[#0b1220] border border-slate-800/90 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        
        {/* Left: Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Feeds:</span>
          </span>

          {[
            { id: 'all', label: `All Feeds (${cameras.length})` },
            { id: 'threats', label: `Active Alerts (${cameras.filter(c => c.activeThreats > 0).length})` },
            { id: 'restricted', label: 'Restricted Zones' },
            { id: 'entrance', label: 'Gates & Lobbies' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                filter === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right: Global Toggles & Simulation Trigger */}
        <div className="flex items-center gap-2">
          
          {/* Global Bounding Box Toggle */}
          <button
            onClick={() => setShowBoxesGlobal(!showBoxesGlobal)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border transition-all ${
              showBoxesGlobal 
                ? 'bg-cyan-950/40 text-cyan-400 border-cyan-800' 
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
            title="Toggle All YOLO Bounding Boxes"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bounding Boxes</span>
          </button>

          {/* Global Heatmap Toggle */}
          <button
            onClick={() => setShowHeatmapGlobal(!showHeatmapGlobal)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border transition-all ${
              showHeatmapGlobal 
                ? 'bg-amber-950/50 text-amber-300 border-amber-700 font-semibold' 
                : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
            title="Toggle Heatmap Overlays"
          >
            <Flame className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Heatmaps</span>
          </button>

          {/* Layout Switcher (2 cols vs 3 cols) */}
          <div className="hidden md:flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setGridColumns('2')}
              className={`p-1 rounded ${gridColumns === '2' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500'}`}
              title="2 Columns Grid"
            >
              <Grid2X2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridColumns('3')}
              className={`p-1 rounded ${gridColumns === '3' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500'}`}
              title="3 Columns Grid"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>

          {/* Simulate New Incident Button (Super handy for college demo!) */}
          <button
            onClick={onSimulateNewIncident}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-lg shadow-red-950/60 border border-red-400/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Triggers a live simulated security breach to test real-time AI alert system"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulate AI Alert</span>
          </button>

        </div>

      </div>

      {/* Camera Grid View */}
      <div className={`grid gap-3 ${
        gridColumns === '2' 
          ? 'grid-cols-1 md:grid-cols-2' 
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}>
        {filteredCameras.map((camera) => (
          <CameraFeed
            key={camera.id}
            camera={camera}
            onSelectCamera={onSelectCamera}
            onTriggerAlert={onTriggerAlert}
            onOpenTripwire={onOpenTripwire}
            showHeatmapGlobal={showHeatmapGlobal}
            showBoxesGlobal={showBoxesGlobal}
          />
        ))}
      </div>

    </div>
  );
};
