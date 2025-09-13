import NextAuth, { type DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import GitHub from "next-auth/providers/github"
import { refreshFacebookAccessToken, refreshGitHubAccessToken, refreshGoogleAccessToken } from "./app/actions/refreshTokens"

// ✅ Module augmentation to extend the types for Session and JWT
declare module "next-auth" {
  interface Session {
    // Custom field added to session object
    provider?: string;
    accessToken?: string;
    error?: string;
    accessTokenExpires?: number;
    user?: {
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
    accessTokenExpires?: number;
    error?: string;
    user?: {
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

      if (account && user) {
        const typedUser = user as {
          name?: string | null;
          email?: string | null;
          image?: string | null;
        };

        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = Date.now() + (account.expires_in ? account.expires_in * 1000 : 0);
        token.provider = account.provider;
        token.user = {
          name: typedUser.name ?? null,
          email: typedUser.email ?? null,
          image: typedUser.image ?? null,
        };

        return token;
      }


      // If token still valid, return it
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Otherwise refresh based on provider
      // if (token.provider === "google") return await refreshGoogleAccessToken(token);
      // if (token.provider === "facebook") return await refreshFacebookAccessToken(token);
      // if (token.provider === "github") return await refreshGitHubAccessToken(token);

      switch (token.provider) {
        case "google":
          return await refreshGoogleAccessToken(token)
        case "facebook":
          return await refreshFacebookAccessToken(token)
        case "github":
          return await refreshGitHubAccessToken(token)
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
