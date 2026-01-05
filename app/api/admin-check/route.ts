import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const isAuthenticated = request.cookies.get('admin_authenticated')?.value === 'true';
    
    return NextResponse.json(
      { isAuthenticated },
      { status: 200 }
    );
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { isAuthenticated: false },
      { status: 500 }
    );
  }
}
