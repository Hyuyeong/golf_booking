import Link from "next/link";
import Logo from "./Logo";

function Navigation() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="text-2xl font-bold text-green-700">
        <Logo />
      </div>
      <ul className="flex space-x-6 text-gray-700 text-base font-medium">
        <li>
          <Link
            href="/booths"
            className="hover:text-green-600 transition-colors"
          >
            Booths
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="hover:text-green-600 transition-colors"
          >
            Account
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-green-600 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/booking"
            className="hover:text-green-600 transition-colors"
          >
            Booking
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
