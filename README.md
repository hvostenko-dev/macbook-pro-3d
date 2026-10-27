# MacBook Pro (M4 Family) — Interactive 3D Showcase

An Apple-inspired interactive product showcase for the **MacBook Pro (M4, M4 Pro, and M4 Max)** built with **React 19**, **Three.js (@react-three/fiber & @react-three/drei)**, **GSAP ScrollTrigger**, **Zustand**, and **Tailwind CSS v4**.

---

## Key Features

- **Interactive 3D Product Studio (`ProductViewer`)**:
  - Real-time 360° inspection using `@react-three/drei` `PresentationControls` with spring physics.
  - Seamless GSAP-powered switching between **14-inch** and **16-inch** GLTF models and dynamic material recoloring (**Space Black** & **Silver**).
- **Scroll-Driven 3D Storytelling (`Features` & `Showcase`)**:
  - Pinned scroll timelines using **GSAP ScrollTrigger** that rotate the 3D MacBook Pro and dynamically swap live HTML5 video textures on the 3D screen mesh.
  - Mobile-optimized interactive mode with touch-friendly feature cards and smooth camera/model transitions.
- **Interactive Apple Silicon Benchmark & Spec Dashboard (`ChipComparison`)**:
  - Live comparison across **M4**, **M4 Pro**, and **M4 Max** architectures with animated benchmark bars and unified memory metrics.
- **Interactive Store Configurator Modal (`BuyModal`)**:
  - Full configuration flow (Display size, Apple Silicon chip, Finish synced with the 3D viewer, and SSD Storage) with dynamic pricing and monthly financing calculation.
- **Mobile-First Responsive Design**:
  - Glassmorphic navigation bar with mobile drawer and quick section search, adaptive bento grids for mobile graphics performance, and high-DPI canvas rendering.

---

## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | React 19 + Vite 8 |
| **3D Graphics** | Three.js, `@react-three/fiber`, `@react-three/drei` |
| **Animations** | GSAP 3 (`ScrollTrigger`, `@gsap/react`) |
| **State Management** | Zustand |
| **Styling** | Tailwind CSS v4 |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```
