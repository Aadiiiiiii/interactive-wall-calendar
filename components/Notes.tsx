"use client";

import { useEffect, useMemo, useState } from "react";

type NotesProps = {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getStorageKey(startDate: Date | null, endDate: Date | null) {
  if (!startDate || !endDate) return null;

  const startKey = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
  const endKey = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;

  return `calendar-note-${startKey}_${endKey}`;
}

export default function Notes({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: NotesProps) {
  const [note, setNote] = useState("");

  const storageKey = useMemo(() => {
    return getStorageKey(startDate, endDate);
  }, [startDate, endDate]);

  const rangeLabel = useMemo(() => {
    if (!startDate || !endDate) return "No date range selected";
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  }, [startDate, endDate]);

  useEffect(() => {
    if (!storageKey) {
      setNote("");
      return;
    }

    const savedNote = localStorage.getItem(storageKey);
    setNote(savedNote || "");
  }, [storageKey]);

  const handleChange = (value: string) => {
    setNote(value);

    if (storageKey) {
      localStorage.setItem(storageKey, value);
    }
  };

  const handleClearSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setNote("");
  };

  return (
    <div className="notes-embedded">
      <div className="notes-top-row">
        <div>
          <h2 className="notes-title">Notes</h2>
          <p className="notes-range">{rangeLabel}</p>
        </div>

        <button
          className="clear-selection-button"
          onClick={handleClearSelection}
          disabled={!startDate && !endDate}
        >
          Clear
        </button>
      </div>

      {!startDate || !endDate ? (
        <div className="notes-empty-state embedded-empty">
          Select a start date and an end date to attach notes to your chosen range.
        </div>
      ) : (
        <textarea
          className="notes-textarea embedded-textarea"
          placeholder="Write notes for this selected date range..."
          value={note}
          onChange={(e) => handleChange(e.target.value)}
        />
      )}
    </div>
  );
}