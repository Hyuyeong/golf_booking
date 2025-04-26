"use server";

import { query } from "@/app/_lib/db";
import { revalidatePath } from "next/cache";

export async function updateUser(formData) {
  const userId = formData.get("userId");
  const username = formData.get("username");

  if (!userId || !username) return;

  await query("UPDATE Users SET UserName = ? WHERE Id = ?", [username, userId]);

  revalidatePath("/account/profile");
}
