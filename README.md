# THE BIRTHDAY UNDERWORLD
## Jailer-Inspired Cinematic Gangster Birthday Mission Website

A high-octane, dark, mass-action birthday surprise web application inspired by the atmosphere of Tamil gangster cinema. Built with React, Vite, Framer Motion, and Tailwind CSS.

---

## 🎯 KEY FEATURES

- **Zero Spoiler Opening:** Never reveals the birthday surprise until all 18 interactive stages are conquered.
- **18 Distinct Cinematic Interactive Stages:** 
  1. Black-screen terminal boot sequence
  2. Classified security warning
  3. High-voltage authorization breaker lever
  4. Biometric fingerprint scan with laser sweep
  5. Prison access clearance panel (77 MHz frequency tuner)
  6. Duty Supervisor classified dossier with interactive approval stamp
  7. Gangster dossier discovery with wax seal breaker
  8. Alphanumeric security cipher challenge (passcode: `7709`)
  9. Harmless fake-lockdown alert drill with emergency manual override
  10. Interactive UV blacklight scanner discovering the hidden clue
  11. CCTV 4-quadrant camera surveillance grid with tracking target
  12. Tactical junction choice: Route Alpha (The Vault) vs Route Beta (The Armory)
  13. Dynamic branching Tamil-English cinematic dialogue decree
  14. High-tension seismic countdown
  15. 4-turn heavy titanium vault wheel lock mechanism
  16. Personal mystery telegram wiretaps
  17. Dual-key synchronized military ignition switch
  18. **The Ultimate Mass Birthday Reveal:** Dramatic blackout, suspense countdown, golden sparks & confetti cannons, hero portrait frame, heartfelt message, and mission replay.
- **Graceful Asset Fallbacks:** If images or audio files are not provided yet, the application automatically displays procedural animated SVG/CSS artwork with zero broken icons.
- **Audio System:** HTML Audio API for BGM and SFX with mute/unmute control and volume slider. Background drone sound is silenced by default for a clean experience.

---

## 🚀 GETTING STARTED

### 1. Installation
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## ⚙️ ASSET REPLACEMENT & PERSONALIZATION

All personal details, dialogues, images, and audio tracks are centralized in:
📂 `src/config/birthdayConfig.js`

### Step 1: Update Personal Details
Edit the following fields in `src/config/birthdayConfig.js`:
```javascript
export const BIRTHDAY_CONFIG = {
  BIRTHDAY_NAME: "ARJUN",              // Name of the birthday person
  SENDER_NAME: "THE GANG & CREW",     // Name of the person or group sending the wish
  BIRTHDAY_MESSAGE: "May your year be legendary. Rule your empire!", // Birthday message
  BIRTHDAY_AGE: "CHAPTER 25",         // Optional age/milestone
  PASSCODE: "7709",                   // 4-digit code for Stage 08
};
```

### Step 2: Replace Images
Drop your image files into `public/assets/images/` and update the paths in `birthdayConfig.js`:
| Key | Default Placeholder Path | Description | Recommended Dimensions |
|---|---|---|---|
| `OPENING_BACKGROUND` | `/assets/images/opening_bg.jpg` | Moody prison/industrial background | 1920x1080px (16:9) |
| `JAIL_CORRIDOR_IMAGE` | `/assets/images/corridor.jpg` | Steel prison corridor | 1280x720px |
| `DUTY_SUPERVISOR_IMAGE` | `/assets/images/supervisor.jpg` | Warden/supervisor portrait | 800x1000px |
| `GANGSTER_DOSSIER_IMAGE` | `/assets/images/dossier.jpg` | Mugshot / dossier photo | 800x1000px |
| `SURVEILLANCE_IMAGE` | `/assets/images/cctv.jpg` | CCTV camera style view | 1280x720px |
| `FINAL_REVEAL_IMAGE` | `/assets/images/reveal_banner.jpg` | Cinematic mass banner | 1200x800px |
| `BIRTHDAY_PHOTO` | `/assets/images/birthday_photo.jpg` | Birthday celebrant portrait | 800x800px or 1000x1200px |

### Step 3: Replace Audio Tracks (Optional)
Drop your audio files into `public/assets/audio/`:
| Audio Key | Config Path | Description |
|---|---|---|
| `INTRO_BGM` | `/assets/audio/intro_bgm.mp3` | Stages 01–04 suspense score |
| `MAIN_BGM` | `/assets/audio/main_gangster_bgm.mp3` | Stages 05–13 gangster beat |
| `SUSPENSE_BGM` | `/assets/audio/suspense_bgm.mp3` | Stages 14–17 rising countdown score |
| `FINAL_REVEAL_BGM` | `/assets/audio/final_mass_bgm.mp3` | Stage 18 Mass Birthday reveal theme |
| `DOOR_SOUND` | `/assets/audio/jail_door.mp3` | Heavy steel door impact sound |
| `ALERT_SOUND` | `/assets/audio/security_alert.mp3` | Siren / alarm sound |
| `TRANSITION_SOUND` | `/assets/audio/transition.mp3` | Whoosh / bass drop |
| `REVEAL_SOUND` | `/assets/audio/final_reveal_sound.mp3` | Explosive celebration sound |

---

## 🛠️ IN-APP TOOLS

- **HUD Navigation Bar:** Shows mission progress, current stage title, and operation codename.
- **JUMP Menu:** Click `JUMP` on the top bar during testing to leap directly to any of the 18 stages.
- **ASSET GUIDE Modal:** Click `ASSET GUIDE` at any time to open the built-in asset checklist and copy file paths.
- **Audio HUD:** Top-right controls to mute/unmute and adjust volume at any time.

---

## 📁 PROJECT STRUCTURE

```
PROJECT_RAGVECTOR/
├── public/
│   └── assets/
│       ├── audio/          # Drop MP3 audio files here
│       └── images/         # Drop JPG/PNG visual assets here
├── src/
│   ├── audio/
│   │   └── soundSynthesizer.js  # Web Audio API sound generator
│   ├── components/
│   │   ├── AudioManager.jsx     # Audio controller with mute and volume controls
│   │   ├── AssetFallback.jsx    # Procedural CSS/SVG fallback graphics
│   │   ├── AssetReplacementModal.jsx # In-app asset checklist modal
│   │   ├── GlobalEffects.jsx    # Vignette, scanlines, and ember particles
│   │   ├── MissionProgress.jsx  # Top HUD with stage progress and stage jumper
│   │   └── stages/              # The 18 interactive stages
│   │       ├── Stage01BootSequence.jsx
│   │       ├── Stage02ClassifiedWarning.jsx
│   │       ├── Stage03AuthorizationSwitch.jsx
│   │       ├── Stage04SecurityScan.jsx
│   │       ├── Stage05PrisonAccess.jsx
│   │       ├── Stage06DutySupervisor.jsx
│   │       ├── Stage07GangsterDossier.jsx
│   │       ├── Stage08SecretCodeChallenge.jsx
│   │       ├── Stage09LockdownBreach.jsx
│   │       ├── Stage10HiddenClue.jsx
│   │       ├── Stage11SurveillanceScreen.jsx
│   │       ├── Stage12ChoiceChallenge.jsx
│   │       ├── Stage13ChoiceTransition.jsx
│   │       ├── Stage14CountdownSequence.jsx
│   │       ├── Stage15SealedFile.jsx
│   │       ├── Stage16MysteryMessages.jsx
│   │       ├── Stage17FinalAuthorization.jsx
│   │       └── Stage18BirthdayReveal.jsx
│   ├── config/
│   │   ├── assetManifest.js     # Manifest of all media assets
│   │   └── birthdayConfig.js    # Central configuration file
│   ├── styles/
│   │   └── index.css            # Cinematic dark theme styling
│   ├── App.jsx                  # Main mission state manager
│   └── main.jsx                 # React root entry point
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```
