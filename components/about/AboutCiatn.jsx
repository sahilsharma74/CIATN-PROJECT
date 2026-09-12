import Image from 'next/image';
import { aboutCiatnData } from '@/data/about';

export default function AboutCiatn() {
  return (
    <section className="about-ciatn-section" id="about-overview">
      <div className="wrap">
        <div className="about-ciatn-card">
          <div className="about-ciatn-top-grid">
            <div className="about-ciatn-text">
              <span className="eyebrow">Pioneering Aesthetic Education</span>
              <h2>{aboutCiatnData.heading}</h2>
              <p className="lead-body">{aboutCiatnData.body}</p>
            </div>
            <div className="about-ciatn-image-wrapper">
              <Image
                src="/about/traning.png"
                alt="CIATN Clinical Training"
                width={500}
                height={350}
                className="about-ciatn-img"
              />
            </div>
          </div>

          <div className="about-highlights-row" style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div className="highlight-pill" style={{ background: 'var(--paper-2)', padding: '16px 20px', borderRadius: '8px', border: '1px solid var(--line)' }}>
              <b style={{ color: 'var(--saffron-deep)', display: 'block', fontSize: '15px', marginBottom: '4px' }}>Doctor-Led Design</b>
              <span style={{ fontSize: '13.5px', color: 'var(--ink-soft)' }}>Crafted by working cosmetic physicians</span>
            </div>
            <div className="highlight-pill" style={{ background: 'var(--paper-2)', padding: '16px 20px', borderRadius: '8px', border: '1px solid var(--line)' }}>
              <b style={{ color: 'var(--saffron-deep)', display: 'block', fontSize: '15px', marginBottom: '4px' }}>Hands-On Focus</b>
              <span style={{ fontSize: '13.5px', color: 'var(--ink-soft)' }}>Supervised live clinical practice</span>
            </div>
            <div className="highlight-pill" style={{ background: 'var(--paper-2)', padding: '16px 20px', borderRadius: '8px', border: '1px solid var(--line)' }}>
              <b style={{ color: 'var(--saffron-deep)', display: 'block', fontSize: '15px', marginBottom: '4px' }}>Career Pathways</b>
              <span style={{ fontSize: '13.5px', color: 'var(--ink-soft)' }}>Clinics, wellness med-spas &amp; private practice</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
