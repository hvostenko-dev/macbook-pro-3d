import { create } from 'zustand';

const useMacbookStore = create((set) => ({
    color: '#2e2c2e',
    setColor: (color) => set({ color }),

    scale: 0.08,
    setScale: (scale) => set({ scale }),

    texture: '/videos/feature-1.mp4',
    setTexture: (texture) => set({ texture }),

    activeFeature: 1,
    setActiveFeature: (activeFeature) => set({ activeFeature }),

    isBuyModalOpen: false,
    setBuyModalOpen: (isBuyModalOpen) => set({ isBuyModalOpen }),

    selectedChip: 'm4-pro',
    setSelectedChip: (selectedChip) => set({ selectedChip }),

    reset: () => set({
        color: '#2e2c2e',
        scale: 0.08,
        texture: '/videos/feature-1.mp4',
        activeFeature: 1,
    }),
}));

export default useMacbookStore;
