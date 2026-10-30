import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights.jsx";
import { features } from "../constants/index.js";
import clsx from "clsx";
import { Suspense, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import MacbookModel from "./models/Macbook.jsx";
import { useMediaQuery } from "react-responsive";
import useMacbookStore from "../store/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useInView from "../hooks/useInView.js";

const ModelScroll = () => {
    const groupRef = useRef(null);
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const { setTexture, setActiveFeature, activeFeature } = useMacbookStore();

    useGSAP(() => {
        if (isMobile) return;

        // 3D MODEL ROTATION ANIMATION (Desktop)
        const modelTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#f-canvas",
                start: "top top",
                end: "bottom top",
                scrub: 1,
                pin: true,
            },
        });

        // SYNC THE FEATURE CONTENT (Desktop)
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#f-canvas",
                start: "top center",
                end: "bottom top",
                scrub: 1,
            },
        });

        if (groupRef.current) {
            modelTimeline.to(groupRef.current.rotation, {
                y: Math.PI * 2,
                ease: "power1.inOut",
            });
        }

        timeline
            .call(() => {
                setTexture("/videos/feature-1.mp4");
                setActiveFeature(1);
            })
            .to(".box1", { opacity: 1, y: 0, delay: 0.4 })

            .call(() => {
                setTexture("/videos/feature-2.mp4");
                setActiveFeature(2);
            })
            .to(".box2", { opacity: 1, y: 0 })

            .call(() => {
                setTexture("/videos/feature-3.mp4");
                setActiveFeature(3);
            })
            .to(".box3", { opacity: 1, y: 0 })

            .call(() => {
                setTexture("/videos/feature-4.mp4");
                setActiveFeature(4);
            })
            .to(".box4", { opacity: 1, y: 0 })

            .call(() => {
                setTexture("/videos/feature-5.mp4");
                setActiveFeature(5);
            })
            .to(".box5", { opacity: 1, y: 0 });
    }, [isMobile]);

    // Gentle rotation when user selects a feature on mobile
    useEffect(() => {
        if (isMobile && groupRef.current) {
            gsap.to(groupRef.current.rotation, {
                y: ((activeFeature - 1) * Math.PI) / 6 - 0.25,
                duration: 0.8,
                ease: "power2.out",
            });
        }
    }, [activeFeature, isMobile]);

    return (
        <group ref={groupRef}>
            <Suspense
                fallback={
                    <Html center>
                        <div className="px-4 py-2 rounded-full bg-zinc-900/90 border border-white/10 text-white text-xs font-medium whitespace-nowrap">
                            Loading 3D Model...
                        </div>
                    </Html>
                }
            >
                <MacbookModel scale={isMobile ? 0.055 : 0.08} position={[0, -1, 0]} />
            </Suspense>
        </group>
    );
};

const Features = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const { activeFeature, setActiveFeature, setTexture } = useMacbookStore();
    const [sectionRef, isInView] = useInView({ rootMargin: "350px" });

    // Lazy-load other feature videos only when Features enters view
    useEffect(() => {
        if (!isInView) return;

        features.forEach((feature) => {
            const v = document.createElement("video");
            Object.assign(v, {
                src: feature.videoPath,
                muted: true,
                playsInline: true,
                preload: "metadata",
                crossOrigin: "anonymous",
            });
        });
    }, [isInView]);

    const handleSelectFeature = (feature) => {
        setActiveFeature(feature.id);
        setTexture(feature.videoPath);
    };

    const currentFeature = features.find((f) => f.id === activeFeature) || features[0];

    return (
        <section id="features" ref={sectionRef} className="pt-24 lg:pt-40 relative">
            <div className="px-4 text-center mb-6 lg:mb-0">
                <p className="text-xs sm:text-sm uppercase tracking-widest text-primary font-semibold mb-2">
                    Apple Intelligence
                </p>
                <h2>See it all in a new light.</h2>
            </div>

            <div className="relative">
                <Canvas
                    id="f-canvas"
                    className={clsx(
                        "!w-full relative z-30",
                        isMobile ? "!h-[44vh] sm:!h-[52vh]" : "!h-dvh"
                    )}
                    camera={{ position: [0, 0, 5], fov: isMobile ? 45 : 50 }}
                    dpr={[1, 1.5]}
                    frameloop={isInView ? "always" : "never"}
                    gl={{
                        powerPreference: "high-performance",
                        antialias: true,
                        alpha: true,
                    }}
                >
                    <StudioLights />
                    <ambientLight intensity={0.5} />
                    <ModelScroll />
                </Canvas>

                {/* Desktop Scroll-Synced Floating Callouts */}
                <div className="hidden lg:block absolute inset-0 pointer-events-none z-40">
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            onClick={() => handleSelectFeature(feature)}
                            className={clsx(
                                "box pointer-events-auto cursor-pointer p-5 rounded-2xl bg-zinc-900/75 backdrop-blur-xl border transition-colors duration-300",
                                activeFeature === feature.id
                                    ? "border-primary/60 shadow-lg shadow-blue-500/10"
                                    : "border-white/10 hover:border-white/25",
                                `box${index + 1}`,
                                feature.styles
                            )}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <img src={feature.icon} alt={feature.highlight} className="w-6 h-6" />
                                <span className="text-white font-semibold text-lg">
                                    {feature.highlight}
                                </span>
                            </div>
                            <p className="!text-sm !leading-relaxed text-zinc-300">
                                {feature.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile & Tablet Interactive Feature Switcher */}
            <div className="lg:hidden container mx-auto px-4 mt-4 relative z-40">
                {/* Active Feature Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/90 border border-white/15 backdrop-blur-xl mb-4 shadow-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-xl bg-white/10">
                            <img
                                src={currentFeature.icon}
                                alt={currentFeature.highlight}
                                className="w-6 h-6"
                            />
                        </div>
                        <div>
                            <span className="text-[11px] uppercase tracking-wider text-primary font-semibold block">
                                Live on 3D Screen ({currentFeature.id} / {features.length})
                            </span>
                            <h3 className="text-white font-semibold text-lg sm:text-xl">
                                {currentFeature.highlight}
                            </h3>
                        </div>
                    </div>
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                        {currentFeature.text}
                    </p>
                </div>

                {/* Pill Selector Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {features.map((feature) => {
                        const isActive = activeFeature === feature.id;
                        return (
                            <button
                                key={feature.id}
                                type="button"
                                onClick={() => handleSelectFeature(feature)}
                                className={clsx(
                                    "flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer border",
                                    isActive
                                        ? "bg-white text-black border-white shadow-md"
                                        : "bg-zinc-900/70 text-white/80 border-white/10 hover:bg-zinc-800"
                                )}
                            >
                                <img
                                    src={feature.icon}
                                    alt=""
                                    className={clsx("w-4 h-4 shrink-0", isActive && "invert")}
                                />
                                <span className="truncate">{feature.highlight.replace(".", "")}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;
