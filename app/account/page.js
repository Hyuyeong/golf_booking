import Link from "next/link";

function page() {
  return (
    <div>
      account page
      <Link href="/account/profile">profile </Link>
    </div>
  );
}

export default page;
