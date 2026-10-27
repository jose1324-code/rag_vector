import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, KeyRound, Unlock } from 'lucide-react';
import { AssetFallback } from '../AssetFallback';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';
import { useAudio } from '../AudioManager';

export const Stage05PrisonAccess = ({ onNext }) => {
  const { playSfx } = useAudio();
  const [frequency, setFrequency] = useState(30);
  const isAligned = frequency >= 72 && frequency <= 82; // Target 77

  const handleUnlock = () => {
    if (!isAligned) {
      playSfx('beep');
      return;
    }
    playSfx('door');
    setTimeout(() => {
      playSfx('transition');
      onNext();
    }, 800);
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 font-mono select-none">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-[#0d0d0d] border border-neutral-800 rounded-xl p-6 shadow-2xl space-y-5"
      >
        <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-red-500 font-bold">
            <Sliders size={15} /> HYDRAULIC PRESSURE CALIBRATION
          </div>
          <span className="text-[10px] bg-red-950/80 text-red-400 border border-red-800 px-2 py-0.5 rounded font-mono">
            SECTOR CORRIDOR 04
          </span>
        </div>

        {/* Visual of Jail Corridor */}
        <div className="relative rounded-lg overflow-hidden border border-neutral-800">
          <AssetFallback 
            src={BIRTHDAY_CONFIG.ASSETS.JAIL_CORRIDOR_IMAGE} 
            alt="Jail Corridor Clearance" 
            type="corridor" 
            aspectRatio="aspect-[21/9]"
          />
        </div>

        {/* Calibration Slider */}
        <div className="bg-black/60 border border-neutral-900 rounded-lg p-5 space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-neutral-400">PNEUMATIC FREQUENCY:</span>
            <span className={`font-bold font-mono text-base ${isAligned ? 'text-emerald-400' : 'text-amber-400'}`}>
              {frequency} MHz {isAligned ? "✓ (TUNED)" : "(CALIBRATE TO 77 MHz)"}
            </span>
          </div>

          <input 
            type="range"
            min="10"
            max="100"
            value={frequency}
            onChange={(e) => {
              setFrequency(Number(e.target.value));
              playSfx('beep');
            }}
            className="w-full accent-red-600 bg-neutral-800 h-2 rounded-lg cursor-pointer"
          />

          <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
            <span>10 MHz</span>
            <span className="text-red-500 font-bold">TARGET: 77 MHz</span>
            <span>100 MHz</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleUnlock}
          disabled={!isAligned}
          className={`w-full py-3 rounded-lg font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all ${
            isAligned 
              ? 'bg-red-700 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] cursor-pointer' 
              : 'bg-neutral-900 text-neutral-600 cursor-not-allowed border border-neutral-800'
          }`}
        >
          {isAligned ? <Unlock size={16} /> : <KeyRound size={16} />}
          <span>{isAligned ? "DISENGAGE HYDRAULIC LOCKS" : "ALIGN TO 77 MHz TO UNLOCK"}</span>
        </button>
      </motion.div>
    </div>
  );
};
