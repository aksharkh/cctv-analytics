import React, { useState } from 'react';
import { CameraFeed } from './CameraFeed';
import { 
  Filter, 
  Eye, 
  Plus, 
  BellRing
} from 'lucide-react';

export const CameraGrid = ({ 
  cameras, 
  onSelectCamera, 
  onOpenTripwire,
  onSimulateNewIncident
}) => {
  const [filter, setFilter] = useState('all');
  const [showBoxesGlobal, setShowBoxesGlobal] = useState(true);

  const filteredCameras = cameras.filter(cam => {
    if (filter === 'all') return true;
    if (filter === 'threats') return cam.activeThreats > 0;
    if (filter === 'entrance') return cam.sceneType === 'traffic' || cam.sceneType === 'lobby';
    return true;
  });

  return (
    <div className="flex-1 flex flex-col gap-3 min-w-0">
      
      {/* Simple Control Bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2 flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Left: Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-zinc-400 font-mono mr-1">Camera Filter:</span>

          {[
            { id: 'all', label: `All Cameras (${cameras.length})` },
            { id: 'threats', label: `With Alerts (${cameras.filter(c => c.activeThreats > 0).length})` },
            { id: 'entrance', label: 'Entrance & Lobby' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                filter === tab.id
                  ? 'bg-zinc-100 text-black font-semibold'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right: Simple Student Actions */}
        <div className="flex items-center gap-2">
          
          {/* Toggle All Boxes */}
          <button
            onClick={() => setShowBoxesGlobal(!showBoxesGlobal)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs border transition-colors ${
              showBoxesGlobal 
                ? 'bg-zinc-800 border-zinc-600 text-white' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-500'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-green-400" />
            <span>Detection Boxes</span>
          </button>

          {/* Test Incident Simulation Button */}
          <button
            onClick={onSimulateNewIncident}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 text-xs font-medium transition-colors"
            title="Adds a test alert for demonstration"
          >
            <BellRing className="w-3.5 h-3.5 text-red-400" />
            <span>Trigger Test Alert</span>
          </button>

        </div>

      </div>

      {/* Camera Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredCameras.map((camera) => (
          <CameraFeed
            key={camera.id}
            camera={camera}
            onSelectCamera={onSelectCamera}
            onOpenTripwire={onOpenTripwire}
            showBoxesGlobal={showBoxesGlobal}
          />
        ))}
      </div>

    </div>
  );
};
