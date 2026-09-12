import { aboutVisionData } from '@/data/about';

export default function Vision() {
  return (
    <section className="about-vision-section" id="vision">
      <div className="wrap">
        <div className="vision-card">
          <span className="eyebrow">{aboutVisionData.eyebrow}</span>
          <h2>{aboutVisionData.heading}</h2>
          <p className="vision-body">{aboutVisionData.body}</p>
        </div>
      </div>
    </section>
  );
}
