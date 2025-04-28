import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getBooths, getPlayTypes, getAllBookings } from "@/app/_lib/db"; // 예약 정보 가져오기
import BookingForm from "../_components/BookingForm_copy";
import Toast from "../_components/Toast";
import BookingTable from "../_components/BookingTable_copy";

export const metadata = {
  title: "Booking",
};

async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <Toast
        status={"error"}
        message={"You must be logged in to access this feature"}
      />
    );
  }

  const userId = session.user.id;
  const booths = await getBooths();
  const playTypes = await getPlayTypes();
  const bookings = await getAllBookings();

  const filterdBooths = booths.filter((b) => b.Id > 1);

  // console.log(playTypes);

  // console.log(booths);
  return (
    <div className="flex">
      {/* <BookingTable bookings={bookings} booths={filterdBooths} /> */}
      <BookingForm
        booths={booths}
        userId={userId}
        playTypes={playTypes}
        bookings={bookings}
      />
    </div>
  );
}

export default page;
