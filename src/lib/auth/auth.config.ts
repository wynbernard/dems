import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {db} from "@/server/db/connection";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await db("admin_table")          // ← admin_table not users
          .where({ email: credentials.email })
          .where("is_active", 1)
          .first();
      
        if (!user) return null;
      
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password                               // ← password not password_hash
        );
      
        if (!isValid) return null;
      
        return {
          id:    String(user.admin_id),               // ← admin_id not id
          name:  `${user.f_name} ${user.l_name}`,     // ← combine f_name + l_name
          email: user.email,
          role:  user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
  },
});