import { getRequestDateNow } from "@/lib/date";
import { CalendarMonth } from "@/types";
import { getAllDaysInMonth } from "@/utils";
import { cn } from "@/utils/cssUtils";
import { getWeek } from "@/utils/dateUtils";
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

  const calendarEntries = month.days.reduce<CalendarEntries[]>(
    (acc, day, index) => {
      // if index is 0, we are on the first day of the month
      // first we need to add header days
      // then we need to add week number
      // then we need to add spacing days
      if (index === 0) {
        (showWeeks
          ? ["uke", "man.", "tir.", "ons.", "tor.", "fre.", "lør.", "søn."]
          : ["man.", "tir.", "ons.", "tor.", "fre.", "lør.", "søn."]
        ).forEach((value) => {
          acc.push({
            type: "header",
            value,
            isOdd: isStriped(acc.length, showWeeks),
          });
        });
      }

      // render week number
      if (showWeeks && acc.length % (showWeeks ? 8 : 7) === 0) {
        acc.push({
          type: "week",
          value: getWeek(day.date),
          isOdd: isStriped(acc.length, showWeeks),
        });
      }

      // render spacing days for month
      // week starts on monday
      // so if first date is a wednesday, we need to render two days of spacing
      if (index === 0) {
        const spacingDays = {
          0: 6,
          1: 0,
          2: 1,
          3: 2,
          4: 3,
          5: 4,
          6: 5,
          7: 6,
        }[day.date.getDay()];

        for (let i = 0; i < spacingDays; i++) {
          acc.push({
            type: "spacing",
            // we use date from last month to render spacing days
            value: lastMonth[lastMonth.length - (spacingDays - i)].getDate(),
            week: getWeek(day.date),
            isOdd: isStriped(acc.length, showWeeks),
            isStartOfWeek: acc.length % (showWeeks ? 8 : 7) === 0,
          });
        }
      }

      // render day
      acc.push({
        type: "day",
        value: day.date.getDate(),
        week: getWeek(day.date),
        isToday:
          day.date.getDate() === currentDate.getDate() &&
          day.date.getMonth() === currentDate.getMonth() &&
          day.date.getFullYear() === currentDate.getFullYear(),
        isOdd: isStriped(acc.length, showWeeks),
        isHoliday: day.isHoliday,
        isSunday: day.isSunday,
        isStartOfWeek: acc.length % (showWeeks ? 8 : 7) === 0,
      });

      // if index is last day of month, we need to add spacing days
      if (index === month.days.length - 1) {
        const spacingDays = {
          0: 0,
          1: 6,
          2: 5,
          3: 4,
          4: 3,
          5: 2,
          6: 1,
          7: 0,
        }[day.date.getDay()];
        for (let i = 0; i < spacingDays; i++) {
          acc.push({
            type: "spacing",
            value: i + 1,
            week: getWeek(day.date),
            isOdd: isStriped(acc.length, showWeeks),
            isStartOfWeek: acc.length % (showWeeks ? 8 : 7) === 0,
          });
        }
      }

      return acc;
    },
    [] as CalendarEntries[]
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
