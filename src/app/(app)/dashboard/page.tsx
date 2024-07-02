"use client";

import { useState, useEffect } from "react";
import useDashboard from "@hooks/useDashboard";

const Dashboard = () => {

  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const { getUserRooms } = useDashboard();

  useEffect(() => {

    setLoading(true);

    try {
      
      const loadUserRooms = async () => {
        const userRooms = await getUserRooms();
        setRooms(userRooms);
      };

      loadUserRooms();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    getUserRooms();
  }, []);

  return (
    <div>
      Hello{/* TODO: Show user connected rooms */}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
