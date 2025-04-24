import Link from "next/link";
import Navigation from "./_components/Navigation";
import Image from "next/image";
import BackgroundImage from "@/public/background.png";

export default function Home() {
  return (
    <>
      <div>
        <Image src={BackgroundImage} alt="image" className="w-full" />
        <p>Book today and get ready to</p>
        <p>love your game</p>
        <Link href="/booking">
          <button>Book Now</button>
        </Link>
      </div>
    </>
  );
}
