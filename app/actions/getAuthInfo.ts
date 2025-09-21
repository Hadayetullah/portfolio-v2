'use server';

import { auth } from "@/auth";
import { setProviderAccessToken, validateProviderAccessToken } from "./handleCookies";

interface ProviderInfoType {
  expires?: string;
  provider?: string;
  user?: {
    email?: string | null;
    image?: string | null;
    name?: string | null;
  }
}

interface SocialLoginPayload {
  provider: string;
  access_token: string;
}

export async function verifySocialLogin(payload: SocialLoginPayload) {
  try {
    const environmentVariables = process.env;
    const environment = environmentVariables.NEXT_PUBLIC_NODE_ENV;
    const development = environmentVariables.NEXT_PUBLIC_BACKEND_API_DEVELOPMENT_URL;
    const production = environmentVariables.NEXT_PUBLIC_BACKEND_API_PRODUCTION_URL;

    const domain = environment === "development" ? development : production;
    const url = `${domain}/form/social-verification/`; // points to SocialLoginVerifyView in Django

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store", // always fresh
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data };
    }

    console.log("social-verification response data : ", data);
    await setProviderAccessToken(payload.provider, data.access_token);
    return { success: true, data };
  } catch (error) {
    console.error("Error in verifySocialLogin:", error);
    return { success: false, error: "Something went wrong" };
  }
}

export async function getProviderDetails() {
    const response = await auth();
    console.log("Auth credential response server (getProviderDetails) : ", response);
    if (response) {
      const accessTokenExpiresDate = new Date(response.accessTokenExpires!);
      if (accessTokenExpiresDate < new Date()) {
        const result = await verifySocialLogin({
          provider: response.provider!,
          access_token: response.accessToken!,
        });

        if (result.success) {
          console.log("Verified:", result.data);
        } else {
          console.error("Error:", result.error);
        }

        return response;
      } else if (accessTokenExpiresDate > new Date()) {
        const providerAccessToken = await validateProviderAccessToken(response.provider!);
        console.log("providerAccessToken status : ", providerAccessToken);
        if (providerAccessToken != null) {
          console.log("Response portion of providerAccessToken : ", response);
          // Validate access_token sent from backend, created by simple JWT. If valid, return response.
          // Else call verifySocialLogin function to verify and get new access_token. (Tomorrow's task)
          let newObj = {
            ...response,
            nonProviderAccessToken: providerAccessToken
          }
          return newObj;
        } else {
          const result = await verifySocialLogin({
            provider: response.provider!,
            access_token: response.accessToken!,
          });

          if (result.success) {
            console.log("Verified (validateProviderAccessToken call) :", result.data);
          } else {
            console.error("Error (validateProviderAccessToken call) :", result.error);
          }

          return response;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
}

export async function getProviderInfo() {
    const response = await auth();
    console.log("Auth credential response server : ", response);
    if (response) {
      const expiresDate = new Date(response.expires);
      console.log("expiresDate : ", expiresDate);
      if (expiresDate > new Date()) {
        return response;
      } else {
        return null;
      }
    } else {
      return null;
    }
}


export async function getSocialInfo() {
  let newObj = null;

  const response = await auth();

  if (response) {
    const accessTokenExpiresDate = new Date(response.accessTokenExpires!);
    
    if (accessTokenExpiresDate < new Date()) {
      const result = await verifySocialLogin({
        provider: response.provider!,
        access_token: response.accessToken!,
      });

      if (result.success) {
        console.log("Verified:", result.data);
        newObj = {
          provider: response.provider || "",
          name: response.user?.name || "",
          email: response.user?.email || ""
        }

        return newObj;

      } else {
        console.error("Error:", result.error);
        return newObj;
      }

    } else if (accessTokenExpiresDate > new Date()) {
      const providerAccessToken = await validateProviderAccessToken(response.provider!);
      if (providerAccessToken != null) {
        let newObj = {
          provider: response.provider || "",
          name: response.user?.name || "",
          email: response.user?.email || ""
        }

        return newObj;

      } else {
        const result = await verifySocialLogin({
          provider: response.provider!,
          access_token: response.accessToken!,
        });

        if (result.success) {
          console.log("Verified (validateProviderAccessToken call) :", result.data);
          newObj = {
            provider: response.provider || "",
            name: response.user?.name || "",
            email: response.user?.email || ""
          }

          return newObj;
        } else {
          console.error("Error (validateProviderAccessToken call) :", result.error);
          return newObj;
        }

      }
    } else {
      return newObj;
    }
  } else {
    return newObj;
  }
}


