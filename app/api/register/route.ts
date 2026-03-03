import { NextRequest, NextResponse } from 'next/server';
import { registerUser, findUser, User} from '@/data/user';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userName, email, password } = body;

    // Basic validation
    if (!userName || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = findUser(email);
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a simple ID (in a real app, use UUID or database auto-increment)
    const id = Date.now().toString();

    const newUser: User = { id, userName, email, password: hashedPassword };
    registerUser(newUser);

    return NextResponse.json({ 
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        userName: newUser.userName,
        email: newUser.email,
      }
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}