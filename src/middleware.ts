import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRoom } from '@/utils/handlers';
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {

  const userCookies: boolean = cookies().has("userInfo");
  const nextPathname = new URL(request.nextUrl).pathname;

  if (nextPathname.startsWith('/room')) {

    if (!userCookies) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const pathParts = nextPathname.split('/');
    const roomParam = pathParts[pathParts.length - 1];

    if (await checkRoom(roomParam) === false) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
    matcher: ['/room/:path*'],
}
