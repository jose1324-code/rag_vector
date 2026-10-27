/**
 * CINEMATIC PROCEDURAL SOUND SYNTHESIZER
 * Uses Web Audio API to produce rich dark gangster cinema sound effects
 * and ambient musical drones when MP3 placeholder files are not yet present.
 */

class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.activeDrones = [];
    this.muted = false;
    this.volume = 0.8;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.muted = muted;
    if (muted) {
      this.stopDrone();
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  // Play a short click or electronic beep
  playBeep(freq = 800, duration = 0.08, type = 'sine') {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.15 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before user gesture
    }
  }

  // Heavy mechanical lock / door sound
  playDoorThud() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Low boom
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.6);

      gain.gain.setValueAtTime(0.4 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.6);

      // Noise click for metallic clank
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200;
      filter.Q.value = 4.0;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.3 * this.volume, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      whiteNoise.start(now);
    } catch {}
  }

  // Emergency Klaxon / Security Siren (Dual tone)
  playAlarm(repeats = 3) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const startTime = this.ctx.currentTime;
      for (let i = 0; i < repeats; i++) {
        const time = startTime + i * 0.7;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(550, time);
        osc.frequency.linearRampToValueAtTime(880, time + 0.35);
        osc.frequency.linearRampToValueAtTime(550, time + 0.65);

        gain.gain.setValueAtTime(0.25 * this.volume, time);
        gain.gain.linearRampToValueAtTime(0.3 * this.volume, time + 0.35);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.68);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 2400;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + 0.7);
      }
    } catch {}
  }

  // Cinematic Transition whoosh & sub drop
  playTransition() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.8);

      gain.gain.setValueAtTime(0.4 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.85);
    } catch {}
  }

  // Biometric scanner sound (frequency sweep)
  playScanSweep() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.linearRampToValueAtTime(1400, now + 0.5);

      gain.gain.setValueAtTime(0.12 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    } catch {}
  }

  // Countdown heartbeat pulse
  playHeartbeat() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Thump 1
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(90, now);
      osc1.frequency.exponentialRampToValueAtTime(35, now + 0.15);
      gain1.gain.setValueAtTime(0.4 * this.volume, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.15);

      // Thump 2
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(80, now + 0.18);
      osc2.frequency.exponentialRampToValueAtTime(30, now + 0.35);
      gain2.gain.setValueAtTime(0.35 * this.volume, now + 0.18);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.18);
      osc2.stop(now + 0.35);
    } catch {}
  }

  // Triumphant Mass Reveal Impact & Chords (Mass Tamil Cinema style)
  playMassRevealImpact() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Massive Sub Boom
      const boom = this.ctx.createOscillator();
      const boomGain = this.ctx.createGain();
      boom.type = 'sine';
      boom.frequency.setValueAtTime(180, now);
      boom.frequency.exponentialRampToValueAtTime(30, now + 1.8);
      boomGain.gain.setValueAtTime(0.6 * this.volume, now);
      boomGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
      boom.connect(boomGain);
      boomGain.connect(this.ctx.destination);
      boom.start(now);
      boom.stop(now + 1.8);

      // Mass fanfare triad chords (C minor / triumph chord: C, Eb, G, Bb)
      const chordNotes = [261.63, 311.13, 392.00, 466.16, 523.25];
      chordNotes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + 0.1 + idx * 0.08);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.linearRampToValueAtTime(3500, now + 1.5);

        gain.gain.setValueAtTime(0.12 * this.volume, now + 0.1);
        gain.gain.linearRampToValueAtTime(0.18 * this.volume, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + 0.1);
        osc.stop(now + 3.2);
      });
    } catch {}
  }

  // Ambient Drone loop for stages (disabled to keep background clean and silent)
  startAmbientDrone(mood = 'dark') {
    this.stopDrone();
    // Ambient drone disabled upon user request - silent background until real audio is provided
  }

  stopDrone() {
    if (this.activeDrones.length > 0 && this.ctx) {
      this.activeDrones.forEach(d => {
        try {
          d.gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
          setTimeout(() => {
            try {
              d.osc1.stop();
              d.osc2.stop();
            } catch {}
          }, 600);
        } catch {}
      });
      this.activeDrones = [];
    }
  }
}

export const soundSynth = new SoundSynthesizer();
