import { CalendarMonth } from "@/app/_components/calendar-month";
import { getRequestDateNow } from "@/lib/date";
import { getCalendarMonth } from "@/utils";
import { capitalize } from "@/utils/commonUtils";
import { getFormattedMonth } from "@/utils/dateUtils";

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

  return {
    title: `${capitalize(formattedMonth)} ${params.year}`,
    description: `Norsk kalender med helligdager, ferier og mer for ${formattedMonth} ${params.year}. Helt gratis, uten reklame og uten registrering.`,
  };
}

export default async function SelectedYearMonthPage({
  params,
}: SelectedYearPageProps) {
  const date = new Date(
    +(params.year ?? getRequestDateNow().getFullYear()),
    +params.month
  );
  const month = getCalendarMonth(date);

  return <CalendarMonth month={month} big />;
}
