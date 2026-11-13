'use client';

import { useState, useEffect } from 'react';
import { courses } from '@/data/courses';

const CIATN_WHATSAPP_NUMBER = '918669836365';
const STORAGE_KEY = 'ciatn_lead_popup_dismissed';
const INITIAL_DELAY_MS = 12000; // 12 seconds on first landing
const REPEAT_COOLDOWN_MS = 4 * 60 * 1000; // 4 minutes cooldown if closed without submitting

export default function LeadEnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('IDLE'); // 'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'
  const [errorMessage, setErrorMessage] = useState('');
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');

  useEffect(() => {
    // Check if dismissed recently or already converted
    const lastDismissed = localStorage.getItem(STORAGE_KEY);
    if (lastDismissed) {
      if (lastDismissed === 'CONVERTED') {
        return; // Don't show again if already enquired
      }
      const elapsed = Date.now() - parseInt(lastDismissed, 10);
      if (elapsed < REPEAT_COOLDOWN_MS) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, REPEAT_COOLDOWN_MS - elapsed);
        return () => clearTimeout(timer);
      }
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, INITIAL_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (status !== 'SUCCESS') {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (status === 'ERROR') {
      setStatus('IDLE');
      setErrorMessage('');
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s\-()]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid phone number';
    }
    if (!formData.course) newErrors.course = 'Please select a course';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('SUBMITTING');
    setErrorMessage('');

    try {
      const selectedCourseObj = courses.find((c) => c.slug === formData.course);
      const courseTitle = selectedCourseObj ? selectedCourseObj.title : formData.course;

      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        course: courseTitle,
        message: formData.message.trim() || 'Enquiry submitted via Quick Lead Popup',
      };

        // Best-effort background persistence to Supabase and email
        fetch('/api/enquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
    }).catch ((err) => console.warn('[Lead Popup API sync]:', err));

      // Construct prefilled WhatsApp message
      const whatsappMsg = `Hello CIATN Institute,

I would like to enquire about your course.

*Name:* ${payload.fullName}
*Email:* ${payload.email}
*Phone:* ${payload.phone}
*Course:* ${payload.course}
*Message:* ${formData.message.trim() || 'I am interested in admission details, fees, and syllabus.'}

I found CIATN through the website and look forward to connecting with the faculty.`;

      const waUrl = `https://wa.me/${CIATN_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;
      setWhatsappRedirectUrl(waUrl);

      // Attempt immediate redirection to WhatsApp
      const newTab = window.open(waUrl, '_blank', 'noopener,noreferrer');
      if (!newTab) {
        // Fallback for pop-up blockers: user can click the direct button
        window.location.href = waUrl;
      }

      setStatus('SUCCESS');
      localStorage.setItem(STORAGE_KEY, 'CONVERTED');
    } catch (err) {
      console.error('[Lead Popup Error]:', err);
      setStatus('ERROR');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="lead-popup-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-popup-title"
      onClick={handleClose}
    >
      <div
        className="lead-popup-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="lead-popup-close"
          onClick={handleClose}
          aria-label="Close Enquiry Dialog"
        >
          &times;
        </button>

        <div className="lead-popup-header">
          <span className="eyebrow" style={{ color: 'var(--saffron-deep)', fontWeight: 600 }}>
            Admission Assistance
          </span>
          <h3 id="lead-popup-title" style={{ fontFamily: 'var(--font-fraunces), serif' }}>
            Get Course Prospectus & Guidance
          </h3>
          <p>
            Connect directly with CIATN faculty in Pune. Receive batch details, fee structure, and syllabus.
          </p>
        </div>

        {status === 'SUCCESS' ? (
          <div className="lead-popup-success">
              <div style={{ fontSize: '42px', marginBottom: '8px' }}>💬</div>
              <h4 style={{ color: 'var(--navy-deep)', marginBottom: '8px' }}>Connecting to WhatsApp...</h4>
              <p style={{ color: 'var(--ink-soft)', fontSize: '14.5px', marginBottom: '18px' }}>
                Your details have been saved. If WhatsApp didn’t open automatically, click below to start your chat:
              </p>
              {whatsappRedirectUrl && (
                <a
                  href={whatsappRedirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ display: 'inline-block', width: 'auto', padding: '12px 24px' }}
                >
                  Open WhatsApp Chat
                </a>
              )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="lead-popup-form">
            {status === 'ERROR' && (
              <div className="lead-popup-error-banner" role="alert">
                {errorMessage}
              </div>
            )}

            <div className="lead-popup-field">
              <label htmlFor="lead-name">Full Name *</label>
              <input
                id="lead-name"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Dr. / Mr. / Ms. Full Name"
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>

            <div className="lead-popup-row">
              <div className="lead-popup-field">
                <label htmlFor="lead-email">Email Address *</label>
                <input
                  id="lead-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="lead-popup-field">
                <label htmlFor="lead-phone">Phone Number *</label>
                <input
                  id="lead-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </div>

            <div className="lead-popup-field">
              <label htmlFor="lead-course">Program of Interest *</label>
              <select
                id="lead-course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                aria-invalid={!!errors.course}
              >
                <option value="">Select a course or program</option>
                {courses.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.title}
                  </option>
                ))}
              </select>
              {errors.course && <span className="error-text">{errors.course}</span>}
            </div>

            <div className="lead-popup-field">
              <label htmlFor="lead-message">Message or Questions (Optional)</label>
              <textarea
                id="lead-message"
                name="message"
                rows={2}
                value={formData.message}
                onChange={handleChange}
                placeholder="Ask about batch timings, fees, or hands-on clinical training..."
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary lead-popup-submit"
              disabled={status === 'SUBMITTING'}
            >
              {status === 'SUBMITTING' ? 'Connecting...' : 'Submit & Connect on WhatsApp'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
