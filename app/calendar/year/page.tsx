import { redirect } from "next/navigation";

export default async function RootYearPage() {
  redirect("/calendar/year/" + new Date().getFullYear());

  return <div>...</div>;
}
