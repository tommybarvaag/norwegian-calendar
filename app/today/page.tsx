import { getRequestDateNow } from "@/lib/date";
import { getAbsoluteUrl } from "@/utils/commonUtils";
import { format } from "date-fns";
import { Suspense } from "react";
import { Cobe } from "./cobe";
import { ShareButton } from "./share-button";
import { Sunrise } from "./sunrise";
import { Weather } from "./weather";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export function generateMetadata({
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

  const title = format(currentDate, "EEEE d. MMMM");
  const description = `I dag er dagen`;

  const url = getAbsoluteUrl();

  let ogUrl = new URL(`${url}/api/og/today`);
  ogUrl.searchParams.set("date", currentDate.toISOString());
  ogUrl.searchParams.set("latitude", searchParams.latitude);
  ogUrl.searchParams.set("longitude", searchParams.longitude);
  ogUrl.searchParams.set("mode", "dark");

  return {
    title,
    description,
    twitter: {
      title,
      description,
      images: [ogUrl],
      card: "summary_large_image",
    },
    openGraph: {
      title: {
        default: title,
        template: "%s | Norsk kalender med helligdager",
      },
      description,
      url: getAbsoluteUrl(`/today`),
      type: "website",
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: `Kalender for ${title}`,
        },
      ],
    },
  };
}

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
      <div className="hidden">{JSON.stringify(searchParams, null, 2)}</div>
    </section>
  );
}
