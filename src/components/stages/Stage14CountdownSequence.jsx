import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldAlert, Zap } from 'lucide-react';
import { useAudio } from '../AudioManager';

export const Stage14CountdownSequence = ({ onNext }) => {
  const { playSfx } = useAudio();
  const [count, setCount] = useState(5);

  useEffect(() => {
    playSfx('heartbeat');

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          playSfx('door');
          setTimeout(() => {
            playSfx('transition');
            onNext();
          }, 600);
          return 0;
        }
        playSfx('heartbeat');
        return prev - 1;
      });
    }, 1100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 font-mono select-none">
      <div className="w-full max-w-lg text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-red-950/80 border border-red-700 text-red-400 font-mono text-xs px-3 py-1 rounded-full uppercase tracking-widest font-bold">
          <Activity size={14} className="animate-spin" />
          <span>SEISMIC PRESSURE PEAKING</span>
        </div>

        <h2 className="font-serif font-black text-xl sm:text-2xl text-neutral-300 tracking-wider">
          FINAL CLEARANCE CONVERGENCE
        </h2>

        {/* Dynamic Big Countdown Number */}
        <div className="relative h-44 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={count}
              initial={{ scale: 2, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.3, opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="font-serif font-black text-8xl sm:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-amber-400 to-amber-600 drop-shadow-[0_0_40px_rgba(239,68,68,0.7)] select-none"
            >
              {count > 0 ? count : "READY"}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="bg-black/80 border border-neutral-800 rounded-lg p-4 max-w-md mx-auto text-xs text-neutral-400 space-y-1">
          <div className="flex justify-between font-mono">
            <span>ISOLATION SHIELD:</span>
            <span className="text-red-500 font-bold">COLLAPSING</span>
          </div>
          <div className="flex justify-between font-mono">
            <span>CORE VAULT LOCK:</span>
            <span className="text-amber-400 font-bold">READY FOR DEPLOYMENT</span>
          </div>
        </div>

        <button
          onClick={onNext}
          className="text-[11px] font-mono text-neutral-500 hover:text-neutral-300 transition-colors uppercase tracking-widest underline cursor-pointer"
        >
          Skip Countdown &rarr;
        </button>
      </div>
    </div>
  );
};
