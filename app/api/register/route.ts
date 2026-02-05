import { NextRequest, NextResponse } from 'next/server';
import { registerUser, findUser } from '@/data/user';
import { User } from '@/data/user';

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

    // Generate a simple ID (in a real app, use UUID or database auto-increment)
    const id = Date.now().toString();

    const newUser: User = { id, userName, email, password };
    registerUser(newUser);

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}