import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { LuTriangleAlert, LuArrowDown, LuRefreshCw } from "react-icons/lu"
import { useTicketMessagesQuery } from "../../queries/useTicketMessagesQuery"
import { formatMsgDate } from "../../utils/helpers"
import { CircularProgress } from "@mui/material"
import { Spin } from "antd"
import { MessageBubble } from "./MessageBubble"

const TicketMessages = () => {
  const {
    data,
    status,
    refetch,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useTicketMessagesQuery()

  const containerRef = useRef(null)
  const sentinelRef = useRef(null)
  const initialLoad = useRef(true)
  const [isAtBottom, setIsAtBottom] = useState(true)

  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      100

    setIsAtBottom(isNearBottom)
  }, [])

  const scrollToBottom = useCallback((behavior = "smooth") => {
    const container = containerRef.current
    if (!container) return
    container.scrollTo({
      top: container.scrollHeight,
      behavior
    })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const sentinel = sentinelRef.current
    if (!container || !sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          const previousScrollHeight = container.scrollHeight
          fetchNextPage().then(() => {
            requestAnimationFrame(() => {
              if (containerRef.current) {
                container.scrollTop =
                  container.scrollHeight - previousScrollHeight
              }
            })
          })
        }
      },
      { root: container, rootMargin: "100px" }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  useEffect(() => {
    const container = containerRef.current
    if (!container || !data.length) return

    if (initialLoad.current) {
      scrollToBottom("auto")
      initialLoad.current = false
    } else {
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        400

      if (isNearBottom) {
        scrollToBottom()
      }
    }
  }, [data, scrollToBottom])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [])

  const groupedMessages = useMemo(() => {
    return data.reduce((grouped, msg) => {
      const date = formatMsgDate(msg.createdAt)
      if (!grouped[date]) grouped[date] = []
      grouped[date].push(msg)
      return grouped
    }, {})
  }, [data])

  if (status === "pending") {
    return (
      <div className="flex items-center justify-center flex-1 text-center size-full">
        <Spin tip="Loading messages..." />
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-1 space-y-2 overflow-hidden text-center size-full">
        <LuTriangleAlert size={20} />
        <p className="text-sm text-muted-foreground">
          Failed to fetch messages! Please try again
        </p>
        <button
          onClick={() => refetch()}
          className="flex items-center justify-center gap-2 px-3 py-2 text-white rounded-md h-9 bg-primary"
        >
          <LuRefreshCw />
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="relative overflow-y-hidden size-full">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto size-full"
      >
        <div ref={sentinelRef} />

        {isFetchingNextPage && (
          <div className="flex items-center justify-center w-full p-4">
            <CircularProgress size={14} />
          </div>
        )}

        <div className="p-4 mt-auto space-y-8">
          {Object.entries(groupedMessages).map(([date, messages]) => (
            <div key={date} className="space-y-8">
              <div className="flex items-center w-full">
                <div className="flex-1 w-full h-px outline-none bg-zinc-200" />
                <p className="shrink-0 rounded-md bg-zinc-200 px-3 py-0.5 text-xs text-zinc-600">
                  {date}
                </p>
                <div className="flex-1 w-full h-px outline-none bg-zinc-200" />
              </div>

              <ul className="space-y-2">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {!isAtBottom && (
        <button
          className="absolute flex items-center justify-center border rounded-full border-zinc-300 bg-zinc-50 inset-x-1/2 bottom-4 size-7 bg-card"
          onClick={() => scrollToBottom()}
        >
          <LuArrowDown />
        </button>
      )}
    </div>
  )
}

export default TicketMessages
