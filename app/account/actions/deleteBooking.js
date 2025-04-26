"use server";

import { query } from "@/app/_lib/db";
import { revalidatePath } from "next/cache";

export async function deleteBooking(formData) {
  const bookingId = formData.get("bookingId");
  if (!bookingId) return;

  await query("DELETE FROM Bookings WHERE Id = ?", [bookingId]);

  revalidatePath("/account/booking");
}
