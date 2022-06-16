import type { CalendarDay as CalendarDayType } from "@/types";
import { Flex } from "../ui";

const CalendarDay: React.FC<{ day: CalendarDayType; isWorkDay: boolean }> = ({ day, isWorkDay = false }) => {
  return <Flex justifyContent="center">{day.day}</Flex>;
};

export { CalendarDay };
