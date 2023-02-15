import { getRequestDateNow } from "@/lib/date";
import { getAbsoluteUrl } from "@/utils/commonUtils";
import { headers as getNextHeaders } from "next/headers";
import { Suspense } from "react";
import { ShareButton } from "./share-button";
import { Sunrise } from "./sunrise";
import { Weather } from "./weather";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

const getGeoHeaders = () => {
  const headers = getNextHeaders();

  const geoHeaders = {
    country: headers.get("x-dato-geo-country") ?? "Norway",
    region: headers.get("x-dato-geo-region") ?? "Bergen",
    city: headers.get("x-dato-geo-city") ?? "Bergen",
    latitude: headers.get("x-dato-geo-latitude") ?? "60.391263",
    longitude: headers.get("x-dato-geo-longitude") ?? "5.322054",
  };

  return geoHeaders;
};

export default async function TodayPage() {
  const geoHeaders = getGeoHeaders();
  const currentDate = getRequestDateNow();

  const url = getAbsoluteUrl();

  let shareUrl = new URL(`${url}/today`);
  shareUrl.searchParams.set("latitude", geoHeaders.latitude);
  shareUrl.searchParams.set("longitude", geoHeaders.longitude);

  return (
    <>
      <h1>Hi</h1>
      <p>
        {geoHeaders.country}, {geoHeaders.region}, {geoHeaders.city}
      </p>
      <p>
        {geoHeaders.latitude}, {geoHeaders.longitude}
      </p>
      <Suspense fallback={<div></div>}>
        {/* @ts-expect-error Async Server Component */}
        <Weather
          date={currentDate}
          longitude={geoHeaders.longitude}
          latitude={geoHeaders.latitude}
        />
      </Suspense>
      <Suspense fallback={<div></div>}>
        {/* @ts-expect-error Async Server Component */}
        <Sunrise
          date={currentDate}
          longitude={geoHeaders.longitude}
          latitude={geoHeaders.latitude}
        />
      </Suspense>
      <ShareButton url={shareUrl.toString()} />
    </>
  );
}
