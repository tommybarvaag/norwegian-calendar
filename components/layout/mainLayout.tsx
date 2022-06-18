import * as React from "react";
import { Main } from "../ui";

const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <Main>{children}</Main>;
};

export { MainLayout };
