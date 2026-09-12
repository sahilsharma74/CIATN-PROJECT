export default function ContactInfo() {
  return (
    <div className="contact-info-wrap">
      <div className="contact-info-head">
        <span className="eyebrow">REACH OUT TO US</span>
        <h2>Contact Information</h2>
        <p>
          Connect with our admissions team or visit our Pune campus for course details,
          counseling, and campus tours.
        </p>
      </div>

      <div className="contact-info-cards">
        {/* Phone Card */}
        <div className="contact-card">
          <div className="contact-card-icon" aria-hidden="true">
            📞
          </div>
          <div className="contact-card-content">
            <span className="contact-card-label">Phone</span>
            <a
              href="tel:+918669836365"
              className="contact-card-link"
              aria-label="Call CIATN at +91 8669836365"
            >
              +91 8669836365
            </a>
            <span className="contact-card-sub">Mon – Sat, 9:00 AM – 7:00 PM</span>
          </div>
        </div>

        {/* Email Card */}
        <div className="contact-card">
          <div className="contact-card-icon" aria-hidden="true">
            ✉️
          </div>
          <div className="contact-card-content">
            <span className="contact-card-label">Email</span>
            <a
              href="mailto:ciatninstitute@gmail.com"
              className="contact-card-link"
              aria-label="Email CIATN at ciatninstitute@gmail.com"
            >
              ciatninstitute@gmail.com
            </a>
            <span className="contact-card-sub">General & Admissions Inquiries</span>
          </div>
        </div>

        {/* Address Card */}
        <div className="contact-card">
          <div className="contact-card-icon" aria-hidden="true">
            📍
          </div>
          <div className="contact-card-content">
            <span className="contact-card-label">Campus Address</span>
            <address className="contact-card-address">
              B7 Krishna Apartments, Opposite IDBI Bank, Boat Club Road, Pune – 411011,
              Maharashtra, India
            </address>
          </div>
        </div>
      </div>
    </div>
  );
}
