"use client";

import { useEffect, useState } from "react";
import Calendar from "../../components/Calendar";
import { getAllVotes } from "../../services/votesService";
import { VoteEntry } from "../../types";
import { Checkbox } from "../../components/Checkbox";

const ResultCalendar = () => {
  const [allVotes, setAllVotes] = useState<VoteEntry[]>([]);
  const [activeUIDs, setActiveUIDs] = useState<Set<string>>(new Set());
  const [markedDates, setMarkedDates] = useState<Date[]>([]);
  const [voteDensityMap, setVoteDensityMap] = useState<Record<string, number>>(
    {}
  );
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [modalPosition, setModalPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const fetchVotes = async () => {
      const voteEntries = await getAllVotes("trip1");
      setAllVotes(voteEntries);
      setActiveUIDs(new Set(voteEntries.map((e) => e.uid)));
    };

    fetchVotes();
  }, []);

  useEffect(() => {
    const visibleVotes = allVotes.filter((entry) => activeUIDs.has(entry.uid));
    const counts: Record<string, number> = {};

    visibleVotes.forEach((entry) => {
      entry.votes.forEach((dateStr) => {
        const formatted = new Date(dateStr).toDateString();
        counts[formatted] = (counts[formatted] || 0) + 1;
      });
    });

    setVoteDensityMap(counts);
    const allDates = Object.keys(counts).map((dStr) => new Date(dStr));
    setMarkedDates(allDates);
  }, [allVotes, activeUIDs]);

  const toggleUser = (uid: string) => {
    setActiveUIDs((prev) => {
      const updated = new Set(prev);
      if (updated.has(uid)) {
        updated.delete(uid);
      } else {
        updated.add(uid);
      }
      return updated;
    });
  };

  const handleHover = (date: Date) => {
    const rect = document
      .querySelector(`[data-date="${date.toDateString()}"]`)
      ?.getBoundingClientRect();
    if (rect) {
      setModalPosition({ x: rect.left + rect.width / 2, y: rect.top });
    }
    setHoveredDate(date.toDateString());
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-center w-full">
      <Calendar
        onDayPress={() => {}}
        onDayHover={handleHover}
        markedDates={markedDates}
        densityMap={voteDensityMap}
      />

      {hoveredDate &&
        modalPosition &&
        allVotes.some((entry) =>
          entry.votes.some((v) => new Date(v).toDateString() === hoveredDate)
        ) && (
          <div
            className="absolute bg-white border shadow-md rounded px-4 py-2 text-sm z-50"
            style={{
              top: modalPosition.y - 10,
              left: modalPosition.x,
              transform: "translate(-50%, -100%)",
            }}
            onMouseLeave={() => setHoveredDate(null)}
          >
            <ul className="mt-1">
              {allVotes
                .filter((entry) =>
                  entry.votes.some(
                    (v) => new Date(v).toDateString() === hoveredDate
                  )
                )
                .map((entry) => (
                  <li key={entry.uid}>
                    {entry.firstName} {entry.lastName}
                  </li>
                ))}
            </ul>
          </div>
        )}

      <div className="mt-4 md:mt-0 md:ml-4 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-2">Użytkownicy:</h2>
        {allVotes.map((entry) => (
          <div key={entry.uid} className="flex items-center mb-2">
            <Checkbox
              checked={activeUIDs.has(entry.uid)}
              onCheckedChange={() => toggleUser(entry.uid)}
            >
              <span className="ml-2 text-lg">
                {entry.firstName} {entry.lastName}
              </span>
            </Checkbox>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultCalendar;
