import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Sparkles, Volume2, Shield } from 'lucide-react';
import { useAudio } from './AudioManager';

const TOTAL_FIRST_SET = 92;
const TOTAL_SECOND_SET = 173;
const TOTAL_FRAMES = TOTAL_FIRST_SET + TOTAL_SECOND_SET; // 265 frames

export const getFrameUrl = (frameIndex) => {
  const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));
  if (clamped < TOTAL_FIRST_SET) {
    const num = String(clamped + 1).padStart(3, '0');
    return `/assets/images/firstset/ezgif-frame-${num}.jpg`;
  } else {
    const secondNum = String(clamped - TOTAL_FIRST_SET + 1).padStart(3, '0');
    return `/assets/images/secondset/ezgif-frame-${secondNum}.jpg`;
  }
};

export const ScrollVideoSequence = ({ onComplete }) => {
  const { playSfx } = useAudio();
  const canvasRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isPreloadReady, setIsPreloadReady] = useState(false);
  const [displayFrame, setDisplayFrame] = useState(0);

  // Animation & Lerp references
  const imagesRef = useRef([]);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const animFrameIdRef = useRef(null);
  const isCompletedRef = useRef(false);

  // Preload frames in background
  useEffect(() => {
    let isCancelled = false;
    const images = new Array(TOTAL_FRAMES);
    let loaded = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (isCancelled) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded >= 30 && !isPreloadReady) {
          setIsPreloadReady(true);
        }
      };
      img.onerror = () => {
        if (isCancelled) return;
        loaded++;
        setLoadedCount(loaded);
      };
      images[i] = img;
    }
    imagesRef.current = images;

    return () => {
      isCancelled = true;
    };
  }, []);

  // Draw image with cover aspect ratio on full viewport canvas
  const renderFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[Math.round(frameIdx)];

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    if (img && img.complete && img.naturalWidth > 0) {
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawWidth = width;
        drawHeight = width / imgRatio;
        offsetX = 0;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawHeight = height;
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      renderFrame(currentFrameRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // Smooth lerp render loop (Apple / King's scroll-based interpolation)
  useEffect(() => {
    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      
      if (Math.abs(diff) > 0.05) {
        // Smooth easing factor
        currentFrameRef.current += diff * 0.18;
        renderFrame(currentFrameRef.current);
        setDisplayFrame(Math.round(currentFrameRef.current));
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [renderFrame]);

  // Handle Scroll Progress from the scroll runway
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const maxScroll = container.scrollHeight - container.clientHeight;
    if (maxScroll <= 0) return;

    const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));
    const newTarget = progress * (TOTAL_FRAMES - 1);
    targetFrameRef.current = newTarget;

    // Trigger reveal automatically when scrolled to the very end
    if (progress >= 0.985 && !isCompletedRef.current) {
      isCompletedRef.current = true;
      onComplete();
    }
  };

  const progressPercent = Math.round((displayFrame / (TOTAL_FRAMES - 1)) * 100);

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-black overflow-hidden select-none">
      
      {/* Fixed Full Screen Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full object-cover pointer-events-none z-10"
      />

      {/* Cinematic Vignette & Anamorphic Letterbox Bars */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.85)_100%)] pointer-events-none z-20" />
      <div className="fixed inset-0 opacity-[0.035] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.6)_50%)] bg-[length:100%_4px] pointer-events-none z-20" />

      {/* Scroll Runway Container (420vh scroll height for smooth cinematic scrub) */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="fixed inset-0 w-full h-full overflow-y-auto overflow-x-hidden z-30"
        style={{ scrollBehavior: 'auto' }}
      >
        <div className="h-[420vh] w-full relative pointer-events-none">
          
          {/* Section 1 Narrative Tag (0% to 25%) */}
          <div className="sticky top-20 left-0 right-0 flex justify-center px-4 pointer-events-none">
            <motion.div
              animate={{ 
                opacity: progressPercent >= 0 && progressPercent <= 28 ? 1 : 0,
                y: progressPercent >= 0 && progressPercent <= 28 ? 0 : -20
              }}
              transition={{ duration: 0.4 }}
              className="text-center bg-black/75 backdrop-blur-md border border-neutral-800 px-6 py-3 rounded-full shadow-2xl"
            >
              <div className="text-[10px] font-mono tracking-widest text-red-500 uppercase font-bold">
                // FIRST SEQUENCE //
              </div>
              <h2 className="font-serif font-black text-xl sm:text-2xl text-neutral-100 tracking-wider">
                A PRESENCE UNLIKE ANY OTHER
              </h2>
            </motion.div>
          </div>

          {/* Section 2 Narrative Tag (35% to 65%) */}
          <div className="sticky top-32 left-0 right-0 flex justify-center px-4 pointer-events-none mt-[100vh]">
            <motion.div
              animate={{ 
                opacity: progressPercent >= 32 && progressPercent <= 68 ? 1 : 0,
                y: progressPercent >= 32 && progressPercent <= 68 ? 0 : -20
              }}
              transition={{ duration: 0.4 }}
              className="text-center bg-black/75 backdrop-blur-md border border-amber-600/40 px-6 py-3 rounded-full shadow-2xl"
            >
              <div className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold">
                // SECOND SEQUENCE //
              </div>
              <h2 className="font-serif font-black text-xl sm:text-2xl text-amber-200 tracking-wider">
                RULES DON&apos;T APPLY. HE COMMANDS RESPECT.
              </h2>
            </motion.div>
          </div>

          {/* Section 3 Narrative Climax (75% to 99%) */}
          <div className="sticky top-36 left-0 right-0 flex justify-center px-4 pointer-events-none mt-[100vh]">
            <motion.div
              animate={{ 
                opacity: progressPercent >= 72 && progressPercent <= 98 ? 1 : 0,
                scale: progressPercent >= 72 && progressPercent <= 98 ? 1 : 0.95
              }}
              transition={{ duration: 0.4 }}
              className="text-center bg-black/80 backdrop-blur-md border border-amber-500/80 px-8 py-4 rounded-2xl shadow-[0_0_35px_rgba(245,158,11,0.5)]"
            >
              <div className="text-xs font-mono tracking-widest text-amber-400 uppercase font-bold">
                // READY FOR FINAL REVEAL //
              </div>
              <h2 className="font-serif font-black text-2xl sm:text-3xl text-amber-300 tracking-wider uppercase">
                SCROLL TO COMPLETE
              </h2>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Floating HUD Controls & Status (Z-40) */}
      <div className="fixed top-4 left-4 z-40 flex items-center gap-2 bg-black/80 backdrop-blur-md border border-neutral-800 px-4 py-2 rounded-full font-mono text-xs text-neutral-300">
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
        <span className="font-bold tracking-wider text-amber-400">FRAME</span>
        <span>{String(displayFrame + 1).padStart(3, '0')} / {TOTAL_FRAMES}</span>
        <span className="text-neutral-600">|</span>
        <span className="text-amber-400 font-bold">{progressPercent}%</span>
      </div>

      {/* Skip Button (Top Right) */}
      <button
        onClick={() => {
          onComplete();
        }}
        className="fixed top-4 right-4 z-40 bg-black/80 hover:bg-neutral-900 backdrop-blur-md border border-neutral-700 hover:border-amber-500 px-4 py-2 rounded-full font-mono text-xs text-neutral-200 hover:text-amber-400 transition flex items-center gap-1.5 shadow-2xl cursor-pointer"
      >
        <span>SKIP TO REVEAL</span>
        <ArrowRight size={14} />
      </button>

      {/* Initial Scroll Prompt (Bottom) */}
      {progressPercent < 10 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none"
        >
          <div className="bg-black/85 backdrop-blur-md border border-amber-500/60 text-amber-300 px-5 py-2 rounded-full font-mono text-xs font-bold tracking-widest uppercase shadow-[0_0_25px_rgba(245,158,11,0.4)] flex items-center gap-2">
            <ChevronDown size={16} className="animate-bounce text-amber-400" />
            <span>SCROLL DOWN TO ANIMATE FORWARD</span>
          </div>
          <span className="text-[10px] font-mono text-neutral-500 tracking-wider">
            SCROLL BACKWARD TO REVERSE
          </span>
        </motion.div>
      )}

      {/* Final Unveil Button at Bottom when near end */}
      {progressPercent >= 85 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
        >
          <button
            onClick={() => {
              onComplete();
            }}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:scale-105 text-black font-mono text-xs font-black tracking-widest uppercase rounded-full shadow-[0_0_40px_rgba(245,158,11,0.8)] flex items-center gap-2 transition cursor-pointer animate-pulse"
          >
            <Sparkles size={16} className="text-black" />
            <span>PROCEED TO FINAL REVEAL</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>
      )}

      {/* Loading Overlay if frames are not yet ready */}
      {!isPreloadReady && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center gap-4 text-center p-6">
          <div className="w-12 h-12 border-3 border-amber-500 border-t-transparent rounded-full animate-spin shadow-[0_0_25px_#f59e0b]" />
          <div className="font-serif font-black text-xl text-neutral-100 tracking-wider">
            SYNCHRONIZING CINEMATIC SEQUENCE...
          </div>
          <div className="font-mono text-xs text-neutral-400">
            LOADING FRAMES: {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
          </div>
        </div>
      )}

    </div>
  );
};
