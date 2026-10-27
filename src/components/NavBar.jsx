import { useState, useEffect } from "react";
import { navLinks } from "../constants";
import useMacbookStore from "../store";
import clsx from "clsx";

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { setBuyModalOpen } = useMacbookStore();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    const filteredLinks = navLinks.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleNavClick = () => {
        setMobileMenuOpen(false);
        setSearchOpen(false);
    };

    return (
        <header
            className={clsx(
                "fixed top-0 left-0 z-50 w-full transition-all duration-300",
                isScrolled || mobileMenuOpen || searchOpen
                    ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
                    : "bg-black/50 backdrop-blur-md"
            )}
        >
            <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6 min-h-[56px] lg:min-h-[60px]">
                {/* Brand Logo */}
                <a
                    href="#hero"
                    onClick={handleNavClick}
                    aria-label="Apple MacBook Pro Home"
                    className="flex items-center gap-2.5 group focus:outline-none"
                >
                    <img
                        src="/logo.svg"
                        alt="Apple"
                        className="w-4 h-4 sm:w-4.5 sm:h-4.5 opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="text-white font-semibold text-sm sm:text-base tracking-tight">
                        MacBook Pro
                    </span>
                </a>

                {/* Desktop Nav Links */}
                <ul className="hidden md:flex items-center gap-6 lg:gap-8">
                    {navLinks.map(({ label, href }) => (
                        <li key={label}>
                            <a
                                href={href}
                                className="text-white/75 hover:text-white font-regular text-xs lg:text-sm transition-colors duration-200"
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Right Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            setSearchOpen((prev) => !prev);
                            setMobileMenuOpen(false);
                        }}
                        aria-label="Quick navigation search"
                        className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        <img src="/search.svg" alt="Search" className="w-4 h-4 opacity-85" />
                    </button>

                    <button
                        type="button"
                        onClick={() => setBuyModalOpen(true)}
                        aria-label="Configure and Buy MacBook Pro"
                        className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer hidden sm:flex"
                    >
                        <img src="/cart.svg" alt="Bag" className="w-4 h-4 opacity-85" />
                    </button>

                    <button
                        type="button"
                        onClick={() => setBuyModalOpen(true)}
                        className="bg-primary hover:bg-blue-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer shadow-sm shadow-blue-500/30"
                    >
                        Buy
                    </button>

                    {/* Mobile Hamburger Button */}
                    <button
                        type="button"
                        onClick={() => {
                            setMobileMenuOpen((prev) => !prev);
                            setSearchOpen(false);
                        }}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                        className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-full hover:bg-white/10 transition-colors cursor-pointer gap-1.5"
                    >
                        <span
                            className={clsx(
                                "block w-4 h-0.5 bg-white transition-transform duration-300",
                                mobileMenuOpen && "translate-y-1 rotate-45"
                            )}
                        />
                        <span
                            className={clsx(
                                "block w-4 h-0.5 bg-white transition-transform duration-300",
                                mobileMenuOpen && "-translate-y-1 -rotate-45"
                            )}
                        />
                    </button>
                </div>
            </nav>

            {/* Quick Search Bar Dropdown */}
            {searchOpen && (
                <div className="border-t border-white/10 bg-zinc-950/95 backdrop-blur-2xl px-4 py-4 animate-fadeIn">
                    <div className="container mx-auto max-w-xl">
                        <div className="flex items-center gap-3 bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5">
                            <img src="/search.svg" alt="" className="w-4 h-4 opacity-50" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Jump to section (e.g. 3D Studio, M4 Chip, Compare)..."
                                autoFocus
                                className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-zinc-500"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    className="text-xs text-zinc-400 hover:text-white"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {filteredLinks.map(({ label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    onClick={handleNavClick}
                                    className="text-xs bg-white/5 hover:bg-white/15 text-white/90 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
                                >
                                    {label} →
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Drawer */}
            <div
                className={clsx(
                    "md:hidden fixed inset-x-0 top-[56px] bg-black/95 backdrop-blur-2xl border-b border-white/10 transition-all duration-300 overflow-hidden",
                    mobileMenuOpen ? "max-h-[calc(100dvh-56px)] opacity-100 py-6" : "max-h-0 opacity-0 py-0 pointer-events-none"
                )}
            >
                <div className="container mx-auto px-6 flex flex-col gap-4">
                    <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-semibold">
                        Explore MacBook Pro
                    </p>
                    <ul className="flex flex-col divide-y divide-white/10">
                        {navLinks.map(({ label, href }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    onClick={handleNavClick}
                                    className="flex items-center justify-between py-3.5 text-lg font-semibold text-white/90 hover:text-white transition-colors"
                                >
                                    <span>{label}</span>
                                    <span className="text-zinc-500 text-sm">→</span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="pt-4 flex flex-col gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setMobileMenuOpen(false);
                                setBuyModalOpen(true);
                            }}
                            className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm shadow-lg shadow-blue-600/25 active:scale-[0.99] transition"
                        >
                            Configure & Buy MacBook Pro
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
