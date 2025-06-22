"use client";

import { useEffect, useState } from "react";
import Calendar from "../../components/Calendar";
import { getAllVotes } from "../../services/votesService";

const ResultCalendar = () => {
  const [markedDates, setMarkedDates] = useState<Date[]>([]);

  useEffect(() => {
    const fetchVotes = async () => {
      const allVotes = await getAllVotes("trip1");

      const allDates = Object.values(allVotes)
        .flat()
        .map((dateStr) => new Date(dateStr));

      const uniqueDates = Array.from(
        new Set(allDates.map((d) => d.toDateString()))
      ).map((d) => new Date(d));

      setMarkedDates(uniqueDates);
    };

    fetchVotes();
  }, []);

  return <Calendar onDayPress={() => {}} markedDates={markedDates} />;
};

export default ResultCalendar;
