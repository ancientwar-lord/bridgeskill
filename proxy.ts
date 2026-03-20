import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

// Guard these routes behind authentication.
const protectedRoutes = ['/dashboard'];
// Redirect logged-in users away from these routes.
const publicRoutes = ['/login', '/signup', '/'];

export async function proxy(request: NextRequest) {
  // Avoid proxying prefetch requests for performance.
  if (request.headers.get('next-router-prefetch') === '1') {
    return NextResponse.next();
  }

  const path = request.nextUrl.pathname;

  // Determine whether this path requires auth or should redirect logged-in users.
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );
  const isPublicRoute = publicRoutes.includes(path);

  // Check for an active session via cookie (no DB access).
  const sessionCookie = getSessionCookie(request);

  // Protect private routes by sending unauthenticated users to login.
  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Send authenticated users away from auth pages.
  if (isPublicRoute && sessionCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Proxy only application routes (exclude static assets and API endpoints).
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
