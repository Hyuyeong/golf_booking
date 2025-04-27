import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { query } from "@/app/_lib/db";

async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div>You must be logged in</div>;
  }

  // DB에서 최신 유저 정보 가져오기
  const userId = session.user.id;
  const result = await query("SELECT * FROM Users WHERE Id = ?", [userId]);
  const user = result[0];

  return (
    <div>
      <h1>Welcome, {user.UserName}!</h1>
      {/* <p>Here is your dashboard content.</p> */}
      {/* 대시보드 내용 추가 */}
    </div>
  );
}

export default Dashboard;
