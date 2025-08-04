'use server';

import { auth } from "@/auth";

export async function getProviderInfo() {
    const response = await auth();
    console.log("Response : ", response);
    return response;
}


import { cookies } from 'next/headers'

interface ProviderInfoType {
  expires?: string
  provider?: string
  user?: {
    email?: string | null
    image?: string | null
    name?: string | null
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


export async function setAuthAndFormCookies(formValues: FormValues) {
  const cookieStore = await cookies()

  cookieStore.set('formValues', JSON.stringify(formValues), {
    httpOnly: false,
    path: '/',
    // maxAge: 60 * 60 * 24 * 7,
  })
}

export async function getFormCookies() {
  const cookieStore = await cookies()
  const formDataCookie = cookieStore.get('formValues')?.value
  return formDataCookie ? JSON.parse(formDataCookie) : null
}

export async function deleteFormCookies() {
    const cookieStore = await cookies();
    cookieStore.delete('formValues');
}