import { NextResponse } from 'next/server';

export function middleware(req : any) {
  const token = req.cookies.get('token'); // Fetch token from cookies

    const erpTag = req.cookies.get("erp");


  // If token is not found, redirect to login page
  if (!token && !erpTag) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

// Define the paths where this middleware should apply
export const config = {
  matcher: ['/admin/:path*'], // Apply middleware to all /admin routes
};
