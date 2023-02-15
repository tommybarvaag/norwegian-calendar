import { todayOgImageSchema } from "@/lib/validations/og";
import { capitalize } from "@/utils/commonUtils";
import { ImageResponse } from "@vercel/og";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
  regions: ["fra1"],
};

const interRegular = fetch(
  new URL("../../../assets/fonts/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const interBold = fetch(
  new URL("../../../assets/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
    const fontRegular = await interRegular;
    const fontBold = await interBold;

    const url = new URL(req.url);
    const values = todayOgImageSchema.parse(
      Object.fromEntries(url.searchParams)
    );

    const { mode } = values;
    const paint = mode === "dark" ? "#fafafa" : "#18181b";

    const date = new Date(values.date);
    const formatDay = format(date, "EEEE", {
      locale: nb,
    });
    const formatMonthDateAndYear = format(date, "MMMM d, yyyy", {
      locale: nb,
    });

    return new ImageResponse(
      (
        <div
          tw="flex relative flex-col p-12 pb-16 w-full h-full items-start"
          style={{
            color: paint,
            background: mode === "dark" ? "#18181b" : "#fafafa",
          }}
        >
          <div tw="flex relative w-full h-full items-start justify-around">
            <div tw="flex flex-col py-5">
              <div
                tw="flex text-2xl uppercase font-bold tracking-tight"
                style={{ fontFamily: "Inter", fontWeight: "bolder" }}
              >
                {formatMonthDateAndYear}
              </div>
              <div
                tw="flex leading-[1.1] text-[80px] font-bold tracking-tighter"
                style={{
                  fontFamily: "Inter",
                  fontWeight: "bolder",
                  marginLeft: "-3px",
                  fontSize: "80px",
                }}
              >
                {capitalize(formatDay)}
              </div>
              <div tw="flex flex-col">
                <div tw="flex">{values.latitude}</div>
                <div tw="flex">{values.longitude}</div>
              </div>
            </div>
            <div tw="flex h-auto w-full max-w-[600px] flex-1 flex-wrap">
              Hey
            </div>
          </div>
          <div tw="flex items-center w-full justify-between">
            <div
              tw="flex items-center text-xl"
              style={{ fontFamily: "Inter", fontWeight: "normal" }}
            >
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                <path
                  d="M30 44v-8a9.6 9.6 0 0 0-2-7c6 0 12-4 12-11 .16-2.5-.54-4.96-2-7 .56-2.3.56-4.7 0-7 0 0-2 0-6 3-5.28-1-10.72-1-16 0-4-3-6-3-6-3-.6 2.3-.6 4.7 0 7a10.806 10.806 0 0 0-2 7c0 7 6 11 12 11a9.43 9.43 0 0 0-1.7 3.3c-.34 1.2-.44 2.46-.3 3.7v8"
                  stroke={paint}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18 36c-9.02 4-10-4-14-4"
                  stroke={paint}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div tw="flex ml-2">https://github.com/tommybarvaag</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontRegular,
            weight: 400,
            style: "normal",
          },
          {
            name: "Inter",
            data: fontBold,
            weight: 700,
            style: "normal",
          },
        ],
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
