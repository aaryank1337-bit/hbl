/**
 * =========================================================================
 * SANIYA'S 22ND BIRTHDAY SURPRISE - EDITABLE CONTENT CONFIGURATION
 * =========================================================================
 * 
 * You can easily edit any of the text, messages, or paragraphs below.
 * Everything will update automatically across the website.
 */

export interface BirthdayContent {
  recipientName: string;
  age: number;
  
  // Screen 1: Introduction
  intro: {
    eyebrow: string;
    mainHeading: string;
    subHeading: string;
    supportingMessage: string;
    buttonText: string;
    invitationHint: string;
  };

  // Screen 2: Personal Prologue
  personalIntro: {
    heading: string;
    message: string;
    buttonText: string;
  };

  // Screen 3: Photobook
  photobook: {
    caption: string;
    continueButtonText: string;
    pdfPath: string;
    totalPages: number; // 21 pages (page 22 sanitized for privacy)
  };

  // Screen 4: Birthday Love Letter
  letter: {
    salutation: string;
    paragraphs: string[];
    closing: string;
    buttonText: string;
  };

  // Screen 5: Final Surprise & Closing
  finalSurprise: {
    heading: string;
    message: string;
    birthdayWish: string;
    closingLine: string;
    readLetterAgainText: string;
    revisitPhotobookText: string;
    restartJourneyText: string;
  };
}

export const birthdayContent: BirthdayContent = {
  recipientName: "Saniya",
  age: 22,

  // Screen 1: The Birthday Introduction
  intro: {
    eyebrow: "A LITTLE SOMETHING MADE JUST FOR YOU",
    mainHeading: "Happy 22nd Birthday",
    subHeading: "My Saniya ♡",
    supportingMessage: "Today is all about celebrating you.",
    buttonText: "Open Your Surprise",
    invitationHint: "Tap to begin our journey",
  },

  // Screen 2: The Personal Introduction
  personalIntro: {
    heading: "Before you turn another page...",
    message:
      "I wanted to make you something you could come back to whenever you wanted a little reminder of how loved you are.",
    buttonText: "Let's Begin",
  },

  // Screen 3: Digital Photobook Viewer
  photobook: {
    caption: "A few little moments that mean a lot ♡",
    continueButtonText: "Continue",
    // Uses the sanitized 21-page photobook in public/assets
    pdfPath: "assets/saniya-photobook.pdf",
    totalPages: 21,
  },

  // Screen 4: The Birthday Letter
  letter: {
    salutation: "To my favourite person...",
    paragraphs: [
      "Happy 22nd Birthday, my love. ♡",
      "I wanted to make something a little different for you this year.",
      "These pictures hold so many little moments, smiles, and memories. Some are silly, some are special, and some are the kind of moments I wish I could pause and keep forever.",
      "I hope that whenever you look through them, they remind you of how beautiful your world is, how much there is to love about you, and how many wonderful memories are still waiting for you.",
      "Thank you for being you.",
      "I hope this year brings you happiness, exciting adventures, beautiful surprises, and all the little things that make your heart feel full.",
      "No matter how many photographs I collect, they could never capture everything that makes you special to me.",
      "Happy birthday, Saniya.",
      "I love you. ♡",
    ],
    closing: "Forever & Always",
    buttonText: "One Last Thing...",
  },

  // Screen 5: The Final Surprise
  finalSurprise: {
    heading: "And this is only the beginning...",
    message:
      "Here's to more memories, more laughter, more little adventures, and so many more pages of our story.",
    birthdayWish: "Happy Birthday, Saniya ♡",
    closingLine: "Made with love, just for you.",
    readLetterAgainText: "Read My Letter Again",
    revisitPhotobookText: "Revisit Photobook",
    restartJourneyText: "Start Over",
  },
};
