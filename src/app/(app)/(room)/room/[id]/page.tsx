"use client";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { socket } from "@/socket";

import {
  User,
  LogOut,
  MapIcon,
  Backpack,
  MousePointerClick,
} from "lucide-react";

import { getUserData, cleanUserData } from "@/handlers/handleUser";

import handleSocket from "@/handlers/handleSocket";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Dice from "@/components/layout/Dice";
import Map from "@/components/layout/Map";

interface RoomProps {
  params: { id: string };
}

const Room = ({ params }: RoomProps) => {
  const router = useRouter();

  const [diceMax, setDiceMax] = useState(4);
  const [roomUsers, setRoomUsers] = useState<UserInfo[]>([]);
  const [userData, setUserData] = useState<UserInfo>();

  const [roomData, setRoomData] = useState<RoomData>({
    location: "https://i.imgur.com/krXmihl.jpeg",
    showcase: "https://i.imgur.com/vElW0OZg.jpg",
  });

  const [roomLocation, setRoomLocation] = useState("");
  const [roomShowcase, setRoomShowcase] = useState("");

  const socketUserData = Object.values(roomUsers).find(
    (user: UserInfo) => user.uuid == userData?.uuid,
  );

  useEffect(() => {
    if (!getUserData()) {
      router.push("/");
      return;
    }

    setUserData(getUserData());

    let clientUserData = getUserData();

    socket.emit("req_enter_room", {
      uuid: clientUserData?.uuid,
      character_name: clientUserData?.character_name,
      room_code: params.id,
      dice: clientUserData?.dice,
      role: clientUserData?.role,
      position: clientUserData?.position,
    } as UserInfo);

    handleSocket({ setRoomUsers, setRoomData, roomData, params });
  }, []);

  return (
    <main className={"flex flex-col h-screen bg-neutral-950 overflow-y-scroll"}>
      <header className="flex p-4 pb-0 w-ful">
        <div className="flex justify-between w-full gap-2 p-2 bg-neutral-900 rounded-lg flex-wrap">
          <div className="flex gap-2">
            {roomUsers ? (
              Object.values(roomUsers).map((user: UserInfo) => (
                <div
                  key={user.uuid}
                  className={`flex gap-2 items-center rounded-lg p-2 text-white truncate ${userData?.uuid == user.uuid ? "bg-emerald-600" : "bg-neutral-800"}`}
                >
                  <span className="flex gap-2 w-full">
                    <User
                      className={`rounded-full size-7 min-w-7 p-1 ${userData?.uuid == user.uuid ? "bg-emerald-500" : "bg-neutral-600"}`}
                    />
                    <p className="flex w-full truncate">
                      {user.character_name}
                    </p>
                  </span>
                  <div className="flex w-full gap-2">
                    <span className="flex justify-center items-center size-5 bg-neutral-50 text-black rounded min-w-5">
                      {user.dice}
                    </span>
                    <span
                      className={`flex justify-center items-center h-5 px-2 rounded min-w-5 font-bold ${user?.role == "gm" ? "bg-yellow-500 text-yellow-900" : "bg-neutral-100 text-neutral-700"}`}
                    >
                      {user?.role}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <span>Loading party...</span>
            )}
          </div>

          <div id="buttons" className="flex gap-2 items-center">
            <Button
              onClick={() => {
                cleanUserData();
                window.location.reload();
              }}
              className="p-2 rounded text-neutral-100 font-bold"
            >
              <LogOut className="bg-red-400 p-1 rounded-lg text-lg" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col justify-center p-4 gap-4">
        <div className="flex flex-col gap-4 w-full sm:flex-row max-h-[400px]">
          <section className="flex flex-col items-center border-neutral-800 gap-2 w-full sm:w-1/2 min-h-[400px]">
            <span className="flex gap-2 items-center w-full text-white text-3xl">
              <MapIcon />
              Map
            </span>
            <Map roomUsers={roomUsers} />
          </section>

          <section className="flex flex-col gap-4 justify-center items-center w-full sm:w-1/2">
            {socketUserData?.role == "gm" ? (
              <div className="flex items-end justify-end w-full gap-4">
                <Input
                  label="Map URL"
                  name="map_url"
                  onChange={(e) => setRoomLocation(e.target.value)}
                />
                <Button
                  onClick={() => {
                    setRoomData({ ...roomData, location: roomLocation });
                    socket.emit("req_gm_room_data", {
                      room: params.id,
                      key: "location",
                      value: roomLocation,
                    });
                  }}
                  className="p-2 rounded text-neutral-100 font-bold bg-blue-400 transition-all hover:bg-blue-500"
                >
                  <MousePointerClick className="bg-blue-500 p-1 rounded-lg text-lg" />
                  Apply
                </Button>
              </div>
            ) : (
              <span className="flex gap-2 items-center w-full text-white text-3xl">
                <MapIcon />
                Map
              </span>
            )}

            <img
              src={roomData.location}
              alt="map-location"
              className="rounded-lg h-full"
            />
          </section>
        </div>

        <div className="flex flex-col gap-4 w-full sm:flex-row max-h-[400px]">
          <section className="flex flex-col gap-4 justify-center items-center w-full sm:w-1/2">
            {socketUserData?.role == "gm" ? (
              <div className="flex items-end justify-end w-full gap-4">
                <Input
                  label="Display URL"
                  name="showcase_url"
                  onChange={(e) => setRoomShowcase(e.target.value)}
                />
                <Button
                  onClick={() => {
                    setRoomData({ ...roomData, showcase: roomShowcase });
                    socket.emit("req_gm_room_data", {
                      room: params.id,
                      key: "showcase",
                      value: roomShowcase,
                    });
                  }}
                  className="p-2 rounded text-neutral-100 font-bold bg-blue-400 transition-all hover:bg-blue-500"
                >
                  <MousePointerClick className="bg-blue-500 p-1 rounded-lg text-lg" />
                  Apply
                </Button>
              </div>
            ) : (
              <span className="flex gap-2 items-center w-full text-white text-3xl">
                <Backpack />
                Showcase Item
              </span>
            )}

            <img
              src={roomData.showcase}
              alt="display-image"
              className="rounded-lg h-full"
            />
          </section>

          <section className="flex flex-col justify-center items-center gap-2 w-full sm:w-1/2">
            <div className="flex flex-col gap-2 items-center">
              <div className="flex gap-2 bg-neutral-800 p-2 rounded w-full">
                {[
                  {
                    name: "d4",
                    number: 4,
                  },
                  {
                    name: "d6",
                    number: 6,
                  },
                  {
                    name: "d10",
                    number: 10,
                  },
                  {
                    name: "d20",
                    number: 20,
                  },
                ].map((value) => (
                  <span
                    key={value.number}
                    onClick={() => {
                      setDiceMax(value.number);
                    }}
                    className={
                      "flex justify-center items-center " +
                      (diceMax == value.number
                        ? "bg-blue-300"
                        : "bg-neutral-50") +
                      " w-8 h-8 rounded text-sm cursor-pointer"
                    }
                  >
                    {value.name}
                  </span>
                ))}
              </div>
              <Dice max={diceMax} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Room;
