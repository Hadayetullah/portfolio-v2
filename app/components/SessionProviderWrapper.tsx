// SessionProviderWrapper component for NextAuth.js
// This component wraps the application in a SessionProvider to manage user sessions.

"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

export default function SessionProviderWrapper({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
