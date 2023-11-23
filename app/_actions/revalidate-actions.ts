"use server";

import { revalidatePath } from "next/cache";

async function shouldRevalidateNewDate(date: Date) {
  const checkDate = new Date();

  const dateChanged =
    checkDate.getDate() !== date.getDate() ||
    checkDate.getMonth() !== date.getMonth() ||
    checkDate.getFullYear() !== date.getFullYear();

  if (dateChanged) {
    revalidatePath("/", "layout");
  }
}

export { shouldRevalidateNewDate };
