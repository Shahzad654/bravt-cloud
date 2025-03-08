import { io } from "socket.io-client"
import { API_URL } from "../utils/constants"
import { useTicketMessageSocket } from "../sockets/useMessageSockets"
import { createContext, useContext, useEffect, useMemo } from "react"
import { useTicketsSocket } from "../sockets/useTicketsSockets"

const SocketContext = createContext(undefined)

export function SocketProvider({ children }) {
  const socket = useMemo(
    () =>
      io(API_URL, {
        withCredentials: true,
        transports: ["websocket", "polling"]
      }),
    []
  )

  useEffect(() => {
    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [socket])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider")
  }
  return context
}

export function Sockets() {
  useTicketMessageSocket()
  useTicketsSocket()
  return null
}
