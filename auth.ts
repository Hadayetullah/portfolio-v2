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
      picture?: string | null;
    };
  }

  interface JWT {
    // Custom field added to JWT token object
    provider?: string;
    accessToken?: string;
    refreshToken?: string | null;
    accessTokenExpires?: number;
    error?: string;
    user?: {
      name?: string | null;
      email?: string | null;
      picture?: string | null;
    }
  }
}

// ✅ NextAuth configuration
let accountObj = {} as any;
let isTokenObjTaken = false;
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

      if (account != undefined) {
        accountObj = account;
      }
      console.log("accountObj : ", accountObj);
      
      if (token && token.exp && isTokenObjTaken === false) {
        console.log("accountObj : ", accountObj);
        // isTokenObjTaken = true; // To prevent overwriting on subsequent calls
        const typedUser = token as {
          name?: string | null;
          email?: string | null;
          picture?: string | null;
        };

        token.accessToken = accountObj?.access_token;
        token.refreshToken = accountObj?.refresh_token ?? null;
        token.provider = accountObj.provider;
        token.accessTokenExpires = Date.now() + token.exp;
        token.user = {
          name: typedUser.name ?? null,
          email: typedUser.email ?? null,
          picture: typedUser.picture ?? null,
        };

        return token;
      };

      // If token still valid, return it
      if (Date.now() < (token.accessTokenExpires as number)) {
        console.log("token still valid");
        return token;
      }

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

      console.log("session : ", session)

      return session;
    },
  }

})
