import { NextResponse } from "next/server";

export async function POST() {
    // Clear the token cookie 
    const response = NextResponse.json({ message: "logged out successfully"})
    response.cookies.set("token", "",
        {path:'/', expires: new Date(0) }
    );
    return response;
}