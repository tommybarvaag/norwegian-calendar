"use client";

import {
  forwardRef,
  useTransition,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import { useRouter } from "next/navigation";
import { MONTH } from "@/constants/date-constants";
import { cn } from "@/utils/css-utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MonthSelect = forwardRef<
  ElementRef<typeof SelectTrigger>,
  ComponentPropsWithoutRef<typeof SelectTrigger> & {
    year: number;
    month: number;
    isSelected: boolean;
  }
>(({ className, year, month, isSelected = false, ...other }, forwardedRef) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Select
      defaultValue={month.toString()}
      onValueChange={(value) => {
        // update url
        router.push(`/calendar/year/${year}/month/${value}`);

        // start transition
        startTransition(() => {
          // Refresh the current route and fetch new data from the server without
          // losing client-side browser or React state.
          router.refresh();
        });
      }}
      disabled={isPending}
    >
      <SelectTrigger
        className={cn(
          "h-[40px] border-none px-0 text-base ",
          { "underline underline-offset-2 dark:text-emerald-500": isSelected },
          className
        )}
        {...other}
        ref={forwardedRef}
      >
        <SelectValue placeholder={month} />
        <span className="sr-only">Toggle theme</span>
      </SelectTrigger>
      <SelectContent>
        {Object.values(MONTH).map((theme) => (
          <SelectItem key={theme.value} value={theme.value.toString()}>
            <div className="flex items-center gap-3">{theme.i18n.no}</div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});

MonthSelect.displayName = "ThemeSelect";

export { MonthSelect };
