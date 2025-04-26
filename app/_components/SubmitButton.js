// app/account/profile/SubmitButton.js
"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`relative mt-2 px-6 py-1 rounded text-white overflow-hidden ${
        pending
          ? "bg-gray-400"
          : "bg-green-600 hover:bg-green-700 cursor-pointer"
      }`}
      style={pending ? { cursor: "not-allowed" } : {}}
    >
      <span className={pending ? "invisible" : "visible"}>Update</span>
      <span
        className={`absolute inset-0 flex items-center justify-center ${pending ? "visible" : "invisible"}`}
      >
        Updating...
      </span>
    </button>
  );
}
