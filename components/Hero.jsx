import Image from 'next/image';
import Counter from './Counter';
import HeroScene from './three/HeroScene';

export default function Hero() {
  return (
    <section className="hero">
      <HeroScene />
      <div className="wrap hero-grid">
        <div>
          <span className="hero-eyebrow">
            <span className="dot"></span>
            Shape the Future of Aesthetic Medicine with CIATN
          </span>
          <h1>
            India’s #1 Premier <em>Aesthetic Institute</em>
          </h1>
          <p className="lead">
            CIATN Institute builds skilled, ethically grounded aesthetic professionals through hands-on
            clinical training, government-aligned curricula, and mentorship from a working cosmetic physician.
          </p>
          <div className="hero-actions">
            <a href="/courses" className="btn btn-primary">
              Explore Courses
            </a>
            <a href="/about" className="btn btn-outline">
              Learn More About CIATN
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <b><Counter value="3,500+" /></b>
              <span>Certified Graduates</span>
            </div>
            <div className="hero-stat">
              <b><Counter value="98%" /></b>
              <span>Placement Success</span>
            </div>
            <div className="hero-stat">
              <b><Counter value="12+" /></b>
              <span>Clinical Programs</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-photo">
            <Image
              src="/assets/hero_treatment.webp"
              alt="Clinical cosmetology treatment in progress at CIATN"
              width={600}
              height={400}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
              priority
            />
          </div>
          <div className="float-card recognition">
            <div className="badge-row">
              <span className="badge-dot"></span>
              <b>Leader in Aesthetic Medicine</b>
            </div>
            <p>Honoured at Advantage Vidarbha 2026 by Hon. Union Minister Shri Nitin Gadkari</p>
          </div>
          <div className="float-card founder">
            <Image
              src="/assets/founder_portrait.webp"
              alt="Dr. Akshaya Jain"
              width={44}
              height={44}
              style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <b>Dr. Akshaya Jain</b>
              <span>Founder &amp; Director, CIATN</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
