import Link from "next/link";

import prisma from "@/lib/prisma";

export default async function DiddlePage({
  searchParams,
}: {
  searchParams: {
    country: string;
  };
}) {
  const diddles = await prisma.diddle.findMany();

  console.log(diddles);

  return (
    <section className="">
      <h1>Diddle</h1>
      <Link href="/diddle/new">Create new</Link>
      {(diddles ?? []).map((diddle, index) => (
        <Link key={index} href={`diddle/${diddle.id.toString()}`}>
          {diddle.name}
        </Link>
      ))}
    </section>
  );
}
