import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/shop(.*)',
  '/products(.*)',
  '/categories(.*)',
  '/brands(.*)',
  '/contact',
  '/shipping',
  '/returns',
  '/about',
  '/api/(.*)',
  '/auth/sign-in(.*)',
  '/auth/sign-up(.*)',
];

// Define routes that only admin users can access
const adminRoutes = [
  '/admin(.*)',
];

// Check if a route is public
function isPublicRoute(req: Request) {
  const url = new URL(req.url);
  return publicRoutes.some(pattern => {
    const regex = new RegExp(`^${pattern.replace('(.*)', '.*')}$`);
    return regex.test(url.pathname);
  });
}

// Check if a route is admin-only
function isAdminRoute(req: Request) {
  const url = new URL(req.url);
  return adminRoutes.some(pattern => {
    const regex = new RegExp(`^${pattern.replace('(.*)', '.*')}$`);
    return regex.test(url.pathname);
  });
}

// Configure Clerk middleware
export default clerkMiddleware((auth, req) => {
  // For public routes, allow access without authentication
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }
  
  // For admin routes, check if user has admin role
  if (isAdminRoute(req)) {
    const isAdmin = auth.userId && auth.sessionClaims?.metadata?.role === 'admin';
    
    if (!isAdmin) {
      const homeUrl = new URL('/', req.url);
      return NextResponse.redirect(homeUrl);
    }
  }
  
  // For all other routes, ensure user is authenticated
  if (!auth.userId) {
    const signInUrl = new URL('/auth/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|.*\\.(?:jpg|jpeg|gif|png|webp|svg|ico|css|js|woff2?)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}