"use client";

import { cn } from "@/utils/cssUtils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useMemo } from "react";

const YearNav: FC<{ dateString: string }> = ({ dateString }) => {
  const path = usePathname();
  const { date, years } = useMemo(() => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    // enumerate five years ago up to five years from now
    let years = Array.from({ length: 11 }, (_, i) => year - 5 + i);

    const pathYear = path.startsWith("/year/")
      ? path.split("/year/")[1]
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
    <nav className="flex max-w-[100vw] gap-2 overflow-x-scroll pb-3 lg:flex-col">
      {years.map((year) => (
        <Link
          key={`year-nav-year-${year}`}
          href={`/year/${year}`}
          className={cn("text-zinc-500", {
            "text-zinc-50": year === date.getFullYear(),
          })}
        >
          {year}
        </Link>
      ))}
    </nav>
  );
};

export { YearNav };
