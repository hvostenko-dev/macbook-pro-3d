import { Suspense } from "react";
import useMacbookStore from "../store";
import clsx from "clsx";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import StudioLights from "./three/StudioLights.jsx";
import ModelSwitcher from "./three/ModelSwitcher.jsx";
import { useMediaQuery } from "react-responsive";
import useInView from "../hooks/useInView.js";

const CanvasLoader = () => (
    <Html center>
        <div className="flex flex-col items-center gap-3 px-6 py-4 rounded-2xl bg-zinc-900/90 border border-white/10 backdrop-blur-xl shadow-2xl">
            <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-medium text-white/80 whitespace-nowrap tracking-wide">
                Loading 3D MacBook Pro...
            </span>
        </div>
    </Html>
);

const ProductViewer = () => {
    const { color, scale, setColor, setScale } = useMacbookStore();
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const [sectionRef, isInView] = useInView({ rootMargin: "0px" });

    const colorLabel = color === "#2e2c2e" ? "Space Black" : "Silver";
    const sizeLabel = scale === 0.08 ? '16"' : '14"';
    const computedScale = isMobile ? (scale === 0.08 ? 0.052 : 0.038) : scale;

    return (
        <section
            id="product-viewer"
            ref={sectionRef}
            className="container relative mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-8"
        >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
                <div>
                    <p className="text-xs sm:text-sm uppercase tracking-widest text-primary font-semibold mb-1">
                        Interactive 3D Studio
                    </p>
                    <h2 className="text-white font-semibold text-3xl sm:text-5xl lg:text-6xl tracking-tight">
                        Take a closer look.
                    </h2>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400">
                    Drag to rotate 360° · Releases smoothly back to center
                </p>
            </div>

            <div className="relative w-full h-[58vh] sm:h-[70vh] lg:h-[82vh] rounded-3xl bg-gradient-to-b from-zinc-900/40 via-zinc-950/60 to-black border border-white/10 overflow-hidden">
                <Canvas
                    id="canvas"
                    className="!w-full !h-full cursor-grab active:cursor-grabbing"
                    camera={{ position: [0, 2, 5], fov: isMobile ? 48 : 50, near: 0.1, far: 100 }}
                    dpr={[1, 1.5]}
                    frameloop={isInView ? "always" : "never"}
                    gl={{
                        powerPreference: "high-performance",
                        antialias: true,
                        alpha: true,
                    }}
                >
                    <Suspense fallback={<CanvasLoader />}>
                        <StudioLights />
                        <ModelSwitcher scale={computedScale} />
                    </Suspense>
                </Canvas>

                {/* Floating Controls Dock */}
                <div className="absolute z-40 bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 w-[92%] sm:w-auto max-w-md flex flex-col items-center gap-2.5 pointer-events-auto">
                    <div className="px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs text-white/90 font-medium shadow-md">
                        {sizeLabel} MacBook Pro in <span className="text-white font-semibold">{colorLabel}</span>
                    </div>

                    <div className="flex items-center justify-center gap-3 sm:gap-4 bg-zinc-900/85 backdrop-blur-xl border border-white/15 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-2xl">
                        {/* Color Picker */}
                        <div className="flex items-center gap-2.5 pr-3 border-r border-white/15" role="group" aria-label="Choose finish">
                            <button
                                type="button"
                                aria-label="Silver finish"
                                onClick={() => setColor("#adb5bd")}
                                className={clsx(
                                    "size-7 rounded-full bg-neutral-300 transition-all cursor-pointer",
                                    color === "#adb5bd"
                                        ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-105"
                                        : "opacity-70 hover:opacity-100"
                                )}
                            />
                            <button
                                type="button"
                                aria-label="Space Black finish"
                                onClick={() => setColor("#2e2c2e")}
                                className={clsx(
                                    "size-7 rounded-full bg-neutral-800 border border-white/20 transition-all cursor-pointer",
                                    color === "#2e2c2e"
                                        ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-105"
                                        : "opacity-70 hover:opacity-100"
                                )}
                            />
                        </div>

                        {/* Size Switcher */}
                        <div className="flex items-center gap-1.5" role="group" aria-label="Choose display size">
                            <button
                                type="button"
                                onClick={() => setScale(0.06)}
                                className={clsx(
                                    "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer",
                                    scale === 0.06
                                        ? "bg-white text-black shadow"
                                        : "text-white/80 hover:text-white hover:bg-white/10"
                                )}
                            >
                                14"
                            </button>
                            <button
                                type="button"
                                onClick={() => setScale(0.08)}
                                className={clsx(
                                    "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer",
                                    scale === 0.08
                                        ? "bg-white text-black shadow"
                                        : "text-white/80 hover:text-white hover:bg-white/10"
                                )}
                            >
                                16"
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductViewer;
