"use client";

import { socket } from "@/socket";

const useSocket = () => {

  const resHello = (characterObject: CharacterInfo) => {
    let users: CharacterInfo[] = [];

    Object.keys(characterObject).map(() => {
      let user: CharacterInfo = characterObject[key];
      users.push(user);
    });

    return users;
  };

  const resEnterRoom = ( characterObject: CharacterSocketInfo ) => {
    socket.emit("req_hello", characterObject);
  };

  const resMapMovement = (moveUser: UserInfo, usersObject: RoomUsersObject) => {
    let users: UserInfo[] = [];

    Object.keys(usersObject).map((key) => {
      let user: UserInfo = usersObject[key];

      if (user.uuid === moveUser.uuid) {
        user = moveUser;
      }

      users.push(user);
    });

    return users;
  };

  const resRollDice = (rollUser: UserInfo, usersObject: RoomUsersObject) => {
    let users: UserInfo[] = [];

    Object.keys(usersObject).map((key) => {
      let user: UserInfo = usersObject[key];

      if (user.uuid == rollUser.uuid) {
        user.dice = rollUser.dice;
      }

      users.push(user);
    });

    return users;
  };

  return { resHello, resEnterRoom, resMapMovement, resRollDice };
};

export default useSocket;
