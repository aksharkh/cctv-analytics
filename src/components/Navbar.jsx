import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Volume2, 
  VolumeX, 
  Download, 
  GraduationCap, 
  Search, 
  Camera, 
  Clock, 
  Cpu, 
  BarChart3,
  Layers
} from 'lucide-react';

export const Navbar = ({ 
  soundEnabled, 
  setSoundEnabled, 
  onOpenVivaModal, 
  onOpenSearchModal, 
  activeTab, 
  setActiveTab,
  onExportReport
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-[#0b1220]/95 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-40 px-4 py-2.5">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: Brand & Telemetry */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 glow-cyan">
              <Camera className="w-5 h-5 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg text-white tracking-wider font-mono">
                  VISION<span className="text-cyan-400">GUARD</span> <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">AI</span>
                </h1>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tracking-tight flex items-center gap-2">
                <span>SOC Surveillance Analytics</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  6/6 Live Streams
                </span>
              </p>
            </div>
          </div>

          {/* Quick Engine Telemetry (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-900/80 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <Cpu className="w-3.5 h-3.5" />
              <span>YOLOv8x</span>
            </div>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400">Latency: <span className="text-emerald-400 font-semibold">11.8ms</span></span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400">FPS: <span className="text-cyan-400 font-semibold">29.8</span></span>
          </div>
        </div>

        {/* Center: Navigation Tabs */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'grid' 
                ? 'bg-cyan-500 text-black font-semibold shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Live Cameras</span>
          </button>
          
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'analytics' 
                ? 'bg-cyan-500 text-black font-semibold shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>AI Analytics</span>
          </button>

          <button
            onClick={onOpenSearchModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Forensic Search</span>
          </button>
        </div>

        {/* Right: Actions, Live Clock, and College Viva Helper */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute Alert Audio' : 'Unmute Alert Audio'}
            className={`p-2 rounded-lg border text-xs transition-colors ${
              soundEnabled 
                ? 'bg-slate-900 border-cyan-500/40 text-cyan-400 hover:bg-cyan-950/30' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Export Report */}
          <button
            onClick={onExportReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
            title="Download CSV Incident Audit Log"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Audit CSV</span>
          </button>

          {/* College Viva & Docs Button (Special Presentation Weapon) */}
          <button
            onClick={onOpenVivaModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-semibold shadow-lg shadow-emerald-950/50 border border-emerald-400/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <GraduationCap className="w-4 h-4 text-emerald-200" />
            <span>Project Viva & Docs</span>
          </button>

          {/* System Clock */}
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-800 text-right font-mono">
            <div>
              <div className="text-xs font-bold text-slate-200 tracking-wider">
                {time.toLocaleTimeString()}
              </div>
              <div className="text-[10px] text-slate-500 uppercase">
                {time.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
