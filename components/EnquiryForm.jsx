'use client';

import { useState } from 'react';

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    courseOfInterest: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const coursesList = [
    'Diploma in Clinical Cosmetology',
    'Diploma in Laser Technician',
    'Fellowship in Facial Aesthetics',
    'Advanced Diploma in Trichology',
    'Masterclass in Botox & Fillers',
    'Diploma in Clinical Trichology',
    'Other / General Enquiry',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s\-()]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid phone number';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Client-side validated; ready for future API payload integration
    setSubmitted(true);
  };

  return (
    <section className="enquiry-section" id="enquiry">
      <div className="wrap">
        <div className="enquiry-card">
          <div className="enquiry-head center">
            <span className="eyebrow">Get in touch</span>
            <h2>We’re Here to Help You Begin</h2>
            <p>Have questions? Drop us a message and our team will get back to you shortly.</p>
          </div>

          {submitted ? (
            <div className="enquiry-success center" style={{ padding: '40px 20px' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>✅</div>
              <h3 style={{ marginBottom: '8px' }}>Thank you.</h3>
              <p style={{ fontSize: '16px', color: 'var(--ink)' }}>
                Our admissions team has received your enquiry and will get back to you shortly.
              </p>
              <button
                type="button"
                className="btn btn-outline"
                style={{ marginTop: '20px', color: 'var(--navy-deep)', borderColor: 'var(--navy)' }}
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ fullName: '', email: '', phone: '', courseOfInterest: '', message: '' });
                }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="enquiry-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name*</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    aria-required="true"
                    aria-invalid={!!errors.fullName}
                  />
                  {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone*</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="courseOfInterest">Course of Interest</label>
                  <select
                    id="courseOfInterest"
                    name="courseOfInterest"
                    value={formData.courseOfInterest}
                    onChange={handleChange}
                  >
                    <option value="">Select a program (optional)</option>
                    {coursesList.map((course, idx) => (
                      <option key={idx} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Message*</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your background or questions..."
                    aria-required="true"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>
              </div>

              <div className="form-actions center">
                <button type="submit" className="btn btn-primary" style={{ minWidth: '180px' }}>
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
