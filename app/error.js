"use client";

export default function GlobalError({ error, reset }) {
  console.error("Global Error:", error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Something went wrong
      </h1>
      <p className="text-gray-700 mb-6">
        {error.message || "Unexpected error occurred."}
      </p>
      <button
        onClick={reset}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}
