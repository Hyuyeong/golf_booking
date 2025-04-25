import bcrypt from "bcryptjs";
import { query } from "@/app/_lib/db"; // Import your database query function

export async function POST(req) {
  const { email, username, password } = await req.json();

  // Check if email already exists
  const result = await query("SELECT * FROM Users WHERE EmailAddress = ?", [
    email,
  ]);

  if (result.length > 0) {
    return new Response(JSON.stringify({ error: "Email already exists" }), {
      status: 400,
    });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user into the database
  const insertResult = await query(
    "INSERT INTO Users (EmailAddress, PasswordHash, UserName, Role) VALUES (?, ?, ?, ?)",
    [email, hashedPassword, username, "User"]
  );

  if (insertResult.affectedRows > 0) {
    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      { status: 200 }
    );
  } else {
    return new Response(JSON.stringify({ message: "Failed to create user" }), {
      status: 500,
    });
  }
}
