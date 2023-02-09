import * as z from "zod";

export const calendarOgImageSchema = z.object({
  year: z.string(),
  month: z.string(),
  mode: z.enum(["light", "dark"]).default("dark"),
});
