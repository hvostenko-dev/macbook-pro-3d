import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Highlights = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    useGSAP(() => {
        gsap.to([".left-column", ".right-column"], {
            scrollTrigger: {
                trigger: "#highlights",
                start: isMobile ? "top 85%" : "top center",
            },
            y: 0,
            opacity: 1,
            stagger: 0.25,
            duration: 0.9,
            ease: "power2.out",
        });
    }, [isMobile]);

    return (
        <section id="highlights" className="py-20 lg:py-36">
            <p className="text-xs sm:text-sm uppercase tracking-widest text-primary font-semibold text-center mb-2">
                Why Upgrade
            </p>
            <h2>There’s never been a better time to upgrade.</h2>
            <h3>Here’s what you get with the new MacBook Pro.</h3>

            <div className="masonry">
                <div className="left-column">
                    <div>
                        <img src="/laptop.png" alt="Laptop speed" className="w-12 sm:w-16 mb-4" />
                        <p>Fly through demanding tasks up to 9.8x faster.</p>
                    </div>
                    <div>
                        <img src="/sun.png" alt="Liquid Retina XDR" className="w-12 sm:w-14 shrink-0" />
                        <p>
                            A stunning <br />
                            Liquid Retina XDR <br />
                            display.
                        </p>
                    </div>
                </div>
                <div className="right-column">
                    <div className="apple-gradient">
                        <img src="/ai.png" alt="Apple Intelligence" className="w-12 sm:w-14 shrink-0" />
                        <p>
                            Built for <br />
                            <span>Apple Intelligence.</span>
                        </p>
                    </div>
                    <div>
                        <img src="/battery.png" alt="Battery life" className="w-14 sm:w-16 mb-4" />
                        <p>
                            Up to
                            <span className="green-gradient"> 14 more hours </span>
                            battery life.
                            <span className="text-dark-100 block text-base sm:text-xl mt-2">
                                (Up to 24 hours total on a single charge.)
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Highlights;
