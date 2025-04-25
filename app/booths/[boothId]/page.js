import { query } from "@/app/_lib/db";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const id = params.boothId;
  const booths = await query("Select * From Booths;");
  const booth = booths.find((b) => b.Id.toString() === id);

  return { title: `${booth.Name}` };
}

export default async function BoothDetail({ params }) {
  const id = params.boothId;
  const booths = await query("Select * From Booths;");
  const booth = booths.find((b) => b.Id.toString() === id);

  if (!booth) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{booth.Name}</h1>
      <p className="text-gray-600 mb-2">{booth.Description}</p>
      {/* <img
        src={booth.imageUrl}
        alt={booth.name}
        className="w-full max-w-xl rounded-xl border"
      /> */}
    </div>
  );
}
