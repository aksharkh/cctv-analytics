import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  HelpCircle, 
  Check, 
  Copy,
  User,
  Code
} from 'lucide-react';

export const VivaHelpModal = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const simpleQuestions = [
    {
      q: "1. What is this project about?",
      a: "This is a CCTV Video Analytics Platform designed for campus and building security. It monitors 6 camera feeds simultaneously, demonstrates how computer vision detects people and vehicles with bounding boxes, detects intrusions into restricted areas, and provides an analytics dashboard for visitor footfall."
    },
    {
      q: "2. What technologies did you use to build this?",
      a: "I built the user interface and analytics dashboard using React.js, Vite, and Tailwind CSS. I used Recharts for creating the traffic and incident charts, and HTML5 Canvas to render the simulated CCTV camera feeds with real-time bounding box tracking."
    },
    {
      q: "3. How does the object detection and bounding box feature work?",
      a: "The system is based on the YOLO (You Only Look Once) object detection concept. For every video frame, the model predicts the coordinates (X, Y, width, height) of objects like 'Person' or 'Car'. In my application, green boxes are drawn around authorized persons and vehicles. If an intruder enters a restricted zone like the Server Room, the bounding box turns red and fires an incident alert."
    },
    {
      q: "4. What is the Virtual Tripwire feature?",
      a: "A Virtual Tripwire is an invisible digital boundary line drawn on a camera feed. When a person walks across that line in a restricted area, the system detects that the object's position crossed the boundary coordinates and immediately triggers an intrusion alarm."
    },
    {
      q: "5. What are the key modules in your project?",
      a: "1) Live Multi-Camera Grid (6 video channels)\n2) Real-Time Incident & Alert Feed\n3) Interactive Virtual Tripwire Configurator\n4) Footfall & Security Analytics Dashboard\n5) Forensic Event Search with CSV Export."
    },
    {
      q: "6. Where is the project hosted and how did you deploy it?",
      a: "The project is hosted on Vercel. I configured it as a React Vite project and pushed the code to GitHub, where Vercel automatically builds and provides a public live URL for demonstration."
    },
    {
      q: "7. Why did you choose React for the frontend?",
      a: "React uses component-based architecture and a virtual DOM, which makes it fast and responsive when updating multiple live camera feeds, timers, and streaming alert notifications simultaneously without freezing the webpage."
    },
    {
      q: "8. What are the future enhancements you can add?",
      a: "In the future, I can connect it to real RTSP IP camera hardware using a Python OpenCV backend, add facial recognition for student ID badges, and integrate SMS/email alerts to security staff."
    }
  ];

  const copyAnswer = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-950 border border-zinc-700 w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Project Information & Viva Cheat Sheet
              </h3>
              <p className="text-xs text-zinc-400">
                Prepared for Ruchitha • BCA Computer Science Final Project
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-zinc-300">
          
          {/* Student Introduction Box */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
            <h4 className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-zinc-400" />
              <span>How to introduce this project to your teachers:</span>
            </h4>
            <p className="text-zinc-300 leading-relaxed italic bg-black/50 p-2.5 rounded border border-zinc-800/80">
              "Good morning teachers. My project is a <strong>CCTV Video Analytics Platform</strong>. I developed the frontend application in React and Tailwind CSS to demonstrate how modern surveillance cameras automatically detect people and vehicles, trigger alerts for unauthorized intrusions, and present footfall analytics on a centralized dashboard."
            </p>
          </div>

          {/* Simple Viva Q&A */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white font-mono uppercase tracking-wider text-[11px]">
              Frequently Asked Viva Questions & Answers:
            </h4>

            {simpleQuestions.map((item, idx) => (
              <div key={idx} className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-3">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h5 className="font-semibold text-zinc-200">
                    {item.q}
                  </h5>
                  <button
                    onClick={() => copyAnswer(`${item.q}\n\n${item.a}`, idx)}
                    className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 shrink-0 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700"
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

        </div>

        {/* Footer */}
        <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex justify-between items-center text-xs font-mono text-zinc-400">
          <span>BCA 2026 • Ready for Presentation</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-zinc-100 hover:bg-white text-black font-semibold rounded text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
