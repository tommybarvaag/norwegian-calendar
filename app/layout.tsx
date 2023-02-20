import { getAbsoluteUrl } from "@/utils/commonUtils";

import { getRequestDateNow } from "@/lib/date";
import "styles/global.css";

export function generateMetadata() {
  const url = getAbsoluteUrl();
  const currentDate = getRequestDateNow();

  let ogUrl = new URL(`${url}/api/og/calendar`);
  ogUrl.searchParams.set("year", currentDate.getFullYear().toString());
  ogUrl.searchParams.set("month", currentDate.getMonth().toString());
  ogUrl.searchParams.set("mode", "dark");

  return {
    themeColor: "#18181b",
    viewport: {
      width: "device-width",
      initialScale: 1,
    },
    title: {
      default: "Norsk kalender med helligdager",
      template: "%s | Norsk kalender med helligdager",
    },
    description:
      "Norsk kalender med helligdager, ferier og mer. Helt gratis, uten reklame og uten registrering.",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      title: "Norsk kalender med helligdager",
      description:
        "Norsk kalender med helligdager, ferier og mer. Helt gratis, uten reklame og uten registrering.",
      card: "summary_large_image",
      images: [ogUrl],
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
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: "Norsk kalender med helligdager, ferier og mer. Helt gratis, uten reklame og uten registrering.",
        },
      ],
    },
    icons: {
      shortcut: "/favicon.ico",
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
      other: [
        {
          rel: "mask-icon",
          url: "/safari-pinned-tab.svg",
        },
      ],
    },
    other: {
      robots: "max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const date = getRequestDateNow();

  return (
    <html lang="en">
      <body className="relative mx-4 mt-8 mb-40 flex flex-col items-center justify-center gap-16 bg-zinc-900 text-zinc-50 md:mt-20 lg:mx-auto lg:mt-32 lg:flex-row">
        {children}
      </body>
    </html>
  );
}
