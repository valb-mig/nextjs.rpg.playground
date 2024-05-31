"use client";

import React, { 
    useState, 
    useEffect 
} from 'react';

import { useRouter } from 'next/navigation';
import { socket } from "@/socket";

import { 
    User,
    LogOut,
    MapIcon,
    MapPin,
    Dice1
} from 'lucide-react';

import { 
    getUserData,
    cleanUserData
} from '@/utils/helper';

import type { 
    UserInfo,
    RoomUsersObject
} from '@/types/interfaces';

import Dice from '@/components/ui/Dice';
import Button from '@/components/ui/Button';
import Map from '@/components/ui/Map';

import socketHooks from '@/app/room/hooks/socketHooks';

type ParamsType = {
    id: string
}

interface RoomProps {
    params: ParamsType
}

const Room = ({ params }: RoomProps) => {
    
    const router = useRouter();

    const [ diceMax,   setDiceMax ]   = useState(4);
    const [ roomUsers, setRoomUsers ] = useState<UserInfo[]>([]);
    const [ userData,  setUserData ]  = useState<UserInfo>();

    const [ roomData, setRoomData ]   = useState({
        location: 'https://i.imgur.com/krXmihl.jpeg'
    })

    const { 
        resHello, 
        resEnterRoom, 
        resMapMovement,
        resRollDice
     } = socketHooks();

    useEffect(() => {

        if(!getUserData()) {
            router.push('/');
            return;
        }
    
        setUserData(getUserData());

        socket.emit('req_enter_room', {
            'room': params.id, 
            'user_data': JSON.stringify(getUserData())
        });

        socket.on('res_hello', (usersObject: RoomUsersObject) => {
            setRoomUsers(resHello(usersObject));
        });

        socket.on('res_enter_room', (socketId: string) => {
            resEnterRoom(socketId, params.id)
        });

        socket.on('res_map_movement', (moveUser: UserInfo, usersObject: RoomUsersObject) => {
            setRoomUsers(resMapMovement(moveUser, usersObject))
        });

        socket.on('res_roll_dice', (usersObject: RoomUsersObject, rollUser: UserInfo) => {
            setRoomUsers(resRollDice(usersObject, rollUser));
        });

        return () => {
            socket.off('res_hello');
            socket.off('res_enter_room');
            socket.off('res_map_movement');
            socket.off('res_roll_dice');
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main className={"flex flex-col h-screen bg-neutral-950 overflow-y-scroll bg-[url("+ roomData.location +")]"}>

            <header className='flex p-4 w-ful'>
                <div className='flex justify-between w-full gap-2 p-2 bg-neutral-900 rounded-lg flex-wrap'>

                    <div className='flex gap-2'>
                        { roomUsers ? 
                            Object.values(roomUsers).map((user: UserInfo) => (
                                <div key={user.uuid} className={`flex gap-2 items-center rounded-lg p-2 text-white truncate ${userData?.uuid == user.uuid ? 'bg-emerald-600' : 'bg-neutral-800' }`}>
                                    <span className='flex gap-2 w-full'>
                                        <User className={`rounded-full size-7 min-w-7 p-1 ${userData?.uuid == user.uuid ? "bg-emerald-500" : "bg-neutral-600"}`}/>
                                        <p className='flex w-full truncate'>{user.character_name}</p>
                                    </span>
                                    <span className='flex justify-center items-center size-5 bg-neutral-50 text-black rounded min-w-5'>
                                        {user.dice} {user?.role}
                                    </span>
                                </div>
                            )) : (
                                <span>Loading party...</span>
                            )
                        }
                    </div>

                    <div id="buttons" className='flex gap-2 items-center'>
                        <Button onClick={() => {
                            cleanUserData(); 
                            window.location.reload();
                        }} className="p-2 rounded text-neutral-100 font-bold">
                            <LogOut className='bg-red-400 p-1 rounded-lg text-lg'/>Logout
                        </Button>
                    </div>

                </div>
            </header>
            
            <div className='flex justify-center w-full h-full px-4 gap-4'>

                <div className='flex flex-col gap-4 w-2/3 justify-start'>
                    <section className='flex flex-col items-center border-neutral-800 gap-2'>
                        <span className='flex gap-2 items-center w-full text-white text-3xl'>
                            <MapIcon/>Map
                        </span>
                        <Map roomUsers={roomUsers}/>
                    </section>

                    <section className='flex flex-col w-full gap-2 justify-center items-center'>
                        <span className='flex gap-2 items-center w-full text-white text-3xl'>
                            <MapPin/>Location
                        </span>

                        <img src={roomData.location} alt='map-location' className='rounded-lg w-[500px]'/>
                    </section>
                </div>

                <section id="dice-section" className='flex flex-col justify-center items-center gap-2 w-1/3 bg-neutral-900 rounded-lg'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-2 bg-neutral-800 p-2 rounded w-full'>
                        {[
                            {
                            name: 'd4',
                            number: 4
                            },
                            {
                            name: 'd6',
                            number: 6
                            },
                            {
                            name: 'd10',
                            number: 10
                            },
                            {
                            name: 'd20',
                            number: 20
                            }
                        ].map((value) => (
                            <span 
                                key={value.number} 
                                onClick={() => {setDiceMax(value.number)}} 
                                className={'flex justify-center items-center '+(diceMax == value.number ? 'bg-blue-300' : 'bg-neutral-50')+' w-8 h-8 rounded text-sm cursor-pointer'}
                            >
                                {value.name}
                            </span>
                        ))}
                        </div>
                        <div id="dice" className='flex justify-center items-center w-full h-full'>
                            <Dice max={diceMax} room={params.id}/>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Room;