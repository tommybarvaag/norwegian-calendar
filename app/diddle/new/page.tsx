import { redirect } from "next/navigation";
import { generateId } from "@/utils/nanoid-utils";

import { db } from "@/lib/planetscale";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function DiddleNewPage() {
  const id = generateId();
  const insertResult = await db
    .insertInto("diddle")
    .values({
      id: id,
      name: "Test",
    })
    .execute();

  if (insertResult) {
    redirect(`/diddle/${id}`);
  }

  return <div>test</div>;
}
