import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, ArrowDown } from 'lucide-react';
import { useAudio } from '../AudioManager';

export const Stage03AuthorizationSwitch = ({ onNext }) => {
  const { playSfx } = useAudio();
  const [isSwitched, setIsSwitched] = useState(false);

  const handleToggle = () => {
    if (isSwitched) return;
    setIsSwitched(true);
    playSfx('door');
    setTimeout(() => {
      playSfx('transition');
      onNext();
    }, 900);
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 font-mono select-none">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-[#0e0e0e] border-2 border-neutral-800 rounded-xl p-6 sm:p-8 shadow-2xl relative text-center"
      >
        <div className="text-[11px] font-mono text-amber-500 uppercase tracking-widest font-bold mb-2 flex items-center justify-center gap-1.5">
          <Zap size={14} /> AUXILIARY POWER BUS // PROTOCOL 03
        </div>

        <h2 className="font-serif font-black text-2xl text-neutral-100 tracking-wider mb-2">
          MANUAL POWER INTERLOCK
        </h2>

        <p className="text-xs text-neutral-400 mb-8">
          The main security gate requires high-voltage manual diversion. Engage the heavy industrial breaker to restore power.
        </p>

        {/* Heavy Knife Breaker Switch Graphic */}
        <div className="my-6 flex flex-col items-center justify-center">
          <div 
            onClick={handleToggle}
            className={`w-32 h-64 bg-gradient-to-b from-[#1c1c1c] to-[#0c0c0c] border-4 ${
              isSwitched ? 'border-red-600 shadow-[0_0_35px_rgba(220,38,38,0.5)]' : 'border-neutral-700'
            } rounded-2xl p-3 flex flex-col justify-between items-center cursor-pointer transition-all hover:border-neutral-500 relative`}
          >
            {/* Status Lamps */}
            <div className="flex gap-4">
              <div className={`w-3 h-3 rounded-full ${!isSwitched ? 'bg-amber-500 animate-pulse' : 'bg-neutral-800'}`} />
              <div className={`w-3 h-3 rounded-full ${isSwitched ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-neutral-800'}`} />
            </div>

            {/* Knife Lever Mechanism */}
            <div className="relative w-8 h-40 bg-neutral-900 rounded-full flex flex-col justify-between items-center py-2">
              <div className="w-1.5 h-full bg-neutral-700 rounded" />
              
              <motion.div
                animate={{ y: isSwitched ? 100 : 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className={`absolute top-2 w-14 h-14 rounded-full border-4 ${
                  isSwitched ? 'bg-red-700 border-red-500' : 'bg-neutral-800 border-neutral-600 hover:bg-neutral-700'
                } flex items-center justify-center shadow-2xl`}
              >
                <div className="w-4 h-4 rounded-full bg-white/20" />
              </motion.div>
            </div>

            {/* Instruction Tag */}
            <div className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
              {isSwitched ? "ENGAGED" : "PULL LEVER"}
            </div>
          </div>
        </div>

        {/* Hint */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-neutral-500">
          {!isSwitched ? (
            <>
              <ArrowDown size={14} className="text-amber-500 animate-bounce" />
              <span>Click or pull the breaker handle to engage power</span>
            </>
          ) : (
            <>
              <ShieldCheck size={16} className="text-emerald-500 animate-spin" />
              <span className="text-emerald-400 font-bold">POWER ENGAGED. ADVANCING...</span>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
