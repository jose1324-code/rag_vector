import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioManager } from './components/AudioManager';
import { GlobalEffects } from './components/GlobalEffects';
import { MissionProgress } from './components/MissionProgress';
import { AssetReplacementModal } from './components/AssetReplacementModal';

// Stages 01 to 18
import { Stage01BootSequence } from './components/stages/Stage01BootSequence';
import { Stage02ClassifiedWarning } from './components/stages/Stage02ClassifiedWarning';
import { Stage03AuthorizationSwitch } from './components/stages/Stage03AuthorizationSwitch';
import { Stage04SecurityScan } from './components/stages/Stage04SecurityScan';
import { Stage05PrisonAccess } from './components/stages/Stage05PrisonAccess';
import { Stage06DutySupervisor } from './components/stages/Stage06DutySupervisor';
import { Stage07GangsterDossier } from './components/stages/Stage07GangsterDossier';
import { Stage08SecretCodeChallenge } from './components/stages/Stage08SecretCodeChallenge';
import { Stage09LockdownBreach } from './components/stages/Stage09LockdownBreach';
import { Stage10HiddenClue } from './components/stages/Stage10HiddenClue';
import { Stage11SurveillanceScreen } from './components/stages/Stage11SurveillanceScreen';
import { Stage12ChoiceChallenge } from './components/stages/Stage12ChoiceChallenge';
import { Stage13ChoiceTransition } from './components/stages/Stage13ChoiceTransition';
import { Stage14CountdownSequence } from './components/stages/Stage14CountdownSequence';
import { Stage15SealedFile } from './components/stages/Stage15SealedFile';
import { Stage16MysteryMessages } from './components/stages/Stage16MysteryMessages';
import { Stage17FinalAuthorization } from './components/stages/Stage17FinalAuthorization';
import { Stage18BirthdayReveal } from './components/stages/Stage18BirthdayReveal';

export default function App() {
  const [currentStage, setCurrentStage] = useState(1);
  const [selectedRoute, setSelectedRoute] = useState('VAULT');
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);

  const handleNext = () => {
    setCurrentStage(prev => Math.min(18, prev + 1));
  };

  const handleSelectStage = (stageNum) => {
    setCurrentStage(stageNum);
  };

  const handleResetMission = () => {
    setCurrentStage(1);
  };

  const handleTriggerLockdown = () => {
    setCurrentStage(9);
  };

  const handleRouteChoice = (route) => {
    setSelectedRoute(route);
    setCurrentStage(13);
  };

  // Render current stage
  const renderCurrentStage = () => {
    switch (currentStage) {
      case 1:
        return <Stage01BootSequence onNext={handleNext} />;
      case 2:
        return <Stage02ClassifiedWarning onNext={handleNext} />;
      case 3:
        return <Stage03AuthorizationSwitch onNext={handleNext} />;
      case 4:
        return <Stage04SecurityScan onNext={handleNext} />;
      case 5:
        return <Stage05PrisonAccess onNext={handleNext} />;
      case 6:
        return <Stage06DutySupervisor onNext={handleNext} />;
      case 7:
        return <Stage07GangsterDossier onNext={handleNext} />;
      case 8:
        return (
          <Stage08SecretCodeChallenge 
            onNext={handleNext} 
            onTriggerLockdown={handleTriggerLockdown} 
          />
        );
      case 9:
        return <Stage09LockdownBreach onNext={() => setCurrentStage(10)} />;
      case 10:
        return <Stage10HiddenClue onNext={handleNext} />;
      case 11:
        return <Stage11SurveillanceScreen onNext={handleNext} />;
      case 12:
        return <Stage12ChoiceChallenge onChoose={handleRouteChoice} />;
      case 13:
        return <Stage13ChoiceTransition route={selectedRoute} onNext={handleNext} />;
      case 14:
        return <Stage14CountdownSequence onNext={handleNext} />;
      case 15:
        return <Stage15SealedFile onNext={handleNext} />;
      case 16:
        return <Stage16MysteryMessages onNext={handleNext} />;
      case 17:
        return <Stage17FinalAuthorization onNext={handleNext} />;
      case 18:
        return <Stage18BirthdayReveal onReplay={handleResetMission} />;
      default:
        return <Stage01BootSequence onNext={handleNext} />;
    }
  };

  return (
    <AudioManager currentStage={currentStage}>
      <div className="min-h-screen bg-[#080808] text-neutral-100 flex flex-col relative selection:bg-red-600 selection:text-white">
        
        {/* Global Particles, Scanlines, and Strobe Effects */}
        <GlobalEffects 
          isLockdown={currentStage === 9} 
          isFinalReveal={currentStage === 18} 
        />

        {/* Mission HUD Header */}
        <MissionProgress 
          currentStage={currentStage}
          onStageSelect={handleSelectStage}
          onResetMission={handleResetMission}
          onOpenAssetModal={() => setIsAssetModalOpen(true)}
        />

        {/* Main Mission Active Stage Area */}
        <main className="flex-1 flex flex-col justify-center pt-16 pb-12 px-4 relative z-10 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              {renderCurrentStage()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Interactive Asset Manifest Guide Modal */}
        <AssetReplacementModal 
          isOpen={isAssetModalOpen}
          onClose={() => setIsAssetModalOpen(false)}
        />

        {/* Footer info */}
        <footer className="py-3 border-t border-neutral-900 bg-black/90 text-center text-[10px] font-mono text-neutral-600 select-none">
          THE BIRTHDAY UNDERWORLD // CLASSIFIED SECURITY ENCLAVE // ALL RIGHTS SECURED
        </footer>
      </div>
    </AudioManager>
  );
}
