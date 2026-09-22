import React from 'react';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
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
        <div>
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

        {/* Gentle Invitation Indicator */}
        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.3rem',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            opacity: 0.8,
            cursor: 'pointer',
          }}
          onClick={onProceed}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onProceed();
          }}
        >
          <span className="font-handwriting" style={{ fontSize: '1.25rem', color: 'var(--accent-deep)' }}>
            {intro.invitationHint}
          </span>
          <ChevronDown
            size={18}
            style={{
              animation: 'bounceGentle 2s infinite ease-in-out',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes bounceGentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }
      `}</style>
    </section>
  );
};
