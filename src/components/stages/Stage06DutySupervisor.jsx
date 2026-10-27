import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileBadge, Check, UserCheck, Shield } from 'lucide-react';
import { AssetFallback } from '../AssetFallback';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';
import { useAudio } from '../AudioManager';

export const Stage06DutySupervisor = ({ onNext }) => {
  const { playSfx } = useAudio();
  const [isApproved, setIsApproved] = useState(false);

  const handleStamp = () => {
    if (isApproved) return;
    setIsApproved(true);
    playSfx('door');
    setTimeout(() => {
      playSfx('transition');
      onNext();
    }, 1000);
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 font-mono select-none">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6 sm:p-8 shadow-2xl relative"
      >
        <div className="flex justify-between items-center border-b border-neutral-800 pb-3 mb-5">
          <div className="flex items-center gap-2 text-xs text-amber-500 font-bold">
            <FileBadge size={16} /> CLASSIFIED DOSSIER // WARDEN DIVISION
          </div>
          <span className="text-[10px] bg-neutral-900 border border-neutral-700 px-2 py-0.5 rounded text-neutral-400">
            RECORD #TN-WARDEN-01
          </span>
        </div>

        {/* Supervisor Profile Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center mb-6">
          <div className="relative rounded-lg overflow-hidden border border-neutral-800">
            <AssetFallback 
              src={BIRTHDAY_CONFIG.ASSETS.DUTY_SUPERVISOR_IMAGE} 
              alt="Duty Supervisor File" 
              type="supervisor"
              aspectRatio="aspect-[4/5]"
            />
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-neutral-500 text-[10px] block uppercase">DESIGNATION</span>
              <span className="text-neutral-200 font-serif font-bold text-base">DUTY SUPERVISOR</span>
            </div>
            <div>
              <span className="text-neutral-500 text-[10px] block uppercase">OPERATIVE CLEARANCE</span>
              <span className="text-red-400 font-bold">CLASS-A MAXIMUM</span>
            </div>
            <div className="bg-neutral-950 p-3 rounded border border-neutral-900">
              <span className="text-neutral-500 text-[10px] block mb-1">INTERCEPTED STATEMENT:</span>
              <p className="text-neutral-300 italic text-[11px] leading-relaxed">
                &ldquo;{BIRTHDAY_CONFIG.DIALOGUES.SUPERVISOR}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Approval Stamp Interaction */}
        <div className="border-t border-neutral-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-neutral-400 flex items-center gap-2">
            <Shield size={14} className="text-red-500" />
            <span>AUTHORIZATION SEAL REQUIRED</span>
          </div>

          <button
            onClick={handleStamp}
            disabled={isApproved}
            className={`w-full sm:w-auto px-6 py-2.5 rounded font-mono text-xs font-bold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
              isApproved
                ? 'bg-emerald-900 border border-emerald-600 text-emerald-300 shadow-[0_0_20px_#10b981]'
                : 'bg-red-700 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] cursor-pointer'
            }`}
          >
            {isApproved ? (
              <>
                <Check size={16} />
                <span>CLEARED BY WARDEN</span>
              </>
            ) : (
              <>
                <UserCheck size={16} />
                <span>AFFIX CLEARANCE STAMP</span>
              </>
            )}
          </button>
        </div>

        {/* Animated Stamp Effect */}
        {isApproved && (
          <motion.div
            initial={{ scale: 2, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 0.9, rotate: -12 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-emerald-500 text-emerald-400 font-serif font-black text-2xl sm:text-3xl tracking-widest px-6 py-2 rounded uppercase pointer-events-none bg-black/60 shadow-[0_0_25px_#10b981]"
          >
            APPROVED
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
