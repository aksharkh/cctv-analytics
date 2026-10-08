import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Filter, 
  Download, 
  Play, 
  Calendar, 
  Camera, 
  Tag, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

export const ForensicSearchModal = ({ isOpen, onClose, alerts, onExportReport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCam, setSelectedCam] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');

  if (!isOpen) return null;

  const filteredEvents = alerts.filter(event => {
    const matchesSearch = 
      event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.camName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.objectClass.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCam = selectedCam === 'ALL' || event.camId === selectedCam;
    const matchesType = selectedType === 'ALL' || event.severity === selectedType;

    return matchesSearch && matchesCam && matchesType;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0b1220] border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono">
                FORENSIC VIDEO & INCIDENT SEARCH ENGINE
              </h3>
              <p className="text-xs text-slate-400">
                Filter and inspect historical recorded surveillance events and metadata
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters Toolbar */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-wrap gap-3 items-center justify-between">
          
          {/* Keyword Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search keyword (e.g., license plate, bag, intrusion, person)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          {/* Camera Dropdown */}
          <select
            value={selectedCam}
            onChange={(e) => setSelectedCam(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="ALL">All Cameras</option>
            <option value="CAM-01">CAM-01: Main Gate</option>
            <option value="CAM-02">CAM-02: Server Vault</option>
            <option value="CAM-03">CAM-03: Perimeter Fence</option>
            <option value="CAM-04">CAM-04: Corporate Lobby</option>
            <option value="CAM-05">CAM-05: Parking Lot B</option>
            <option value="CAM-06">CAM-06: Corridor Stairs</option>
          </select>

          {/* Severity Dropdown */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="ALL">All Severities</option>
            <option value="critical">Critical Only</option>
            <option value="warning">Warning Only</option>
            <option value="info">Info Only</option>
          </select>

          {/* Export Report */}
          <button
            onClick={onExportReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold font-mono transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Results Table */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16 text-slate-500 font-mono text-xs">
              No surveillance events found matching the criteria.
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredEvents.map((evt) => (
                <div 
                  key={evt.id} 
                  className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center border border-slate-800 text-cyan-400 shrink-0 mt-0.5">
                      <Camera className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-white">{evt.id}</span>
                        <span className="text-slate-600">•</span>
                        <span className="font-mono text-xs text-cyan-400">{evt.camId} - {evt.camName}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                          evt.severity === 'critical' ? 'bg-red-950/80 text-red-400 border-red-800' :
                          evt.severity === 'warning' ? 'bg-amber-950/80 text-amber-400 border-amber-800' :
                          'bg-cyan-950/80 text-cyan-400 border-cyan-800'
                        }`}>
                          {evt.severity.toUpperCase()}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 mt-1">{evt.description}</p>
                      
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-slate-500">
                        <span>Object: <strong className="text-slate-400">{evt.objectClass}</strong></span>
                        <span>Confidence: <strong className="text-emerald-400">{evt.confidence}</strong></span>
                        <span>Time: {evt.timeExact || evt.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-1 rounded">
                      VERIFIED LOG
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-400">
          <span>Found {filteredEvents.length} recorded events</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
