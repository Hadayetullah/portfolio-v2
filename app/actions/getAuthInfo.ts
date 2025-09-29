'use server';

import { auth } from "@/auth";
import { setAppAccessToken, validateProviderAccessToken } from "./handleCookies";

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
  provider_details: any;
}

export async function verifySocialLogin(payload: SocialLoginPayload) {
  try {
    const environmentVariables = process.env;
    const environment = environmentVariables.NODE_ENV;
    const development = environmentVariables.BACKEND_API_DEVELOPMENT_URL;
    const production = environmentVariables.BACKEND_API_PRODUCTION_URL;

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

    await setAppAccessToken(payload.provider, data.access_token);
    return { success: true, data };
  } catch (error) {
    console.error("Error in verifySocialLogin:", error);
    return { success: false, error: "Something went wrong" };
  }
}

export async function getProviderDetails() {
    const response = await auth();
    
    if (response?.provider) {
      if (response.provider === 'github') {
        const appAccessToken = await validateProviderAccessToken(response.provider!);
        if (appAccessToken != null) {
          let newObj = {
            ...response,
            appAccessToken: appAccessToken
          }
          return newObj;
        } else {
          const result = await verifySocialLogin({
            provider: response.provider!,
            access_token: response.accessToken!,
            provider_details: response!,
          });

          if (result.success) {
            // console.log("Verified (validateProviderAccessToken call) :", result.data);
            await setAppAccessToken(response.provider!, result.data.access_token);

            let newObj = {
              ...response,
              appAccessToken: result.data.access_token
            }
            return newObj;
          } else {
            console.error("Error (validateProviderAccessToken call) :", result.error);
            return null;
          }
        }
      }

      const accessTokenExpiresDate = new Date(response.accessTokenExpires!);
      if (accessTokenExpiresDate < new Date()) {
        return null;
      } else if (accessTokenExpiresDate > new Date()) {
        const appAccessToken = await validateProviderAccessToken(response.provider!);
        if (appAccessToken != null) {
          let newObj = {
            ...response,
            appAccessToken: appAccessToken
          }
          return newObj;
        } else {
          const result = await verifySocialLogin({
            provider: response.provider!,
            access_token: response.accessToken!,
            provider_details: response!,
          });

          if (result.success) {
            // console.log("Verified (validateProviderAccessToken call) :", result.data);
            await setAppAccessToken(response.provider!, result.data.access_token);

            let newObj = {
              ...response,
              appAccessToken: result.data.access_token
            }
            return newObj;
          } else {
            console.error("Error (validateProviderAccessToken call) :", result.error);
            return null;
          }
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
    if (response.provider === 'github') {
      let newObj = {
        provider: response.provider || "",
        name: response.user?.name || "",
        email: response.user?.email || ""
      }

      return newObj;
    }
    
    const accessTokenExpiresDate = new Date(response.accessTokenExpires!);
    
    if (accessTokenExpiresDate < new Date()) {
      return newObj;

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
          provider_details: response!,
        });

        if (result.success) {
          // console.log("Verified (validateProviderAccessToken call) :", result.data);
          await setAppAccessToken(response.provider!, result.data.access_token);
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


