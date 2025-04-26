// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { query } from "@/app/_lib/db"; // Adjust if your path differs

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials;

//         // Query to check if the user exists
//         const result = await query(
//           "SELECT * FROM Users WHERE EmailAddress = ?",
//           [email]
//         );

//         if (result.length === 0) {
//           throw new Error("No user found");
//         }

//         const user = result[0];

//         // Check if password matches the hash in the database
//         const passwordMatch = await bcrypt.compare(password, user.PasswordHash);
//         if (!passwordMatch) {
//           throw new Error("Incorrect password");
//         }

//         // Return user data to be saved in session
//         return {
//           id: user.Id,
//           username: user.UserName, // Ensure that 'UserName' matches the column in DB
//           email: user.EmailAddress,
//         };
//       },
//     }),
//   ],
//   session: {
//     jwt: true, // Use JWT session
//   },
//   callbacks: {
//     // Token callback
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.username = user.username; // Ensure consistent naming here
//         token.email = user.email;
//       }
//       return token;
//     },
//     // Session callback
//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.user.username = token.username; // Ensure consistent naming here
//       session.user.email = token.email;
//       return session;
//     },
//   },
// });

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { query } from "@/app/_lib/db"; // Adjust if your path differs

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        const result = await query(
          "SELECT * FROM Users WHERE EmailAddress = ?",
          [email]
        );

        if (result.length === 0) {
          throw new Error("No user found");
        }

        const user = result[0];

        const passwordMatch = await bcrypt.compare(password, user.PasswordHash);
        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return {
          id: user.Id,
          username: user.UserName,
          email: user.EmailAddress,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.email = token.email;
      return session;
    },
  },
};

// ⬇️ 여기서 authOptions를 사용해서 handler export
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
