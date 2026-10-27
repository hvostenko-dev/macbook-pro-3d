# 💻 Apple MacBook Pro (M4 Family) — 3D & WebGL Showcase

An interactive, high-fidelity Apple MacBook Pro product experience powered by **React 19**, **Three.js (@react-three/fiber & @react-three/drei)**, **GSAP ScrollTrigger**, **Zustand**, and **Tailwind CSS v4**.

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## 🎯 Key Features

- **Interactive 3D MacBook Studio (`ProductViewer`)**:
  - Real-time 360° inspection using `@react-three/drei` `PresentationControls` with spring-physics snapping.
  - Seamless GSAP-animated switching between **14-inch** and **16-inch** GLTF models and dynamic chassis finish customization (**Space Black** & **Silver**).
- **Scroll-Driven 3D Storytelling & Live Video Textures (`Features` & `Showcase`)**:
  - Pinned scroll timelines using **GSAP ScrollTrigger** that rotate the 3D MacBook Pro and dynamically project HTML5 video textures onto the 3D laptop screen.
  - **Mobile-First Interactive Mode**: Touch-friendly feature selector cards on smartphones and tablets that smoothly rotate the 3D model and swap live video feeds without trapping mobile scroll.
- **Interactive Apple Silicon Benchmark & Spec Dashboard (`ChipComparison`)**:
  - Live comparison across **M4**, **M4 Pro**, and **M4 Max** architectures with animated benchmark bars and unified memory metrics.
- **Store Configurator & Checkout Modal (`BuyModal`)**:
  - Full customization flow (Display size, Apple Silicon chip, Finish synced with the 3D studio, and SSD Storage) with dynamic pricing and monthly financing calculation.
- **Adaptive Mobile & Desktop UX**:
  - Glassmorphic navigation bar with mobile drawer and instant section search (`NavBar`), responsive bento grid for mobile graphics performance (`Performance`), and high-DPI WebGL rendering.

---

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [Vite 8](https://vite.dev/) |
| **3D & WebGL** | [Three.js](https://threejs.org/), `@react-three/fiber`, `@react-three/drei` |
| **Animation** | [GSAP 3](https://gsap.com/) (`ScrollTrigger`, `@gsap/react`) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `v18.0.0` or higher
- Package manager: `npm`, `pnpm`, or `yarn`

### Installation & Commands

```bash
# 1. Clone the repository
git clone https://github.com/ilyajavadeveloper/macbook_apple-app.git
cd macbook_apple-app

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Run ESLint verification
npm run lint

# 5. Build for production
npm run build
```
