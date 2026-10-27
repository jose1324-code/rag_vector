import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Radio, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';
import { useAudio } from '../AudioManager';

export const Stage13ChoiceTransition = ({ route = 'VAULT', onNext }) => {
  const { playSfx } = useAudio();

  useEffect(() => {
    playSfx('transition');
  }, []);

  const routeContent = route === 'VAULT' ? {
    title: "DIRECT VAULT BREACH CONFIRMED",
    badge: "ROUTE ALPHA ENGAGED",
    quote: "Vaangada... Naanga therinja vazhila varala, namma uruvaakuna vazhila dhaan varuvom!",
    subtext: "You chose fearless direct entry. The entire correctional system now trembles under your footsteps."
  } : {
    title: "ARMORY OVERRIDE SYNCHRONIZED",
    badge: "ROUTE BETA ENGAGED",
    quote: "Aayudham thevai illa... avar peyarai sonnale ellam adangum.",
    subtext: "Tactical supremacy confirmed. The underground arsenal answers only to the supreme commander."
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
        className="w-full max-w-xl bg-gradient-to-b from-[#180f0c] to-[#0a0a0a] border-2 border-amber-600/60 rounded-xl p-6 sm:p-8 shadow-[0_0_40px_rgba(245,158,11,0.2)] text-center relative"
      >
        <div className="inline-block bg-amber-950/80 border border-amber-600 text-amber-300 font-mono text-[10px] tracking-widest px-3 py-1 rounded mb-4 uppercase font-bold">
          {routeContent.badge}
        </div>

        <div className="w-16 h-16 mx-auto rounded-full bg-neutral-900 border-2 border-amber-500/80 flex items-center justify-center mb-4 shadow-[0_0_20px_#f59e0b]">
          <Flame size={32} className="text-amber-400 animate-pulse" />
        </div>

        <h2 className="font-serif font-black text-2xl text-neutral-100 tracking-wider mb-4">
          {routeContent.title}
        </h2>

        {/* Cinematic Monologue Card */}
        <div className="bg-black/70 border border-neutral-800 rounded-lg p-5 mb-6 text-left space-y-2">
          <div className="flex items-center gap-2 text-[10px] text-amber-500 font-mono font-bold">
            <Radio size={13} className="animate-ping" />
            <span>INTERCEPTED TRANSMISSION // CLASSIFIED FREQUENCY</span>
          </div>
          <p className="font-serif italic text-sm text-neutral-200 leading-relaxed pl-2 border-l-2 border-amber-500">
            &ldquo;{routeContent.quote}&rdquo;
          </p>
          <div className="text-[11px] text-neutral-400 font-mono pt-2">
            {routeContent.subtext}
          </div>
        </div>

        <button
          onClick={handleProceed}
          className="w-full py-3 bg-red-700 hover:bg-red-600 text-white font-mono text-xs font-bold tracking-widest uppercase rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.5)] transition flex items-center justify-center gap-2"
        >
          <span>INITIATE MASTER COUNTDOWN</span>
          <ArrowRight size={15} />
        </button>
      </motion.div>
    </div>
  );
};
