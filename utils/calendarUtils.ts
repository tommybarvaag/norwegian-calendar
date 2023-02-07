import { CalendarDay, CalendarMonth, Holiday } from "@/types";
import { isString, memoize, range } from "@/utils/commonUtils";
import {
  getFormattedDate,
  getFormattedDay,
  getFormattedDayAndMonth,
  getFormattedLongDate,
  getFormattedMonth,
  getFormattedShortDate,
  getWeek,
} from "@/utils/dateUtils";
import {
  addDays,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  endOfISOWeek,
  endOfMonth,
  endOfYear,
  getDate,
  getDay,
  getYear,
  isLeapYear,
  startOfISOWeek,
  startOfMonth,
  startOfYear,
  subDays,
} from "date-fns";
import { enUS, nb } from "date-fns/locale";

export const isWorkDay = (day: CalendarDay): boolean =>
  (!day?.isHoliday ?? false) &&
  day?.name?.toUpperCase() !== "SATURDAY" &&
  day?.name?.toUpperCase() !== "SUNDAY";

export const getLocale = (locale: string): Locale => {
  if (!isString(locale)) {
    return nb;
  }

  switch (locale.toLowerCase()) {
    case "nb":
    case "nn":
    case "nb-no":
    case "nn-no":
      return nb;
    case "en":
      return enUS;
    case "en-us":
      return enUS;
    case "en-gb":
      return enUS;

    default:
      return nb;
  }
};

export const getWeekStarsOn = (locale: string): 0 | 1 => {
  if (!isString(locale)) {
    return 0;
  }

  switch (locale) {
    case "nb":
    case "nn":
    case "nb-no":
    case "nn-no":
      return 1;

    default:
      return 0;
  }
};

const getEaster = (year: number): Date => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const n0 = h + l + 7 * m + 114;
  const n = Math.floor(n0 / 31) - 1;
  const p = (n0 % 31) + 1;
  return new Date(year, n, p);
};

export const getFirstDayOfYear = (year: number): Date => new Date(year, 0, 1);

export const yearIsLeapYear = (year: number): boolean =>
  isLeapYear(getFirstDayOfYear(year));

export const getAllWeeksInYear = (date: Date, locale: string): Date[] => {
  const l = getLocale(locale);

  return eachWeekOfInterval(
    {
      start: startOfYear(date),
      end: endOfYear(date),
    },
    { locale: l, weekStartsOn: getWeekStarsOn(l?.code) }
  );
};

export const getAllDaysInWeek = (date: Date): Date[] =>
  eachDayOfInterval({
    start: startOfISOWeek(date),
    end: endOfISOWeek(date),
  });

export const getAllDaysInMonth = (date: Date): Date[] =>
  eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });

export const getAllMonthsInYear = (date: Date): Date[] =>
  eachMonthOfInterval({
    start: startOfYear(date),
    end: endOfYear(date),
  });

const getNorwegianHolidays = memoize(function (year: number): Holiday[] {
  const newYearsDay = startOfYear(getFirstDayOfYear(year));
  const easter = getEaster(year);
  const palmSunday = subDays(easter, 7);
  const maundyThursday = subDays(easter, 3);
  const goodFriday = subDays(easter, 2);
  const easterMonday = addDays(easter, 1);
  const labourDay = new Date(year, 4, 1);
  const constitutionDay = new Date(year, 4, 17);
  const ascensionDay = addDays(easter, 39);
  const whitsun = addDays(easter, 49);
  const whitMonday = addDays(easter, 50);
  const christmasDay = new Date(year, 11, 25);
  const stStephensDay = new Date(year, 11, 26);

  return [
    createHoliday("1. nyttårsdag", newYearsDay),
    createHoliday("Palmesøndag", palmSunday),
    createHoliday("Skjærtorsdag", maundyThursday),
    createHoliday("Langfredag", goodFriday),
    createHoliday("1. påskedag", easter),
    createHoliday("2. påskedag", easterMonday),
    createHoliday("Arbeidernes dag", labourDay),
    createHoliday("Grunnlovsdag", constitutionDay),
    createHoliday("Kristi Himmelfartsdag", ascensionDay),
    createHoliday("1. pinsedag", whitsun),
    createHoliday("2. pinsedag", whitMonday),
    createHoliday("1. juledag", christmasDay),
    createHoliday("2. juledag", stStephensDay),
  ];
});

const getNorwegianHolidaysDictionary = memoize(function (
  year: number
): Record<string, Holiday> {
  return getNorwegianHolidays(year).reduce(
    (result, norwegianHoliday) => ({
      ...result,
      [getFormattedDate(norwegianHoliday.date)]: norwegianHoliday,
    }),
    {}
  );
});

const getHolidayInformation = (date: Date) => {
  const norwegianHolidays = getNorwegianHolidaysDictionary(getYear(date));

  const formattedDate = getFormattedDate(date);
  const isHoliday = formattedDate in norwegianHolidays;

  return {
    isHoliday,
    holidayInformation: isHoliday
      ? {
          name: norwegianHolidays[formattedDate].name,
          shortDate: getFormattedDayAndMonth(date),
        }
      : undefined,
  };
};

const createHoliday = (name: string, date: Date): Holiday => ({
  name,
  date,
  formattedShortDate: getFormattedShortDate(date),
  formattedLongDate: getFormattedLongDate(date),
});

export const createDate = (date: Date, locale?: string): CalendarDay => {
  const { isHoliday, holidayInformation } = getHolidayInformation(date);

  const modifiedDate = {
    date,
    day: getDate(date),
    name: getFormattedDay(date, locale),
    weekNumber: getWeek(date, locale),
    formattedDate: getFormattedDate(date, locale),
    formattedShortDate: getFormattedShortDate(date, locale),
    formattedLongDate: getFormattedLongDate(date, locale),
    isHoliday,
    holidayInformation,
    isSunday: getDay(date) === 0 && !isHoliday,
  };

  return {
    ...modifiedDate,
    isWorkDay: isWorkDay(modifiedDate),
  };
};

export const getCalendarYear = (year: number, locale?: string) => {
  const date = getFirstDayOfYear(year);
  const allMonthsInYear = getAllMonthsInYear(date);

  return {
    year,
    isLeapYear: yearIsLeapYear(year),
    months: allMonthsInYear.map<CalendarMonth>((monthDate) => {
      const month = getFormattedMonth(monthDate, locale);
      return {
        month,
        days: getAllDaysInMonth(monthDate).map((date) =>
          createDate(date, locale)
        ),
      };
    }),
  };
};

export const getStaticYearRange = () => {
  const date = new Date();
  return range(date.getFullYear() - 10, date.getFullYear() + 50);
};
