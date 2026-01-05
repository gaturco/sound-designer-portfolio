import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Middleware no longer needed - authentication is handled client-side in /admin page
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
