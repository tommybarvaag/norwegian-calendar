export type CalendarYear = {
  year: number;
  isLeapYear: boolean;
  months: CalendarMonth[];
};

export type CalendarMonth = {
  month: string;
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
  isHoliday: boolean;
  isWorkDay?: boolean;
};

export type Holiday = {
  name: string;
  date: Date;
  formattedShortDate: string;
  formattedLongDate: string;
};
