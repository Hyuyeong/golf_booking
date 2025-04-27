"use server";

import { query } from "@/app/_lib/db";
import { revalidatePath } from "next/cache";

export async function createBooking(formData) {
  const { date, time, amount, status, userId, boothId, hour, playTypeId } =
    formData;

  await query(
    "INSERT INTO Bookings (Date, Amount, Status, UserId, BoothId, StartTime, Duration, PlayTypeId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [date, amount, status, userId, boothId, time, hour, playTypeId]
  );

  revalidatePath("account/bookings");
}
