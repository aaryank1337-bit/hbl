import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { birthdayContent } from '../content/birthdayLetter';

interface PersonalIntroSectionProps {
  onProceed: () => void;
}

export const PersonalIntroSection: React.FC<PersonalIntroSectionProps> = ({ onProceed }) => {
  const { personalIntro } = birthdayContent;

  return (
    <section className="screen-wrapper" aria-label="Personal Introduction">
      <div className="paper-card" style={{ textAlign: 'center' }}>
        {/* Decorative Floral / Heart Detail */}
        <div
          style={{
            margin: '0 auto 1.5rem',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-deep)',
          }}
          aria-hidden="true"
        >
          <Sparkles size={26} />
        </div>

        {/* Heading */}
        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
            fontWeight: 500,
            color: 'var(--text-main)',
            marginBottom: '1rem',
            lineHeight: 1.25,
          }}
        >
          {personalIntro.heading}
        </h2>

        {/* Warm divider line with gold accent */}
        <div
          style={{
            width: '60px',
            height: '1px',
            backgroundColor: 'var(--accent-gold)',
            margin: '0 auto 1.5rem',
            opacity: 0.6,
          }}
          aria-hidden="true"
        />

        {/* Message */}
        <p
          className="font-serif"
          style={{
            fontStyle: 'italic',
            fontSize: 'clamp(1.15rem, 3vw, 1.35rem)',
            lineHeight: 1.7,
            color: 'var(--accent-deep)',
            maxWidth: '480px',
            margin: '0 auto 2.2rem',
          }}
        >
          "{personalIntro.message}"
        </p>

        {/* Action Button */}
        <div>
          <button
            type="button"
            className="btn-primary"
            onClick={onProceed}
            aria-label="Begin photobook journey"
          >
            <BookOpen size={18} />
            <span>{personalIntro.buttonText}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
