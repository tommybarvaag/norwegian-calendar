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

  return {
    title: params.year,
    description: `Norsk kalender med helligdager, ferier og mer for ${params.year}. Helt gratis, uten reklame og uten registrering.`,
    openGraph: {
      title: params.year,
      description: `Norsk kalender med helligdager, ferier og mer for ${params.year}. Helt gratis, uten reklame og uten registrering.`,
      images: {
        url: `${getAbsoluteUrl()}/api/og?year=${date.getFullYear()}&month=${date.getMonth()}&mode=dark`,
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
