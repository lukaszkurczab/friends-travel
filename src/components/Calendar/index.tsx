import React, { useState, useRef, useEffect } from "react";

interface CalendarProps {
  markedDates: Date[] | null;
  onDayPress: (date: Date) => void;
}

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  month: number;
  year: number;
}

const daysInMonth = (month: number, year: number): number =>
  new Date(year, month + 1, 0).getDate();

const generateCalendarMatrix = (
  month: number,
  year: number
): CalendarDay[][] => {
  const totalDays = daysInMonth(month, year);
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // poniedziałek jako 0
  const matrix: CalendarDay[][] = [];
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  const prevMonthDays = daysInMonth(prevMonth, prevYear);
  let prevDay = prevMonthDays - firstDay + 1;
  let currentDay = 1;
  let nextDay = 1;

  for (let row = 0; row < 6; row++) {
    const rowData: CalendarDay[] = [];
    for (let col = 0; col < 7; col++) {
      if (row === 0 && col < firstDay) {
        rowData.push({
          day: prevDay++,
          isCurrentMonth: false,
          month: prevMonth,
          year: prevYear,
        });
      } else if (currentDay > totalDays) {
        rowData.push({
          day: nextDay++,
          isCurrentMonth: false,
          month: nextMonth,
          year: nextYear,
        });
      } else {
        rowData.push({
          day: currentDay++,
          isCurrentMonth: true,
          month,
          year,
        });
      }
    }
    matrix.push(rowData);
  }
  return matrix;
};

const formatDate = (date: Date): string =>
  `${String(date.getDate()).padStart(2, "0")}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${date.getFullYear()}`;

const Calendar: React.FC<CalendarProps> = ({ markedDates, onDayPress }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState<"day" | "month" | "year">("day");
  const years = Array.from({ length: 96 }, (_, i) => 2001 + i);
  const scrollRef = useRef<HTMLDivElement>(null);
  const today = new Date();

  useEffect(() => {
    if (viewMode === "year" && scrollRef.current) {
      const index = years.indexOf(currentYear);
      const offset = Math.floor(index / 3) - (index % 3 === 2 ? 3 : 2);
      scrollRef.current.scrollTo({ top: offset * 60, behavior: "auto" });
    }
  }, [viewMode, currentYear, years]);

  const handleDayClick = (day: CalendarDay) => {
    onDayPress(new Date(day.year, day.month, day.day));
  };

  const changeMonth = (dir: "prev" | "next") => {
    setCurrentMonth((prev) => {
      if (dir === "prev") {
        if (prev === 0) {
          setCurrentYear((y) => y - 1);
          return 11;
        }
        return prev - 1;
      } else {
        if (prev === 11) {
          setCurrentYear((y) => y + 1);
          return 0;
        }
        return prev + 1;
      }
    });
  };

  const markedSet = new Set(markedDates?.map(formatDate));

  const renderDays = () => {
    const matrix = generateCalendarMatrix(currentMonth, currentYear);
    const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    return (
      <>
        <div className="flex justify-between text-blue-600 font-semibold text-lg mb-2">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="w-12 h-12 flex items-center justify-center"
            >
              {day}
            </div>
          ))}
        </div>
        {matrix.map((row, rowIdx) => (
          <div key={rowIdx} className="flex justify-between">
            {row.map((day, colIdx) => {
              const currentDate = new Date(day.year, day.month, day.day);
              const dateStr = formatDate(currentDate);

              const isToday =
                today.getFullYear() === day.year &&
                today.getMonth() === day.month &&
                today.getDate() === day.day;

              const isMarked = markedSet.has(dateStr);

              return (
                <div
                  key={colIdx}
                  className={`w-12 h-12 text-lg rounded-full flex items-center justify-center cursor-pointer transition-all
                    ${day.isCurrentMonth ? "text-black" : "text-gray-400"}
                    ${isMarked ? "bg-blue-500 text-white" : ""}
                    ${isToday ? "border-2 border-blue-700" : ""}`}
                  onClick={() => handleDayClick(day)}
                >
                  {day.day}
                </div>
              );
            })}
          </div>
        ))}
      </>
    );
  };

  const renderMonths = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return (
      <div className="grid grid-cols-3 gap-4">
        {months.map((month, idx) => (
          <div
            key={idx}
            className="w-24 h-16 text-lg flex items-center justify-center bg-gray-200 rounded cursor-pointer hover:bg-blue-200"
            onClick={() => {
              setCurrentMonth(idx);
              setViewMode("day");
            }}
          >
            {month}
          </div>
        ))}
      </div>
    );
  };

  const renderYears = () => (
    <div className="max-h-80 overflow-y-auto" ref={scrollRef}>
      <div className="grid grid-cols-3 gap-4">
        {years.map((year) => (
          <div
            key={year}
            className="w-24 h-16 text-lg flex items-center justify-center bg-gray-200 rounded cursor-pointer hover:bg-blue-200"
            onClick={() => {
              setCurrentYear(year);
              setViewMode("month");
            }}
          >
            {year}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 w-fit rounded-lg text-center shadow-md border border-gray-300">
      <div className="mb-4">
        {viewMode === "day" && (
          <div className="flex justify-between items-center w-full gap-4">
            <button
              onClick={() => changeMonth("prev")}
              className="text-blue-600 text-xl"
            >
              ◀
            </button>
            <button
              onClick={() => setViewMode("month")}
              className="font-semibold text-xl text-black"
            >
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </button>
            <button
              onClick={() => changeMonth("next")}
              className="text-blue-600 text-xl"
            >
              ▶
            </button>
          </div>
        )}
        {viewMode !== "day" && (
          <button
            onClick={() => setViewMode("year")}
            className="text-black font-semibold text-xl"
          >
            {currentYear}
          </button>
        )}
      </div>
      <div className="w-[360px] h-[360px]">
        {viewMode === "day" && renderDays()}
        {viewMode === "month" && renderMonths()}
        {viewMode === "year" && renderYears()}
      </div>
    </div>
  );
};

export default Calendar;
