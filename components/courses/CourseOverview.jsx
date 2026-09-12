import CourseMeta from './CourseMeta';

export default function CourseOverview({ course }) {
  return (
    <section className="course-overview-section">
      <div className="wrap">
        <div className="course-overview-grid">
          <div className="course-overview-main">
            <span className="eyebrow">COURSE OVERVIEW</span>
            <h2>Build Practical Expertise</h2>
            <p className="course-overview-text">{course.description}</p>
          </div>

          <div className="course-overview-sidebar">
            <CourseMeta course={course} />
          </div>
        </div>
      </div>
    </section>
  );
}
