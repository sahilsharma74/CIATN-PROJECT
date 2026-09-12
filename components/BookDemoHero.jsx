import Link from 'next/link';

export default function BookDemoHero() {
  return (
    <section className="book-demo-hero hero">
      <div className="wrap">
        <nav className="breadcrumb-nav" aria-label="Breadcrumb">
          <ol className="breadcrumb-list">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-separator" aria-hidden="true">/</li>
            <li aria-current="page">Book a Demo</li>
          </ol>
        </nav>

        <div className="book-demo-hero-content">
          <span className="hero-eyebrow">
            <span className="dot"></span>
            ACADEMIC DEMO &amp; COUNSELING
          </span>
          <h1 className="book-demo-heading">
            Experience CIATN Before You Begin
          </h1>
          <p className="lead book-demo-subheading">
            Explore our accredited medical &amp; aesthetic programs, understand our hands-on clinical model, and receive expert career guidance from CIATN faculty.
          </p>

          <div className="hero-trust-badges">
            <div className="trust-badge-item">
              <span className="badge-icon">🏛️</span>
              <span>NSDC &amp; ISO 9001 Accredited</span>
            </div>
            <div className="trust-badge-item">
              <span className="badge-icon">🩺</span>
              <span>Hands-on Clinical Training</span>
            </div>
            <div className="trust-badge-item">
              <span className="badge-icon">📍</span>
              <span>Boat Club Road, Pune</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

