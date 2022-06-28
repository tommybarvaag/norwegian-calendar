import { useDateStore } from "@/hooks/useDate";
import type { CalendarDay as CalendarDayType } from "@/types";
import { getCalendarYear } from "@/utils/calendarUtils";
import { getDayName, getWeek } from "@/utils/dateUtils";
import { getDate, getDay, getMonth, getYear, startOfISOWeek } from "date-fns";
import * as React from "react";
import { Box, Card, Flex, Grid, Heading, Text } from "../ui";
import { CalendarEntry } from "./calendarDay";
import { CalendarDayHeading } from "./calendarDayHeading";

const getDayOfCurrentWeek = (day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday") => {
  const dayOfCurrentWeek: Record<string, number> = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7,
  };

  const today = new Date();
  const first = today.getDate() - today.getDay() + dayOfCurrentWeek[day];

  const monday = new Date(today.setDate(first));
  return monday;
};

const getSpacingDaysToRender = (days: CalendarDayType[]) => {
  const spacingDaysToRender: Record<string, number> = {
    0: 6,
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
  };

  return spacingDaysToRender[days?.[0]?.date?.getDay()] ?? 0;
};

const CalendarMonth: React.FC<{ date: Date }> = ({ date, ...other }) => {
  const { now } = useDateStore();

  const { currentDate, currentMonth } = React.useMemo(
    () => ({
      currentDate: getDate(now),
      currentMonth: getMonth(now),
    }),
    [now]
  );

  const { year, month } = React.useMemo(
    () => ({
      year: getYear(date),
      month: getMonth(date),
    }),
    [date]
  );

  const { selectedYear, selectedMonth } = React.useMemo(() => {
    const data = getCalendarYear(year, "nb-NO");

    return {
      selectedYear: data,
      selectedMonth: data?.months?.[month],
    };
  }, [year, month]);

  const renderSpacingDays = (days: CalendarDayType[], number?: number) =>
    [...Array(number ?? getSpacingDaysToRender(days))].map((key, index) => <CalendarEntry key={`calendar-day-spacing-${index}`}>&nbsp;</CalendarEntry>);

  const renderClosingSpacingDays = (days: CalendarDayType[], number?: number) => {
    // get last item
    const lastItem = days[days.length - 1];
    const daysToRender = 7 - getDay(lastItem.date);
    return [...Array(daysToRender > 0 ? daysToRender : 0)].map((key, index) => <CalendarEntry key={`calendar-day-spacing-${index}`}>&nbsp;</CalendarEntry>);
  };

  return (
    <Box
      css={{
        position: "relative",
        width: "100%",
        userSelect: "none",
      }}
      {...other}
    >
      <Heading
        textAlign="center"
        css={{
          color: currentMonth === month ? "$teal9" : "$text",
        }}
      >
        {selectedMonth?.month}
      </Heading>
      <Grid
        as={Card}
        gridTemplateColumns="8"
        css={{
          position: "relative",
          display: "grid",
          padding: "0",
          "> div:nth-child(16n+9)": {
            backgroundColor: currentMonth === month ? "$teal3" : "$gray4",
          },
          "> div:nth-child(16n+10)": {
            backgroundColor: currentMonth === month ? "$teal3" : "$gray4",
          },
          "> div:nth-child(16n+11)": {
            backgroundColor: currentMonth === month ? "$teal3" : "$gray4",
          },
          "> div:nth-child(16n+12)": {
            backgroundColor: currentMonth === month ? "$teal3" : "$gray4",
          },
          "> div:nth-child(16n+13)": {
            backgroundColor: currentMonth === month ? "$teal3" : "$gray4",
          },
          "> div:nth-child(16n+14)": {
            backgroundColor: currentMonth === month ? "$teal3" : "$gray4",
          },
          "> div:nth-child(16n+15)": {
            backgroundColor: currentMonth === month ? "$teal3" : "$gray4",
          },
          "> div:nth-child(16n+16)": {
            backgroundColor: currentMonth === month ? "$teal3" : "$gray4",
          },
          "> div:nth-child(16n+88)": {
            backgroundColor: currentMonth === month ? "$teal3" : "$gray4",
          },
        }}
      >
        <CalendarDayHeading
          css={{
            color: "$textDark",
          }}
        >
          uke
        </CalendarDayHeading>
        <CalendarDayHeading>{getDayName(getDayOfCurrentWeek("monday"), "nb-NO")}</CalendarDayHeading>
        <CalendarDayHeading>{getDayName(getDayOfCurrentWeek("tuesday"), "nb-NO")}</CalendarDayHeading>
        <CalendarDayHeading>{getDayName(getDayOfCurrentWeek("wednesday"), "nb-NO")}</CalendarDayHeading>
        <CalendarDayHeading>{getDayName(getDayOfCurrentWeek("thursday"), "nb-NO")}</CalendarDayHeading>
        <CalendarDayHeading>{getDayName(getDayOfCurrentWeek("friday"), "nb-NO")}</CalendarDayHeading>
        <CalendarDayHeading>{getDayName(getDayOfCurrentWeek("saturday"), "nb-NO")}</CalendarDayHeading>
        <CalendarDayHeading>{getDayName(getDayOfCurrentWeek("sunday"), "nb-NO")}</CalendarDayHeading>
        <CalendarEntry isWeekNumber>{getWeek(selectedMonth?.days[0].date, "nb")}</CalendarEntry>
        {renderSpacingDays(selectedMonth?.days)}
        {selectedMonth?.days?.map((day, i) => {
          return (
            <>
              {i !== 0 && startOfISOWeek(day.date).getTime() === day.date.getTime() ? (
                <CalendarEntry key={`calendar-week-${i}`} isWeekNumber>
                  {getWeek(day.date, "nb")}
                </CalendarEntry>
              ) : null}
              <CalendarEntry
                key={`calendar-day-${i}`}
                isWorkDay={day.isWorkDay}
                isSunday={day.isSunday}
                isHoliday={day.isHoliday}
                isToday={currentMonth === month && day.day === currentDate}
              >
                {day.day}
              </CalendarEntry>
            </>
          );
        })}
        {renderClosingSpacingDays(selectedMonth?.days)}
      </Grid>
      <Flex
        css={{
          maxWidth: "95%",
          margin: "$3 auto 0",
        }}
      >
        <Text size="tiny">
          {selectedMonth?.days
            ?.filter((day) => day.isHoliday)
            .map((day) => `${day.holidayInformation.shortDate}: ${day.holidayInformation.name}`)
            .join(", ")}
        </Text>
      </Flex>
    </Box>
  );
};

export { CalendarMonth };
