import Link from 'next/link';

export default function CoursesClosingCta() {
  return (
    <section className="courses-cta-section" id="courses-cta">
      <div className="wrap">
        <div className="courses-cta-card center">
          <h2>Ready to Begin Your Journey?</h2>
          <p>
            Connect with our admissions advisors to discuss program eligibility, clinical batch schedules, and hands-on training modules.
          </p>

          <div className="courses-cta-actions">
            <Link href="/book-a-demo" className="btn btn-primary">
              Book a Demo
            </Link>
            <Link href="/contact" className="btn btn-outline" style={{ color: 'var(--navy-deep)', borderColor: 'var(--navy)' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
