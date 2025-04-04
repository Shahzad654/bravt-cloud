import { Breadcrumb, Layout, Table } from "antd"
import DashHeader from "../components/DashHeader"
import styled from "styled-components"
import { formatDate } from "date-fns"
import { formatPrice } from "../utils/helpers"
import { useGetBillingHistoryQuery } from "../redux/apis/transactions"

const columns = [
  {
    title: "Amount",
    dataIndex: "amount",
    render: (amt) => (
      <span style={{ fontWeight: "600" }}>{formatPrice(amt)}</span>
    ),
    showSorterTooltip: { target: "full-header" },
    sorter: (a, b) => a.amount - b.amount
  },
  {
    title: "Details",
    dataIndex: "description",
    render: (desc) => <span style={{ whiteSpace: "nowrap" }}>{desc}</span>,
    showSorterTooltip: { target: "full-header" },
    sorter: (a, b) => a.description.localeCompare(b.description)
  },
  {
    title: "Time",
    dataIndex: "billedAt",
    render: (val) => formatDate(val, "PPP hh:mm aa"),
    showSorterTooltip: { target: "full-header" },
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  }
]

export default function BillingHistory() {
  const { isLoading, data } = useGetBillingHistoryQuery()

  return (
    <LayoutWrapper>
      <Layout style={{ backgroundColor: "white" }}>
        <DashHeader />
        <Layout.Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{
              margin: "16px 0",
              fontSize: "var(--m-heading)",
              color: "black",
              fontWeight: "500"
            }}
          >
            Billing History
          </Breadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 360,
              // background: "#f0f2f5",
              background: "white",
              borderRadius: "8px"
            }}
          >
            <Table
              columns={columns}
              dataSource={data}
              loading={isLoading}
              showSorterTooltip={{ target: "sorter-icon" }}
              style={{ marginTop: "25px" }}
            />
          </div>
        </Layout.Content>
      </Layout>
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled(Layout)`
  min-height: 100vh;

  .alerting {
    .alerting_img {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 1rem;

      p {
        text-align: center;
      }

      img {
        width: 160px;
        height: auto;
      }
    }
  }
  p {
    width: 80ch;
    line-height: 2rem;
    font-weight: 500;
    color: var(--text-color);
  }

  @media (max-width: 768px) {
    min-height: 60vh;
  }
`
