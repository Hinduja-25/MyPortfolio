// Web Audio API synthesiser for retro 8-bit chip chimes and beeps.
// This requires zero static files and works completely offline!

let audioCtx = null;
let isMuted = false;

function initAudioContext() {
  if (!audioCtx) {
    // Standard AudioContext initialization (handling prefixed browser versions if any)
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Resume context if suspended (common browser security constraint)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const SoundManager = {
  toggleMute() {
    isMuted = !isMuted;
    return isMuted;
  },

  getMuted() {
    return isMuted;
  },

  setMuted(muted) {
    isMuted = muted;
  },

  // Play a simple 8-bit retro click sound
  playClick() {
    if (isMuted) return;
    try {
      const ctx = initAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle'; // Muted chiptune sound
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      // Fast pitch slide down
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      console.warn("Web Audio failed to play sound:", e);
    }
  },

  // Play a happy rising arpeggio for opening folders or windows
  playOpen() {
    if (isMuted) return;
    try {
      const ctx = initAudioContext();
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      const duration = 0.06;
      const startTime = ctx.currentTime;

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'square'; // Distinct 8-bit beep
        osc.frequency.setValueAtTime(freq, startTime + i * 0.05);

        gain.gain.setValueAtTime(0, startTime + i * 0.05);
        gain.gain.linearRampToValueAtTime(0.08, startTime + i * 0.05 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + i * 0.05 + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime + i * 0.05);
        osc.stop(startTime + i * 0.05 + duration);
      });
    } catch (e) {
      console.warn("Web Audio failed to play sound:", e);
    }
  },

  // Play a descending arpeggio for closing windows
  playClose() {
    if (isMuted) return;
    try {
      const ctx = initAudioContext();
      const notes = [523.25, 392.00, 329.63, 261.63]; // C5, G4, E4, C4
      const duration = 0.07;
      const startTime = ctx.currentTime;

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, startTime + i * 0.05);

        gain.gain.setValueAtTime(0, startTime + i * 0.05);
        gain.gain.linearRampToValueAtTime(0.08, startTime + i * 0.05 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + i * 0.05 + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime + i * 0.05);
        osc.stop(startTime + i * 0.05 + duration);
      });
    } catch (e) {
      console.warn("Web Audio failed to play sound:", e);
    }
  },

  // Play a buzzer sound for errors or warning events
  playError() {
    if (isMuted) return;
    try {
      const ctx = initAudioContext();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      
      // Slightly detune for fat buzzer sound
      osc1.frequency.setValueAtTime(110, ctx.currentTime);
      osc2.frequency.setValueAtTime(113, ctx.currentTime);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      
      osc1.stop(ctx.currentTime + 0.35);
      osc2.stop(ctx.currentTime + 0.35);
    } catch (e) {
      console.warn("Web Audio failed to play sound:", e);
    }
  },

  // Play a cute victory chime
  playSuccess() {
    if (isMuted) return;
    try {
      const ctx = initAudioContext();
      const now = ctx.currentTime;
      
      // Happy major chord arpeggio + hold
      const chord = [392.00, 493.88, 587.33, 783.99]; // G4, B4, D5, G5
      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        
        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.1, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.45);
      });
    } catch (e) {
      console.warn("Web Audio failed to play sound:", e);
    }
  }
};
