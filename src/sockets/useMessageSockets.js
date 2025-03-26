import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSocket } from "../providers/SocketProvider";
import { useTicketMessagesQuery } from "../queries/useTicketMessagesQuery";

export function useTicketMessageSocket() {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { addMessage, deleteMessage } = useTicketMessagesQuery(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!socket) return;

    socket.on("message:create", addMessage);
    socket.on("message:delete", deleteMessage);

    return () => {
      socket.off("message:create", addMessage);
      socket.off("message:delete", deleteMessage);
    };
  }, [socket, addMessage, deleteMessage, pathname, navigate]);
}
