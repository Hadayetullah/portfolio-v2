'use server';

export async function refreshGoogleAccessToken(token: any) {
  try {
    const environment = process.env;
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: environment.AUTH_GOOGLE_ID!,
        client_secret: environment.AUTH_GOOGLE_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    // if (!response.ok) throw refreshedTokens;
    if (!response.ok) {
      console.error("Google refresh error:", refreshedTokens);
      throw refreshedTokens;
    }


    // console.log("refreshedTokens : ", refreshedTokens);
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // fallback
    };
  } catch (error) {
    console.error("Error refreshing Google access token", error);
    return { ...token, error: "RefreshAccessTokenError" as const };
  }
}



export async function refreshFacebookAccessToken(token: any) {
  try {
    const response = await fetch("https://graph.facebook.com/v23.0/oauth/access_token", {
      method: "GET", // Facebook requires GET here
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const refreshedTokens = await response.json();

    if (!response.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, // usually 60 days
    };
  } catch (error) {
    console.error("Error refreshing Facebook access token", error);
    return { ...token, error: "RefreshAccessTokenError" as const };
  }
}



export async function refreshGitHubAccessToken(token: any) {
  try {
    const environment = process.env;
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", "Accept": "application/json" },
      body: new URLSearchParams({
        client_id: environment.AUTH_GITHUB_ID!,
        client_secret: environment.AUTH_GITHUB_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing GitHub access token", error);
    return { ...token, error: "RefreshAccessTokenError" as const };
  }
}

