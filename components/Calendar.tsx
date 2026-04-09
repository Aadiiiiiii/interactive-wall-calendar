type CalendarProps = {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

type HolidayMap = {
  [key: string]: string;
};

export default function Calendar({
  currentDate,
  setCurrentDate,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: CalendarProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthLabel = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const holidays: HolidayMap = {
    "1-1": "New Year’s Day",
    "2-14": "Valentine’s Day",
    "3-8": "Women’s Day",
    "8-15": "Independence Day",
    "10-2": "Gandhi Jayanti",
    "12-25": "Christmas Day",
  };

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let startingDayIndex = firstDayOfMonth.getDay();
  startingDayIndex = startingDayIndex === 0 ? 6 : startingDayIndex - 1;

  const emptyCells = Array.from({ length: startingDayIndex });
  const dayCells = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const today = new Date();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isSameDay = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isDateInRange = (date: Date, start: Date | null, end: Date | null) => {
    if (!start || !end) return false;
    return date > start && date < end;
  };

  const isToday = (date: Date) => isSameDay(date, today);

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(year, month, day);

    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
      return;
    }

    if (startDate && !endDate) {
      if (clickedDate.getTime() === startDate.getTime()) {
        setEndDate(clickedDate);
        return;
      }

      if (clickedDate > startDate) {
        setEndDate(clickedDate);
      } else {
        setEndDate(startDate);
        setStartDate(clickedDate);
      }
    }
  };

  const getRangeSummary = () => {
    if (!startDate || !endDate) return "No range selected";

    const diffMs = endDate.getTime() - startDate.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;

    return `${totalDays} day${totalDays > 1 ? "s" : ""} selected`;
  };

  return (
    <div className="calendar-embedded">
      <div className="calendar-header">
        <button
          className="nav-button"
          onClick={handlePrevMonth}
          aria-label="Previous month"
        >
          ←
        </button>

        <div className="calendar-heading-block">
          <p className="calendar-subtitle">Select your date range</p>
          <h2 className="calendar-title">{monthLabel}</h2>
          <p className="range-summary">{getRangeSummary()}</p>
        </div>

        <button
          className="nav-button"
          onClick={handleNextMonth}
          aria-label="Next month"
        >
          →
        </button>
      </div>

      <div className="weekday-row compact-weekdays">
        {weekDays.map((day) => (
          <div
            key={day}
            className={`weekday-cell ${
              day === "Sat" || day === "Sun" ? "weekend-label" : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid compact-grid">
        {emptyCells.map((_, index) => (
          <div key={`empty-${index}`} className="day-cell empty-cell" />
        ))}

        {dayCells.map((day) => {
          const currentCellDate = new Date(year, month, day);
          const jsDay = currentCellDate.getDay();
          const isWeekend = jsDay === 0 || jsDay === 6;

          const start = isSameDay(currentCellDate, startDate);
          const end = isSameDay(currentCellDate, endDate);
          const inRange = isDateInRange(currentCellDate, startDate, endDate);
          const todayMatch = isToday(currentCellDate);

          const holidayKey = `${month + 1}-${day}`;
          const holidayName = holidays[holidayKey];

          let className = "day-cell compact-day";

          if (isWeekend) className += " weekend-day";
          if (inRange) className += " in-range";
          if (start) className += " start-day";
          if (end) className += " end-day";
          if (todayMatch) className += " today-day";
          if (holidayName) className += " holiday-day";

          return (
            <button
              key={day}
              className={className}
              onClick={() => handleDayClick(day)}
              aria-label={`Select ${currentCellDate.toDateString()}`}
              title={holidayName ? holidayName : currentCellDate.toDateString()}
            >
              <span className="day-number">{day}</span>
              {holidayName && <span className="holiday-dot" />}
            </button>
          );
        })}
      </div>

      <div className="holiday-legend">
        <span className="legend-dot" />
        <span className="legend-text">Holiday marker</span>
      </div>
    </div>
  );
}