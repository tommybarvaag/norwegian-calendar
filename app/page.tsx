import { getRequestDateNow } from "@/lib/date";
import { CalendarYear } from "./_components/calendar-year";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function RootPage() {
  const date = getRequestDateNow();

  return (
    <>
      <CalendarYear date={date} />
    </>
  );
}
