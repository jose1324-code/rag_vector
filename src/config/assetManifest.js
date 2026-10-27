/**
 * ASSET MANIFEST FOR THE BIRTHDAY UNDERWORLD
 * Complete specification of all media assets required by the project.
 */

export const ASSET_MANIFEST = {
  images: [
    {
      key: "OPENING_BACKGROUND",
      path: "/assets/images/[OPENING_BACKGROUND].jpg",
      usedIn: "Stage 01, 02, 03 (Background ambient canvas)",
      description: "Dark, moody industrial prison wall or silhouette with dim backlights",
      dimensions: "1920x1080px (16:9)",
      format: "JPG / PNG / WebP",
      fallback: "High-tech radial dark vignette with animated scanlines & red emergency strobes"
    },
    {
      key: "JAIL_CORRIDOR_IMAGE",
      path: "/assets/images/[JAIL_CORRIDOR].jpg",
      usedIn: "Stage 05 (Prison Access Clearance Panel)",
      description: "Deep, eerie prison corridor lined with heavy iron cells and neon emergency bulbs",
      dimensions: "1280x720px",
      format: "JPG / PNG / WebP",
      fallback: "Procedural CSS industrial steel bars with moving spotlights"
    },
    {
      key: "DUTY_SUPERVISOR_IMAGE",
      path: "/assets/images/[DUTY_SUPERVISOR].jpg",
      usedIn: "Stage 06 (Duty Supervisor Classified File)",
      description: "Gruff, stern security supervisor portrait in low-key noir lighting (sunglasses/uniform)",
      dimensions: "800x1000px (4:5)",
      format: "JPG / PNG / WebP",
      fallback: "Redacted biometric silhouette with CLASSIFIED stamp and glowing eyes"
    },
    {
      key: "GANGSTER_DOSSIER_IMAGE",
      path: "/assets/images/[GANGSTER_DOSSIER].jpg",
      usedIn: "Stage 07 (Gangster Dossier Discovery)",
      description: "Mugshot or silhouette of the birthday person, or vintage classified manila file folder",
      dimensions: "800x1000px",
      format: "JPG / PNG / WebP",
      fallback: "Top-Secret dossier document with gold wax seal and classified fingerprints"
    },
    {
      key: "SURVEILLANCE_IMAGE",
      path: "/assets/images/[SURVEILLANCE_IMAGE].jpg",
      usedIn: "Stage 11 (Surveillance Screen Reveal)",
      description: "CCTV camera footage look: monochrome green/blue tinted camera view of high-security cell",
      dimensions: "1280x720px",
      format: "JPG / PNG / WebP",
      fallback: "Interactive 4-quadrant simulated CCTV monitor with camera timestamps and noise filters"
    },
    {
      key: "FINAL_REVEAL_IMAGE",
      path: "/assets/images/[FINAL_REVEAL_IMAGE].jpg",
      usedIn: "Stage 18 (Mass Birthday Reveal - Hero Banner)",
      description: "Heroic, stylish portrait of the birthday celebrant looking like a cinema Don / boss",
      dimensions: "1200x800px",
      format: "JPG / PNG / WebP",
      fallback: "Golden crowned insignia badge with glowing neon aura and animated sparks"
    },
    {
      key: "BIRTHDAY_PHOTO",
      path: "/assets/images/[BIRTHDAY_PHOTO].jpg",
      usedIn: "Stage 18 (Personal Photo Showcase Frame)",
      description: "High-resolution photo of the birthday person (stylish portrait or cherished memory)",
      dimensions: "800x800px or 1000x1200px",
      format: "JPG / PNG / WebP",
      fallback: "Cinematic framed gold hologram with birthday person's initials"
    }
  ],
  audio: [
    {
      key: "INTRO_BGM",
      path: "/assets/audio/[INTRO_BGM].mp3",
      usedIn: "Stages 01 - 04",
      description: "Low sub-bass drone, tension strings, electronic ticking, ominous anticipation",
      format: "MP3 / AAC (192kbps+)",
      fallback: "Web Audio dynamic sub-oscillator drone (45Hz + 90Hz pulsing chord)"
    },
    {
      key: "MAIN_BGM",
      path: "/assets/audio/[MAIN_GANGSTER_BGM].mp3",
      usedIn: "Stages 05 - 13",
      description: "Pounding slow gangster rhythm, heavy percussion, dark guitar riff or dramatic brass",
      format: "MP3 / AAC (192kbps+)",
      fallback: "Procedural syncopated bass heartbeat pulse"
    },
    {
      key: "SUSPENSE_BGM",
      path: "/assets/audio/[SUSPENSE_BGM].mp3",
      usedIn: "Stages 14 - 17",
      description: "Heartbeat acceleration, rising riser, alarm pulses, intense cinema countdown score",
      format: "MP3 / AAC (192kbps+)",
      fallback: "Web Audio accelerated sine pulse + filter sweep riser"
    },
    {
      key: "FINAL_REVEAL_BGM",
      path: "/assets/audio/[FINAL_MASS_BGM].mp3",
      usedIn: "Stage 18 (The Ultimate Reveal)",
      description: "Explosive, triumphant Mass BGM (heavy brass, celebratory beats, thunderous hero theme)",
      format: "MP3 / AAC (320kbps recommended)",
      fallback: "Triumphant Web Audio harmonic celebration fanfare & percussion"
    },
    {
      key: "DOOR_SOUND",
      path: "/assets/audio/[JAIL_DOOR_SOUND].mp3",
      usedIn: "Stage 03, 05, 15",
      description: "Heavy pneumatic lock unlatching, hydraulic hiss, iron slam",
      format: "MP3 / WAV",
      fallback: "Synthesized metallic impact and resonant filter noise"
    },
    {
      key: "ALERT_SOUND",
      path: "/assets/audio/[SECURITY_ALERT].mp3",
      usedIn: "Stage 02, 09 (Lockdown alert)",
      description: "Dual-tone industrial klaxon alarm / security siren",
      format: "MP3 / WAV",
      fallback: "Synthesized 880Hz / 660Hz oscillating emergency siren"
    },
    {
      key: "TRANSITION_SOUND",
      path: "/assets/audio/[TRANSITION_SOUND].mp3",
      usedIn: "Stage transitions & interactive switch flips",
      description: "Cinematic heavy whoosh, sub boom, bass drop",
      format: "MP3 / WAV",
      fallback: "Web Audio low-pass noise sweep + sub bass drop"
    },
    {
      key: "REVEAL_SOUND",
      path: "/assets/audio/[FINAL_REVEAL_SOUND].mp3",
      usedIn: "Stage 18 (Exact moment of Happy Birthday reveal)",
      description: "Mass cinema gun cock / thunderous boom / celebratory blast",
      format: "MP3 / WAV",
      fallback: "Web Audio deep cinematic impact boom & chime sweep"
    }
  ]
};
