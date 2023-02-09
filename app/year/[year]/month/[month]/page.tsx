import { CalendarMonth } from "@/app/_components/calendar-month";
import { getRequestDateNow } from "@/lib/date";
import { getCalendarMonth } from "@/utils";
import { capitalize, getAbsoluteUrl } from "@/utils/commonUtils";
import { cn } from "@/utils/cssUtils";
import { getFormattedMonth } from "@/utils/dateUtils";
import Link from "next/link";

interface SelectedYearPageProps {
  params: { year: string; month: string };
}

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({ params }: SelectedYearPageProps) {
  const formattedMonth = getFormattedMonth(
    new Date(+params.year, +params.month)
  );

  const title = `${capitalize(formattedMonth)} ${params.year}`;
  const description = `Norsk kalender med helligdager, ferier og mer for ${formattedMonth} ${params.year}. Helt gratis, uten reklame og uten registrering.`;

  const url = getAbsoluteUrl();

  let ogUrl = new URL(`${url}/api/og`);
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
      title,
      description,
      url: getAbsoluteUrl(`/year/${params.year}/month/${params.month}`),
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
}: SelectedYearPageProps) {
  const currentDate = getRequestDateNow();

  const date = new Date(
    +(params.year ?? currentDate.getFullYear()),
    +params.month
  );
  const month = getCalendarMonth(date);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1>Kalender {month.year}</h1>
          <h2
            className={cn({
              "text-emerald-500":
                currentDate.getMonth() === month.days[0].date.getMonth() &&
                currentDate.getFullYear() === month.days[0].date.getFullYear(),
            })}
          >
            {month.month}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {/* Go to previous month
  if month.MonthNumber is 0, go to previous year and month 11 */}
          <Link
            className="inline-flex min-h-[34px] items-center rounded-md border border-transparent bg-zinc-800 px-2.5 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2"
            href={`/year/${
              month.monthNumber === 0 ? month.year - 1 : month.year
            }/month/${month.monthNumber === 0 ? 11 : month.monthNumber - 1}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="inline h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </Link>
          {/* Go to current month */}
          <Link
            className="inline-flex min-h-[34px]  items-center rounded-md border border-transparent bg-zinc-800 px-2.5 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2"
            href={`/year/${currentDate.getFullYear()}/month/${currentDate.getMonth()}`}
          >
            <span className="">I dag</span>
          </Link>
          {/* Go to next month
          if month.MonthNumber is 11, go to next year and month 0 */}
          <Link
            className="inline-flex min-h-[34px]  items-center rounded-md border border-transparent bg-zinc-800 px-2.5 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2"
            href={`/year/${
              month.monthNumber === 11 ? month.year + 1 : month.year
            }/month/${month.monthNumber === 11 ? 0 : month.monthNumber + 1}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="inline h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        </div>
      </div>
      <CalendarMonth month={month} big />
    </>
  );
}
