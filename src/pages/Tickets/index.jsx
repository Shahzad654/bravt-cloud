import { Table, Badge, Button, Space } from "antd"
import { format } from "date-fns"
import { useState } from "react"
import { FaTicketAlt, FaPlus } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import CreateTicketDialog from "./CreateTicketDialog"
import { useListTicketsQuery } from "../../redux/apis/tickets"

const Ticket = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: tickets, isLoading } = useListTicketsQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })

  const columns = [
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
      render: (text, record) => (
        <Space>
          <FaTicketAlt />
          {text}
          <Badge
            count={record.unseenMessages}
            style={{ backgroundColor: "var(--primary-color)" }}
          />
        </Space>
      )
    },
    {
      title: "Status",
      dataIndex: "closed",
      key: "status",
      render: (closed) => (
        <Badge
          status={!closed ? "processing" : "default"}
          text={closed ? "Closed" : "Open"}
        />
      )
    },
    {
      title: "Last Message",
      dataIndex: "lastMessageAt",
      key: "lastMessageAt",
      render: (date) => format(date, "PPpp")
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => format(date, "PP")
    }
  ]

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h1 style={{ margin: 0 }}>Support Tickets</h1>
        <Button
          type="primary"
          icon={<FaPlus />}
          onClick={() => setIsModalOpen(true)}
        >
          Create New Ticket
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={tickets}
        rowKey="id"
        loading={isLoading}
        rowClassName="cursor-pointer"
        onRow={(record) => ({
          onClick: () => navigate(`/tickets/${record.id}`)
        })}
      />

      <CreateTicketDialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  )
}

export default Ticket
