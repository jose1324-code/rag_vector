import React, { useState } from 'react';
import { ShieldAlert, Terminal, Layers, HelpCircle, ChevronRight, RotateCcw } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';

export const STAGE_TITLES = [
  "01: BOOT SEQUENCE",
  "02: SECURITY WARNING",
  "03: SYSTEM OVERRIDE SWITCH",
  "04: BIOMETRIC SCAN",
  "05: PRISON CLEARANCE",
  "06: DUTY SUPERVISOR FILE",
  "07: GANGSTER DOSSIER",
  "08: CIPHER CHALLENGE",
  "09: LOCKDOWN BREACH",
  "10: HIDDEN UV CLUE",
  "11: SURVEILLANCE MATRIX",
  "12: SECTOR SELECTION",
  "13: GANGSTER DECREE",
  "14: MASS COUNTDOWN",
  "15: VAULT SEAL BREACH",
  "16: WIRE MESSAGE INTERCEPT",
  "17: DUAL KEY AUTHORIZATION",
  "18: MASS BIRTHDAY REVEAL"
];

export const MissionProgress = ({ 
  currentStage, 
  onStageSelect, 
  onResetMission,
  onOpenAssetModal 
}) => {
  const [showNav, setShowNav] = useState(false);
  const progressPercent = Math.min(100, Math.round((currentStage / 18) * 100));

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-black/90 backdrop-blur-md border-b border-neutral-900 select-none">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        {/* Left: Mission Classification Info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-red-500 font-mono text-xs font-bold tracking-widest">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span className="hidden sm:inline">OPERATION:</span> {BIRTHDAY_CONFIG.OPERATION_CODENAME}
          </div>
          <span className="text-neutral-700 hidden md:inline">|</span>
          <div className="hidden md:flex items-center gap-1 text-[11px] font-mono text-neutral-400">
            <ShieldAlert size={13} className="text-amber-500" />
            <span>{BIRTHDAY_CONFIG.SECURITY_CLEARANCE}</span>
          </div>
        </div>

        {/* Center: Stage Number & Title */}
        <div className="text-center font-mono">
          <div className="text-xs font-bold text-neutral-200 tracking-wider">
            STAGE {String(currentStage).padStart(2, '0')} / 18
          </div>
          <div className="text-[10px] text-red-400/90 tracking-widest uppercase font-semibold hidden sm:block">
            {STAGE_TITLES[currentStage - 1] || "IN PROGRESS"}
          </div>
        </div>

        {/* Right: Quick Stage Drawer & Asset Manifest Guide Button */}
        <div className="flex items-center gap-2 pr-28 sm:pr-36">
          <button
            onClick={onOpenAssetModal}
            className="flex items-center gap-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-amber-400 border border-neutral-800 px-2 py-1 rounded text-[11px] font-mono transition-colors"
            title="Open Asset Replacement Checklist & Manifest"
          >
            <HelpCircle size={13} />
            <span className="hidden lg:inline">ASSET GUIDE</span>
          </button>

          <button
            onClick={() => setShowNav(!showNav)}
            className="flex items-center gap-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-800 px-2 py-1 rounded text-[11px] font-mono transition-colors"
            title="Mission Stage Navigator"
          >
            <Layers size={13} />
            <span className="hidden lg:inline">JUMP</span>
          </button>
        </div>
      </div>

      {/* Thin Animated Progress Line */}
      <div className="w-full bg-neutral-950 h-0.5 relative overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-red-800 via-red-600 to-amber-500 transition-all duration-500 ease-out shadow-[0_0_8px_#ef4444]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Dropdown Stage Quick Navigator (For reviewing all 18 stages seamlessly) */}
      {showNav && (
        <div className="bg-[#0c0c0c] border-b border-red-950/60 p-4 max-h-80 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-neutral-800">
              <span className="font-mono text-xs text-neutral-400 flex items-center gap-1.5">
                <Terminal size={14} className="text-red-500" /> MISSION STAGE DIRECTORY (REVIEW TOOL)
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onResetMission();
                    setShowNav(false);
                  }}
                  className="flex items-center gap-1 text-[11px] font-mono text-red-400 hover:text-red-300 transition-colors"
                >
                  <RotateCcw size={12} /> RESTART MISSION
                </button>
                <button
                  onClick={() => setShowNav(false)}
                  className="text-neutral-500 hover:text-neutral-300 text-xs font-mono"
                >
                  [CLOSE]
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {STAGE_TITLES.map((title, idx) => {
                const stageNum = idx + 1;
                const isCurrent = stageNum === currentStage;
                const isPassed = stageNum < currentStage;
                return (
                  <button
                    key={stageNum}
                    onClick={() => {
                      onStageSelect(stageNum);
                      setShowNav(false);
                    }}
                    className={`text-left p-2 rounded border text-[11px] font-mono transition-all ${
                      isCurrent
                        ? "bg-red-950/70 border-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]"
                        : isPassed
                        ? "bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                        : "bg-black border-neutral-900 text-neutral-600 hover:border-neutral-800 hover:text-neutral-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">#{String(stageNum).padStart(2, '0')}</span>
                      {isPassed && <span className="text-emerald-500 text-[10px]">✓</span>}
                    </div>
                    <div className="truncate mt-1 text-[10px]">
                      {title.split(': ')[1]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
