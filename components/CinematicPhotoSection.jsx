'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function CinematicPhotoSection({
  eyebrow = 'CLINICAL EXCELLENCE',
  heading = 'Learn. Practice. Transform.',
  subheading = 'Experience hands-on aesthetic medicine training guided by clinical expertise and real-world clinical practice at CIATN Institute.',
  imageSrc = '/assets/hero_treatment.jpg',
  imageAlt = 'CIATN hands-on clinical cosmetology & aesthetic medicine procedure training',
}) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0, rx: 0, ry: 0 });
  const [isMobileOrReduced, setIsMobileOrReduced] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion or is on mobile touch screen
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const checkReduced = () => {
      const isMobile = window.innerWidth < 1024;
      setIsMobileOrReduced(mediaQuery.matches || isMobile);
    };

    checkReduced();
    window.addEventListener('resize', checkReduced);

    let rafId = null;

    const handleScroll = () => {
      if (!sectionRef.current || mediaQuery.matches) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = rect.height - viewportHeight;

      if (totalScrollable <= 0) return;

      // Distance scrolled from top of section
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

      setScrollProgress(progress);
    };

    const onScrollRaf = () => {
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScrollRaf, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScrollRaf);
      window.removeEventListener('resize', checkReduced);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Desktop subtle mouse parallax effect
  const handleMouseMove = (e) => {
    if (isMobileOrReduced || !contentRef.current) return;

    const rect = contentRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    // Max 4px translation and 1deg rotation
    const tx = Math.max(-4, Math.min(4, deltaX * 4));
    const ty = Math.max(-4, Math.min(4, deltaY * 4));
    const ry = Math.max(-1, Math.min(1, deltaX * 1));
    const rx = Math.max(-1, Math.min(1, -deltaY * 1));

    setMouseOffset({ x: tx, y: ty, rx, ry });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0, rx: 0, ry: 0 });
  };

  // Easing function for smooth scroll progress
  const easeProgress = isMobileOrReduced
    ? 1
    : Math.min(1, Math.max(0, scrollProgress));

  // Compute animated style properties based on scroll progress (0 -> 1)
  const imageWidthVw = isMobileOrReduced ? 90 : 92 - easeProgress * 40; // 92vw -> 52vw
  const imageHeightVh = isMobileOrReduced ? 60 : 88 - easeProgress * 22; // 88vh -> 66vh
  const imageScale = isMobileOrReduced ? 1 : 1 - easeProgress * 0.12; // 1 -> 0.88
  const imageRadius = isMobileOrReduced ? 20 : 16 + easeProgress * 12; // 16px -> 28px
  const textOpacity = isMobileOrReduced ? 1 : Math.max(0, (easeProgress - 0.25) / 0.65);
  const textTranslateY = isMobileOrReduced ? 0 : (1 - textOpacity) * 45;

  return (
    <section
      ref={sectionRef}
      className="ciatn-cinematic-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="ciatn-cinematic-sticky">
        <div ref={contentRef} className="ciatn-cinematic-content">
          {/* TEXT COPY REVEAL PANEL */}
          <div
            className="ciatn-cinematic-copy"
            style={{
              opacity: textOpacity,
              transform: `translate3d(0, ${textTranslateY}px, 0)`,
              transition: isMobileOrReduced ? 'none' : 'opacity 0.2s ease-out, transform 0.2s ease-out',
            }}
          >
            <span className="ciatn-cinematic-eyebrow">
              <span className="eyebrow-dot"></span>
              {eyebrow}
            </span>

            <h2 className="ciatn-cinematic-heading">{heading}</h2>

            <p className="ciatn-cinematic-subheading">{subheading}</p>
          </div>

          {/* SCROLL-SCALED FEATURED IMAGE */}
          <div
            className="ciatn-cinematic-image-wrapper"
            style={{
              width: `${imageWidthVw}vw`,
              height: `${imageHeightVh}vh`,
              borderRadius: `${imageRadius}px`,
              transform: `perspective(1200px) scale3d(${imageScale}, ${imageScale}, 1) translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0) rotateX(${mouseOffset.rx}deg) rotateY(${mouseOffset.ry}deg)`,
              boxShadow: easeProgress > 0.4
                ? '0 24px 60px rgba(15, 23, 56, 0.25), 0 8px 24px rgba(226, 129, 31, 0.15)'
                : '0 12px 36px rgba(15, 23, 56, 0.15)',
              transition: isMobileOrReduced
                ? 'none'
                : 'width 0.15s cubic-bezier(0.22, 1, 0.36, 1), height 0.15s cubic-bezier(0.22, 1, 0.36, 1), transform 0.15s cubic-bezier(0.22, 1, 0.36, 1), border-radius 0.15s ease, box-shadow 0.2s ease',
            }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 90vw, 55vw"
              priority
              className="ciatn-cinematic-img"
            />
            <div className="ciatn-cinematic-overlay" />
            <div className="ciatn-cinematic-badge">
              <span className="badge-pulse-dot"></span>
              <span>CIATN Clinical Practice</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
