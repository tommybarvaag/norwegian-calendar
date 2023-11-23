import * as React from "react";
import Link from "next/link";
import { getCalendarYear } from "@/utils/calendar-utils";
import { cn } from "@/utils/css-utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { getYear } from "date-fns";

import { CalendarMonth } from "./calendar-month";

const CalendarYear: React.FC<{ date?: Date }> = ({ date }) => {
  const calendarDate = !!date ? new Date(date) : new Date();
  const currentDate = new Date();
  const year = calendarDate.getFullYear();
  const calendarYear = getCalendarYear(year);

  return (
    <div className="max-w-4xl">
      <h1 className="mb-4">
        Norsk kalender med helligdager
        <span className="sr-only"> - Kalender {getYear(calendarDate)}</span>
      </h1>
      <div className="flex items-center justify-between">
        <h2>Kalender {getYear(calendarDate)}</h2>
        <div className="flex items-center gap-2">
          {/* Go to previous year */}
          <Link
            className="inline-flex min-h-[34px] items-center rounded-md border border-transparent bg-zinc-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 dark:bg-zinc-800 dark:text-zinc-50 hover:dark:bg-zinc-700"
            href={`/calendar/year/${year - 1}`}
          >
            <span className="sr-only">Forrige år</span>
            <ChevronLeftIcon />
          </Link>
          {/* Go to current year */}
          <Link
            className="inline-flex min-h-[34px] items-center rounded-md border border-transparent bg-zinc-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 dark:bg-zinc-800 dark:text-zinc-50 hover:dark:bg-zinc-700"
            href={`/calendar/year/${currentDate.getFullYear()}`}
          >
            I dag
          </Link>
          {/* Go to next year */}
          <Link
            className="inline-flex min-h-[34px] items-center rounded-md border border-transparent bg-zinc-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 dark:bg-zinc-800 dark:text-zinc-50 hover:dark:bg-zinc-700"
            href={`/calendar/year/${year + 1}`}
          >
            <span className="sr-only">Neste år</span>
            <ChevronRightIcon />
          </Link>
        </div>
      </div>
      <div className="my-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {calendarYear.months.map((month, index) => (
          <div key={`calendar-year-calendar-month-${index}`}>
            <Link
              href={`/calendar/year/${month.year}/month/${month.monthNumber}`}
            >
              <h2
                className={cn({
                  "underline underline-offset-2 dark:text-emerald-500":
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
