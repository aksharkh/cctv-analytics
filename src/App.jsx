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
import { X, Bell } from 'lucide-react';

export default function App() {
  const [cameras, setCameras] = useState(INITIAL_CAMERAS);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('grid'); // 'grid' | 'analytics'
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [tripwireCamera, setTripwireCamera] = useState(null);
  const [isVivaModalOpen, setIsVivaModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddNewAlert = (newAlert) => {
    setAlerts(prev => [newAlert, ...prev]);
    
    setCameras(prev => prev.map(c => 
      c.id === newAlert.camId ? { ...c, activeThreats: c.activeThreats + 1 } : c
    ));

    if (soundEnabled) {
      playAlertSound(newAlert.severity);
    }

    showToast(`Alert: ${newAlert.type} on ${newAlert.camId}`);
  };

  const handleAcknowledgeAlert = (alertId) => {
    setAlerts(prev => prev.map(a => 
      a.id === alertId ? { ...a, status: 'CLEARED' } : a
    ));
    showToast('Alert acknowledged');
  };

  const handleSimulateNewIncident = () => {
    const samples = [
      {
        camId: 'CAM-02',
        camName: 'Server Room & Vault',
        type: 'Restricted Area Intrusion',
        severity: 'critical',
        confidence: '98.2%',
        description: 'Motion detected in restricted server room after hours.',
        objectClass: 'Unauthorized Person'
      },
      {
        camId: 'CAM-05',
        camName: 'Parking Lot Zone B',
        type: 'Speed Violation',
        severity: 'warning',
        confidence: '94.0%',
        description: 'Vehicle detected above 20 km/h campus limit.',
        objectClass: 'Vehicle'
      },
      {
        camId: 'CAM-03',
        camName: 'Perimeter Fence East',
        type: 'Loitering Alert',
        severity: 'warning',
        confidence: '89.5%',
        description: 'Subject lingering near perimeter boundary.',
        objectClass: 'Person'
      },
      {
        camId: 'CAM-04',
        camName: 'Corporate Lobby',
        type: 'Unattended Bag',
        severity: 'critical',
        confidence: '91.0%',
        description: 'Stationary backpack detected without owner.',
        objectClass: 'Luggage'
      }
    ];

    const pick = samples[Math.floor(Math.random() * samples.length)];
    const newId = `ALT-${Math.floor(2000 + Math.random() * 8000)}`;

    handleAddNewAlert({
      ...pick,
      id: newId,
      timestamp: 'Just now',
      timeExact: new Date().toLocaleTimeString(),
      status: 'ACTIVE'
    });
  };

  const handleFocusCamera = (camId) => {
    const target = cameras.find(c => c.id === camId);
    if (target) {
      setSelectedCamera(target);
      setActiveTab('grid');
    }
  };

  const handleExportReport = () => {
    const headers = ['Alert ID', 'Camera ID', 'Camera Name', 'Incident Type', 'Severity', 'Confidence', 'Time', 'Object', 'Status', 'Description'];
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
    link.setAttribute('download', `CCTV_Incident_Log_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Downloaded Incident Log CSV');
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans">
      
      {/* Navbar */}
      <Navbar
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenVivaModal={() => setIsVivaModalOpen(true)}
        onOpenSearchModal={() => setIsSearchModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportReport={handleExportReport}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4">
        {activeTab === 'grid' ? (
          <div className="flex flex-col lg:flex-row gap-3.5 items-start">
            <CameraGrid
              cameras={cameras}
              onSelectCamera={(cam) => setSelectedCamera(cam)}
              onOpenTripwire={(cam) => setTripwireCamera(cam)}
              onSimulateNewIncident={handleSimulateNewIncident}
            />

            <AlertSidebar
              alerts={alerts}
              onAcknowledgeAlert={handleAcknowledgeAlert}
              onFocusCamera={handleFocusCamera}
            />
          </div>
        ) : (
          <AnalyticsPanel />
        )}
      </main>

      {/* Clean Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-zinc-900 border border-zinc-700 text-white text-xs font-mono px-3.5 py-2 rounded-lg shadow-xl flex items-center gap-2">
          <Bell className="w-3.5 h-3.5 text-zinc-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Single Camera Focus Modal */}
      {selectedCamera && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{selectedCamera.id}</span>
                <span className="text-zinc-600">•</span>
                <span>{selectedCamera.name}</span>
                <span className="text-zinc-500">({selectedCamera.location})</span>
              </div>
              <button
                onClick={() => setSelectedCamera(null)}
                className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-black">
              <CameraFeed
                camera={selectedCamera}
                isExpanded={true}
                onSelectCamera={() => {}}
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

      {/* Tripwire Modal */}
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

      {/* Viva / Project Info Modal */}
      <VivaHelpModal
        isOpen={isVivaModalOpen}
        onClose={() => setIsVivaModalOpen(false)}
      />

      {/* Simple Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 px-4 py-2.5 text-center text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-1">
        <div>
          <span>CCTV Video Analytics Project • BCA Computer Science</span>
        </div>
        <div>
          <span>Student Project by <strong className="text-zinc-400">Ruchitha</strong></span>
        </div>
      </footer>

    </div>
  );
}
