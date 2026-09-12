import Link from 'next/link';

export default function CourseEnquiryCta({ course }) {
  const contactHref = course?.slug ? `/contact?course=${course.slug}` : '/contact';

  return (
    <section className="course-enquiry-section">
      <div className="wrap">
        <div className="course-enquiry-card text-center">
          <h2>Ready to Take the Next Step?</h2>
          <p>
            Connect with CIATN to learn more about this course and available
            training options.
          </p>
          <div className="course-enquiry-actions">
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
