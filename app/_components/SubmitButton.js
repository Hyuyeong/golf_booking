// app/account/profile/SubmitButton.js
"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ context, status, color = "green" }) {
  const { pending } = useFormStatus();

  // color를 받아와서 버튼의 배경 색을 설정
  const buttonColor =
    color === "red"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-green-600 hover:bg-green-700";

  return (
    <button
      type="submit"
      disabled={pending}
      className={`relative mt-2 w-full px-6 py-1 rounded text-white overflow-hidden ${
        pending
          ? "bg-gray-400 cursor-not-allowed"
          : `${buttonColor} transition-all duration-300 ease-in-out`
      }`}
      style={pending ? { cursor: "not-allowed" } : {}}
    >
      <span className={pending ? "invisible" : "visible"}>{context}</span>
      <span
        className={`absolute inset-0 flex items-center justify-center ${pending ? "visible" : "invisible"}`}
      >
        {status}...
      </span>
    </button>
  );
}
