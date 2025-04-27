// app/account/bookings/page.js

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserBookings } from "@/app/_lib/db"; // 예약 정보 가져오기
import DeleteButton from "@/app/_components/DeleteButton";

// 서버 컴포넌트
export default async function BookingsPage() {
  // 세션에서 사용자 정보 가져오기
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>You must be logged in to view your bookings.</div>;
  }

  // 사용자의 예약 정보 가져오기
  const userId = session.user.id;
  const bookings = await getUserBookings(userId);

  const currentDate = new Date();

  // 과거 예약 필터링
  const pastBookings = bookings.filter(
    (booking) => new Date(booking.Date) < currentDate
  );

  // 미래 예약 필터링
  const futureBookings = bookings.filter(
    (booking) => new Date(booking.Date) >= currentDate
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-left mb-6">Your Bookings</h1>
      {/* 예약 목록 */}
      <ul className="space-y-4">
        {futureBookings.length === 0 ? (
          <p className="text-left text-xl text-gray-500">
            You have no upcoming bookings.
          </p>
        ) : (
          futureBookings.map((booking) => {
            const formattedDate = new Date(booking.Date).toLocaleString(
              "en-NZ",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );

            const formattedHour = booking.StartTime.slice(0, 5);
            const endHour = +booking.StartTime.slice(0, 2) + booking.Duration;

            return (
              <li
                key={booking.Id}
                className="bg-white shadow-md rounded-lg p-4 max-w-lg"
              >
                <div className="flex flex-col space-y-2">
                  <p className="font-semibold">
                    Booking ID:{" "}
                    <span className="text-gray-700">#{booking.Id}</span>
                  </p>
                  <p className="font-semibold">
                    Booked Date:{" "}
                    <span className="text-gray-700">{formattedDate}</span>
                  </p>
                  <p className="font-semibold">
                    Booked Time:{" "}
                    <span className="text-gray-700">
                      {formattedHour} - {endHour + ":00"} ({booking.Duration}
                      {booking.Duration > 1 ? " Hrs" : " Hr"})
                    </span>
                  </p>
                  <p className="font-semibold">
                    Status:{" "}
                    <span
                      className={`bg-${booking.Status === "Confirmed" ? "green-600" : "red-500"} text-white p-1 rounded`}
                    >
                      {booking.Status}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Booked Booth:{" "}
                    <span className="text-gray-700">{booking.BoothName}</span>
                  </p>
                  <p className="font-semibold">
                    Play Type:{" "}
                    <span className="text-gray-700">
                      {booking.PlayTypeName}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Amount:{" "}
                    <span className="text-gray-700">${booking.Amount}</span>
                  </p>
                  <DeleteButton bookingId={booking.Id} />
                </div>
              </li>
            );
          })
        )}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Past Bookings</h2>
      <ul className="space-y-4">
        {pastBookings.length === 0 ? (
          <p className="text-left text-xl text-gray-500">
            You have no past bookings.
          </p>
        ) : (
          pastBookings.map((booking) => {
            const formattedDate = new Date(booking.Date).toLocaleString(
              "en-NZ",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
              }
            );

            const formattedHour = booking.StartTime.slice(0, 5);
            const endHour = +booking.StartTime.slice(0, 2) + booking.Duration;

            return (
              <li
                key={booking.Id}
                className="bg-gray-200 shadow-md rounded-lg p-4 max-w-lg"
              >
                <div className="flex flex-col space-y-2">
                  <p className="font-semibold">
                    Booking ID:{" "}
                    <span className="text-gray-700">#{booking.Id}</span>
                  </p>
                  <p className="font-semibold">
                    Booked Date:{" "}
                    <span className="text-gray-700">{formattedDate}</span>
                  </p>
                  <p className="font-semibold">
                    Booked Time:{" "}
                    <span className="text-gray-700">
                      {formattedHour} - {endHour + ":00"} ({booking.Duration}
                      {booking.Duration > 1 ? " Hrs" : " Hr"})
                    </span>
                  </p>
                  <p className="font-semibold">
                    Status:{" "}
                    <span className="text-gray-700">{booking.Status}</span>
                  </p>
                  <p className="font-semibold">
                    Booked Booth:{" "}
                    <span className="text-gray-700">{booking.BoothName}</span>
                  </p>
                  <p className="font-semibold">
                    Play Type:{" "}
                    <span className="text-gray-700">
                      {booking.PlayTypeName}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Amount:{" "}
                    <span className="text-gray-700">${booking.Amount}</span>
                  </p>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
