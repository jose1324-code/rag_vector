import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyRound, ShieldAlert, Zap, Lock, Unlock, ArrowRight } from 'lucide-react';
import { useAudio } from '../AudioManager';

export const Stage17FinalAuthorization = ({ onNext }) => {
  const { playSfx } = useAudio();
  const [key1Turned, setKey1Turned] = useState(false);
  const [key2Turned, setKey2Turned] = useState(false);
  const [coverFlipped, setCoverFlipped] = useState(false);
  const [isFiring, setIsFiring] = useState(false);

  const canEngage = key1Turned && key2Turned;

  const handleTurnKey1 = () => {
    if (!key1Turned) {
      setKey1Turned(true);
      playSfx('door');
    }
  };

  const handleTurnKey2 = () => {
    if (!key2Turned) {
      setKey2Turned(true);
      playSfx('door');
    }
  };

  const handleEngage = () => {
    if (!canEngage || isFiring) return;
    setIsFiring(true);
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
        className="w-full max-w-xl bg-gradient-to-b from-[#140b0c] to-[#0a0a0a] border-2 border-red-700/80 rounded-xl p-6 sm:p-8 shadow-[0_0_50px_rgba(220,38,38,0.3)] text-center relative"
      >
        <div className="inline-block bg-red-600 text-black px-3 py-1 font-bold text-xs tracking-widest uppercase rounded mb-3">
          FINAL AUTHORIZATION INTERLOCK // STAGE 17
        </div>

        <h2 className="font-serif font-black text-2xl sm:text-3xl text-neutral-100 tracking-wider mb-2">
          DUAL-KEY IGNITION PROTOCOL
        </h2>

        <p className="text-xs text-neutral-400 mb-8 max-w-md mx-auto">
          The supreme clearance gate requires dual synchronized key turn. Turn both physical keys to unlock the master console.
        </p>

        {/* Dual Key Mechanism */}
        <div className="grid grid-cols-2 gap-6 mb-8 max-w-md mx-auto">
          {/* Key 1 */}
          <div 
            onClick={handleTurnKey1}
            className={`p-5 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
              key1Turned 
                ? 'border-emerald-500 bg-emerald-950/30 shadow-[0_0_20px_#10b981]' 
                : 'border-neutral-700 bg-neutral-900 hover:border-neutral-500'
            }`}
          >
            <motion.div 
              animate={{ rotate: key1Turned ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-16 h-16 rounded-full bg-black border-2 border-neutral-600 flex items-center justify-center mb-3"
            >
              <KeyRound size={28} className={key1Turned ? "text-emerald-400" : "text-neutral-400"} />
            </motion.div>
            <span className="text-[11px] font-bold text-neutral-200 uppercase tracking-widest">
              KEY 01 : SUPERVISOR
            </span>
            <span className={`text-[10px] mt-1 ${key1Turned ? "text-emerald-400 font-bold" : "text-neutral-500"}`}>
              {key1Turned ? "TURNED [90°]" : "CLICK TO TURN"}
            </span>
          </div>

          {/* Key 2 */}
          <div 
            onClick={handleTurnKey2}
            className={`p-5 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
              key2Turned 
                ? 'border-emerald-500 bg-emerald-950/30 shadow-[0_0_20px_#10b981]' 
                : 'border-neutral-700 bg-neutral-900 hover:border-neutral-500'
            }`}
          >
            <motion.div 
              animate={{ rotate: key2Turned ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-16 h-16 rounded-full bg-black border-2 border-neutral-600 flex items-center justify-center mb-3"
            >
              <KeyRound size={28} className={key2Turned ? "text-emerald-400" : "text-neutral-400"} />
            </motion.div>
            <span className="text-[11px] font-bold text-neutral-200 uppercase tracking-widest">
              KEY 02 : OPERATIVE
            </span>
            <span className={`text-[10px] mt-1 ${key2Turned ? "text-emerald-400 font-bold" : "text-neutral-500"}`}>
              {key2Turned ? "TURNED [90°]" : "CLICK TO TURN"}
            </span>
          </div>
        </div>

        {/* Master Red Ignition Button */}
        <div className="border-t border-neutral-800 pt-6">
          <button
            onClick={handleEngage}
            disabled={!canEngage || isFiring}
            className={`w-full py-4 rounded-xl font-mono text-sm font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
              canEngage 
                ? 'bg-gradient-to-r from-red-700 via-red-600 to-amber-600 hover:scale-[1.02] text-white shadow-[0_0_35px_rgba(239,68,68,0.7)] cursor-pointer animate-pulse'
                : 'bg-neutral-900 text-neutral-600 cursor-not-allowed border border-neutral-800'
            }`}
          >
            <Zap size={18} />
            <span>{canEngage ? "ENGAGE FINAL AUTHORIZATION" : "TURN BOTH KEYS TO UNLOCK"}</span>
          </button>
        </div>

        <div className="mt-4 text-[10px] text-neutral-500 font-mono">
          WARNING: ENGAGING THIS PROTOCOL WILL PERMANENTLY BREACH THE FINAL VAULT.
        </div>
      </motion.div>
    </div>
  );
};
