<div align="center">

# ⚡ ASIAN WIRES & CABLES
**A brutalist, industrial, high-performance product matrix and procurement interface.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Anime.js](https://img.shields.io/badge/Anime.js-4.x-FF3300?style=for-the-badge&logo=javascript)](https://animejs.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)](https://threejs.org/)

</div>

---

## 📟 SYSTEM OVERVIEW
This platform replaces standard corporate brochures with a **high-fidelity, kinetic, and brutalist digital experience**. It features a modular GUI architecture, heavily inspired by retro CAD systems, legacy industrial software, and modern web GL performance.

Users navigate an interactive product catalog, configure custom specifications, view interactive 3D anatomy of cables, and generate automated real-time procurement quotes.

### 🏭 Core Modules
- **`HOMEVIEW.EXE`**: Kinetic hero dashboard with live market tickers, 3D rotating cable models, and dynamic application sector grid.
- **`CATALOGVIEW.EXE`**: Comprehensive Data Matrix functioning like an advanced spreadsheet, supporting grouping, nested variant viewing, filtering, and a live product comparison tool.
- **`PROCUREMENT.EXE`**: Automated pricing estimation calculator, simulating a legacy terminal interface to generate high-fidelity PO/RFQ quotes.
- **`AILAB.EXE`**: Experimental AI-driven QA testing terminal and predictive modeling interface.
- **`PLANTCAP.EXE`**: Visual representation of manufacturing capability, capacity, and production flows.

---

## 🏗️ TECHNOLOGICAL FOUNDATION

The application is built on a highly performant, modern frontend stack designed to handle intense typography, real-time 3D rendering, and staggered animations smoothly:

- **Framework**: `Next.js` (App Router) + `React`
- **Styling**: `Tailwind CSS` (Custom heavily-configured brutalist theme)
- **Fluid Animations**: 
  - `Framer Motion` (Layouts, page transitions, drag-and-drop elements)
  - `Anime.js (v4)` (Orchestrated DOM staggering, entering sequences, math-driven elasticity)
- **3D / WebGL**: `React Three Fiber` / `Drei` / `Three.js` (For interactive cable anatomy and floating 3D drum renders)
- **Icons**: `Lucide React`
- **Deployment**: Optimized for `Vercel`

---

## 🚀 GETTING STARTED

```bash
# 1. Clone the repository and CD into the directory
git clone https://github.com/rishigupta2004/Asian_Wires_-_Cables.git
cd Asian_Wires_-_Cables

# 2. Install dependencies
npm install
# or
yarn install

# 3. Spin up the local development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to initialize the system.

---

## 🎨 DESIGN SYSTEM & AESTHETICS

The design system firmly roots itself in an **Engineered Brutalism** aesthetic.

- **Primary Colors**: Absolute Black (`#0F0F0F`), Pure Red (`#FF3300`), Engineering Off-White (`#E4E3DB`), Blueprint Blue (`#0000AA`).
- **Typography**: 
  - **Mono**: High legibility, tracking-widest, uppercase terminal aesthetic (`Geist Mono` or similar system mono).
  - **Grotesk**: High impact, extremely bold headings (`Inter` or similar modern sans-serif).
  - **Serif (Accents)**: Elegant italic contrasting accents.
- **Visual Elements**: Deep solid black shadows (`4px 4px 0px #0F0F0F`), thick aggressive borders, visible halftones/blueprint grids, CRT scanlines, and registration marks.

---

## 📁 REPOSITORY STRUCTURE

```text
src/
├── app/                  # Next.js App Router entry points
├── components/
│   └── retro/            # The core retro-brutalist component library
│       ├── views/        # Main modular GUI "Executables" (Home, Catalog, Procurement, etc)
│       └── [Shared components: GUIWindow, BlueprintGrid, BasicElements, TextReveal, etc]
├── lib/
│   ├── catalogData.ts    # The Master Inventory Matrix Database
│   ├── constants.ts      # Brand architectures, global configs
│   └── utils.ts          # Helper functions (twMerge, clsx)
└── public/
    └── catalog_images/   # High-Fidelity rendered product assets
```

---

<div align="center">
<p className="font-mono text-xs opacity-50">
  // AUTHORIZED PERSONNEL ONLY // ISO 9001:2015 CERTIFIED // SYSTEM SECURE<br>
  ASIAN WIRES & CABLES INC.
</p>
</div>
