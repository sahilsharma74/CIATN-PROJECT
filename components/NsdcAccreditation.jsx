'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function NsdcAccreditation() {
  const [isOpen, setIsOpen] = useState(false);
  const [transformStyle, setTransformStyle] = useState({});
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease',
    });
  };

  return (
    <section className="nsdc-section" id="nsdc-accreditation">
      <div className="wrap">
        <div className="nsdc-card">
          <div className="nsdc-content">
            <span className="nsdc-badge">NSDC</span>
            <h2>NSDC Accreditation Certificate</h2>
            <h3 className="nsdc-org">Chromocosmo Institute of Aesthetics Trichology Nutrition Pvt Ltd</h3>
            <div className="nsdc-tcid">
              <span className="dot"></span>
              <b>TC ID: TC329218</b>
            </div>
            <p className="nsdc-desc">
              CIATN is officially registered and accredited under National Skill Development Corporation standards,
              ensuring government-aligned educational credibility and certified clinical training quality across India.
            </p>
            <div className="nsdc-actions">
              <a href="/about" className="btn btn-primary">
                Learn More
              </a>
              <button onClick={() => setIsOpen(true)} className="btn btn-outline-dark cert-expand-btn">
                🔍 View Full Certificate
              </button>
            </div>
          </div>
          <div className="nsdc-seal-wrap">
            <div
              ref={cardRef}
              className="nsdc-cert-img-wrap cert-interactive-card"
              style={transformStyle}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsOpen(true)}
              title="Click to view full certificate"
            >
              <div className="cert-shimmer"></div>
              <div className="cert-verified-pill">
                <span className="pill-dot"></span> Verified Accreditation
              </div>
              <Image
                src="/assets/nsdc_certificate.png"
                alt="Official NSDC Accreditation Certificate - Chromocosmo Institute of Aesthetics Trichology Nutrition Pvt Ltd (TC ID: TC329218)"
                width={560}
                height={390}
                className="nsdc-cert-img"
                priority
              />
              <div className="cert-hover-overlay">
                <span>Click to Expand 🔍</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="cert-lightbox-modal" onClick={() => setIsOpen(false)}>
          <div className="cert-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="cert-lightbox-close" onClick={() => setIsOpen(false)} aria-label="Close modal">
              ✕
            </button>
            <div className="cert-lightbox-header">
              <span className="nsdc-badge">GOVERNMENT RECOGNIZED</span>
              <h3>Official NSDC Accreditation Certificate</h3>
              <p>TC ID: TC329218 • Chromocosmo Institute of Aesthetics Trichology Nutrition Pvt Ltd</p>
            </div>
            <div className="cert-lightbox-body">
              <Image
                src="/assets/nsdc_certificate.png"
                alt="Official NSDC Accreditation Certificate Full Screen"
                width={1120}
                height={780}
                style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
