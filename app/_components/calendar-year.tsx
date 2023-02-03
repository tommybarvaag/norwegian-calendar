import { getCalendarYear } from "@/utils/calendarUtils";
import { getYear } from "date-fns";
import * as React from "react";
import { CalendarMonth } from "./calendar-month";

const CalendarYear: React.FC<{ date: Date }> = ({ date }) => {
  const calendarYear = getCalendarYear(date.getFullYear());

  return (
    <div className="max-w-4xl">
      <h1>Kalender {getYear(date)}</h1>
      <h2>Norsk kalender med helligdager</h2>
      <p></p>
      <div className="my-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {calendarYear.months.map((month, index) => (
          <CalendarMonth
            key={`calendar-year-calendar-month-${index}`}
            month={month}
          />
        ))}
      </div>
    </div>
  );
};

export { CalendarYear };
