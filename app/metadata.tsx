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
  icons: {
    shortcut: "/favicon.ico",
  },
  other: {
    robots: "max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  },
};

export { globalMetadata };
