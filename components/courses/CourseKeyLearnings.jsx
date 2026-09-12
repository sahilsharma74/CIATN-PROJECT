export default function CourseKeyLearnings({ keyLearnings }) {
  if (!keyLearnings || keyLearnings.length === 0) return null;

  return (
    <section className="course-learnings-section">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow">WHAT YOU'LL LEARN</span>
          <h2>Key Learnings</h2>
        </div>

        <div className="learnings-grid">
          {keyLearnings.map((item, idx) => (
            <div className="learning-card" key={idx}>
              <div className="learning-number">0{idx + 1}</div>
              <p className="learning-text">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
