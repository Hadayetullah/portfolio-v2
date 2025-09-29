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

//   cookieStore.set('form_data', JSON.stringify(formData), {
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

export async function setManualAccessToken(accessToken: string) {
  const cookieStore = await cookies();
  const decodedAccessToken = await decodeToken(accessToken);

  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

  const accessTokenExpiry = decodedAccessToken.exp - currentTime;

  const environment = process.env;
  const isProduction = environment.NODE_ENV === "production";

  cookieStore.set('manual_access_token', accessToken, {
    httpOnly: isProduction,
    secure: isProduction,
    path: '/',
    maxAge: accessTokenExpiry > 0 ? accessTokenExpiry : 0,
  })
}

export async function validateManualAccessToken() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('manual_access_token')?.value

  if (accessToken && accessToken != undefined) {
    const decodedAccessToken = await decodeToken(accessToken);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    const accessTokenExpiry = decodedAccessToken.exp - currentTime;
    return accessTokenExpiry > 0 ? accessToken : null;
  }

  return null;
}


export async function setAppAccessToken(provider: string, accessToken: string) {
  const cookieStore = await cookies();
  const decodedAccessToken = await decodeToken(accessToken);

  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

  const accessTokenExpiry = decodedAccessToken.exp - currentTime;

  const environment = process.env;
  const isProduction = environment.NODE_ENV === "production";

  cookieStore.set(`${provider}_access_token`, accessToken, {
    httpOnly: isProduction,
    secure: isProduction,
    path: '/',
    maxAge: accessTokenExpiry > 0 ? accessTokenExpiry : 0,
  })
}

export async function validateProviderAccessToken(provider: string) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(`${provider}_access_token`)?.value

  if (accessToken && accessToken != undefined) {
    const decodedAccessToken = await decodeToken(accessToken);
    const currentTime = Math.floor(Date.now() / 1000) - 300; // Current time in seconds

    const accessTokenExpiry = decodedAccessToken.exp - currentTime;
    return accessTokenExpiry > 0 ? accessToken : null;
  }

  return null;
}

export async function setFormDataCookie(formData: FormData) {
  const cookieStore = await cookies();

  const environment = process.env;
  const isProduction = environment.NODE_ENV === "production";

  cookieStore.set('form_data', JSON.stringify(formData), {
    httpOnly: isProduction,
    secure: isProduction,
    path: '/',
    // maxAge: accessTokenExpiry > 0 ? accessTokenExpiry : 0,
  });

  deleteTmpFormCookie();

  return true;
}


export async function setTmpFormDataCookie(formData: FormData) {
  const cookieStore = await cookies();

  const environment = process.env;
  const isProduction = environment.NODE_ENV === "production";

  cookieStore.set('tmp_form_data', JSON.stringify(formData), {
    httpOnly: isProduction,
    secure: isProduction,
    path: '/',
    // maxAge: accessTokenExpiry > 0 ? accessTokenExpiry : 0,
  });

  return true;
}

export async function getFormCookie() {
  const cookieStore = await cookies()
  const formDataCookie = cookieStore.get('form_data')?.value
  return formDataCookie && formDataCookie != undefined ? JSON.parse(formDataCookie) : null
}

export async function getTmpFormCookie() {
  const cookieStore = await cookies()
  const formDataCookie = cookieStore.get('tmp_form_data')?.value
  return formDataCookie && formDataCookie != undefined ? JSON.parse(formDataCookie) : null
}

export async function deleteFormCookie() {
    const cookieStore = await cookies();
    cookieStore.delete('form_data');
}

export async function deleteTmpFormCookie() {
    const cookieStore = await cookies();
    cookieStore.delete('tmp_form_data');
}

export async function deleteAccessTokenCookie() {
    const cookieStore = await cookies();
    cookieStore.delete('manual_access_token');
}