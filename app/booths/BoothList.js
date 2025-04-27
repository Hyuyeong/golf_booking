// "use client";
// import { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "../_components/Spinner";
import { query } from "../_lib/db";
import Link from "next/link";
async function Boothlist() {
  //   const [booths, setBooths] = useState([]);
  //   const [loading, setLoading] = useState(true);
  const booths = await query("SELECT * FROM Booths");

  //   useEffect(() => {
  //     fetch("/api/booths")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setBooths(data);
  //         setLoading(false);
  //       });
  //   }, []);

  //   console.log(booths);

  //   if (loading) return <Spinner />;

  return (
    <table className="min-w-full border-separate border-spacing-y-3">
      <thead>
        <tr className="bg-gradient-to-r from-green-100 to-green-50 text-gray-700 rounded-lg">
          <th className="px-6 py-3 text-left text-sm font-bold uppercase">
            No.
          </th>
          <th className="px-6 py-3 text-left text-sm font-bold uppercase">
            Image
          </th>
          <th className="px-6 py-3 text-left text-sm font-bold uppercase">
            Name
          </th>
          <th className="px-6 py-3 text-left text-sm font-bold uppercase">
            Description
          </th>
          <th className="px-6 py-3 text-left text-sm font-bold uppercase">
            Booking
          </th>
        </tr>
      </thead>
      <tbody>
        {booths.map((booth, index) =>
          booth.Id > 2 ? null : (
            <tr
              key={booth.Id}
              className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl"
            >
              <td className="px-6 py-4 font-medium text-gray-600">
                {index + 1}
              </td>
              <td className="px-6 py-4 w-40">
                <div className="relative w-32 h-32">
                  <Image
                    src={booth.ImageAddress}
                    alt={booth.Name}
                    fill
                    className="rounded-lg object-cover shadow"
                  />
                </div>
              </td>
              <td className="px-6 py-4 text-lg font-semibold text-gray-800">
                {booth.Name}
              </td>
              <td className="px-6 py-4 text-gray-600">{booth.Descrpition}</td>
              <td className="px-6 py-4 text-gray-600">
                <Link href="/booking">
                  <div className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow transition">
                    Booking
                  </div>
                </Link>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}

export default Boothlist;
