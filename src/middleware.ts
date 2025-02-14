import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const erpTag = req.cookies.get('erp')?.value;
  const roleId = req.cookies.get('role_id')?.value;

  // Redirect to login if token or ERP tag is missing
  if (!token || !erpTag) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const numericRoleId = roleId ? parseInt(roleId, 10) : null;

  // Role-based route restrictions
  const roleRestrictions: Record<number, string[]> = {
    7: ['/parent', '/teacher'], // Admin can't access /parent or /teacher
    10: ['/admin', '/teacher'], // Student can't access /admin or /teacher
    11: ['/admin', '/teacher'], // Parent can't access /admin or /teacher
    2: ['/admin', '/parent'],   // Teacher can't access /admin or /parent
  };

  if (numericRoleId && roleRestrictions[numericRoleId]) {
    for (const restrictedPath of roleRestrictions[numericRoleId]) {
      if (req.nextUrl.pathname.startsWith(restrictedPath)) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
  }

  return NextResponse.next();
}

// Apply middleware to relevant routes
export const config = {
  matcher: [
    '/admin/:path*',
    '/parent/:path*',
    '/teacher/:path*',
    '/',
  ],
};
