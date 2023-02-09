import type { NextPage } from "next";

export type NorwegianCalendarNextPage<P = {}> = NextPage<P> & {
  layoutProps: PageLayoutProps;
};

export type PageLayoutProps = {
  Layout: React.ComponentType<any>;
  meta: {
    title: string;
  };
};

export type CalendarHolidayInformation = {
  name: string;
  shortDate: string;
};

export type CalendarYear = {
  year: number;
  isLeapYear: boolean;
  months: CalendarMonth[];
};

export type CalendarMonth = {
  month: string;
  monthNumber: number;
  year: number;
  days: CalendarDay[];
  payDay?: CalendarDay;
};

export type CalendarDay = {
  date: Date;
  day: number;
  name: string;
  weekNumber: number;
  formattedDate: string;
  formattedShortDate: string;
  formattedLongDate: string;
  holidayInformation?: CalendarHolidayInformation;
  isHoliday: boolean;
  isWorkDay?: boolean;
  isSunday?: boolean;
};

export type Holiday = {
  name: string;
  date: Date;
  formattedShortDate: string;
  formattedLongDate: string;
};

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
