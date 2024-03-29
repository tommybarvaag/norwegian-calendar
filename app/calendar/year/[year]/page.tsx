import type { Metadata } from "next";
import { CalendarYear } from "@/app/_components/calendar-year";
import { getAbsoluteUrl } from "@/utils/common-utils";

import { getRequestDateNow } from "@/lib/date";

interface SelectedYearPageProps {
  params: { year: string };
}

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export function generateMetadata({ params }: SelectedYearPageProps): Metadata {
  const date = new Date(params.year ?? getRequestDateNow().getFullYear());

  const url = getAbsoluteUrl();

  const title = params.year;
  const description = `Norsk kalender med helligdager, ferier og mer for ${params.year}. Helt gratis, uten reklame og uten registrering.`;

  let ogUrl = new URL(`${url}/api/og/calendar`);
  ogUrl.searchParams.set("year", date.getFullYear().toString());
  ogUrl.searchParams.set("month", date.getMonth().toString());
  ogUrl.searchParams.set("mode", "dark");

  return {
    title,
    description,
    twitter: {
      title,
      description,
      images: [ogUrl],
      card: "summary_large_image",
    },
    openGraph: {
      title: {
        default: title,
        template: "%s | Norsk kalender med helligdager",
      },
      description,
      url: getAbsoluteUrl(`/calendar/year/${params.year}`),
      type: "website",
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: `Kalender for ${params.year}`,
        },
      ],
    },
  };
}

export default async function SelectedYearPage({
  params,
}: SelectedYearPageProps) {
  const date = new Date(params.year ?? getRequestDateNow().getFullYear());

  return (
    <>
      <CalendarYear date={date} />
    </>
  );
}
