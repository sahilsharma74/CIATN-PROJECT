'use client';

import { useEffect, useRef } from 'react';
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

// Flat card list with per-layer parallax factors
const CARDS = [
  ...GALLERY_LAYERS.layer1Outer.map((item) => ({ ...item, kind: 'outer', parallax: 1.2 })),
  ...GALLERY_LAYERS.layer2Inner.map((item) => ({ ...item, kind: 'inner', parallax: 0.8 })),
  ...GALLERY_LAYERS.layer3Center.map((item) => ({ ...item, kind: 'center-support', parallax: 0.5 })),
];

// Initial (pre-animation) state so server-rendered markup matches frame zero
const HIDDEN_STYLE = { opacity: 0, transform: 'scale(0.2) translateZ(-60px)', visibility: 'hidden' };

export default function PhotoScrollGallery() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const headerRef = useRef(null);
  const mainRef = useRef(null);
  const cardRefs = useRef(new Map());

  useEffect(() => {
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isStatic = () => mqReduce.matches || window.innerWidth < 768;

    let rafId = 0;
    let visible = true;
    // Smoothed values: the loop chases the real scroll/mouse targets with lerp,
    // so motion stays fluid even with bursty scroll events.
    const state = { progress: 0, mx: 0, my: 0, tmx: 0, tmy: 0 };

    const applyStatic = () => {
      if (headerRef.current) {
        headerRef.current.style.opacity = '1';
        headerRef.current.style.transform = 'none';
      }
      for (const c of CARDS) {
        const el = cardRefs.current.get(c.id);
        if (!el) continue;
        el.style.opacity = '1';
        el.style.transform = 'scale(1)';
        el.style.visibility = 'visible';
      }
      if (mainRef.current) {
        Object.assign(mainRef.current.style, {
          width: '100%',
          height: '100%',
          borderRadius: '20px',
          transform: 'none',
          boxShadow: 'none',
        });
      }
    };

    const frame = () => {
      rafId = requestAnimationFrame(frame);
      if (!visible) return;

      const sec = sectionRef.current;
      if (sec) {
        const rect = sec.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        if (total > 0) {
          const target = Math.min(Math.max(-rect.top / total, 0), 1);
          state.progress += (target - state.progress) * 0.16;
        }
      }
      state.mx += (state.tmx - state.mx) * 0.08;
      state.my += (state.tmy - state.my) * 0.08;
      const p = state.progress;

      const titleOpacity = Math.min(Math.max((p - 0.3) / 0.5, 0), 1);
      if (headerRef.current) {
        headerRef.current.style.opacity = titleOpacity.toFixed(3);
        headerRef.current.style.transform = `translate3d(0, ${((1 - titleOpacity) * 30).toFixed(2)}px, 0)`;
      }

      for (const c of CARDS) {
        const el = cardRefs.current.get(c.id);
        if (!el) continue;
        if (p < c.startDelay) {
          el.style.opacity = '0';
          el.style.transform = 'scale(0.2) translateZ(-60px)';
          el.style.visibility = 'hidden';
          continue;
        }
        const ratio = Math.min(Math.max((p - c.startDelay) / (c.endDelay - c.startDelay), 0), 1);
        const eased = Math.sin((ratio * Math.PI) / 2);
        el.style.opacity = eased.toFixed(3);
        el.style.transform = `scale(${(0.2 + eased * 0.8).toFixed(4)}) translate3d(${(state.mx * c.parallax).toFixed(2)}px, ${(state.my * c.parallax).toFixed(2)}px, 0)`;
        el.style.visibility = eased > 0.01 ? 'visible' : 'hidden';
      }

      if (mainRef.current) {
        const shrinkRatio = Math.min(p / 0.8, 1);
        const easedShrink = 1 - Math.pow(1 - shrinkRatio, 3); // easeOutCubic
        const alpha = 0.15 + easedShrink * 0.2;
        mainRef.current.style.width = `${(95 - easedShrink * 74).toFixed(2)}vw`;
        mainRef.current.style.height = `${(92 - easedShrink * 66).toFixed(2)}vh`;
        mainRef.current.style.borderRadius = `${(12 + easedShrink * 16).toFixed(1)}px`;
        mainRef.current.style.transform = `translate3d(${(state.mx * 0.3).toFixed(2)}px, ${(state.my * 0.3).toFixed(2)}px, 0)`;
        mainRef.current.style.boxShadow = `0 ${(12 + easedShrink * 20).toFixed(0)}px ${(30 + easedShrink * 40).toFixed(0)}px rgba(15, 23, 56, ${alpha.toFixed(3)})`;
      }
    };

    const start = () => {
      if (isStatic()) {
        applyStatic();
        return;
      }
      if (!rafId) frame();
    };
    const stop = () => {
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const onPointer = (e) => {
      const g = gridRef.current;
      if (!g) return;
      const r = g.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      state.tmx = Math.max(-12, Math.min(12, nx * 12));
      state.tmy = Math.max(-12, Math.min(12, ny * 12));
    };

    const onResize = () => {
      stop();
      start();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    if (sectionRef.current) io.observe(sectionRef.current);

    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('resize', onResize);
    start();

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="photo-scroll-section">
      <div className="photo-scroll-sticky">
        {/* OVERLAY HEADING */}
        <div
          ref={headerRef}
          className="photo-scroll-header"
          style={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
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
          {CARDS.map((item) => (
            <div
              key={item.id}
              ref={(el) => {
                if (el) cardRefs.current.set(item.id, el);
                else cardRefs.current.delete(item.id);
              }}
              className={`photo-card photo-card-${item.kind} ${item.gridArea}`}
              style={HIDDEN_STYLE}
            >
              <Image src={item.src} alt={item.alt} fill sizes="20vw" className="photo-img" />
              <div className="photo-card-tag">{item.label}</div>
            </div>
          ))}

          {/* MAIN CENTER SCALER IMAGE (POSITION 15) */}
          <div className="photo-card-main-wrapper col3-row2">
            <div
              ref={mainRef}
              className="photo-card-main"
              style={{ width: '95vw', height: '92vh', borderRadius: '12px' }}
            >
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
