import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderLock, FolderOpen, ArrowRight, Skull, ShieldCheck } from 'lucide-react';
import { AssetFallback } from '../AssetFallback';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';
import { useAudio } from '../AudioManager';

export const Stage07GangsterDossier = ({ onNext }) => {
  const { playSfx } = useAudio();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenFolder = () => {
    if (!isOpen) {
      setIsOpen(true);
      playSfx('door');
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
        className="w-full max-w-2xl bg-[#111] border border-neutral-800 rounded-xl p-6 sm:p-8 shadow-2xl relative"
      >
        <div className="flex justify-between items-center border-b border-neutral-800 pb-3 mb-5">
          <div className="flex items-center gap-2 text-xs text-red-500 font-bold">
            <Skull size={16} /> CRIMINAL RECORD DISCOVERY // ARCHIVE 07
          </div>
          <span className="text-[10px] bg-red-950/60 border border-red-800 text-red-400 px-2 py-0.5 rounded">
            LEVEL: SUPREME BOSS
          </span>
        </div>

        {!isOpen ? (
          <div 
            onClick={handleOpenFolder}
            className="group cursor-pointer bg-gradient-to-b from-[#221c15] to-[#120f0c] border-2 border-[#4a3b2c] hover:border-amber-600/80 rounded-xl p-8 text-center transition-all duration-300 shadow-2xl relative overflow-hidden"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-red-950/80 border-2 border-red-600 flex items-center justify-center mb-4 shadow-[0_0_20px_#ef4444] group-hover:scale-105 transition-transform">
              <FolderLock size={36} className="text-red-400" />
            </div>

            <h3 className="font-serif font-black text-xl text-amber-200 tracking-wider mb-2">
              SEALED DOSSIER : DOSSIER #ALAPPARA-TN
            </h3>

            <p className="text-xs text-neutral-400 max-w-md mx-auto mb-6">
              Classified intelligence file locked under Supreme Warden authority. Break the seal to inspect the subject profile.
            </p>

            <button
              onClick={handleOpenFolder}
              className="px-6 py-2.5 bg-red-800 hover:bg-red-700 text-white font-mono text-xs font-bold tracking-widest uppercase rounded shadow-[0_0_20px_rgba(220,38,38,0.5)] transition"
            >
              CLICK TO BREAK WAX SEAL
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
              <div className="rounded-lg overflow-hidden border border-[#3e3428]">
                <AssetFallback 
                  src={BIRTHDAY_CONFIG.ASSETS.GANGSTER_DOSSIER_IMAGE} 
                  alt="Gangster Dossier" 
                  type="dossier"
                  aspectRatio="aspect-square"
                />
              </div>

              <div className="space-y-3 text-xs bg-black/60 p-4 rounded-lg border border-neutral-900">
                <div className="border-b border-neutral-900 pb-2">
                  <span className="text-neutral-500 text-[10px] block">KNOWN ALIAS</span>
                  <span className="text-amber-400 font-serif font-black text-lg tracking-wider">
                    THE UNDERWORLD ARCHITECT
                  </span>
                </div>

                <div className="border-b border-neutral-900 pb-2">
                  <span className="text-neutral-500 text-[10px] block">SECURITY RISK</span>
                  <span className="text-red-400 font-bold">LEGENDARY / IRREVERSIBLE IMPACT</span>
                </div>

                <div>
                  <span className="text-neutral-500 text-[10px] block mb-1">INTEL REPORT:</span>
                  <p className="text-neutral-300 italic text-[11px] leading-relaxed">
                    &ldquo;He doesn&apos;t walk into rooms to seek permission. When he enters, silence falls and respect is given.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-neutral-800">
              <button
                onClick={handleProceed}
                className="w-full sm:w-auto px-6 py-2.5 bg-red-700 hover:bg-red-600 text-white font-mono text-xs font-bold tracking-widest uppercase rounded flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.4)] transition"
              >
                <span>PROCEED TO CIPHER CHALLENGE</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
