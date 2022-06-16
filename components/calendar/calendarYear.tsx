import { getAllMonthsInYear } from "@/utils/calendarUtils";
import * as React from "react";
import { Grid } from "../ui";
import { CalendarMonth } from "./calendarMonth";

const CalendarYear: React.FC<{ date: Date }> = ({ date }) => {
  const id = React.useId();
  const months = React.useMemo(() => getAllMonthsInYear(date), [date]);

  return (
    <Grid gridTemplateColumns="3">
      {months.map((month, index) => (
        <CalendarMonth key={`calendar-year-calendar-month-${id}-${index}`} date={month} />
      ))}
    </Grid>
  );
};

export { CalendarYear };
