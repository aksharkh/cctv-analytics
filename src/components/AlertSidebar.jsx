import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  ShieldAlert, 
  Info, 
  CheckCircle2, 
  ChevronRight, 
  Filter, 
  ExternalLink,
  Flame,
  UserX,
  Package,
  Car
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

  const getAlertIcon = (type, severity) => {
    if (type.includes('Intrusion')) return <ShieldAlert className="w-4 h-4 text-red-400" />;
    if (type.includes('Loitering')) return <UserX className="w-4 h-4 text-amber-400" />;
    if (type.includes('Abandoned') || type.includes('Object')) return <Package className="w-4 h-4 text-amber-400" />;
    if (type.includes('Vehicle') || type.includes('Speed')) return <Car className="w-4 h-4 text-cyan-400" />;
    if (severity === 'critical') return <AlertTriangle className="w-4 h-4 text-red-400" />;
    return <Info className="w-4 h-4 text-cyan-400" />;
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950/80 text-red-400 border border-red-800">CRITICAL</span>;
      case 'warning':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/80 text-amber-400 border border-amber-800">WARNING</span>;
      default:
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-400 border border-cyan-800">INFO</span>;
    }
  };

  return (
    <aside className="w-full lg:w-96 flex flex-col bg-[#0b1220] border border-slate-800/90 rounded-xl overflow-hidden shadow-xl h-full max-h-[820px]">
      
      {/* Header */}
      <div className="p-3.5 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Bell className="w-4 h-4 text-cyan-400" />
            {alerts.some(a => a.status === 'ACTIVE') && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            )}
          </div>
          <h2 className="text-sm font-bold text-white tracking-wide font-mono">
            LIVE INCIDENT FEED
          </h2>
        </div>

        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          {alerts.length} Events
        </span>
      </div>

      {/* Severity Filter Pills */}
      <div className="px-3 py-2 bg-slate-950/60 border-b border-slate-800/60 flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
        {[
          { id: 'all', label: 'All' },
          { id: 'critical', label: 'Critical' },
          { id: 'warning', label: 'Warning' },
          { id: 'info', label: 'Info' }
        ].map(btn => (
          <button
            key={btn.id}
            onClick={() => setFilterSeverity(btn.id)}
            className={`px-2.5 py-0.5 rounded transition-all ${
              filterSeverity === btn.id
                ? 'bg-slate-800 text-cyan-400 font-bold border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Alert Feed List */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5 divide-y divide-slate-800/40">
        {filteredAlerts.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs font-mono">
            No incidents found for this filter.
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <div 
              key={alert.id}
              className={`pt-2 rounded-lg p-2.5 transition-all border ${
                alert.status === 'ACTIVE' && alert.severity === 'critical'
                  ? 'bg-red-950/20 border-red-900/50 hover:bg-red-950/30'
                  : alert.status === 'ACTIVE'
                  ? 'bg-amber-950/15 border-amber-900/40 hover:bg-amber-950/25'
                  : 'bg-slate-900/30 border-slate-800/60 opacity-75'
              }`}
            >
              {/* Alert Card Header */}
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5">
                  {getAlertIcon(alert.type, alert.severity)}
                  <span className="font-semibold text-xs text-slate-200">
                    {alert.type}
                  </span>
                </div>
                {getSeverityBadge(alert.severity)}
              </div>

              {/* Alert Details */}
              <p className="text-xs text-slate-400 line-clamp-2 mb-2 leading-relaxed">
                {alert.description}
              </p>

              {/* Meta Telemetry & Target Camera */}
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-2 border-t border-slate-800/40 pt-1.5">
                <button
                  onClick={() => onFocusCamera(alert.camId)}
                  className="flex items-center gap-1 text-cyan-400 hover:underline"
                  title="Focus Camera Feed"
                >
                  <span>{alert.camId}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
                <span>Conf: <span className="text-slate-300">{alert.confidence}</span></span>
                <span>{alert.timestamp}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  alert.status === 'ACTIVE' ? 'text-red-400 bg-red-950/40' : 'text-emerald-400 bg-emerald-950/40'
                }`}>
                  {alert.status}
                </span>

                {alert.status === 'ACTIVE' && (
                  <button
                    onClick={() => onAcknowledgeAlert(alert.id)}
                    className="flex items-center gap-1 px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[10px] font-mono transition-colors"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Acknowledge</span>
                  </button>
                )}
              </div>

            </div>
          ))
        )}
      </div>

      {/* Mini Telemetry Footer */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 space-y-1">
        <div className="flex justify-between">
          <span>AI Engine Anomaly Accuracy:</span>
          <span className="text-emerald-400 font-bold">98.4%</span>
        </div>
        <div className="flex justify-between">
          <span>False-Positive Suppressor:</span>
          <span className="text-cyan-400">DeepSORT Active</span>
        </div>
      </div>

    </aside>
  );
};
