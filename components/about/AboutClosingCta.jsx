import Link from 'next/link';
import { aboutClosingCtaData } from '@/data/about';

export default function AboutClosingCta() {
  return (
    <section className="about-cta-section" id="about-cta">
      <div className="wrap">
        <div className="about-cta-card center">
          <h2>{aboutClosingCtaData.heading}</h2>
          <p>{aboutClosingCtaData.body}</p>

          <div className="about-cta-actions">
            <Link href={aboutClosingCtaData.primaryCtaLink} className="btn btn-primary">
              {aboutClosingCtaData.primaryCtaText}
            </Link>
            <Link href={aboutClosingCtaData.secondaryCtaLink} className="btn btn-outline" style={{ color: 'var(--navy-deep)', borderColor: 'var(--navy)' }}>
              {aboutClosingCtaData.secondaryCtaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
