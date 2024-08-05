"use client";

import Image from "next/image";

const RoomHeader = () => {
    return (
        <header className="flex flex-row justify-between items-center w-full h-16 bg-background-default px-4 border-b border-shade-4">
            <a href="/home" className="flex gap-2 items-center"> 
                <Image src="/img/rpg-logo.svg" alt="logo" className="size-7 pointer-events-none" width={7} height={7}/>
                <h1 className="text-lg font-bold text-foreground-1">
                    RPG <span className="text-primary">Playground</span>
                </h1>
            </a>
        </header>
    );
};

export default RoomHeader;
