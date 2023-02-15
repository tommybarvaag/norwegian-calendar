import { getRequestDateNow } from "@/lib/date";
import { CalendarYear } from "./_components/calendar-year";
import { YearNav } from "./_components/year-nav";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function RootPage() {
  const date = getRequestDateNow();

  return (
    <>
      <aside className="flex self-start">
        <YearNav dateString={date.toISOString()} />
      </aside>
      <main className="w-full max-w-4xl grow">
        <CalendarYear date={date} />
      </main>
    </>
  );
}
