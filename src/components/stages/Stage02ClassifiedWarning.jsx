import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useAudio } from '../AudioManager';

export const Stage02ClassifiedWarning = ({ onNext }) => {
  const { playSfx } = useAudio();

  useEffect(() => {
    playSfx('alert');
  }, []);

  const handleAcknowledge = () => {
    playSfx('transition');
    onNext();
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 font-mono select-none">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl bg-gradient-to-b from-[#18090a] to-[#0a0a0a] border-2 border-red-600/70 rounded-xl p-6 sm:p-8 shadow-[0_0_40px_rgba(220,38,38,0.25)] relative overflow-hidden"
      >
        {/* Warning Badge */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-950/80 border-2 border-red-600 flex items-center justify-center shadow-[0_0_25px_#dc2626] animate-pulse">
            <AlertOctagon size={36} className="text-red-500" />
          </div>
        </div>

        {/* Warning Title */}
        <div className="text-center space-y-2 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-red-600 text-black px-3 py-1 font-bold text-xs tracking-widest uppercase rounded"
          >
            RESTRICTED ACCESS LEVEL 07
          </motion.div>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-red-500 tracking-wider">
            UNAUTHORIZED ACCESS DETECTED
          </h2>
          <p className="text-xs text-neutral-400 font-mono tracking-wide">
            YOU HAVE BREACHED HIGH-SECURITY SYSTEM FREQUENCY [ALAPPARA-NODE]
          </p>
        </div>

        {/* Threat Appraisal Details */}
        <div className="bg-black/60 border border-red-950 rounded-lg p-4 mb-6 space-y-2.5 text-xs text-neutral-300">
          <div className="flex justify-between items-center border-b border-neutral-900 pb-2">
            <span className="text-neutral-500">SECTOR LOCATION:</span>
            <span className="text-red-400 font-bold">TAMIL UNDERWORLD VAULT</span>
          </div>
          <div className="flex justify-between items-center border-b border-neutral-900 pb-2">
            <span className="text-neutral-500">SURVEILLANCE STATUS:</span>
            <span className="text-amber-400 font-bold">ALL SENSORS LOCKING ON YOU</span>
          </div>
          <div className="pt-2 text-center text-neutral-400 italic text-[11px]">
            &ldquo;Inga nadakkuradhu yaarum paakka koodadhu... Unless you are the chosen one.&rdquo;
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleAcknowledge}
          className="w-full py-3 bg-red-700 hover:bg-red-600 text-white font-mono text-xs font-bold tracking-widest rounded-lg transition-all shadow-[0_0_25px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={16} />
          <span>ACKNOWLEDGE RISK & ENGAGE OVERRIDE</span>
        </button>
      </motion.div>
    </div>
  );
};
