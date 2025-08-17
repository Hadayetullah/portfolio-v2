import { NextRequest, NextResponse } from "next/server"
 
export async function POST(request: Request) {
    try {
        const submissionData = await request.json();
        const apiEndpoint = submissionData.providerType === "manual" ? '/form/manual/' : '/form/social/';
        
        const environmentVariables = process.env;
        const environment = environmentVariables.NEXT_PUBLIC_NODE_ENV;
        const development = environmentVariables.NEXT_PUBLIC_BACKEND_API_DEVELOPMENT_URL;
        const production = environmentVariables.NEXT_PUBLIC_BACKEND_API_PRODUCTION_URL;
        
        const domain = environment === 'development' ? development : production;
        const url = domain + apiEndpoint;
        
        submissionData.formData.provider = submissionData.providerType;
        const backendResponse = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
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