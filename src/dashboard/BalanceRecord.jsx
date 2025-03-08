import styled from "styled-components";
import { Breadcrumb, Layout, Tag } from "antd";
import { Table } from "antd";
import { formatDate, formatPrice, toSentenceCase } from "../utils/helpers";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { FaPaypal } from "react-icons/fa";
import { useListTransactionsQuery } from "../redux/apis/transactions";

const { Content } = Layout;

const columns = [
  {
    title: "Amount",
    dataIndex: "amount",
    render: (amt) => (
      <span style={{ fontWeight: "600" }}>{formatPrice(amt)}</span>
    ),
    showSorterTooltip: { target: "full-header" },
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (value) => {
      const status = value.toLowerCase();
      return (
        <Tag
          color={
            status === "processing" || status === "pending"
              ? "processing"
              : status === "success" ||
                  status === "succeeded" ||
                  status === "completed"
                ? "success"
                : "error"
          }
        >
          {toSentenceCase(status)}
        </Tag>
      );
    },
  },
  {
    title: "Method",
    dataIndex: "method",
    render: (method) => (
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {method === "CREDIT_CARD" ? (
          <BsCreditCard2FrontFill size={18} style={{ color: "#003366" }} />
        ) : (
          <FaPaypal size={18} style={{ color: "var(--primary-color)" }} />
        )}
        {toSentenceCase(method.toLowerCase())}
      </div>
    ),
    filters: [
      { text: "Card", value: "CREDIT_CARD" },
      { text: "PayPal", value: "PAYPAL" },
    ],
    onFilter: (value, record) => record.method.indexOf(value) === 0,
  },
  {
    title: "Time",
    dataIndex: "createdAt",
    render: formatDate,
    showSorterTooltip: { target: "full-header" },
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  },
];

const BalanceRecord = () => {
  const { isLoading, data } = useListTransactionsQuery();

  return (
    <LayoutWrapper>
      <Layout style={{ backgroundColor: "white" }}>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{
              margin: "16px 0",
              fontSize: "var(--m-heading)",
              color: "black",
              fontWeight: "500",
            }}
          />

          <div
            style={{
              minHeight: 360,
              background: "white",
              borderRadius: "8px",
            }}
          >
            <StyledTable
              columns={columns}
              dataSource={data}
              loading={isLoading}
              showSorterTooltip={{
                target: "sorter-icon",
              }}
              style={{ marginTop: "25px" }}
            />
          </div>
        </Content>
      </Layout>
    </LayoutWrapper>
  );
};

export default BalanceRecord;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: var(--bg-color);
  }

  @media (max-width: 767px) {
    .ant-table-wrapper {
      overflow-x: auto;
    }
  }
`;

const LayoutWrapper = styled(Layout)`
  min-height: 100vh;

  @media (max-width: 768px) {
    min-height: 60vh;
  }
`;
