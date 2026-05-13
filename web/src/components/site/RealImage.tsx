'use client';

import React, { CSSProperties, useState } from 'react';
import { picsum } from '../images';

interface RealImageProps {
  src: string;
  alt: string;
  ratio?: string;
  /** Seed used to derive the on-error fallback URL */
  fallbackSeed?: string;
  className?: string;
  style?: CSSProperties;
  /** Optional overlay label, shown in a small chip in the corner */
  label?: string;
}

/**
 * Drop-in replacement for the striped Placeholder — renders a real photo
 * with graceful onError fallback to a Picsum seeded image so the layout
 * never collapses. Respects aspectRatio so cards keep their shape.
 */
export function RealImage({
  src,
  alt,
  ratio = '16/9',
  fallbackSeed,
  className = '',
  style = {},
  label,
}: RealImageProps) {
  const [errored, setErrored] = useState(false);
  const seed = fallbackSeed || alt.replace(/[^a-z0-9]+/gi, '-').toLowerCase() || 'fallback';
  const finalSrc = errored ? picsum(seed, 1200, 900) : src;

  return (
    <div
      className={className}
      style={{
        aspectRatio: ratio,
        overflow: 'hidden',
        position: 'relative',
        background: 'var(--c-surface2)',
        borderRadius: 2,
        ...style,
      }}
    >
      <img
        src={finalSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setErrored(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      {label && (
        <span style={{
          position: 'absolute', bottom: 12, left: 12,
          background: 'rgba(8,10,14,0.65)', color: '#fff',
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em',
          textTransform: 'uppercase', padding: '4px 10px', borderRadius: 2,
          backdropFilter: 'blur(6px)',
        }}>
          ▢ {label}
        </span>
      )}
    </div>
  );
}
