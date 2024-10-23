"use client";

import { useState } from "react";

import { useRoomContext } from "@/context/RoomContext";

import ToolbarGm from "./ToolbarGm";
import ToolbarPlayer from "./ToolbarPlayer";

import Dice from "@layout/Dice";

import {
    Dice5,
    PanelRightOpen,
    PanelRightClose,
    Dice4,
    Dice6,
    Dices
} from "lucide-react";

const ToolBarRoom = () => {

    const [ showToolBar, setShowToolBar ] = useState(true);
    const [ diceMax, setDiceMax ] = useState(4);
    const { characterInfo } = useRoomContext();

    return (
        <div className="relative flex flex-col p-2 group z-10 h-full">

            {characterInfo && (
                <aside className={`relative flex flex-col gap-4 bg-shade-4 h-full justify-between rounded-lg p-2 `+(showToolBar ? "w-52":"w-12")}>
                    
                    { characterInfo.role === "gm" ? <ToolbarGm info={characterInfo} /> : <ToolbarPlayer info={characterInfo} /> }

                    <section role="dice" className=" flex flex-col gap-2 bg-shade-3 rounded-lg">
                        
                        <div className="flex flex-col gap-2 items-center justify-center text-foreground-1 text-lg font-medium">
                            
                            <div className="flex w-full justify-between p-2">
                                <h2 className="flex gap-2 items-center text-2xl">
                                    <Dice5 className="text-primary size-6" />
                                    Rolls
                                </h2>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="font-medium bg-shade-2 px-2 rounded-full">dice</span>
                                    <span className="text-primary font-bold">{diceMax}</span>
                                </div>
                            </div>
                            
                            <Dice max={diceMax} />
                        </div>

                        <div className="flex gap-2 items-center justify-center w-full flex-wrap border border-shade-3 bg-shade-4 rounded-lg p-2">
                            {[
                                {
                                    number: 4,
                                    icon: <Dice4 className="text-primary size-3 rotate-6 sm:size-6" />
                                },
                                {
                                    number: 6,
                                    icon: <Dice6 className="text-primary size-3 rotate-6 sm:size-6" />
                                },
                                {
                                    number: 8,
                                    icon: (
                                        <div className="flex gap-2 h-full">
                                            <span className="flex items-start">
                                                <Dice4 className="text-primary size-4 rotate-12 items-start" />
                                            </span>
                                            <span className="flex items-end">
                                                <Dice6 className="text-primary size-4 rotate-12 items-start" />
                                            </span>
                                        </div>
                                    )
                                },
                                {
                                    number: 12,
                                    icon: (
                                        <div className="flex gap-2 h-full">
                                            <span className="flex items-start">
                                                <Dice6 className="text-primary size-4 rotate-12 items-start" />
                                            </span>
                                            <span className="flex items-end">
                                                <Dice6 className="text-primary size-4 rotate-12 items-start" />
                                            </span>
                                        </div>
                                    )
                                },
                                {
                                    number: 20,
                                    icon: (
                                        <>
                                            <Dices className="text-primary size-4 sm:size-6" />
                                        </>
                                    )
                                }
                            ].map((value) => (
                                <button 
                                    key={value.number} 
                                    className={`flex items-center justify-center text-foreground-1 text-lg font-medium bg-shade-3 p-2 rounded-lg ${ diceMax === value.number ? "bg-shade-2 ring-2 ring-primary" : ""} hover:bg-shade-2 transition-all size-5 sm:size-10`}
                                    onClick={() => setDiceMax(value.number)}
                                >
                                    <div className="relative flex justify-center items-center">
                                        {value.icon}
                                        <span className="absolute -top-2 -left-2 text-foreground-1 text-sm drop-shadow-sm">
                                            {value.number}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>

                    <button 
                        onClick={() => setShowToolBar(!showToolBar)} 
                        className="absolute top-2/4 -left-5 items-center text-primary bg-shade-3 border border-shade-2 p-1 rounded-lg size-9 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                        { showToolBar ?  <PanelRightClose/> : <PanelRightOpen/> }
                    </button>
                </aside>
            )}
           
        </div>
    );
};

export default ToolBarRoom;