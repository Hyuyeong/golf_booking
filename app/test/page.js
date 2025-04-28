import BookingTable from "../_components/BookingTable";
import { getAllBookings, getBooths } from "../_lib/db";

async function page() {
  const bookings = await getAllBookings();
  const booths = await getBooths();

  const filterdBooths = booths.filter((b) => b.Id > 1);

  console.log(bookings);
  return (
    <div className="flex justify-center">
      <div className="w-full p-30">
        <BookingTable bookings={bookings} booths={filterdBooths} />
      </div>
    </div>
  );
}

export default page;
