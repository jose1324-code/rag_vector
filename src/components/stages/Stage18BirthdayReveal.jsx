import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Sparkles, Film } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';
import { ScrollVideoSequence } from '../ScrollVideoSequence';

export const Stage18BirthdayReveal = ({ onReplay }) => {
  // Sequence phases: 'forming' -> 'countdown' -> 'scroll_video' -> 'final_reveal'
  const [phase, setPhase] = useState('forming');
  const [countdown, setCountdown] = useState(3);

  const displayName = BIRTHDAY_CONFIG.BIRTHDAY_NAME || "Moorthy Anna";

  // Step 1: The frame forms itself
  useEffect(() => {
    if (phase !== 'forming') return;
    const timer = setTimeout(() => {
      setPhase('countdown');
    }, 1600);

    return () => clearTimeout(timer);
  }, [phase]);

  // Step 2: When countdown starts, frame becomes the glass frame, counts 3, 2, 1
  useEffect(() => {
    if (phase !== 'countdown') return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // After countdown ends -> opens the first set & second set sequence on full screen!
          setPhase('scroll_video');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  const handleRestartFullSequence = () => {
    setCountdown(3);
    setPhase('forming');
  };

  const handleReplayScrollVideo = () => {
    setPhase('scroll_video');
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 select-none">
      
      {/* Step 3: Interactive Fullscreen Scroll Video Sequence (firstset & secondset) */}
      {phase === 'scroll_video' && (
        <ScrollVideoSequence 
          onComplete={() => setPhase('final_reveal')} 
        />
      )}

      {/* Steps 1, 2, and 4 (Final WhatsApp Photo Reveal) */}
      {phase !== 'scroll_video' && (
        <div className="w-full max-w-lg flex flex-col items-center text-center">
          
          {/* Name Header - Appears in the final reveal above the photo */}
          <AnimatePresence>
            {phase === 'final_reveal' && (
              <motion.h1
                initial={{ opacity: 0, y: -25, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="font-serif font-black text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 tracking-wider mb-6 drop-shadow-[0_4px_30px_rgba(245,158,11,0.5)]"
              >
                Happy Birthday {displayName}
              </motion.h1>
            )}
          </AnimatePresence>

          {/* The Frame Container */}
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className={`relative max-w-sm sm:max-w-md w-full transition-all duration-700 overflow-hidden ${
              phase === 'forming'
                ? 'rounded-2xl border-2 border-dashed border-amber-500/50 p-6 bg-black/60 shadow-[0_0_30px_rgba(245,158,11,0.15)] min-h-[380px] flex flex-col items-center justify-center'
                : 'rounded-2xl border-2 border-amber-500/70 p-3 sm:p-4 backdrop-blur-xl bg-white/[0.04] shadow-[0_0_60px_rgba(245,158,11,0.35)] ring-1 ring-amber-400/30'
            }`}
          >
            {/* Glass glare and highlight reflection effect */}
            {phase !== 'forming' && (
              <div className="pointer-events-none absolute -top-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-2xl transform rotate-45" />
            )}

            {/* Phase 1: Frame Forming */}
            {phase === 'forming' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center space-y-4 py-16"
              >
                <div className="w-16 h-16 rounded-xl border border-amber-500/60 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] animate-spin">
                  <Sparkles size={24} className="text-amber-400" />
                </div>
                <div className="font-mono text-xs tracking-widest text-amber-400 font-bold uppercase animate-pulse">
                  INITIALIZING FRAME STRUCTURE...
                </div>
              </motion.div>
            )}

            {/* Phase 2: Countdown inside the glass frame */}
            {phase === 'countdown' && (
              <motion.div
                key="countdown-box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 min-h-[420px]"
              >
                <div className="font-mono text-xs tracking-widest text-amber-400 font-bold uppercase mb-4 animate-pulse">
                  FRAME LOCKED // REVEALING IN
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={countdown}
                    initial={{ scale: 2.2, opacity: 0, filter: "blur(8px)" }}
                    animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="font-serif font-black text-8xl sm:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 drop-shadow-[0_0_40px_rgba(245,158,11,0.8)]"
                  >
                    {countdown}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {/* Phase 4: Finally the WhatsApp image appears, bouncing continuously from bounce to bounce */}
            {phase === 'final_reveal' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative w-full rounded-xl overflow-hidden shadow-2xl"
              >
                <motion.img
                  src="/assets/WhatsAppaathish.jpeg"
                  alt={`Happy Birthday ${displayName}`}
                  className="w-full h-auto object-cover rounded-xl select-none"
                  loading="eager"
                  animate={{
                    y: [0, -18, 0, -8, 0],
                    scale: [1, 1.025, 1, 1.012, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            )}
          </motion.div>

          {/* Action Controls in Final Reveal */}
          {phase === 'final_reveal' && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleReplayScrollVideo}
                className="px-5 py-2.5 bg-neutral-900/90 hover:bg-neutral-800 border border-amber-500/40 hover:border-amber-400 text-amber-300 font-mono text-xs font-bold tracking-widest uppercase rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Film size={14} />
                <span>REPLAY SCROLL SEQUENCE</span>
              </button>

              <button
                onClick={handleRestartFullSequence}
                className="px-5 py-2.5 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 hover:border-neutral-500 text-neutral-300 hover:text-white font-mono text-xs font-bold tracking-widest uppercase rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <RotateCcw size={14} />
                <span>REPLAY FROM COUNTDOWN</span>
              </button>

              {onReplay && (
                <button
                  onClick={onReplay}
                  className="px-5 py-2.5 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 hover:border-neutral-500 text-neutral-400 hover:text-white font-mono text-xs font-bold tracking-widest uppercase rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <RotateCcw size={14} />
                  <span>RESTART MISSION</span>
                </button>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
