import React, { useState } from 'react';
import { AmbientBackground } from './components/AmbientBackground';
import { IntroSection } from './components/IntroSection';
import { PersonalIntroSection } from './components/PersonalIntroSection';
import { PhotobookSection } from './components/PhotobookSection';
import { BirthdayLetterSection } from './components/BirthdayLetterSection';
import { FinalSurpriseSection } from './components/FinalSurpriseSection';

export type ScreenState =
  | 'intro'
  | 'personalIntro'
  | 'photobook'
  | 'letter'
  | 'finalSurprise';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('intro');

  const navigateTo = (screen: ScreenState) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScreen(screen);
  };

  return (
    <main
      style={{
        position: 'relative',
        minHeight: '100dvh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Decorative Ambient Floating Petals & Sparkles */}
      <AmbientBackground />

      {/* Screen 1: Introduction */}
      {currentScreen === 'intro' && (
        <IntroSection onProceed={() => navigateTo('personalIntro')} />
      )}

      {/* Screen 2: Personal Prologue */}
      {currentScreen === 'personalIntro' && (
        <PersonalIntroSection onProceed={() => navigateTo('photobook')} />
      )}

      {/* Screen 3: Digital Photobook */}
      {currentScreen === 'photobook' && (
        <PhotobookSection
          onProceed={() => navigateTo('letter')}
          onBackToIntro={() => navigateTo('personalIntro')}
        />
      )}

      {/* Screen 4: The Birthday Love Letter */}
      {currentScreen === 'letter' && (
        <BirthdayLetterSection
          onProceed={() => navigateTo('finalSurprise')}
          onBackToPhotobook={() => navigateTo('photobook')}
        />
      )}

      {/* Screen 5: The Final Surprise */}
      {currentScreen === 'finalSurprise' && (
        <FinalSurpriseSection
          onReadLetterAgain={() => navigateTo('letter')}
          onRevisitPhotobook={() => navigateTo('photobook')}
          onRestart={() => navigateTo('intro')}
        />
      )}
    </main>
  );
};

export default App;
