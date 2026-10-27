import { useEffect, useRef } from "react";
import useMacbookStore from "../store";

const Hero = () => {
    const videoRef = useRef(null);
    const { setBuyModalOpen } = useMacbookStore();

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.playbackRate = 2;

        const handleLoadedMetadata = () => {
            video.playbackRate = 2;
        };

        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        return () => {
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, []);

    return (
        <section
            id="hero"
            className="
                relative flex min-h-[100svh] w-full flex-col items-center justify-between
                overflow-x-clip px-4 pb-12 pt-24 text-center
                sm:px-6 sm:pt-28
                lg:pt-32
            "
        >
            {/* Subtle ambient top glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 w-[85vw] max-w-3xl h-48 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-orange-500/15 blur-3xl rounded-full"
            />

            {/* Title */}
            <div className="relative z-10 flex w-full flex-col items-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-medium text-white/80 mb-3 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                    M4 · M4 Pro · M4 Max
                </span>

                <h1
                    className="
                        mb-2 text-3xl font-semibold tracking-tight text-white
                         sm:text-5xl md:text-6xl
                    "
                >
                    MacBook Pro
                </h1>

                <img
                    src="/title.png"
                    alt="Built for Apple Intelligence"
                    className="
                        mx-auto block h-auto
                        w-full max-w-[300px] object-contain
                        sm:max-w-lg md:max-w-2xl lg:max-w-3xl
                    "
                />
            </div>

            {/* MacBook video */}
            <div
                className="
                    relative my-2 flex w-full
                    items-center justify-center
                    sm:my-4
                "
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
                        object-contain
                        sm:w-full sm:max-w-4xl
                        lg:max-w-5xl
                    "
                />
            </div>

            {/* CTA */}
            <div className="relative z-20 flex flex-col items-center gap-4">
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
                        Explore in 3D →
                    </a>
                </div>

                <p className="text-xs sm:text-sm md:text-base text-dark-100 font-semibold">
                    From $1,599 or $133.25/mo. for 12 mo.
                </p>
            </div>
        </section>
    );
};

export default Hero;
