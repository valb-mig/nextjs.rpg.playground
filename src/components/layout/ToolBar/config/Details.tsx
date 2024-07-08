"use client";

import itemIcons from "@utils/itemIcons";

import {
    User,
    ScrollText,
    Backpack
} from "lucide-react";

const ToolBarDetails = ({ info }: { info: CharacterInfo }) => {
    return (
        <aside className="flex flex-col gap-2 p-2 w-1/3 h-full justify-between border-l border-l-shade-4">
            
            <section role="heading" className="flex flex-col justify-center items-center h-1/3 rounded-lg">
                <span className="flex justify-center">
                    <User className="w-24 h-24 border border-shade-3 p-2 rounded-full" /> 
                </span>
                <h2 className="text-foreground-1 text-3xl font-medium">
                    { info.name }
                </h2>
            </section>

            <section role="stats" className="bg-shade-4 rounded-lg h-full overflow-y-scroll">
                {info.stats.length > 0 ? (
                    <div className="flex gap-4 flex-col p-2">
                        <span className="flex items-center font-medium">
                            <ScrollText className="size-7 text-primary rotate-12"/>&nbsp;
                            Status
                        </span>
                        <table className="flex flex-col table-auto gap-2">
                            <thead className="text-foreground-1">
                                <tr className="flex items-center p-1">
                                    <th className="text-foreground-1 font-medium bg-shade-3 px-2 rounded-full text-lg w-1/4">
                                        Status
                                    </th>
                                    <th className="text-foreground-2 font-medium px-2 rounded-full text-lg w-3/4">
                                        Value
                                    </th>
                                </tr>
                            </thead>
                            <hr className="border-b-1 border-shade-3" />
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
                ):(
                    <div className="relative flex justify-center items-center h-full overflow-hidden">
                        <span className="relative text-shade-1 text-xl font-medium z-10">
                            No stats
                        </span>
                        <ScrollText className="absolute rotate-12 size-72 right-0 text-shade-ghost" />
                    </div>
                )}
            </section>

            <section role="inventory" className="h-1/3 bg-shade-4 rounded-lg">

                {info.inventory && info.inventory.length > 0 ? (
                    <div className="flex flex-col gap-2 p-2">
                        <span className="flex items-center font-medium">
                            <Backpack className="size-7 text-primary -rotate-12"/>&nbsp;
                            Invetory
                        </span>

                        <div className="grid grid-cols-7 grid-rows-5 gap-2">
                            { info.inventory.map((items, index) => (
                                <div key={items.item} className="border-dashed border border-shade-3 rounded-lg p-2 text-foreground-1 text-center transition-all hover:bg-shade-3">
                                    { items.icon ? itemIcons[items.icon].icon : "" }
                                </div>
                            ))}
                        </div>
                    </div>
                ):(
                    <div className="relative flex justify-center items-center h-full overflow-hidden">
                        <span className="relative text-shade-1 text-xl font-medium z-10">
                            No Items
                        </span>
                        <Backpack className="absolute -rotate-12 size-72 left-0 text-shade-ghost" />
                    </div>
                )}
            </section>

        </aside>
    );
};

export default ToolBarDetails;