import { useCallback, useMemo } from "react"
import { useParams } from "react-router-dom"
import {
  keepPreviousData,
  useInfiniteQuery,
  useQueryClient
} from "@tanstack/react-query"
import { api } from "../utils/api"
import { useSocket } from "../providers/SocketProvider"

export function useTicketMessagesQuery(enabled = true) {
  const { ticketId } = useParams()
  const queryClient = useQueryClient()
  const { isConnected } = useSocket()

  const { data, ...query } = useInfiniteQuery({
    enabled,
    queryKey: ["ticket-messages", ticketId],
    placeholderData: keepPreviousData,
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get(
        `/tickets/${ticketId}/messages/?cursor=${pageParam || ""}`
      )
      return data
    },
    refetchInterval: isConnected ? undefined : 1000,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })

  const formattedData = useMemo(
    () => data?.pages.flatMap((page) => page.messages).reverse() || [],
    [data]
  )

  const addMessage = useCallback(
    (message) => {
      queryClient.setQueryData(
        ["ticket-messages", message.ticketId],
        (prev) => {
          if (!prev) return { pages: [{ messages: [message] }], pageParams: [] }
          return {
            ...prev,
            pages: prev.pages.map((page, index) => ({
              ...page,
              messages:
                index === 0 ? [message, ...page.messages] : page.messages
            }))
          }
        }
      )
    },
    [queryClient]
  )

  const deleteMessage = useCallback(
    ({ id, ticket }) => {
      queryClient.setQueryData(["ticket-messages", ticket.id], (prev) => {
        if (!prev) return prev
        return {
          ...prev,
          pages: prev.pages.map((page) => ({
            ...page,
            messages: page.messages.filter((msg) => msg.id !== id)
          }))
        }
      })
    },
    [queryClient]
  )

  return {
    ...query,
    rawData: data,
    data: formattedData,
    addMessage,
    deleteMessage
  }
}
