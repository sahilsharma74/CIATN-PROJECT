import Image from 'next/image';

const recognitionPoints = [
  'National-level government credibility',
  'Alignment with national skill standards',
  'Strong institutional trust & authority',
  'Industry-recognised training quality',
  'Clinical excellence in cosmetic medicine',
  'Enhanced student career value',
];

export default function Recognition() {
  return (
    <section className="recognition-section" id="recognition">
      <div className="wrap rec-grid">
        <div>
          <span className="rec-badge">National recognition · 2026</span>
          <h2>Honoured as &quot;Leader in Aesthetic Medicine &amp; Skill Development&quot;</h2>
          <p className="rec-quote">
            Presented to Dr. Akshaya Jain by Hon. Union Minister Shri Nitin Gadkari at Advantage Vidarbha 2026, in
            recognition of her leadership and contribution to aesthetic medicine.
          </p>
          <p className="body">
            This national honour reflects CIATN&apos;s structured, standardised approach to aesthetic education and its
            alignment with government skill-development initiatives.
          </p>
          <ul className="rec-list">
            {recognitionPoints.map((pt, idx) => (
              <li key={idx}>{pt}</li>
            ))}
          </ul>
        </div>
        <div className="rec-photo">
          <Image
            src="/assets/nitin.jpeg"
            alt="Hon. Union Minister Shri Nitin Gadkari presenting award to Dr. Akshaya Jain"
            width={600}
            height={420}
            style={{ width: '100%', height: '420px', objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  );
}
