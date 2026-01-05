import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    console.log('Auth attempt:', {
      receivedPassword: password,
      envPassword: adminPassword,
      match: password === adminPassword,
    });

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD not configured in environment');
      return NextResponse.json(
        { error: 'Admin password not configured' },
        { status: 500 }
      );
    }

    if (password === adminPassword) {
      const response = NextResponse.json(
        { success: true },
        { status: 200 }
      );
      
      // Set secure cookie
      response.cookies.set({
        name: 'admin_authenticated',
        value: 'true',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 86400, // 24 hours
      });

      console.log('Authentication successful, cookie set');
      return response;
    } else {
      console.warn('Password mismatch - invalid credentials');
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
