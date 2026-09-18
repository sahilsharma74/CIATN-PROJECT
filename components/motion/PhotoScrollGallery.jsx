'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// 15 Local CIATN Project Images mapped into 3 animation layers + 1 Main Center Scaler
const GALLERY_LAYERS = {
  mainCenter: {
    id: 'main-center-scaler',
    src: '/assets/hero_treatment.webp',
    alt: 'CIATN Hands-On Clinical Cosmetology & Aesthetic Procedure Training',
    title: 'Hands-On Clinical Cosmetology Training',
  },
  // Layer 1: OUTER 6 Images (Top-L, Top-R, Mid-L, Mid-R, Bot-L, Bot-R)
  layer1Outer: [
    {
      id: 'outer-1',
      src: '/about/traning.webp',
      alt: 'Practical Clinical Workshop',
      gridArea: 'col1-row1',
      label: 'Practical Workshop',
      startDelay: 0.05,
      endDelay: 0.45,
    },
    {
      id: 'outer-2',
      src: '/about/rg3.webp',
      alt: 'Hands-On Training Session',
      gridArea: 'col5-row1',
      label: 'Hands-On Training',
      startDelay: 0.08,
      endDelay: 0.48,
    },
    {
      id: 'outer-3',
      src: '/about/prociser.webp',
      alt: 'Clinical Procedure Demonstration',
      gridArea: 'col1-row2',
      label: 'Clinical Demo',
      startDelay: 0.12,
      endDelay: 0.52,
    },
    {
      id: 'outer-4',
      src: '/assets/pgdc.webp',
      alt: 'Post Graduate Clinical Lecture',
      gridArea: 'col5-row2',
      label: 'PG Lecture',
      startDelay: 0.15,
      endDelay: 0.55,
    },
    {
      id: 'outer-5',
      src: '/assets/graduates.webp',
      alt: 'CIATN Certified Doctor Graduates',
      gridArea: 'col1-row3',
      label: 'Doctor Graduates',
      startDelay: 0.18,
      endDelay: 0.58,
    },
    {
      id: 'outer-6',
      src: '/assets/lips.webp',
      alt: 'Aesthetic Dermatology Training',
      gridArea: 'col5-row3',
      label: 'Aesthetic Procedures',
      startDelay: 0.22,
      endDelay: 0.62,
    },
  ],
  // Layer 2: INNER 6 Images
  layer2Inner: [
    {
      id: 'inner-1',
      src: '/assets/founder_portrait.webp',
      alt: 'Faculty Guidance by Dr. Akshaya Jain',
      gridArea: 'col2-row1',
      label: 'Expert Faculty',
      startDelay: 0.25,
      endDelay: 0.65,
    },
    {
      id: 'inner-2',
      src: '/assets/hero_treatment.webp',
      alt: 'CIATN Advanced Training Facility',
      gridArea: 'col4-row1',
      label: 'Clinical Facility',
      startDelay: 0.28,
      endDelay: 0.68,
    },
    {
      id: 'inner-3',
      src: '/assets/nsdc_certificate.webp',
      alt: 'Facial Aesthetics Masterclass',
      gridArea: 'col2-row2',
      label: 'Facial Aesthetics',
      startDelay: 0.32,
      endDelay: 0.72,
    },
    {
      id: 'inner-4',
      src: '/assets/ebvtr_certificate.webp',
      alt: 'Clinical Trichology Demonstration',
      gridArea: 'col4-row2',
      label: 'Clinical Trichology',
      startDelay: 0.35,
      endDelay: 0.75,
    },
    {
      id: 'inner-5',
      src: '/assets/nitin.webp',
      alt: 'Live Patient Procedure Guidance',
      gridArea: 'col2-row3',
      label: 'Live Mentorship',
      startDelay: 0.38,
      endDelay: 0.78,
    },
    {
      id: 'inner-6',
      src: '/courses/raw.webp',
      alt: 'Laser & Energy Based Device Training',
      gridArea: 'col4-row3',
      label: 'Laser Training',
      startDelay: 0.42,
      endDelay: 0.82,
    },
  ],
  // Layer 3: CENTER TOP & BOTTOM 2 Images
  layer3Center: [
    {
      id: 'center-top',
      src: '/assets/founder_portrait.webp',
      alt: 'CIATN Academic Leadership',
      gridArea: 'col3-row1',
      label: 'Academic Leadership',
      startDelay: 0.45,
      endDelay: 0.85,
    },
    {
      id: 'center-bottom',
      src: '/assets/pgdc.webp',
      alt: 'Hands-on Clinical Practice',
      gridArea: 'col3-row3',
      label: 'Clinical Excellence',
      startDelay: 0.48,
      endDelay: 0.88,
    },
  ],
};

export default function PhotoScrollGallery() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isMobileOrReduced, setIsMobileOrReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const checkViewport = () => {
      setIsMobileOrReduced(mediaQuery.matches || window.innerWidth < 768);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);

    let rafId = null;

    const handleScroll = () => {
      if (!sectionRef.current || mediaQuery.matches) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = rect.height - viewportHeight;

      if (totalScrollable <= 0) return;

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
      window.removeEventListener('resize', checkViewport);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (isMobileOrReduced || !gridRef.current) return;

    const rect = gridRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    setMouseOffset({
      x: Math.max(-12, Math.min(12, deltaX * 12)),
      y: Math.max(-12, Math.min(12, deltaY * 12)),
    });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Helper function to calculate layer opacity and scale based on scroll progress
  const getLayerItemStyle = (startDelay, endDelay, parallaxFactor = 1) => {
    if (isMobileOrReduced) {
      return { opacity: 1, transform: 'scale(1)', visibility: 'visible' };
    }

    if (scrollProgress < startDelay) {
      return { opacity: 0, transform: 'scale(0.2) translateZ(-60px)', visibility: 'hidden' };
    }

    const range = endDelay - startDelay;
    const rawRatio = (scrollProgress - startDelay) / range;
    const ratio = Math.min(Math.max(rawRatio, 0), 1);

    // Easing cubic curve
    const eased = Math.sin((ratio * Math.PI) / 2);

    const opacity = eased;
    const scale = 0.2 + eased * 0.8;
    const mx = mouseOffset.x * parallaxFactor;
    const my = mouseOffset.y * parallaxFactor;

    return {
      opacity,
      transform: `scale(${scale}) translate3d(${mx}px, ${my}px, 0)`,
      visibility: opacity > 0.01 ? 'visible' : 'hidden',
      transition: 'transform 0.15s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.15s ease-out',
    };
  };

  // Main center image scaling calculation: 100vw/100vh -> grid slot size
  const getMainCenterStyle = () => {
    if (isMobileOrReduced) {
      return {
        width: '100%',
        height: '100%',
        transform: 'none',
        borderRadius: '20px',
      };
    }

    // Shrink center image smoothly from full-screen to grid frame between 0 and 0.8 progress
    const shrinkRatio = Math.min(scrollProgress / 0.8, 1);
    const easedShrink = 1 - Math.pow(1 - shrinkRatio, 3); // easeOutCubic

    const widthVw = 95 - easedShrink * 74; // 95vw -> ~21vw grid cell
    const heightVh = 92 - easedShrink * 66; // 92vh -> ~26vh grid cell
    const borderRadius = 12 + easedShrink * 16; // 12px -> 28px
    const shadowAlpha = 0.15 + easedShrink * 0.2;

    const mx = mouseOffset.x * 0.3;
    const my = mouseOffset.y * 0.3;

    return {
      width: `${widthVw}vw`,
      height: `${heightVh}vh`,
      borderRadius: `${borderRadius}px`,
      transform: `translate3d(${mx}px, ${my}px, 0)`,
      boxShadow: `0 ${12 + easedShrink * 20}px ${30 + easedShrink * 40}px rgba(15, 23, 56, ${shadowAlpha})`,
      transition: 'width 0.12s cubic-bezier(0.22, 1, 0.36, 1), height 0.12s cubic-bezier(0.22, 1, 0.36, 1), border-radius 0.12s ease',
    };
  };

  // Title panel reveal opacity
  const titleOpacity = isMobileOrReduced ? 1 : Math.min(Math.max((scrollProgress - 0.3) / 0.5, 0), 1);

  return (
    <section
      ref={sectionRef}
      className="photo-scroll-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="photo-scroll-sticky">
        {/* OVERLAY HEADING */}
        <div
          className="photo-scroll-header"
          style={{
            opacity: titleOpacity,
            transform: isMobileOrReduced ? 'none' : `translate3d(0, ${(1 - titleOpacity) * 30}px, 0)`,
            transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
          }}
        >
          <span className="photo-scroll-badge">
            <span className="badge-dot"></span> CIATN CLINICAL JOURNAL
          </span>
          <h2 className="photo-scroll-title">
            15 Years of Clinical Excellence &amp; Hands-On Mastery
          </h2>
        </div>

        {/* 5-COLUMN x 3-ROW GALLERY GRID */}
        <div ref={gridRef} className="photo-scroll-grid">
          {/* LAYER 1: OUTER 6 IMAGES */}
          {GALLERY_LAYERS.layer1Outer.map((item) => (
            <div
              key={item.id}
              className={`photo-card photo-card-outer ${item.gridArea}`}
              style={getLayerItemStyle(item.startDelay, item.endDelay, 1.2)}
            >
              <Image src={item.src} alt={item.alt} fill sizes="20vw" className="photo-img" />
              <div className="photo-card-tag">{item.label}</div>
            </div>
          ))}

          {/* LAYER 2: INNER 6 IMAGES */}
          {GALLERY_LAYERS.layer2Inner.map((item) => (
            <div
              key={item.id}
              className={`photo-card photo-card-inner ${item.gridArea}`}
              style={getLayerItemStyle(item.startDelay, item.endDelay, 0.8)}
            >
              <Image src={item.src} alt={item.alt} fill sizes="20vw" className="photo-img" />
              <div className="photo-card-tag">{item.label}</div>
            </div>
          ))}

          {/* LAYER 3: CENTER TOP & BOTTOM 2 IMAGES */}
          {GALLERY_LAYERS.layer3Center.map((item) => (
            <div
              key={item.id}
              className={`photo-card photo-card-center-support ${item.gridArea}`}
              style={getLayerItemStyle(item.startDelay, item.endDelay, 0.5)}
            >
              <Image src={item.src} alt={item.alt} fill sizes="20vw" className="photo-img" />
              <div className="photo-card-tag">{item.label}</div>
            </div>
          ))}

          {/* MAIN CENTER SCALER IMAGE (POSITION 15) */}
          <div className="photo-card-main-wrapper col3-row2">
            <div className="photo-card-main" style={getMainCenterStyle()}>
              <Image
                src={GALLERY_LAYERS.mainCenter.src}
                alt={GALLERY_LAYERS.mainCenter.alt}
                fill
                sizes="(max-width: 768px) 90vw, 35vw"
                priority
                className="photo-img-main"
              />
              <div className="photo-main-gradient" />
              <div className="photo-main-label">
                <span className="label-dot"></span>
                <span>{GALLERY_LAYERS.mainCenter.title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
