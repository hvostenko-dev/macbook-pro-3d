import { chipSpecs } from "../constants";
import useMacbookStore from "../store";
import clsx from "clsx";

const ChipComparison = () => {
    const { selectedChip, setSelectedChip, setBuyModalOpen } = useMacbookStore();
    const activeSpec = chipSpecs.find((c) => c.id === selectedChip) || chipSpecs[1];

    return (
        <section id="compare" className="container mx-auto px-4 sm:px-6 pt-24 lg:pt-36">
            <div className="text-center max-w-3xl mx-auto">
                <p className="text-xs sm:text-sm uppercase tracking-widest text-primary font-semibold mb-2">
                    M4 Family Architecture
                </p>
                <h2 className="text-white font-semibold text-3xl sm:text-5xl lg:text-6xl tracking-tight">
                    Three chips. Infinite possibilities.
                </h2>
                <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-zinc-400">
                    Select a chip to inspect unified memory bandwidth, core counts, and real-world pro benchmarks.
                </p>

                {/* Segmented Pill Selector */}
                <div
                    role="tablist"
                    aria-label="Select Apple Silicon Chip"
                    className="inline-flex items-center p-1.5 mt-7 rounded-full bg-zinc-900 border border-white/10"
                >
                    {chipSpecs.map((chip) => {
                        const isActive = chip.id === selectedChip;
                        return (
                            <button
                                key={chip.id}
                                role="tab"
                                aria-selected={isActive}
                                type="button"
                                onClick={() => setSelectedChip(chip.id)}
                                className={clsx(
                                    "px-5 sm:px-7 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer",
                                    isActive
                                        ? "bg-white text-black shadow-lg"
                                        : "text-zinc-400 hover:text-white"
                                )}
                            >
                                {chip.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Interactive Spec Dashboard */}
            <div
                className="mt-10 rounded-3xl bg-zinc-950/90 border border-white/10 p-6 sm:p-8 lg:p-12 relative overflow-hidden transition-all duration-500"
                style={{
                    boxShadow: `0 0 90px -20px ${activeSpec.glow}`,
                }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Column: Chip Identity + Core Metrics */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <span
                                className={clsx(
                                    "inline-block px-3.5 py-1 rounded-full text-xs font-semibold text-black bg-gradient-to-r",
                                    activeSpec.accent
                                )}
                            >
                                {activeSpec.badge}
                            </span>
                            <span className="text-xs text-zinc-400 font-medium">
                                2nd-Gen 3nm Process · 16-core Neural Engine
                            </span>
                        </div>

                        <div>
                            <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                                Apple {activeSpec.name}
                            </h3>
                            <p className="mt-2 text-sm sm:text-base text-zinc-300 max-w-xl">
                                {activeSpec.tagline}
                            </p>
                        </div>

                        {/* 6-Card Spec Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                                <span className="text-xs text-zinc-400 block">CPU</span>
                                <span className="text-lg sm:text-xl font-semibold text-white mt-1 block">
                                    {activeSpec.cpu}
                                </span>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                                <span className="text-xs text-zinc-400 block">GPU</span>
                                <span className="text-lg sm:text-xl font-semibold text-white mt-1 block">
                                    {activeSpec.gpu}
                                </span>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                                <span className="text-xs text-zinc-400 block">Unified Memory</span>
                                <span className="text-lg sm:text-xl font-semibold text-white mt-1 block">
                                    {activeSpec.memory}
                                </span>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                                <span className="text-xs text-zinc-400 block">Memory Bandwidth</span>
                                <span className="text-lg sm:text-xl font-semibold text-white mt-1 block">
                                    {activeSpec.bandwidth}
                                </span>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                                <span className="text-xs text-zinc-400 block">Battery Life</span>
                                <span className="text-lg sm:text-xl font-semibold text-white mt-1 block">
                                    {activeSpec.battery}
                                </span>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                                <span className="text-xs text-zinc-400 block">External Support</span>
                                <span className="text-sm sm:text-base font-semibold text-white mt-1 block">
                                    {activeSpec.displays}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Benchmark Bars */}
                    <div className="lg:col-span-5 bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5">
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm sm:text-base font-semibold text-white">
                                Performance vs. M1 Baseline
                            </h4>
                            <span className="text-xs text-zinc-400">Higher is faster</span>
                        </div>

                        <div className="space-y-4">
                            {activeSpec.benchmarks.map((bench) => (
                                <div key={bench.label} className="space-y-1.5">
                                    <div className="flex items-center justify-between text-xs sm:text-sm">
                                        <span className="text-zinc-300 font-medium">{bench.label}</span>
                                        <span className="text-white font-bold">{bench.multiplier} faster</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className={clsx(
                                                "h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out",
                                                activeSpec.accent
                                            )}
                                            style={{ width: `${bench.percent}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-4">
                            <p className="text-xs text-zinc-400">
                                Ready to build your {activeSpec.name} MacBook Pro?
                            </p>
                            <button
                                type="button"
                                onClick={() => setBuyModalOpen(true)}
                                className="shrink-0 px-4 py-2 rounded-full bg-primary hover:bg-blue-500 text-white text-xs font-semibold transition cursor-pointer"
                            >
                                Configure {activeSpec.name} →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChipComparison;
