'use client';

import { useState, useRef, useEffect } from 'react';

export default function DatePicker({ value, onChange, placeholder = 'Select Preferred Date...' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const datepickerRef = useRef(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (datepickerRef.current && !datepickerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedDate = value ? new Date(value) : null;

  const daysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const startDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    const chosen = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (chosen < today) return;

    const yyyy = chosen.getFullYear();
    const mm = String(chosen.getMonth() + 1).padStart(2, '0');
    const dd = String(chosen.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    onChange(dateStr);
    setIsOpen(false);
  };

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const totalDays = daysInMonth(currentMonth);
  const startDay = startDayOfMonth(currentMonth);

  return (
    <div className="custom-datepicker-container" ref={datepickerRef}>
      <div
        className="exact-datepicker-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="trigger-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e2811f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </span>
        <span className={`trigger-text ${!value ? 'is-placeholder' : ''}`}>
          {formatDisplayDate(value) || placeholder}
        </span>
        <span className="trigger-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>

      {isOpen && (
        <div className="custom-datepicker-popover">
          <div className="dp-header">
            <button type="button" className="dp-nav-btn" onClick={handlePrevMonth} aria-label="Previous Month">
              ‹
            </button>
            <span className="dp-month-title">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button type="button" className="dp-nav-btn" onClick={handleNextMonth} aria-label="Next Month">
              ›
            </button>
          </div>

          <div className="dp-weekdays">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>

          <div className="dp-days-grid">
            {Array.from({ length: startDay }).map((_, i) => (
              <span key={`empty-${i}`} className="dp-day dp-empty"></span>
            ))}

            {Array.from({ length: totalDays }).map((_, i) => {
              const dayNum = i + 1;
              const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNum);
              const isPast = dateObj < today;
              const isSelected =
                selectedDate &&
                selectedDate.getFullYear() === dateObj.getFullYear() &&
                selectedDate.getMonth() === dateObj.getMonth() &&
                selectedDate.getDate() === dayNum;
              const isToday =
                today.getFullYear() === dateObj.getFullYear() &&
                today.getMonth() === dateObj.getMonth() &&
                today.getDate() === dayNum;

              return (
                <button
                  key={dayNum}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleDateClick(dayNum)}
                  className={`dp-day ${isPast ? 'dp-past' : ''} ${isSelected ? 'dp-selected' : ''} ${isToday ? 'dp-today' : ''}`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          <div className="dp-footer">
            <button
              type="button"
              className="dp-action-btn"
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
            >
              Clear
            </button>
            <button
              type="button"
              className="dp-action-btn dp-today-btn"
              onClick={() => {
                const yyyy = today.getFullYear();
                const mm = String(today.getMonth() + 1).padStart(2, '0');
                const dd = String(today.getDate()).padStart(2, '0');
                onChange(`${yyyy}-${mm}-${dd}`);
                setCurrentMonth(new Date());
                setIsOpen(false);
              }}
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
