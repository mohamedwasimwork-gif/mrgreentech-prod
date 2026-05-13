'use client';

import { motion, useInView } from 'framer-motion';
import { Fragment, useRef } from 'react';

interface BlurInWordsProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  stagger?: number;
  duration?: number;
}

/**
 * A6 — Splits text by word, each word fades + blurs + rises 10px.
 * Words are inline-block with normal whitespace between them so they
 * wrap naturally inside any heading element.
 */
export default function BlurInWords({
  text,
  className = '',
  as: Tag = 'h2',
  stagger = 0.06,
  duration = 0.8,
}: BlurInWordsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag ref={ref as any} className={className} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <motion.span
            initial={{ opacity: 0.001, filter: 'blur(5px)', y: 10 }}
            animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
            transition={{ duration, delay: i * stagger, ease: 'easeOut' }}
            style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
            aria-hidden="true"
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </Tag>
  );
}
