import { NextRequest, NextResponse } from "next/server"
import { getProviderInfo } from "@/app/actions/getAuthInfo";
import { setManualAccessToken, validateManualAccessToken } from "@/app/actions/handleCookies";
 
export async function POST(request: Request) {
    try {
        const submissionData = await request.json();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        let accessToken = null;

        let apiEndpoint = "";
        accessToken = await validateManualAccessToken();
        if (accessToken != null) {
            apiEndpoint = '/form/process-message/';
            headers["Authorization"] = `Bearer ${accessToken}`;
        } else {
            apiEndpoint = '/form/signup/';
        } 

        const environmentVariables = process.env;
        const environment = environmentVariables.NEXT_PUBLIC_NODE_ENV;
        const development = environmentVariables.NEXT_PUBLIC_BACKEND_API_DEVELOPMENT_URL;
        const production = environmentVariables.NEXT_PUBLIC_BACKEND_API_PRODUCTION_URL;
        
        const domain = environment === 'development' ? development : production;
        const url = domain + apiEndpoint;
        
        submissionData.formData.provider = submissionData.providerType;
        submissionData.formData.provider_details = null;
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
            await setManualAccessToken(data.token);
        }
        return NextResponse.json({success: true, data: data});

    } catch (error) {
        console.error("Error in form submission: ", error);
        return NextResponse.json({success: false, error: {error: "Something went wrong"}});
    }
}