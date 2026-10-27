import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Radio, Music } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { soundSynth } from '../audio/soundSynthesizer';
import putaapuGangTrack from '../audio/Putaapu Gang - Anirudh Ravichander (128k).mp3';

const AudioContext = createContext(null);

export const useAudio = () => useContext(AudioContext);

export const AudioManager = ({ currentStage, children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(BIRTHDAY_CONFIG.AUDIO_VOLUME || 0.8);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [activeTrackName, setActiveTrackName] = useState('PUTAAPU GANG');
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);

  const bgmAudioRef = useRef(null);

  // Fallback priority: Imported local bundled track -> Configured public path -> static path
  const defaultAudioSrc = putaapuGangTrack || BIRTHDAY_CONFIG.AUDIO.INTRO_BGM || '/assets/audio/putaapu_gang.mp3';

  // Determine which background track corresponds to current stage
  const getBgmForStage = useCallback((stage) => {
    if (stage >= 18) {
      return { 
        key: 'FINAL_REVEAL_BGM', 
        src: BIRTHDAY_CONFIG.AUDIO.FINAL_REVEAL_BGM, 
        title: 'PUTAAPU GANG - MASS ANTHEM', 
        mood: 'mass' 
      };
    }
    if (stage >= 14) {
      return { 
        key: 'SUSPENSE_BGM', 
        src: BIRTHDAY_CONFIG.AUDIO.SUSPENSE_BGM, 
        title: 'PUTAAPU GANG - SUSPENSE EDIT', 
        mood: 'suspense' 
      };
    }
    if (stage >= 5) {
      return { 
        key: 'MAIN_BGM', 
        src: BIRTHDAY_CONFIG.AUDIO.MAIN_BGM, 
        title: 'PUTAAPU GANG - MAIN THEME', 
        mood: 'gangster' 
      };
    }
    return { 
      key: 'INTRO_BGM', 
      src: BIRTHDAY_CONFIG.AUDIO.INTRO_BGM, 
      title: 'PUTAAPU GANG - ANIRUDH', 
      mood: 'dark' 
    };
  }, []);

  // Unlock and play audio helper
  const triggerAudioPlay = useCallback(() => {
    soundSynth.init();
    const audio = bgmAudioRef.current;
    if (audio) {
      audio.muted = isMuted;
      audio.volume = isMuted ? 0 : volume;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsAudioLoaded(true);
            setAutoplayBlocked(false);
            setHasInteracted(true);
          })
          .catch((err) => {
            console.warn("Autoplay pending interaction:", err);
            setAutoplayBlocked(true);
          });
      }
    }
  }, [isMuted, volume]);

  // Run immediately when application opens
  useEffect(() => {
    // Attempt immediate playback on mount
    triggerAudioPlay();

    // Also listen for any initial user gesture in case browser blocks unmuted autoplay
    const handleGesture = () => {
      soundSynth.init();
      const audio = bgmAudioRef.current;
      if (audio && (audio.paused || !isPlaying)) {
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setIsAudioLoaded(true);
            setAutoplayBlocked(false);
            setHasInteracted(true);
          })
          .catch(() => {});
      } else {
        setHasInteracted(true);
        setAutoplayBlocked(false);
      }
    };

    const events = ['click', 'pointerdown', 'keydown', 'touchstart'];
    events.forEach(evt => window.addEventListener(evt, handleGesture, { passive: true }));

    return () => {
      events.forEach(evt => window.removeEventListener(evt, handleGesture));
    };
  }, [triggerAudioPlay, isPlaying]);

  // Sync volume & mute with sound synth and audio element
  useEffect(() => {
    soundSynth.setMuted(isMuted);
    soundSynth.setVolume(volume);
    if (bgmAudioRef.current) {
      bgmAudioRef.current.muted = isMuted;
      bgmAudioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [isMuted, volume]);

  // Handle stage change: seamless playback without unwanted restarts
  useEffect(() => {
    const bgmInfo = getBgmForStage(currentStage);
    setActiveTrackName(bgmInfo.title || 'PUTAAPU GANG');

    const audio = bgmAudioRef.current;
    if (!audio) return;

    const targetSrc = bgmInfo.src || defaultAudioSrc;
    const isPlaceholder = !targetSrc || targetSrc.includes('[') || targetSrc.includes('placeholder');

    // If target is placeholder or matches default, keep current song running!
    if (isPlaceholder) {
      return;
    }

    try {
      const currentSrcPath = audio.src ? new URL(audio.src, window.location.href).pathname : '';
      const targetSrcPath = new URL(targetSrc, window.location.href).pathname;

      if (currentSrcPath !== targetSrcPath && audio.src !== targetSrc) {
        audio.src = targetSrc;
        audio.play().catch(() => {});
      }
    } catch {
      // URL parsing fallback
      if (audio.src !== targetSrc) {
        audio.src = targetSrc;
        audio.play().catch(() => {});
      }
    }
  }, [currentStage, defaultAudioSrc, getBgmForStage]);

  // Sound effects player
  const playSfx = useCallback((type) => {
    soundSynth.init();

    const sfxMap = {
      door: BIRTHDAY_CONFIG.AUDIO.DOOR_SOUND,
      alert: BIRTHDAY_CONFIG.AUDIO.ALERT_SOUND,
      transition: BIRTHDAY_CONFIG.AUDIO.TRANSITION_SOUND,
      reveal: BIRTHDAY_CONFIG.AUDIO.REVEAL_SOUND,
      scan: null,
      beep: null,
      heartbeat: null
    };

    const src = sfxMap[type];
    const isPlaceholder = !src || src.includes('[') || src.includes('placeholder');

    if (!isPlaceholder) {
      const sfx = new Audio(src);
      sfx.volume = isMuted ? 0 : volume;
      sfx.play().catch(() => {
        triggerSynthSfx(type);
      });
    } else {
      triggerSynthSfx(type);
    }
  }, [isMuted, volume]);

  const triggerSynthSfx = (type) => {
    switch (type) {
      case 'door':
        soundSynth.playDoorThud();
        break;
      case 'alert':
        soundSynth.playAlarm(3);
        break;
      case 'transition':
        soundSynth.playTransition();
        break;
      case 'reveal':
        soundSynth.playMassRevealImpact();
        break;
      case 'scan':
        soundSynth.playScanSweep();
        break;
      case 'heartbeat':
        soundSynth.playHeartbeat();
        break;
      case 'beep':
      default:
        soundSynth.playBeep(850, 0.08);
        break;
    }
  };

  const toggleMute = () => {
    soundSynth.init();
    if (bgmAudioRef.current && bgmAudioRef.current.paused) {
      bgmAudioRef.current.play().then(() => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
        setHasInteracted(true);
      }).catch(() => {});
    }
    setIsMuted(prev => !prev);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (isMuted && val > 0) setIsMuted(false);
    if (bgmAudioRef.current && bgmAudioRef.current.paused) {
      bgmAudioRef.current.play().catch(() => {});
    }
  };

  return (
    <AudioContext.Provider value={{ isMuted, volume, toggleMute, playSfx, activeTrackName, isAudioLoaded, hasInteracted }}>
      {/* Underlying Persistent Audio Element for Putaapu Gang */}
      <audio
        ref={bgmAudioRef}
        src={defaultAudioSrc}
        loop
        preload="auto"
        playsInline
        onPlay={() => {
          setIsPlaying(true);
          setIsAudioLoaded(true);
          setAutoplayBlocked(false);
        }}
        onPause={() => setIsPlaying(false)}
        onError={(e) => {
          console.warn("Audio load fallback:", e);
          // Fallback to static public path if bundled import failed
          if (bgmAudioRef.current && bgmAudioRef.current.src !== '/assets/audio/putaapu_gang.mp3') {
            bgmAudioRef.current.src = '/assets/audio/putaapu_gang.mp3';
            bgmAudioRef.current.play().catch(() => {});
          }
        }}
      />

      {children}

      {/* Autoplay Unlock Pill (Rendered only if browser blocks unmuted autoplay until user touch) */}
      {autoplayBlocked && (
        <div 
          onClick={triggerAudioPlay}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 cursor-pointer bg-red-950/90 hover:bg-red-900 border border-red-500/80 text-red-100 px-5 py-2.5 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.7)] flex items-center gap-3 backdrop-blur-md animate-pulse transition-all select-none"
          title="Click to activate audio"
        >
          <Volume2 size={18} className="text-red-400 animate-spin" />
          <div className="flex flex-col text-left">
            <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-white">
              INITIALIZE AUDIO TRANSMISSION
            </span>
            <span className="font-mono text-[9px] text-red-300 tracking-wider">
              TAP ANYWHERE TO PLAY PUTAAPU GANG (ANIRUDH)
            </span>
          </div>
        </div>
      )}

      {/* HUD Audio Controls */}
      <div 
        className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-black/85 backdrop-blur-md border border-neutral-800 px-3 py-1.5 rounded-full shadow-2xl text-xs text-neutral-400 select-none"
        title="Cinematic Sound System - Putaapu Gang"
      >
        <button 
          onClick={toggleMute}
          className="flex items-center gap-1.5 text-neutral-300 hover:text-red-500 transition-colors focus:outline-none"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX size={16} className="text-red-500" /> : <Volume2 size={16} className="text-red-400 animate-pulse" />}
          <span className="hidden sm:inline font-mono text-[10px] tracking-wider uppercase">
            {isMuted ? "MUTED" : "AUDIO ON"}
          </span>
        </button>

        <input 
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-14 sm:w-20 accent-red-600 cursor-pointer h-1 bg-neutral-800 rounded-lg"
          title={`Volume: ${Math.round(volume * 100)}%`}
        />

        <div className="hidden md:flex items-center gap-1 text-[10px] font-mono text-neutral-400 border-l border-neutral-800 pl-2">
          <Radio size={12} className={isMuted ? "text-neutral-600" : "text-red-500 animate-pulse"} />
          <span className="truncate max-w-[110px] text-neutral-300 font-bold" title={activeTrackName}>
            {activeTrackName}
          </span>
        </div>
      </div>
    </AudioContext.Provider>
  );
};
