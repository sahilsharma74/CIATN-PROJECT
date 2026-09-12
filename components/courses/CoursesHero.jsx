import Image from 'next/image';

export default function CoursesHero() {
  return (
    <section className="courses-hero hero" style={{ paddingBottom: '60px' }}>
      <div className="wrap">
        <div className="courses-hero-grid">
          <div className="courses-hero-text">
            <span className="hero-eyebrow">
              <span className="dot"></span>
              CIATN COURSES
            </span>
            <h1 style={{ maxWidth: '16ch', marginTop: '12px' }}>Explore Our Courses</h1>
            <p className="lead" style={{ maxWidth: '64ch', marginTop: '20px' }}>
              Build practical expertise in aesthetic medicine, clinical cosmetology, trichology, laser technology, and advanced aesthetic procedures through expert-led training.
            </p>
          </div>
          <div className="courses-hero-image-wrapper">
            <Image
              src="/courses/raw.jpeg"
              alt="CIATN Clinical Course Training"
              width={600}
              height={400}
              className="courses-hero-img"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
