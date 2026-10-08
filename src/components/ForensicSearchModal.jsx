import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Download, 
  Video
} from 'lucide-react';

export const ForensicSearchModal = ({ isOpen, onClose, alerts, onExportReport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCam, setSelectedCam] = useState('ALL');

  if (!isOpen) return null;

  const filteredEvents = alerts.filter(event => {
    const matchesSearch = 
      event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.camName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCam = selectedCam === 'ALL' || event.camId === selectedCam;
    return matchesSearch && matchesCam;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-950 border border-zinc-700 w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-3.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-zinc-300" />
            <h3 className="text-sm font-semibold text-white">
              Search Recorded Events
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 bg-black border-b border-zinc-800 flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-[180px]">
            <input
              type="text"
              placeholder="Search keyword (intrusion, car, bag)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <select
            value={selectedCam}
            onChange={(e) => setSelectedCam(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none"
          >
            <option value="ALL">All Cameras</option>
            <option value="CAM-01">CAM-01: Main Gate</option>
            <option value="CAM-02">CAM-02: Server Vault</option>
            <option value="CAM-03">CAM-03: Perimeter</option>
            <option value="CAM-04">CAM-04: Lobby</option>
            <option value="CAM-05">CAM-05: Parking</option>
            <option value="CAM-06">CAM-06: Corridor</option>
          </select>

          <button
            onClick={onExportReport}
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs border border-zinc-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV</span>
          </button>
        </div>

        {/* Event List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 font-mono text-xs">
              No matching events found.
            </div>
          ) : (
            filteredEvents.map((evt) => (
              <div 
                key={evt.id} 
                className="bg-zinc-900/60 border border-zinc-800 rounded p-2.5 flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-bold text-white">{evt.id}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-300">{evt.camId} ({evt.camName})</span>
                    <span className={`text-[10px] px-1.5 rounded border ${
                      evt.severity === 'critical' ? 'bg-red-950 text-red-300 border-red-800' :
                      evt.severity === 'warning' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                      'bg-zinc-800 text-zinc-400 border-zinc-700'
                    }`}>
                      {evt.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-zinc-400 mt-1">{evt.description}</p>
                  <p className="text-[11px] font-mono text-zinc-500 mt-1">
                    Object: {evt.objectClass} • Time: {evt.timeExact || evt.timestamp}
                  </p>
                </div>

                <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                  {evt.status}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-zinc-900 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-400">
          <span>{filteredEvents.length} events logged</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
