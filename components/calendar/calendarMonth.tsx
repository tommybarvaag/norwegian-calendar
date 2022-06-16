import type { CalendarDay as CalendarDayType } from "@/types";
import { getCalendarYear } from "@/utils/calendarUtils";
import { getWeek } from "@/utils/dateUtils";
import { getMonth, getYear, startOfISOWeek } from "date-fns";
import * as React from "react";
import { Box, Card, Flex, Grid, Heading } from "../ui";
import { CalendarDay } from "./calendarDay";
import { CalendarDayHeading } from "./calendarDayHeading";

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

  const renderSpacingDays = (days: CalendarDayType[]): JSX.Element[] | null => {
    if (days === null || days === undefined || days?.length <= 0) {
      return null;
    }

    const spacingDaysToRender: Record<string, number> = {
      MONDAY: 0,
      TUESDAY: 1,
      WEDNESDAY: 2,
      THURSDAY: 3,
      FRIDAY: 4,
      SATURDAY: 5,
      SUNDAY: 6,
    };

    return [...Array(spacingDaysToRender[days[0].name?.toUpperCase()] ?? 0)].map((key, index) => <div key={`calendar-day-spacing-${index}`} />);
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
      <Heading textAlign="center">{selectedMonth?.month}</Heading>
      <Grid
        as={Card}
        gridTemplateColumns="8"
        gap="1"
        css={{
          position: "relative",
          display: "grid",
          padding: "$1",
          minHeight: "315px",
          my: "$3",
          mx: "auto",
          "@bp1": {
            padding: "$2",
          },
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
        <Flex justifyContent="center">{getWeek(selectedMonth?.days[0].date, "nb")}</Flex>
        {renderSpacingDays(selectedMonth?.days)}
        {selectedMonth?.days?.map((day, i) => (
          <>
            {startOfISOWeek(day.date).getTime() === day.date.getTime() ? <Flex justifyContent="center">{getWeek(day.date, "nb")}</Flex> : null}
            <CalendarDay key={`calendar-day-${i}`} day={day} isWorkDay={day.isWorkDay} />
          </>
        ))}
      </Grid>
    </Box>
  );
};

export { CalendarMonth };
