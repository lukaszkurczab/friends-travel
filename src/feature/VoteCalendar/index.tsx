"use client";

import { useState, useEffect } from "react";
import Calendar from "../../components/Calendar";
import { getUserVotes, updateUserVotes } from "../../services/votesService";
import { useAuth } from "../../app/context/AuthContext";

const VoteCalendar = () => {
  const user = useAuth();
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const [tempSelectedDays, setTempSelectedDays] = useState<Date[]>([]);
  const [firstSelectedDay, setFirstSelectedDay] = useState<Date | null>(null);
  const [mode, setMode] = useState<"selecting" | "deselecting" | null>(null);
  const [initialLoadCompleted, setInitialLoadCompleted] = useState(false);

  useEffect(() => {
    const fetchVotes = async () => {
      if (user?.userId) {
        const votes = await getUserVotes("trip1", user.userId);
        setSelectedDays(votes.map((d) => new Date(d)));
        setInitialLoadCompleted(true);
      }
    };
    fetchVotes();
  }, [user]);

  useEffect(() => {
    const saveVotes = async () => {
      if (user?.userId && initialLoadCompleted) {
        await updateUserVotes("trip1", user.userId, selectedDays);
      }
    };
    saveVotes();
  }, [selectedDays, user, initialLoadCompleted]);

  const areDatesEqual = (a: Date, b: Date) =>
    a.toDateString() === b.toDateString();

  const isDateSelected = (date: Date) =>
    selectedDays.some((d) => areDatesEqual(d, date));

  const getDateRange = (start: Date, end: Date) => {
    const range: Date[] = [];
    const current = new Date(start);
    const dir = start < end ? 1 : -1;
    while ((dir === 1 && current <= end) || (dir === -1 && current >= end)) {
      range.push(new Date(current));
      current.setDate(current.getDate() + dir);
    }
    return range;
  };

  const handleDayPress = (date: Date) => {
    const alreadySelected = isDateSelected(date);

    if (!firstSelectedDay) {
      setFirstSelectedDay(date);
      setTempSelectedDays([date]);
      setMode(alreadySelected ? "deselecting" : "selecting");
      return;
    }

    const range = getDateRange(firstSelectedDay, date);

    if (mode === "selecting") {
      const newDates = [...selectedDays];
      range.forEach((d) => {
        if (!isDateSelected(d)) newDates.push(d);
      });
      setSelectedDays(newDates);
    }

    if (mode === "deselecting") {
      setSelectedDays(
        selectedDays.filter((d) => !range.some((r) => areDatesEqual(d, r)))
      );
    }

    setTempSelectedDays([]);
    setFirstSelectedDay(null);
    setMode(null);
  };

  const handleDayHover = (date: Date) => {
    if (mode && firstSelectedDay) {
      setTempSelectedDays(getDateRange(firstSelectedDay, date));
    }
  };

  const handleRightClick = () => {
    setTempSelectedDays([]);
    setFirstSelectedDay(null);
    setMode(null);
  };

  return (
    <Calendar
      markedDates={selectedDays}
      tempMarkedDates={tempSelectedDays}
      onDayPress={handleDayPress}
      onDayHover={handleDayHover}
      onContextMenuDay={() => handleRightClick()}
    />
  );
};

export default VoteCalendar;
