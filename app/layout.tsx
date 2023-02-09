import { getRequestDateNow } from "@/lib/date";
import { getAbsoluteUrl } from "@/utils/commonUtils";
import "styles/global.css";
import { YearNav } from "./_components/year-nav";

export async function generateMetadata() {
  const url = getAbsoluteUrl();
  const currentDate = getRequestDateNow();

  let ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("year", currentDate.getFullYear().toString());
  ogUrl.searchParams.set("month", currentDate.getMonth().toString());
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: {
      default: "Norsk kalender med helligdager",
      template: "%s | Norsk kalender med helligdager",
    },
    robots: {
      index: true,
      follow: true,
    },
    twitter: {
      title: "Norsk kalender med helligdager",
      description:
        "Norsk kalender med helligdager, ferier og mer. Helt gratis, uten reklame og uten registrering.",
      card: "summary_large_image",
      images: [ogUrl],
    },
    openGraph: {
      title: {
        default: "Norsk kalender med helligdager",
        template: "%s | Norsk kalender med helligdager",
      },
      type: "website",
      url: getAbsoluteUrl(),
      siteName: "Norsk kalender med helligdager",
      description:
        "Norsk kalender med helligdager, ferier og mer. Helt gratis, uten reklame og uten registrering.",
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: "Norsk kalender med helligdager, ferier og mer. Helt gratis, uten reklame og uten registrering.",
        },
      ],
    },
    icons: {
      shortcut: "/favicon.ico",
    },
    other: {
      robots: "max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
  };
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
