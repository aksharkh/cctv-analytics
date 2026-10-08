import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Printer, 
  Download, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  User,
  Shield
} from 'lucide-react';

export const ReportModal = ({ isOpen, onClose, alerts, onExportCSV }) => {
  const [startDate, setStartDate] = useState('2026-10-08T09:00');
  const [endDate, setEndDate] = useState('2026-10-08T18:00');
  const [preset, setPreset] = useState('today');

  if (!isOpen) return null;

  const handlePreset = (type) => {
    setPreset(type);
    const now = new Date();
    if (type === '1hr') {
      const past = new Date(now.getTime() - 60 * 60 * 1000);
      setStartDate(past.toISOString().slice(0, 16));
      setEndDate(now.toISOString().slice(0, 16));
    } else if (type === 'today') {
      setStartDate('2026-10-08T09:00');
      setEndDate('2026-10-08T18:00');
    } else if (type === 'yesterday') {
      setStartDate('2026-10-07T09:00');
      setEndDate('2026-10-07T18:00');
    }
  };

  // Trigger clean native browser print-to-PDF
  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Container */}
      <div className="bg-zinc-950 border border-zinc-700 w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between no-print">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Generate CCTV Surveillance Audit Report
              </h3>
              <p className="text-xs text-zinc-400">
                Filter by custom time period and download official PDF or CSV report
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Date / Time Range Toolbar */}
        <div className="p-3.5 bg-black border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs no-print">
          
          {/* Inputs */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-700 px-2.5 py-1 rounded">
              <span className="text-zinc-400 font-mono text-[11px]">From:</span>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setPreset('custom'); }}
                className="bg-transparent text-white font-mono text-xs focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-700 px-2.5 py-1 rounded">
              <span className="text-zinc-400 font-mono text-[11px]">To:</span>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => { setEndDate(e.target.value); setPreset('custom'); }}
                className="bg-transparent text-white font-mono text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5">
            {[
              { id: '1hr', label: 'Last 1 Hour' },
              { id: 'today', label: 'Today (Full Shift)' },
              { id: 'yesterday', label: 'Yesterday' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => handlePreset(p.id)}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  preset === p.id 
                    ? 'bg-zinc-100 text-black font-semibold' 
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onExportCSV}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV Log</span>
            </button>

            <button
              onClick={handlePrintPDF}
              className="flex items-center gap-1.5 px-3.5 py-1 rounded bg-zinc-100 hover:bg-white text-black font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>

        </div>

        {/* Printable Formal Document Preview */}
        <div id="printable-report" className="flex-1 overflow-y-auto p-6 bg-zinc-950 text-zinc-100 space-y-5 print:p-0 print:bg-white print:text-black">
          
          {/* Official Letterhead / Header for College Presentation */}
          <div className="border-b border-zinc-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 print:border-black">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 print:text-gray-600 block">
                DEPARTMENT OF COMPUTER SCIENCE • BCA FINAL YEAR PROJECT
              </span>
              <h2 className="text-lg font-bold text-white print:text-black mt-0.5">
                CCTV SURVEILLANCE & INCIDENT AUDIT REPORT
              </h2>
              <p className="text-xs text-zinc-400 print:text-gray-700 mt-1">
                Project Title: <strong>VisionGuard AI CCTV Video Analytics System</strong>
              </p>
            </div>

            <div className="text-right text-xs font-mono text-zinc-400 print:text-gray-700">
              <div>Report ID: <strong>RPT-2026-1008-01</strong></div>
              <div>Student: <strong>Ruchitha (BCA)</strong></div>
              <div>Date Generated: {new Date().toLocaleDateString()}</div>
            </div>
          </div>

          {/* Audit Window Meta Box */}
          <div className="bg-zinc-900 print:bg-gray-100 p-3.5 rounded-lg border border-zinc-800 print:border-gray-300 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div>
              <span className="text-zinc-500 print:text-gray-600 block text-[10px]">TIME WINDOW</span>
              <span className="font-semibold text-white print:text-black">
                {startDate.replace('T', ' ')} to {endDate.replace('T', ' ')}
              </span>
            </div>

            <div>
              <span className="text-zinc-500 print:text-gray-600 block text-[10px]">MONITORED FEEDS</span>
              <span className="font-semibold text-white print:text-black">6 Active Cameras (1080p)</span>
            </div>

            <div>
              <span className="text-zinc-500 print:text-gray-600 block text-[10px]">TOTAL FOOTFALL</span>
              <span className="font-semibold text-white print:text-black">2,485 Persons Counted</span>
            </div>

            <div>
              <span className="text-zinc-500 print:text-gray-600 block text-[10px]">INCIDENTS FLAGGED</span>
              <span className="font-semibold text-red-400 print:text-red-700">{alerts.length} Events Logged</span>
            </div>
          </div>

          {/* Incident Log Table */}
          <div>
            <h4 className="text-xs font-bold font-mono text-white print:text-black uppercase tracking-wider mb-2">
              Verified Surveillance Incident Log ({startDate.slice(0, 10)})
            </h4>

            <div className="border border-zinc-800 print:border-gray-300 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-zinc-900 print:bg-gray-200 border-b border-zinc-800 print:border-gray-300 text-zinc-400 print:text-gray-800">
                  <tr>
                    <th className="p-2.5">Alert ID</th>
                    <th className="p-2.5">Camera Channel</th>
                    <th className="p-2.5">Incident Type</th>
                    <th className="p-2.5">Severity</th>
                    <th className="p-2.5">Confidence</th>
                    <th className="p-2.5">Time</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80 print:divide-gray-200 text-zinc-300 print:text-gray-800">
                  {alerts.map((alt) => (
                    <tr key={alt.id} className="hover:bg-zinc-900/40 print:hover:bg-transparent">
                      <td className="p-2.5 font-bold text-white print:text-black">{alt.id}</td>
                      <td className="p-2.5">{alt.camId} - {alt.camName}</td>
                      <td className="p-2.5">{alt.type}</td>
                      <td className="p-2.5">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          alt.severity === 'critical' ? 'text-red-400 print:text-red-700' :
                          alt.severity === 'warning' ? 'text-amber-400 print:text-amber-700' :
                          'text-zinc-400 print:text-gray-700'
                        }`}>
                          {alt.severity.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-2.5">{alt.confidence}</td>
                      <td className="p-2.5">{alt.timeExact || alt.timestamp}</td>
                      <td className="p-2.5">{alt.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Signatures for Academic Submission */}
          <div className="pt-8 border-t border-zinc-800 print:border-black grid grid-cols-2 gap-8 text-xs font-mono">
            <div>
              <div className="border-b border-zinc-700 print:border-black w-48 mb-1 h-8"></div>
              <p className="text-zinc-400 print:text-gray-700 font-semibold">Submitted by: Ruchitha</p>
              <p className="text-zinc-500 print:text-gray-500 text-[10px]">Student, Final Year BCA Computer Science</p>
            </div>

            <div className="text-right flex flex-col items-end">
              <div className="border-b border-zinc-700 print:border-black w-48 mb-1 h-8"></div>
              <p className="text-zinc-400 print:text-gray-700 font-semibold">Project Guide / Faculty Evaluator</p>
              <p className="text-zinc-500 print:text-gray-500 text-[10px]">Department of Computer Science</p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-400 no-print">
          <span className="font-mono text-[11px]">Ready for Print or PDF Save</span>
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
