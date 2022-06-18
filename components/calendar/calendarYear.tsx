import { getAllMonthsInYear } from "@/utils/calendarUtils";
import { getYear } from "date-fns";
import * as React from "react";
import { Flex, Grid, Heading } from "../ui";
import { CalendarMonth } from "./calendarMonth";

const CalendarYear: React.FC<{ date: Date }> = ({ date }) => {
  const id = React.useId();
  const months = React.useMemo(() => getAllMonthsInYear(date), [date]);

  return (
    <Flex flexDirection="column" alignItems="center">
      <Heading size="5">{getYear(date)}</Heading>
      <Grid
        gridTemplateColumns={{
          "@initial": "1",
          "@bp2": "2",
          "@bp3": "3",
        }}
        gap="5"
      >
        {months.map((month, index) => (
          <CalendarMonth key={`calendar-year-calendar-month-${id}-${index}`} date={month} />
        ))}
      </Grid>
    </Flex>
  );
};

export { CalendarYear };
