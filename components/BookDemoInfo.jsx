import Link from 'next/link';

export default function BookDemoInfo() {
  const points = [
    {
      title: 'Personalized Course Guidance',
      description: 'Get tailored recommendations matching your medical background (MBBS, BDS, BAMS, BHMS) or aesthetic experience.',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      title: 'Explore Flexible Learning Formats',
      description: 'Discover how our hybrid online modules, intensive hands-on clinicals, and weekend batches fit your practice.',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      title: 'Live Patient & Clinical Exposure',
      description: 'Learn about real patient procedures, equipment operation, and practical mentorship under Dr. Akshaya Jain.',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
    {
      title: 'Clear Certification & Fee Doubts',
      description: 'Get answers regarding government recognitions (NSDC, ISO 9001:2015), certification paths, and installment options.',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="book-demo-info">
      <div className="info-card">
        <div className="info-header-badge">WHY CHOOSE CIATN</div>
        <h2 className="info-title">Why Book a Demo?</h2>

        <ul className="info-points-list">
          {points.map((point, index) => (
            <li key={index} className="info-point-item">
              <div className="info-icon-box" aria-hidden="true">
                {point.icon}
              </div>
              <div className="info-point-content">
                <h3 className="info-point-heading">{point.title}</h3>
                <p className="info-point-desc">{point.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Card */}
      <div className="info-cta-card">
        <span className="cta-card-badge">DIRECT COUNSELING</span>
        <h3 className="cta-card-heading">Not sure which program is right for you?</h3>
        <p className="cta-card-desc">
          Speak directly with the CIATN admissions team to evaluate your profile and goals.
        </p>
        <Link href="/contact" className="btn cta-card-btn cta-card-btn-secondary">
          <span>Contact Admissions</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </aside>
  );
}
