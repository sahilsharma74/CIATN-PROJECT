export default function CourseMeta({ course }) {
  return (
    <div className="course-meta-summary-card">
      <div className="meta-summary-grid">
        <div className="meta-summary-item">
          <span className="meta-summary-label">Category</span>
          <b className="meta-summary-value">{course.category}</b>
        </div>
        <div className="meta-summary-item">
          <span className="meta-summary-label">Duration</span>
          <b className="meta-summary-value">{course.duration}</b>
        </div>
        <div className="meta-summary-item">
          <span className="meta-summary-label">Training Mode</span>
          <b className="meta-summary-value">{course.mode}</b>
        </div>
      </div>
    </div>
  );
}
