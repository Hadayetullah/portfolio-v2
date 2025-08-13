import { NextRequest, NextResponse } from "next/server"
 
export async function POST(request: Request) {
    const formData = await request.json();
    console.log("FormData route : ", formData)
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/form/manual/`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })

    .then((response:any) => response.json())
    .then(data => {
        console.log("Response from backend : ", data);
    })
    .catch((error: any) => {
        console.log("Error from backend : ", error)
    })
    return NextResponse.json({ message: "Form submitted successfully" });
}