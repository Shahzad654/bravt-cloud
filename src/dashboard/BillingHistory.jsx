import { Breadcrumb, Layout, Table } from "antd"
import DashHeader from "../components/DashHeader"
import styled from "styled-components"
import { formatDate } from "date-fns"
import { formatPrice } from "../utils/helpers"
import { useGetBillingHistoryQuery } from "../redux/apis/transactions"

const columns = [
  {
    title: "Date",
    dataIndex: "billedAt",
    render: (val) => formatDate(val, "PPP hh:mm aa"),
    showSorterTooltip: { target: "full-header" },
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  },
  {
    title: "Details",
    render: (_, record) => (
      <span style={{ whiteSpace: "nowrap" }}>
        {formatBillingDescription(record)}
      </span>
    ),
    showSorterTooltip: { target: "full-header" },
    sorter: (a, b) => a.description.localeCompare(b.description)
  },
  {
    title: "Amount",
    dataIndex: "amount",
    render: (amt) => (
      <span style={{ fontWeight: "600" }}>{formatPrice(amt)}</span>
    ),
    showSorterTooltip: { target: "full-header" },
    sorter: (a, b) => a.amount - b.amount
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

function formatBillingDescription({ reason, details, id, unitsCharged }) {
  const label = details.label ?? details.id ?? id

  switch (reason) {
    case "INSTANCE_CREATION":
      return (
        <>
          Instance <strong>{label}</strong> created (plan: {details.plan})
        </>
      )

    case "INSTANCE_HOURLY_BILLING":
      return (
        <>
          Hourly charge for instance <strong>{label}</strong> (IP:{" "}
          {details.ip ?? "unknown"})
          {unitsCharged > 1 && ` for ${unitsCharged} hours`}
        </>
      )

    case "EARLY_INSTANCE_DELETION":
      return (
        <>
          Early deletion of instance <strong>{label}</strong> (before 30 days)
        </>
      )

    case "SNAPSHOT_CREATION":
      return (
        <>
          Snapshot <strong>{label}</strong> created
        </>
      )

    case "SNAPSHOT_MONTHLY_BILLING":
      return (
        <>
          Monthly charge for snapshot <strong>{label}</strong> (
          {formatBytes(details.snapshotSize ?? 0)}
          {unitsCharged > 1 ? ` for ${unitsCharged} months` : ""})
        </>
      )

    default:
      return <>Billing event: {reason}</>
  }
}
