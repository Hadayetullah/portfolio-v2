import { NextRequest, NextResponse } from "next/server"
import { getProviderInfo } from "@/app/actions/getAuthInfo";
import { setAccessToken, validateAccessToken } from "@/app/actions/handleCookies";
 
export async function POST(request: Request) {
    try {
        const submissionData = await request.json();
        let provider_details = null;
        if (submissionData.providerType.trim() === "social") {
            provider_details = await getProviderInfo();
            submissionData.formData.email = provider_details?.user?.email;
        }

        const accessToken = await validateAccessToken();
        const apiEndpoint = submissionData.providerType === "manual" && accessToken === null ? '/form/signup/' : '/form/process-message/';
        
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (accessToken) {
            headers["Authorization"] = `Bearer ${accessToken}`;
        }

        const environmentVariables = process.env;
        const environment = environmentVariables.NEXT_PUBLIC_NODE_ENV;
        const development = environmentVariables.NEXT_PUBLIC_BACKEND_API_DEVELOPMENT_URL;
        const production = environmentVariables.NEXT_PUBLIC_BACKEND_API_PRODUCTION_URL;
        
        const domain = environment === 'development' ? development : production;
        const url = domain + apiEndpoint;
        
        submissionData.formData.provider = submissionData.providerType;
        submissionData.formData.provider_details = provider_details;
        const backendResponse = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(submissionData.formData),
        })

        const data = await backendResponse.json();
        console.log("Response from backend : ", data);
        if (!backendResponse.ok) {
            return NextResponse.json({success: false, error: data});
        }

        if (data.token) {
            await setAccessToken(data.token);
        }
        return NextResponse.json({success: true, data: data});

    } catch (error) {
        console.error("Error in form submission: ", error);
        return NextResponse.json({success: false, error: {error: "Something went wrong"}});
    }
}