import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "../query"

const ticketsApi = createApi({
  reducerPath: "tickets",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["TICKETS", "TICKET", "TICKET_MESSAGES"],
  endpoints: (builder) => ({
    listTickets: builder.query({
      query: () => "tickets",
      providesTags: () => [{ type: "TICKETS" }]
    }),

    getTicketById: builder.query({
      query: (id) => `tickets/${id}`,
      providesTags: (_, __, id) => [{ type: "TICKET", id }]
    }),

    createTicket: builder.mutation({
      query: (body) => ({
        url: "tickets",
        method: "POST",
        body
      }),
      invalidatesTags: () => [{ type: "TICKETS" }]
    }),

    createTicketMessage: builder.mutation({
      query: ({ ticketId, formData }) => ({
        url: `tickets/message/${ticketId}`,
        method: "POST",
        body: formData
      }),
      onQueryStarted: async ({ ticketId }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled

          dispatch(
            ticketsApi.util.updateQueryData(
              "getTicketById",
              ticketId,
              (draft) => {
                Object.assign(draft, { lastMessageAt: data.createdAt })
              }
            )
          )

          // eslint-disable-next-line no-empty
        } catch {}
      }
    })
  })
})

export const {
  util: ticketsUtil,
  useListTicketsQuery,
  useGetTicketByIdQuery,
  useCreateTicketMutation,
  useCreateTicketMessageMutation
} = ticketsApi

export default ticketsApi
