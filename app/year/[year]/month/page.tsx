import { getRequestDateNow } from "@/lib/date";
import { redirect } from "next/navigation";

interface SelectedYearPageProps {
  params: { year: string };
}

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({ params }: SelectedYearPageProps) {
  return {
    title: params.year,
    description: `Norsk kalender med helligdager, ferier og mer for ${params.year}. Helt gratis, uten reklame og uten registrering.`,
  };
}

export default async function SelectedYearMonthPageRoot({
  params,
}: SelectedYearPageProps) {
  const dateNow = getRequestDateNow();

  if (params.year === dateNow.getFullYear().toString()) {
    redirect(`/year/${params.year}/month/${dateNow.getMonth()}`);
  }

  redirect(`/year/${params.year}/month/0`);

  return <div>...</div>;
}
