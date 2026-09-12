import Counter from './Counter';

export default function Stats() {
  const statsData = [
    { number: '3,500+', label: 'Certified Graduates' },
    { number: '98%', label: 'Placement Success' },
    { number: '12+', label: 'Clinical Programs' },
    { number: '50+', label: 'Expert Faculty & Trainers' },
    { number: '10+', label: 'Years on Market' },
    { number: '40+', label: 'Projects Completed' },
  ];

  return (
    <section className="stats-section" id="stats">
      <div className="wrap">
        <div className="stats-grid">
          {statsData.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-number">
                <Counter value={stat.number} />
              </span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
