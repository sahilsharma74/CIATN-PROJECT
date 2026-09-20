'use client';

import { useEffect } from 'react';

/**
 * Temporary 3D experiment: site-wide motion layer, no per-component wiring.
 * 1. Tilt-on-hover: any element matching TILT_SELECTOR tilts in 3D toward the
 *    cursor (delegated pointermove, no DOM binding needed).
 * 2. 3D scroll reveal: elements matching REVEAL_SELECTOR enter with a
 *    perspective rotateX + rise once visible (IntersectionObserver).
 * Touch devices and prefers-reduced-motion get none of it.
 */
const TILT_SELECTOR = '.program-card, .why-item, .course-card, .ns-recognition-card, .contact-info-card, .stat-card';
const REVEAL_SELECTOR = '.section-head, .ns-header-block, .program-card, .why-item, .course-card, .recognition-card, .certificate-showcase, .curriculum-card, .advantage-card';

const MAX_TILT_DEG = 8;

export default function SiteMotion3D() {
  useEffect(() => {
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)');

    let tiltEl = null;
    let rafId = 0;
    let observer = null;
    let mutation = null;
    let scanTimer = 0;

    const resetTilt = () => {
      if (!tiltEl) return;
      tiltEl.classList.remove('tilt-active');
      tiltEl.style.transform = '';
      tiltEl.style.removeProperty('--gx');
      tiltEl.style.removeProperty('--gy');
      tiltEl = null;
    };

    const applyTilt = (el, e) => {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      const ry = Math.max(-1, Math.min(1, nx * 2)) * MAX_TILT_DEG;
      const rx = Math.max(-1, Math.min(1, -ny * 2)) * MAX_TILT_DEG * 0.75;
      el.classList.add('tilt-active');
      el.style.setProperty('--gx', `${((nx + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty('--gy', `${((ny + 0.5) * 100).toFixed(1)}%`);
      el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(6px)`;
    };

    const onPointerMove = (e) => {
      const el = e.target && e.target.closest ? e.target.closest(TILT_SELECTOR) : null;
      if (el !== tiltEl) {
        resetTilt();
        tiltEl = el;
      }
      if (el && !rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          if (tiltEl) applyTilt(tiltEl, e);
        });
      }
    };

    const onDocLeave = () => resetTilt();

    const scan = () => {
      const vh = window.innerHeight;
      const els = document.querySelectorAll(`${REVEAL_SELECTOR}:not([data-reveal3d])`);
      els.forEach((el) => {
        el.setAttribute('data-reveal3d', '');
        // Stagger siblings inside the same grid/parent
        const parent = el.parentElement;
        if (!parent) return;
        const siblings = Array.from(parent.children).filter(
          (c) => c !== el && c.hasAttribute && c.hasAttribute('data-reveal3d')
        );
        const delay = Math.min(siblings.length * 70, 350);
        if (delay) el.style.transitionDelay = `${delay}ms`;
        // Already on screen (e.g. mid-page reload): show instantly, no hidden phase
        const rect = el.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          el.classList.add('in-view');
        } else {
          observer.observe(el);
        }
      });
    };

    const debouncedScan = () => {
      clearTimeout(scanTimer);
      scanTimer = setTimeout(scan, 150);
    };

    if (mqReduce.matches || isTouch.matches) {
      // No motion: make sure nothing is ever hidden by reveal styles
      const clear = () => {
        document.querySelectorAll('[data-reveal3d]').forEach((el) => el.classList.add('in-view'));
      };
      clear();
      mutation = new MutationObserver(clear);
      mutation.observe(document.body, { childList: true, subtree: true });
      return () => {
        mutation.disconnect();
        clearTimeout(scanTimer);
      };
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    scan();
    mutation = new MutationObserver(debouncedScan);
    mutation.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onDocLeave);
    window.addEventListener('blur', onDocLeave);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(scanTimer);
      if (observer) observer.disconnect();
      if (mutation) mutation.disconnect();
      document.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onDocLeave);
      window.removeEventListener('blur', onDocLeave);
      document.querySelectorAll('[data-reveal3d]').forEach((el) => {
        el.removeAttribute('data-reveal3d');
        el.classList.remove('in-view');
        el.style.removeProperty('transition-delay');
      });
      resetTilt();
    };
  }, []);

  return null;
}
