"use client";

import { useState } from "react";

import Input from "@/components/ui/Input";
import Image from "next/image";

import { 
    Newspaper,
    Search, 
    Swords,
    Settings,
    X,
    UserCircle,
    Menu
} from "lucide-react";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

import useHome from "@hooks/useHome";
import { useGlobalContext } from "@/context/GlobalContext";
import Link from "next/link";

const AppHeader = () => {
    
    const router = useRouter();

    const { userData } = useGlobalContext();

    const [ search, setSearch ] = useState("");
    const [ publicRooms, setPublicRooms ] = useState<RoomInfo[]>([]);
    const [ showProfile, setShowProfile ] = useState(false);
    const { getPublicRooms } = useHome();

    const searchPublicRooms = async (searchParam: string) => {

        setSearch(searchParam);

        const interval = setInterval(() => {
            console.log("Searching..."); // TODO: Create debouce for search

            // const response = await getPublicRooms();

            // if(response.message) {
            //     toast[response.status](response.message);
            // }
    
            // if(response.status == "success" && response.data) {
            //     setPublicRooms(response.data);
            // }

            clearInterval(interval);
        }, 1000);
    };

    return (
        <header className="flex flex-row justify-between items-center w-full h-16 bg-background-default px-4 border-b border-shade-4">
            
            <div className="flex gap-2 items-center">
                <Image src="/img/rpg-logo.svg" alt="logo" className="size-7 pointer-events-none" width={7} height={7}/>
                <h1 className="flex gap-1 text-lg font-bold text-foreground-1">
                    RPG <span className="text-primary">Playground</span>
                </h1>
            </div>

            <div className="relative flex justify-center w-full">
                
                <div className="flex">
                    <Input 
                        name="search" 
                        placeholder="Search rooms"
                        onChange={(e) => searchPublicRooms(e.target.value)}
                        style="secondary"
                    >
                        <Search />
                    </Input>
                </div>

                { search.length > 0 && (
                    <div role="searchRooms" className="absolute -bottom-28 flex gap-2 items-center rounded-lg p-2 w-[500px] z-50 bg-shade-4 border border-shade-3" popover="">
                        { publicRooms.length > 0 ? (
                            publicRooms.map((room, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <div className="flex gap-2 items-center">
                                        <Swords className="text-primary size-7" />
                                        <div className="text-sm font-medium">{room.name}</div>
                                    </div>
                                    <Button role="default" style="button" onClick={() => router.push(`/room/${room.room}`)}>
                                        <Newspaper /> Details
                                    </Button>
                                </div>
                            ))
                            ) : (
                                <div className="text-center w-full text-shade-1">
                                    <p className="italic">No rooms found</p>
                                </div>
                            )
                        }
                    </div>
                )}
            </div>

            <div className="relative">
                <Button
                    role="inherit"
                    style="action"
                    onClick={() => setShowProfile(!showProfile)}
                >
                    {showProfile ? (
                        <X />
                    ) : (
                        <Menu />
                    )}
                </Button>
                
                { showProfile && (
                    <div className="absolute -bottom-48 right-2 flex flex-col gap-2 w-36 p-2 rounded-lg bg-shade-4 border border-shade-3 z-10">

                        <div className="flex gap-2 flex-col">
                            <div className="flex gap-2 items-center truncate">
                                <Image src="/img/rpg-logo.svg" alt="logo" className="size-7 pointer-events-none" width={7} height={7}/>
                                { userData?.name }
                            </div>
                            <div className="flex gap-2 items-center">
                                <p className="bg-shade-3 px-2 rounded-full">xp</p>
                                <span className="text-primary">100</span>
                            </div>
                        </div>

                        <hr className="border-shade-3 w-full" />

                        <ul>
                            <li className="p-1">
                                <Link href="/settings" className="flex gap-2 items-center px-2 text-foreground-1 rounded-full hover:bg-primary/10 text-lg font-medium">                                    <Settings className="text-primary size-6" />
                                    Profile
                                </Link>
                            </li>
                            <li className="p-1">
                                <Link href="#" className="flex gap-2 items-center text-foreground-1 rounded-full px-2 hover:bg-danger/10 text-lg font-medium">
                                    <X className="text-danger size-6" />
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}

            </div>
        </header>
    );
};

export default AppHeader;
