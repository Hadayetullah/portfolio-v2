'use server';

import { cookies } from 'next/headers'
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