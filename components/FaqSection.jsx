'use client';

import { useState } from 'react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What programs does CIATN Institute offer?',
      a: 'CIATN offers comprehensive clinical cosmetology diplomas (PGDCC), diploma in laser technician, fellowship in facial aesthetics, advanced diploma in trichology, and rapid procedure masterclasses.',
    },
    {
      q: 'Are CIATN courses NSDC accredited?',
      a: 'Yes, CIATN (Chromocosmo Institute of Aesthetics Trichology Nutrition Pvt Ltd) is officially accredited under NSDC with Training Center ID TC329218.',
    },
    {
      q: 'Is hands-on clinical training included in the curriculum?',
      a: 'Yes, all campus programs feature live patient demonstration and supervised clinical hands-on practice using medical-grade aesthetic equipment.',
    },
    {
      q: 'Can I complete course material online?',
      a: 'CIATN provides flexible online learning tracks with cloud access to study materials, recorded lectures, and virtual mentorship options.',
    },
    {
      q: 'Who is eligible to apply for CIATN programs?',
      a: 'Our programs cater to medical graduates (MBBS, BDS, BAMS, BHMS, BUMS), nursing professionals, cosmetologists, laser technicians, and healthcare practitioners.',
    },
  ];

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow">Questions &amp; Answers</span>
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about CIATN courses, accreditations, and training modes.</p>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`faq-item ${openIndex === idx ? 'open' : ''}`}>
              <button
                type="button"
                className="faq-question"
                onClick={() => toggleFaq(idx)}
                aria-expanded={openIndex === idx}
              >
                <span>{faq.q}</span>
                <span className="faq-icon">{openIndex === idx ? '−' : '+'}</span>
              </button>
              {openIndex === idx && (
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
