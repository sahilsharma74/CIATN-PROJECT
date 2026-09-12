const curriculumCategories = [
  {
    title: 'Clinical foundation',
    items: ['Skin & hair anatomy', 'Cosmetic dermatology principles', 'Patient evaluation'],
  },
  {
    title: 'Procedural expertise',
    items: [
      'Chemical peels',
      'Botox & dermal fillers',
      'Laser treatments',
      'Microneedling & mesotherapy',
      'Body contouring',
    ],
  },
  {
    title: 'Safety & ethics',
    items: ['Medico-legal aspects', 'Complication management', 'Laser safety'],
  },
  {
    title: 'Skill development',
    items: ['Hands-on training', 'Supervised clinical exposure', 'Treatment planning'],
  },
  {
    title: 'Entrepreneurship',
    items: ['Clinic setup guidance', 'Marketing strategies', 'Business development'],
  },
];

export default function Curriculum() {
  return (
    <section className="career" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Curriculum</span>
          <h2>Everything a complete aesthetic professional needs</h2>
          <p>
            The PGDCC curriculum is built in five parts — from clinical foundation through to running your own practice.
          </p>
        </div>
        <div className="curric-grid">
          {curriculumCategories.map((col, idx) => (
            <div key={idx} className="curric-col">
              <h4>{col.title}</h4>
              <ul>
                {col.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
