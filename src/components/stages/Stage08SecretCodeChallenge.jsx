import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Delete, ShieldAlert, ArrowRight, HelpCircle } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';
import { useAudio } from '../AudioManager';

export const Stage08SecretCodeChallenge = ({ onNext, onTriggerLockdown }) => {
  const { playSfx } = useAudio();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleKeyPress = (num) => {
    if (pin.length < 4) {
      playSfx('beep');
      setPin(prev => prev + num);
      setError(false);
    }
  };

  const handleDelete = () => {
    playSfx('beep');
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  const handleVerify = () => {
    if (pin === BIRTHDAY_CONFIG.PASSCODE) {
      playSfx('door');
      setTimeout(() => {
        playSfx('transition');
        onNext();
      }, 700);
    } else {
      setError(true);
      playSfx('alert');
      // If code is wrong, trigger lockdown stage after brief flash
      setTimeout(() => {
        onTriggerLockdown();
      }, 1000);
    }
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 font-mono select-none">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-[#0e0e0e] border border-neutral-800 rounded-xl p-6 shadow-2xl relative text-center"
      >
        <div className="inline-block bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-[10px] tracking-widest px-3 py-1 rounded mb-3 uppercase">
          SECURITY CIPHER PANEL
        </div>

        <h2 className="font-serif font-black text-xl text-neutral-100 tracking-wider mb-2">
          ENTER ACCESS CIPHER
        </h2>

        <p className="text-xs text-neutral-400 mb-5">
          Enter the 4-digit classified override key.
        </p>

        {/* PIN Display Boxes */}
        <div className="flex justify-center gap-3 mb-6">
          {[0, 1, 2, 3].map((idx) => (
            <div 
              key={idx}
              className={`w-12 h-14 rounded-lg border-2 flex items-center justify-center text-xl font-bold font-mono transition-all ${
                error 
                  ? 'border-red-600 bg-red-950/40 text-red-500 animate-bounce' 
                  : pin[idx] 
                  ? 'border-amber-500 bg-neutral-900 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]' 
                  : 'border-neutral-800 bg-black text-neutral-600'
              }`}
            >
              {pin[idx] ? '*' : ''}
            </div>
          ))}
        </div>

        {error && (
          <div className="text-xs text-red-500 font-bold mb-4 animate-pulse flex items-center justify-center gap-1.5">
            <ShieldAlert size={14} /> INCORRECT CODE! TRIGGERING LOCKDOWN...
          </div>
        )}

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-2.5 max-w-[240px] mx-auto mb-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              onClick={() => handleKeyPress(String(n))}
              className="h-12 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 font-mono text-base font-bold transition active:scale-95 shadow-sm"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => onTriggerLockdown()}
            className="h-12 rounded-lg bg-red-950/30 hover:bg-red-900/50 border border-red-900/50 text-red-400 text-[10px] font-bold transition active:scale-95 flex flex-col items-center justify-center"
            title="Simulate lockdown security drill"
          >
            LOCKDOWN
          </button>
          <button
            onClick={() => handleKeyPress('0')}
            className="h-12 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 font-mono text-base font-bold transition active:scale-95"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="h-12 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition active:scale-95 flex items-center justify-center"
          >
            <Delete size={18} />
          </button>
        </div>

        {/* Submit */}
        <button
          onClick={handleVerify}
          disabled={pin.length < 4}
          className={`w-full py-2.5 rounded font-mono text-xs font-bold tracking-widest uppercase transition ${
            pin.length === 4
              ? 'bg-red-700 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] cursor-pointer'
              : 'bg-neutral-900 text-neutral-600 cursor-not-allowed border border-neutral-800'
          }`}
        >
          CONFIRM CIPHER
        </button>

        <div className="mt-4 text-[10px] text-neutral-500 font-mono flex items-center justify-center gap-1">
          <HelpCircle size={12} className="text-amber-500" />
          <span>Passcode clue: 7709 (or click LOCKDOWN to test stage 09)</span>
        </div>
      </motion.div>
    </div>
  );
};
