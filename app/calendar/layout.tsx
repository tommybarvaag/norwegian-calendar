import { getRequestDateNow } from "@/lib/date";
import "styles/global.css";
import { YearNav } from "../_components/year-nav";

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const date = getRequestDateNow();

  return (
    <>
      <aside className="flex self-start">
        <YearNav dateString={date.toISOString()} />
      </aside>
      <main className="w-full max-w-4xl grow">{children}</main>
    </>
  );
}
