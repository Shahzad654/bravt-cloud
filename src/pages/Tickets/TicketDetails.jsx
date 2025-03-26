import { Badge, Spin } from "antd";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useGetTicketByIdQuery } from "../../redux/apis/tickets";
import ComposeTicketForm from "./ComposeTicketForm";
import TicketMessages from "./TicketMessages";

export default function TicketDetails() {
  const { ticketId } = useParams();
  const { data: ticket, isLoading } = useGetTicketByIdQuery(ticketId);

  if (isLoading) {
    return (
      <div className="tailwind-layout">
        <div className="flex items-center justify-center w-full overflow-hidden h-svh">
          <Spin />
        </div>
      </div>
    );
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

        <TicketMessages key={ticketId} />
        <ComposeTicketForm />
      </div>
    </div>
  );
}
