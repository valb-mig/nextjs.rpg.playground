"use client";

import { Toaster } from "sonner";

const Notification = () => {
  return (
    <>
      <Toaster 
        richColors 
        position="bottom-right" 
        toastOptions={{
          duration: 3000,
          style: {
            backgroundColor: "#0A0C10",
            borderRadius: "10px",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #151A23",
          },
        }}
      />
    </>
  );
};

export default Notification;