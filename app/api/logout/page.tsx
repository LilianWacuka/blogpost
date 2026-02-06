import { NextResponse } from "next/server";

export async function POST() {
    // Clear the token cookie 
    const response = NextResponse.json({ message: "logged out successfully"})
        localStorage.removeItem("token");
    
    return response;
}