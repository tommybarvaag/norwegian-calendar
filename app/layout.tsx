import type { Metadata } from "next";
import Link from "next/link";
import { getAbsoluteUrl } from "@/utils/common-utils";
import { CalendarIcon } from "@radix-ui/react-icons";

import { getRequestDateNow } from "@/lib/date";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSelect } from "@/components/theme-select";
import "styles/global.css";

export function generateMetadata(): Metadata {
  const url = getAbsoluteUrl();
  const currentDate = getRequestDateNow();

  let ogUrl = new URL(`${url}/api/og/calendar`);
  ogUrl.searchParams.set("year", currentDate.getFullYear().toString());
  ogUrl.searchParams.set("month", currentDate.getMonth().toString());
  ogUrl.searchParams.set("mode", "dark");

  return {
    metadataBase: new URL(getAbsoluteUrl()),
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
    verification: {
      google: "YQGNPGx81fDJPS5Q59XYSzw-ZT__vFDT743G8jQ4o10",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentDate = getRequestDateNow();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <footer className="lg:px16 px-8 pb-16">
            <hr className="mx-auto mb-12 mt-8 max-w-4xl border-zinc-300 dark:border-zinc-700" />
            <div className="mx-auto grid w-full max-w-4xl grid-cols-2 lg:grid-cols-3">
              <div>
                <Link href={getAbsoluteUrl()}>
                  <CalendarIcon className="h-12 w-12" />
                  <h3 className="mt-3">dato.im</h3>
                </Link>
              </div>
              <div>
                <h3 className="mb-3">Sider</h3>
                <ul>
                  <li>
                    <Link href="/today">I dag</Link>
                  </li>
                  {[...Array(4)].map((_, i) => {
                    const year = currentDate.getFullYear() + i;
                    return (
                      <li key={year}>
                        <Link href={`/calendar/year/${year}`}>{year}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="col-span-2 mt-4 lg:col-span-1 lg:mt-0">
                <ThemeSelect className="mx-auto lg:ml-auto lg:mr-0" />
              </div>
            </div>
            <div className="mx-auto mt-12 max-w-2xl">
              <p className="text-center text-sm text-zinc-500">
                © {currentDate.getFullYear()} dato.im lagd av{" "}
                <Link href="https://tommylb.com" target="_blank" rel="noopener">
                  Tommy Lunde Barvåg
                </Link>
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
