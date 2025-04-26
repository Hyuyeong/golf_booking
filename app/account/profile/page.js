import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { updateUser } from "../actions/updateUser";
import { query } from "@/app/_lib/db";
import SubmitButton from "@/app/_components/SubmitButton";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>You must be logged in</div>;
  }

  // DB에서 최신 유저 정보 가져오기
  const userId = session.user.id;
  const result = await query("SELECT * FROM Users WHERE Id = ?", [userId]);
  const user = result[0];

  return (
    <>
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Update your profile
      </h2>

      <form action={updateUser} className="space-y-4 flex flex-col max-w-xs">
        <input type="hidden" name="userId" value={user.Id} />

        <label htmlFor="username" className="block font-medium mb-1">
          Username
        </label>
        <input
          id="username"
          name="username"
          defaultValue={user.UserName}
          className="border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 px-2 py-1 mb-1 rounded outline-none"
        />
        <SubmitButton />
      </form>
    </>
  );
}
