/**
 * CIATN Institute - Course Data Schema & Architecture
 * Contains all 14 official live CIATN courses, categories, and key learnings.
 */

export const courses = [
  // 1. Masterclass in Botox and Fillers
  {
    id: 'masterclass-in-botox-and-fillers',
    title: 'Masterclass in Botox and Fillers',
    slug: 'masterclass-in-botox-and-fillers',
    category: 'Masterclass',
    categoryGroup: 'Masterclasses',
    duration: '15 Days',
    mode: 'Online & Campus Available',
    shortDescription:
      'Gain a strong foundation in botulinum toxin and filler techniques for facial rejuvenation. Learn assessment, injection mapping, and complication management.',
    description:
      'Gain a strong foundation in botulinum toxin and filler techniques for facial rejuvenation. Learn assessment, injection mapping, and complication management.',
    keyLearnings: [
      'Botox injection zones',
      'Filler types & application',
      'Patient assessment & facial zones',
      'Result prediction and enhancement',
      'Adverse effect management',
    ],
    isFeatured: true,
  },
  // 2. Masterclass in Chemical Peels
  {
    id: 'masterclass-in-chemical-peels',
    title: 'Masterclass in Chemical Peels',
    slug: 'masterclass-in-chemical-peels',
    category: 'Masterclass',
    categoryGroup: 'Masterclasses',
    duration: '8 Days',
    mode: 'Online & Campus Available',
    shortDescription:
      'Master the use of superficial to medium-depth peels for treating acne, hyperpigmentation, and signs of aging.',
    description:
      'Master the use of superficial to medium-depth peels for treating acne, hyperpigmentation, and signs of aging.',
    keyLearnings: [
      'Types of chemical peels',
      'Pre-peel skin prep',
      'Post-treatment care',
      'Layering techniques',
      'Treatment protocols for skin types',
    ],
    isFeatured: false,
  },
  // 3. Masterclass in Thread Lift
  {
    id: 'masterclass-in-thread-lift',
    title: 'Masterclass in Thread Lift',
    slug: 'masterclass-in-thread-lift',
    category: 'Masterclass',
    categoryGroup: 'Masterclasses',
    duration: '8 Days',
    mode: 'Online & Campus Available',
    shortDescription:
      'Deep-dive into the world of non-surgical facelifts. This course covers lifting vectors, PDO threads, and client selection for optimal results.',
    description:
      'Deep-dive into the world of non-surgical facelifts. This course covers lifting vectors, PDO threads, and client selection for optimal results.',
    keyLearnings: [
      'Types of threads and indications',
      'Lifting technique and anchor zones',
      'Thread depth, safety & angles',
      'Contraindications and complications',
      'Maintenance and re-treatment',
    ],
    isFeatured: false,
  },
  // 4. Masterclass in Mesotherapy & PRP
  {
    id: 'masterclass-in-mesotherapy-prp',
    title: 'Masterclass in Mesotherapy & PRP',
    slug: 'masterclass-in-mesotherapy-prp',
    category: 'Masterclass',
    categoryGroup: 'Masterclasses',
    duration: '8 Days',
    mode: 'Online & Campus Available',
    shortDescription:
      'Learn regenerative skin and scalp therapies using PRP and meso-cocktails. Includes clinical protocols, product selection, and safety precautions.',
    description:
      'Learn regenerative skin and scalp therapies using PRP and meso-cocktails. Includes clinical protocols, product selection, and safety precautions.',
    keyLearnings: [
      'Mesotherapy techniques (face & scalp)',
      'PRP preparation and usage',
      'Injection zones and depths',
      'Results tracking and timelines',
      'Sterilization and patient aftercare',
    ],
    isFeatured: false,
  },
  // 5. Masterclass in Laser Hair Reduction
  {
    id: 'masterclass-in-laser-hair-reduction',
    title: 'Masterclass in Laser Hair Reduction',
    slug: 'masterclass-in-laser-hair-reduction',
    category: 'Masterclass',
    categoryGroup: 'Masterclasses',
    duration: '8 Days',
    mode: 'Online & Campus Available',
    shortDescription:
      'Specialized masterclass focused on laser technologies and techniques for safe, efficient hair reduction services. Ideal for those upgrading from basic aesthetics.',
    description:
      'Specialized masterclass focused on laser technologies and techniques for safe, efficient hair reduction services. Ideal for those upgrading from basic aesthetics.',
    keyLearnings: [
      'Laser technology overview',
      'Skin and hair mapping',
      'Client assessment & patch testing',
      'Laser parameters & settings',
      'Aftercare and side effect management',
    ],
    isFeatured: false,
  },
  // 6. Fellowship in Medical Cosmetology
  {
    id: 'fellowship-in-medical-cosmetology',
    title: 'Fellowship in Medical Cosmetology',
    slug: 'fellowship-in-medical-cosmetology',
    category: 'Fellowship',
    categoryGroup: 'Fellowships',
    duration: '1–3 Months',
    mode: 'Online & Campus Available',
    shortDescription:
      'A robust program that blends medical science and cosmetic practice. Great for professionals aiming to expand services to include dermatologic aesthetics.',
    description:
      'A robust program that blends medical science and cosmetic practice. Great for professionals aiming to expand services to include dermatologic aesthetics.',
    keyLearnings: [
      'Cosmetic diagnosis & consultation',
      'Anti-aging & pigmentation treatments',
      'Advanced peels and serums',
      'Integrative nutrition & wellness',
      'Equipment-based therapy usage',
    ],
    isFeatured: false,
  },
  // 7. Fellowship in Facial Aesthetics & Clinical Cosmetology
  {
    id: 'fellowship-in-facial-aesthetics-clinical-cosmetology',
    title: 'Fellowship in Facial Aesthetics & Clinical Cosmetology',
    slug: 'fellowship-in-facial-aesthetics-clinical-cosmetology',
    category: 'Fellowship',
    categoryGroup: 'Fellowships',
    duration: '1 Month',
    mode: 'Online & Campus Available',
    shortDescription:
      'An advanced fellowship for practitioners aiming to master facial aesthetic procedures. Includes training in injectables, anti-aging techniques, and patient communication.',
    description:
      'An advanced fellowship for practitioners aiming to master facial aesthetic procedures. Includes training in injectables, anti-aging techniques, and patient communication.',
    keyLearnings: [
      'Filler injection techniques',
      'Botox applications and zones',
      'Aesthetic assessment and symmetry',
      'Non-surgical rejuvenation',
      'Treatment planning and safety',
    ],
    isFeatured: true,
  },
  // 8. Diploma in Laser Technicians
  {
    id: 'diploma-in-laser-technicians',
    title: 'Diploma in Laser Technicians',
    slug: 'diploma-in-laser-technicians',
    category: 'Diploma',
    categoryGroup: 'Diplomas',
    duration: '3 Months',
    mode: 'Online & Campus Available',
    shortDescription:
      'Hands-on course focused on training in laser-based skin and hair treatments. Learn device usage, treatment safety, and client handling through guided practice with real equipment.',
    description:
      'Hands-on course focused on training in laser-based skin and hair treatments. Learn device usage, treatment safety, and client handling through guided practice with real equipment.',
    keyLearnings: [
      'Laser physics and skin interaction',
      'Hair removal techniques',
      'Pigmentation and vascular treatments',
      'Pre- and post-treatment care',
      'Skin typing and contraindications',
    ],
    isFeatured: true,
  },
  // 9. Diploma in Clinical Trichology
  {
    id: 'diploma-in-clinical-trichology',
    title: 'Diploma in Clinical Trichology',
    slug: 'diploma-in-clinical-trichology',
    category: 'Diploma',
    categoryGroup: 'Diplomas',
    duration: '3 Months',
    mode: 'Online & Campus Available',
    shortDescription:
      'This diploma gives a balanced understanding of hair science and trichological solutions through live demonstrations and instructor-led classroom sessions.',
    description:
      'This diploma gives a balanced understanding of hair science and trichological solutions through live demonstrations and instructor-led classroom sessions.',
    keyLearnings: [
      'Hair cycle and disorders',
      'Scalp diagnostics',
      'Natural & chemical-based treatments',
      'Counseling and result tracking',
      'Growth boosters and support therapies',
    ],
    isFeatured: true,
  },
  // 10. Diploma in Clinical Cosmetology
  {
    id: 'diploma-in-clinical-cosmetology',
    title: 'Diploma in Clinical Cosmetology',
    slug: 'diploma-in-clinical-cosmetology',
    category: 'Diploma',
    categoryGroup: 'Diplomas',
    duration: '3 Months',
    mode: 'Online & Campus Available',
    shortDescription:
      'Perfect for new entrants into the aesthetics field, this diploma provides practical skills and foundational cosmetic dermatology techniques. Great for dermatology assistants and aspiring skin therapists.',
    description:
      'Perfect for new entrants into the aesthetics field, this diploma provides practical skills and foundational cosmetic dermatology techniques. Great for dermatology assistants and aspiring skin therapists.',
    keyLearnings: [
      'Skin evaluation techniques',
      'Facial & body treatments',
      'Anti-aging protocols',
      'Peel application and aftercare',
      'Cosmetic procedure prep & sterilization',
    ],
    isFeatured: true,
  },
  // 11. Advanced Diploma in Trichology
  {
    id: 'advanced-diploma-in-trichology',
    title: 'Advanced Diploma in Trichology',
    slug: 'advanced-diploma-in-trichology',
    category: 'Diploma',
    categoryGroup: 'Diplomas',
    duration: '3 Weeks',
    mode: 'Online & Campus Available',
    shortDescription:
      'A fast-track program that covers all foundational and advanced trichology practices. Learn how to treat scalp and hair concerns with a strong understanding of biology and patient care.',
    description:
      'A fast-track program that covers all foundational and advanced trichology practices. Learn how to treat scalp and hair concerns with a strong understanding of biology and patient care.',
    keyLearnings: [
      'Hair and scalp anatomy',
      'Tricho-diagnostics and client evaluation',
      'Treatment protocols for dandruff, alopecia',
      'Laser combs and therapeutic light',
      'Consultation strategies',
    ],
    isFeatured: true,
  },
  // 12. Advanced Diploma in Cosmetology
  {
    id: 'advanced-diploma-in-cosmetology',
    title: 'Advanced Diploma in Cosmetology',
    slug: 'advanced-diploma-in-cosmetology',
    category: 'Diploma',
    categoryGroup: 'Diplomas',
    duration: '3 Months',
    mode: 'Online & Campus Available',
    shortDescription:
      'Designed for beginners and intermediate learners, this course covers the science and practice of advanced cosmetology. It includes hands-on training with real clients under expert supervision, covering both face and body treatments.',
    description:
      'Designed for beginners and intermediate learners, this course covers the science and practice of advanced cosmetology. It includes hands-on training with real clients under expert supervision, covering both face and body treatments.',
    keyLearnings: [
      'Advanced skin and facial therapies',
      'Electrology and electrotherapy',
      'Cosmetic dermatology principles',
      'Salon-grade equipment handling',
      'Skin rejuvenation and exfoliation',
    ],
    isFeatured: false,
  },
  // 13. PG Diploma in Trichology (PGDT)
  {
    id: 'pg-diploma-in-trichology',
    title: 'PG Diploma in Trichology (PGDT)',
    slug: 'pg-diploma-in-trichology',
    category: 'PG Diploma',
    categoryGroup: 'PG Diplomas',
    duration: '3 Months',
    mode: 'Online & Campus Available',
    shortDescription:
      'Gain specialized knowledge in the diagnosis and treatment of hair and scalp conditions through our intensive PGDT course. Perfect for dermatologists, cosmetologists, or professionals expanding into hair care and restoration services.',
    description:
      'Gain specialized knowledge in the diagnosis and treatment of hair and scalp conditions through our intensive PGDT course. Perfect for dermatologists, cosmetologists, or professionals expanding into hair care and restoration services.',
    keyLearnings: [
      'Hair loss types and treatment protocols',
      'PRP and mesotherapy for scalp',
      'Trichoscopy and scalp analysis',
      'Non-surgical hair restoration techniques',
      'Hair product formulations',
    ],
    isFeatured: false,
  },
  // 14. PG Diploma in Clinical Cosmetology (PGDCC)
  {
    id: 'pg-diploma-in-clinical-cosmetology',
    title: 'PG Diploma in Clinical Cosmetology (PGDCC)',
    slug: 'pg-diploma-in-clinical-cosmetology',
    category: 'PG Diploma',
    categoryGroup: 'PG Diplomas',
    duration: '3 Months',
    mode: 'Online & Campus Available',
    shortDescription:
      'This comprehensive program is designed for medical professionals who want to excel in the field of clinical cosmetology. The course provides an in-depth understanding of advanced cosmetic procedures, skin science, and facial aesthetics. Learn from experienced doctors and gain real-world practice through clinical exposure. Ideal for building or expanding your cosmetic clinic practice.',
    description:
      'This comprehensive program is designed for medical professionals who want to excel in the field of clinical cosmetology. The course provides an in-depth understanding of advanced cosmetic procedures, skin science, and facial aesthetics. Learn from experienced doctors and gain real-world practice through clinical exposure. Ideal for building or expanding your cosmetic clinic practice.',
    keyLearnings: [
      'Botox and filler techniques',
      'Chemical peels and mesotherapy',
      'Laser and light-based therapies',
      'Facial analysis and skin types',
      'Clinical safety and hygiene',
    ],
    isFeatured: false,
  },
];

export const courseCategories = [
  'All Courses',
  'Masterclasses',
  'Fellowships',
  'Diplomas',
  'PG Diplomas',
];

export function getCourseBySlug(slug) {
  if (slug === 'pgdcc') {
    return (
      courses.find((c) => c.slug === 'pg-diploma-in-clinical-cosmetology') ||
      courses.find((c) => c.slug === 'diploma-in-clinical-cosmetology')
    );
  }
  return courses.find((c) => c.slug === slug) || null;
}

export function getFeaturedCourses() {
  return courses.filter((c) => c.isFeatured);
}

export function getAllCourseSlugs() {
  return courses.map((c) => c.slug);
}

export function getRelatedCourses(currentCourse, limit = 3) {
  if (!currentCourse) return [];
  // First match exact category or categoryGroup
  let matches = courses.filter(
    (c) =>
      c.slug !== currentCourse.slug &&
      (c.category === currentCourse.category ||
        c.categoryGroup === currentCourse.categoryGroup)
  );

  // If fewer than limit, fill with other courses
  if (matches.length < limit) {
    const remaining = courses.filter(
      (c) => c.slug !== currentCourse.slug && !matches.some((m) => m.slug === c.slug)
    );
    matches = [...matches, ...remaining];
  }

  return matches.slice(0, limit);
}
