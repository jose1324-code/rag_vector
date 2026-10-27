import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, Unlock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAudio } from '../AudioManager';

export const Stage15SealedFile = ({ onNext }) => {
  const { playSfx } = useAudio();
  const [turns, setTurns] = useState(0);
  const isUnlocked = turns >= 4;

  const handleTurnWheel = () => {
    if (isUnlocked) return;
    const nextTurns = turns + 1;
    setTurns(nextTurns);
    playSfx('door');

    if (nextTurns >= 4) {
      setTimeout(() => {
        playSfx('transition');
      }, 500);
    }
  };

  const handleProceed = () => {
    playSfx('transition');
    onNext();
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 font-mono select-none">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-[#0e0e0e] border border-neutral-800 rounded-xl p-6 sm:p-8 shadow-2xl relative text-center"
      >
        <div className="inline-block bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-[10px] tracking-widest px-3 py-1 rounded mb-3 uppercase">
          STEEL VAULT MECHANISM // STAGE 15
        </div>

        <h2 className="font-serif font-black text-2xl text-neutral-100 tracking-wider mb-2">
          UNSEAL INNER VAULT
        </h2>

        <p className="text-xs text-neutral-400 mb-6">
          Rotate the heavy titanium vault wheel 4 times to disengage the internal deadbolts.
        </p>

        {/* Heavy Vault Wheel */}
        <div className="my-6 flex justify-center">
          <div
            onClick={handleTurnWheel}
            className={`relative w-44 h-44 rounded-full border-8 cursor-pointer transition-all duration-300 flex items-center justify-center shadow-2xl ${
              isUnlocked
                ? 'border-emerald-500 bg-emerald-950/30 shadow-[0_0_35px_#10b981]'
                : 'border-neutral-700 bg-neutral-900/80 hover:border-amber-500'
            }`}
          >
            {/* Wheel Spokes */}
            <motion.div
              animate={{ rotate: turns * 90 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full h-3 bg-neutral-700 rounded-full" />
              <div className="h-full w-3 bg-neutral-700 rounded-full" />
              <div className="absolute w-20 h-20 rounded-full border-4 border-neutral-600 bg-neutral-800 flex items-center justify-center shadow-inner">
                {isUnlocked ? (
                  <Unlock size={28} className="text-emerald-400" />
                ) : (
                  <RotateCw size={26} className="text-neutral-400 animate-spin" />
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Turn Progress Counter */}
        <div className="text-xs font-mono mb-6">
          {isUnlocked ? (
            <div className="text-emerald-400 font-bold flex items-center justify-center gap-1.5">
              <ShieldCheck size={16} /> ALL 4 DEADBOLTS DISENGAGED // VAULT OPEN
            </div>
          ) : (
            <div className="text-amber-400 font-bold">
              CLICK WHEEL TO ROTATE ({turns} / 4 TURNS COMPLETED)
            </div>
          )}
        </div>

        {/* Button */}
        <div className="border-t border-neutral-800 pt-5">
          <button
            onClick={handleProceed}
            disabled={!isUnlocked}
            className={`w-full py-3 rounded-lg font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all ${
              isUnlocked
                ? 'bg-red-700 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] cursor-pointer'
                : 'bg-neutral-900 text-neutral-600 cursor-not-allowed border border-neutral-800'
            }`}
          >
            <span>{isUnlocked ? "EXTRACT PERSONAL TELEGRAMS" : "ROTATE WHEEL 4 TIMES FIRST"}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
