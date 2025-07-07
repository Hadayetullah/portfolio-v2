import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // The ! symbol here is called the non-null assertion operator in TypeScript. 
    // That means the value is absolutely defined and not null or undefined.
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
}

export default NextAuth(authOptions)
