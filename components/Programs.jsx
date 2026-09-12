import Link from 'next/link';
import { getFeaturedCourses, courses } from '@/data/courses';

export default function Programs() {
  const featured = getFeaturedCourses();

  // Rapid masterclasses list derived from courses dataset
  const rapidMasterclasses = courses.filter((c) => c.categoryGroup === 'Masterclasses');

  return (
    <section className="programs" id="programs">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Programs &amp; training</span>
          <h2>Explore Our Most Popular Programs</h2>
          <p>
            Our curriculum is designed for real-world success—flexible formats, short-term mastery, and powerful outcomes.
          </p>
        </div>

        <div className="program-grid">
          {featured.map((item) => (
            <div key={item.id} className="program-card">
              <span className="tag">{item.category}</span>
              <h4>{item.title}</h4>
              <p>{item.shortDescription}</p>
              <div className="meta">
                <span>⏱ <b>{item.duration}</b></span>
                <span>📍 <b>{item.mode}</b></span>
              </div>
              <div className="card-cta-row" style={{ marginTop: '18px' }}>
                <Link href={`/courses/${item.slug}`} className="btn btn-outline" style={{ fontSize: '13.5px', padding: '8px 18px' }}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/courses" className="btn btn-primary">
            View All Courses
          </Link>
        </div>

        <div className="rapid-wrap">
          <div className="rapid-head">
            <div>
              <h3>Rapid masterclasses</h3>
              <p>Short, focused certifications for practitioners who want a single procedure skill fast.</p>
            </div>
            <Link href="/contact" className="btn btn-outline">
              Ask about dates
            </Link>
          </div>
          <table className="rapid">
            <thead>
              <tr>
                <th>Masterclass</th>
                <th>Focus &amp; Key Highlights</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {rapidMasterclasses.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.title}</td>
                  <td>{row.keyLearnings ? row.keyLearnings.slice(0, 2).join(', ') : row.shortDescription}</td>
                  <td className="dur">{row.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
