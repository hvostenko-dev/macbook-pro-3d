import { useState, useEffect } from "react";
import useMacbookStore from "../store";
import clsx from "clsx";

const BASE_PRICES = {
    "m4": 1599,
    "m4-pro": 1999,
    "m4-max": 3199,
};

const STORAGE_OPTIONS = [
    { label: "512GB SSD", extra: 0 },
    { label: "1TB SSD", extra: 200 },
    { label: "2TB SSD", extra: 600 },
];

const BuyModal = () => {
    const {
        isBuyModalOpen,
        setBuyModalOpen,
        color,
        setColor,
        scale,
        setScale,
        selectedChip,
        setSelectedChip,
    } = useMacbookStore();

    const [storageIndex, setStorageIndex] = useState(1);
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isBuyModalOpen) {
                setBuyModalOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isBuyModalOpen, setBuyModalOpen]);

    if (!isBuyModalOpen) return null;

    const is16Inch = scale === 0.08;
    const sizeUpcharge = is16Inch ? 400 : 0;
    const totalPrice =
        (BASE_PRICES[selectedChip] || 1999) +
        sizeUpcharge +
        STORAGE_OPTIONS[storageIndex].extra;
    const monthly = (totalPrice / 12).toFixed(2);
    const finishName = color === "#2e2c2e" ? "Space Black" : "Silver";

    const handleCompleteOrder = () => {
        setOrderSuccess(true);
        setTimeout(() => {
            setOrderSuccess(false);
            setBuyModalOpen(false);
        }, 2200);
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn"
            onClick={() => setBuyModalOpen(false)}
        >
            <div
                className="relative w-full max-w-lg rounded-3xl bg-zinc-950 border border-white/15 p-6 sm:p-8 shadow-2xl text-white max-h-[90dvh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                            Apple Store Configurator
                        </span>
                        <h3 id="modal-title" className="text-2xl sm:text-3xl font-bold mt-1">
                            Customize your MacBook Pro
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={() => setBuyModalOpen(false)}
                        aria-label="Close modal"
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm cursor-pointer transition"
                    >
                        ✕
                    </button>
                </div>

                {orderSuccess ? (
                    <div className="py-12 text-center space-y-3">
                        <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
                            ✓
                        </div>
                        <h4 className="text-xl font-semibold">Added to your Apple Bag!</h4>
                        <p className="text-sm text-zinc-400">
                            {is16Inch ? '16-inch' : '14-inch'} MacBook Pro ({selectedChip.toUpperCase()}) in {finishName} — ${totalPrice.toLocaleString()}
                        </p>
                    </div>
                ) : (
                    <div className="mt-6 space-y-5">
                        {/* Display Size */}
                        <div>
                            <label className="text-xs text-zinc-400 uppercase tracking-wider font-semibold block mb-2">
                                1. Select Display Size
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setScale(0.06)}
                                    className={clsx(
                                        "p-3.5 rounded-2xl border text-left transition cursor-pointer",
                                        !is16Inch
                                            ? "border-primary bg-primary/10"
                                            : "border-white/10 bg-white/[0.02] hover:border-white/25"
                                    )}
                                >
                                    <span className="font-semibold text-base block">14-inch</span>
                                    <span className="text-xs text-zinc-400">Ultra-portable pro</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setScale(0.08)}
                                    className={clsx(
                                        "p-3.5 rounded-2xl border text-left transition cursor-pointer",
                                        is16Inch
                                            ? "border-primary bg-primary/10"
                                            : "border-white/10 bg-white/[0.02] hover:border-white/25"
                                    )}
                                >
                                    <span className="font-semibold text-base block">16-inch</span>
                                    <span className="text-xs text-zinc-400">+$400 · Max screen estate</span>
                                </button>
                            </div>
                        </div>

                        {/* Chip */}
                        <div>
                            <label className="text-xs text-zinc-400 uppercase tracking-wider font-semibold block mb-2">
                                2. Select Apple Silicon
                            </label>
                            <div className="grid grid-cols-3 gap-2.5">
                                {[
                                    { id: "m4", name: "M4" },
                                    { id: "m4-pro", name: "M4 Pro" },
                                    { id: "m4-max", name: "M4 Max" },
                                ].map((c) => (
                                    <button
                                        key={c.id}
                                        type="button"
                                        onClick={() => setSelectedChip(c.id)}
                                        className={clsx(
                                            "py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-semibold transition cursor-pointer",
                                            selectedChip === c.id
                                                ? "border-primary bg-primary/15 text-white"
                                                : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/25"
                                        )}
                                    >
                                        {c.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Finish */}
                        <div>
                            <label className="text-xs text-zinc-400 uppercase tracking-wider font-semibold block mb-2">
                                3. Finish — <span className="text-white">{finishName}</span>
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setColor("#2e2c2e")}
                                    className={clsx(
                                        "flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition",
                                        color === "#2e2c2e"
                                            ? "border-white bg-white/10"
                                            : "border-white/10 bg-white/[0.02]"
                                    )}
                                >
                                    <span className="w-4 h-4 rounded-full bg-neutral-800 border border-white/30" />
                                    Space Black
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setColor("#adb5bd")}
                                    className={clsx(
                                        "flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition",
                                        color === "#adb5bd"
                                            ? "border-white bg-white/10"
                                            : "border-white/10 bg-white/[0.02]"
                                    )}
                                >
                                    <span className="w-4 h-4 rounded-full bg-neutral-300" />
                                    Silver
                                </button>
                            </div>
                        </div>

                        {/* Storage */}
                        <div>
                            <label className="text-xs text-zinc-400 uppercase tracking-wider font-semibold block mb-2">
                                4. SSD Storage
                            </label>
                            <div className="grid grid-cols-3 gap-2.5">
                                {STORAGE_OPTIONS.map((opt, idx) => (
                                    <button
                                        key={opt.label}
                                        type="button"
                                        onClick={() => setStorageIndex(idx)}
                                        className={clsx(
                                            "py-2.5 px-3 rounded-xl border text-xs font-semibold transition cursor-pointer",
                                            storageIndex === idx
                                                ? "border-primary bg-primary/15 text-white"
                                                : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/25"
                                        )}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Summary & Checkout */}
                        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <div className="text-2xl sm:text-3xl font-bold">
                                    ${totalPrice.toLocaleString()}
                                </div>
                                <div className="text-xs text-zinc-400">
                                    or ${monthly}/mo. for 12 mo. · Free delivery
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleCompleteOrder}
                                className="px-7 py-3.5 rounded-full bg-primary hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition cursor-pointer"
                            >
                                Add to Bag
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BuyModal;
