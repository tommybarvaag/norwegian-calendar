import { getRequestDateNow } from "@/lib/date";
import { redirect } from "next/navigation";

interface SelectedYearPageProps {
  params: { year: string };
}

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function SelectedYearMonthPageRoot({
  params,
}: SelectedYearPageProps) {
  const dateNow = getRequestDateNow();

  if (params.year === dateNow.getFullYear().toString()) {
    redirect(`/calendar/year/${params.year}/month/${dateNow.getMonth()}`);
  }

  redirect(`/calendar/year/${params.year}/month/0`);

  return <div>...</div>;
}
