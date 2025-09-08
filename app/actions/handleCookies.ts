'use server';

import { cookies } from 'next/headers'

interface FormData {
  name: string
  phone: string
  purpose: string
  message: string
}


// export async function setAuthAndFormCookies(authInfo: AuthInfoType | null, formData: FormData) {
//   const cookieStore = await cookies()

//   cookieStore.set('authInfo', JSON.stringify(authInfo), {
//     httpOnly: false,
//     path: '/',
//     // maxAge: 60 * 60 * 24 * 7, // 7 days
//   })

//   cookieStore.set('formData', JSON.stringify(formData), {
//     httpOnly: false,
//     path: '/',
//     // maxAge: 60 * 60 * 24 * 7,
//   })
// }


export async function decodeToken(token:any) {
    const [, payloadBase64] = token.split(".");
    const decodedBuffer = Buffer.from(payloadBase64, "base64");
    const decodedString = decodedBuffer.toString("utf-8");
    const payload = JSON.parse(decodedString);
    return payload
}

export async function setAccessToken(accessToken: string) {
  const cookieStore = await cookies();
  const decodedAccessToken = await decodeToken(accessToken);

  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

  const accessTokenExpiry = decodedAccessToken.exp - currentTime;

  const environment = process.env;

  cookieStore.set('access_token', accessToken, {
    httpOnly: environment.NEXT_PUBLIC_NODE_ENV === 'production' ? true : false,
    secure: environment.NEXT_PUBLIC_NODE_ENV === 'production' ? true : false,
    path: '/',
    maxAge: accessTokenExpiry > 0 ? accessTokenExpiry : 0,
  })
}

export async function setFormDataCookie(formData: FormData) {
  console.log("setFormDataCookie : ", formData)
  const cookieStore = await cookies();

  const environment = process.env;

  cookieStore.set('formData', JSON.stringify(formData), {
    httpOnly: environment.NEXT_PUBLIC_NODE_ENV === 'production' ? true : false,
    secure: environment.NEXT_PUBLIC_NODE_ENV === 'production' ? true : false,
    path: '/',
    // maxAge: accessTokenExpiry > 0 ? accessTokenExpiry : 0,
  });

  deleteTmpFormCookie();

  return true;
}


export async function setTmpFormDataCookie(formData: FormData) {
  console.log("setTmpFormData : ", formData)
  const cookieStore = await cookies();

  const environment = process.env;

  cookieStore.set('tmpFormData', JSON.stringify(formData), {
    httpOnly: environment.NEXT_PUBLIC_NODE_ENV === 'production' ? true : false,
    secure: environment.NEXT_PUBLIC_NODE_ENV === 'production' ? true : false,
    path: '/',
    // maxAge: accessTokenExpiry > 0 ? accessTokenExpiry : 0,
  });

  return true;
}

export async function getFormCookie() {
  const cookieStore = await cookies()
  const formDataCookie = cookieStore.get('formData')?.value
  console.log("formDataCookie : ", formDataCookie)
  return formDataCookie && formDataCookie != undefined ? JSON.parse(formDataCookie) : null
}

export async function getTmpFormCookie() {
  const cookieStore = await cookies()
  const formDataCookie = cookieStore.get('tmpFormData')?.value
  console.log("getTmpFormCookie : ", formDataCookie)
  return formDataCookie && formDataCookie != undefined ? JSON.parse(formDataCookie) : null
}

export async function validateAccessToken() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  const decodedAccessToken = await decodeToken(accessToken);
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

  const accessTokenExpiry = decodedAccessToken.exp - currentTime;
  return accessTokenExpiry > 0 ? accessToken : null;
}

export async function deleteFormCookie() {
    const cookieStore = await cookies();
    cookieStore.delete('formData');
}

export async function deleteTmpFormCookie() {
    const cookieStore = await cookies();
    cookieStore.delete('tmpFormData');
}

export async function deleteAccessTokenCookie() {
    const cookieStore = await cookies();
    cookieStore.delete('access_token');
}