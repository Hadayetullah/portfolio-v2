'use server';

import { auth } from "@/auth";

export async function getAuthInfo() {
    const response = await auth();
    console.log("Response : ", response);
    return response;
}