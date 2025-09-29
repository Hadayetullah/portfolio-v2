import { NextRequest, NextResponse } from "next/server"
import { setManualAccessToken } from "@/app/actions/handleCookies";
 
export async function POST(request: Request) {
    try {
        const submissionData = await request.json();

        if (submissionData.otp.trim() === "") {
            return NextResponse.json({success: false, error: {error: "OTP code is required"}})
        }

        const apiEndpoint = '/form/otp-verification/';
        
        const environmentVariables = process.env;
        const environment = environmentVariables.NODE_ENV;
        const development = environmentVariables.BACKEND_API_DEVELOPMENT_URL;
        const production = environmentVariables.BACKEND_API_PRODUCTION_URL;
        
        const domain = environment === 'development' ? development : production;
        const url = domain + apiEndpoint;

        const formData = submissionData.formData;
        
        formData.provider = submissionData.providerType;
        formData.otp_code = submissionData.otp;

        const backendResponse = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })

        const data = await backendResponse.json();
        console.log("Response from backend (otp) : ", data);
        if (!backendResponse.ok) {
            return NextResponse.json({success: false, error: data});
        }

        await setManualAccessToken(data.token);
        return NextResponse.json({success: true, data: data});

    } catch (error) {
        console.error("Error in form submission: ", error);
        return NextResponse.json({success: false, error: {error: "Something went wrong"}});
    }
}