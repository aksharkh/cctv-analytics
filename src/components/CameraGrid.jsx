import React, { useState } from 'react';
import { CameraFeed } from './CameraFeed';
import { 
  Eye, 
  BellRing,
  Clock,
  Activity
} from 'lucide-react';

export const CameraGrid = ({ 
  cameras, 
  onSelectCamera, 
  onOpenTripwire, 
  onSimulateNewIncident,
  currentScenario,
  secondsLeft
}) => {
  const [filter, setFilter] = useState('all');
  const [showBoxesGlobal, setShowBoxesGlobal] = useState(true);

  const filteredCameras = cameras.filter(cam => {
    if (filter === 'all') return true;
    if (filter === 'threats') {
      const activeInScenario = currentScenario?.cameraStates?.[cam.id]?.threatCount > 0;
      return cam.activeThreats > 0 || activeInScenario;
    }
    if (filter === 'entrance') return cam.sceneType === 'traffic' || cam.sceneType === 'lobby';
    return true;
  });

  return (
    <div className="flex-1 flex flex-col gap-3 min-w-0">
      
      {/* Control Bar & Real-Time 10s Motion Indicator */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2 flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Left: Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-zinc-400 font-mono mr-1">Cameras:</span>

          {[
            { id: 'all', label: `All (${cameras.length})` },
            { id: 'threats', label: 'With Alerts' },
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

        {/* Center: Live 10-Second Scenario Motion Tracker */}
        {currentScenario && (
          <div className="flex items-center gap-2 bg-black px-2.5 py-1 rounded border border-zinc-800 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-zinc-300 truncate max-w-[200px] sm:max-w-xs">
              Live Stage: <strong className="text-white">{currentScenario.title}</strong>
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-500" />
              <span>Next in <strong className="text-zinc-200">{secondsLeft}s</strong></span>
            </span>
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          
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

          <button
            onClick={onSimulateNewIncident}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 text-xs font-medium transition-colors"
            title="Adds a test alert for demonstration"
          >
            <BellRing className="w-3.5 h-3.5 text-red-400" />
            <span>Trigger Alert</span>
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
            scenarioData={currentScenario?.cameraStates?.[camera.id]}
          />
        ))}
      </div>

    </div>
  );
};
