import { NextResponse, NextRequest } from "next/server";
import { loginUser, findUser} from "@/data/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const { email, password } = body;
        if(!email || !password){
            return NextResponse.json({ error: "Required fields"});
        }
        const user = findUser(email);
        loginUser;
        if(!user){
            return NextResponse.json({ error: "User Not Found", status: 404});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return NextResponse.json({ error: "Invalid Credentials"}, { status: 401 });
        }
        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
        loginUser(user);
        return NextResponse.json({ message:'Login successful', token, user: { id: user.id, userName: user.userName, email: user.email } }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error"}, { status: 500 });

    }
}