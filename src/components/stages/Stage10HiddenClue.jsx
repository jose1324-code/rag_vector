import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Flashlight, Eye, Check, ArrowRight } from 'lucide-react';
import { useAudio } from '../AudioManager';

export const Stage10HiddenClue = ({ onNext }) => {
  const { playSfx } = useAudio();
  const [torchPos, setTorchPos] = useState({ x: 50, y: 50 });
  const [clueRevealed, setClueRevealed] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setTorchPos({ x, y });

    // Center zone reveals clue
    if (x >= 35 && x <= 65 && y >= 35 && y <= 65) {
      if (!clueRevealed) {
        setClueRevealed(true);
        playSfx('door');
      }
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
        className="w-full max-w-2xl bg-[#0c0c0c] border border-neutral-800 rounded-xl p-6 sm:p-8 shadow-2xl relative"
      >
        <div className="flex justify-between items-center border-b border-neutral-800 pb-3 mb-5">
          <div className="flex items-center gap-2 text-xs text-amber-500 font-bold">
            <Flashlight size={16} /> ULTRA-VIOLET CLUE DISCOVERY // STAGE 10
          </div>
          <span className="text-[10px] bg-neutral-900 border border-neutral-800 text-neutral-400 px-2 py-0.5 rounded">
            OPTICAL SCANNER
          </span>
        </div>

        <p className="text-xs text-neutral-400 mb-4">
          Move your cursor or finger across the classified surface below to reveal the concealed ultraviolet markings.
        </p>

        {/* UV Blacklight Interactive Surface */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            handleMouseMove(touch);
          }}
          className="relative h-64 w-full bg-[#050505] rounded-xl border-2 border-neutral-800 overflow-hidden cursor-crosshair flex items-center justify-center"
        >
          {/* Blueprint Background Grid */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Hidden Glowing Text (illuminated when torch moves nearby) */}
          <div 
            className="text-center transition-opacity duration-300 pointer-events-none p-6"
            style={{
              opacity: clueRevealed ? 1 : 0.08
            }}
          >
            <div className="font-serif font-black text-2xl sm:text-3xl text-emerald-400 tracking-wider shadow-[0_0_20px_#10b981]">
              PASSCODE: [ 7709 ]
            </div>
            <div className="text-xs text-cyan-300 font-mono tracking-widest mt-2 uppercase font-bold">
              // CLASSIFIED NOTE: &ldquo;THE BOSS COMMANDS THE ENTIRE SECTOR&rdquo; //
            </div>
            <div className="text-[10px] text-neutral-400 mt-1">
              RECORD CIPHER RECOVERED // HIGH-SECURITY ACCESS GRANTED
            </div>
          </div>

          {/* Glowing UV Torch Follower */}
          <div 
            className="pointer-events-none absolute w-36 h-36 rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-screen transition-transform duration-75"
            style={{
              left: `${torchPos.x}%`,
              top: `${torchPos.y}%`,
              background: 'radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(6,182,212,0.15) 50%, transparent 70%)'
            }}
          />
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
            <Eye size={15} className={clueRevealed ? "text-emerald-400" : "text-amber-500"} />
            <span>{clueRevealed ? "CLUE DISCOVERED: 7709" : "SCAN THE CENTER OF THE BLUEPRINT"}</span>
          </div>

          <button
            onClick={handleProceed}
            className={`w-full sm:w-auto px-6 py-2.5 rounded font-mono text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
              clueRevealed
                ? 'bg-red-700 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
            }`}
          >
            <span>ACCESS SURVEILLANCE FEED</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
