import { useState } from "react";

import { useGlobalContext } from "@/context/GlobalContext";
import useRoom from "@hooks/useRoom";

import { z } from "zod";
import { Check } from "lucide-react";

import Button from "@ui/Button";
import Form from "@ui/Form";
import { toast } from "sonner";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";

const ZodSchema = z.object({
  status: z.any()
});

const FormRoomConfig = ({ room }: {room: string}) => {

  const { updateRoomConfig } = useRoom(room);

  const [ loading, setloading ] = useState(false);
  const [ inputRoomStat, setInputRoomStat ] = useState<string>('');
  const [ roomStats, setRoomStats ] = useState<string[]>([]);

  const { userData, setUserData } = useGlobalContext();

  const router = useRouter();

  const onFormStatSubmit = async () => {

    if(
      inputRoomStat.length == 0 || 
      (!isNaN(parseFloat(inputRoomStat))) || 
      roomStats.includes(inputRoomStat) == true
    ) {
      return;
    }

    let updatedRoomStats = roomStats;
    updatedRoomStats.push(inputRoomStat);
    setRoomStats(updatedRoomStats);
    setInputRoomStat('');
  }

  const onFormSubmit = async (data: {
    status: string,
  }) => {
    setloading(true);

    let response = await updateRoomConfig(data);
  
    if(response.message) {
      toast[response.status](response.message);
    }

    if(response.status === "success" && response.data) {
      router.push(`/room/${room}`)
    }

    setloading(false);
  }

  return (
    <div className="p-4">
      <form onSubmit={(e) => {e.preventDefault(); onFormStatSubmit()}}>
        <Input 
          type="text" 
          name="room_stat"
          label="Status" 
          onChange={(e) => setInputRoomStat(e.target.value)}
          value={inputRoomStat}
        />
        <button type="submit"></button>
      </form>

      <Form.Body
        onSubmit={onFormSubmit}
        schema={ZodSchema}
        style="w-full gap-4"
      >
        { roomStats.length > 0 && (
          <div className="flex flex-wrap gap-2 bg-shade-4 rounded-lg p-2">
            { roomStats?.map((stat) => (
              <Form.Input 
                key={stat}
                name={`status.${stat}`}
                type="text" 
                style="secondary"
                className="w-28 text-center"
                value={stat}
                disabled
              />
            ))}

            {/* Load stat from db */}
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit" role="success" loading={loading}>
            <Check />
            Submit
          </Button>
        </div>
      </Form.Body>
    </div>
  )
}

export default FormRoomConfig;