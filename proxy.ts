import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/login', '/register', '/stories', '/travellers'];
const privateRoutes = ['/profile', '/stories/new'];

function matchesRoute(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(route + '/');
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) =>
    matchesRoute(pathname, route),
  );
  const isPublicRoute =
    !isPrivateRoute &&
    publicRoutes.some((route) => matchesRoute(pathname, route));

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