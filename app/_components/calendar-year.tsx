import { getRequestDateNow } from "@/lib/date";
import { getCalendarYear } from "@/utils/calendarUtils";
import { cn } from "@/utils/cssUtils";
import { getYear } from "date-fns";
import Link from "next/link";
import * as React from "react";
import { CalendarMonth } from "./calendar-month";

const CalendarYear: React.FC<{ date: Date }> = ({ date }) => {
  const currentDate = getRequestDateNow();
  const year = date.getFullYear();
  const calendarYear = getCalendarYear(year);

  return (
    <div className="max-w-4xl">
      <h1 className="mb-4">
        Norsk kalender med helligdager
        <span className="sr-only"> - Kalender {getYear(date)}</span>
      </h1>
      <div className="flex items-center justify-between">
        <h2>Kalender {getYear(date)}</h2>
        <div className="flex items-center gap-2">
          {/* Go to previous year */}
          <Link
            className="inline-flex min-h-[34px] items-center rounded-md border border-transparent bg-zinc-800 px-2.5 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2"
            href={`/year/${year - 1}`}
          >
            <span className="sr-only">Forrige år</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="inline h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </Link>
          {/* Go to current year */}
          <Link
            className="inline-flex min-h-[34px] items-center rounded-md border border-transparent bg-zinc-800 px-2.5 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2"
            href={`/year/${currentDate.getFullYear()}`}
          >
            I dag
          </Link>
          {/* Go to next year */}
          <Link
            className="inline-flex min-h-[34px] items-center rounded-md border border-transparent bg-zinc-800 px-2.5 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2"
            href={`/year/${year + 1}`}
          >
            <span className="sr-only">Neste år</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="inline h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="my-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {calendarYear.months.map((month, index) => (
          <div key={`calendar-year-calendar-month-${index}`}>
            <Link href={`/year/${month.year}/month/${month.monthNumber}`}>
              <h2
                className={cn({
                  "text-emerald-500":
                    currentDate.getMonth() === month.days[0].date.getMonth() &&
                    currentDate.getFullYear() ===
                      month.days[0].date.getFullYear(),
                })}
              >
                {month.month}
              </h2>
            </Link>
            <CalendarMonth month={month} />
          </div>
        ))}
      </div>
    </div>
  );
};

export { CalendarYear };
