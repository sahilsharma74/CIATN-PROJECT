'use client';

import { courseCategories } from '@/data/courses';

export default function CourseCategoryFilter({ activeCategory, onSelectCategory }) {
  return (
    <div className="course-filter-bar">
      <div className="course-filter-inner" role="tablist" aria-label="Course categories">
        {courseCategories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`filter-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
