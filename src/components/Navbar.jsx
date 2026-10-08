import React, { useState, useEffect } from 'react';
import { 
  Video, 
  BarChart2, 
  Search, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Download,
  Info
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
    <header className="bg-black border-b border-zinc-800 sticky top-0 z-40 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: Project Title & Student Info */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-sm sm:text-base text-white tracking-tight">
                  CCTV Analytics Platform
                </h1>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  BCA Project
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Student: <span className="text-zinc-200 font-medium">Ruchitha</span> • Dept of Computer Science
              </p>
            </div>
          </div>
        </div>

        {/* Center: Simple Navigation Tabs */}
        <nav className="flex items-center bg-zinc-900 p-1 rounded-lg border border-zinc-800 text-xs">
          <button
            onClick={() => setActiveTab('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'grid'
                ? 'bg-white text-black font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Live Feeds</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'analytics'
                ? 'bg-white text-black font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Analytics</span>
          </button>

          <button
            onClick={onOpenSearchModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-zinc-400 hover:text-white transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search Events</span>
          </button>
        </nav>

        {/* Right: Actions, Viva Guide & Clock */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg border text-xs transition-colors ${
              soundEnabled
                ? 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800'
                : 'bg-zinc-900 border-zinc-800 text-zinc-500'
            }`}
            title={soundEnabled ? 'Alert Sound On' : 'Alert Sound Muted'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Download CSV */}
          <button
            onClick={onExportReport}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs transition-colors"
            title="Download Event Log CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          {/* Simple Project & Viva Help Button */}
          <button
            onClick={onOpenVivaModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-black text-xs font-semibold border border-zinc-300 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Project Info & Viva</span>
          </button>

          {/* Clock */}
          <div className="hidden sm:block pl-2 border-l border-zinc-800 font-mono text-right text-xs text-zinc-400">
            <div>{time.toLocaleTimeString()}</div>
          </div>

        </div>

      </div>
    </header>
  );
};
