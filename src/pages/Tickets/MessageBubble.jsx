import "react-medium-image-zoom/dist/styles.css"

import Zoom from "react-medium-image-zoom"
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
        isCurrentMessage ? "ml-auto flex-row-reverse" : "mr-auto"
      )}
    >
      <div className="max-w-full w-fit md:max-w-lg">
        <div
          className={cn(
            "flex flex-col gap-2 rounded-lg p-2 md:max-w-lg",
            isCurrentMessage ? "bg-primary text-white" : "bg-zinc-200"
          )}
        >
          {message.files.map((image) => (
            <Zoom key={image.id} zoomImg={{ src: image.url, draggable: false }}>
              <img
                src={image.url}
                alt="Image"
                className="min-w-[300px] rounded-md object-contain"
              />
            </Zoom>
          ))}

          <p className="whitespace-pre-wrap break-words text-sm font-medium">
            {message.message}
          </p>
        </div>

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
