import { useDateStore } from "@/hooks/useDate";
import { getAllMonthsInYear } from "@/utils/calendarUtils";
import { getYear } from "date-fns";
import * as React from "react";
import { Flex, Grid, Heading } from "../ui";
import { CalendarMonth } from "./calendarMonth";

const CalendarYear: React.FC<{ date: Date }> = ({ date }) => {
  const { now } = useDateStore();
  const months = React.useMemo(() => getAllMonthsInYear(date), [date]);

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      css={{
        padding: "0 $3",
        maxWidth: "$lgContainer",
        margin: "0 auto",
      }}
    >
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
          <CalendarMonth key={`calendar-year-calendar-month-${index}`} date={month} />
        ))}
      </Grid>
    </Flex>
  );
};

export { CalendarYear };
