import type { AppProps } from "next/app";
import { globalCss } from "stitches.config";

const globalStyles = globalCss({
  "*, ::before, ::after": {
    boxSizing: "border-box",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "currentColor",
  },
  html: {},
  body: {
    backgroundColor: "$main",
    color: "$text",
    fontFamily: "$default",
    minWidth: "360px",
    scrollBehavior: "smooth",
    margin: 0,
    padding: 0,
    overflowX: "hidden",
  },
  "#__next": {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();
  return <Component {...pageProps} />;
}

export default MyApp;
