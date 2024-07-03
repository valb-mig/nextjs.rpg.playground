"use server";

import { cookies } from "next/headers";

import { NextResponse, NextRequest } from "next/server";
import { checkRoom, checkSession } from "@/handlers/handleCookie";

export async function middleware(request: NextRequest) {

  const session = await checkSession();
  const nextPathname = new URL(request.nextUrl).pathname;

  /*
   * Route: '/room'
   */

  if (nextPathname.startsWith("/room")) {

    if (!session) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const pathParts = nextPathname.split("/");
    const roomParam = pathParts[pathParts.length - 1];

    if ((await checkRoom(roomParam)) === false) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } 
  
  /*
   * Route: '/dashboard'
   */

  if(nextPathname.startsWith("/dashboard")) {

    if (!session) {
      return NextResponse.redirect(new URL("/connect", request.url));
    }
  }

  /*
   * Route: '/connect'
   */

  if(nextPathname.startsWith("/connect")) {

    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/room/:path*", 
    "/dashboard", 
    "/connect"
  ],
};
