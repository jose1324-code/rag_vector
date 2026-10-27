import React, { useState } from 'react';
import { X, CheckSquare, Square, Image, Music, FileCode, Copy, Check } from 'lucide-react';
import { ASSET_MANIFEST } from '../config/assetManifest';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';

export const AssetReplacementModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('images');
  const [copiedKey, setCopiedKey] = useState(null);

  if (!isOpen) return null;

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-[#0f0f0f] border border-neutral-800 rounded-xl shadow-2xl flex flex-col overflow-hidden text-neutral-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#141414]">
          <div>
            <h2 className="font-serif font-bold text-lg text-amber-400 tracking-wider flex items-center gap-2">
              <FileCode className="text-red-500" size={20} /> ASSET MANIFEST & REPLACEMENT GUIDE
            </h2>
            <p className="text-xs font-mono text-neutral-400 mt-0.5">
              Current Configuration: <span className="text-red-400 font-bold">{BIRTHDAY_CONFIG.BIRTHDAY_NAME}</span> | Operation: {BIRTHDAY_CONFIG.OPERATION_CODENAME}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800 bg-[#111] px-6">
          <button
            onClick={() => setActiveTab('images')}
            className={`py-3 px-4 font-mono text-xs flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'images' 
                ? 'border-red-500 text-white font-bold bg-neutral-900/40' 
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Image size={15} /> IMAGES ({ASSET_MANIFEST.images.length})
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`py-3 px-4 font-mono text-xs flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'audio' 
                ? 'border-red-500 text-white font-bold bg-neutral-900/40' 
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Music size={15} /> AUDIO TRACKS & SFX ({ASSET_MANIFEST.audio.length})
          </button>
          <button
            onClick={() => setActiveTab('steps')}
            className={`py-3 px-4 font-mono text-xs flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'steps' 
                ? 'border-amber-500 text-white font-bold bg-neutral-900/40' 
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <CheckSquare size={15} /> REPLACEMENT STEPS
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4 font-sans text-sm flex-1">
          {activeTab === 'images' && (
            <div className="space-y-4">
              <div className="p-3 bg-neutral-900/70 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-300">
                Directory: <span className="text-amber-400 font-bold">public/assets/images/</span> — Images have automatic high-res animated CSS fallbacks if missing.
              </div>
              <div className="grid gap-3">
                {ASSET_MANIFEST.images.map((item) => (
                  <div key={item.key} className="p-3.5 bg-neutral-900/40 border border-neutral-800 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-red-400 text-xs">{item.key}</span>
                        <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded font-mono">{item.dimensions}</span>
                      </div>
                      <p className="text-xs text-neutral-300">{item.description}</p>
                      <div className="text-[11px] font-mono text-neutral-500 flex items-center gap-2">
                        <span>Used In: {item.usedIn}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-[11px] font-mono bg-black px-2 py-1 rounded text-neutral-400 border border-neutral-800">
                        {item.path}
                      </code>
                      <button
                        onClick={() => handleCopy(item.path, item.key)}
                        className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 rounded hover:bg-neutral-700 transition"
                        title="Copy file path"
                      >
                        {copiedKey === item.key ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'audio' && (
            <div className="space-y-4">
              <div className="p-3 bg-neutral-900/70 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-300">
                Directory: <span className="text-amber-400 font-bold">public/assets/audio/</span> — Web Audio API automatically synthesizes cinematic dark drones, alarms, and fanfares if MP3 files are missing!
              </div>
              <div className="grid gap-3">
                {ASSET_MANIFEST.audio.map((item) => (
                  <div key={item.key} className="p-3.5 bg-neutral-900/40 border border-neutral-800 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-400 text-xs">{item.key}</span>
                        <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded font-mono">{item.format}</span>
                      </div>
                      <p className="text-xs text-neutral-300">{item.description}</p>
                      <div className="text-[11px] font-mono text-neutral-500">
                        Triggered: {item.usedIn}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-[11px] font-mono bg-black px-2 py-1 rounded text-neutral-400 border border-neutral-800">
                        {item.path}
                      </code>
                      <button
                        onClick={() => handleCopy(item.path, item.key)}
                        className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 rounded hover:bg-neutral-700 transition"
                        title="Copy file path"
                      >
                        {copiedKey === item.key ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'steps' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-red-950/20 border border-red-900/40 rounded-lg space-y-2">
                <h3 className="font-serif font-bold text-red-400 text-sm">3 STEPS TO CUSTOMIZE THIS WEBSITE:</h3>
                <ol className="list-decimal list-inside space-y-2 text-neutral-300">
                  <li>
                    <strong className="text-white">Update Personal Details:</strong> Open <code className="bg-black px-1.5 py-0.5 text-amber-400 rounded">src/config/birthdayConfig.js</code> and replace <code className="text-red-400">[BIRTHDAY_NAME]</code>, <code className="text-red-400">[SENDER_NAME]</code>, and <code className="text-red-400">[BIRTHDAY_MESSAGE]</code>.
                  </li>
                  <li>
                    <strong className="text-white">Add Your Photos:</strong> Save the birthday person's photo into <code className="bg-black px-1.5 py-0.5 text-amber-400 rounded">public/assets/images/birthday_photo.jpg</code> and update the path in <code className="bg-black px-1.5 py-0.5 text-amber-400 rounded">birthdayConfig.js</code>.
                  </li>
                  <li>
                    <strong className="text-white">Add BGM Tracks (Optional):</strong> Save your favorite mass Tamil gangster themes / Jailer BGM audio files into <code className="bg-black px-1.5 py-0.5 text-amber-400 rounded">public/assets/audio/</code> and point the config paths to them.
                  </li>
                </ol>
              </div>

              <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-lg">
                <h4 className="font-mono text-neutral-300 font-bold mb-2">QUICK TEST CHECKLIST:</h4>
                <ul className="space-y-1.5 text-neutral-400 font-mono text-[11px]">
                  <li className="flex items-center gap-2"><Square size={13} className="text-amber-500" /> Step through Stages 01 to 18 using either natural play or the top JUMP tool.</li>
                  <li className="flex items-center gap-2"><Square size={13} className="text-amber-500" /> Verify audio synthesis (unmute via top right HUD).</li>
                  <li className="flex items-center gap-2"><Square size={13} className="text-amber-500" /> Test Stage 08 code validation (Passcode is 7709, or trigger the fake lockdown drill).</li>
                  <li className="flex items-center gap-2"><Square size={13} className="text-amber-500" /> Reach Stage 18 to experience the full Mass Birthday Reveal.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-[#141414] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded font-mono text-xs transition"
          >
            CLOSE GUIDE
          </button>
        </div>

      </div>
    </div>
  );
};
