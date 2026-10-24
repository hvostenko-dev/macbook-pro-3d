# 💻 Apple MacBook Pro Showcase (3D & WebGL)

An interactive, high-fidelity clone of Apple's MacBook Pro product experience. Built with React, Three.js, and GSAP, this project features realistic 3D laptop interactions, dynamic lid opening/closing mechanisms, responsive screen textures, and scroll-driven cinematic storytelling.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## 🎯 Features

- **Interactive 3D MacBook Model:** Realistic rendering of materials (aluminum body, glass display, backlit keyboard) powered by Three.js and React Three Fiber.
- **Scroll-Controlled Lid Mechanism:** Kinematic hinge animations mapped directly to page scroll positions or interactive slider inputs.
- **Interactive Screen Content:** Embedded interactive HTML/canvas views rendered seamlessly onto the 3D laptop display using `@react-three/drei` primitives.
- **Color & Size Customization:** Real-time switching between chassis finishes (Space Black, Silver) and screen dimensions.
- **Cinematic Camera Choreography:** Smooth GSAP camera tracks synchronized with storytelling text sections.

---

## 🛠 Tech Stack

- **Framework:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **3D Graphics:** [Three.js](https://threejs.org/) via [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) & [@react-three/drei](https://github.com/pmndrs/drei)
- **Animation:** [GSAP](https://gsap.com/) & ScrollTrigger
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons & Assets:** Lucide React

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (`v18.0.0` or higher)
- Package manager: `npm`, `pnpm`, or `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/ilyajavadeveloper/macbook_apple-app.git](https://github.com/ilyajavadeveloper/macbook_apple-app.git)
   cd macbook_apple-app
