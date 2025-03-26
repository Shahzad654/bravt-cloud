import { io } from "socket.io-client";
import { API_URL } from "../utils/constants";
import { useTicketMessageSocket } from "../sockets/useMessageSockets";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useTicketsSocket } from "../sockets/useTicketsSockets";

const SocketContext = createContext(undefined);

export function SocketProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);

  const socket = useMemo(
    () =>
      io(API_URL, {
        withCredentials: true,
        transports: ["websocket", "polling"],
      }),
    [],
  );

  useEffect(() => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socket.connect();
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.disconnect();
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}

export function Sockets() {
  useTicketMessageSocket();
  useTicketsSocket();
  return null;
}
