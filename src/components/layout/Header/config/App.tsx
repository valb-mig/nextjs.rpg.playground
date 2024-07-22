"use client";

import { useState } from "react";
import { toast } from "sonner";

import Input from "@/components/ui/Input";
import Image from "next/image";

import { 
    Newspaper,
    Search, 
    Swords
} from "lucide-react";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

import useDashboard from "@hooks/useDashboard";

const AppHeader = () => {
    
    const router = useRouter();

    const [ search, setSearch ] = useState("");
    const [ publicRooms, setPublicRooms ] = useState<RoomInfo[]>([]);
    const { getPublicRooms } = useDashboard();

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

            <div>
                teste
            </div>
        </header>
    );
};

export default AppHeader;
