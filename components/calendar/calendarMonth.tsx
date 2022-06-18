import type { CalendarDay as CalendarDayType } from "@/types";
import { getCalendarYear } from "@/utils/calendarUtils";
import { getDayName, getWeek } from "@/utils/dateUtils";
import { getMonth, getYear, startOfISOWeek } from "date-fns";
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

  return (
    <Box
      css={{
        position: "relative",
        width: "100%",
        userSelect: "none",
      }}
      {...other}
    >
      <Heading textAlign="center">{selectedMonth?.month}</Heading>
      <Grid
        as={Card}
        gridTemplateColumns="8"
        css={{
          position: "relative",
          display: "grid",
          padding: "0",
          "> div:nth-child(16n+9)": {
            backgroundColor: "$gray12",
          },
          "> div:nth-child(16n+10)": {
            backgroundColor: "$gray12",
          },
          "> div:nth-child(16n+11)": {
            backgroundColor: "$gray12",
          },
          "> div:nth-child(16n+12)": {
            backgroundColor: "$gray12",
          },
          "> div:nth-child(16n+13)": {
            backgroundColor: "$gray12",
          },
          "> div:nth-child(16n+14)": {
            backgroundColor: "$gray12",
          },
          "> div:nth-child(16n+15)": {
            backgroundColor: "$gray12",
          },
          "> div:nth-child(16n+16)": {
            backgroundColor: "$gray12",
          },
          "> div:nth-child(16n+88)": {
            backgroundColor: "$gray12",
          },
        }}
      >
        <CalendarDayHeading
          css={{
            color: "$gray11",
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
              {startOfISOWeek(day.date).getTime() === day.date.getTime() ? (
                <CalendarEntry key={`calendar-week-${i}`} isWeekNumber>
                  {getWeek(day.date, "nb")}
                </CalendarEntry>
              ) : null}
              <CalendarEntry key={`calendar-day-${i}`} isWorkDay={day.isWorkDay} isSunday={day.isSunday} isHoliday={day.isHoliday}>
                {day.day}
              </CalendarEntry>
            </>
          );
        })}
        {renderSpacingDays(null, 50 - (8 + (getSpacingDaysToRender(selectedMonth?.days) ?? 0) + (selectedMonth?.days?.length ?? 0)))}
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
