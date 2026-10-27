import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { performanceImages, performanceImgPositions } from "../constants/index.js";
import { useMediaQuery } from "react-responsive";

const Performance = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const sectionRef = useRef(null);

    useGSAP(
        () => {
            const sectionEl = sectionRef.current;
            if (!sectionEl) return;

            // Text Animation
            gsap.fromTo(
                ".content p",
                { opacity: 0, y: 15 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: ".content p",
                        start: "top 90%",
                        end: "top 65%",
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                }
            );

            if (isMobile) {
                gsap.fromTo(
                    ".mobile-perf-card",
                    { opacity: 0, y: 20, scale: 0.96 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        stagger: 0.1,
                        duration: 0.6,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ".mobile-perf-grid",
                            start: "top 85%",
                        },
                    }
                );
                return;
            }

            // Desktop Image Positioning Timeline
            const tl = gsap.timeline({
                defaults: { duration: 2, ease: "power1.inOut", overwrite: "auto" },
                scrollTrigger: {
                    trigger: sectionEl,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            performanceImgPositions.forEach((item) => {
                if (item.id === "p5") return;

                const selector = `.${item.id}`;
                const vars = {};

                if (typeof item.left === "number") vars.left = `${item.left}%`;
                if (typeof item.right === "number") vars.right = `${item.right}%`;
                if (typeof item.bottom === "number") vars.bottom = `${item.bottom}%`;

                if (item.transform) vars.transform = item.transform;

                tl.to(selector, vars, 0);
            });
        },
        { scope: sectionRef, dependencies: [isMobile] }
    );

    return (
        <section id="performance" ref={sectionRef}>
            <div className="px-4 text-center">
                <p className="text-xs sm:text-sm uppercase tracking-widest text-primary font-semibold mb-2">
                    Hardware-Accelerated Ray Tracing
                </p>
                <h2>Next-level graphics performance. Game on.</h2>
            </div>

            {/* Desktop Parallax Wrapper */}
            <div className="wrapper hidden lg:block">
                {performanceImages.map((item, index) => (
                    <img
                        key={item.id}
                        src={item.src}
                        className={item.id}
                        alt={item.alt || `Performance Image #${index + 1}`}
                        loading="lazy"
                    />
                ))}
            </div>

            {/* Mobile & Tablet Responsive Showcase Grid */}
            <div className="mobile-perf-grid lg:hidden container mx-auto px-4 mt-8">
                {/* Main Hero Image p5 */}
                <div className="mobile-perf-card relative rounded-2xl overflow-hidden border border-white/10 mb-4 shadow-2xl">
                    <img
                        src="/performance5.jpg"
                        alt="MacBook Pro Gaming & Pro Workflows"
                        className="w-full h-56 sm:h-80 object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-4">
                        <span className="text-xs sm:text-sm font-semibold text-white">
                            2nd-Gen Hardware-Accelerated Ray Tracing + Dynamic Caching
                        </span>
                    </div>
                </div>

                {/* Supporting Bento Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {performanceImages
                        .filter((item) => item.id !== "p5")
                        .map((item) => (
                            <div
                                key={item.id}
                                className="mobile-perf-card rounded-xl overflow-hidden bg-zinc-900/60 border border-white/10 aspect-[16/10]"
                            >
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    loading="lazy"
                                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        ))}
                </div>
            </div>

            <div className="content">
                <p>
                    Run graphics-intensive workflows with a responsiveness that keeps up
                    with your imagination. The M4 family of chips features a GPU with a
                    second-generation hardware-accelerated ray tracing engine that renders
                    images faster, so{" "}
                    <span className="text-white">
                        gaming feels more immersive and realistic than ever.
                    </span>{" "}
                    And Dynamic Caching optimizes fast on-chip memory to dramatically
                    increase average GPU utilization — driving a huge performance boost
                    for the most demanding pro apps and games.
                </p>
            </div>
        </section>
    );
};

export default Performance;
