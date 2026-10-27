import React, { useState } from 'react';
import { ShieldAlert, User, FileText, Camera, Award, Lock, Sparkles } from 'lucide-react';

export const AssetFallback = ({ 
  src, 
  alt = "Classified Asset", 
  type = "default", 
  className = "",
  aspectRatio = "aspect-video"
}) => {
  const [imgError, setImgError] = useState(false);
  const isPlaceholder = !src || src.includes('[') || src.includes('placeholder') || imgError;

  if (!isPlaceholder) {
    return (
      <img 
        src={src} 
        alt={alt} 
        onError={() => setImgError(true)} 
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  // Render dedicated cinematic SVG / CSS fallbacks
  switch (type) {
    case 'corridor':
      return (
        <div className={`relative w-full ${aspectRatio} overflow-hidden bg-gradient-to-b from-neutral-950 via-[#110507] to-black rounded-lg border border-red-950/40 shadow-inner flex items-center justify-center ${className}`}>
          {/* Prison iron bars animation */}
          <div className="absolute inset-0 flex justify-around opacity-30 pointer-events-none">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2.5 h-full bg-gradient-to-b from-neutral-700 via-neutral-900 to-black shadow-lg" />
            ))}
          </div>
          {/* Crimson spotlight */}
          <div className="absolute inset-0 bg-radial from-red-600/20 via-transparent to-black pointer-events-none" />
          <div className="relative z-10 text-center p-4">
            <Lock className="w-12 h-12 text-red-500/80 mx-auto mb-2 animate-pulse" />
            <div className="font-mono text-xs tracking-widest text-red-400 uppercase">SECTOR 04 : CORRIDOR CLEARANCE</div>
            <div className="font-sans text-[11px] text-neutral-500 mt-1">MAXIMUM SECURITY ISOLATION FACILITY</div>
          </div>
        </div>
      );

    case 'supervisor':
      return (
        <div className={`relative w-full ${aspectRatio} overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-black rounded-lg border border-neutral-800 flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(165,0,24,0.15)_0%,transparent_70%)]" />
          <div className="relative z-10 flex flex-col items-center p-6 text-center">
            {/* Gangster silhouette avatar with glowing amber shades */}
            <div className="relative w-28 h-28 rounded-full border-2 border-red-600/50 bg-neutral-900 flex items-center justify-center shadow-2xl mb-3">
              <User className="w-16 h-16 text-neutral-600" />
              {/* Aviator / Sunglasses glow */}
              <div className="absolute top-10 flex gap-2">
                <div className="w-5 h-2.5 bg-amber-400 rounded-sm shadow-[0_0_12px_#fbbf24] animate-pulse" />
                <div className="w-5 h-2.5 bg-amber-400 rounded-sm shadow-[0_0_12px_#fbbf24] animate-pulse" />
              </div>
            </div>
            <span className="inline-block bg-red-950/80 border border-red-700 text-red-300 font-mono text-[10px] tracking-widest px-2.5 py-0.5 rounded uppercase font-bold">
              DUTY SUPERVISOR #77
            </span>
            <div className="font-serif font-bold tracking-wider text-neutral-200 mt-2 text-sm">WARDEN T. MUTHUVEL</div>
            <div className="text-[10px] font-mono text-neutral-500 mt-0.5">FILE: CONFIDENTIAL // EYE LEVEL CLEARANCE</div>
          </div>
        </div>
      );

    case 'dossier':
      return (
        <div className={`relative w-full ${aspectRatio} overflow-hidden bg-[#181512] rounded-lg border-2 border-[#382e24] shadow-2xl flex flex-col justify-between p-6 ${className}`}>
          <div className="flex justify-between items-start border-b border-[#3e3428] pb-3">
            <div>
              <div className="text-red-500 font-mono text-xs font-bold tracking-widest flex items-center gap-1.5">
                <ShieldAlert size={14} /> CLASSIFIED CRIMINAL RECORD
              </div>
              <div className="text-neutral-400 font-mono text-[11px] mt-0.5">DOSSIER #TN-99-ALPHA</div>
            </div>
            <div className="border border-red-600/80 px-2 py-0.5 text-red-500 text-[10px] font-mono font-bold tracking-widest rotate-6 bg-red-950/30">
              TOP SECRET
            </div>
          </div>

          <div className="my-4 flex items-center justify-center">
            {/* Wax seal graphic */}
            <div className="w-20 h-20 rounded-full border-4 border-amber-800 bg-gradient-to-br from-amber-700 via-amber-900 to-black flex items-center justify-center shadow-2xl relative">
              <span className="font-serif font-black text-amber-300 text-2xl tracking-widest">HUKUM</span>
              <div className="absolute inset-0 rounded-full border border-amber-400/40 animate-ping opacity-25" />
            </div>
          </div>

          <div className="border-t border-[#3e3428] pt-3 text-[11px] font-mono text-neutral-400 space-y-1">
            <div className="flex justify-between">
              <span>STATUS:</span>
              <span className="text-red-400 font-bold">ACTIVE LEADER</span>
            </div>
            <div className="flex justify-between">
              <span>SECTOR IMPACT:</span>
              <span className="text-amber-400 font-bold">UNRESTRICTED</span>
            </div>
          </div>
        </div>
      );

    case 'surveillance':
      return (
        <div className={`relative w-full ${aspectRatio} overflow-hidden bg-black rounded-lg border border-emerald-950/60 shadow-2xl ${className}`}>
          {/* Simulated CCTV Quad View */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1 bg-neutral-950">
            {['CAM 01 // CELL YARD', 'CAM 02 // SECTOR CORRIDOR', 'CAM 03 // VAULT ENTRANCE', 'CAM 04 // MAIN ISOLATION'].map((cam, i) => (
              <div key={i} className="relative bg-neutral-900/80 border border-neutral-800 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
                <div className="absolute top-1 left-2 font-mono text-[9px] text-emerald-400/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  {cam}
                </div>
                <Camera className="w-6 h-6 text-neutral-700 opacity-40" />
                {/* Simulated tracking box */}
                {i === 2 && (
                  <div className="absolute w-12 h-12 border border-red-500/80 flex items-center justify-center animate-pulse">
                    <span className="text-[7px] text-red-400 font-mono absolute -top-3">TARGET LOCATED</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="absolute bottom-2 right-3 font-mono text-[10px] text-emerald-400/90 bg-black/60 px-2 py-0.5 rounded">
            LIVE FEED - 29.97 FPS
          </div>
        </div>
      );

    case 'birthday_hero':
    default:
      return (
        <div className={`relative w-full ${aspectRatio} overflow-hidden bg-gradient-to-b from-neutral-950 via-[#1c1208] to-neutral-950 rounded-xl border-2 border-amber-600/50 shadow-[0_0_35px_rgba(217,119,6,0.25)] flex flex-col items-center justify-center p-6 ${className}`}>
          {/* Subtle gold rays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0%,transparent_75%)]" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full border-2 border-amber-400 bg-gradient-to-tr from-amber-600 to-amber-950 flex items-center justify-center shadow-2xl mb-4 relative">
              <Award className="w-12 h-12 text-amber-200" />
              <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-1 -right-1 animate-spin" />
            </div>
            <div className="font-serif font-black text-amber-400 text-lg md:text-xl tracking-widest uppercase">
              THE UNCONQUERABLE
            </div>
            <div className="font-mono text-xs text-amber-200/70 tracking-widest mt-1">
              SUPREME AUTHORITY ARCHIVE
            </div>
          </div>
        </div>
      );
  }
};
