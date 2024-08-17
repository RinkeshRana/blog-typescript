import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import client from "@/lib/mongodb";
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [google],
  secret: process.env.AUTH_SECRET,
});
