import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSocket } from "../providers/SocketProvider"
import { useDispatch } from "react-redux"
import { ticketsUtil } from "../redux/apis/tickets"

export function useTicketsSocket() {
  const navigate = useNavigate()
  const { socket } = useSocket()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!socket) return

    const onTicketClose = (ticket) => {
      dispatch(
        ticketsUtil.updateQueryData("getTicketById", ticket.id, (draft) => {
          Object.assign(draft, ticket)
        })
      )
    }

    socket.on("ticket:close", onTicketClose)

    return () => {
      socket.off("ticket:close", onTicketClose)
    }
  }, [socket, navigate, dispatch])
}
