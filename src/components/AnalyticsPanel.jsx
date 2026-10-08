import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, Legend 
} from 'recharts';
import { 
  Users, 
  Car, 
  ShieldAlert, 
  Cpu, 
  Activity, 
  CheckCircle, 
  TrendingUp, 
  Server,
  Zap
} from 'lucide-react';
import { HOURLY_ANALYTICS, THREAT_DISTRIBUTION, SYSTEM_SPECS } from '../data/mockData';

export const AnalyticsPanel = () => {
  return (
    <div className="space-y-4">
      
      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* Footfall Card */}
        <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-mono text-slate-400">Total People Counted</p>
            <h3 className="text-2xl font-bold font-mono text-white mt-1">2,485</h3>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
              <TrendingUp className="w-3 h-3" />
              <span>+12.4% vs Yesterday</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Vehicles Screened Card */}
        <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-mono text-slate-400">Vehicles Screened (ANPR)</p>
            <h3 className="text-2xl font-bold font-mono text-white mt-1">682</h3>
            <p className="text-[11px] text-cyan-400 flex items-center gap-1 mt-1 font-mono">
              <span>99.2% License Plates Read</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Car className="w-6 h-6" />
          </div>
        </div>

        {/* Security Alerts Card */}
        <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-mono text-slate-400">Security Anomalies</p>
            <h3 className="text-2xl font-bold font-mono text-red-400 mt-1">19</h3>
            <p className="text-[11px] text-amber-400 flex items-center gap-1 mt-1 font-mono">
              <span>2 Critical • 17 Resolved</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>

        {/* Security Index Card */}
        <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-mono text-slate-400">Campus Safety Index</p>
            <h3 className="text-2xl font-bold font-mono text-emerald-400 mt-1">96.8%</h3>
            <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1 font-mono">
              <span>Nominal / Zero Breaches</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Footfall Hourly Traffic Curve (2 Cols) */}
        <div className="lg:col-span-2 bg-[#0b1220] border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>HOURLY TRAFFIC & ENTRY/EXIT FLOW (YOLOv8 COUNTER)</span>
              </h4>
              <p className="text-xs text-slate-400">Aggregated pedestrian flow through perimeter turnstiles and gates</p>
            </div>
            <span className="text-xs font-mono bg-cyan-950/60 text-cyan-400 border border-cyan-800 px-2 py-0.5 rounded">
              Today (8:00 - 18:00)
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HOURLY_ANALYTICS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#64748b" fontSize={11} fontFamily="monospace" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} 
                  itemStyle={{ fontFamily: 'monospace' }}
                />
                <Area type="monotone" dataKey="peopleIn" name="Entry Traffic (In)" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorIn)" />
                <Area type="monotone" dataKey="peopleOut" name="Exit Traffic (Out)" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorOut)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Threat Distribution Pie Chart (1 Col) */}
        <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col">
          <div className="mb-2">
            <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>INCIDENT BREAKDOWN BY CATEGORY</span>
            </h4>
            <p className="text-xs text-slate-400">Classified by computer vision rule engine</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={THREAT_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {THREAT_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs font-mono">
            {THREAT_DISTRIBUTION.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-400 truncate text-[11px]">{item.name}</span>
                <span className="text-white font-bold ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* AI Engine & Hardware Telemetry Panel */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-4 shadow-lg">
        <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2 mb-3">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>DEEP LEARNING MODEL SPECIFICATIONS & HARDWARE TELEMETRY</span>
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-500 block text-[10px]">DETECTION MODEL</span>
            <span className="text-cyan-400 font-bold">YOLOv8x (PyTorch)</span>
          </div>

          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-500 block text-[10px]">MULTI-OBJECT TRACKING</span>
            <span className="text-emerald-400 font-bold">DeepSORT + Kalman</span>
          </div>

          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-500 block text-[10px]">AVG INFERENCE LATENCY</span>
            <span className="text-white font-bold">11.8 ms / frame</span>
          </div>

          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-500 block text-[10px]">GPU ACCELERATION</span>
            <span className="text-purple-400 font-bold">CUDA 12.2 / TensorRT</span>
          </div>

          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-500 block text-[10px]">PARALLEL STREAMS</span>
            <span className="text-amber-400 font-bold">6 Channels (1080p)</span>
          </div>

          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-500 block text-[10px]">STORAGE RETENTION</span>
            <span className="text-slate-300 font-bold">30 Days (4.8 TB)</span>
          </div>
        </div>
      </div>

    </div>
  );
};
