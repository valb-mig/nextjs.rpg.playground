"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LoadingScreen from "@layout/LoadingScreen";
import FormRoomConfig from "@layout/Settings/FormRoomConfig";

const ConfigRoom = ({ params }: { params: { id: string} }) => {

  const router = useRouter();

  const [ loading, setLoading ] = useState(false);

  return (
    <>
      <LoadingScreen loading={loading} />

      <div className="flex flex-col w-full p-8 gap-8">
        <section className="flex flex-col border border-dashed border-shade-4 rounded-lg">
          
          {/* Profile */}
          <FormRoomConfig room={params.id}/>

        </section>
      </div>
    </>
  );
};

export default ConfigRoom;
