'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { courses, getCourseBySlug } from '@/data/courses';

const CIATN_WHATSAPP_NUMBER = '918669836365';

function EnquiryFormContent() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('IDLE'); // IDLE | SUBMITTING | SUCCESS | ERROR
  const [errorMessage, setErrorMessage] = useState('');

  // Course pre-selection from URL parameter (/contact?course=COURSE_SLUG)
  useEffect(() => {
    const courseParam = searchParams ? searchParams.get('course') : null;
    if (courseParam) {
      const matchedCourse = getCourseBySlug(courseParam);
      if (matchedCourse) {
        setFormData((prev) => ({ ...prev, course: matchedCourse.slug }));
      }
    }
  }, [searchParams]);

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

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s\-()]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.course) {
      newErrors.course = 'Please select a course';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('SUBMITTING');
    setErrorMessage('');

    try {
      // Find course display title for the message
      const selectedCourseObj = courses.find((c) => c.slug === formData.course);
      const courseTitle = selectedCourseObj ? selectedCourseObj.title : formData.course;

      // Construct official WhatsApp enquiry message
      const whatsappMessage = `Hello CIATN,

I would like to enquire about your course/program.

Name: ${formData.fullName.trim()}
Email: ${formData.email.trim()}
Phone: ${formData.phone.trim()}
Course: ${courseTitle}
Message: ${formData.message.trim()}

I found CIATN through the website and would like to know more about the program.`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/${CIATN_WHATSAPP_NUMBER}?text=${encodedMessage}`;

      // Best-effort attempt to open WhatsApp URL
      const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      if (!whatsappWindow) {
        // Browser blocked the popup window. Keep form data intact.
        setStatus('ERROR');
        setErrorMessage('Unable to open WhatsApp. Please allow pop-ups and try again.');
        return;
      }

      // Opening was initiated. Keep form data intact so user information is preserved.
      setStatus('SUCCESS');
    } catch (err) {
      console.error('WhatsApp window open error:', err);
      setStatus('ERROR');
      setErrorMessage('Unable to open WhatsApp. Please allow pop-ups and try again.');
    }
  };

  return (
    <div className="enquiry-card">
      <div className="enquiry-card-head">
        <h3>Send Us an Enquiry</h3>
        <p>Fill out the form below to connect with the CIATN admissions team via WhatsApp.</p>
      </div>

      {status === 'SUCCESS' ? (
        <div className="enquiry-state enquiry-success" role="status">
          <div className="state-icon">📱</div>
          <h4>WhatsApp Opening</h4>
          <p>
            WhatsApp is opening. Please review your enquiry and press Send to submit it to CIATN.
          </p>
          <button
            type="button"
            className="btn btn-outline"
            style={{
              marginTop: '20px',
              color: 'var(--navy-deep)',
              borderColor: 'var(--navy)',
            }}
            onClick={() => setStatus('IDLE')}
          >
            Review or Edit Form
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="enquiry-form">
          {status === 'ERROR' && (
            <div className="enquiry-state enquiry-error-banner" role="alert">
              <p>
                {errorMessage || 'Unable to open WhatsApp. Please allow pop-ups and try again.'}
              </p>
            </div>
          )}

          <div className="form-grid">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                autoComplete="name"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              />
              {errors.fullName && (
                <p id="fullName-error" className="error-text" role="alert">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="error-text" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number (+91...)"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="error-text" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Course of Interest */}
            <div className="form-group">
              <label htmlFor="course">Course of Interest *</label>
              <select
                id="course"
                name="course"
                required
                value={formData.course}
                onChange={handleChange}
                aria-invalid={Boolean(errors.course)}
                aria-describedby={errors.course ? 'course-error' : undefined}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.slug} value={course.slug}>
                    {course.title}
                  </option>
                ))}
              </select>
              {errors.course && (
                <p id="course-error" className="error-text" role="alert">
                  {errors.course}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="form-group full-width">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your background, career goals, or questions..."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="error-text" role="alert">
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary form-submit-btn"
              disabled={status === 'SUBMITTING'}
            >
              {status === 'SUBMITTING' ? 'Opening WhatsApp...' : 'Send Enquiry on WhatsApp'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function EnquiryForm() {
  return (
    <Suspense fallback={<div className="enquiry-card"><p>Loading enquiry form...</p></div>}>
      <EnquiryFormContent />
    </Suspense>
  );
}
