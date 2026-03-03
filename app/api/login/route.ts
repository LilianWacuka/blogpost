import { NextRequest, NextResponse } from "next/server";
import { findUser, loginUser } from "@/data/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    // parse the request body
    const { email, password } = await request.json();

    // validate the user first
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // find if the user exists first
    const user = findUser(email);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // make sure the password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );
// this is a mocked db
    loginUser(user);

    // Create response FIRST
    const response = NextResponse.json(
      {
        message: "Login successful",
        token: token,
        user: {
          id: user.id,
          userName: user.userName,
          email: user.email,
        },
      },
      { status: 200 }
    );

    // Store JWT in httpOnly cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, 
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
