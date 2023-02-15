import { getRequestDateNow } from "@/lib/date";
import { getAbsoluteUrl } from "@/utils/commonUtils";
import { Suspense } from "react";
import { Cobe } from "./cobe";
import { ShareButton } from "./share-button";
import { Sunrise } from "./sunrise";
import { Weather } from "./weather";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function TodayPage({
  searchParams,
}: {
  params: {};
  searchParams: {
    country: string;
    region: string;
    city: string;
    latitude: string;
    longitude: string;
  };
}) {
  const currentDate = getRequestDateNow();

  const url = getAbsoluteUrl();

  let shareUrl = new URL(`${url}/today`);
  shareUrl.searchParams.set("latitude", searchParams.latitude);
  shareUrl.searchParams.set("longitude", searchParams.longitude);

  return (
    <section className="items-center justify-center">
      <div className="flex items-center justify-center gap-3">
        <Suspense fallback={<div></div>}>
          {/* @ts-expect-error Async Server Component */}
          <Weather
            date={currentDate}
            longitude={searchParams.longitude}
            latitude={searchParams.latitude}
          />
        </Suspense>
        <Suspense fallback={<div></div>}>
          {/* @ts-expect-error Async Server Component */}
          <Sunrise
            date={currentDate}
            longitude={searchParams.longitude}
            latitude={searchParams.latitude}
          />
        </Suspense>
        <ShareButton url={shareUrl.toString()} />
      </div>
      <Cobe
        latitude={+searchParams.latitude}
        longitude={+searchParams.longitude}
      />
    </section>
  );
}
