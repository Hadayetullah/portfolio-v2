import { NextRequest, NextResponse } from "next/server"
 
export async function POST(request: Request) {
    try {
        const formData = await request.json();
        console.log("FormData route : ", formData)
        const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/form/manual/`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
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