import React from 'react';
import '../../styles/common.css';
import '../../styles/regular.css';
import CalendarCard from './CalendarCard';

/**
 * RegularCalendar renders the full screen layout as extracted:
 * - A centered canvas area
 * - Two calendar cards side-by-side (light and dark)
 */

// PUBLIC_INTERFACE
export default function RegularCalendar() {
  return (
    <div className="screen-regular">
      <main className="canvas" role="main" aria-label="Calendar Screen Regular">
        <div className="calendar-layout">
          <CalendarCard theme="light" monthLabel="April" yearLabel="2021" />
          <CalendarCard theme="dark" monthLabel="April" yearLabel="2021" />
        </div>
      </main>
    </div>
  );
}
