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
    <main className="relative mb-12 mt-8 flex w-full max-w-5xl grow flex-col items-center justify-center gap-16 px-4 md:mt-20 lg:mx-auto lg:mb-24 lg:mt-32 lg:flex-row">
      <aside className="flex self-start">
        <YearNav dateString={date.toISOString()} />
      </aside>
      {children}
    </main>
  );
}
