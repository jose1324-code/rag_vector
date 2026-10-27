import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Siren, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useAudio } from '../AudioManager';

export const Stage09LockdownBreach = ({ onNext }) => {
  const { playSfx } = useAudio();
  const [overrideProgress, setOverrideProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isOverridden, setIsOverridden] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    playSfx('alert');
  }, []);

  const handleStartHold = () => {
    if (isOverridden) return;
    setIsHolding(true);
    playSfx('beep');

    intervalRef.current = setInterval(() => {
      setOverrideProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          setIsHolding(false);
          setIsOverridden(true);
          playSfx('door');
          setTimeout(() => {
            playSfx('transition');
            onNext();
          }, 800);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
  };

  const handleEndHold = () => {
    if (isOverridden) return;
    setIsHolding(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setOverrideProgress(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 font-mono select-none">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-gradient-to-b from-[#24080a] to-[#0c0505] border-2 border-red-600 rounded-xl p-6 sm:p-8 shadow-[0_0_50px_rgba(239,68,68,0.4)] text-center relative overflow-hidden"
      >
        {/* Flashing Siren */}
        <div className="w-20 h-20 mx-auto rounded-full bg-red-950 border-2 border-red-500 flex items-center justify-center mb-5 shadow-[0_0_35px_#ef4444] animate-pulse">
          <Siren size={42} className="text-red-500 animate-spin" />
        </div>

        <div className="inline-block bg-red-600 text-black px-3 py-1 font-bold text-xs tracking-widest uppercase rounded mb-3">
          SECURITY ALERT // DRILL BREACH
        </div>

        <h2 className="font-serif font-black text-2xl sm:text-3xl text-red-500 tracking-wider mb-2">
          LOCKDOWN SEQUENCE ENGAGED
        </h2>

        <p className="text-xs text-neutral-300 max-w-md mx-auto mb-6 leading-relaxed">
          Blown security relay detected. All steel blast doors have slammed shut. 
          Engage the emergency manual override key to restore operative clearance.
        </p>

        {/* Override Button (Hold to disengage) */}
        <div className="my-6">
          <button
            onMouseDown={handleStartHold}
            onMouseUp={handleEndHold}
            onMouseLeave={handleEndHold}
            onTouchStart={handleStartHold}
            onTouchEnd={handleEndHold}
            className={`w-full py-4 rounded-xl border-2 font-mono text-xs font-bold tracking-widest uppercase transition-all duration-200 relative overflow-hidden ${
              isOverridden
                ? 'border-emerald-500 bg-emerald-950/60 text-emerald-300 shadow-[0_0_30px_#10b981]'
                : 'border-red-500 bg-red-950/50 hover:bg-red-900/60 text-red-100 shadow-[0_0_20px_rgba(239,68,68,0.5)] cursor-pointer'
            }`}
          >
            {/* Progress Fill Background */}
            <div 
              className="absolute left-0 top-0 bottom-0 bg-red-600/60 transition-all pointer-events-none"
              style={{ width: `${overrideProgress}%` }}
            />

            <span className="relative z-10 flex items-center justify-center gap-2">
              {isOverridden ? (
                <>
                  <ShieldCheck size={18} className="text-emerald-400" />
                  <span>LOCKDOWN DISENGAGED // RESUMING</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={18} className="text-amber-400 animate-bounce" />
                  <span>
                    {isHolding ? `HOLDING OVERRIDE: ${overrideProgress}%` : "HOLD BUTTON TO DISENGAGE LOCKDOWN"}
                  </span>
                </>
              )}
            </span>
          </button>
        </div>

        <div className="text-[11px] text-neutral-400 font-mono">
          Fail-safe override protects mission progression. No data will be lost.
        </div>
      </motion.div>
    </div>
  );
};
