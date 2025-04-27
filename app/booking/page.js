import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getBooths, getUserBookings, getPlayTypes } from "@/app/_lib/db"; // 예약 정보 가져오기

import { query } from "@/app/_lib/db";
import BookingForm from "../_components/BookingForm";

export const metadata = {
  title: "Booking",
};

async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div>You must be logged in</div>;
  }

  const userId = session.user.id;
  const booths = await getBooths();
  const playTypes = await getPlayTypes();

  console.log(playTypes);

  console.log(booths);
  return (
    <div>
      <BookingForm booths={booths} userId={userId} playTypes={playTypes} />
    </div>
  );
}

export default page;
