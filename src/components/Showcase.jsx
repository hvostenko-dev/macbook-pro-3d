import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useInView from "../hooks/useInView.js";

const Showcase = () => {
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
    const videoRef = useRef(null);
    const [sectionRef, isInView] = useInView({ rootMargin: "400px" });

    // Lazy load the heavy 13.5MB video only when approaching viewport
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isInView) {
            if (!video.src || !video.src.includes("game.mp4")) {
                video.src = "/videos/game.mp4";
                video.load();
            }
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    }, [isInView]);

    useGSAP(() => {
        if (!isTablet) {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: "#showcase",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    pin: true,
                },
            });

            timeline
                .to(".mask img", {
                    transform: "scale(1.1)",
                })
                .to(".content", { opacity: 1, y: 0, ease: "power1.in" });
        } else {
            gsap.fromTo(
                "#showcase .content",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: "#showcase .content",
                        start: "top 85%",
                    },
                }
            );
        }
    }, [isTablet]);

    return (
        <section id="showcase" ref={sectionRef} className="mt-16 lg:mt-0">
            <div className="media relative overflow-hidden max-lg:rounded-3xl max-lg:mx-4 max-lg:border max-lg:border-white/10">
                <video
                    ref={videoRef}
                    loop
                    muted
                    playsInline
                    preload="none"
                    className="w-full h-[38vh] sm:h-[50vh] lg:h-auto object-cover object-center"
                />
                <div className="mask flex items-center justify-center">
                    <img src="/mask-logo.svg" alt="Apple M4 Mask" />
                </div>
            </div>

            <div className="content">
                <div className="wrapper">
                    <div className="lg:max-w-md">
                        <p className="text-xs sm:text-sm uppercase tracking-widest text-primary font-semibold mb-2">
                            Next-Gen Silicon
                        </p>
                        <h2>Rocket Chip.</h2>

                        <div className="space-y-4 sm:space-y-5 mt-5 sm:mt-7 lg:pe-10 text-base sm:text-lg leading-relaxed">
                            <p>
                                Introducing{" "}
                                <span className="text-white">
                                    M4, M4 Pro, and M4 Max — the next generation of Apple silicon
                                </span>
                                . Built using second-generation 3-nanometer technology, the M4 family brings phenomenal speed and power efficiency to MacBook Pro.
                            </p>
                            <p>
                                It drives Apple Intelligence on MacBook Pro, so you can write, create, and accomplish more with ease — all in a pro design with up to 24 hours of battery life.
                            </p>
                            <p>
                                A brand-new display engine delivers breathtaking precision, color accuracy, and brightness. And a next-gen GPU with hardware-accelerated ray tracing brings console-level graphics to your fingertips.
                            </p>
                            <p>
                                <a href="#compare" className="text-primary hover:underline inline-flex items-center gap-1">
                                    Compare M4, M4 Pro & M4 Max specs →
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:flex lg:flex-col gap-6 sm:gap-10 lg:max-w-xs lg:space-y-6 pt-4 lg:pt-8 border-t lg:border-t-0 border-white/10">
                        <div className="space-y-1.5">
                            <p className="text-xs sm:text-sm uppercase tracking-wider text-zinc-400">Up to</p>
                            <h3 className="text-2xl sm:text-4xl lg:text-5xl text-white font-semibold">4x faster</h3>
                            <p className="text-sm sm:text-base text-zinc-400">pro rendering performance than M2</p>
                        </div>
                        <div className="space-y-1.5">
                            <p className="text-xs sm:text-sm uppercase tracking-wider text-zinc-400">Up to</p>
                            <h3 className="text-2xl sm:text-4xl lg:text-5xl text-white font-semibold">3.4x faster</h3>
                            <p className="text-sm sm:text-base text-zinc-400">CPU performance than M1</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Showcase;
