import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { birthdayContent } from '../content/birthdayLetter';

interface IntroSectionProps {
  onProceed: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onProceed }) => {
  const { intro } = birthdayContent;

  return (
    <section className="screen-wrapper" aria-label="Birthday Introduction">
      <div style={{ textAlign: 'center', maxWidth: '600px', zIndex: 1 }}>
        {/* Subtle Eyebrow */}
        <p className="eyebrow">{intro.eyebrow}</p>

        {/* Delicate Heart Icon Accent */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-soft)',
            color: 'var(--accent-primary)',
            marginBottom: '1rem',
          }}
          aria-hidden="true"
        >
          <Sparkles size={22} />
        </div>

        {/* Main Heading */}
        <h1 className="main-title">{intro.mainHeading}</h1>

        {/* Sub Heading */}
        <h2 className="sub-title">{intro.subHeading}</h2>

        {/* Supporting Message */}
        <p className="supporting-text">{intro.supportingMessage}</p>

        {/* Primary Action Button */}
        <div style={{ marginTop: '0.5rem' }}>
          <button
            type="button"
            className="btn-primary"
            onClick={onProceed}
            aria-label="Open your birthday surprise"
          >
            <Heart size={18} fill="currentColor" />
            <span>{intro.buttonText}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
