import { NextRequest, NextResponse } from "next/server"
 
export default function POST(request: Request) {
    return NextResponse.json({ message: "Form submitted successfully" });
}