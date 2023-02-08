import { FC, ReactNode } from "react";

const Show: FC<{ children: ReactNode; when: boolean }> = ({
  when,
  children,
}) => {
  return when ? <>{children}</> : null;
};

export { Show };
