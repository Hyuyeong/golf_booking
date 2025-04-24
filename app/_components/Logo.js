import Link from "next/link";
import Image from "next/image";
import LogoImage from "@/public/logo.png";

function Logo() {
  return (
    <div>
      <Link href="/">
        <Image
          src={LogoImage}
          quality={100}
          width="100"
          height="100"
          alt="logo"
        />
      </Link>
    </div>
  );
}

export default Logo;
