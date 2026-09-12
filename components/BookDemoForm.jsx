'use client';

import { useState } from 'react';
import DatePicker from './DatePicker';

export default function BookDemoForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: 'Post Graduate Diploma in Clinical Cosmetology (PGDCC)',
    learningMode: 'Hands-on Clinical Demo (In-Person Pune Center)',
    preferredDate: '',
    timeSlot: '10:00 AM',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const timeSlots = [
    '10:00 AM',
    '11:30 AM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:30 PM',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = 'Valid phone number is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="book-demo-card demo-success-card">
        <div className="success-icon-badge">✓</div>
        <span className="demo-pill-eyebrow">DEMO CONFIRMED</span>
        <h3 className="demo-main-title" style={{ marginTop: '12px', fontSize: '28px' }}>
          Demo Request Submitted!
        </h3>
        <p className="demo-main-subtitle" style={{ marginBottom: '24px' }}>
          Thank you, <strong>{formData.fullName}</strong>. Our admissions counselor will contact you shortly to confirm your session.
        </p>
        <div className="success-summary-box">
          <p><strong>Course:</strong> {formData.course}</p>
          <p><strong>Learning Mode:</strong> {formData.learningMode}</p>
          <p><strong>Preferred Date:</strong> {formData.preferredDate || 'To be scheduled'}</p>
          <p><strong>Time Slot:</strong> {formData.timeSlot}</p>
        </div>
        <button onClick={() => setSubmitted(false)} className="btn-request-demo">
          Book Another Demo
        </button>
      </div>
    );
  }

  return (
    <div className="book-demo-card">
      {/* CARD HEADER */}
      <div className="card-top-header">
        <span className="demo-pill-eyebrow">
          <span className="eyebrow-dot"></span> CAMPUS &amp; ONLINE DEMOS
        </span>
        <h2 className="demo-main-title">Book Your Personalized Demo</h2>
        <p className="demo-main-subtitle">
          Experience CIATN's curriculum, ask academic advisors questions, and preview our training model.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="exact-demo-form">
        {/* STEP 01 */}
        <div className="exact-step-section">
          <div className="exact-step-header">
            <span className="exact-step-num">01</span>
            <h3 className="exact-step-title">PERSONAL DETAILS</h3>
          </div>

          <div className="exact-fields-stack">
            <div className="exact-form-group">
              <label htmlFor="fullName">
                Full Name <span className="req-star">*</span>
              </label>
              <div className="exact-input-wrap">
                <span className="exact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Dr. Rohan Sharma"
                  className={`exact-input ${errors.fullName ? 'has-error' : ''}`}
                />
              </div>
              {errors.fullName && <span className="exact-error">{errors.fullName}</span>}
            </div>

            <div className="exact-form-group">
              <label htmlFor="email">
                Email Address <span className="req-star">*</span>
              </label>
              <div className="exact-input-wrap">
                <span className="exact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="doctor@example.com"
                  className={`exact-input ${errors.email ? 'has-error' : ''}`}
                />
              </div>
              {errors.email && <span className="exact-error">{errors.email}</span>}
            </div>

            <div className="exact-form-group">
              <label htmlFor="phone">
                Phone Number <span className="req-star">*</span>
              </label>
              <div className="exact-input-wrap">
                <span className="exact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={`exact-input ${errors.phone ? 'has-error' : ''}`}
                />
              </div>
              {errors.phone && <span className="exact-error">{errors.phone}</span>}
            </div>
          </div>
        </div>

        {/* STEP 02 */}
        <div className="exact-step-section">
          <div className="exact-step-header">
            <span className="exact-step-num">02</span>
            <h3 className="exact-step-title">PROGRAM PREFERENCE</h3>
          </div>

          <div className="exact-fields-stack">
            <div className="exact-form-group">
              <label htmlFor="course">
                Course of Interest <span className="req-star">*</span>
              </label>
              <div className="exact-input-wrap">
                <span className="exact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </span>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="exact-select"
                >
                  <option value="Post Graduate Diploma in Clinical Cosmetology (PGDCC)">
                    Post Graduate Diploma in Clinical Cosmetology (PGDCC)
                  </option>
                  <option value="Post Graduate Diploma in Aesthetic Medicine (PGDAM)">
                    Post Graduate Diploma in Aesthetic Medicine (PGDAM)
                  </option>
                  <option value="Post Graduate Diploma in Clinical Trichology (PGDAT)">
                    Post Graduate Diploma in Clinical Trichology (PGDAT)
                  </option>
                  <option value="Post Graduate Diploma in Clinical Facial Aesthetics (PGDCFA)">
                    Post Graduate Diploma in Clinical Facial Aesthetics (PGDCFA)
                  </option>
                  <option value="Master Course in Facial Injectables (Botox & Fillers)">
                    Master Course in Facial Injectables (Botox &amp; Fillers)
                  </option>
                  <option value="Certificate Course in Laser & Energy-Based Devices">
                    Certificate Course in Laser &amp; Energy-Based Devices
                  </option>
                  <option value="Other / General Counseling">
                    Other / General Counseling
                  </option>
                </select>
              </div>
            </div>

            <div className="exact-form-group">
              <label htmlFor="learningMode">Preferred Learning Mode</label>
              <div className="exact-input-wrap">
                <span className="exact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </span>
                <select
                  id="learningMode"
                  name="learningMode"
                  value={formData.learningMode}
                  onChange={handleChange}
                  className="exact-select"
                >
                  <option value="Hands-on Clinical Demo (In-Person Pune Center)">
                    In-Person Center Tour &amp; Hands-On Demo (Pune)
                  </option>
                  <option value="Virtual 1-on-1 Academic Counseling">
                    Virtual 1-on-1 Academic Counseling (Zoom / Meet)
                  </option>
                  <option value="Center Tour & Live Procedure Inspection">
                    Live Patient Procedure Inspection &amp; Faculty Meeting
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 03 */}
        <div className="exact-step-section">
          <div className="exact-step-header">
            <span className="exact-step-num">03</span>
            <h3 className="exact-step-title">PREFERRED SCHEDULE &amp; QUESTIONS</h3>
          </div>

          <div className="exact-fields-stack">
            <div className="exact-form-group">
              <label>Preferred Date</label>
              <DatePicker
                value={formData.preferredDate}
                onChange={(dateStr) => setFormData((prev) => ({ ...prev, preferredDate: dateStr }))}
                placeholder="Select a preferred demo date"
              />
            </div>

            <div className="exact-form-group">
              <label>Preferred Time Slot</label>
              <div className="time-slots-grid">
                {timeSlots.map((slot) => {
                  const isSelected = formData.timeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, timeSlot: slot }))}
                      className={`time-slot-pill ${isSelected ? 'is-selected' : ''}`}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{slot}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="exact-form-group">
              <label htmlFor="message">
                Message <span className="req-star">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your background, career goals, or any specific questions you have..."
                className="exact-textarea"
              />
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON & PRIVACY NOTICE */}
        <div className="form-submit-block">
          <button type="submit" disabled={loading} className="btn-request-demo">
            <span>{loading ? 'Submitting Request...' : 'Request Demo Session'}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
          <div className="privacy-reassurance">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Privacy assured. No spam or unsolicited calls.</span>
          </div>
        </div>
      </form>
    </div>
  );
}
