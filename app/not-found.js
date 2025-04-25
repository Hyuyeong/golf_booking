import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-4">
        404 - Not Found
      </h1>
      <p className="text-gray-600">
        We couldn't find the page you're looking for.
      </p>

      <Link href="/">
        <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Go to Home
        </button>
      </Link>
    </div>
  );
}
