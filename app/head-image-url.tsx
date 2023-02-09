import { getRequestDateNow } from "@/lib/date";
import { calendarOgImageSchema } from "@/lib/validations/og";
import { getAbsoluteUrl } from "@/utils/commonUtils";
import * as z from "zod";

interface HeadOgImageUrlCalendarProps {
  params: {
    year?: string;
    month?: string;
  };
  og?: z.infer<typeof calendarOgImageSchema>;
}

// We can remove this function if we use the generateMetadata function
// for generating the og:image URL. generateMetadata outputs the image
// tag as og:image:url, but we need og:image.
function HeadOgImageUrlCalendar({ params, og }: HeadOgImageUrlCalendarProps) {
  const currentDate = getRequestDateNow();
  const url = getAbsoluteUrl();

  let ogUrl = new URL(`${url}/api/og`);

  ogUrl.searchParams.set(
    "year",
    params?.year ?? currentDate.getFullYear().toString()
  );

  ogUrl.searchParams.set(
    "month",
    params?.month ?? currentDate.getMonth().toString()
  );

  ogUrl.searchParams.set("mode", "dark");

  return (
    <>
      <meta property="og:image" content={ogUrl.toString()} />
    </>
  );
}

export { HeadOgImageUrlCalendar };
