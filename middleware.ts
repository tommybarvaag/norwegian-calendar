import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { nextUrl: url, geo } = request;

  const country = url?.searchParams?.get("country") ?? geo?.country ?? "NO";
  const city = url?.searchParams?.get("city") ?? geo?.city ?? "Bergen";
  const region = url?.searchParams?.get("region") ?? geo?.region ?? "Hordaland";
  const latitude =
    url?.searchParams?.get("latitude") ?? geo?.latitude ?? "60.391262";
  const longitude =
    url?.searchParams?.get("longitude") ?? geo?.longitude ?? "5.322054";

  // Add new request headers
  url.searchParams.set("country", country);
  url.searchParams.set("city", city);
  url.searchParams.set("region", region);
  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);

  return NextResponse.rewrite(url);
}
