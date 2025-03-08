import { useEffect, useRef } from "react"
import { HiPaperAirplane } from "react-icons/hi2"
import {
  useCreateTicketMessageMutation,
  useGetTicketByIdQuery
} from "../../redux/apis/tickets"
import { useParams } from "react-router-dom"

export default function ComposeTicketForm() {
  const inputRef = useRef()
  const { ticketId } = useParams()
  const { data: ticket } = useGetTicketByIdQuery(ticketId)

  const [sendMessage, { isLoading }] = useCreateTicketMessageMutation()

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const message = inputRef.current?.value?.trim()
    if (!message) {
      inputRef.current?.focus()
      return
    }

    const { error } = await sendMessage({ ticketId, message })

    if (error) {
      message.error(error.data.message)
      return
    }

    inputRef.current.value = ""
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

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
      className="flex items-center gap-2 px-4 py-2 border-t"
    >
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
    </form>
  )
}
