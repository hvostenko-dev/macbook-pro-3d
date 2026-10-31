// Authentic Apple Startup Chime Synthesizer using Web Audio API
// Synthesizes the iconic F# major startup chord (F#2, C#3, F#3, A#3, C#4, F#4)
let audioCtx = null;

export const playAppleStartupChime = () => {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        if (!audioCtx || audioCtx.state === 'closed') {
            audioCtx = new AudioContext();
        }

        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const now = audioCtx.currentTime;
        const duration = 3.2;

        // Master gain with smooth exponential ramp
        const masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0.0001, now);
        masterGain.gain.exponentialRampToValueAtTime(0.35, now + 0.08);
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        // Lowpass filter for warm, rich acoustic resonance
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3200, now);
        filter.frequency.exponentialRampToValueAtTime(1400, now + duration);
        filter.Q.value = 1.2;

        masterGain.connect(filter);
        filter.connect(audioCtx.destination);

        // F# major chord frequencies (F#2 to F#4)
        const chordFrequencies = [92.5, 138.59, 185.0, 233.08, 277.18, 369.99];

        chordFrequencies.forEach((freq, index) => {
            const osc = audioCtx.createOscillator();
            const oscGain = audioCtx.createGain();

            osc.type = index < 2 ? 'triangle' : 'sine';
            osc.frequency.setValueAtTime(freq, now);

            const detune = (index % 2 === 0 ? 1 : -1) * (2 + index * 1.5);
            osc.detune.setValueAtTime(detune, now);

            const weight = 1 / (1 + index * 0.35);
            oscGain.gain.setValueAtTime(weight, now);

            osc.connect(oscGain);
            oscGain.connect(masterGain);

            osc.start(now);
            osc.stop(now + duration);
        });
    } catch {
        // AudioContext not allowed or not supported in this environment
    }
};
