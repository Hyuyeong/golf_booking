"use client";

import { useState, useEffect } from "react";
import SubmitButton from "./SubmitButton";
import { createBooking } from "../booking/actions/createBooking";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function BookingForm({ booths, userId, playTypes, bookings }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [hour, setHour] = useState("1");
  const [boothId, setBoothId] = useState("");
  const [playTypeId, setPlayTypeId] = useState("");
  const [boothPrice, setBoothPrice] = useState(0);
  const [happyHourPrice, setHappyHourPrice] = useState(0);
  const [privateRoomPrice, setPrivateRoomPrice] = useState(0);
  const [isHappyHour, setIsHappyHour] = useState(false);
  const [isPrivateRoom, setIsPrivateRoom] = useState(false);
  const [amount, setAmount] = useState(0);
  const [status] = useState("Confirmed");
  const [todayDate, setTodayDate] = useState("");
  const [availableHours, setAvailableHours] = useState([1, 2, 3, 4]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const formattedDate = today.toISOString().split("T")[0];
    setTodayDate(formattedDate);
  }, []);

  useEffect(() => {
    if (playTypeId) {
      const selectedPlayType = playTypes.find(
        (p) => p.Id === Number(playTypeId)
      );
      if (selectedPlayType) {
        setHappyHourPrice(selectedPlayType.HappyHourPrice);
        setBoothPrice(selectedPlayType.Price);
      }
    }
  }, [playTypeId]);

  useEffect(() => {
    if (boothId) {
      const selectedBooth = booths.find((b) => b.Id === Number(boothId));
      if (selectedBooth) {
        setPrivateRoomPrice(selectedBooth.Price);
        setIsPrivateRoom(selectedBooth.Name === "Private Room");
      }
    }
  }, [boothId]);

  useEffect(() => {
    if (["09:00", "10:00", "11:00"].includes(time)) {
      setAmount(hour * happyHourPrice + hour * Number(privateRoomPrice));
      setIsHappyHour(true);
    } else {
      setAmount(hour * boothPrice + hour * Number(privateRoomPrice));
      setIsHappyHour(false);
    }
  }, [hour, boothPrice, time, happyHourPrice, privateRoomPrice]);

  useEffect(() => {
    if (date && boothId && time) {
      const filteredBookings = bookings.filter(
        (b) => formatDate(b.Date) === date
      );
      const selectedBooth = booths.find((b) => b.Id === Number(boothId));
      const boothName = selectedBooth?.Name;

      const bookedTimes = filteredBookings
        .filter((b) => b.BoothName === boothName)
        .map((b) => ({
          startTime: b.StartTime,
          duration: b.Duration,
        }));

      const selectedStart = timeToMinutes(time);
      let maxHours = 4; // 기본 4시간

      for (let h = 1; h <= 4; h++) {
        const endMinutes = selectedStart + h * 60;
        const overlap = bookedTimes.some((b) => {
          const bookedStart = timeToMinutes(b.startTime);
          const bookedEnd = bookedStart + b.duration * 60;
          return selectedStart < bookedEnd && endMinutes > bookedStart;
        });
        if (overlap) {
          maxHours = h - 1;
          break;
        }
      }

      if (time === "22:00") maxHours = Math.min(maxHours, 1);
      else if (time === "21:00") maxHours = Math.min(maxHours, 2);
      else if (time === "20:00") maxHours = Math.min(maxHours, 3);

      if (maxHours <= 0) maxHours = 1; // 최소 1시간

      setAvailableHours(Array.from({ length: maxHours }, (_, i) => i + 1));
    } else {
      setAvailableHours([1, 2, 3, 4]);
    }
  }, [date, boothId, time, bookings]);

  useEffect(() => {
    if (date && boothId) {
      const filteredBookings = bookings.filter(
        (b) => formatDate(b.Date) === date
      );
      const selectedBooth = booths.find((b) => b.Id === Number(boothId));
      const boothName = selectedBooth?.Name;

      const bookedTimes = filteredBookings
        .filter((b) => b.BoothName === boothName)
        .map((b) => ({
          startTime: b.StartTime,
          duration: b.Duration,
        }));

      const allTimes = generateTimes("09:00", "22:00", 60);

      const available = allTimes.filter((t) => {
        return !bookedTimes.some((b) =>
          isTimeOverlap(b.startTime, b.duration, t)
        );
      });

      setAvailableTimes(available);
    } else {
      setAvailableTimes(generateTimes("09:00", "22:00", 60));
    }
  }, [date, boothId, bookings]);

  function formatDate(date) {
    const options = {
      timeZone: "Pacific/Auckland",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const formattedDate = new Intl.DateTimeFormat("en-NZ", options).format(
      new Date(date)
    );
    const [day, month, year] = formattedDate.split("/");
    return `${year}-${month}-${day}`;
  }

  function isTimeOverlap(startTime, duration, checkTime) {
    const start = timeToMinutes(startTime);
    const end = start + duration * 60;
    const t = timeToMinutes(checkTime);
    return t >= start && t < end;
  }

  function timeToMinutes(t) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      date,
      time,
      hour,
      boothId,
      amount,
      status,
      userId,
      playTypeId,
    };

    try {
      await createBooking(formData);
      toast.success("Booking created successfully!");
      router.push("/account/bookings");
    } catch (error) {
      console.error("Booking creation failed:", error);
      toast.error("Failed to create booking. Please try again.");
    }
  };

  const times = generateTimes("09:00", "23:00", 60);

  const filteredBookings = bookings.filter((b) => {
    const formattedDate = formatDate(b.Date);
    console.log("formattedDate:", formattedDate, "selectedDate:", date);
    return formattedDate === date;
  });

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

  return (
    <div className="flex m-auto gap-10">
      <div className="container mx-auto px-4 py-6 max-w-lg border mt-10 rounded-lg shadow-xl border-gray-300 h-fit">
        <h1 className="text-3xl font-semibold text-left mb-6">Book a Booth</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-lg font-medium">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 p-2 border rounded min-w-xs"
              min={todayDate}
              required
            />
          </div>

          {/* Time */}
          <div>
            <label htmlFor="time" className="block text-lg font-medium">
              Start Time{" "}
              {isHappyHour && (
                <span className="text-green-500">🎉Happy Hour🎉</span>
              )}
            </label>
            <select
              id="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-2 p-2 border rounded min-w-xs"
              required
            >
              {availableTimes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Hours */}
          <div>
            <label htmlFor="hour" className="block text-lg font-medium">
              Play Hours
            </label>
            <select
              id="hour"
              name="hour"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="mt-2 p-2 border rounded min-w-xs"
              required
            >
              {availableHours.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          {/* Booth */}
          <div>
            <label htmlFor="booth" className="block text-lg font-medium">
              Booth{" "}
              {isPrivateRoom && (
                <span className="text-red-500 text-sm"> +$10/hour</span>
              )}
            </label>
            <select
              id="booth"
              name="booth"
              value={boothId}
              onChange={(e) => setBoothId(e.target.value)}
              className="mt-2 p-2 border rounded min-w-xs"
              required
            >
              <option disabled value="">
                Select a Booth
              </option>
              {booths
                .filter((booth) => booth.Id > 1)
                .map((booth) => (
                  <option key={booth.Id} value={booth.Id}>
                    {booth.Name}
                  </option>
                ))}
            </select>
          </div>

          {/* Play Type */}
          <div>
            <label htmlFor="playType" className="block text-lg font-medium">
              Play Type
            </label>
            <select
              id="playType"
              name="playType"
              value={playTypeId}
              onChange={(e) => setPlayTypeId(e.target.value)}
              className="mt-2 p-2 border rounded min-w-xs"
              required
            >
              <option disabled value="">
                Select a Play Type
              </option>
              {playTypes.map((playType) => (
                <option key={playType.Id} value={playType.Id}>
                  {playType.Name}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="text-right">
            <label className="block text-lg font-medium">Total Price</label>
            {amount > 0 ? <span>{amount} NZD</span> : <span>&nbsp;</span>}
          </div>

          {/* Submit */}
          <SubmitButton context="Book Now" status="Booking" color="green" />
        </form>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 py-8 space-y-8 text-center">
        {/* 예약 테이블 */}
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-green-100">
                <th className="border p-4 text-gray-700 text-lg">Time</th>
                {booths.map((booth) => (
                  <th
                    key={booth.Id}
                    className="border p-4 text-gray-700 text-lg"
                  >
                    {booth.Name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time) => (
                <tr key={time} className="hover:bg-gray-50">
                  <td className="border p-3 font-semibold bg-gray-50">
                    {time}
                  </td>
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
    </div>
  );
}
