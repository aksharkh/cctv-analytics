// Scenario Timeline Engine
// Automatically cycles through real-world surveillance events every 10 seconds.
// This ensures motion on the cameras and detections on the right-side alert feed change dynamically!

export const SCENARIO_STAGES = [
  {
    stageId: 1,
    title: 'Main Gate Student Entry Flow',
    activeCamId: 'CAM-01',
    durationSec: 10,
    cameraStates: {
      'CAM-01': {
        motion: 'entry_walking',
        description: 'Students entering through turnstile',
        threatCount: 0,
        objects: [
          { id: 'p1', x: 80, y: 130, vx: 0.8, vy: 0, label: 'Person', conf: 95, type: 'person' },
          { id: 'p2', x: 220, y: 125, vx: 0.5, vy: 0, label: 'Person', conf: 92, type: 'person' }
        ]
      },
      'CAM-02': { motion: 'idle', threatCount: 0, objects: [] },
      'CAM-03': { motion: 'patrol', threatCount: 0, objects: [{ id: 'p3', x: 180, y: 130, vx: -0.2, vy: 0, label: 'Person', conf: 90, type: 'person' }] },
      'CAM-04': { motion: 'lobby_walk', threatCount: 0, objects: [{ id: 'p4', x: 140, y: 120, vx: 0.4, vy: 0, label: 'Person', conf: 93, type: 'person' }] },
      'CAM-05': { motion: 'parked', threatCount: 0, objects: [{ id: 'c1', x: 60, y: 140, vx: 0, vy: 0, label: 'Car', conf: 98, type: 'car' }] },
      'CAM-06': { motion: 'hallway', threatCount: 0, objects: [{ id: 'p5', x: 200, y: 125, vx: 0.3, vy: 0, label: 'Person', conf: 91, type: 'person' }] }
    },
    triggeredAlert: {
      id: 'EVT-0101',
      camId: 'CAM-01',
      camName: 'Main Entrance & Turnstile',
      type: 'Turnstile Entry Verified',
      severity: 'info',
      confidence: '95.2%',
      description: 'Authorized badge scan at North Turnstile. Pedestrian ingress verified.',
      objectClass: 'Student / Person',
      status: 'VERIFIED'
    }
  },
  {
    stageId: 2,
    title: 'Server Room Security Breach',
    activeCamId: 'CAM-02',
    durationSec: 10,
    cameraStates: {
      'CAM-01': { motion: 'normal', threatCount: 0, objects: [{ id: 'p1', x: 240, y: 130, vx: 0.3, vy: 0, label: 'Person', conf: 91, type: 'person' }] },
      'CAM-02': {
        motion: 'intrusion_running',
        description: 'Unauthorized subject entered vault',
        threatCount: 1,
        objects: [
          { id: 'intruder', x: 140, y: 120, vx: 0.9, vy: 0, label: 'INTRUDER', conf: 98, type: 'intruder' }
        ]
      },
      'CAM-03': { motion: 'patrol', threatCount: 0, objects: [] },
      'CAM-04': { motion: 'lobby_walk', threatCount: 0, objects: [{ id: 'p4', x: 190, y: 120, vx: -0.3, vy: 0, label: 'Person', conf: 90, type: 'person' }] },
      'CAM-05': { motion: 'parked', threatCount: 0, objects: [{ id: 'c1', x: 60, y: 140, vx: 0, vy: 0, label: 'Car', conf: 98, type: 'car' }] },
      'CAM-06': { motion: 'hallway', threatCount: 0, objects: [] }
    },
    triggeredAlert: {
      id: 'EVT-0102',
      camId: 'CAM-02',
      camName: 'Server Room & Vault',
      type: 'Restricted Area Intrusion',
      severity: 'critical',
      confidence: '98.6%',
      description: 'Unidentified subject breached optical tripwire in Server Rack Zone B.',
      objectClass: 'Unauthorized Subject',
      status: 'ACTIVE'
    }
  },
  {
    stageId: 3,
    title: 'Parking Lot Vehicle Arrival',
    activeCamId: 'CAM-05',
    durationSec: 10,
    cameraStates: {
      'CAM-01': { motion: 'normal', threatCount: 0, objects: [] },
      'CAM-02': { motion: 'idle', threatCount: 0, objects: [] },
      'CAM-03': { motion: 'patrol', threatCount: 0, objects: [] },
      'CAM-04': { motion: 'lobby_walk', threatCount: 0, objects: [{ id: 'p4', x: 100, y: 120, vx: 0.4, vy: 0, label: 'Person', conf: 93, type: 'person' }] },
      'CAM-05': {
        motion: 'car_driving',
        description: 'Vehicle entering parking bay',
        threatCount: 0,
        objects: [
          { id: 'c1', x: 60, y: 140, vx: 0, vy: 0, label: 'Car', conf: 98, type: 'car' },
          { id: 'c2', x: 180, y: 145, vx: -1.2, vy: 0, label: 'Vehicle: KA01-4521', conf: 97, type: 'car' }
        ]
      },
      'CAM-06': { motion: 'hallway', threatCount: 0, objects: [{ id: 'p5', x: 120, y: 125, vx: 0.4, vy: 0, label: 'Person', conf: 92, type: 'person' }] }
    },
    triggeredAlert: {
      id: 'EVT-0103',
      camId: 'CAM-05',
      camName: 'Parking Lot Zone B',
      type: 'Vehicle Entry Detected',
      severity: 'info',
      confidence: '97.1%',
      description: 'Vehicle KA01-4521 entered parking bay 4. ANPR registered.',
      objectClass: 'Vehicle (Sedan)',
      status: 'CLEARED'
    }
  },
  {
    stageId: 4,
    title: 'Unattended Object in Reception',
    activeCamId: 'CAM-04',
    durationSec: 10,
    cameraStates: {
      'CAM-01': { motion: 'normal', threatCount: 0, objects: [{ id: 'p1', x: 110, y: 130, vx: 0.4, vy: 0, label: 'Person', conf: 93, type: 'person' }] },
      'CAM-02': { motion: 'idle', threatCount: 0, objects: [] },
      'CAM-03': { motion: 'patrol', threatCount: 0, objects: [] },
      'CAM-04': {
        motion: 'baggage_dropped',
        description: 'Object left unattended on floor',
        threatCount: 1,
        objects: [
          { id: 'p4', x: 260, y: 120, vx: 0.6, vy: 0, label: 'Person', conf: 91, type: 'person' },
          { id: 'bag', x: 110, y: 138, vx: 0, vy: 0, label: 'Unattended Bag', conf: 92, type: 'bag' }
        ]
      },
      'CAM-05': { motion: 'parked', threatCount: 0, objects: [{ id: 'c1', x: 60, y: 140, vx: 0, vy: 0, label: 'Car', conf: 98, type: 'car' }] },
      'CAM-06': { motion: 'hallway', threatCount: 0, objects: [] }
    },
    triggeredAlert: {
      id: 'EVT-0104',
      camId: 'CAM-04',
      camName: 'Corporate Reception',
      type: 'Unattended Baggage Alert',
      severity: 'warning',
      confidence: '92.4%',
      description: 'Backpack stationary in reception atrium with no custodian within 5 meters.',
      objectClass: 'Backpack / Luggage',
      status: 'ACTIVE'
    }
  },
  {
    stageId: 5,
    title: 'Perimeter Fence Loitering',
    activeCamId: 'CAM-03',
    durationSec: 10,
    cameraStates: {
      'CAM-01': { motion: 'normal', threatCount: 0, objects: [] },
      'CAM-02': { motion: 'idle', threatCount: 0, objects: [] },
      'CAM-03': {
        motion: 'loitering_pacing',
        description: 'Subject lingering near fence line',
        threatCount: 1,
        objects: [
          { id: 'p3', x: 160, y: 130, vx: 0.2, vy: 0, label: 'Loitering >3m', conf: 89, type: 'intruder' }
        ]
      },
      'CAM-04': { motion: 'lobby_walk', threatCount: 0, objects: [{ id: 'p4', x: 180, y: 120, vx: -0.4, vy: 0, label: 'Person', conf: 90, type: 'person' }] },
      'CAM-05': { motion: 'parked', threatCount: 0, objects: [{ id: 'c1', x: 60, y: 140, vx: 0, vy: 0, label: 'Car', conf: 98, type: 'car' }] },
      'CAM-06': { motion: 'hallway', threatCount: 0, objects: [{ id: 'p5', x: 170, y: 125, vx: 0.3, vy: 0, label: 'Person', conf: 92, type: 'person' }] }
    },
    triggeredAlert: {
      id: 'EVT-0105',
      camId: 'CAM-03',
      camName: 'Perimeter Fence East',
      type: 'Boundary Loitering Alert',
      severity: 'warning',
      confidence: '89.2%',
      description: 'Subject remained in perimeter boundary zone for > 180 seconds.',
      objectClass: 'Person (Suspicious)',
      status: 'ACTIVE'
    }
  },
  {
    stageId: 6,
    title: 'Corridor Pedestrian Flow',
    activeCamId: 'CAM-06',
    durationSec: 10,
    cameraStates: {
      'CAM-01': { motion: 'entry_walking', threatCount: 0, objects: [{ id: 'p1', x: 140, y: 130, vx: 0.5, vy: 0, label: 'Person', conf: 93, type: 'person' }] },
      'CAM-02': { motion: 'idle', threatCount: 0, objects: [] },
      'CAM-03': { motion: 'patrol', threatCount: 0, objects: [] },
      'CAM-04': { motion: 'lobby_walk', threatCount: 0, objects: [] },
      'CAM-05': { motion: 'parked', threatCount: 0, objects: [{ id: 'c1', x: 60, y: 140, vx: 0, vy: 0, label: 'Car', conf: 98, type: 'car' }] },
      'CAM-06': {
        motion: 'crowd_walking',
        description: 'Students walking through corridor',
        threatCount: 0,
        objects: [
          { id: 'p5', x: 60, y: 125, vx: 0.7, vy: 0, label: 'Person', conf: 94, type: 'person' },
          { id: 'p6', x: 150, y: 120, vx: 0.6, vy: 0, label: 'Person', conf: 92, type: 'person' },
          { id: 'p7', x: 250, y: 128, vx: -0.4, vy: 0, label: 'Person', conf: 90, type: 'person' }
        ]
      }
    },
    triggeredAlert: {
      id: 'EVT-0106',
      camId: 'CAM-06',
      camName: 'Corridor & Stairs',
      type: 'Group Transit Cleared',
      severity: 'info',
      confidence: '94.0%',
      description: 'Pedestrian flow cleared along stairwell corridor without obstruction.',
      objectClass: 'Students (3 Persons)',
      status: 'CLEARED'
    }
  }
];
