import { CalendarYear } from "@/app/_components/calendar-year";
import { getRequestDateNow } from "@/lib/date";
import { getAbsoluteUrl } from "@/utils/commonUtils";

interface SelectedYearPageProps {
  params: { year: string };
}

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({ params }: SelectedYearPageProps) {
  const date = new Date(params.year ?? getRequestDateNow().getFullYear());

  const url = getAbsoluteUrl();

  const title = params.year;
  const description = `Norsk kalender med helligdager, ferier og mer for ${params.year}. Helt gratis, uten reklame og uten registrering.`;

  let ogUrl = new URL(`${url}/api/og`);
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
    },
    openGraph: {
      title,
      description,
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
