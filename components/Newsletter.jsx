'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!consent) {
      setError('Please confirm your subscription consent.');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <section className="newsletter-section" id="newsletter">
      <div className="wrap">
        <div className="newsletter-card center">
          <h2>Subscribe to our newsletter</h2>
          <p>Get the latest updates on upcoming clinical batches, workshop dates, and aesthetic medicine insights.</p>

          {submitted ? (
            <div className="newsletter-success" style={{ marginTop: '20px', color: 'var(--saffron-deep)', fontWeight: '600' }}>
              ✓ Thank you. Email subscription preferences recorded.
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="newsletter-form">
              <div className="newsletter-input-wrap">
                <input
                  type="email"
                  placeholder="Email*"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  aria-required="true"
                />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </div>

              <div className="newsletter-checkbox-wrap">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (error) setError('');
                    }}
                  />
                  <span>Yes, subscribe me to our newsletter.*</span>
                </label>
              </div>

              {error && <p className="error-text center" style={{ marginTop: '10px' }}>{error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
