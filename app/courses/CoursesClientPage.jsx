'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ApprovedBy from '@/components/ApprovedBy';
import Footer from '@/components/Footer';
import CoursesHero from '@/components/courses/CoursesHero';
import CourseCategoryFilter from '@/components/courses/CourseCategoryFilter';
import CourseCard from '@/components/courses/CourseCard';
import CoursesClosingCta from '@/components/courses/CoursesClosingCta';
import { courses } from '@/data/courses';

export default function CoursesClientPage() {
  const [activeCategory, setActiveCategory] = useState('All Courses');

  const filteredCourses =
    activeCategory === 'All Courses'
      ? courses
      : courses.filter(
          (c) =>
            c.categoryGroup === activeCategory ||
            c.category === activeCategory ||
            (activeCategory === 'Masterclasses' && c.category === 'Masterclass') ||
            (activeCategory === 'Fellowships' && c.category === 'Fellowship') ||
            (activeCategory === 'Diplomas' && c.category === 'Diploma') ||
            (activeCategory === 'PG Diplomas' && c.category === 'PG Diploma')
        );

  return (
    <>
      <Header />
      <main>
        <CoursesHero />
        <ApprovedBy />

        <section className="courses-grid-section" id="all-courses">
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow">Curated Curriculum</span>
              <h2>All CIATN Training Programs</h2>
              <p>Filter by course category to find the right program for your clinical career goals.</p>
            </div>

            <CourseCategoryFilter
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />

            <div className="courses-result-count" style={{ marginTop: '24px', marginBottom: '16px', color: 'var(--ink-soft)', fontSize: '14px' }}>
              Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'program' : 'programs'} in <b>{activeCategory}</b>
            </div>

            <div className="courses-grid">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        <CoursesClosingCta />
      </main>
      <Footer />
    </>
  );
}
