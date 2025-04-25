"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(session);

  // 세션 상태가 로딩 중일 때
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // 로그인되지 않은 경우 리디렉션
  if (!session) {
    router.push("/login"); // 로그인 페이지로 리디렉션
    return null;
  }

  return (
    <div>
      <h1>Welcome, {session.user.username}!</h1>
      <p>Here is your dashboard content.</p>
      {/* 대시보드 내용 추가 */}
    </div>
  );
}

export default Dashboard;
