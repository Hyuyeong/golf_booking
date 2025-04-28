"use client";
import { useState } from "react";
import MyDatePicker from "./DateCustom";
import { format } from "date-fns";

// const booths = Array.from({ length: 11 }, (_, i) => `Driving Range B${i + 1}`);
const times = generateTimes("09:00", "23:00", 60); // 1시간 단위로 변경

// booths.push("Private Room");
// console.log(times);

// 시간 생성 함수
function generateTimes(start, end, interval) {
  const result = [];
  let [h, m] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);

  while (h < endH || (h === endH && m <= endM)) {
    result.push(
      `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
    );
    m += interval;
    if (m >= 60) {
      h++;
      m -= 60;
    }
  }
  return result;
}

export default function BookingTable({ bookings, booths }) {
  const [selectedDate, setSelectedDate] = useState("");

  // 선택한 날짜에 해당하는 예약 필터링
  //   const filteredBookings = bookings.filter(
  //     (b) => formatDate(b.Date) === selectedDate
  //   );
  //   const filteredBookings = bookings.map((b) => formatDate(b.Date));
  const filteredBookings = bookings.filter((b) => {
    const formattedDate = formatDate(b.Date);
    console.log("formattedDate:", formattedDate, "selectedDate:", selectedDate);
    return formattedDate === selectedDate;
  });

  console.log(filteredBookings);
  //   console.log("---------------");
  //   console.log(typeof selectedDate);

  const isBooked = (booth, time) => {
    return filteredBookings.some(
      (b) =>
        b.BoothName === booth && isTimeOverlap(b.StartTime, b.Duration, time)
    );
  };

  // 시간 겹침 확인 함수
  function isTimeOverlap(startTime, duration, checkTime) {
    const start = timeToMinutes(startTime);
    const end = start + duration * 60; // Duration in minutes
    const t = timeToMinutes(checkTime);
    return t >= start && t < end;
  }

  function timeToMinutes(t) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  }

  // 날짜 포맷 변환 (2025-04-28 00:00:00.000000 => 2025-04-28)
  //   function formatDate(date) {
  //     const formattedDate = new Date(date);
  //     return formattedDate.toISOString().split("T")[0]; // YYYY-MM-DD 형식
  //   }

  function formatDate(date) {
    const options = {
      timeZone: "Pacific/Auckland", // NZST 시간대
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    const formattedDate = new Intl.DateTimeFormat("en-NZ", options).format(
      new Date(date)
    );
    // 반환된 형식이 'dd/mm/yyyy' 일 경우, 'yyyy-mm-dd' 형식으로 변환
    const [day, month, year] = formattedDate.split("/");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 py-8 space-y-8 text-center">
      {/* 날짜 선택 */}
      <div>
        <MyDatePicker
          onChange={(date) => {
            const formatted = format(date, "yyyy-MM-dd");
            setSelectedDate(formatted);
          }}
          selectedDate={selectedDate}
        />
        {/* <input
          type="date"
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 p-3 rounded-md w-60 focus:outline-none focus:ring-2 focus:ring-green-500"
        /> */}
      </div>

      {/* 예약 테이블 */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-green-100">
              <th className="border p-4 text-gray-700 text-lg">Time</th>
              {booths.map((booth) => (
                <th key={booth.Id} className="border p-4 text-gray-700 text-lg">
                  {booth.Name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time} className="hover:bg-gray-50">
                <td className="border p-3 font-semibold bg-gray-50">{time}</td>
                {booths.map((booth) => (
                  <td key={booth.Id + time} className="border p-2">
                    <button
                      disabled={isBooked(booth.Name, time)}
                      className={`w-full py-2 rounded-lg transition duration-300 ease-in-out text-sm font-medium ${
                        isBooked(booth.Name, time)
                          ? "bg-gray-300 cursor-not-allowed text-gray-500"
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                    >
                      {isBooked(booth.Name, time) ? "Booked" : "Available"}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
