import * as React from "react";
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
    backgroundColor: "$background",
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

type MyAppProps = {
  Component: React.ComponentType & {
    layoutProps?: any;
  };
  pageProps?: Record<string, any>;
};

function MyApp({ Component, pageProps }: MyAppProps) {
  globalStyles();
  const Layout = Component.layoutProps?.Layout || React.Fragment;

  const layoutProps = Component.layoutProps?.Layout ? { pageProps, layoutProps: Component.layoutProps } : {};

  return (
    <Layout {...layoutProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
