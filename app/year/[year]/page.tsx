import { getRequestDateNow } from "@/lib/date";
import { getAbsoluteUrl } from "@/utils/commonUtils";
import { CalendarYear } from "../../_components/calendar-year";

interface SelectedYearPageProps {
  params: { year: string };
}

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({ params }: SelectedYearPageProps) {
  const date = new Date(params.year ?? getRequestDateNow().getFullYear());

  const url = getAbsoluteUrl();

  let ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("year", date.getFullYear().toString());
  ogUrl.searchParams.set("month", date.getMonth().toString());
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: params.year,
    description: `Norsk kalender med helligdager, ferier og mer for ${params.year}. Helt gratis, uten reklame og uten registrering.`,
    openGraph: {
      title: params.year,
      description: `Norsk kalender med helligdager, ferier og mer for ${params.year}. Helt gratis, uten reklame og uten registrering.`,
      images: {
        url: ogUrl,
      },
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
