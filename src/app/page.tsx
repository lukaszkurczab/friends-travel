"use client";

import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { ToggleButton } from "../components/ToggleButton";
import Menu from "../components/Menu";
import VoteCalendar from "../feature/VoteCalendar";
import ResultCalendar from "../feature/ResultCalendar";

const Dashboard = () => {
  const { loading } = useAuth();
  const [showAllVotes, setShowAllVotes] = useState(false);

  const handleToggleVotes = () => setShowAllVotes((prev) => !prev);

  if (loading) {
    return (
      <div role="status" className="flex w-full items-center justify-center">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
        ></svg>
      </div>
    );
  }

  return (
    <section className="flex w-full align-center h-full">
      <div className="flex w-full justify-between gap-2 pl-4 items-center">
        <div className="flex flex-col items-center justify-center w-full h-full">
          {showAllVotes ? <ResultCalendar /> : <VoteCalendar />}
          <div className="flex items-center justify-between mt-4 gap-2">
            Pokaż wszystkie głosy
            <ToggleButton checked={showAllVotes} onChange={handleToggleVotes} />
          </div>
        </div>
        <Menu />
      </div>
    </section>
  );
};

export default Dashboard;
