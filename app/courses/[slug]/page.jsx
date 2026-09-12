import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCourseBySlug, getAllCourseSlugs } from '@/data/courses';
import CourseDetailHero from '@/components/courses/CourseDetailHero';
import CourseOverview from '@/components/courses/CourseOverview';
import CourseKeyLearnings from '@/components/courses/CourseKeyLearnings';
import RelatedCourses from '@/components/courses/RelatedCourses';
import CourseEnquiryCta from '@/components/courses/CourseEnquiryCta';

export async function generateStaticParams() {
  const slugs = getAllCourseSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      title: 'Course Not Found | CIATN Institute',
      description: 'The requested CIATN course could not be found.',
    };
  }

  return {
    title: `${course.title} | CIATN`,
    description: course.description,
    openGraph: {
      title: `${course.title} | CIATN Institute`,
      description: course.description,
      type: 'website',
    },
  };
}

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <main className="course-detail-page">
      {/* Accessible Breadcrumbs */}
      <div className="breadcrumb-bar">
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="breadcrumbs">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-hidden="true" className="separator">
                /
              </li>
              <li>
                <Link href="/courses">Courses</Link>
              </li>
              <li aria-hidden="true" className="separator">
                /
              </li>
              <li aria-current="page" className="current">
                {course.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <CourseDetailHero course={course} />

      {/* Overview & Meta Section */}
      <CourseOverview course={course} />

      {/* Key Learnings Section */}
      <CourseKeyLearnings keyLearnings={course.keyLearnings} />

      {/* Related Courses Section */}
      <RelatedCourses currentCourse={course} />

      {/* Enquiry CTA Section */}
      <CourseEnquiryCta course={course} />
    </main>
  );
}
