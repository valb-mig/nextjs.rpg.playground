"use client";

import { useRoomContext } from "@/context/RoomContext";
import { socket } from "@/socket";
import { User } from "lucide-react";

const Map = () => {

  const { roomCharacters, characterInfo } = useRoomContext();

  const handleClick = (row: number, col: number) => {
    socket.emit("req_map_movement", characterInfo, row, col);
  };

  return (
    <div className="grid grid-cols-10 rounded-lg">
      { Array.from({ length: 10 }).map((_, rowIndex) => (

        <div key={rowIndex} className="flex flex-col">

          { Array.from({ length: 5 }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="relative flex items-center justify-center bg-shade-3 hover:bg-shade-2 p-2 cursor-pointer rounded-lg size-14"
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              <span
                key={rowIndex + colIndex}
                className="absolute text-neutral-900 text-sm font-bold"
              >
                {rowIndex} x {colIndex}
              </span>

              {roomCharacters && roomCharacters.map(
                (character) =>
                  character.position &&
                  character.position.row == rowIndex &&
                  character.position.col == colIndex && (
                    <span
                      key={character.uuid}
                      className="flex justify-center relative items-center"
                    >
                      <div className="flex flex-col relative gap-1 text-white">
                        <User
                          className={`rounded-full p-1 ${characterInfo?.uuid == character.uuid ? "bg-emerald-700" : "bg-neutral-700"}`}
                        />
                      </div>
                      <p
                        className={`absolute z-[1] text-sm rounded text-white -bottom-6 truncate px-2 ${characterInfo?.uuid == character.uuid ? "bg-emerald-700" : "bg-neutral-700"}`}
                      >
                        {character.name}
                      </p>
                    </span>
                  ),
              )}
            </div>
          ))}

        </div>

      ))}
    </div>
  );
};

export default Map;
