"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

import useRoom from "@hooks/useRoom";

import Breadcrumbs from "@layout/Breadcrumbs";
import LoadingScreen from "@layout/LoadingScreen";

const Character = () => {

  const [ loading, setLoading ] = useState(true);
  const [ characterInfo, setCharacterInfo ] = useState();
  const { getCharacterInfo } = useRoom();

  useEffect(() => {

    setLoading(true);

    try {
      
      const loadCharacterInfo = async () => {

        const response = await getCharacterInfo();

        if ("message" in response) {
          toast.error(response.message);
        } else {
          setCharacterInfo(response);
          setLoading(false);
        }
      };

      loadCharacterInfo();
      
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <LoadingScreen loading={loading} />

      { characterInfo ? 
        (
          <div className="flex flex-col gap-2 w-full">
            Olá Character
          </div>
        ):(
          <p>Loading character info...</p>
        )
      }
    </>
  );
};

export default Character;