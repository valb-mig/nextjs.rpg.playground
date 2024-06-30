import { cookies } from "next/headers";

import { NextResponse, NextRequest } from "next/server";

import { checkRoom } from "@/handlers/handleCookie";

export async function middleware(request: NextRequest) {
  const userCookies: boolean = cookies().has("userInfo");
  const nextPathname = new URL(request.nextUrl).pathname;

  /*
   * Route: '/room'
   */

  if (nextPathname.startsWith("/room")) {
    if (!userCookies) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const pathParts = nextPathname.split("/");
    const roomParam = pathParts[pathParts.length - 1];

    if ((await checkRoom(roomParam)) === false) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/room/:path*"],
};
