import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Check, 
  ExternalLink,
  Shield,
  Trash2
} from 'lucide-react';

export const AlertSidebar = ({ 
  alerts, 
  onAcknowledgeAlert, 
  onFocusCamera 
}) => {
  const [filterSeverity, setFilterSeverity] = useState('all');

  const filteredAlerts = alerts.filter(a => {
    if (filterSeverity === 'all') return true;
    return a.severity === filterSeverity;
  });

  return (
    <aside className="w-full lg:w-80 flex flex-col bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden h-full max-h-[800px]">
      
      {/* Header */}
      <div className="p-3 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-zinc-300" />
          <h2 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
            Incident Alerts
          </h2>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
          {alerts.length} Total
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="px-3 py-1.5 bg-black border-b border-zinc-800 flex items-center gap-1 text-xs">
        {[
          { id: 'all', label: 'All' },
          { id: 'critical', label: 'Critical' },
          { id: 'warning', label: 'Warning' },
          { id: 'info', label: 'Info' }
        ].map(btn => (
          <button
            key={btn.id}
            onClick={() => setFilterSeverity(btn.id)}
            className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
              filterSeverity === btn.id
                ? 'bg-zinc-800 text-white font-medium border border-zinc-700'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Alert Feed List */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
        {filteredAlerts.length === 0 ? (
          <div className="py-12 text-center text-zinc-600 text-xs font-mono">
            No alerts found.
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <div 
              key={alert.id}
              className={`p-2.5 rounded border transition-colors ${
                alert.status === 'ACTIVE' && alert.severity === 'critical'
                  ? 'bg-red-950/20 border-red-800/60'
                  : alert.status === 'ACTIVE'
                  ? 'bg-zinc-900/80 border-zinc-700'
                  : 'bg-zinc-900/30 border-zinc-800/60 opacity-60'
              }`}
            >
              {/* Alert Header */}
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-xs font-medium text-white flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    alert.severity === 'critical' ? 'bg-red-500' :
                    alert.severity === 'warning' ? 'bg-amber-400' : 'bg-blue-400'
                  }`}></span>
                  {alert.type}
                </span>

                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                  alert.severity === 'critical' ? 'bg-red-950 text-red-300 border-red-800' :
                  alert.severity === 'warning' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                  'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}>
                  {alert.severity.toUpperCase()}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-400 mb-2 leading-relaxed">
                {alert.description}
              </p>

              {/* Camera & Time */}
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 border-t border-zinc-800/70 pt-1.5">
                <button
                  onClick={() => onFocusCamera(alert.camId)}
                  className="text-zinc-300 hover:underline flex items-center gap-1"
                >
                  <span>{alert.camId}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
                <span>{alert.timeExact || alert.timestamp}</span>
              </div>

              {/* Acknowledge Button */}
              {alert.status === 'ACTIVE' && (
                <div className="mt-2 pt-1 border-t border-zinc-800/50 flex justify-end">
                  <button
                    onClick={() => onAcknowledgeAlert(alert.id)}
                    className="flex items-center gap-1 px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[11px] font-mono transition-colors"
                  >
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Acknowledge</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Simple Footer */}
      <div className="p-2.5 bg-zinc-900 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 text-center">
        Detection Rule: Boundary Crossing & Object Filter
      </div>

    </aside>
  );
};
