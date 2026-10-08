# VisionGuard AI — Intelligent CCTV Video Analytics Platform

[![Vercel Deployment](https://img.shields.io/badge/Deployment-Vercel%20Ready-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React 18](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/UI-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Academic Project](https://img.shields.io/badge/Course-BCA%20Computer%20Science-emerald?style=for-the-badge)](https://github.com)

**VisionGuard AI** is a cutting-edge, browser-based Security Operations Center (SOC) and CCTV Video Analytics Platform engineered for college presentation, academic viva, and security operations demonstration.

It simulates enterprise-grade Computer Vision pipelines (YOLOv8 + DeepSORT + Spatial Rule Engines) completely within modern client-side web technologies, making it **100% serverless and zero-cost hostable on Vercel**.

---

## 🌟 Key Features

1. **6-Channel Live Surveillance Grid**:
   - Multi-camera synchronized feeds covering North Gate Turnstile, Server Vault (Restricted), Perimeter Fence, Corporate Lobby, Parking Zone, and Emergency Corridors.
   - Real-time video playback with automatic fallback to high-tech HTML5 Canvas simulation.

2. **Real-Time YOLOv8 Bounding Box Overlays**:
   - Live visual detection reticles tracking `Person`, `Vehicle (ANPR)`, `Backpack`, and `Intruder` with dynamic confidence scores and tracking IDs (`#TRK-401`).
   - Global and per-camera toggles for bounding boxes.

3. **Interactive Virtual Tripwire & Geofencing Tool**:
   - Security administrators can click directly on any camera feed to draw custom geometric boundary lines.
   - Built-in simulation trigger to demonstrate automated intrusion alarm firing upon boundary crossing.

4. **Dynamic Crowd Density Heatmaps**:
   - Thermal gradient spatial heatmaps highlighting high-traffic bottleneck zones.

5. **Live Incident Feed & Dispatch Stream**:
   - Priority-ranked alerts (Critical, Warning, Info) with subtle electronic chime notifications (via HTML5 Web Audio API).
   - Instant acknowledgement and camera focus integration.

6. **Executive Analytics Dashboard**:
   - Interactive charts built with Recharts displaying hourly pedestrian footfall flow (In vs Out).
   - Incident distribution donut charts and hardware GPU telemetry (Inference latency: 11.8ms, 29.8 FPS).

7. **Forensic Search Engine & CSV Audit Export**:
   - Multi-parameter historical log querying by camera, object class, and alert severity.
   - One-click export to download real `.csv` audit logs.

8. **🎓 Built-In College Viva & Presentation Helper Modal**:
   - Directly accessible from the navbar for Ruchitha!
   - Contains complete theoretical architecture, algorithm breakdowns (YOLOv8, DeepSORT, Kalman filters, RTSP), and the top 10 most frequently asked college viva questions with clear answers.

---

## 🏗️ System Architecture

```
┌─────────────────┐       RTSP (H.264/H.265)       ┌────────────────────────┐
│  6x IP Cameras  │ ─────────────────────────────▶ │ Video Stream Ingestion │
└─────────────────┘                                └────────────────────────┘
                                                                │
                                                                ▼
┌─────────────────────────┐   Frame Normalization   ┌────────────────────────┐
│ DeepSORT Multi-Tracking │ ◀────────────────────── │  YOLOv8x Object Engine │
│     (Kalman Filter)     │                         │   (Single-Shot Det)    │
└─────────────────────────┘                         └────────────────────────┘
             │
             ▼
┌─────────────────────────┐                         ┌────────────────────────┐
│  Spatial Rule Engine    │ ──────────────────────▶ │ WebSocket Event Bus &  │
│  (Tripwire & Heatmaps)  │                         │ React SOC Dashboard    │
└─────────────────────────┘                         └────────────────────────┘
```

---

## 🚀 Running the Project Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/visionguard-cctv-analytics.git
   cd visionguard-cctv-analytics
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to Vercel (1-Click Free Hosting)

Because this project is built entirely with client-side React and Vite:
1. Push your folder to a new repository on **GitHub**.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your GitHub repository.
4. Framework Preset will automatically detect **Vite**.
5. Click **"Deploy"**.
6. Within 30 seconds, Vercel will give you a live HTTPS link (e.g., `https://visionguard-ai.vercel.app`) that Ruchitha can share directly with her teachers!

---

## 👩‍🎓 Presentation / Viva Tips for Ruchitha

When presenting to evaluators:
1. Open the project link on a browser or projector.
2. Click the green **"Project Viva & Docs"** button in the top bar to show the professors that you understand the underlying Deep Learning architecture.
3. Click the **"Simulate AI Alert"** button or the **"Draw Tripwire"** button to show that the system is fully interactive.
4. Switch to the **"AI Analytics"** tab to demonstrate the footfall trends and safety metrics.
5. Click **"Audit CSV"** to demonstrate automated compliance and log archiving.

---
**Developed for Academic Evaluation • BCA Computer Science 2026**
