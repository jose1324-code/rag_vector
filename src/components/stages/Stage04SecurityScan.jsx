import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, CheckCircle, ShieldAlert } from 'lucide-react';
import { useAudio } from '../AudioManager';

export const Stage04SecurityScan = ({ onNext }) => {
  const { playSfx } = useAudio();
  const [progress, setProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const intervalRef = useRef(null);

  const startScan = () => {
    if (isSuccess) return;
    setIsScanning(true);
    playSfx('scan');

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          setIsScanning(false);
          setIsSuccess(true);
          playSfx('door');
          setTimeout(() => {
            playSfx('transition');
            onNext();
          }, 1000);
          return 100;
        }
        return prev + 4;
      });
    }, 50);
  };

  const stopScan = () => {
    if (isSuccess) return;
    setIsScanning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 font-mono select-none">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-[#0d0d0d] border border-neutral-800 rounded-xl p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden"
      >
        <div className="inline-block bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-[10px] tracking-widest px-3 py-1 rounded mb-3 uppercase">
          BIOMETRIC RECOGNITION INTERFACE
        </div>

        <h2 className="font-serif font-black text-2xl text-neutral-100 tracking-wider mb-2">
          SCAN UNKNOWN OPERATIVE
        </h2>

        <p className="text-xs text-neutral-400 mb-6">
          Press and hold the sensor below to calibrate your fingerprint against the prison intelligence records.
        </p>

        {/* Biometric Scanner Pad */}
        <div className="flex flex-col items-center justify-center my-4">
          <div
            onMouseDown={startScan}
            onMouseUp={stopScan}
            onMouseLeave={stopScan}
            onTouchStart={startScan}
            onTouchEnd={stopScan}
            className={`relative w-44 h-44 rounded-2xl border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
              isSuccess 
                ? 'border-emerald-500 bg-emerald-950/20 shadow-[0_0_30px_#10b981]' 
                : isScanning 
                ? 'border-red-500 bg-red-950/20 shadow-[0_0_30px_rgba(239,68,68,0.5)]' 
                : 'border-neutral-700 bg-neutral-900/60 hover:border-neutral-500'
            }`}
          >
            {/* Moving Laser Scan Line */}
            {isScanning && (
              <motion.div 
                animate={{ y: [-70, 70, -70] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="absolute w-full h-1 bg-red-500 shadow-[0_0_15px_#ef4444] z-10"
              />
            )}

            {/* Fingerprint Icon */}
            <Fingerprint 
              size={90} 
              className={`transition-colors ${
                isSuccess ? 'text-emerald-400' : isScanning ? 'text-red-500 animate-pulse' : 'text-neutral-500'
              }`} 
            />

            {/* Progress Circular Fill Badge */}
            <div className="absolute bottom-2 font-mono text-xs font-bold text-neutral-300">
              {progress}%
            </div>
          </div>
        </div>

        {/* Scan Status Feedback */}
        <div className="mt-4 text-xs font-mono">
          {isSuccess ? (
            <div className="text-emerald-400 font-bold flex items-center justify-center gap-1.5">
              <CheckCircle size={15} /> BIOMETRIC MATCH CONFIRMED // PROCEEDING
            </div>
          ) : isScanning ? (
            <div className="text-red-400 font-bold animate-pulse">
              READING EPIDERMAL RIDGES... HOLD DOWN!
            </div>
          ) : (
            <div className="text-neutral-500">
              HOLD SENSOR FOR 2.5 SECONDS TO AUTHORIZE
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
