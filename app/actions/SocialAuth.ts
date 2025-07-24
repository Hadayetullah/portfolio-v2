'use server';

import { signIn, signOut } from "@/auth";

export async function socialLogin(data:string) {
    // console.log(data);
    await signIn(data, {redirectTo: '/#contact'})
}

export async function socialLogout() {
    await signOut();
}