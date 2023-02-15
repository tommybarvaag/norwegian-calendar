import * as z from "zod";

export const calendarOgImageSchema = z.object({
  year: z.string(),
  month: z.string(),
  mode: z.enum(["light", "dark"]).default("dark"),
});

export const todayOgImageSchema = z.object({
  date: z.string(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  nonce: z.string().optional(),
  mode: z.enum(["light", "dark"]).default("dark"),
});
