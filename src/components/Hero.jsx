import { useEffect, useRef, useState, useCallback } from "react";
import useMacbookStore from "../store";
import useInView from "../hooks/useInView.js";
import { playAppleStartupChime } from "../utils/audio.js";
import clsx from "clsx";

const Hero = () => {
    const videoRef = useRef(null);
    const [sectionRef, isInView] = useInView({ rootMargin: "150px" });
    const { color, setColor, setBuyModalOpen } = useMacbookStore();

    const [isOpened, setIsOpened] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [isReplaying, setIsReplaying] = useState(false);

    // Optimized playback speed (1.65x instead of 2x for smooth 60fps hardware decode without frame drops)
    const PLAYBACK_RATE = 1.65;

    // Helper to safely play video with hardware acceleration and autoplay compliance
    const playVideo = useCallback(() => {
        const video = videoRef.current;
        if (!video || video.ended) return;

        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;

        try {
            video.playbackRate = PLAYBACK_RATE;
        } catch {
            // Media element might not be fully initialized
        }

        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    setIsPlaying(true);
                })
                .catch(() => {
                    setIsPlaying(false);
                });
        }
    }, [PLAYBACK_RATE]);

    // Main playback controller
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;

        const setPlaybackSpeed = () => {
            try {
                video.playbackRate = PLAYBACK_RATE;
            } catch {
                // Ignore if media element is not ready
            }
        };

        setPlaybackSpeed();
        playVideo();

        const handleLoadedMetadata = () => {
            setPlaybackSpeed();
            if (!video.ended && video.paused) {
                playVideo();
            }
        };

        const handleCanPlay = () => {
            setPlaybackSpeed();
            if (!video.ended && video.paused) {
                playVideo();
            }
        };

        const handleEnded = () => {
            setIsOpened(true);
            setIsPlaying(false);
            setIsReplaying(false);
        };

        const handlePlaying = () => {
            setIsPlaying(true);
        };

        let resumeTimer;
        const handlePause = () => {
            setIsPlaying(false);
            if (!video.ended && document.visibilityState === "visible") {
                clearTimeout(resumeTimer);
                resumeTimer = setTimeout(() => {
                    if (video && !video.ended && video.paused && document.visibilityState === "visible") {
                        playVideo();
                    }
                }, 80);
            }
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible" && !video.ended && video.paused) {
                playVideo();
            }
        };

        const handleUserGesture = () => {
            if (!video.ended && video.paused) {
                playVideo();
            }
        };

        // Watchdog fail-safe to ensure lid never stays halfway open
        const watchdogTimer = setTimeout(() => {
            if (video && !video.ended) {
                if (video.paused) {
                    playVideo();
                }
                setTimeout(() => {
                    if (video && !video.ended && video.paused) {
                        video.currentTime = video.duration || 5;
                        setIsOpened(true);
                    }
                }, 1200);
            }
        }, 4000);

        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        video.addEventListener("canplay", handleCanPlay);
        video.addEventListener("canplaythrough", handleCanPlay);
        video.addEventListener("ended", handleEnded);
        video.addEventListener("playing", handlePlaying);
        video.addEventListener("pause", handlePause);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        window.addEventListener("pointerdown", handleUserGesture, { once: true, passive: true });
        window.addEventListener("touchstart", handleUserGesture, { once: true, passive: true });
        window.addEventListener("scroll", handleUserGesture, { once: true, passive: true });
        window.addEventListener("keydown", handleUserGesture, { once: true, passive: true });

        return () => {
            clearTimeout(resumeTimer);
            clearTimeout(watchdogTimer);
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
            video.removeEventListener("canplay", handleCanPlay);
            video.removeEventListener("canplaythrough", handleCanPlay);
            video.removeEventListener("ended", handleEnded);
            video.removeEventListener("playing", handlePlaying);
            video.removeEventListener("pause", handlePause);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("pointerdown", handleUserGesture);
            window.removeEventListener("touchstart", handleUserGesture);
            window.removeEventListener("scroll", handleUserGesture);
            window.removeEventListener("keydown", handleUserGesture);
        };
    }, [playVideo, PLAYBACK_RATE]);

    // Resume when scrolling back into Hero viewport
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isInView && !video.ended && video.paused) {
            playVideo();
        }
    }, [isInView, playVideo]);

    // Handle replay with optional sound
    const handleReplay = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        setIsReplaying(true);
        setIsOpened(false);
        video.currentTime = 0;

        if (soundEnabled) {
            playAppleStartupChime();
        }

        playVideo();
    }, [playVideo, soundEnabled]);

    // Interactive laptop click
    const handleVideoClick = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.ended || isOpened) {
            handleReplay();
        } else if (video.paused) {
            if (soundEnabled) {
                playAppleStartupChime();
            }
            playVideo();
        }
    };

    const toggleSound = () => {
        const nextState = !soundEnabled;
        setSoundEnabled(nextState);
        if (nextState) {
            playAppleStartupChime();
        }
    };

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="
                relative flex min-h-[100svh] w-full flex-col items-center justify-between
                overflow-x-clip px-4 pb-8 pt-24 text-center
                sm:px-6 sm:pt-28 sm:pb-12
                lg:pt-32
            "
        >
            {/* Ambient dynamic glow adapted to selected finish */}
            <div
                aria-hidden="true"
                className={clsx(
                    "pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 w-[90vw] max-w-4xl h-56 blur-3xl rounded-full transition-all duration-700 transform-gpu",
                    color === "#2e2c2e"
                        ? "bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-orange-500/15 opacity-80"
                        : "bg-gradient-to-r from-cyan-400/20 via-blue-500/15 to-indigo-500/20 opacity-90"
                )}
            />

            {/* Header Title Section */}
            <div className="relative z-10 flex w-full flex-col items-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/90 mb-3 backdrop-blur-md shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                    <span>M4 · M4 Pro · M4 Max</span>
                    <span className="text-white/30">|</span>
                    <span className="text-zinc-300">Apple Intelligence</span>
                </div>

                <h1 className="mb-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    MacBook Pro
                </h1>

                <img
                    src="/title.webp"
                    alt="Built for Apple Intelligence"
                    className="
                        mx-auto block h-auto
                        w-full max-w-[290px] object-contain
                        sm:max-w-lg md:max-w-2xl lg:max-w-3xl
                    "
                />
            </div>

            {/* MacBook Showcase Container */}
            <div className="relative my-2 sm:my-3 flex w-full flex-col items-center justify-center">
                {/* Apple Intelligence Aurora Glow when display is active */}
                <div
                    aria-hidden="true"
                    className={clsx(
                        "pointer-events-none absolute inset-0 m-auto w-[85%] max-w-3xl h-[60%] rounded-full blur-2xl transition-opacity duration-1000 transform-gpu",
                        isOpened
                            ? "opacity-60 bg-gradient-to-r from-blue-500/25 via-purple-500/30 to-pink-500/25 animate-pulse"
                            : "opacity-0"
                    )}
                />

                {/* Video Container with Hardware Acceleration */}
                <div
                    onClick={handleVideoClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            handleVideoClick();
                        }
                    }}
                    title={isOpened ? "Click to replay opening animation" : "Click to open MacBook"}
                    className="relative group cursor-pointer flex items-center justify-center focus:outline-none"
                    style={{ transform: "translate3d(0, 0, 0)", willChange: "transform" }}
                >
                    <video
                        ref={videoRef}
                        src="/videos/hero.mp4"
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                        className="
                            relative block h-auto
                            w-[125vw] max-w-none
                            aspect-[24/7]
                            object-contain transform-gpu will-change-transform
                            sm:w-full sm:max-w-4xl
                            lg:max-w-5xl
                            transition-transform duration-300
                            group-hover:scale-[1.01]
                        "
                    />

                    {/* Hint overlay badge */}
                    <div className="absolute top-2 sm:top-4 right-4 sm:right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <span className="px-3 py-1 rounded-full bg-black/75 border border-white/15 text-[11px] text-white/90 backdrop-blur-md shadow-lg">
                            {isOpened ? "↺ Click to replay" : "▶ Click to open"}
                        </span>
                    </div>
                </div>

                {/* Sleek Floating Quick-Control Dock */}
                <div className="relative z-30 mt-1 flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4">
                    {/* Finish Quick Selector */}
                    <div className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full shadow-lg">
                        <span className="text-[11px] font-medium text-zinc-400 hidden sm:inline">Finish:</span>
                        <button
                            type="button"
                            onClick={() => setColor("#2e2c2e")}
                            aria-label="Select Space Black finish"
                            className={clsx(
                                "flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium transition cursor-pointer",
                                color === "#2e2c2e"
                                    ? "bg-white/20 text-white border border-white/20 shadow-sm"
                                    : "text-zinc-400 hover:text-white"
                            )}
                        >
                            <span className="w-2.5 h-2.5 rounded-full bg-[#2e2c2e] border border-white/30" />
                            <span>Space Black</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setColor("#adb5bd")}
                            aria-label="Select Silver finish"
                            className={clsx(
                                "flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium transition cursor-pointer",
                                color === "#adb5bd"
                                    ? "bg-white/20 text-white border border-white/20 shadow-sm"
                                    : "text-zinc-400 hover:text-white"
                            )}
                        >
                            <span className="w-2.5 h-2.5 rounded-full bg-[#adb5bd] border border-white/30" />
                            <span>Silver</span>
                        </button>
                    </div>

                    {/* Startup Chime Sound Button */}
                    <button
                        type="button"
                        onClick={toggleSound}
                        title={soundEnabled ? "Mute startup chime" : "Enable Apple startup chime sound"}
                        className={clsx(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium backdrop-blur-xl transition cursor-pointer shadow-lg",
                            soundEnabled
                                ? "bg-primary/20 border-primary text-white"
                                : "bg-zinc-900/80 border-white/10 text-zinc-400 hover:text-white"
                        )}
                    >
                        {soundEnabled ? (
                            <>
                                <span className="flex items-end gap-0.5 h-3">
                                    <span className="w-0.5 h-2 bg-primary rounded-full animate-pulse" />
                                    <span className="w-0.5 h-3 bg-primary rounded-full animate-pulse delay-75" />
                                    <span className="w-0.5 h-1.5 bg-primary rounded-full animate-pulse delay-150" />
                                </span>
                                <span>Chime: On</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-3.5 h-3.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                                    <line x1="23" y1="9" x2="17" y2="15" />
                                    <line x1="17" y1="9" x2="23" y2="15" />
                                </svg>
                                <span>Chime</span>
                            </>
                        )}
                    </button>

                    {/* Replay Button */}
                    <button
                        type="button"
                        onClick={handleReplay}
                        aria-label="Replay opening animation"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800/90 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white backdrop-blur-xl transition cursor-pointer shadow-lg"
                    >
                        <span className={clsx("transition-transform duration-500", isReplaying && "rotate-180")}>
                            ↺
                        </span>
                        <span>Replay</span>
                    </button>

                    {/* Status Badge */}
                    <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-white/10 text-[11px] text-zinc-400">
                        <span
                            className={clsx(
                                "w-1.5 h-1.5 rounded-full transition-colors duration-300",
                                isOpened ? "bg-emerald-400" : isPlaying ? "bg-blue-400 animate-ping" : "bg-zinc-500"
                            )}
                        />
                        <span>{isOpened ? "Liquid Retina XDR Active" : "Opening..."}</span>
                    </div>
                </div>
            </div>

            {/* Quick Specs Matrix Bar */}
            <div className="relative z-20 my-3 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full max-w-2xl px-2">
                <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
                    <p className="text-white font-semibold text-xs sm:text-sm">M4 Pro / Max</p>
                    <p className="text-zinc-400 text-[10px] sm:text-xs">Up to 16-core CPU</p>
                </div>
                <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
                    <p className="text-white font-semibold text-xs sm:text-sm">24 Hours</p>
                    <p className="text-zinc-400 text-[10px] sm:text-xs">Longest battery life</p>
                </div>
                <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
                    <p className="text-white font-semibold text-xs sm:text-sm">1,600 nits</p>
                    <p className="text-zinc-400 text-[10px] sm:text-xs">Peak HDR brightness</p>
                </div>
                <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
                    <p className="text-white font-semibold text-xs sm:text-sm">Apple Intelligence</p>
                    <p className="text-zinc-400 text-[10px] sm:text-xs">Personal & Private</p>
                </div>
            </div>

            {/* CTA & Pricing */}
            <div className="relative z-20 flex flex-col items-center gap-3">
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                    <button
                        type="button"
                        onClick={() => setBuyModalOpen(true)}
                        className="
                            min-h-11 rounded-full bg-primary
                            px-7 py-2.5 text-sm sm:text-base font-semibold text-white
                            shadow-lg shadow-blue-600/30
                            transition duration-300 cursor-pointer
                            hover:-translate-y-0.5 hover:bg-blue-500
                            active:translate-y-0
                        "
                    >
                        Buy
                    </button>

                    <a
                        href="#product-viewer"
                        className="
                            min-h-11 inline-flex items-center justify-center rounded-full
                            border border-white/20 bg-white/5 hover:bg-white/10
                            px-6 py-2.5 text-sm sm:text-base font-semibold text-white
                            backdrop-blur-md transition duration-300
                        "
                    >
                        Explore in 3D ↓
                    </a>
                </div>

                <p className="text-xs sm:text-sm text-dark-100 font-semibold">
                    From $1,599 or $133.25/mo. for 12 mo.
                </p>
            </div>
        </section>
    );
};

export default Hero;
