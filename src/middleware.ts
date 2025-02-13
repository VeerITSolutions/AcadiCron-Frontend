import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value; // Extract token value
  const erpTag = req.cookies.get('erp')?.value; // Extract ERP tag value

  // If either token or ERP tag is missing, redirect to login
  if (!token || !erpTag) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all /admin routes
export const config = {
  matcher: [
    '/admin/:path*',      // Protect all /admin routes
    '/parent/:path*',
    '/'
  ],
};
