// SessionProviderWrapper component for NextAuth.js
// This component wraps the application in a SessionProvider to manage user sessions.

"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

export default function SessionProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <SessionProvider
      refetchOnWindowFocus={false}   // stops calls when switching tabs
      refetchInterval={0}           // disable polling (default: 0 = no interval)
      refetchWhenOffline={false}    // don’t refetch when offline/online changes
    >
      {children}
    </SessionProvider>
  )
}
