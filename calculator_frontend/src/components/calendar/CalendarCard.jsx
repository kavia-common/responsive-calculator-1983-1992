import React, { useState, useMemo, useCallback } from 'react';

/**
 * CalendarCard component renders a single calendar panel in either 'light' or 'dark' theme.
 * It preserves the layout and interactions from the extracted assets:
 * - Day selection toggle (one selected per card, disabled days not selectable).
 * - Keyboard support: Enter/Space on a focused day triggers selection.
 * - Prev/Next buttons animate slightly on click and log to console (placeholder navigation).
 */

// PUBLIC_INTERFACE
export default function CalendarCard({ theme = 'light', monthLabel = 'April', yearLabel = '2021' }) {
  /** Build the exact days grid data reflected in the extracted HTML. */
  const days = useMemo(
    () => [
      // Week 1
      { num: 29, disabled: true }, { num: 30, disabled: true }, { num: 31, disabled: true },
      { num: 1 }, { num: 2 }, { num: 3 }, { num: 4 },
      // Week 2
      { num: 5 }, { num: 6 }, { num: 7, today: true }, { num: 8 }, { num: 9 }, { num: 10 }, { num: 11 },
      // Week 3
      { num: 12 }, { num: 13 }, { num: 14 }, { num: 15 }, { num: 0 }, { num: 17 }, { num: 18 },
      // Week 4
      { num: 19 }, { num: 20 }, { num: 21 }, { num: 22 }, { num: 23 }, { num: 24 }, { num: 25 },
      // Week 5
      { num: 26 }, { num: 27 }, { num: 28 }, { num: 29 }, { num: 30 }, { num: 1, disabled: true }, { num: 2, disabled: true },
    ],
    []
  );

  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleDayClick = useCallback((idx) => {
    const day = days[idx];
    if (!day || day.disabled) return;

    // Toggle selection: clicking selected again clears it. Today can also be selected (overlay allowed by CSS).
    setSelectedIndex((prev) => (prev === idx ? null : idx));
  }, [days]);

  const handleDayKeyDown = useCallback((e, idx) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDayClick(idx);
    }
  }, [handleDayClick]);

  const animateButton = (target, direction) => {
    if (!target || !target.animate) return;
    const delta = direction === 'prev' ? -2 : 2;
    target.animate([
      { transform: `translateX(${delta}px)` },
      { transform: 'translateX(0)' }
    ], { duration: 120 });
  };

  const onPrev = (e) => {
    console.log('Prev month clicked');
    animateButton(e.currentTarget, 'prev');
  };

  const onNext = (e) => {
    console.log('Next month clicked');
    animateButton(e.currentTarget, 'next');
  };

  return (
    <section className={`calendar-card ${theme}`} aria-label={`${theme === 'dark' ? 'Dark' : 'Light'} Mode Calendar`}>
      <div className="calendar-panel">
        {/* Header */}
        <header className="calendar-header" aria-label="Header">
          <button className="nav-button prev" aria-label="Previous month" data-role="prev" onClick={onPrev}>
            {/* Left Chevron 24x24 */}
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
            </svg>
          </button>

          <div className="month-year" aria-label="Month and Year">
            <div className="select month" role="button" tabIndex={0} aria-haspopup="listbox" aria-label="Select month">
              <span className="label">
                <span className="label text">{monthLabel}</span>
                {/* Down caret 8x8 */}
                <svg className="caret" viewBox="0 0 8 8" aria-hidden="true">
                  <path d="M0 2l4 4 4-4z"></path>
                </svg>
              </span>
            </div>
            <div className="select year" role="button" tabIndex={0} aria-haspopup="listbox" aria-label="Select year">
              <span className="label">
                <span className="label text">{yearLabel}</span>
                <svg className="caret" viewBox="0 0 8 8" aria-hidden="true">
                  <path d="M0 2l4 4 4-4z"></path>
                </svg>
              </span>
            </div>
          </div>

          <button className="nav-button next" aria-label="Next month" data-role="next" onClick={onNext}>
            {/* Right Chevron 24x24 */}
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"></path>
            </svg>
          </button>
        </header>

        {/* Day of Week */}
        <div className="dow-row" aria-label="Days of Week">
          <div className="dow-cell"><span className="text">Mo</span></div>
          <div className="dow-cell"><span className="text">Tu</span></div>
          <div className="dow-cell"><span className="text">We</span></div>
          <div className="dow-cell"><span className="text">Th</span></div>
          <div className="dow-cell"><span className="text">Fr</span></div>
          <div className="dow-cell"><span className="text">Sa</span></div>
          <div className="dow-cell"><span className="text">Su</span></div>
        </div>

        {/* Weeks Grid */}
        <div className="weeks" role="grid" aria-label={`${monthLabel} ${yearLabel} Weeks`}>
          {days.map((d, idx) => {
            const classes = [
              'day',
              d.disabled ? 'disabled' : '',
              d.today ? 'today' : '',
              selectedIndex === idx ? 'selected' : ''
            ].filter(Boolean).join(' ');

            const isDisabled = !!d.disabled;
            const tabIndex = isDisabled ? -1 : 0;

            return (
              <div
                key={idx}
                className={classes}
                role="gridcell"
                aria-disabled={isDisabled || undefined}
                aria-current={d.today ? 'date' : undefined}
                tabIndex={tabIndex}
                onClick={() => handleDayClick(idx)}
                onKeyDown={(e) => handleDayKeyDown(e, idx)}
              >
                <div className="day-content">
                  <span className="num">{d.num}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
