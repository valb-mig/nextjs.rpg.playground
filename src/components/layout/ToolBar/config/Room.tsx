"use client";

import { useState } from "react";

import itemIcons from "@utils/itemIcons";
import Dice from "@layout/Dice";

import {
    ScrollText,
    Backpack,
    Dice5,
    ChevronUp,
    PanelRightOpen,
    PanelRightClose,
    Dice4,
    Dice6,
    Dices
} from "lucide-react";

const ToolBarRoom = ({ info }: { info: CharacterInfo }) => {

    const [ showToolBar, setShowToolBar ] = useState(true);
    const [ diceMax, setDiceMax ] = useState(4);

    return (
        <div className="relative flex flex-col p-2 group z-10 h-full">
            <aside className={`relative flex flex-col gap-4 bg-shade-4 h-full justify-between rounded-lg p-2 `+(showToolBar ? "w-52":"w-12")}>
                
                <section role="stats">
                    {info.stats.length > 0 ? (
                        <details className="flex gap-4 flex-col group [&_summary::-webkit-details-marker]:hidden">

                            <summary className="flex justify-between items-center hover:bg-shade-3 p-2 rounded-lg transition">
                                <span className="flex items-center font-medium">
                                    <ScrollText className="size-7 text-primary rotate-12"/>&nbsp;
                                    Status
                                </span>
                                <span className="text-foreground-1 text-sm group-open:-rotate-180">
                                    <ChevronUp className="size-4 text-primary" />
                                </span>
                            </summary>

                            <div className="flex w-full max-h-36 overflow-y-scroll">
                                <table className="flex flex-col table-auto gap-2 w-full">
                                    <thead className="text-foreground-1 border-b border-shade-3">
                                        <tr className="flex items-center p-1">
                                            <th className="text-foreground-1 font-medium bg-shade-3 px-2 rounded-full text-lg w-1/4">
                                                Status
                                            </th>
                                            <th className="text-foreground-2 font-medium px-2 rounded-full text-lg w-3/4">
                                                Value
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { info.stats.map((status, index) => (
                                            <tr key={index} className="flex items-center p-1">
                                                <td className="text-center text-foreground-1 font-medium bg-shade-3 px-2 rounded-full text-sm w-1/4">
                                                    {status.stat}
                                                </td>
                                                <td className="text-foreground-2 font-medium px-2 rounded-full text-sm w-3/4 text-center">
                                                    {status.value}
                                                </td>
                                            </tr>
                                        )) }
                                    </tbody>
                                </table>
                            </div>
                        </details>
                    ):(
                        <div className="text-shade-1 text-center">
                            No stats
                        </div>
                    )}
                </section>

                <section role="inventory">
                    {info.inventory && info.inventory.length > 0 ? (
                        <details className="flex flex-col gap-2 group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex justify-between items-center hover:bg-shade-3 p-2 rounded-lg transition">
                                <span className="flex items-center font-medium">
                                    <Backpack className="size-7 text-primary -rotate-12"/>&nbsp;
                                    Invetory
                                </span>
                                <span className="text-foreground-1 text-sm group-open:-rotate-180">
                                    <ChevronUp className="size-4 text-primary" />
                                </span>
                            </summary>

                            <div className="grid grid-cols-7 grid-rows-5 gap-2 p-2">
                                { info.inventory.map((items, index) => (
                                    <div key={items.item} className="border-dashed border border-shade-3 rounded-lg p-2 text-foreground-1 text-center transition-all hover:bg-shade-3">
                                        { items.icon ? itemIcons[items.icon].icon : "" }
                                    </div>
                                ))}
                            </div>
                        </details>
                    ):(
                        <div className="text-shade-1 text-center">
                            No items
                        </div>
                    )}
                </section>

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
                                icon: <Dice4 className="text-primary size-6 rotate-6" />
                            },
                            {
                                number: 6,
                                icon: <Dice6 className="text-primary size-6 -rotate-6" />
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
                                        <Dices className="text-primary size-6" />
                                    </>
                                )
                            }
                        ].map((value) => (
                            <button 
                                key={value.number} 
                                className={`flex items-center justify-center text-foreground-1 text-lg font-medium bg-shade-3 p-2 rounded-lg ${ diceMax === value.number ? "bg-shade-2 ring-2 ring-primary" : ""} hover:bg-shade-2 transition-all size-10`}
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
                    { showToolBar ? <PanelRightOpen/> : <PanelRightClose/> }
                </button>
            </aside>
        </div>
    );
};

export default ToolBarRoom;