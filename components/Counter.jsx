'use client';

import { useState, useEffect, useRef } from 'react';

export default function Counter({ value, className = '', duration = 2200 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  // Parse strings like "3,500+" or "98%" into prefix, target number, suffix, and comma formatting
  const parseValue = (val) => {
    if (typeof val === 'number') return { prefix: '', target: val, suffix: '', hasCommas: false };
    const str = String(val);
    const match = str.match(/^([^\d]*)([\d,]+)([^\d]*)$/);
    if (!match) return { prefix: '', target: 0, suffix: str, hasCommas: false };

    const prefix = match[1] || '';
    const numStr = match[2];
    const suffix = match[3] || '';
    const hasCommas = numStr.includes(',');
    const target = parseInt(numStr.replace(/,/g, ''), 10);

    return { prefix, target, suffix, hasCommas };
  };

  const { prefix, target, suffix, hasCommas } = parseValue(value);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease out cubic function for ultra-smooth decelerating count
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * target);

            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [target, duration, hasAnimated]);

  const formattedNumber = hasCommas ? count.toLocaleString('en-US') : count;

  return (
    <span ref={ref} className={`counter-animated ${hasAnimated ? 'is-animated' : ''} ${className}`}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
}
