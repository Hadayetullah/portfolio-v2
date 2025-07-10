'use server';

import { signIn } from "@/auth";

export async function socialLogin(data:string) {
    // console.log(data);
    await signIn(data, {redirectTo: '/#contact'})
}