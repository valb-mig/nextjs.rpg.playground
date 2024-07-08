"use client";

import Link from "next/link";

const RoomHeader = () => {
    return (
        <header className="flex flex-row justify-between items-center w-full h-16 bg-background-default px-4 border-b border-shade-4">
            <Link href="/dashboard" className="flex gap-2 items-center">
                <img src="/img/rpg-logo.svg" alt="logo" className="size-7 pointer-events-none" />
                <h1 className="text-lg font-bold text-foreground-1">
                    RPG <span className="text-primary">Playground</span>
                </h1>
            </Link>
        </header>
    );
};

export default RoomHeader;
