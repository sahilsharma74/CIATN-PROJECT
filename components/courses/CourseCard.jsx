import Link from 'next/link';

export default function CourseCard({ course }) {
  return (
    <div className="course-card">
      <div className="course-card-top">
        <span className="course-badge">{course.category}</span>
        <div className="course-meta">
          <span className="meta-item">⏱ {course.duration}</span>
          <span className="meta-item">📍 {course.mode}</span>
        </div>
      </div>

      <h3 className="course-card-title">{course.title}</h3>

      <p className="course-card-desc">{course.shortDescription}</p>

      {course.keyLearnings && course.keyLearnings.length > 0 && (
        <div className="course-learnings">
          <span className="learnings-label">Key Highlights:</span>
          <ul>
            {course.keyLearnings.slice(0, 3).map((item, idx) => (
              <li key={idx}>✓ {item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="course-card-footer">
        <Link href={`/courses/${course.slug}`} className="btn btn-outline" style={{ width: '100%', textAlign: 'center' }}>
          View Course
        </Link>
      </div>
    </div>
  );
}
