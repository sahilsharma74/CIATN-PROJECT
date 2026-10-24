'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

/* ─── CIATN Contact ─────────────────────────────────── */
const WA_NUMBER = '918669836365'; // +91 86698 36365

/* ─── Course list from data/courses.js ──────────────── */
const COURSES = [
  'General Inquiry',
  'Masterclass in Botox and Fillers',
  'Masterclass in Chemical Peels',
  'Masterclass in Thread Lift',
  'Masterclass in Mesotherapy & PRP',
  'Masterclass in Laser Hair Reduction',
  'Fellowship in Medical Cosmetology',
  'Fellowship in Facial Aesthetics & Clinical Cosmetology',
  'Diploma in Laser Technicians',
  'Diploma in Clinical Trichology',
  'Diploma in Clinical Cosmetology',
  'Advanced Diploma in Trichology',
  'Advanced Diploma in Cosmetology',
  'PG Diploma in Trichology (PGDT)',
  'PG Diploma in Clinical Cosmetology (PGDCC)',
];

/* ─── Quick inquiry topics for Step 3 (Option B) ─────── */
const QUICK_TOPICS = [
  'Fee Structure',
  'Batch Schedule',
  'Syllabus & Modules',
  'Hands-on Training',
  'Certification & Eligibility',
];

/* ─── Multi-step form steps ─────────────────────────── */
const STEPS = ['name', 'phone', 'course', 'message', 'summary'];

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', course: 'General Inquiry', message: '' });
  const [inputVal, setInputVal] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [waUrl, setWaUrl] = useState('');
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  /* restore draft state from sessionStorage on mount (no database required) */
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('ciatn_wa_widget');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.form) setForm(parsed.form);
        if (typeof parsed.step === 'number' && parsed.step < STEPS.length) {
          setStep(parsed.step);
          if (STEPS[parsed.step] === 'name') setInputVal(parsed.form?.name || '');
          if (STEPS[parsed.step] === 'phone') setInputVal(parsed.form?.phone || '');
          if (STEPS[parsed.step] === 'message') setInputVal(parsed.form?.message || '');
        }
      }
    } catch (_) { }
  }, []);

  /* sync draft state to sessionStorage */
  useEffect(() => {
    try {
      sessionStorage.setItem('ciatn_wa_widget', JSON.stringify({ form, step }));
    } catch (_) { }
  }, [form, step]);

  /* scroll to bottom whenever content changes */
  useEffect(() => {
    if (open) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [open, step, submitted]);

  /* auto-focus input on each new step */
  useEffect(() => {
    if (open && !submitted) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open, step, submitted]);

  /* closing the widget preserves state in memory and sessionStorage */
  function handleClose() {
    setOpen(false);
  }

  /* explicit reset to start fresh */
  function handleReset() {
    setStep(0);
    setForm({ name: '', phone: '', course: 'General Inquiry', message: '' });
    setInputVal('');
    setError('');
    setSubmitted(false);
    setWaUrl('');
    try {
      sessionStorage.removeItem('ciatn_wa_widget');
    } catch (_) { }
  }

  /* ── Validation ─────────────────────────────────── */
  function validate(currentStep) {
    if (currentStep === 'name') {
      if (!inputVal.trim()) { setError('Please enter your name.'); return false; }
    }
    if (currentStep === 'phone') {
      const digits = inputVal.replace(/\D/g, '');
      if (digits.length < 10) { setError('Please enter a valid 10-digit mobile number.'); return false; }
    }
    setError('');
    return true;
  }

  /* ── Advance step ─────────────────────────────────── */
  function handleNext(overrideMessage) {
    const current = STEPS[step];
    if (!validate(current)) return;

    if (current === 'name') {
      setForm(f => ({ ...f, name: inputVal.trim() }));
      setInputVal(form.phone || '');
    } else if (current === 'phone') {
      setForm(f => ({ ...f, phone: inputVal.trim() }));
      setInputVal(form.message || '');
    } else if (current === 'message') {
      const msg = typeof overrideMessage === 'string' ? overrideMessage : inputVal.trim();
      setForm(f => ({ ...f, message: msg }));
      setInputVal('');
    }

    setStep(s => s + 1);
  }

  /* ── Quick topic select handler ──────────────────── */
  function handleTopicSelect(topic) {
    setForm(f => ({ ...f, message: topic }));
    setInputVal('');
    setStep(s => s + 1);
  }

  /* ── Build clean WhatsApp URL ───────────────────── */
  function buildUrl(data) {
    const { name, phone, course, message } = data;
    const inquiryType =
      course === 'General Inquiry'
        ? 'General Inquiry from Website'
        : 'Course Inquiry from Website';

    const text =
      `CIATN INSTITUTE\n` +
      `--------------------\n` +
      `${inquiryType}\n\n` +
      `Customer Name: ${name}\n` +
      `Customer Mobile: ${phone}\n` +
      `Interested Course: ${course}\n` +
      (message ? `Inquiry Topic: ${message}\n` : '') +
      `--------------------\n` +
      `Inquiry from : Website`;

    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  /* ── Submit → WhatsApp redirect ─────────────────── */
  function handleSubmit() {
    const url = buildUrl(form);
    setWaUrl(url);
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (win) {
      setSubmitted(true);
    } else {
      setSubmitted(true);
    }
  }

  /* ── Chat bubbles to render per step ───────────────── */
  function renderBubbles() {
    const bubbles = [];

    /* Step 0 always shows welcome */
    bubbles.push(
      <ChatBubble key="welcome" from="ciatn">
        Hi there! 👋 Welcome to <strong>CIATN Institute</strong>. I&apos;m here to help with course inquiries and bookings.
      </ChatBubble>
    );
    bubbles.push(
      <ChatBubble key="ask-name" from="ciatn">
        May I know your name?
      </ChatBubble>
    );

    if (step >= 1) {
      bubbles.push(<ChatBubble key="user-name" from="user">{form.name}</ChatBubble>);
      bubbles.push(
        <ChatBubble key="ask-phone" from="ciatn">
          Nice to meet you, <strong>{form.name}</strong>! Could you share your mobile number?
        </ChatBubble>
      );
    }
    if (step >= 2) {
      bubbles.push(<ChatBubble key="user-phone" from="user">{form.phone}</ChatBubble>);
      bubbles.push(
        <ChatBubble key="ask-course" from="ciatn">
          Which course are you interested in?
        </ChatBubble>
      );
    }
    if (step >= 3) {
      bubbles.push(<ChatBubble key="user-course" from="user">{form.course}</ChatBubble>);
      bubbles.push(
        <ChatBubble key="ask-message" from="ciatn">
          What would you like to know about <strong>{form.course}</strong>? Tap a quick topic below or type your question.
        </ChatBubble>
      );
    }
    if (step >= 4) {
      bubbles.push(<ChatBubble key="user-message" from="user">{form.message || '(General Course Inquiry)'}</ChatBubble>);
      bubbles.push(
        <ChatBubble key="summary" from="ciatn">
          <strong>Here is a summary of your inquiry:</strong><br />
          Name: {form.name}<br />
          Phone: {form.phone}<br />
          Course: {form.course}<br />
          Inquiry: {form.message || 'General Information'}<br />
          <br />
          Please review your details above. Tap <strong>Proceed to WhatsApp</strong> to connect with our team, or <strong>Edit</strong> to make changes.
        </ChatBubble>
      );
    }
    if (submitted) {
      bubbles.push(
        <ChatBubble key="done" from="ciatn">
          WhatsApp is opening in a new tab. Please press <strong>Send</strong> there to complete your inquiry. We look forward to speaking with you!
          {waUrl && (
            <div style={{ marginTop: '8px' }}>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#075e54', fontWeight: 700, fontSize: '12px', textDecoration: 'underline' }}
              >
                Tap here if WhatsApp didn&apos;t open →
              </a>
            </div>
          )}
        </ChatBubble>
      );
    }

    return bubbles;
  }

  /* ── Input area for current step ───────────────── */
  function renderInput() {
    if (submitted) return null;
    const current = STEPS[step];

    if (current === 'course') {
      return (
        <div style={styles.inputCol}>
          <div style={styles.inputRow}>
            <select
              ref={inputRef}
              value={form.course}
              onChange={e => {
                setForm(f => ({ ...f, course: e.target.value }));
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleNext();
                }
              }}
              style={styles.select}
              aria-label="Select course"
            >
              {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button
              onClick={() => handleNext()}
              style={styles.sendBtn}
              aria-label="Confirm Course"
              title="Next step"
            >
              <SendIcon />
            </button>
          </div>
          <div style={styles.courseActionsRow}>
            <button
              type="button"
              onClick={() => { setStep(1); setInputVal(form.phone || ''); }}
              style={styles.backLinkBtn}
            >
              ← Edit Phone
            </button>
            <button
              type="button"
              onClick={() => handleNext()}
              style={styles.courseConfirmBtn}
              aria-label="Confirm Course Selection"
            >
              Confirm Course →
            </button>
          </div>
        </div>
      );
    }

    if (current === 'message') {
      return (
        <div style={styles.inputCol}>
          <div style={styles.chipsContainer}>
            {QUICK_TOPICS.map(topic => (
              <button
                key={topic}
                type="button"
                onClick={() => handleTopicSelect(topic)}
                style={styles.chipBtn}
              >
                {topic}
              </button>
            ))}
          </div>
          <div style={styles.inputRow}>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Or type a question… (optional)"
              style={styles.textInput}
              aria-label="Inquiry or question"
              onKeyDown={e => { if (e.key === 'Enter') handleNext(); }}
              maxLength={120}
            />
            <button onClick={() => handleNext()} style={styles.sendBtn} aria-label="Send">
              <SendIcon />
            </button>
          </div>
          <div style={styles.courseActionsRow}>
            <button
              type="button"
              onClick={() => { setStep(2); }}
              style={styles.backLinkBtn}
            >
              ← Edit Course
            </button>
            <button
              type="button"
              onClick={() => handleNext('')}
              style={styles.skipBtn}
            >
              Skip →
            </button>
          </div>
        </div>
      );
    }

    if (current === 'summary') {
      return (
        <div style={styles.summaryActionsCol}>
          <button
            type="button"
            onClick={handleSubmit}
            style={styles.whatsappSubmitBtn}
            aria-label="Proceed to WhatsApp"
          >
            <WAIcon size={18} color="#fff" />
            Proceed to WhatsApp →
          </button>
          <div style={styles.summarySubActions}>
            <button
              type="button"
              onClick={() => { setStep(0); setInputVal(form.name || ''); }}
              style={styles.editBtn}
              aria-label="Edit Details"
            >
              ✏️ Edit Details
            </button>
            <button
              type="button"
              onClick={handleReset}
              style={styles.restartBtn}
              aria-label="Start over"
            >
              Restart
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={styles.inputCol}>
        <div style={styles.inputRow}>
          <input
            ref={inputRef}
            type={current === 'phone' ? 'tel' : 'text'}
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder={current === 'name' ? 'Your full name…' : 'Your 10-digit mobile number…'}
            style={styles.textInput}
            aria-label={current === 'name' ? 'Your name' : 'Mobile number'}
            onKeyDown={e => { if (e.key === 'Enter') handleNext(); }}
            maxLength={current === 'phone' ? 15 : 60}
          />
          <button onClick={() => handleNext()} style={styles.sendBtn} aria-label="Send">
            <SendIcon />
          </button>
        </div>
        {current === 'phone' && (
          <button
            type="button"
            onClick={() => { setStep(0); setInputVal(form.name || ''); }}
            style={styles.backLinkBtn}
          >
            ← Edit Name
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      {/* ── Floating Button ─────────────────────────── */}
      <button
        onClick={() => setOpen(o => !o)}
        style={styles.fab}
        aria-label="Open WhatsApp chat with CIATN Institute"
        aria-expanded={open}
      >
        <WAIcon size={30} color="#fff" />
        <span style={styles.fabPulse} />
      </button>

      {/* ── Chat Window ─────────────────────────────── */}
      {open && (
        <div style={styles.window} role="dialog" aria-modal="true" aria-label="CIATN WhatsApp Chat">
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerAvatar}>
              <Image
                src="/assets/ciatn-logo.webp"
                alt="CIATN Institute"
                width={38}
                height={38}
                style={{ borderRadius: '50%', objectFit: 'contain', background: '#fff' }}
              />
            </div>
            <div style={styles.headerInfo}>
              <span style={styles.headerName}>CIATN Institute</span>
              <span style={styles.headerStatus}>
                <span style={styles.onlineDot} />
                Online
              </span>
            </div>
            <button
              onClick={handleClose}
              style={styles.closeBtn}
              aria-label="Close WhatsApp chat"
            >
              ✕
            </button>
          </div>

          {/* WhatsApp watermark bar */}
          <div style={styles.waBar}>
            <WAIcon size={12} color="#25d366" />
            <span style={styles.waBarText}>Chat · WhatsApp Business</span>
          </div>

          {/* Chat area */}
          <div style={styles.chatArea} role="log" aria-live="polite">
            {renderBubbles()}
            <div ref={chatEndRef} />
          </div>

          {/* Error */}
          {error && <p style={styles.errorText} role="alert">{error}</p>}

          {/* Input */}
          <div style={styles.inputArea}>
            {renderInput()}
          </div>
        </div>
      )}
    </>
  );
}

/* ── Sub-components ──────────────────────────────────── */

function ChatBubble({ from, children }) {
  const isUser = from === 'user';
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: '8px' }}>
      <div style={isUser ? styles.userBubble : styles.ciaTNBubble}>
        {children}
      </div>
    </div>
  );
}

function WAIcon({ size = 24, color = '#25d366' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M16 2C8.268 2 2 8.268 2 16c0 2.469.649 4.787 1.786 6.8L2 30l7.4-1.759A13.938 13.938 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z"
        fill={color}
      />
      <path
        d="M23.5 19.96c-.32-.16-1.89-.93-2.185-1.04-.294-.104-.508-.16-.722.16-.213.32-.828 1.04-1.015 1.253-.187.214-.374.24-.694.08-.32-.16-1.35-.497-2.572-1.586-.95-.847-1.594-1.89-1.78-2.21-.186-.32-.02-.494.14-.653.145-.143.32-.374.48-.56.16-.186.213-.32.32-.534.107-.213.054-.4-.027-.56-.08-.16-.722-1.74-.988-2.38-.26-.626-.526-.54-.722-.55l-.614-.01c-.214 0-.56.08-.854.4s-1.12 1.094-1.12 2.668 1.147 3.094 1.307 3.308c.16.213 2.256 3.44 5.468 4.826.764.33 1.36.527 1.824.674.767.244 1.466.21 2.02.127.616-.092 1.89-.773 2.16-1.52.266-.747.266-1.387.186-1.52-.08-.134-.293-.214-.613-.374z"
        fill="#fff"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

/* ── Styles ──────────────────────────────────────────── */
const styles = {
  /* Floating Action Button */
  fab: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '58px',
    height: '58px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(37, 211, 102, 0.5)',
    zIndex: 9999,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
  },
  fabPulse: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'rgba(37, 211, 102, 0.35)',
    animation: 'wa-pulse 2s ease-out infinite',
    pointerEvents: 'none',
  },

  /* Chat window */
  window: {
    position: 'fixed',
    bottom: '96px',
    right: '24px',
    width: 'min(360px, calc(100vw - 32px))',
    maxHeight: 'min(540px, calc(100vh - 120px))',
    borderRadius: '16px',
    background: '#fff',
    boxShadow: '0 8px 40px rgba(0,0,0,0.22)',
    zIndex: 9998,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    fontFamily: 'Inter, system-ui, sans-serif',
    animation: 'wa-slide-up 0.25s cubic-bezier(0.22,1,0.36,1)',
  },

  /* Header */
  header: {
    background: 'linear-gradient(135deg, #075e54 0%, #128c7e 100%)',
    padding: '12px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexShrink: 0,
  },
  headerAvatar: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
    border: '2px solid rgba(255,255,255,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff',
  },
  headerInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
    overflow: 'hidden',
  },
  headerName: {
    color: '#fff',
    fontWeight: 700,
    fontSize: '15px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  headerStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: 'rgba(255,255,255,0.8)',
    fontSize: '11px',
  },
  onlineDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#25d366',
    boxShadow: '0 0 0 0px rgba(255,255,255,0.5)',
  },
  closeBtn: {
    background: 'rgba(255,255,255,0.15)',
    border: 'none',
    color: '#fff',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    flexShrink: 0,
    transition: 'background 0.15s',
  },

  /* WhatsApp sub-bar */
  waBar: {
    background: '#e9ffe9',
    borderBottom: '1px solid #d4edda',
    padding: '5px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    flexShrink: 0,
  },
  waBarText: {
    fontSize: '10px',
    color: '#075e54',
    fontWeight: 600,
    letterSpacing: '0.3px',
    textTransform: 'uppercase',
  },

  /* Chat messages */
  chatArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '14px 12px 6px',
    background: '#ece5dd',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8bfb4' fill-opacity='0.25'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  },

  /* Bubbles */
  ciaTNBubble: {
    background: '#fff',
    color: '#1a1a1a',
    padding: '9px 13px',
    borderRadius: '0 12px 12px 12px',
    maxWidth: '80%',
    fontSize: '13.5px',
    lineHeight: '1.5',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  },
  userBubble: {
    background: '#dcf8c6',
    color: '#1a1a1a',
    padding: '9px 13px',
    borderRadius: '12px 0 12px 12px',
    maxWidth: '80%',
    fontSize: '13.5px',
    lineHeight: '1.5',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  },

  /* Input area */
  inputArea: {
    background: '#f0f0f0',
    borderTop: '1px solid #ddd',
    padding: '10px',
    flexShrink: 0,
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  inputCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  textInput: {
    flex: 1,
    minWidth: 0,
    padding: '9px 12px',
    borderRadius: '24px',
    border: '1.5px solid #ddd',
    fontSize: '13.5px',
    outline: 'none',
    background: '#fff',
    color: '#1a1a1a',
    fontFamily: 'inherit',
    transition: 'border-color 0.15s',
  },
  select: {
    flex: 1,
    minWidth: 0,
    width: '100%',
    padding: '9px 12px',
    borderRadius: '24px',
    border: '1.5px solid #ddd',
    fontSize: '13px',
    outline: 'none',
    background: '#fff',
    color: '#1a1a1a',
    fontFamily: 'inherit',
    cursor: 'pointer',
  },
  chipsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    padding: '2px 0 4px',
  },
  chipBtn: {
    background: '#fff',
    border: '1px solid #128c7e',
    borderRadius: '16px',
    color: '#075e54',
    fontSize: '11.5px',
    fontWeight: 600,
    padding: '5px 10px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  courseConfirmBtn: {
    background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
    border: 'none',
    borderRadius: '20px',
    color: '#fff',
    fontSize: '12.5px',
    fontWeight: 600,
    padding: '7px 14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    boxShadow: '0 2px 6px rgba(37,211,102,0.3)',
  },
  sendBtn: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
    border: 'none',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'transform 0.15s, box-shadow 0.15s',
    boxShadow: '0 2px 8px rgba(37,211,102,0.4)',
  },
  skipBtn: {
    alignSelf: 'flex-end',
    background: 'none',
    border: 'none',
    color: '#128c7e',
    fontSize: '12.5px',
    cursor: 'pointer',
    fontWeight: 600,
    textDecoration: 'underline',
    padding: '2px 4px',
  },
  summaryActionsCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
  },
  summarySubActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0 4px',
  },
  editBtn: {
    background: '#fff',
    border: '1px solid #128c7e',
    borderRadius: '16px',
    color: '#075e54',
    fontSize: '12px',
    fontWeight: 600,
    padding: '5px 12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  restartBtn: {
    background: 'none',
    border: 'none',
    color: '#666',
    fontSize: '11.5px',
    textDecoration: 'underline',
    cursor: 'pointer',
    padding: '4px',
  },
  backLinkBtn: {
    alignSelf: 'flex-start',
    background: 'none',
    border: 'none',
    color: '#075e54',
    fontSize: '11.5px',
    fontWeight: 600,
    cursor: 'pointer',
    padding: '2px 4px',
  },
  courseActionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
  },
  submitRow: {
    display: 'flex',
    justifyContent: 'center',
  },
  whatsappSubmitBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '11px 22px',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, #25d366 0%, #075e54 100%)',
    border: 'none',
    color: '#fff',
    fontWeight: 700,
    fontSize: '14px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    boxShadow: '0 4px 14px rgba(37,211,102,0.45)',
    transition: 'transform 0.15s, box-shadow 0.15s',
    width: '100%',
    justifyContent: 'center',
  },
  errorText: {
    color: '#c0392b',
    fontSize: '12px',
    padding: '4px 10px 0',
    margin: 0,
    background: '#f0f0f0',
  },
};
