/**
 * THE BIRTHDAY UNDERWORLD - CENTRAL CONFIGURATION
 * 
 * Instructions:
 * Replace the bracketed placeholders [LIKE_THIS] with your real details.
 * If any image or audio file is missing, the system automatically uses
 * stunning CSS/canvas animated fallbacks and synthetic cinematic audio.
 */

export const BIRTHDAY_CONFIG = {
  // Personal Details
  BIRTHDAY_NAME: "Moorthy Anna",
  SENDER_NAME: "THE SYNDICATE",
  BIRTHDAY_MESSAGE: 
    "On this special day, the underworld pays homage to Moorthy Anna. May your reign continue with ultimate power, good health, and glorious victories. Rule your empire!",

  // Age or Milestone (Optional)
  BIRTHDAY_AGE: "CHAPTER DON",
  OPERATION_CODENAME: "OPERATION MOORTHY ANNA",
  SECURITY_CLEARANCE: "LEVEL 07 - MAXIMUM CLASSIFIED",

  // Image Asset Placeholders (Located in public/assets/)
  ASSETS: {
    OPENING_BACKGROUND: "/assets/images/[OPENING_BACKGROUND].jpg",
    JAIL_CORRIDOR_IMAGE: "/assets/images/[JAIL_CORRIDOR].jpg",
    DUTY_SUPERVISOR_IMAGE: "/assets/images/[DUTY_SUPERVISOR].jpg",
    GANGSTER_DOSSIER_IMAGE: "/assets/images/[GANGSTER_DOSSIER].jpg",
    SURVEILLANCE_IMAGE: "/assets/images/[SURVEILLANCE_IMAGE].jpg",
    FINAL_REVEAL_IMAGE: "/assets/WhatsAppaathish.jpeg",
    BIRTHDAY_PHOTO: "/assets/WhatsAppaathish.jpeg",
  },

  // Audio Asset Configuration (Located in public/assets/audio/)
  AUDIO: {
    INTRO_BGM: "/assets/audio/putaapu_gang.mp3",
    MAIN_BGM: "/assets/audio/putaapu_gang.mp3",
    SUSPENSE_BGM: "/assets/audio/putaapu_gang.mp3",
    FINAL_REVEAL_BGM: "/assets/audio/putaapu_gang.mp3",
    DOOR_SOUND: "/assets/audio/[JAIL_DOOR_SOUND].mp3",
    ALERT_SOUND: "/assets/audio/[SECURITY_ALERT].mp3",
    TRANSITION_SOUND: "/assets/audio/[TRANSITION_SOUND].mp3",
    REVEAL_SOUND: "/assets/audio/[FINAL_REVEAL_SOUND].mp3",
  },

  // Interactive Stage Parameters
  PASSCODE: "7709", // Secret code for Stage 08 (hint provided in Stage 10)
  REVEAL_COUNTDOWN_SECONDS: 5, // Countdown before the ultimate reveal
  AUDIO_VOLUME: 0.8, // Default volume between 0.0 and 1.0

  // Dialogue Scripts (Tamil-English cinematic flavor)
  DIALOGUES: {
    SUPERVISOR: "Inga satham pota setha... But today, someone extraordinary has arrived.",
    WARDEN: "Enna aatam aadinaalum, mudivula namma kitta dhaan varanum.",
    OPERATIVE: "Identity verified. The records say he is dangerous... but to us, he is family.",
    FINAL_WARNING: "Idhu bayapadra neram illa... Kondadra neram! (Time to celebrate!)"
  }
};
