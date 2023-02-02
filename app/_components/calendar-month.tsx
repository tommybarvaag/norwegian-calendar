import { getRequestDateNow } from "@/lib/date";
import { CalendarMonth } from "@/types";
import { getAllDaysInMonth } from "@/utils";
import { cn } from "@/utils/cssUtils";
import { addMonths, getWeek } from "date-fns";
import * as React from "react";

type CalendarEntries = {
  type: "header" | "week" | "spacing" | "day";
  value: string | number | null;
  isToday?: boolean;
  isOdd?: boolean;
  isHoliday?: boolean;
  isSunday?: boolean;
};

const isStriped = (index: number) => {
  // the first 8 should not be striped
  // the next 8 should be striped
  // the next 8 should not be striped
  // the next 8 should be striped
  // etc.
  return index % 16 >= 8;
};

const CalendarMonth: React.FC<{ month: CalendarMonth }> = ({
  month,
  ...other
}) => {
  const currentDate = getRequestDateNow();
  const showWeeks = true;
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
            isOdd: isStriped(acc.length),
          });
        });
      }

      // render week number
      if (showWeeks && acc.length % (showWeeks ? 8 : 7) === 0) {
        acc.push({
          type: "week",
          value: getWeek(day.date),
          isOdd: isStriped(acc.length),
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
            isOdd: isStriped(acc.length),
          });
        }
      }

      // render day
      acc.push({
        type: "day",
        value: day.date.getDate(),
        isToday:
          day.date.getDate() === currentDate.getDate() &&
          day.date.getMonth() === currentDate.getMonth() &&
          day.date.getFullYear() === currentDate.getFullYear(),
        isOdd: isStriped(acc.length),
        isHoliday: day.isHoliday,
        isSunday: day.isSunday,
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
            isOdd: isStriped(acc.length),
          });
        }
      }

      return acc;
    },
    [] as CalendarEntries[]
  );

  return (
    <div className="">
      <h3
        className={cn({
          "text-emerald-500":
            currentDate.getMonth() === month.days[0].date.getMonth() &&
            currentDate.getFullYear() === month.days[0].date.getFullYear(),
        })}
      >
        {month.month}
      </h3>
      <div
        className={cn("grid", {
          "grid-cols-8": showWeeks,
          "grid-cols-7": !showWeeks,
        })}
      >
        {calendarEntries.map((calendarDay, index) => (
          <div
            key={index}
            className={cn(
              "flex min-h-[34px] items-center justify-center border border-transparent",
              {
                "border-emerald-500 text-emerald-500": calendarDay.isToday,
                "text-red-500": calendarDay.isHoliday || calendarDay.isSunday,
                "text-zinc-500":
                  calendarDay.type === "spacing" ||
                  calendarDay.type === "week" ||
                  calendarDay.type === "header",
                "bg-zinc-800": calendarDay.isOdd,
              }
            )}
          >
            {calendarDay.value}
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
