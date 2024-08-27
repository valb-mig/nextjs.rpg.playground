import { Backpack, ChevronUp, ScrollText } from "lucide-react";

import itemIcons from "@utils/itemIcons";

const ToolbarPlayer = ({ info }: { info: CharacterSocketInfo }) => {

    return (
        <>
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
        </>
    );
};

export default ToolbarPlayer;