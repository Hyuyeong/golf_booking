import Link from "next/link";
import AccountSidebar from "../_components/AccountSidebar";

function layout({ children }) {
  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-2xl font-semibold text-green-700 mb-4 pb-3 border-b">
        Account Section
      </h2>
      <div className="flex min-h-screen">
        <AccountSidebar />
        <div className="w-4/5 p-6">{children}</div>
      </div>
    </div>
  );
}

export default layout;
