import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./src/db";
import { users } from "./src/db/schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string))
          .limit(1);

        if (!user.length || user[0].password !== credentials.password) {
          return null;
        }

        return {
          id: user[0].id,
          email: user[0].email!,
          name: user[0].name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
});
