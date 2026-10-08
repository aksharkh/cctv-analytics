import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar 
} from 'recharts';
import { 
  Users, 
  Car, 
  AlertTriangle, 
  CheckCircle,
  Video
} from 'lucide-react';
import { HOURLY_ANALYTICS, THREAT_DISTRIBUTION } from '../data/mockData';

export const AnalyticsPanel = () => {
  return (
    <div className="space-y-4">
      
      {/* 4 Simple Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3.5">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-xs font-mono">Total People Counted</span>
            <Users className="w-4 h-4 text-zinc-300" />
          </div>
          <h3 className="text-2xl font-bold font-mono text-white">2,485</h3>
          <p className="text-[11px] text-zinc-500 mt-1">Recorded across all 6 cameras today</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3.5">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-xs font-mono">Vehicles Detected</span>
            <Car className="w-4 h-4 text-zinc-300" />
          </div>
          <h3 className="text-2xl font-bold font-mono text-white">682</h3>
          <p className="text-[11px] text-zinc-500 mt-1">Gate & Parking lot detection</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3.5">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-xs font-mono">Incidents Flagged</span>
            <AlertTriangle className="w-4 h-4 text-zinc-300" />
          </div>
          <h3 className="text-2xl font-bold font-mono text-white">19</h3>
          <p className="text-[11px] text-zinc-500 mt-1">Intrusion, loitering, and baggage</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3.5">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-xs font-mono">Active Streams</span>
            <Video className="w-4 h-4 text-zinc-300" />
          </div>
          <h3 className="text-2xl font-bold font-mono text-white">6 / 6</h3>
          <p className="text-[11px] text-emerald-400 mt-1">All channels connected</p>
        </div>

      </div>

      {/* 2 Simple Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Hourly Traffic Chart */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
          <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider mb-1">
            Hourly Footfall (Entry vs Exit)
          </h4>
          <p className="text-xs text-zinc-500 mb-4">Traffic volume trends from 08:00 to 18:00</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HOURLY_ANALYTICS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="hour" stroke="#71717a" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#71717a" fontSize={11} fontFamily="monospace" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '6px', fontSize: '12px' }} 
                />
                <Area type="monotone" dataKey="peopleIn" name="Entry (In)" stroke="#e4e4e7" fill="#3f3f46" fillOpacity={0.4} />
                <Area type="monotone" dataKey="peopleOut" name="Exit (Out)" stroke="#a1a1aa" fill="#27272a" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Threat Categories Bar Chart */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
          <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider mb-1">
            Alert Breakdown by Type
          </h4>
          <p className="text-xs text-zinc-500 mb-4">Percentage distribution of security events</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={THREAT_DISTRIBUTION} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="name" stroke="#71717a" fontSize={10} fontFamily="monospace" interval={0} />
                <YAxis stroke="#71717a" fontSize={11} fontFamily="monospace" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '6px', fontSize: '12px' }} 
                />
                <Bar dataKey="value" name="Percentage (%)" fill="#d4d4d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Simple Camera Coverage Table */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
        <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider mb-3">
          Camera Configuration & Zone Mapping
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400">
                <th className="pb-2">Camera ID</th>
                <th className="pb-2">Location</th>
                <th className="pb-2">Resolution</th>
                <th className="pb-2">Detection Focus</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              <tr>
                <td className="py-2.5 font-bold text-white">CAM-01</td>
                <td>Main Entrance Gate</td>
                <td>1920x1080 (30 FPS)</td>
                <td>Person Counting & Vehicle Entry</td>
                <td className="text-emerald-400 font-semibold">Active</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-white">CAM-02</td>
                <td>Server Room & Vault</td>
                <td>1920x1080 (30 FPS)</td>
                <td>Restricted Area Intrusion</td>
                <td className="text-red-400 font-semibold">Alert (1)</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-white">CAM-03</td>
                <td>Perimeter Fence East</td>
                <td>1920x1080 (28 FPS)</td>
                <td>Loitering & Unattended Object</td>
                <td className="text-amber-400 font-semibold">Alert (1)</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-white">CAM-04</td>
                <td>Corporate Reception</td>
                <td>1920x1080 (30 FPS)</td>
                <td>Crowd Density & Footfall</td>
                <td className="text-emerald-400 font-semibold">Active</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-white">CAM-05</td>
                <td>Parking Zone B</td>
                <td>1920x1080 (30 FPS)</td>
                <td>Vehicle Tracking</td>
                <td className="text-emerald-400 font-semibold">Active</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-white">CAM-06</td>
                <td>Corridor & Stairs</td>
                <td>1920x1080 (29 FPS)</td>
                <td>Emergency Pathway Monitoring</td>
                <td className="text-emerald-400 font-semibold">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
