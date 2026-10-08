import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  BookOpen, 
  Cpu, 
  HelpCircle, 
  Layers, 
  CheckCircle2, 
  Copy, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const VivaHelpModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('viva');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(0);

  if (!isOpen) return null;

  const vivaQuestions = [
    {
      q: "1. What is the objective and problem statement of this project?",
      a: "Traditional CCTV surveillance relies heavily on human security personnel watching monitors for hours, leading to severe fatigue, missed incidents, and slow response times. VisionGuard AI solves this by deploying automated deep learning models (YOLOv8) to continuously analyze video streams in real-time, instantly detecting unauthorized intrusions, loitering, crowd surges, unattended baggage, and speeding vehicles without human fatigue."
    },
    {
      q: "2. Why did you choose YOLO (You Only Look Once) over Faster R-CNN?",
      a: "Faster R-CNN uses a two-stage detector (Region Proposal Network followed by classification), which is accurate but very slow (~5 to 7 FPS), making it unsuitable for real-time live CCTV streams. YOLO is a single-stage detector that divides the image into grids and predicts bounding boxes and class probabilities in a single forward pass, achieving 30 to 60+ FPS at 1080p resolution while maintaining high mean Average Precision (mAP)."
    },
    {
      q: "3. How does the system track people between video frames without losing their identity?",
      a: "We use DeepSORT (Simple Online and Realtime Tracking with Deep Association Metric). It combines a Kalman Filter to predict future bounding box positions based on velocity and direction, with a lightweight Convolutional Neural Network (CNN) that extracts appearance feature embeddings. This allows the system to maintain consistent Track IDs (e.g., TRK-401) even if someone is temporarily occluded behind a pillar."
    },
    {
      q: "4. What is a 'Virtual Tripwire' and how is it mathematically calculated?",
      a: "A Virtual Tripwire is a digital line drawn between two points (A and B) on the camera plane. The algorithm calculates the 2D centroid (center point) of each detected bounding box. Using 2D vector cross-products or ray-casting line intersection formulas, it checks if an object's trajectory vector crosses from one side of the line to the other. If the direction vector intersects the line, an intrusion trigger fires."
    },
    {
      q: "5. What video streaming protocols are used in real-world CCTV cameras?",
      a: "IP cameras broadcast video feeds using RTSP (Real-Time Streaming Protocol) with H.264/H.265 video codecs over port 554. In modern browser-based Security Operations Centers, RTSP feeds are converted into WebRTC or HLS (HTTP Live Streaming) or WebSocket MJPEG streams for ultra-low latency (<200ms) browser playback."
    },
    {
      q: "6. How does the system detect 'Abandoned Baggage' or Unattended Objects?",
      a: "The object detector detects both 'Person' and 'Backpack/Luggage' classes. The tracking engine monitors the spatial distance between the backpack and the nearest person. If the distance exceeds a defined threshold (e.g., 5 meters) and the bag remains stationary for more than 120 seconds, the state machine triggers an 'Abandoned Baggage' security alert."
    },
    {
      q: "7. How do you prevent false alarms caused by shadows, wind, or animals?",
      a: "We implement confidence score thresholding (ignoring detections below 80%), minimum object bounding box area constraints (ignoring small birds or leaves), temporal persistence filters (an anomaly must be sustained across at least 15 consecutive frames before alerting), and region-of-interest (ROI) masking."
    },
    {
      q: "8. What is ANPR / ALPR and how does vehicle detection work?",
      a: "Automatic Number Plate Recognition (ANPR) is a two-step process: First, YOLOv8 detects the vehicle and localizes the rectangular license plate box. Second, an Optical Character Recognition (OCR) neural network (like PaddleOCR or CRNN) segments and transcribes the alphanumeric characters on the plate, cross-referencing them against an authorized campus registry database."
    },
    {
      q: "9. How are the crowd density heatmaps generated?",
      a: "The system records the (x, y) ground-plane foot coordinates of every detected person over a rolling 10-minute window. These coordinate points are plotted onto a 2D density grid matrix and smoothed using a Gaussian kernel blur. The resulting intensity values are mapped to a color gradient (Blue -> Green -> Yellow -> Red) and overlaid on the video canvas."
    },
    {
      q: "10. What are the future enhancements for this project?",
      a: "Future improvements include: 1) Edge AI deployment on low-cost devices like NVIDIA Jetson Orin Nano, 2) Multi-camera cross-tracking (re-identifying the same suspect across different building cameras using Re-ID embeddings), and 3) Sound classification models to detect gunshots, screaming, or glass break audio."
    }
  ];

  const copyText = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0b1220] border border-cyan-500/40 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-slate-900 to-[#0c1829] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-mono">
                  BCA PROJECT DOCUMENTATION & VIVA PREPARATION GUIDE
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Ready for Exam / Viva
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Created for Ruchitha • CCTV Analytics Platform • Computer Science Final Evaluation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setActiveTab('viva')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'viva' 
                ? 'bg-cyan-500 text-black font-bold' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Top 10 Viva Q&A</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'architecture' 
                ? 'bg-cyan-500 text-black font-bold' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>System Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab('abstract')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'abstract' 
                ? 'bg-cyan-500 text-black font-bold' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Project Abstract & Flow</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 text-slate-300">
          
          {/* TAB 1: Top 10 Viva Questions */}
          {activeTab === 'viva' && (
            <div className="space-y-3">
              <div className="p-3 bg-cyan-950/30 border border-cyan-800/40 rounded-xl text-xs text-cyan-200 font-mono">
                💡 <strong>Viva Tip for Ruchitha:</strong> When the teacher asks you any question, keep your answers crisp and mention technical keywords like <em>YOLOv8</em>, <em>DeepSORT</em>, <em>RTSP streams</em>, and <em>Bounding Box Confidence</em>.
              </div>

              {vivaQuestions.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                    className="w-full p-3.5 flex items-center justify-between text-left font-mono text-xs font-semibold text-white hover:bg-slate-800/50 transition-colors"
                  >
                    <span className="text-cyan-300">{item.q}</span>
                    {expandedIndex === idx ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>

                  {expandedIndex === idx && (
                    <div className="p-3.5 bg-slate-950/80 border-t border-slate-800 text-xs text-slate-300 font-sans leading-relaxed flex flex-col gap-2">
                      <p>{item.a}</p>
                      <button
                        onClick={() => copyText(`${item.q}\n\n${item.a}`, idx)}
                        className="self-end flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
                      >
                        {copiedIndex === idx ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedIndex === idx ? 'Copied' : 'Copy Answer'}</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: System Architecture */}
          {activeTab === 'architecture' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="bg-black/80 p-4 rounded-xl border border-slate-800 text-cyan-400 overflow-x-auto leading-relaxed">
                <pre>{`
┌────────────────────────────────────────────────────────────────────────┐
│                   VISIONGUARD AI PIPELINE ARCHITECTURE                 │
└────────────────────────────────────────────────────────────────────────┘

 [1. CAMERA INGESTION]
  ├─ 6x IP Security Dome / PTZ Cameras (1080p @ 30 FPS)
  └─ RTSP Video Stream Transmission over Port 554 (H.264 / H.265)
          │
          ▼
 [2. FRAME DECODING & PRE-PROCESSING]
  ├─ Hardware-accelerated frame extraction via OpenCV & FFmpeg
  └─ Frame resizing to 640x640, Normalization, Noise reduction filter
          │
          ▼
 [3. DEEP LEARNING INFERENCE ENGINE]
  ├─ YOLOv8x Neural Network (Feature Pyramid Network + CSPDarknet)
  ├─ Multi-class object classification: Person, Vehicle, Bag, Bicycle
  └─ Real-time Bounding Box coordinates & Confidence Scoring (>0.85)
          │
          ▼
 [4. SPATIAL TRACKING & ANALYTICS]
  ├─ DeepSORT: Kalman Filter tracking + Cosine Re-ID embeddings
  ├─ Virtual Tripwire: Geometric ray-casting boundary crossing check
  ├─ Loitering Engine: Stationary temporal counter (> 180s in zone)
  └─ Heatmap Engine: 2D Gaussian density spatial accumulation
          │
          ▼
 [5. DISPATCH & PRESENTATION LAYER]
  ├─ WebSocket / SSE Real-time alert broadcast
  ├─ Interactive Frontend SOC Dashboard (React 18 + Tailwind CSS)
  └─ Vercel Serverless Edge Cloud hosting with 99.99% availability
                `}</pre>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <h5 className="font-bold text-white text-xs mb-1">Frontend Technology</h5>
                  <p className="text-slate-400 text-[11px] font-sans">
                    React 18, Vite 6, Tailwind CSS, Lucide React, Recharts, HTML5 Canvas 2D graphics API, Web Audio API. Hosted on Vercel Edge.
                  </p>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <h5 className="font-bold text-white text-xs mb-1">Theoretical AI Backend</h5>
                  <p className="text-slate-400 text-[11px] font-sans">
                    Python 3.11, Ultralytics YOLOv8x, OpenCV 4.9, PyTorch 2.3 with CUDA 12.2 GPU acceleration, FastAPI, Redis Event Queue.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Project Abstract */}
          {activeTab === 'abstract' && (
            <div className="space-y-4 font-sans text-xs leading-relaxed text-slate-300">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm font-mono">Project Abstract</h4>
                <p>
                  With the exponential increase in urban surveillance installations, conventional human-operated monitoring suffers from psychological fatigue, slow response latency, and frequent missed critical security events. This project, titled <strong>VisionGuard AI</strong>, implements a comprehensive, intelligent CCTV video analytics operations platform.
                </p>
                <p>
                  The system processes multiple video streams in real time using deep convolutional neural networks (YOLOv8 architecture) for multi-class object detection, paired with DeepSORT algorithms for consistent identity association. Beyond basic object detection, the platform features high-level spatial analytics including interactive geometric tripwire geofencing, crowd concentration heatmaps, automated abandoned object alerts, and vehicle recognition.
                </p>
                <p>
                  The solution delivers a unified, high-tech Security Operations Center (SOC) dashboard that allows security administrators to monitor live camera grids, receive instant auditory and visual notifications, execute historical forensic investigations, and audit facility footfall metrics.
                </p>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-white text-sm font-mono mb-2">Key Project Modules</h4>
                <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                  <li><strong className="text-slate-200">Multi-Channel Video Grid:</strong> Synchronized playback of 6 concurrent high-definition CCTV camera channels.</li>
                  <li><strong className="text-slate-200">Dynamic AI Bounding Boxes:</strong> Real-time visual overlay highlighting detected entities with class labels and confidence percentages.</li>
                  <li><strong className="text-slate-200">Virtual Tripwire Geofencing:</strong> User-configurable boundary lines that trigger instant alarms upon directional breach.</li>
                  <li><strong className="text-slate-200">Crowd Density Heatmaps:</strong> Thermal-gradient spatial visualization of footfall concentration.</li>
                  <li><strong className="text-slate-200">Real-Time Threat Notification Stream:</strong> Live priority-based incident dispatch console.</li>
                  <li><strong className="text-slate-200">Historical Forensic Query Engine:</strong> Multi-parameter event filtering by timestamp, camera ID, and object classification.</li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-400">
          <span>VisionGuard AI • BCA Computer Science 2026</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-colors"
          >
            Got it, Let's Demo!
          </button>
        </div>

      </div>
    </div>
  );
};
