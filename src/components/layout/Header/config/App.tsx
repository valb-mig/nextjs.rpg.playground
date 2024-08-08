"use client";

import { useState } from "react";

import Image from "next/image";

import { 
    X,
    UserCircle,
    Menu,
    LogOut
} from "lucide-react";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

import { useGlobalContext } from "@/context/GlobalContext";
import Link from "next/link";
import { deleteUserCookies } from "@/utils/cookies";

const AppHeader = () => {
    
    const router = useRouter();

    const { userData } = useGlobalContext();
    const [ showProfile, setShowProfile ] = useState(false);

    return (
        <header className="flex relative flex-row justify-between items-center w-full h-16 bg-background-default px-4 border-b border-shade-4 z-20">
            
            <div className="flex gap-2 items-center">
                <Image src="/img/rpg-logo.svg" alt="logo" className="size-7 pointer-events-none" width={7} height={7}/>
                <h1 className="flex gap-1 text-lg font-bold text-foreground-1">
                    RPG <span className="text-primary">Playground</span>
                </h1>
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
                
                {/* TODO: Make a component for this */}
                { showProfile && (
                    <div className="flex absolute -bottom-48 right-2 flex-col gap-2 w-36 p-2 rounded-lg bg-shade-4 border border-shade-3 z-30 shadow-lg">
                        <div className="flex gap-2 flex-col">
                            <div className="flex gap-2 items-center truncate">
                                <Image src="/img/rpg-logo.svg" alt="logo" className="size-7 pointer-events-none" width={7} height={7}/>
                                { userData?.name }
                            </div>
                            <div className="flex gap-2 items-center">
                                <p className="bg-shade-3 px-2 rounded-full font-medium">xp</p>
                                <span className="text-primary">{userData?.xp}</span>
                            </div>
                        </div>

                        <hr className="border-shade-3 w-full" />

                        <ul>
                            <li className="p-1">
                                <Link href="/settings" className="flex gap-2 items-center p-1 px-2 text-foreground-1 rounded-full hover:bg-primary/10 text-lg font-medium">
                                    <UserCircle className="text-primary size-6" />
                                    Profile
                                </Link>
                            </li>
                            <li className="p-1">
                                <button 
                                    onClick={() => { deleteUserCookies(); router.push("/"); }} 
                                    className="flex w-full gap-2 items-center p-1 px-2 text-foreground-1 rounded-full hover:bg-danger/10 text-lg font-medium">
                                    <LogOut className="text-danger size-6" />
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}

            </div>
        </header>
    );
};

export default AppHeader;
