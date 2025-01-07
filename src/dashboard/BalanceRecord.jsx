import styled from "styled-components";
import { Breadcrumb, Layout, Spin, Tag } from "antd";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getTransactions } from "../redux/apis/transactionsSlice";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { formatPrice, toSentenceCase } from "../utils/helpers";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { FaPaypal } from "react-icons/fa";

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
    render: (status) => (
      <Tag
        color={
          status === "processing" || status === "pending"
            ? "processing"
            : status === "succeeded" || status === "COMPLETED"
              ? "success"
              : "error"
        }
      >
        {toSentenceCase(status.toLowerCase())}
      </Tag>
    ),
  },
  {
    title: "Method",
    dataIndex: "paymentMethod",
    render: (method) => (
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {method === "Card" ? (
          <BsCreditCard2FrontFill size={18} style={{ color: "#003366" }} />
        ) : (
          <FaPaypal size={18} style={{ color: "var(--primary-color)" }} />
        )}
        {method}
      </div>
    ),
    filters: [
      { text: "Card", value: "Card" },
      { text: "PayPal", value: "PayPal" },
    ],
    onFilter: (value, record) => record.paymentMethod.indexOf(value) === 0,
  },
  {
    title: "Time",
    dataIndex: "createdAt",
    render: (value) => (
      <span style={{ fontSize: "14px" }}>{format(value, "PPP")}</span>
    ),
    showSorterTooltip: { target: "full-header" },
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  },
];

const BalanceRecord = () => {
  const dispatch = useDispatch();
  const { status, transactions } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "509px",
          padding: "180px 16px",
        }}
      >
        <Spin size="small" />
      </div>
    );
  }

  return (
    <LayoutWrapper>
      <Layout style={{ padding: "0 16px", backgroundColor: "white" }}>
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
              //   padding: 24,
              minHeight: 360,
              // background: "#f0f2f5",
              background: "white",
              borderRadius: "8px",
            }}
          >
            <StyledTable
              columns={columns}
              dataSource={transactions}
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
