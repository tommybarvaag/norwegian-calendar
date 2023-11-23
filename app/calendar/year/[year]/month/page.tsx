import { redirect } from "next/navigation";

interface SelectedYearPageProps {
  params: { year: string };
}

export default async function SelectedYearMonthPageRoot({
  params,
}: SelectedYearPageProps) {
  const dateNow = new Date();

  if (params.year === dateNow.getFullYear().toString()) {
    redirect(`/calendar/year/${params.year}/month/${dateNow.getMonth()}`);
  }

  redirect(`/calendar/year/${params.year}/month/0`);

  return <div>...</div>;
}
