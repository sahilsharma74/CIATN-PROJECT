import Image from 'next/image';

const careerPills = [
  'Aesthetic clinics',
  'Dermatology centres',
  'Hair restoration clinics',
  'Wellness centres',
  'Medical spas',
  'Independent practice',
];

export default function Career() {
  return (
    <section className="career">
      <div className="wrap career-grid">
        <div className="career-copy">
          <span className="eyebrow">Career progress</span>
          <h2>Where a CIATN qualification can take you</h2>
          <p>
            Health, wellness and aesthetic training are in high demand. CIATN&apos;s curriculum, hands-on equipment access and
            mentorship are built to carry graduates into real clinical roles or independent practice.
          </p>
          <p>
            With strong industry connections and world-class mentorship, students leave equipped to become sought-after
            aesthetic specialists, renowned cosmetic physicians, or confident clinic owners.
          </p>
          <div className="career-pill-row">
            {careerPills.map((pill, idx) => (
              <span key={idx} className="career-pill">
                {pill}
              </span>
            ))}
          </div>
        </div>
        <div className="career-photo">
          <Image
            src="/assets/pgdc.webp"
            alt="CIATN graduating cohort"
            width={500}
            height={340}
            style={{ width: '100%', height: '340px', objectFit: 'cover', borderRadius: '14px' }}
          />
        </div>
      </div>
    </section>
  );
}
