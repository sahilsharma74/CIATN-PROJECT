import Image from 'next/image';

const focusTags = [
  'Clinical excellence',
  'Personalized guidance',
  'Skintillatingg Clinics',
  '12+ Years experience',
];

export default function Founder() {
  return (
    <section id="founder">
      <div className="wrap founder-grid">
        <div className="founder-photo-wrap">
          <Image
            src="/assets/founder_portrait.jpg"
            alt="Dr. Akshaya Jain, Founder of CIATN Institute"
            width={500}
            height={667}
            style={{ width: '100%', height: 'auto', maxHeight: '560px', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'center 12%', borderRadius: '14px' }}
          />
          <div className="founder-badge">
            <b>12+</b>
            <span>Years of experience</span>
          </div>
        </div>
        <div className="founder-copy">
          <span className="eyebrow">Visionary Leadership That Inspires</span>
          <h2>Dr. Akshaya Jain</h2>
          <span className="role">CIATN Founder · Founder, Skintillatingg Clinics</span>
          <p>
            Dr. Akshaya Jain is one of India’s most recognized names in cosmetic medicine. With 12+ years of experience
            and founder of Skintillatingg Clinics, she brings unmatched passion and innovation to CIATN.
          </p>
          <p>
            Under her leadership, students receive personalized guidance, access to elite networks, and practical wisdom
            from real clinical settings.
          </p>
          <div className="founder-focus" style={{ marginBottom: '24px' }}>
            {focusTags.map((tag, idx) => (
              <span key={idx}>{tag}</span>
            ))}
          </div>
          <div className="founder-actions">
            <a href="/contact" className="btn btn-primary">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
