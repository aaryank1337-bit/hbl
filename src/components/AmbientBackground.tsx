import React, { useMemo } from 'react';

export const AmbientBackground: React.FC = () => {
  // Generate a small, deterministic set of subtle floating elements (sparkles and soft petals)
  const floatingItems = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${(i * 7.5 + 4) % 94}%`,
      delay: `${(i * 1.8) % 12}s`,
      duration: `${14 + ((i * 3) % 10)}s`,
      size: `${12 + ((i * 4) % 16)}px`,
      type: i % 2 === 0 ? 'petal' : 'sparkle',
      color: i % 3 === 0 ? 'var(--accent-primary)' : i % 3 === 1 ? 'var(--accent-gold)' : 'var(--accent-deep)',
    }));
  }, []);

  return (
    <div className="ambient-decorations" aria-hidden="true">
      {floatingItems.map((item) => (
        <span
          key={item.id}
          className="floating-petal"
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
            fontSize: item.size,
            color: item.color,
          }}
        >
          {item.type === 'petal' ? '🌸' : '✨'}
        </span>
      ))}
    </div>
  );
};
