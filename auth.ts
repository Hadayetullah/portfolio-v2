// Import NextAuth and session type helper
import NextAuth, { type DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import GitHub from "next-auth/providers/github"

// ✅ Module augmentation to extend the types for Session and JWT
declare module "next-auth" {
  interface Session {
    // Custom field added to session object
    provider?: string
  }

  interface JWT {
    // Custom field added to JWT token object
    provider?: string
  }
}

// ✅ NextAuth configuration
export const { handlers, auth, signIn, signOut } = NextAuth({
  // OAuth Providers: Google, Facebook, GitHub
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",            // Always show the consent screen
          access_type: "offline",       // Request refresh token
          response_type: "code",        // Standard OAuth2 response type
        },
      },
    }),

    Facebook({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    GitHub({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  // ✅ Callback functions to customize token/session behavior
  // callbacks: {
  //   // This runs during sign-in and on each JWT refresh
  //   async jwt({ token, account }) {
  //     if (account) {
  //       // Save the provider name (e.g., 'google') into the token
  //       token.provider = account.provider;
  //     }
  //     return token;
  //   },

  //   // This runs when session is checked (e.g., `useSession()`)
  //   async session({ session, token }) {
  //     // Add the provider to the session object so it's available on the client
  //     session.provider = token.provider as string;
  //     return session;
  //   },
  // }

  callbacks: {
    async jwt({ token, account, profile, user }) {
      console.log("🔑 JWT callback:");
      console.log("token:", token);
      console.log("account:", account);
      console.log("profile:", profile);
      console.log("user:", user);

      if (account) {
        // Save the provider name (e.g., 'google') into the token
        token.provider = account.provider;
      }

      return token;
    },

    async session({ session, token, user }) {
      console.log("🟢 Session callback:");
      console.log("session:", session);
      console.log("token:", token);
      console.log("user:", user);

      session.provider = token.provider as string;

      return session;
    },
  }

})
