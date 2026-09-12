'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

export default function ApprovedBy() {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeCert, setActiveCert] = useState(null);
  const [tiltStyles, setTiltStyles] = useState({});

  const handleMouseMove = (index, e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTiltStyles((prev) => ({
      ...prev,
      [index]: {
        transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`,
        transition: 'transform 0.1s ease-out',
      },
    }));
  };

  const handleMouseLeave = (index) => {
    setTiltStyles((prev) => ({
      ...prev,
      [index]: {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.5s ease',
      },
    }));
  };

  const certificates = [
    {
      id: 0,
      src: '/assets/ebvtr_certificate.png',
      alt: 'EBVTR Vocational Center Certificate',
      title: 'EBVTR Vocational Center Certificate',
      caption: 'EBVTR Vocational Center',
      subtitle: 'Educational Board of Vocational Training & Research • Authorized Training Center',
    },
    {
      id: 1,
      src: '/assets/nsdc_certificate.png',
      alt: 'NSDC Accredited Center Certificate',
      title: 'NSDC Accredited Center Certificate',
      caption: 'NSDC Accredited Center',
      subtitle: 'TC ID: TC329218 • National Skill Development Corporation Standard',
    },
  ];

  const logos = [
    { src: '/assets/accreditation_logos/iso_logo.png', alt: 'ISO 9001:2015 Certified Company' },
    { src: '/assets/accreditation_logos/msme_logo.png', alt: 'MSME Micro Small Medium Enterprises Govt of India' },
    { src: '/assets/accreditation_logos/niti_logo.png', alt: 'NITI Aayog Government of India' },
    { src: '/assets/accreditation_logos/startup_logo.png', alt: 'Startup India DPIIT Approved' },
    { src: '/assets/accreditation_logos/jas_anz_logo.png', alt: 'JAS-ANZ Accreditation' },
    { src: '/assets/accreditation_logos/mygov_logo.png', alt: 'MyGov Meri Sarkar' },
    { src: '/assets/accreditation_logos/skill_india_logo.png', alt: 'Skill India Kaushal Bharat' },
    { src: '/assets/accreditation_logos/education_logo.png', alt: 'Government Skill Education Accredited' },
  ];

  // Tripled logos array for infinite seamless looping
  const carouselLogos = [...logos, ...logos, ...logos];

  const handleNav = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const recognitions = [
    {
      title: 'NSDC Accredited',
      subtitle: 'TC ID: TC329218',
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3L2 10h20L12 3z" />
        </svg>
      ),
    },
    {
      title: 'ISO 9001:2015 Certified',
      subtitle: 'Quality Management',
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'MSME Registered',
      subtitle: 'Govt. of India',
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="5" />
          <path d="M15 11.5L16.5 21l-4.5-2.5L7.5 21 9 11.5" />
        </svg>
      ),
    },
    {
      title: 'Startup India Recognised',
      subtitle: 'DPIIT Approved',
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 0 1-3.95 2z" />
          <path d="M9 18l3 3" />
        </svg>
      ),
    },
  ];

  return (
    <section className="national-standards-section" id="accreditation">
      {/* Decorative Background Curved Lines */}
      <div className="ns-bg-decor-left" aria-hidden="true">
        <svg width="280" height="280" viewBox="0 0 280 280" fill="none">
          <circle cx="0" cy="0" r="260" stroke="#E6DBCA" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.6" />
          <circle cx="0" cy="0" r="200" stroke="#DFCFA9" strokeWidth="1" opacity="0.4" />
          <circle cx="0" cy="0" r="130" stroke="#D5BF8A" strokeWidth="1.2" opacity="0.35" />
        </svg>
      </div>

      <div className="ns-bg-decor-right" aria-hidden="true">
        <svg width="260" height="360" viewBox="0 0 260 360" fill="none">
          <path d="M240 10 C180 110, 90 180, 240 340 M240 10 C120 80, 70 200, 210 310" stroke="#E2D4BB" strokeWidth="1.2" opacity="0.45" />
          <path d="M190 40 C120 130, 50 210, 190 320" stroke="#D7C39E" strokeWidth="1" opacity="0.35" />
        </svg>
      </div>

      <div className="container national-standards-wrap">
        {/* LEFT COLUMN */}
        <div className="ns-left-col">
          <div className="ns-header-block">
            <div className="ns-eyebrow-row">
              <span className="ns-eyebrow">NATIONAL STANDARDS</span>
              <span className="ns-eyebrow-line" aria-hidden="true"></span>
            </div>
            <h2 className="ns-heading">APPROVED BY &amp; ACCREDITED</h2>
            <p className="ns-description">
              Government-recognized clinical excellence. Certified under NSDC, EBVTR, MSME &amp; ISO 9001:2015 training standards.
            </p>
          </div>

          {/* LOGO CAROUSEL */}
          <div
            className="national-standards-carousel"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button
              type="button"
              className="accreditation-nav prev"
              onClick={() => handleNav('left')}
              aria-label="Previous accreditation logos"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="accreditation-carousel-viewport" ref={scrollRef}>
              <div className={`accreditation-logo-track ${isHovered ? 'paused' : ''}`}>
                {carouselLogos.map((item, idx) => (
                  <div key={idx} className="accreditation-logo-badge">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={64}
                      height={64}
                      className="accreditation-logo-img"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="accreditation-nav next"
              onClick={() => handleNav('right')}
              aria-label="Next accreditation logos"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="ns-right-col">
          {/* LARGE CERTIFICATE SHOWCASE CARD */}
          <div className="certificate-showcase">
            <div className="certificate-grid">
              {certificates.map((cert) => (
                <div key={cert.id} className="certificate-item">
                  <div
                    className="certificate-img-box cert-interactive-card"
                    style={tiltStyles[cert.id] || {}}
                    onMouseMove={(e) => handleMouseMove(cert.id, e)}
                    onMouseLeave={() => handleMouseLeave(cert.id)}
                    onClick={() => setActiveCert(cert)}
                    title={`Click to expand ${cert.caption}`}
                  >
                    <div className="cert-shimmer"></div>
                    <div className="cert-verified-pill">
                      <span className="pill-dot"></span> Verified Accreditation
                    </div>
                    <Image
                      src={cert.src}
                      alt={cert.alt}
                      width={380}
                      height={270}
                      className="certificate-img"
                      priority
                    />
                    <div className="cert-hover-overlay">
                      <span>Click to Expand 🔍</span>
                    </div>
                  </div>
                  <span className="certificate-caption">{cert.caption}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lightbox Modal for Dual Certificates */}
          {activeCert && (
            <div className="cert-lightbox-modal" onClick={() => setActiveCert(null)}>
              <div className="cert-lightbox-content" onClick={(e) => e.stopPropagation()}>
                <button className="cert-lightbox-close" onClick={() => setActiveCert(null)} aria-label="Close modal">
                  ✕
                </button>
                <div className="cert-lightbox-header">
                  <span className="nsdc-badge">GOVERNMENT RECOGNIZED</span>
                  <h3>{activeCert.title}</h3>
                  <p>{activeCert.subtitle}</p>
                </div>
                <div className="cert-lightbox-body">
                  <Image
                    src={activeCert.src}
                    alt={activeCert.alt}
                    width={1120}
                    height={780}
                    style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
                    priority
                  />
                </div>
              </div>
            </div>
          )}

          {/* FOUR RECOGNITION CARDS UNDERNEATH SHOWCASE */}
          <div className="recognition-grid ns-recognition-grid">
            {recognitions.map((card, idx) => (
              <div key={idx} className="recognition-card ns-recognition-card">
                <div className="ns-recognition-icon-wrap">
                  {card.icon}
                </div>
                <div className="ns-recognition-info">
                  <h4 className="ns-recognition-title">{card.title}</h4>
                  <span className="ns-recognition-subtitle">{card.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
