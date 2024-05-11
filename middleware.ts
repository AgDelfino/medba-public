import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const hasUserLoggedIn = cookieStore.has('user_id');
  const isPatient = cookieStore.get('isPatient');
  const userId = cookieStore.get('user_id');

  const baseUrl = process.env.API_URL?.replace('/api', '');

  if (isPatient && userId && isPatient.value === 'true' && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL(`${baseUrl}/paciente/${userId.value}`, request.url));
  }

  if (hasUserLoggedIn && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (request.nextUrl.pathname !== '/login') {
    if (!hasUserLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return null;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*(?<!\\.json)$)',
  ],
};

