import { getRequestDateNow } from "@/lib/date";
import type { Metadata } from "next";
import { CalendarYear } from "./_components/calendar-year";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata() {
  const metadata: Metadata = {
    description:
      "Norsk kalender med helligdager, ferier og mer. Helt gratis, uten reklame og uten registrering.",
    openGraph: {
      title: {
        default: "Norsk kalender med helligdager",
        template: "%s | Norsk kalender med helligdager",
      },
      description:
        "Norsk kalender med helligdager, ferier og mer. Helt gratis, uten reklame og uten registrering.",
      url: "https://norsk-kalender.no",
      siteName: "Norsk kalender med helligdager",
      images: [
        {
          url: "https://norsk-kalender.no/og.jpg",
          width: 1920,
          height: 1080,
        },
      ],
      locale: "nb-NO",
    },
  };

  return metadata;
}

export default async function RootPage() {
  const date = getRequestDateNow();

  return (
    <>
      <CalendarYear date={date} />
    </>
  );
}
