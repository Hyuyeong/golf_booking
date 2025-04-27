import Link from "next/link";
import Navigation from "./_components/Navigation";
import Image from "next/image";
import BackgroundImage from "@/public/08.jpg";

export default function Home() {
  return (
    <>
      <div className="relative w-full h-[650px]">
        <Image
          src={BackgroundImage}
          alt="image"
          fill
          style={{ objectFit: "cover" }}
          priority // 히어로 영역이니까 바로 로딩
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-3xl md:text-5xl font-bold mb-4">
            Elevate your game
          </p>
          <p className="text-2xl md:text-4xl mb-6">
            Every swing starts with a booking
          </p>
          <Link href="/booking">
            <button className="px-6 py-3 bg-green-600 cursor-pointer hover:bg-green-500 text-white font-semibold shadow-lg transition-all duration-300">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
