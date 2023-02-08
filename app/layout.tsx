import { getRequestDateNow } from "@/lib/date";
import "styles/global.css";
import { globalMetadata } from "./metadata";
import { YearNav } from "./_components/year-nav";

export async function generateMetadata() {
  return globalMetadata;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const date = getRequestDateNow();

  return (
    <html lang="en">
      <body className="mx-4 mt-8 mb-40 flex flex-col items-center justify-center gap-16 bg-zinc-900 text-zinc-50 md:mt-20 lg:mx-auto lg:mt-32 lg:flex-row">
        <aside className="flex self-start">
          <YearNav dateString={date.toISOString()} />
        </aside>
        <main className="w-full max-w-4xl grow">{children}</main>
      </body>
    </html>
  );
}
