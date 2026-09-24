import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, BookOpen, Mail, RefreshCw } from 'lucide-react';
import { birthdayContent } from '../content/birthdayLetter';

interface FinalSurpriseSectionProps {
  onReadLetterAgain: () => void;
  onRevisitPhotobook: () => void;
  onRestart: () => void;
}

export const FinalSurpriseSection: React.FC<FinalSurpriseSectionProps> = ({
  onReadLetterAgain,
  onRevisitPhotobook,
  onRestart,
}) => {
  const { finalSurprise } = birthdayContent;

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Gentle romantic celebratory confetti burst
    const end = Date.now() + 1200;
    const colors = ['#C98291', '#773B4B', '#D6B887', '#F8E8E8', '#FFD1DC'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.75 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.75 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <section className="screen-wrapper" aria-label="Final Birthday Surprise">
      <div style={{ textAlign: 'center', maxWidth: '640px', zIndex: 1 }}>
        {/* Animated Heart Motif */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-soft)',
            color: 'var(--accent-primary)',
            marginBottom: '1.5rem',
            animation: 'pulseHeart 2.5s infinite ease-in-out',
          }}
          aria-hidden="true"
        >
          <Heart size={32} fill="var(--accent-primary)" />
        </div>

        {/* Main Heading */}
        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.2rem)',
            fontWeight: 500,
            lineHeight: 1.2,
            color: 'var(--text-main)',
            marginBottom: '1rem',
          }}
        >
          {finalSurprise.heading}
        </h2>

        {/* Supporting Message */}
        <p
          className="font-serif"
          style={{
            fontStyle: 'italic',
            fontSize: 'clamp(1.15rem, 3vw, 1.35rem)',
            lineHeight: 1.7,
            color: 'var(--accent-deep)',
            maxWidth: '520px',
            margin: '0 auto 2rem',
          }}
        >
          "{finalSurprise.message}"
        </p>

        {/* Birthday Wish Display */}
        <div
          style={{
            margin: '2rem 0',
            padding: '1.25rem 2rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid var(--border-delicate)',
            display: 'inline-block',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          <p
            className="font-serif"
            style={{
              fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)',
              color: 'var(--accent-deep)',
              fontWeight: 600,
              letterSpacing: '0.01em',
            }}
          >
            {finalSurprise.birthdayWish}
          </p>
          <p
            className="font-sans"
            style={{
              fontSize: '0.85rem',
              color: 'var(--accent-gold)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginTop: '0.4rem',
              fontWeight: 600,
            }}
          >
            From: Aaryan, Your Forever & Always
          </p>
        </div>

        {/* Small Final Line */}
        <p
          className="font-handwriting"
          style={{
            fontSize: '1.4rem',
            color: 'var(--text-muted)',
            marginBottom: '2.5rem',
          }}
        >
          {finalSurprise.closingLine}
        </p>

        {/* Navigation / Replay Actions */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.85rem',
          }}
        >
          <button
            type="button"
            className="btn-primary"
            onClick={onReadLetterAgain}
            aria-label="Read the birthday letter again"
          >
            <Mail size={16} />
            <span>{finalSurprise.readLetterAgainText}</span>
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={onRevisitPhotobook}
            aria-label="Revisit the photobook"
          >
            <BookOpen size={16} />
            <span>{finalSurprise.revisitPhotobookText}</span>
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={onRestart}
            aria-label="Restart the surprise from the beginning"
            title="Start from beginning"
          >
            <RefreshCw size={14} />
            <span>{finalSurprise.restartJourneyText}</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulseHeart {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }
      `}</style>
    </section>
  );
};
