import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes
const authRoutes = ['/login', '/signup'];
const protectedRoutes = ['/dashboard'];

export function middleware(request: NextRequest) {
  // Get auth token from cookies
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Redirect to dashboard if trying to access auth pages while logged in
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect to login if trying to access protected routes while logged out
  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/dashboard/:path*'
  ]
};