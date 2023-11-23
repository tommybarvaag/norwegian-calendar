"use client";

import { useEffect, useState } from "react";
import { shouldRevalidateNewDate } from "@/app/_actions/revalidate-actions";
import { useInterval } from "@/app/hooks/use-interval";

const ONE_MINUTE_IN_MS = 60000;

export function RefreshCache({ date }: { date: Date }) {
  const check = shouldRevalidateNewDate.bind(null, date);

  const [shouldRun, setShouldRun] = useState(
    typeof document !== "undefined" && document.hasFocus()
  );

  useEffect(() => {
    check();
  }, []);

  useEffect(() => {
    const onFocus = () => {
      check();
      setShouldRun(true);
    };
    const onBlur = () => setShouldRun(false);

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, [check]);

  useInterval(check, shouldRun ? ONE_MINUTE_IN_MS : null);

  return null;
}
