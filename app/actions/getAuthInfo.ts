'use server';

import { auth } from "@/auth";

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
    return { success: true, data };
  } catch (error) {
    console.error("Error in verifySocialLogin:", error);
    return { success: false, error: "Something went wrong" };
  }
}

export async function getSocialAuthInfo() {
    const response = await auth();
    console.log("Auth credential response server (getSocialAuthInfo) : ", response);
    if (response) {
      const expiresDate = new Date(response.expires);
      // console.log("expiresDate : ", expiresDate);
      if (expiresDate < new Date()) {
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
      } else if (expiresDate > new Date()) {
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

export async function getAuthInfo() {
    const response = await auth();
    if (response) {
      const expiresDate = new Date(response.expires);
      if (expiresDate > new Date()) {
        let newObj = {
          provider: response.provider || "",
          name: response.user?.name || "",
          email: response.user?.email || ""
        }

        return newObj;

      } else {
        return "";
      }
    } else {
      return "";
    }
}


interface FormValues {
  name: string
  phone: string
  purpose: string
  message: string
}


// export async function setAuthAndFormCookies(authInfo: AuthInfoType | null, formValues: FormValues) {
//   const cookieStore = await cookies()

//   cookieStore.set('authInfo', JSON.stringify(authInfo), {
//     httpOnly: false,
//     path: '/',
//     // maxAge: 60 * 60 * 24 * 7, // 7 days
//   })

//   cookieStore.set('formValues', JSON.stringify(formValues), {
//     httpOnly: false,
//     path: '/',
//     // maxAge: 60 * 60 * 24 * 7,
//   })
// }


// export async function setAuthAndFormCookies(formValues: FormValues) {
//   const cookieStore = await cookies()

//   cookieStore.set('formValues', JSON.stringify(formValues), {
//     httpOnly: false,
//     path: '/',
//     // maxAge: 60 * 60 * 24 * 7,
//   })
// }

// export async function getFormCookies() {
//   const cookieStore = await cookies()
//   const formDataCookie = cookieStore.get('formValues')?.value
//   return formDataCookie ? JSON.parse(formDataCookie) : null
// }

// export async function deleteFormCookies() {
//     const cookieStore = await cookies();
//     cookieStore.delete('formValues');
// }