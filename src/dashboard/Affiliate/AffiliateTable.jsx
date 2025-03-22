import { Card, Table, Typography } from "antd"
import styled from "styled-components"
import { useGetAffiliatedUsersQuery } from "../../redux/apis/affiliate"
import { formatDate } from "date-fns"
import { formatPrice } from "../../utils/helpers"

const { Title, Text } = Typography

export default function AffiliateTable() {
  const { isLoading, data = [] } = useGetAffiliatedUsersQuery()

  const columns = [
    {
      title: "User",
      dataIndex: "firstName",
      render: (firstName, record) =>
        firstName ? `${firstName} ${record.lastName ?? ""}` : record.email
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (createdAt) => formatDate(createdAt, "PP")
    },
    {
      title: "Status",
      dataIndex: "commission",
      render: (commission) => (
        <Text style={{ color: commission !== null ? "#4CAF50" : "#FFA000" }}>
          {commission === null ? "Pending" : "Completed"}
        </Text>
      )
    },
    {
      title: "Commission",
      dataIndex: "commission",
      render: (commission) => formatPrice(commission, 3)
    }
  ]
  return (
    <StyledCard>
      <Title level={4}>Recent Referrals</Title>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
      />
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;

  .ant-card-body {
    padding: 24px;
  }
`
