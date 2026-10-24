import Image from 'next/image';

export default function ContactHero() {
  return (
    <section className="contact-hero">
      <div className="wrap">
        <div className="contact-hero-grid">
          <div className="contact-hero-content">
            <div className="hero-eyebrow">
              <span className="dot"></span>
              <span>CONTACT CIATN</span>
            </div>
            <h1>Let’s Connect and Build Your Future</h1>
            <p className="lead">
              Have questions about our courses or want to take the next step in your aesthetic
              medicine career? Get in touch with the CIATN team.
            </p>
          </div>
          <div className="contact-hero-image-wrapper">
            <Image
              src="/assets/akshaya_jain.webp"
              alt="Dr. Akshaya Jain - CIATN Founder & Director"
              width={600}
              height={400}
              className="contact-hero-img"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
