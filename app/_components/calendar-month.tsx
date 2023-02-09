import { getRequestDateNow } from "@/lib/date";
import { CalendarMonth } from "@/types";
import { getAllDaysInMonth, getCalendarMonthEntries } from "@/utils";
import { cn } from "@/utils/cssUtils";
import { addMonths } from "date-fns";
import * as React from "react";

type CalendarEntries = {
  type: "header" | "week" | "spacing" | "day";
  value: string | number | null;
  week?: number;
  isToday?: boolean;
  isOdd?: boolean;
  isHoliday?: boolean;
  isSunday?: boolean;
  isStartOfWeek?: boolean;
};

const isStriped = (index: number, showWeeks = false) => {
  if (showWeeks) {
    // the first 8 should not be striped
    // the next 8 should be striped
    // the next 8 should not be striped
    // the next 8 should be striped
    // etc.
    return index % 16 >= 8;
  }

  // the first 7 should not be striped
  // the next 7 should be striped
  // the next 7 should not be striped
  // the next 7 should be striped
  // etc.
  return index % 14 >= 7;
};

const CalendarMonth: React.FC<{ month: CalendarMonth; big?: boolean }> = ({
  month,
  big = false,
  ...other
}) => {
  const currentDate = getRequestDateNow();
  const showWeeks = true && !big;
  const lastMonth = getAllDaysInMonth(addMonths(month.days[0].date, -1));
  const holidayInfos = month.days.filter((day) => day.holidayInformation);

  const calendarEntries = getCalendarMonthEntries(
    month,
    currentDate,
    showWeeks
  );

  return (
    <div className="">
      <div
        className={cn("grid", {
          "grid-cols-8": showWeeks,
          "grid-cols-7": !showWeeks,
        })}
      >
        {calendarEntries.map((calendarDay, index) => (
          <div
            key={index}
            className={cn("flex flex-col border border-transparent", {
              "text-emerald-500": calendarDay.isToday,
              "text-red-500": calendarDay.isHoliday || calendarDay.isSunday,
              "text-zinc-500":
                calendarDay.type === "spacing" ||
                calendarDay.type === "week" ||
                calendarDay.type === "header",
              "bg-zinc-800": calendarDay.isOdd,
              "min-h-[50px] md:min-h-[112px]":
                big &&
                (calendarDay.type === "day" || calendarDay.type === "spacing"),
              "items-end justify-start py-1 px-1 md:py-2 md:px-3": big,
              "min-h-[34px] items-center justify-center": !big,
            })}
          >
            <div
              className={cn("flex", {
                "w-full items-center justify-end pb-1.5 md:pb-2":
                  big &&
                  (calendarDay.type === "day" ||
                    calendarDay.type === "spacing"),
                "justify-between": big && calendarDay.isStartOfWeek,
              })}
            >
              {big && calendarDay.isStartOfWeek ? (
                <div className="text-xs text-zinc-600 md:text-base">
                  {calendarDay.week}
                </div>
              ) : null}
              <div>{calendarDay.value}</div>
            </div>
            {big &&
              (calendarDay.type === "day" || calendarDay.type === "spacing") &&
              holidayInfos
                .filter(
                  (x) =>
                    x.day === calendarDay.value &&
                    x.weekNumber === calendarDay.week &&
                    !!x?.holidayInformation?.name
                )
                .map((x) => (
                  <div className="w-full" key={x.date.toISOString()}>
                    <div className="hidden rounded-md bg-indigo-900 px-2 py-1 text-xs leading-tight text-white md:block">
                      {x.holidayInformation?.name}
                    </div>
                    <div className="block h-2 w-full rounded-full border border-indigo-900 bg-indigo-900 md:hidden"></div>
                  </div>
                ))}
          </div>
        ))}
      </div>
      {holidayInfos.length ? (
        <div className="mt-4">
          {holidayInfos.map((day, index) => (
            <div
              className="mr-1 inline-flex text-xs leading-tight text-zinc-400"
              key={day.date.toISOString()}
            >
              {`${day.date.getDate()}.${day.date.getMonth() + 1}: ${
                day.holidayInformation?.name
              }${holidayInfos.length === index + 1 ? "" : ","}`}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export { CalendarMonth };
