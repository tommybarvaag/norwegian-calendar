import { notFound } from "next/navigation";

import { db } from "@/lib/planetscale";

interface SelectedYearPageProps {
  params: { id: string };
}

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function SelectedDiddlePage({
  params,
}: SelectedYearPageProps) {
  const diddle = await db
    .selectFrom("diddle")
    .selectAll()
    .where("id", "=", params.id)
    .executeTakeFirst();

  if (!diddle) {
    notFound();
  }

  return (
    <>
      <h1>{diddle.name}</h1>
    </>
  );
}
