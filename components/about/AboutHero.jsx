import Image from 'next/image';
import { aboutHeroData } from '@/data/about';

export default function AboutHero() {
  return (
    <section className="about-hero hero" style={{ paddingBottom: '64px' }}>
      <div className="wrap">
        <div className="about-hero-grid">
          <div className="about-hero-text">
            <span className="hero-eyebrow">
              <span className="dot"></span>
              {aboutHeroData.eyebrow}
            </span>
            <h1 style={{ maxWidth: '16ch', marginTop: '12px' }}>{aboutHeroData.heading}</h1>
            <p className="lead" style={{ maxWidth: '60ch', marginTop: '20px' }}>
              {aboutHeroData.lead}
            </p>
          </div>
          <div className="about-hero-image-wrapper">
            <Image
              src="/about/prociser.png"
              alt="CIATN Clinical Procedure Training"
              width={600}
              height={400}
              className="about-hero-img"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
