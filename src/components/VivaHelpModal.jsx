import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  HelpCircle, 
  Check, 
  Copy, 
  FolderGit2, 
  Code2, 
  UploadCloud, 
  FileText,
  Play
} from 'lucide-react';

export const VivaHelpModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('files');
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const copyText = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const projectFiles = [
    {
      file: "src/components/CameraFeed.jsx",
      role: "Camera Feeds & YOLO Detection Boxes",
      whatToTellTeacher: "Tell them: 'This file draws the 6 camera screens using HTML5 Canvas and draws the green and red OpenCV/YOLO bounding boxes around people and cars in real time.'"
    },
    {
      file: "src/data/scenarioEngine.js",
      role: "10-Second Live Motion Engine",
      whatToTellTeacher: "Tell them: 'This file changes the motions on the cameras every 10 seconds (student entry, server vault intrusion, vehicle arrival, abandoned bag) so the surveillance feed behaves like real live CCTV activity.'"
    },
    {
      file: "src/components/ReportModal.jsx",
      role: "Time-Period Filter & PDF Report Export",
      whatToTellTeacher: "Tell them: 'This component allows the user to pick a start date/time and end date/time, filters the incident logs for that exact period, and prints or exports a formal signed audit report as a PDF using browser print styles.'"
    },
    {
      file: "src/components/AlertSidebar.jsx",
      role: "Right-Side Real-Time Incident Feed",
      whatToTellTeacher: "Tell them: 'This component receives real-time security alerts from the cameras and displays them on the right sidebar with audio alerts and acknowledgement buttons.'"
    },
    {
      file: "src/components/AnalyticsPanel.jsx",
      role: "Footfall & Security Charts",
      whatToTellTeacher: "Tell them: 'This file uses the Recharts library to draw the hourly visitor traffic area chart and the incident breakdown bar chart.'"
    },
    {
      file: "src/App.jsx",
      role: "Main Project Root File",
      whatToTellTeacher: "Tell them: 'This is the main root file that manages the state of the cameras, links the components together, and runs the 10-second timer cycle.'"
    }
  ];

  const vivaQuestions = [
    {
      q: "1. What is this project in one simple sentence?",
      a: "It is a web-based CCTV Video Analytics Platform built using React.js that monitors 6 live camera feeds, detects people, vehicles, and intrusions in real time using YOLO bounding boxes, and generates downloadable PDF audit reports."
    },
    {
      q: "2. How are the camera motions changing in real time?",
      a: "The project has a built-in state engine that advances every 10 seconds through realistic security scenarios: student turnstile entry, an unauthorized server room breach, a vehicle entering the parking bay, and an unattended baggage drop in the lobby. The right-side alert feed updates dynamically based on the movement occurring in that 10-second window."
    },
    {
      q: "3. What is React and why did you use it instead of basic HTML?",
      a: "React is a modern JavaScript library for building fast user interfaces using reusable components. I used React because surveillance platforms need to update multiple live camera feeds, clocks, timers, and streaming alerts simultaneously without refreshing or reloading the webpage."
    },
    {
      q: "4. Where is the YOLO model and how does detection work on the frontend?",
      a: "In this frontend platform, the object detection logic simulates YOLO (You Only Look Once) coordinates (X, Y, width, height) rendered on HTML5 Canvas. In a full production deployment, the cameras stream RTSP video to an OpenCV/YOLOv8 Python microservice which detects frames and sends coordinate data over WebSockets to this React frontend."
    },
    {
      q: "5. How does the PDF Report download work?",
      a: "In 'src/components/ReportModal.jsx', users select a time window (From Date/Time to To Date/Time). The component filters the recorded logs for that exact duration and uses clean CSS print media queries (@media print) with window.print() so the browser generates a clean, formatted formal PDF document complete with college headers and student signatures."
    },
    {
      q: "6. How is this hosted on Vercel and connected to GitHub?",
      a: "1) I initialized Git locally and committed my React code.\n2) I pushed the repository to GitHub.\n3) I linked the GitHub repo to Vercel. Vercel automatically runs 'npm run build' (Vite) and hosts the static single-page app on their global CDN with a shareable live HTTPS link."
    },
    {
      q: "7. What is a Virtual Tripwire and how does it detect unauthorized entry?",
      a: "A Virtual Tripwire is an invisible digital boundary line drawn across a restricted camera zone (like the Server Room). When a detected person's coordinates cross over the line's geometric boundary vector, the system immediately flags a Critical Intrusion Alert and turns the bounding box red."
    },
    {
      q: "8. How does the system detect an 'Unattended Bag'?",
      a: "The detection engine detects both 'Person' and 'Bag' objects. If a backpack remains stationary on the floor and the nearest person moves more than 5 meters away for over 120 seconds, the system triggers an Unattended Baggage Warning."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-950 border border-zinc-700 w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        
        {/* Header */}
        <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Ruchitha's Complete Viva & Code Explanation Guide
              </h3>
              <p className="text-xs text-zinc-400">
                Study this guide before presenting to your teachers • Simple, plain answers
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

        {/* Tab Selector */}
        <div className="px-4 py-2 bg-black border-b border-zinc-800 flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setActiveTab('files')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'files' ? 'bg-white text-black font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            1. Where is the Code? (File Map)
          </button>

          <button
            onClick={() => setActiveTab('viva')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'viva' ? 'bg-white text-black font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            2. Viva Questions & Answers
          </button>

          <button
            onClick={() => setActiveTab('git')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'git' ? 'bg-white text-black font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            3. GitHub to Vercel Hosting
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 text-xs text-zinc-300 space-y-4">
          
          {/* TAB 1: Where is the Code */}
          {activeTab === 'files' && (
            <div className="space-y-3">
              <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg text-zinc-300">
                <p className="leading-relaxed">
                  💡 <strong>If the teacher asks: "Show me where you wrote the code for this":</strong> Open VS Code and open these specific files:
                </p>
              </div>

              {projectFiles.map((item, idx) => (
                <div key={idx} className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-lg space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-white text-xs bg-black px-2 py-0.5 rounded border border-zinc-700">
                      {item.file}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-mono">{item.role}</span>
                  </div>
                  <p className="text-zinc-300 italic bg-black/40 p-2 rounded border border-zinc-800/80">
                    {item.whatToTellTeacher}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Viva Q&A */}
          {activeTab === 'viva' && (
            <div className="space-y-3">
              <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg text-zinc-300">
                <p className="leading-relaxed">
                  💡 <strong>How to present:</strong> Memorize or review these short answers. Speak with confidence and keep it simple!
                </p>
              </div>

              {vivaQuestions.map((item, idx) => (
                <div key={idx} className="bg-zinc-900/60 border border-zinc-800 p-3.5 rounded-lg space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="font-bold text-white text-xs">{item.q}</h5>
                    <button
                      onClick={() => copyText(`${item.q}\n\n${item.a}`, idx)}
                      className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-[11px] text-zinc-300 font-mono shrink-0 flex items-center gap-1"
                    >
                      {copiedIndex === idx ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-zinc-400 leading-relaxed whitespace-pre-line">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: GitHub & Vercel */}
          {activeTab === 'git' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-lg space-y-2">
                <h4 className="font-bold text-white text-sm">How GitHub and Vercel Hosting Works</h4>
                <p className="text-zinc-400 font-sans leading-relaxed">
                  Teachers often ask: <em>"How did you host this project and send me the link?"</em>
                </p>
                <div className="bg-black p-3 rounded border border-zinc-800 text-zinc-300 space-y-2 font-mono">
                  <p>1. <strong>Local Code on Laptop:</strong> We write React code in VS Code.</p>
                  <p>2. <strong>Git & GitHub:</strong> We run <code>git add .</code>, <code>git commit</code>, and <code>git push origin main</code>. This pushes all files to a public repository on GitHub.</p>
                  <p>3. <strong>Vercel Cloud:</strong> We connect Vercel to that GitHub repository. Every time you push code, Vercel automatically runs <code>npm run build</code> and serves the resulting HTML/JS files on a global content delivery network (CDN).</p>
                  <p>4. <strong>Result:</strong> Vercel gives a public live URL like <code>https://visionguard-cctv.vercel.app</code> that anyone can open in any browser.</p>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-lg space-y-2 font-sans">
                <h5 className="font-bold text-white text-xs font-mono">How to run the project locally on your computer:</h5>
                <ol className="list-decimal list-inside space-y-1 text-zinc-400">
                  <li>Open the terminal in VS Code.</li>
                  <li>Type <code className="text-white bg-black px-1.5 py-0.5 rounded font-mono">npm run dev</code> and press Enter.</li>
                  <li>Open <code className="text-white bg-black px-1.5 py-0.5 rounded font-mono">http://localhost:3000</code> in your browser.</li>
                </ol>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex justify-between items-center text-xs font-mono text-zinc-400">
          <span>Final Year Project Guide • Ruchitha</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-zinc-100 hover:bg-white text-black font-semibold rounded text-xs transition-colors"
          >
            Ready to Demo
          </button>
        </div>

      </div>
    </div>
  );
};
