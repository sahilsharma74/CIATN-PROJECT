import Link from 'next/link';

export default function CourseDetailHero({ course }) {
  const contactHref = course?.slug ? `/contact?course=${course.slug}` : '/contact';

  return (
    <section className="course-detail-hero">
      <div className="wrap">
        <div className="course-detail-hero-content">
          <div className="hero-eyebrow">
            <span className="dot"></span>
            <span>{course.category}</span>
          </div>

          <h1 className="course-detail-title">{course.title}</h1>

          <div className="course-detail-meta-pills">
            <span className="meta-pill">⏱ {course.duration}</span>
            <span className="meta-pill">📍 {course.mode}</span>
          </div>

          <p className="course-detail-description">{course.description}</p>

          <div className="course-detail-actions">
            <Link href="/book-a-demo" className="btn btn-primary">
              Book a Demo
            </Link>
            <Link href={contactHref} className="btn btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
