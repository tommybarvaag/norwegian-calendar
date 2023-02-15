import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import "styles/global.css";

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <aside className="flex self-start">
        <ul>
          <li>
            <Link className="inline-flex items-center gap-1" href="/">
              <ChevronLeft className="h-4 w-4" />
              <span>Hjem</span>
            </Link>
          </li>
        </ul>
      </aside>
      <main className="w-full max-w-4xl grow">{children}</main>
    </>
  );
}
