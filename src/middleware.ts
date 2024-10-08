"use server";

import { NextResponse, NextRequest } from "next/server";
import { checkSession, getUserCookies } from "@utils/cookies";
import { selectUserRoom } from "@services/userService";
import { toast } from "sonner";

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
    
      let checkRoom = await selectUserRoom(cookieData.uuid, roomParams.room);

      if(!checkRoom || (checkRoom.code && checkRoom.code === 1)) {
        
        // FIX: Toast doesn't work
        // toast.error(checkRoom.message);

        return NextResponse.redirect(new URL("/home", request.url));
      }

      if(roomParams.action !== "join") {

        if(checkRoom.code && checkRoom.code === 2) { // Character is not in room
          return NextResponse.redirect(new URL("/room/"+roomParams.room+"/join", request.url));
        }
  
      }
     
      {/* TODO: Check if character is in room and the room is public */}

    } catch (error: any) {
      
      // FIX: Toast doesn't work
      // toast.error(error.message);

      console.log(error);
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
