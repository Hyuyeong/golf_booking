"use client";

import { useState, useEffect } from "react";
import SubmitButton from "./SubmitButton";
import { createBooking } from "../booking/actions/createBooking";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function BookingForm({ booths, userId, playTypes }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [hour, setHour] = useState("1");
  const [boothId, setBoothId] = useState("");
  const [playTypeId, setPlayTypeId] = useState("");
  const [boothPrice, setBoothPrice] = useState(0); // 부스 가격
  const [happyHourPrice, setHappyHourPrice] = useState(0); // 부스할인 가격
  const [privateRoomPrice, setPrivateRoomPrice] = useState(0);
  const [isHappyHour, setIsHappyHour] = useState(false);
  const [isPrivateRoom, setIsPrivateRoom] = useState(false);
  const [amount, setAmount] = useState(0); // 가격, 나중에 로직 추가
  const [status] = useState("Confirmed");
  const [todayDate, setTodayDate] = useState("");
  const [availableHours, setAvailableHours] = useState([1, 2, 3, 4]);
  const router = useRouter(); // useRouter 훅 사용

  useEffect(() => {
    // 오늘 날짜를 'YYYY-MM-DD' 형식으로 설정
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const formattedDate = today.toISOString().split("T")[0];
    setTodayDate(formattedDate);
  }, []);

  useEffect(() => {
    if (playTypeId) {
      const selectedPlayType = playTypes
        .filter((playType) => playType.Id === Number(playTypeId))
        .map((playType) => playType.Price);
      const selectedHappyHourBooth = playTypes
        .filter((playType) => playType.Id === Number(playTypeId))
        .map((playType) => playType.HappyHourPrice);

      setHappyHourPrice(selectedHappyHourBooth);
      setBoothPrice(selectedPlayType);
    }
  }, [playTypeId]);

  // 부스 가격을 선택한 boothId에 맞게 설정
  useEffect(() => {
    if (boothId) {
      const selectedBooth = booths
        .filter((booth) => booth.Id === Number(boothId))
        .map((booth) => booth.Price);

      const selectedBoothName = booths
        .filter((booth) => booth.Id === Number(boothId))
        .map((booth) => booth.Name);

      //   console.log(selectedBoothName);

      if (selectedBoothName == "Private Room") {
        setIsPrivateRoom(true);
      } else {
        setIsPrivateRoom(false);
      }

      setPrivateRoomPrice(selectedBooth);
    }
  }, [boothId]);

  //   console.log(Number(privateRoomPrice));
  // 시간에 맞춰 금액 계산
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
    if (time === "22:00") {
      setAvailableHours([1]);
    } else if (time === "21:00") {
      setAvailableHours([1, 2]);
    } else if (time === "20:00") {
      setAvailableHours([1, 2, 3]);
    } else {
      setAvailableHours([1, 2, 3, 4]);
    }
  }, [time]);

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
      await createBooking(formData); // 서버에 부킹 생성 요청
      toast.success("Booking created successfully!");
      router.push("/account/bookings"); // 부킹 성공 후 /account/bookings로 리디렉션
    } catch (error) {
      console.error("Booking creation failed:", error);
      toast.error("Failed to create booking. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-lg border mt-10 rounded-lg shadow-xl border-gray-300">
      <h1 className="text-3xl font-semibold text-left mb-6">Book a Booth</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date 선택 */}
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
            min={todayDate} // 오늘 날짜 이후만 선택 가능
            required
          />
        </div>

        {/* Time 선택 */}
        <div>
          <label htmlFor="time" className="block text-lg font-medium">
            Start Time{" "}
            {isHappyHour && <span className="ml-13">🎉Happy Hour🎉</span>}
          </label>
          <select
            id="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-2 p-2 border rounded min-w-xs"
            required
          >
            {[...Array(14).keys()].map((i) => {
              const hour = 9 + i;
              const formattedTime = `${hour < 10 ? "0" : ""}${hour}:00`;
              return (
                <option key={formattedTime} value={formattedTime}>
                  {formattedTime}
                </option>
              );
            })}
          </select>
        </div>
        {/* Duration 선택 */}
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
            {availableHours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </div>

        {/* Booth 선택 */}
        <div>
          <label htmlFor="booth" className="block text-lg font-medium">
            Booth{" "}
            {isPrivateRoom && (
              <span className="ml-45 text-red-700 text-sm"> +$10/hour</span>
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

        {/* Play Type 선택 */}
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

        {/* Price*/}
        {/* Price 표시 */}
        <div className="text-right">
          {/* <label
            htmlFor="privateRoomPrice"
            className="block text-lg font-medium"
          >
            Private Room
          </label>
          <div>{privateRoomPrice * hour} NZD</div> */}
          <label
            htmlFor="privateRoomPrice"
            className="block text-lg font-medium"
          >
            Total Price
          </label>
          {amount > 0 ? <span>{amount} NZD</span> : <span>&nbsp;</span>}
          <input type="hidden" name="price" value={amount} />
        </div>

        {/* Submit 버튼 */}
        <SubmitButton context="Book Now" status="Booking" color="green" />
      </form>
    </div>
  );
}
