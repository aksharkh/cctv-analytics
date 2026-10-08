// Mock Data for VisionGuard AI CCTV Analytics Platform

export const INITIAL_CAMERAS = [
  {
    id: 'CAM-01',
    name: 'Main Entrance & Turnstile',
    location: 'Gate 01 - North Wing',
    type: 'Dome IP Camera 4K',
    ip: '192.168.1.101',
    status: 'ONLINE',
    fps: 29.8,
    bitrate: '4.2 Mbps',
    resolution: '1920x1080',
    model: 'YOLOv8x Object & ANPR',
    peopleCount: 18,
    vehicleCount: 6,
    activeThreats: 0,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    sceneType: 'traffic',
    detections: [
      { id: 'det-1', label: 'Person', conf: 0.94, box: [20, 35, 18, 45], color: '#10b981', trackId: 'TRK-401' },
      { id: 'det-2', label: 'Person', conf: 0.91, box: [45, 40, 16, 42], color: '#10b981', trackId: 'TRK-402' },
      { id: 'det-3', label: 'Vehicle: KA05-MB-9821', conf: 0.98, box: [65, 50, 26, 32], color: '#06b6d4', trackId: 'ANPR-881' }
    ]
  },
  {
    id: 'CAM-02',
    name: 'Server Room & Vault (Restricted)',
    location: 'Building B - Level -1',
    type: 'PTZ Thermal / Optical',
    ip: '192.168.1.102',
    status: 'ONLINE',
    fps: 30.0,
    bitrate: '5.1 Mbps',
    resolution: '1920x1080',
    model: 'YOLOv8-Pose + Tripwire Engine',
    peopleCount: 1,
    vehicleCount: 0,
    activeThreats: 1,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    sceneType: 'vault',
    detections: [
      { id: 'det-4', label: 'INTRUDER: Unauthorized', conf: 0.97, box: [38, 25, 24, 60], color: '#ef4444', trackId: 'ALRT-092' }
    ]
  },
  {
    id: 'CAM-03',
    name: 'Perimeter Fence East',
    location: 'Campus Boundary East',
    type: 'Long Range Bullet Camera',
    ip: '192.168.1.103',
    status: 'ONLINE',
    fps: 28.5,
    bitrate: '3.8 Mbps',
    resolution: '1920x1080',
    model: 'YOLOv8 Anomaly & Loitering',
    peopleCount: 2,
    vehicleCount: 1,
    activeThreats: 1,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    sceneType: 'perimeter',
    detections: [
      { id: 'det-5', label: 'Loitering Alert (>3 min)', conf: 0.89, box: [55, 30, 20, 50], color: '#f59e0b', trackId: 'TRK-219' },
      { id: 'det-6', label: 'Backpack: Unattended', conf: 0.86, box: [50, 72, 10, 14], color: '#f59e0b', trackId: 'OBJ-103' }
    ]
  },
  {
    id: 'CAM-04',
    name: 'Corporate Lobby & Reception',
    location: 'Ground Floor Atrium',
    type: '360° Fisheye De-warped',
    ip: '192.168.1.104',
    status: 'ONLINE',
    fps: 29.9,
    bitrate: '4.6 Mbps',
    resolution: '1920x1080',
    model: 'YOLOv8 Crowd Density & Heatmap',
    peopleCount: 34,
    vehicleCount: 0,
    activeThreats: 0,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    sceneType: 'lobby',
    detections: [
      { id: 'det-7', label: 'Person', conf: 0.95, box: [15, 30, 14, 40], color: '#10b981', trackId: 'TRK-551' },
      { id: 'det-8', label: 'Person', conf: 0.92, box: [32, 28, 15, 43], color: '#10b981', trackId: 'TRK-552' },
      { id: 'det-9', label: 'Person', conf: 0.88, box: [50, 35, 14, 38], color: '#10b981', trackId: 'TRK-553' },
      { id: 'det-10', label: 'Person', conf: 0.96, box: [70, 32, 15, 41], color: '#10b981', trackId: 'TRK-554' }
    ]
  },
  {
    id: 'CAM-05',
    name: 'Parking Lot Zone B',
    location: 'South Basement Level 1',
    type: 'LPR / ANPR Specialized IP Cam',
    ip: '192.168.1.105',
    status: 'ONLINE',
    fps: 30.0,
    bitrate: '4.0 Mbps',
    resolution: '1920x1080',
    model: 'YOLOv8 Speed & Parking Violations',
    peopleCount: 3,
    vehicleCount: 22,
    activeThreats: 0,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
    sceneType: 'parking',
    detections: [
      { id: 'det-11', label: 'Vehicle: MH12-EF-3310', conf: 0.97, box: [25, 40, 32, 35], color: '#06b6d4', trackId: 'VEH-301' },
      { id: 'det-12', label: 'Parked: DL01-AA-9002', conf: 0.99, box: [62, 35, 30, 38], color: '#06b6d4', trackId: 'VEH-302' }
    ]
  },
  {
    id: 'CAM-06',
    name: 'Corridors & Fire Exit Stairs',
    location: 'Block C - Stairwell 2',
    type: 'Fixed Dome IR Night-Vision',
    ip: '192.168.1.106',
    status: 'ONLINE',
    fps: 29.5,
    bitrate: '3.5 Mbps',
    resolution: '1920x1080',
    model: 'YOLOv8 Fire/Smoke & Obstruction',
    peopleCount: 4,
    vehicleCount: 0,
    activeThreats: 0,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    sceneType: 'corridor',
    detections: [
      { id: 'det-13', label: 'Person', conf: 0.93, box: [40, 28, 18, 52], color: '#10b981', trackId: 'TRK-890' }
    ]
  }
];

export const INITIAL_ALERTS = [
  {
    id: 'ALT-1001',
    camId: 'CAM-02',
    camName: 'Server Room & Vault',
    type: 'Intrusion Detected',
    severity: 'critical', // critical, warning, info
    confidence: '97.4%',
    timestamp: 'Just now',
    timeExact: new Date().toLocaleTimeString(),
    description: 'Unknown subject breached virtual perimeter line into classified server rack zone.',
    objectClass: 'Person (Unrecognized)',
    status: 'ACTIVE'
  },
  {
    id: 'ALT-1002',
    camId: 'CAM-03',
    camName: 'Perimeter Fence East',
    type: 'Loitering Alert',
    severity: 'warning',
    confidence: '89.1%',
    timestamp: '2 mins ago',
    timeExact: '18:41:05',
    description: 'Subject remained static in sensitive boundary zone for > 180 seconds.',
    objectClass: 'Person',
    status: 'INVESTIGATING'
  },
  {
    id: 'ALT-1003',
    camId: 'CAM-03',
    camName: 'Perimeter Fence East',
    type: 'Abandoned Object',
    severity: 'warning',
    confidence: '86.5%',
    timestamp: '5 mins ago',
    timeExact: '18:38:22',
    description: 'Unattended black backpack detected with no owner within 10 meter radius.',
    objectClass: 'Backpack / Luggage',
    status: 'ACTIVE'
  },
  {
    id: 'ALT-1004',
    camId: 'CAM-01',
    camName: 'Main Entrance & Turnstile',
    type: 'VIP / Vehicle Recognized',
    severity: 'info',
    confidence: '98.8%',
    timestamp: '8 mins ago',
    timeExact: '18:35:10',
    description: 'Registered executive vehicle KA05-MB-9821 cleared through barrier gate.',
    objectClass: 'Sedan (Authorized)',
    status: 'CLEARED'
  },
  {
    id: 'ALT-1005',
    camId: 'CAM-04',
    camName: 'Corporate Lobby & Reception',
    type: 'Crowd Density Spike',
    severity: 'info',
    confidence: '92.0%',
    timestamp: '14 mins ago',
    timeExact: '18:29:44',
    description: 'Lobby occupancy exceeded standard baseline threshold (34 persons in zone).',
    objectClass: 'Crowd Cluster',
    status: 'CLEARED'
  }
];

export const HOURLY_ANALYTICS = [
  { hour: '08:00', peopleIn: 120, peopleOut: 15, vehicleIn: 45, alerts: 1 },
  { hour: '09:00', peopleIn: 340, peopleOut: 28, vehicleIn: 110, alerts: 3 },
  { hour: '10:00', peopleIn: 410, peopleOut: 45, vehicleIn: 95, alerts: 2 },
  { hour: '11:00', peopleIn: 210, peopleOut: 90, vehicleIn: 40, alerts: 0 },
  { hour: '12:00', peopleIn: 180, peopleOut: 220, vehicleIn: 35, alerts: 2 },
  { hour: '13:00', peopleIn: 290, peopleOut: 310, vehicleIn: 50, alerts: 4 },
  { hour: '14:00', peopleIn: 190, peopleOut: 140, vehicleIn: 30, alerts: 1 },
  { hour: '15:00', peopleIn: 220, peopleOut: 160, vehicleIn: 45, alerts: 2 },
  { hour: '16:00', peopleIn: 150, peopleOut: 280, vehicleIn: 60, alerts: 3 },
  { hour: '17:00', peopleIn: 90, peopleOut: 480, vehicleIn: 120, alerts: 5 },
  { hour: '18:00', peopleIn: 65, peopleOut: 390, vehicleIn: 90, alerts: 2 }
];

export const THREAT_DISTRIBUTION = [
  { name: 'Intrusions & Tripwire', value: 42, color: '#ef4444' },
  { name: 'Suspicious Loitering', value: 28, color: '#f59e0b' },
  { name: 'Unattended Baggage', value: 16, color: '#8b5cf6' },
  { name: 'Vehicle / Speed Violations', value: 14, color: '#06b6d4' }
];

export const SYSTEM_SPECS = {
  version: 'v2.4.0-Enterprise',
  modelEngine: 'YOLOv8x + ByteTRACK / DeepSORT',
  inferenceHardware: 'NVIDIA RTX 4090 (Simulated Cloud GPU)',
  averageLatency: '11.8 ms / frame',
  totalStreams: 6,
  healthyStreams: 6,
  storageRetention: '30 Days (4.8 TB / 10 TB used)',
  activeAIWorkers: 12
};
