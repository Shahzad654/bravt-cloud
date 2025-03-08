import { formatDate } from "date-fns"
import { useGetSessionQuery } from "../../redux/apis/auth"
import { cn } from "../../utils/helpers"

export function MessageBubble({ message }) {
  const { data: user } = useGetSessionQuery()
  const isCurrentMessage = message.sender.id === user.id

  return (
    <li
      className={cn(
        "group/message flex w-full items-center gap-3",
        isCurrentMessage ? "ml-auto flex-row-reverse" : "mr-auto flex-row"
      )}
    >
      <div className="max-w-full w-fit md:max-w-lg">
        <p
          className={cn(
            "whitespace-pre-wrap break-words rounded-lg px-3 py-1.5 text-sm font-medium md:max-w-lg",
            isCurrentMessage ? "bg-primary  text-white" : "bg-zinc-100"
          )}
        >
          {message.message}
        </p>

        <div
          className={cn("mt-1 flex items-center gap-2", {
            "justify-end": !isCurrentMessage
          })}
        >
          <p className="text-xs text-zinc-500">
            {formatDate(message.createdAt, "hh:mm aa")}
          </p>
        </div>
      </div>
    </li>
  )
}
