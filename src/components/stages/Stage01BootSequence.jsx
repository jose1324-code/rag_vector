import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, ArrowRight } from 'lucide-react';
import { useAudio } from '../AudioManager';

export const Stage01BootSequence = ({ onNext }) => {
  const { playSfx } = useAudio();
  const [lines, setLines] = useState([]);
  const [isBooted, setIsBooted] = useState(false);

  const bootLogs = [
    "KERNEL [V7.09] INITIALIZING HARDWARE ENCRYPTION BUS...",
    "ISOLATING SUB-LEVEL NETWORK NODES...",
    "SECURITY PROTOCOL: OMEGA-RED LOCKED.",
    "MEMORY SECTORS INTEGRITY CHECK: 100% OK.",
    "CLASSIFIED SYSTEM INITIALIZING...",
    "TAMIL REGION HIGH-SECURITY CORRECTIONAL MAINFRAME ONLINE.",
    "READY FOR OPERATIVE INPUT."
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < bootLogs.length) {
        setLines(prev => [...prev, bootLogs[index]]);
        playSfx('beep');
        index++;
      } else {
        clearInterval(interval);
        setIsBooted(true);
      }
    }, 380);

    return () => clearInterval(interval);
  }, []);

  const handleInitialize = () => {
    playSfx('transition');
    onNext();
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 font-mono select-none">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl bg-black/90 border border-neutral-800 rounded-xl p-6 shadow-2xl relative overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-600/80 inline-block animate-pulse" />
            <span className="w-3 h-3 rounded-full bg-neutral-700 inline-block" />
            <span className="w-3 h-3 rounded-full bg-neutral-700 inline-block" />
            <span className="text-xs text-neutral-400 font-bold ml-2 flex items-center gap-1.5">
              <Terminal size={14} className="text-red-500" /> SYS_BOOT://SECTOR-77
            </span>
          </div>
          <span className="text-[10px] text-neutral-500 font-mono tracking-widest">
            MAINFRAME v4.19
          </span>
        </div>

        {/* Boot Logs Output */}
        <div className="space-y-2 text-xs md:text-sm min-h-[220px]">
          {lines.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-neutral-300"
            >
              <span className="text-red-500">&gt;</span>
              <span className={i === 4 ? "text-amber-400 font-bold tracking-wider" : ""}>
                {log}
              </span>
            </motion.div>
          ))}
          {!isBooted && (
            <div className="flex items-center gap-2 text-red-500">
              <span>&gt;</span>
              <span className="w-2.5 h-4 bg-red-500 inline-block animate-pulse" />
            </div>
          )}
        </div>

        {/* Action Button */}
        {isBooted && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="text-[11px] text-neutral-400 flex items-center gap-2">
              <Shield size={14} className="text-emerald-500" />
              <span>TERMINAL STATUS: ONLINE & WAITING</span>
            </div>

            <button
              onClick={handleInitialize}
              className="w-full sm:w-auto px-6 py-2.5 bg-red-700 hover:bg-red-600 text-white font-mono text-xs font-bold tracking-widest rounded transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(185,28,28,0.5)] group"
            >
              <span>ACCESS MAINFRAME</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
