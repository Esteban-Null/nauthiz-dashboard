# NAUTHIZ Dashboard

A **cyberpunk-themed, real-time threat intelligence dashboard** with immersive spaceship-style UI. Query IOCs, visualize risk, and explore enriched threat data in real-time.

![Nauthiz Dashboard](./screenshots/dashboard-main.png)

## Features

- **Interactive IOC Scanner** – Query IPs, domains, hashes with real-time enrichment
- **Risk Visualization** – Pie charts, activity timeline, threat gauge
- **Live Stats** – Total queries, high-risk IOCs, response time
- **Cyberpunk UI** – Neon glassmorphism, scanlines, immersive animations
- **Query History** – Browse past lookups with scoring snapshots
- **Multi-Source Data** – VirusTotal, WHOIS, SecurityTrails enrichment

![Threat Scanner](./screenshots/query-results.png)
![Risk Charts](./screenshots/risk-charts.png)

## Quick Start

### Prerequisites
- Node.js 18+
- **Backend running** at `http://127.0.0.1:8000`

### Setup

```bash
npm install
npm run dev

## Environment Variables

Create `.env.local`:

VITE_API_KEY=your-api-key-from-the-backend
**Why this is necessary:**

The `VITE_` prefix tells Vite to expose this variable to the frontend at build time via `import.meta.env.VITE_API_KEY`.

- **Keeps key out of source code** – Use `.env.local` (git ignored)
- **Secure in CI/CD** – Set in deployment platform (Vercel, GitHub Actions)
- **Note:** Frontend keys are visible in browser DevTools anyway, so treat this as "config" not "security".

**Keep `.env.local` in `.gitignore` and:**
.env.local
.env.*.local

