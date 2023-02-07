import { getRequestDateNow } from "@/lib/date";
import { CalendarYear } from "../_components/calendar-year";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata() {
  const date = getRequestDateNow();
  const year = date.getFullYear().toString();

  return {
    title: date.getFullYear().toString(),
    description: `Norsk kalender med helligdager, ferier og mer for ${year}. Helt gratis, uten reklame og uten registrering.`,
  };
}

export default async function RootPage() {
  const date = getRequestDateNow();
  return (
    <>
      <CalendarYear date={date} />
    </>
  );
}
