import Image from 'next/image';

export default function AboutIntro() {
  return (
    <section className="about-intro-section" id="about-intro">
      <div className="wrap">
        <div className="about-intro-card">
          <div className="about-intro-grid">
            <div className="about-intro-content">
              <span className="eyebrow">Redefining Aesthetic Education in India</span>
              <h2>Transform Your Passion into a Profession with CIATN.</h2>
              <p className="lead-body">
                CIATN is not just an institute—it’s a launchpad for ambitious cosmetology professionals.
                Our courses are built by industry veterans and delivered through cutting-edge technology
                and real-life clinical training. From foundational diplomas to expert masterclasses,
                we ensure every student walks away confident, skilled, and ready to lead.
              </p>
              <div className="about-intro-actions">
                <a href="/about" className="btn btn-navy">
                  Learn more
                </a>
              </div>
            </div>
            <div className="about-intro-image-wrapper">
              <Image
                src="/about/rg3.jpg"
                alt="CIATN Student Training"
                width={500}
                height={350}
                className="about-intro-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
