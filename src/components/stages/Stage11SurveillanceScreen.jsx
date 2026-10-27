import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Radio, CheckCircle, ArrowRight } from 'lucide-react';
import { AssetFallback } from '../AssetFallback';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';
import { useAudio } from '../AudioManager';

export const Stage11SurveillanceScreen = ({ onNext }) => {
  const { playSfx } = useAudio();
  const [selectedCam, setSelectedCam] = useState(2); // Camera 03: The Vault

  const cameras = [
    { id: 0, name: "CAM 01 // MAIN PERIMETER", status: "CLEAR", note: "Guards on patrol" },
    { id: 1, name: "CAM 02 // CELL BLOCK ALPHA", status: "SECURE", note: "All gates locked" },
    { id: 2, name: "CAM 03 // THE HIGH-SECURITY VAULT", status: "TARGET LOCATED", note: "Presence detected" },
    { id: 3, name: "CAM 04 // ARMORY CORRIDOR", status: "STANDBY", note: "Weapons secured" }
  ];

  const handleSelectCam = (idx) => {
    setSelectedCam(idx);
    playSfx('beep');
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
        className="w-full max-w-3xl bg-[#0a0a0a] border border-neutral-800 rounded-xl p-6 sm:p-8 shadow-2xl relative"
      >
        <div className="flex justify-between items-center border-b border-neutral-800 pb-3 mb-4">
          <div className="flex items-center gap-2 text-xs text-red-500 font-bold">
            <Camera size={16} /> CCTV SURVEILLANCE GRID // STAGE 11
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono bg-emerald-950/40 border border-emerald-900 px-2 py-0.5 rounded">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            LIVE MULTI-FEED ACTIVE
          </div>
        </div>

        {/* Main Active Feed Display */}
        <div className="relative rounded-lg overflow-hidden border-2 border-neutral-800 mb-4 bg-black">
          <AssetFallback 
            src={BIRTHDAY_CONFIG.ASSETS.SURVEILLANCE_IMAGE} 
            alt="CCTV Surveillance Feed" 
            type="surveillance" 
            aspectRatio="aspect-[16/9]"
          />

          {/* Active Cam Label Overlay */}
          <div className="absolute top-3 left-3 bg-black/80 border border-emerald-500/50 px-2.5 py-1 rounded text-xs text-emerald-400 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span>{cameras[selectedCam].name}</span>
          </div>

          <div className="absolute bottom-3 left-3 bg-black/80 px-2.5 py-1 rounded text-[11px] text-neutral-300 font-mono">
            STATUS: <span className="text-amber-400 font-bold">{cameras[selectedCam].status}</span>
          </div>
        </div>

        {/* Cam Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {cameras.map((cam, idx) => (
            <button
              key={cam.id}
              onClick={() => handleSelectCam(idx)}
              className={`p-2.5 rounded border text-left text-[11px] font-mono transition-all ${
                selectedCam === idx
                  ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                  : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
              }`}
            >
              <div className="font-bold flex items-center justify-between">
                <span>CAM 0{idx + 1}</span>
                {selectedCam === idx && <span className="text-emerald-400 text-xs">●</span>}
              </div>
              <div className="text-[10px] text-neutral-500 truncate mt-0.5">
                {cam.name.split('// ')[1]}
              </div>
            </button>
          ))}
        </div>

        {/* Proceed Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-800 pt-4">
          <div className="text-xs text-neutral-400 flex items-center gap-2">
            <CheckCircle size={15} className="text-emerald-400" />
            <span>TARGET POSITION CONFIRMED IN SECTOR VAULT</span>
          </div>

          <button
            onClick={handleProceed}
            className="w-full sm:w-auto px-6 py-2.5 bg-red-700 hover:bg-red-600 text-white font-mono text-xs font-bold tracking-widest uppercase rounded flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.4)] transition"
          >
            <span>CHOOSE INFILTRATION SECTOR</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
