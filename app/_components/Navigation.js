"use client";
import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";

function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/login", label: "Login" },
    { href: "/booths", label: "Booths" },
    { href: "/account", label: "Account" },
    { href: "/about", label: "About" },
    { href: "/booking", label: "Booking" },
  ];

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#FAF9F6] shadow-md">
      <div className="text-2xl font-bold text-green-700">
        <Logo />
      </div>
      <ul className="flex space-x-6 text-gray-700 text-base font-medium">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <>
              <li>
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block pb-1 border-b-2 transition-all duration-300 ${
                    isActive
                      ? "text-green-700 border-green-700 font-semibold"
                      : "border-transparent hover:border-green-700 hover:text-green-700"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default Navigation;
