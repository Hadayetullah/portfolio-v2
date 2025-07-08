import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { NextRequest } from "next/server"

export async function authOptions(request: NextRequest) {
  console.log(request.method)
  const url = new URL(request.url)
  const isDefaultSigninPage =
    request.method === "GET" && url.pathname.includes("/api/auth/signin")

  const providers = [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // The ! symbol here is called the non-null assertion operator in TypeScript. 
      // That means the value is absolutely defined and not null or undefined.
    }),
  ]

  if (isDefaultSigninPage) {
    // Remove Google (hide from default sign-in UI)
    providers.pop()
  }

  return {
    providers,
    secret: process.env.NEXTAUTH_SECRET!,
  }
}

export async function GET(request: NextRequest, context: any) {
  const options = await authOptions(request)
  const handler = NextAuth(options)
  return handler(request, context)
}

export async function POST(request: NextRequest, context: any) {
  const options = await authOptions(request)
  const handler = NextAuth(options)
  return handler(request, context)
}

