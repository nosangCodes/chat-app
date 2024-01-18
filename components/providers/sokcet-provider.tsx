"use client";
import { Chicle } from "next/font/google";
import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIo } from "socket.io-client";

type SokcetContextType = {
  socket: any | null;
  isConnected: boolean;
};

export const SocketContext = createContext<SokcetContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

type Props = {
  children: React.ReactNode;
};

export function SocketProvider({ children }: Props) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = new (ClientIo as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: "/api/socket/io",
        addTrailingSlash: false,
      }
    );

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });
    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}
