import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-brand">
              <Image src="/assets/ciatn-logo.png" alt="CIATN logo" width={48} height={48} style={{ height: '44px', width: 'auto', objectFit: 'contain' }} />
              <b>CIATN Institute</b>
            </div>
            <p>
              Chromocosmo Institute of Aesthetics, Trichology &amp; Nutrition — Pune&apos;s leading institute for professional
              cosmetology training.
            </p>
          </div>
          <div>
            <h4>Programs</h4>
            <ul className="flinks">
              <li>
                <a href="/#pgdcc">PGDCC</a>
              </li>
              <li>
                <a href="/#programs">PG Diploma in Trichology</a>
              </li>
              <li>
                <a href="/#programs">Advance diplomas</a>
              </li>
              <li>
                <a href="/#programs">Rapid masterclasses</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Institute</h4>
            <ul className="flinks">
              <li>
                <a href="/#why">Why CIATN</a>
              </li>
              <li>
                <a href="/#recognition">Recognition</a>
              </li>
              <li>
                <a href="/#founder">Founder</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="flinks">
              <li>
                <a href="tel:+918669836365">+91 86698 36365</a>
              </li>
              <li>
                <a href="https://www.ciatn.org" target="_blank" rel="noopener noreferrer">
                  www.ciatn.org
                </a>
              </li>
              <li>
                <a href="/contact">B7 Krishna Apartments, Opp. IDBI Bank, Boat Club Road, Pune 411011</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 CIATN Institute. All rights reserved.</span>
          <span>Chromocosmo Institute of Aesthetics, Trichology &amp; Nutrition</span>
        </div>
      </div>
    </footer>
  );
}
