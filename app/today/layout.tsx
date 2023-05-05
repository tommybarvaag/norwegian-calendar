import Link from "next/link";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

import "styles/global.css";

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative mb-12 mt-8 flex w-full max-w-5xl grow flex-col items-center justify-center gap-16 md:mt-20 lg:mx-auto lg:mb-24 lg:mt-32 lg:flex-row">
      <aside className="flex self-start xl:absolute xl:left-0 xl:top-0">
        <ul>
          <li>
            <Link className="inline-flex items-center gap-1" href="/">
              <ChevronLeftIcon className="h-4 w-4" />
              <span>Hjem</span>
            </Link>
          </li>
        </ul>
      </aside>
      {children}
    </main>
  );
}
