import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitFork, ShieldAlert, Crosshair, ArrowRight } from 'lucide-react';
import { useAudio } from '../AudioManager';

export const Stage12ChoiceChallenge = ({ onChoose }) => {
  const { playSfx } = useAudio();
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleSelect = (route) => {
    setSelectedRoute(route);
    playSfx('beep');
  };

  const handleConfirm = () => {
    if (!selectedRoute) return;
    playSfx('door');
    setTimeout(() => {
      playSfx('transition');
      onChoose(selectedRoute);
    }, 600);
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 font-mono select-none">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-[#0d0d0d] border border-neutral-800 rounded-xl p-6 sm:p-8 shadow-2xl relative"
      >
        <div className="flex justify-between items-center border-b border-neutral-800 pb-3 mb-5">
          <div className="flex items-center gap-2 text-xs text-amber-500 font-bold">
            <GitFork size={16} /> TACTICAL JUNCTION // STAGE 12
          </div>
          <span className="text-[10px] bg-red-950/80 border border-red-800 text-red-400 px-2 py-0.5 rounded">
            DECISION POINT
          </span>
        </div>

        <h2 className="font-serif font-black text-2xl text-neutral-100 tracking-wider mb-2 text-center">
          CHOOSE YOUR INFILTRATION ROUTE
        </h2>

        <p className="text-xs text-neutral-400 text-center max-w-md mx-auto mb-8">
          The prison corridor divides into two fortified blast gates. Every true don makes their own destiny.
        </p>

        {/* The Two Mysterious Choices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Route A */}
          <div
            onClick={() => handleSelect('VAULT')}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 relative ${
              selectedRoute === 'VAULT'
                ? 'border-red-600 bg-red-950/20 shadow-[0_0_25px_rgba(220,38,38,0.4)]'
                : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-600'
            }`}
          >
            <div className="w-12 h-12 rounded-lg bg-red-950/80 border border-red-700 flex items-center justify-center mb-4 text-red-400">
              <ShieldAlert size={24} />
            </div>
            <div className="text-xs font-bold text-red-400 tracking-widest uppercase mb-1">
              ROUTE ALPHA
            </div>
            <h3 className="font-serif font-bold text-lg text-neutral-100 mb-2">
              THE HIGH-SECURITY VAULT
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Breach the core isolation chamber directly. No stealth. Pure mass authority and direct confrontation.
            </p>
          </div>

          {/* Route B */}
          <div
            onClick={() => handleSelect('ARMORY')}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 relative ${
              selectedRoute === 'ARMORY'
                ? 'border-amber-500 bg-amber-950/20 shadow-[0_0_25px_rgba(245,158,11,0.3)]'
                : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-600'
            }`}
          >
            <div className="w-12 h-12 rounded-lg bg-amber-950/80 border border-amber-700 flex items-center justify-center mb-4 text-amber-400">
              <Crosshair size={24} />
            </div>
            <div className="text-xs font-bold text-amber-400 tracking-widest uppercase mb-1">
              ROUTE BETA
            </div>
            <h3 className="font-serif font-bold text-lg text-neutral-100 mb-2">
              THE UNDERGROUND ARMORY
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Bypass through the heavy artillery reserves. Secure tactical dominance before the final reveal.
            </p>
          </div>
        </div>

        {/* Confirm Selection */}
        <div className="flex justify-center border-t border-neutral-800 pt-5">
          <button
            onClick={handleConfirm}
            disabled={!selectedRoute}
            className={`w-full sm:w-auto px-8 py-3 rounded-lg font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all ${
              selectedRoute
                ? 'bg-red-700 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] cursor-pointer'
                : 'bg-neutral-900 text-neutral-600 cursor-not-allowed border border-neutral-800'
            }`}
          >
            <span>{selectedRoute ? `ENGAGE ${selectedRoute} PROTOCOL` : "SELECT A ROUTE TO PROCEED"}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
