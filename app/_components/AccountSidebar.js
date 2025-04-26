"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function AccountSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/account", label: "Home" },
    { href: "/account/bookings", label: "Bookings" },
    { href: "/account/profile", label: "Profile" },
  ];

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" }); // 로그아웃 후 이동할 페이지
  };

  return (
    <div className="w-1/5 bg-green-50 p-6 space-y-4 text-lg font-medium">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block pb-1 border-b-2 transition-all duration-300 ${
              isActive
                ? "text-green-700 border-green-500 font-semibold"
                : "border-transparent hover:border-green-300 hover:text-green-600"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
      <button
        className="mt-70 block text-left w-full pt-4 cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
