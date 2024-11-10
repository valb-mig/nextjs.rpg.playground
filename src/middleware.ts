"use server";

import { NextResponse, NextRequest } from "next/server";
import { checkSession, getUserCookies } from "@utils/cookies";
import { selectUserRoom } from "@services/userService";

export async function middleware(request: NextRequest) {

  const session = await checkSession();
  const cookieData = await getUserCookies();

  const nextPathname = new URL(request.nextUrl).pathname;

  /*
   * Route: '/room'
   */

  if (nextPathname.startsWith("/room")) {

    if (!session || !cookieData) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const pathParts = nextPathname.split("/");

    const roomParams = {
      'room': pathParts[2],
      'action': pathParts[3],
    };

    try {
    
      let userRoom = await selectUserRoom(cookieData.uuid, roomParams.room);

      if(userRoom.status == "error" || (userRoom.code && userRoom.code === 401)) {
        return NextResponse.redirect(new URL("/home", request.url));
      }
      
      if(userRoom.data && userRoom.code === 200) {

        // [INFO] 2 = GM
        if(userRoom.data[0].characters[0].role_id !== 2 && !userRoom.data[0].characters[0].room[0].open) {
          return NextResponse.redirect(new URL("/home", request.url));
        } 
      }
     
    } catch (error: any) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  } 
  
  /*
   * Route: '/home'
   */

  if(nextPathname.startsWith("/home")) {

    if (!session) {
      return NextResponse.redirect(new URL("/connect", request.url));
    }
  }

  /*
   * Route: '/connect'
   */

  if(nextPathname.startsWith("/connect")) {

    if (session) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/room/:path*", 
    "/home", 
    "/connect"
  ],
};
