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

        <div key={rowIndex} className="flex flex-col border-r border-r-shade-3 border-b border-b-shade-3">

          { Array.from({ length: 5 }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="relative flex items-center justify-center hover:bg-shade-3 p-2 cursor-pointer h-14 border-l border-l-shade-3 border-t border-t-shade-3"
              onClick={() => handleClick(rowIndex, colIndex)}
            >
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
