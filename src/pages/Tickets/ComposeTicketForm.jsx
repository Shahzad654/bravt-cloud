import { useEffect, useRef } from "react"
import { HiPaperAirplane } from "react-icons/hi2"
import { LuPaperclip, LuX } from "react-icons/lu"
import {
  useCreateTicketMessageMutation,
  useGetTicketByIdQuery
} from "../../redux/apis/tickets"
import { useParams } from "react-router-dom"
import { useTicketMessagesQuery } from "../../queries/useTicketMessagesQuery"
import { useFilesSelect } from "../../hooks/useFilesSelect"
import { cn } from "../../utils/helpers"

export default function ComposeTicketForm() {
  const inputRef = useRef()
  const { ticketId } = useParams()
  const { data: ticket } = useGetTicketByIdQuery(ticketId)
  const { addMessage } = useTicketMessagesQuery(false)

  const [sendMessage, { isLoading }] = useCreateTicketMessageMutation()

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const message = inputRef.current?.value?.trim()
    if (!message) {
      inputRef.current?.focus()
      return
    }

    const formData = new FormData()
    formData.set("message", message)
    files.forEach((file) => formData.append("images", file))
    const { error, data } = await sendMessage({ ticketId, formData })

    if (error) {
      message.error(error.data.message)
      return
    }

    addMessage(data)
    inputRef.current.value = ""
    setFiles([])
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const { files, setFiles, removeFile, getRootProps, getInputProps } =
    useFilesSelect(isLoading, inputRef)

  if (ticket.closed) {
    return (
      <div className="flex items-center justify-center w-full px-4 py-3 min-h-[57px] text-sm text-center border-t text-zinc-600">
        This ticket has been closed!
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full shrink-0 border-t p-4", { "pt-0": !!files.length })}
    >
      {files.length > 0 && (
        <div className="flex items-center space-x-4 overflow-x-auto pb-3 pt-4">
          {files.map((file, idx) => (
            <div
              key={`${file.name}-${idx}`}
              className={cn("group relative size-32", {
                "opacity-80": isLoading
              })}
            >
              <img
                src={file.preview}
                alt={file.name}
                className="aspect-square size-full rounded-lg bg-zinc-200 object-cover"
              />
              <button
                type="button"
                onClick={removeFile(idx)}
                disabled={isLoading}
                className="absolute bg-red-600 text-white flex items-center justify-center -right-1.5 -top-1.5 z-10 size-5 rounded-full opacity-0 disabled:!opacity-0 group-hover:!opacity-100"
              >
                <LuX />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <div
          {...getRootProps()}
          className={cn(
            "flex size-10  cursor-pointer [&_svg]:size-[18px] items-center justify-center overflow-hidden text-black bg-zinc-100 border border-zinc-200 rounded-md disabled:opacity-50 shrink-0 aspect-square ",
            isLoading && "pointer-events-none opacity-50"
          )}
        >
          <input {...getInputProps()} />
          <LuPaperclip size={20} />
        </div>

        <input
          ref={inputRef}
          disabled={isLoading}
          placeholder="Type something..."
          className="w-full px-2.5 disabled:opacity-50 placeholder:text-zinc-500 h-10 bg-transparent border-2 focus-visible:!outline-none focus-visible:!border-primary border-zinc-300"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center overflow-hidden text-white rounded-md disabled:opacity-50 size-10 aspect-square bg-primary"
        >
          <HiPaperAirplane size={20} />
        </button>
      </div>
    </form>
  )
}
