import { selectUserData } from "@/services/userService";
import { getUserCookies } from "@/utils/cookies";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { toast } from "sonner";

export interface GlobalContextProps {
  userData: UserData | undefined;
  setUserData: (userData: UserData) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {

  const [ userData, setUserData ] = useState<UserData | undefined>(undefined);

  useEffect(() => {

    const getUserData = async () => {

      const cookies = await getUserCookies();

      if(!cookies) {
        toast.error("GlobalContext: No cookies found");
        return;
      }

      const response = await selectUserData(cookies.uuid);

      if(!response) {
        toast.error("GlobalContext: User not found");
        return;
      }

      setUserData(response);
    };

    getUserData();

  }, []);

  return (
    <GlobalContext.Provider value={{ 
      userData, 
      setUserData
    }}>
      { children }
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);

    if (!context) {
      throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};