import { NextRequest, NextResponse } from "next/server"
import { getProviderDetails } from "@/app/actions/getAuthInfo";
 
export async function POST(request: Request) {
    try {
        const submissionData = await request.json();
        const providerType = submissionData.providerType;
        console.log("Provider type : ", providerType);

        if (providerType.trim() != "social") {
            return NextResponse.json({success: false, error: {error: "Something went wrong. Please sign in again"}});
        }

        const provider_details = await getProviderDetails();

        console.log("provider_details in social-user route : ", provider_details);

        if (provider_details === null) {
            return NextResponse.json({success: false, error: {error: "Something went wrong. Please sign in again"}});
        }

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        headers["Authorization"] = `Bearer ${provider_details?.appAccessToken}`;
        submissionData.formData.email = provider_details?.user?.email;

        const environmentVariables = process.env;
        const environment = environmentVariables.NEXT_PUBLIC_NODE_ENV;
        const development = environmentVariables.NEXT_PUBLIC_BACKEND_API_DEVELOPMENT_URL;
        const production = environmentVariables.NEXT_PUBLIC_BACKEND_API_PRODUCTION_URL;
        
        const apiEndpoint = '/form/process-message/';
        const domain = environment === 'development' ? development : production;
        const url = domain + apiEndpoint;
        
        submissionData.formData.provider = provider_details.provider;
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

        return NextResponse.json({success: true, data: data});

    } catch (error) {
        console.error("Error in form submission: ", error);
        return NextResponse.json({success: false, error: {error: "Something went wrong"}});
    }
}