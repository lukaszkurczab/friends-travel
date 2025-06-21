"use client";

import { useAuth } from "./context/AuthContext";
import Menu from "../components/Menu";
import Calendar from "../components/Calendar";
import { useState } from "react";

const Dashboard = () => {
  const { loading } = useAuth();
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);

  const handleDayPress = (date: Date) => {
    if (selectedDays.some((d) => d.toDateString() === date.toDateString())) {
      setSelectedDays(
        selectedDays.filter((d) => d.toDateString() !== date.toDateString())
      );
    } else {
      setSelectedDays([...selectedDays, date]);
    }
    console.log("Selected Days:", selectedDays);
  };

  if (loading) {
    return (
      <div role="status" className="flex w-full items-center justify-center">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
      </div>
    );
  }

  return (
    <section className="flex w-full align-center h-full">
      <div className="flex w-full justify-between gap-2 pl-4 items-center">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Calendar markedDates={selectedDays} onDayPress={handleDayPress} />
        </div>
        <Menu />
      </div>
    </section>
  );
};

export default Dashboard;
