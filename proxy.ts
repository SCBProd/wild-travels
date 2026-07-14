import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/login', '/register', '/stories', '/travellers'];
const privateRoutes = ['/profile', '/stories/new'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  );
  const isPrivateRoute = privateRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  );

  if (!isPublicRoute && !isPrivateRoute) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('accessToken')?.value;

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isPrivateRoute && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/stories/new', '/login', '/register'],
};
