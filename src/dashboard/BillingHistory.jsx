import { Breadcrumb, Layout, Table } from "antd"
import DashHeader from "../components/DashHeader"
import styled from "styled-components"
import { formatDate } from "date-fns"
import { formatBytes, formatPrice } from "../utils/helpers"
import { useGetBillingHistoryQuery } from "../redux/apis/transactions"

const columns = [
  {
    title: "Date",
    dataIndex: "billedAt",
    render: (val) => (
      <span style={{ whiteSpace: "nowrap", fontSize: 13 }}>
        {formatDate(val, "PP - p")}
      </span>
    ),
    showSorterTooltip: { target: "full-header" },
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  },
  {
    title: "Details",
    render: (_, record) => (
      <span style={{ whiteSpace: "nowrap", fontSize: 14 }}>
        {formatBillingDescription(record)}
      </span>
    )
  },
  {
    title: "Amount",
    dataIndex: "amount",
    render: (amt, item) => (
      <div style={{ whiteSpace: "nowrap", paddingRight: 24 }}>
        <span style={{ fontWeight: 600, fontSize: 14 }}>
          {formatPrice(amt)}
        </span>
        <br />
        {item.type === "INSTANCE" &&
          typeof item.details?.backupsCost === "number" &&
          item.details.backupsCost > 0 && (
            <span style={{ fontSize: 12, color: "#888", whiteSpace: "nowrap" }}>
              <strong>Backups:</strong> {formatPrice(item.details?.backupsCost)}
              <br />
              <strong>Instance:</strong>{" "}
              {formatPrice(amt - item.details?.backupsCost)}
            </span>
          )}
      </div>
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
              marginTop: "16px",
              fontSize: "var(--m-heading)",
              color: "black",
              fontWeight: "500",
              padding: "0 24px"
            }}
          >
            Billing History
          </Breadcrumb>

          <div
            style={{
              padding: "0 24px",
              maxWidth: "calc(100vw - 300px)",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch"
            }}
          >
            <StyledTable
              bordered
              columns={columns}
              dataSource={data}
              loading={isLoading}
              showSorterTooltip={{ target: "sorter-icon" }}
              style={{ marginTop: "25px", width: "100%" }}
              scroll={{ x: "max-content" }}
            />
          </div>
        </Layout.Content>
      </Layout>
    </LayoutWrapper>
  )
}

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: var(--bg-color);
  }
`

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
