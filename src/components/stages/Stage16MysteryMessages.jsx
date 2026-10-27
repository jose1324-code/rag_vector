import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, ArrowRight, ShieldAlert, Check } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';
import { useAudio } from '../AudioManager';

export const Stage16MysteryMessages = ({ onNext }) => {
  const { playSfx } = useAudio();
  const [activeTab, setActiveTab] = useState(0);
  const [readList, setReadList] = useState([true, false, false]);

  const telegrams = [
    {
      id: 0,
      sender: "UNDERWORLD INTELLIGENCE NETWORK",
      timestamp: "23:59:00 HRS",
      subject: "CABLE #01 // STAND DOWN ORDER",
      content: "All syndicated operations are ordered to stand down immediately. Across all sectors and city gates, absolute silence is mandated. The supreme authority has arrived."
    },
    {
      id: 1,
      sender: "ALLIED SPECIAL FORCES / WARDEN ARCHIVE",
      timestamp: "00:00:15 HRS",
      subject: "CABLE #02 // RESPECT DECREE",
      content: "No adversary dares to challenge him. Those who know his track record know what he is made of: pure grit, loyalty, and unmatched power. Respect is earned, never demanded."
    },
    {
      id: 2,
      sender: BIRTHDAY_CONFIG.SENDER_NAME || "[SENDER_NAME]",
      timestamp: "CLASSIFIED TRANSMISSION",
      subject: "CABLE #03 // THE FINAL WIRE",
      content: `A personal transmission sent directly to the core terminal: "You've cracked every gate, disengaged every lockdown. Now, prepare to claim what has been prepared for you. Turn the master key."`
    }
  ];

  const handleSelectTab = (idx) => {
    setActiveTab(idx);
    playSfx('beep');
    setReadList((prev) => {
      const copy = [...prev];
      copy[idx] = true;
      return copy;
    });
  };

  const handleProceed = () => {
    playSfx('door');
    setTimeout(() => {
      playSfx('transition');
      onNext();
    }, 600);
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 font-mono select-none">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-[#0e0e0e] border border-neutral-800 rounded-xl p-6 sm:p-8 shadow-2xl relative"
      >
        <div className="flex justify-between items-center border-b border-neutral-800 pb-3 mb-5">
          <div className="flex items-center gap-2 text-xs text-amber-500 font-bold">
            <Mail size={16} /> INTERCEPTED WIRETAP TELEGRAMS // STAGE 16
          </div>
          <span className="text-[10px] bg-red-950/80 border border-red-800 text-red-400 px-2 py-0.5 rounded">
            CONFIDENTIAL WIRES
          </span>
        </div>

        {/* Cable Tabs */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {telegrams.map((tel, idx) => (
            <button
              key={tel.id}
              onClick={() => handleSelectTab(idx)}
              className={`p-2.5 rounded border text-left text-[11px] font-mono transition-all ${
                activeTab === idx
                  ? 'border-amber-500 bg-amber-950/30 text-amber-300 font-bold shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                  : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>CABLE #0{idx + 1}</span>
                {readList[idx] && <Check size={12} className="text-emerald-400" />}
              </div>
              <div className="text-[9px] text-neutral-500 truncate mt-0.5">
                {tel.subject.split('// ')[1]}
              </div>
            </button>
          ))}
        </div>

        {/* Active Telegram Content */}
        <div className="bg-[#141210] border-2 border-[#3d3226] rounded-xl p-6 mb-6 shadow-inner relative overflow-hidden">
          <div className="border-b border-[#3d3226] pb-3 mb-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-[11px] text-neutral-400">
            <div>
              <span className="text-neutral-500">ORIGIN:</span> <strong className="text-amber-400">{telegrams[activeTab].sender}</strong>
            </div>
            <div>
              <span className="text-neutral-500">TIME:</span> {telegrams[activeTab].timestamp}
            </div>
          </div>

          <div className="py-2">
            <h3 className="font-serif font-black text-amber-200 text-base mb-2">
              {telegrams[activeTab].subject}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans italic">
              &ldquo;{telegrams[activeTab].content}&rdquo;
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-between items-center border-t border-neutral-800 pt-5">
          <div className="text-xs text-neutral-400 flex items-center gap-2">
            <ShieldAlert size={14} className="text-red-500" />
            <span>ALL WIRETAPS CONFIRMED</span>
          </div>

          <button
            onClick={handleProceed}
            className="px-6 py-2.5 bg-red-700 hover:bg-red-600 text-white font-mono text-xs font-bold tracking-widest uppercase rounded flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.4)] transition"
          >
            <span>PROCEED TO MASTER SWITCH</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
