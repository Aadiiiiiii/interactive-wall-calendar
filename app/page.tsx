"use client";

import { useState } from "react";
import Hero from "../components/Hero";
import Calendar from "../components/Calendar";
import Notes from "../components/Notes";

export default function Page() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <main className="page-shell">
      <section className="wall-calendar">
        <Hero currentDate={currentDate} />

        <div className="wall-calendar-bottom">
          <div className="wall-notes-panel">
            <Notes
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div>

          <div className="wall-grid-panel">
            <Calendar
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div>
        </div>
      </section>
    </main>
  );
}