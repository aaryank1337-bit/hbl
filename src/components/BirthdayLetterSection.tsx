import React from 'react';
import { Heart, Sparkles, BookOpen } from 'lucide-react';
import { birthdayContent } from '../content/birthdayLetter';

interface BirthdayLetterSectionProps {
  onProceed: () => void;
  onBackToPhotobook: () => void;
}

export const BirthdayLetterSection: React.FC<BirthdayLetterSectionProps> = ({
  onProceed,
  onBackToPhotobook,
}) => {
  const { letter } = birthdayContent;

  return (
    <section className="screen-wrapper" aria-label="Birthday Love Letter">
      <div className="paper-card" style={{ maxWidth: '680px', margin: '1rem auto' }}>
        {/* Decorative Wax Seal / Floral Accent */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            color: 'var(--accent-primary)',
            marginBottom: '1.25rem',
          }}
          aria-hidden="true"
        >
          <Sparkles size={18} />
          <Heart size={20} fill="var(--accent-primary)" />
          <Sparkles size={18} />
        </div>

        {/* Salutation */}
        <h2
          className="font-serif"
          style={{
            fontStyle: 'italic',
            fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
            color: 'var(--accent-deep)',
            textAlign: 'center',
            marginBottom: '1.5rem',
            fontWeight: 500,
          }}
        >
          {letter.salutation}
        </h2>

        {/* Letter Paragraphs */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.1rem',
            color: 'var(--text-main)',
            fontSize: 'clamp(1rem, 2.5vw, 1.12rem)',
            lineHeight: 1.8,
            padding: '0 0.5rem',
          }}
        >
          {letter.paragraphs.map((para, idx) => {
            // Emphasize the opening and closing emotional phrases
            const isEmphasized =
              idx === 0 ||
              idx === 4 ||
              idx === letter.paragraphs.length - 2 ||
              idx === letter.paragraphs.length - 1;

            return (
              <p
                key={idx}
                className={isEmphasized ? 'font-serif' : 'font-sans'}
                style={{
                  fontStyle: isEmphasized ? 'italic' : 'normal',
                  fontSize: isEmphasized ? '1.15em' : '1em',
                  color: isEmphasized ? 'var(--accent-deep)' : 'var(--text-main)',
                  fontWeight: isEmphasized ? 500 : 400,
                }}
              >
                {para}
              </p>
            );
          })}
        </div>

        {/* Closing Signature */}
        <div
          style={{
            marginTop: '2rem',
            textAlign: 'right',
            paddingRight: '1rem',
          }}
        >
          <span
            className="font-handwriting"
            style={{
              fontSize: '1.8rem',
              color: 'var(--accent-deep)',
              display: 'inline-block',
            }}
          >
            {letter.closing} ♡
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'var(--border-delicate)',
            margin: '2rem 0 1.5rem',
          }}
          aria-hidden="true"
        />

        {/* Navigation Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <button
            type="button"
            className="btn-secondary"
            onClick={onBackToPhotobook}
            aria-label="Revisit the photobook"
          >
            <BookOpen size={16} />
            <span>Revisit Photobook</span>
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={onProceed}
            aria-label="Reveal the final surprise"
          >
            <Sparkles size={18} />
            <span>{letter.buttonText}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
