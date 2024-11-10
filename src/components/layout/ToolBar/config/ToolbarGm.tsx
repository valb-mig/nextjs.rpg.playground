import Button from "@ui/Button";
import { CogIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const ToolbarGm = ({ info }: { info: CharacterSocketInfo }) => {

    const router = useRouter();

    return (
        <div>
            <div className="bg-shade-5 p-2 rounded-full flex justify-between w-full">

                <Button role="info" type="button"  style="action" onClick={() => router.push(`/room/${info.room}/config`)} >
                    <CogIcon/>
                </Button>
                
            </div>
        </div>
    );
};

export default ToolbarGm;