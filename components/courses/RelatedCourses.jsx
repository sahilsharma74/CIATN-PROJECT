import CourseCard from './CourseCard';
import { getRelatedCourses } from '@/data/courses';

export default function RelatedCourses({ currentCourse }) {
  const related = getRelatedCourses(currentCourse, 3);

  if (!related || related.length === 0) return null;

  return (
    <section className="related-courses-section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">EXPLORE MORE</span>
          <h2>Related Courses</h2>
          <p>
            Explore additional CIATN training programs in medical cosmetology and
            aesthetic science.
          </p>
        </div>

        <div className="courses-grid">
          {related.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
