import NextAuth, { type DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import GitHub from "next-auth/providers/github"
import { refreshFacebookAccessToken, refreshGoogleAccessToken } from "./app/actions/refreshTokens"

// ✅ Module augmentation to extend the types for Session and JWT
declare module "next-auth" {
  interface Session {
    // Custom field added to session object
    provider?: string;
    accessToken?: string;
    error?: string;
    accessTokenExpires?: number | null;
    user?: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface JWT {
    // Custom field added to JWT token object
    provider?: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires: number | null;
    error?: string;
    user?: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
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
  callbacks: {
    // This runs during sign-in and on each JWT refresh
    async jwt({ token, account, profile, user }) {
      // console.log("🔑 JWT callback:");
      // console.log("token:", token);
      // console.log("account:", account);
      // console.log("profile:", profile);
      // console.log("user:", user);

      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token ?? null;
        token.provider = account.provider;

        // For providers that give expires_at
        if (account?.expires_at) {
          token.accessTokenExpires = account.expires_at * 1000; // convert to ms
        } else {
          // GitHub: no expiry, treat as never expiring
          token.accessTokenExpires = null;
        }

        token.user = {
          name: user?.name ?? null,
          email: user?.email ?? null,
          picture: user?.image ?? null,
        };
        return token;
      }

      // If provider has expiry, check it
      // console.log("Provider and token expires : ", token.provider, new Date(typeof token.accessTokenExpires === "number" ? token.accessTokenExpires : 0));
      if (typeof token.accessTokenExpires === "number" && Date.now() < token.accessTokenExpires) {
        // console.log("Provider and token expires : ", token.provider, new Date(token.accessTokenExpires));
        return token; // Still valid
      }


      // GitHub has no expiry -> always valid
      if (token.provider === "github") {
        return token;
      }


      switch (token.provider) {
        case "google":
          return await refreshGoogleAccessToken(token)
        case "facebook":
          return await refreshFacebookAccessToken(token)
        // case "github":
        //   return await refreshGitHubAccessToken(token)
        default:
          return token
      }
    },

    // This runs when session is checked (e.g., `useSession()`)
    async session({ session, token, user }) {
      // console.log("🟢 Session callback:");
      // console.log("session:", session);
      // console.log("token:", token);
      // console.log("user:", user);

      session.user = token.user as any;
      session.accessToken = token.accessToken as string;
      session.error = token.error as string;
      session.provider = token.provider as string;
      session.accessTokenExpires = token.accessTokenExpires as number;

      return session;
    },
  }

})
