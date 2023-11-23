import { RefreshCache } from "@/app/_components/refresh-cache";

async function AutoRevalidate() {
  const date = new Date();
  return <RefreshCache date={date} />;
}

export { AutoRevalidate };
