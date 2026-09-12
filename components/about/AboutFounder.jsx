import Image from 'next/image';
import { aboutFounderData } from '@/data/about';

export default function AboutFounder() {
  return (
    <section className="about-founder-section" id="founder">
      <div className="wrap founder-grid">
        <div className="founder-photo-wrap">
          <Image
            src={aboutFounderData.image}
            alt={`${aboutFounderData.name}, ${aboutFounderData.role} of CIATN Institute`}
            width={500}
            height={460}
            style={{ width: '100%', height: '460px', objectFit: 'cover', objectPosition: 'top center', borderRadius: '14px' }}
          />
          <div className="founder-badge">
            <b>12+</b>
            <span>Years experience</span>
          </div>
        </div>

        <div className="founder-copy">
          <span className="eyebrow">{aboutFounderData.heading}</span>
          <h2>{aboutFounderData.name}</h2>
          <span className="role">{aboutFounderData.role} · Founder, Skintillatingg Clinics</span>
          <p>{aboutFounderData.body}</p>

          <div className="founder-actions" style={{ marginTop: '28px' }}>
            <a href={aboutFounderData.ctaLink} className="btn btn-primary">
              {aboutFounderData.ctaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
