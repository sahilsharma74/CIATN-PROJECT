import { aboutAdvantageItems } from '@/data/about';

export default function CiatnAdvantage() {
  return (
    <section className="about-advantage-section" id="advantage">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow">Why Study With Us</span>
          <h2>The CIATN Advantage</h2>
          <p>Key pillars that set our clinical cosmetology and trichology training apart.</p>
        </div>

        <div className="advantage-grid">
          {aboutAdvantageItems.map((item, idx) => (
            <div key={idx} className="advantage-card">
              <div className="advantage-number">0{idx + 1}</div>
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
