import { Badge, Spin } from "antd"
import { format } from "date-fns"
import { useParams } from "react-router-dom"
import { useGetTicketByIdQuery } from "../../redux/apis/tickets"
import ComposeTicketForm from "./ComposeTicketForm"
import TicketMessages from "./TicketMessages"
import { LuRefreshCw, LuTriangleAlert } from "react-icons/lu"
import { useTicketMessagesQuery } from "../../queries/useTicketMessagesQuery"
import { QueryStatus } from "@reduxjs/toolkit/query"

export default function TicketDetails() {
  const { ticketId } = useParams()
  const {
    data: ticket,
    status: ticketStatus,
    refetch: ticketRefetch
  } = useGetTicketByIdQuery(ticketId)

  const { status: msgStatus, refetch: msgRefetch } = useTicketMessagesQuery()

  if (ticketStatus === QueryStatus.pending || msgStatus === "pending") {
    return (
      <div className="tailwind-layout">
        <div className="flex items-center justify-center w-full overflow-hidden h-svh">
          <Spin />
        </div>
      </div>
    )
  }

  if (ticketStatus === QueryStatus.rejected || msgStatus === "error") {
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-1 space-y-2 overflow-hidden text-center size-full">
        <LuTriangleAlert size={20} />
        <p className="text-sm text-muted-foreground">
          Failed to fetch messages! Please try again
        </p>
        <button
          onClick={() => {
            if (ticketStatus === QueryStatus.rejected) ticketRefetch()
            if (msgStatus === "error") msgRefetch()
          }}
          className="flex items-center justify-center gap-2 px-3 py-2 text-white rounded-md h-9 bg-primary"
        >
          <LuRefreshCw />
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="tailwind-layout">
      <div className="flex flex-col w-full overflow-hidden h-svh">
        <header className="flex items-center justify-between w-full px-4 py-2 border-b shrink-0">
          <div className="space-y-0.5">
            <h1 className="text-base font-medium">{ticket?.topic}</h1>
            <p className="text-xs text-zinc-500">
              {format(ticket?.createdAt, "PPP")}
            </p>
          </div>

          <Badge
            status={!ticket.closed ? "processing" : "default"}
            text={ticket.closed ? "Closed" : "Open"}
          />
        </header>

        <TicketMessages />
        <ComposeTicketForm />
      </div>
    </div>
  )
}
