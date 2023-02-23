import { CalendarDay, CalendarEntries, CalendarMonth, Holiday } from "@/types";
import { isString, memoize, range } from "@/utils/common-utils";
import {
  getFormattedDate,
  getFormattedDay,
  getFormattedDayAndMonth,
  getFormattedLongDate,
  getFormattedMonth,
  getFormattedShortDate,
  getWeek,
} from "@/utils/date-utils";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  endOfISOWeek,
  endOfMonth,
  endOfYear,
  getDate,
  getDay,
  getMonth,
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

export const getLocale = (locale: string | undefined): Locale => {
  if (!locale || !isString(locale)) {
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

export const getWeekStarsOn = (locale: string | undefined): 0 | 1 => {
  if (!isString(locale)) {
    return 1;
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

export const getCalendarMonth = (
  date: Date,
  locale?: string
): CalendarMonth => {
  const month = getFormattedMonth(date, locale);
  return {
    month,
    monthNumber: getMonth(date),
    year: getYear(date),
    days: getAllDaysInMonth(date).map((date) => createDate(date, locale)),
  };
};

export const getCalendarYear = (year: number, locale?: string) => {
  const date = getFirstDayOfYear(year);
  const allMonthsInYear = getAllMonthsInYear(date);

  return {
    year,
    isLeapYear: yearIsLeapYear(year),
    months: allMonthsInYear.map((date) => getCalendarMonth(date, locale)),
  };
};

export const getStaticYearRange = () => {
  const date = new Date();
  return range(date.getFullYear() - 10, date.getFullYear() + 50);
};

const isStriped = (index: number, showWeeks = false) => {
  if (showWeeks) {
    // the first 8 should not be striped
    // the next 8 should be striped
    // the next 8 should not be striped
    // the next 8 should be striped
    // etc.
    return index % 16 >= 8;
  }

  // the first 7 should not be striped
  // the next 7 should be striped
  // the next 7 should not be striped
  // the next 7 should be striped
  // etc.
  return index % 14 >= 7;
};

export const getCalendarMonthEntries = (
  month: CalendarMonth,
  currentDate: Date,
  showWeeks = true
) => {
  const lastMonth = getAllDaysInMonth(addMonths(month.days[0].date, -1));

  const calendarEntries = month.days.reduce<CalendarEntries[]>(
    (acc, day, index) => {
      // if index is 0, we are on the first day of the month
      // first we need to add header days
      // then we need to add week number
      // then we need to add spacing days
      if (index === 0) {
        (showWeeks
          ? ["uke", "man.", "tir.", "ons.", "tor.", "fre.", "lør.", "søn."]
          : ["man.", "tir.", "ons.", "tor.", "fre.", "lør.", "søn."]
        ).forEach((value) => {
          acc.push({
            type: "header",
            value,
            isOdd: isStriped(acc.length, showWeeks),
          });
        });
      }

      // render week number
      if (showWeeks && acc.length % (showWeeks ? 8 : 7) === 0) {
        acc.push({
          type: "week",
          value: getWeek(day.date),
          isOdd: isStriped(acc.length, showWeeks),
        });
      }

      // render spacing days for month
      // week starts on monday
      // so if first date is a wednesday, we need to render two days of spacing
      if (index === 0) {
        const spacingDays =
          {
            0: 6,
            1: 0,
            2: 1,
            3: 2,
            4: 3,
            5: 4,
            6: 5,
            7: 6,
          }[day.date.getDay()] ?? 0;

        for (let i = 0; i < spacingDays; i++) {
          acc.push({
            type: "spacing",
            // we use date from last month to render spacing days
            value: lastMonth[lastMonth.length - (spacingDays - i)].getDate(),
            week: getWeek(day.date),
            isOdd: isStriped(acc.length, showWeeks),
            isStartOfWeek: acc.length % (showWeeks ? 8 : 7) === 0,
          });
        }
      }

      // render day
      acc.push({
        type: "day",
        value: day.date.getDate(),
        week: getWeek(day.date),
        isToday:
          day.date.getDate() === currentDate.getDate() &&
          day.date.getMonth() === currentDate.getMonth() &&
          day.date.getFullYear() === currentDate.getFullYear(),
        isOdd: isStriped(acc.length, showWeeks),
        isHoliday: day.isHoliday,
        isSunday: day.isSunday,
        isStartOfWeek: acc.length % (showWeeks ? 8 : 7) === 0,
      });

      // if index is last day of month, we need to add spacing days
      if (index === month.days.length - 1) {
        const spacingDays =
          {
            0: 0,
            1: 6,
            2: 5,
            3: 4,
            4: 3,
            5: 2,
            6: 1,
            7: 0,
          }[day.date.getDay()] ?? 0;
        for (let i = 0; i < spacingDays; i++) {
          acc.push({
            type: "spacing",
            value: i + 1,
            week: getWeek(day.date),
            isOdd: isStriped(acc.length, showWeeks),
            isStartOfWeek: acc.length % (showWeeks ? 8 : 7) === 0,
          });
        }
      }

      return acc;
    },
    [] as CalendarEntries[]
  );

  return calendarEntries;
};
