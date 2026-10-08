import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CameraGrid } from './components/CameraGrid';
import { AlertSidebar } from './components/AlertSidebar';
import { AnalyticsPanel } from './components/AnalyticsPanel';
import { ForensicSearchModal } from './components/ForensicSearchModal';
import { VivaHelpModal } from './components/VivaHelpModal';
import { TripwireModal } from './components/TripwireModal';
import { CameraFeed } from './components/CameraFeed';
import { INITIAL_CAMERAS, INITIAL_ALERTS } from './data/mockData';
import { playAlertSound } from './utils/audioAlert';
import { X, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [cameras, setCameras] = useState(INITIAL_CAMERAS);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('grid'); // 'grid' | 'analytics'
  const [selectedCamera, setSelectedCamera] = useState(null); // for single view focus
  const [tripwireCamera, setTripwireCamera] = useState(null);
  const [isVivaModalOpen, setIsVivaModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Add new alert helper
  const handleAddNewAlert = (newAlert) => {
    setAlerts(prev => [newAlert, ...prev]);
    
    // Increment threat on target camera
    setCameras(prev => prev.map(c => 
      c.id === newAlert.camId ? { ...c, activeThreats: c.activeThreats + 1 } : c
    ));

    if (soundEnabled) {
      playAlertSound(newAlert.severity);
    }

    showToast(`🚨 ${newAlert.type} on ${newAlert.camId}`);
  };

  // Acknowledge alert
  const handleAcknowledgeAlert = (alertId) => {
    setAlerts(prev => prev.map(a => 
      a.id === alertId ? { ...a, status: 'CLEARED' } : a
    ));
    showToast('Incident acknowledged and cleared.');
  };

  // Simulate an incident dynamically
  const handleSimulateNewIncident = () => {
    const incidentTemplates = [
      {
        camId: 'CAM-02',
        camName: 'Server Room & Vault',
        type: 'Restricted Zone Intrusion',
        severity: 'critical',
        confidence: '98.2%',
        description: 'Unidentified individual detected crossing optical security tripwire.',
        objectClass: 'Unauthorized Subject'
      },
      {
        camId: 'CAM-05',
        camName: 'Parking Lot Zone B',
        type: 'Vehicle Speeding Violation',
        severity: 'warning',
        confidence: '94.6%',
        description: 'Black SUV detected traveling at 42 km/h in 15 km/h campus speed zone.',
        objectClass: 'Vehicle (SUV)'
      },
      {
        camId: 'CAM-03',
        camName: 'Perimeter Fence East',
        type: 'Loitering & Fence Tampering',
        severity: 'warning',
        confidence: '89.7%',
        description: 'Person detected lingering near boundary perimeter fence for over 180 seconds.',
        objectClass: 'Person (Suspicious)'
      },
      {
        camId: 'CAM-04',
        camName: 'Corporate Lobby & Reception',
        type: 'Unattended Luggage Detected',
        severity: 'critical',
        confidence: '91.8%',
        description: 'Duffel bag left stationary without owner in high-traffic atrium corridor.',
        objectClass: 'Abandoned Baggage'
      }
    ];

    const template = incidentTemplates[Math.floor(Math.random() * incidentTemplates.length)];
    const newId = `ALT-${Math.floor(2000 + Math.random() * 8000)}`;

    handleAddNewAlert({
      ...template,
      id: newId,
      timestamp: 'Just now',
      timeExact: new Date().toLocaleTimeString(),
      status: 'ACTIVE'
    });
  };

  // Periodic automatic simulated background events (Every 45 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      // 50% chance to simulate a subtle event
      if (Math.random() > 0.45) {
        handleSimulateNewIncident();
      }
    }, 45000);

    return () => clearInterval(timer);
  }, [soundEnabled]);

  // Focus a camera from alert click
  const handleFocusCamera = (camId) => {
    const target = cameras.find(c => c.id === camId);
    if (target) {
      setSelectedCamera(target);
      setActiveTab('grid');
    }
  };

  // Export CSV Report
  const handleExportReport = () => {
    const headers = ['Alert ID', 'Camera ID', 'Camera Name', 'Incident Type', 'Severity', 'Confidence', 'Timestamp', 'Object Class', 'Status', 'Description'];
    const rows = alerts.map(a => [
      a.id,
      a.camId,
      `"${a.camName}"`,
      `"${a.type}"`,
      a.severity,
      a.confidence,
      `"${a.timeExact || a.timestamp}"`,
      `"${a.objectClass}"`,
      a.status,
      `"${a.description.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VisionGuard_Security_Audit_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Downloaded Security Audit CSV Report');
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      
      {/* Top Navbar */}
      <Navbar
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenVivaModal={() => setIsVivaModalOpen(true)}
        onOpenSearchModal={() => setIsSearchModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportReport={handleExportReport}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1920px] w-full mx-auto p-3 sm:p-4">
        {activeTab === 'grid' ? (
          <div className="flex flex-col lg:flex-row gap-4 items-start">
            {/* Live Camera Grid (Main Area) */}
            <CameraGrid
              cameras={cameras}
              onSelectCamera={(cam) => setSelectedCamera(cam)}
              onTriggerAlert={handleAddNewAlert}
              onOpenTripwire={(cam) => setTripwireCamera(cam)}
              onSimulateNewIncident={handleSimulateNewIncident}
            />

            {/* Real-time Alerts Sidebar */}
            <AlertSidebar
              alerts={alerts}
              onAcknowledgeAlert={handleAcknowledgeAlert}
              onFocusCamera={handleFocusCamera}
            />
          </div>
        ) : (
          /* Analytics & Deep Learning Dashboard */
          <AnalyticsPanel />
        )}
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900/95 border border-cyan-500/50 text-white text-xs font-mono px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 animate-bounce">
          <ShieldAlert className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Single Camera Maximize Focus Modal */}
      {selectedCamera && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0b1220] border border-slate-700 w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-cyan-400 font-bold text-sm">{selectedCamera.id}</span>
                <span className="text-slate-400">•</span>
                <span className="text-sm font-semibold text-white">{selectedCamera.name}</span>
                <span className="text-xs text-slate-500">({selectedCamera.location})</span>
              </div>
              <button
                onClick={() => setSelectedCamera(null)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-black">
              <CameraFeed
                camera={selectedCamera}
                isExpanded={true}
                onSelectCamera={() => {}}
                onTriggerAlert={handleAddNewAlert}
                onOpenTripwire={() => {
                  const target = selectedCamera;
                  setSelectedCamera(null);
                  setTripwireCamera(target);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Interactive Virtual Tripwire Configurator Modal */}
      <TripwireModal
        isOpen={!!tripwireCamera}
        camera={tripwireCamera}
        onClose={() => setTripwireCamera(null)}
        onAddAlert={handleAddNewAlert}
      />

      {/* Forensic Search Modal */}
      <ForensicSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        alerts={alerts}
        onExportReport={handleExportReport}
      />

      {/* BCA Project Viva & Docs Helper Modal */}
      <VivaHelpModal
        isOpen={isVivaModalOpen}
        onClose={() => setIsVivaModalOpen(false)}
      />

      {/* Bottom Footer */}
      <footer className="bg-[#0b101d] border-t border-slate-800/80 px-4 py-2 text-center text-xs text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>VisionGuard AI Surveillance Platform</span>
          <span>•</span>
          <span className="text-cyan-400">BCA Final Project Ready</span>
        </div>
        <div>
          <span>Designed for Ruchitha • 100% Client-Side Engine • Ready for Vercel</span>
        </div>
      </footer>

    </div>
  );
}
