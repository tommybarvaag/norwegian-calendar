import type { CalendarDay as CalendarDayType } from "@/types";
import { getCalendarYear } from "@/utils/calendarUtils";
import { getWeek } from "@/utils/dateUtils";
import { getMonth, getYear, startOfISOWeek } from "date-fns";
import * as React from "react";
import { Box, Card, Flex, Grid, Heading, Text } from "../ui";
import { CalendarEntry } from "./calendarDay";
import { CalendarDayHeading } from "./calendarDayHeading";

const getSpacingDaysToRender = (days: CalendarDayType[]) => {
  const spacingDaysToRender: Record<string, number> = {
    MONDAY: 0,
    TUESDAY: 1,
    WEDNESDAY: 2,
    THURSDAY: 3,
    FRIDAY: 4,
    SATURDAY: 5,
    SUNDAY: 6,
  };

  return spacingDaysToRender[days?.[0]?.name?.toUpperCase()] ?? 0;
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
    const data = getCalendarYear(year);

    return {
      selectedYear: data,
      selectedMonth: data?.months?.[month],
    };
  }, [year, month]);

  const renderSpacingDays = (days: CalendarDayType[]) =>
    [...Array(getSpacingDaysToRender(days))].map((key, index) => <CalendarEntry key={`calendar-day-spacing-${index}`} />);

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
        gap="1"
        css={{
          position: "relative",
          display: "grid",
          padding: "0",
        }}
      >
        <CalendarDayHeading>week</CalendarDayHeading>
        <CalendarDayHeading>mon.</CalendarDayHeading>
        <CalendarDayHeading>tue.</CalendarDayHeading>
        <CalendarDayHeading>wed.</CalendarDayHeading>
        <CalendarDayHeading>thu.</CalendarDayHeading>
        <CalendarDayHeading>fri.</CalendarDayHeading>
        <CalendarDayHeading>sat.</CalendarDayHeading>
        <CalendarDayHeading>sun.</CalendarDayHeading>
        <CalendarEntry isWeekNumber>{getWeek(selectedMonth?.days[0].date, "nb")}</CalendarEntry>
        {renderSpacingDays(selectedMonth?.days)}
        {selectedMonth?.days?.map((day, i) => (
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
        ))}
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
