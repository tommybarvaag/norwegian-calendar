import type { Metadata } from "next";
import Link from "next/link";
import { CalendarMonth } from "@/app/_components/calendar-month";
import { getCalendarMonth } from "@/utils";
import { capitalize, getAbsoluteUrl } from "@/utils/common-utils";
import { getFormattedMonth } from "@/utils/date-utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

import { getRequestDateNow } from "@/lib/date";
import { MonthSelect } from "./month-select";

interface SelectedYearMonthPageProps {
  params: { year: string; month: string };
}

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export function generateMetadata({
  params,
}: SelectedYearMonthPageProps): Metadata {
  const formattedMonth = getFormattedMonth(
    new Date(+params.year, +params.month)
  );

  const title = `${capitalize(formattedMonth)} ${params.year}`;
  const description = `Norsk kalender med helligdager, ferier og mer for ${formattedMonth} ${params.year}. Helt gratis, uten reklame og uten registrering.`;

  const url = getAbsoluteUrl();

  let ogUrl = new URL(`${url}/api/og/calendar`);
  ogUrl.searchParams.set("year", params.year);
  ogUrl.searchParams.set("month", params.month);
  ogUrl.searchParams.set("mode", "dark");

  return {
    title,
    description,
    twitter: {
      title,
      description,
      images: [ogUrl],
      card: "summary_large_image",
    },
    openGraph: {
      title: {
        default: title,
        template: "%s | Norsk kalender med helligdager",
      },
      description,
      url: getAbsoluteUrl(
        `/calendar/year/${params.year}/month/${params.month}`
      ),
      type: "website",
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: `Kalender for ${title}`,
        },
      ],
    },
  };
}

export default async function SelectedYearMonthPage({
  params,
}: SelectedYearMonthPageProps) {
  const currentDate = getRequestDateNow();

  const date = new Date(
    +(params.year ?? currentDate.getFullYear()),
    +params.month
  );
  const month = getCalendarMonth(date);

  return (
    <div className="grow">
      <div className="flex items-center justify-between">
        <div>
          <h1>Kalender {month.year}</h1>
          <MonthSelect
            year={month.year}
            month={month.monthNumber}
            isSelected={
              currentDate.getMonth() === month.days[0].date.getMonth() &&
              currentDate.getFullYear() === month.days[0].date.getFullYear()
            }
          />
        </div>
        <div className="flex items-center gap-2">
          {/* Go to previous month
  if month.MonthNumber is 0, go to previous year and month 11 */}
          <Link
            className="inline-flex min-h-[34px] items-center rounded-md border border-transparent bg-zinc-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 dark:bg-zinc-800 dark:text-zinc-50 hover:dark:bg-zinc-700"
            href={`/calendar/year/${
              month.monthNumber === 0 ? month.year - 1 : month.year
            }/month/${month.monthNumber === 0 ? 11 : month.monthNumber - 1}`}
          >
            <span className="sr-only">Forrige måned</span>
            <ChevronLeftIcon />
          </Link>
          {/* Go to current month */}
          <Link
            className="inline-flex min-h-[34px] items-center rounded-md border border-transparent bg-zinc-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 dark:bg-zinc-800 dark:text-zinc-50 hover:dark:bg-zinc-700"
            href={`/calendar/year/${currentDate.getFullYear()}/month/${currentDate.getMonth()}`}
          >
            <span className="">I dag</span>
          </Link>
          {/* Go to next month
          if month.MonthNumber is 11, go to next year and month 0 */}
          <Link
            className="inline-flex min-h-[34px] items-center rounded-md border border-transparent bg-zinc-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 dark:bg-zinc-800 dark:text-zinc-50 hover:dark:bg-zinc-700"
            href={`/calendar/year/${
              month.monthNumber === 11 ? month.year + 1 : month.year
            }/month/${month.monthNumber === 11 ? 0 : month.monthNumber + 1}`}
          >
            <span className="sr-only">Neste måned</span>
            <ChevronRightIcon />
          </Link>
        </div>
      </div>
      <CalendarMonth month={month} big />
    </div>
  );
}
