"use client";

import { FC, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/css-utils";

const YearNav: FC<{ dateString: string; year?: string; month?: string }> = ({
  dateString,
}) => {
  const path = usePathname();

  const { date, years } = useMemo(() => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    // enumerate five years ago up to five years from now
    let years = Array.from({ length: 11 }, (_, i) => year - 5 + i);

    const pathYear = path?.startsWith("/calendar/year/")
      ? path.split("/calendar/year/")[1]?.split("/")?.[0]
      : undefined;

    if (pathYear && !years.includes(+pathYear)) {
      years = years.concat(+pathYear).sort((a, b) => a - b);
    }

    return {
      date: pathYear ? new Date(pathYear) : date,
      year,
      years,
    };
  }, [dateString, path]);

  return (
    <nav className="flex max-w-[300px] gap-2 overflow-x-scroll pb-3 lg:flex-col lg:overflow-x-hidden">
      {years.map((year, index) => (
        <Link
          key={`year-nav-year-${year}-${index}`}
          href={`/calendar/year/${year}`}
          className={cn("dark:text-zinc-450", {
            "underline underline-offset-4 dark:text-zinc-50":
              year === date.getFullYear(),
          })}
        >
          {year}
        </Link>
      ))}
    </nav>
  );
};

export { YearNav };
