import { getRequestDateNow } from "@/lib/date";
import { getAbsoluteUrl } from "@/utils/commonUtils";
import type { Metadata } from "next";

const globalMetadata: Metadata = {
  title: {
    default: "Norsk kalender med helligdager",
    template: "%s | Norsk kalender med helligdager",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    title: "Norsk kalender med helligdager",
    card: "summary_large_image",
  },
  openGraph: {
    title: {
      default: "Norsk kalender med helligdager",
      template: "%s | Norsk kalender med helligdager",
    },
    type: "website",
    url: getAbsoluteUrl(),
    siteName: "Norsk kalender med helligdager",
    description:
      "Norsk kalender med helligdager, ferier og mer. Helt gratis, uten reklame og uten registrering.",
    images: {
      url: `${getAbsoluteUrl()}/api/og?year=${getRequestDateNow().getFullYear()}&month=${getRequestDateNow().getMonth()}&mode=dark`,
    },
  },
  icons: {
    shortcut: "/favicon.ico",
  },
  other: {
    robots: "max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  },
};

export { globalMetadata };
