import React, { useState } from "react";
import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";
import DashSidebar from "../components/DashSidebar";
import DashHeader from "../components/DashHeader";
import { Table } from "antd";
import AlertImg from "../assets/images/alerting.png";

const { Content } = Layout;

const columns = [
  {
    title: "Payment Account",
    dataIndex: "account",
    showSorterTooltip: {
      target: "full-header",
    },
  },

  {
    title: "Time",
    dataIndex: "date",
  },

  {
    title: "Recharge Ammount",
    dataIndex: "amount",
  },
  {
    title: "Operation",
    dataIndex: "operation",
  },
];

const data = [
  {
    key: "1",
    account: "account 1",
    amount: "$50",
    date: "20-8-25",
    operation: "Success",
  },
  {
    key: "2",
    account: "account 1",
    amount: "$50",
    date: "20-8-25",
    operation: "Success",
  },
  {
    key: "3",
    account: "account 1",
    amount: "$50",
    date: "20-8-25",
    operation: "Success",
  },
  {
    key: "4",
    account: "account 1",
    amount: "$50",
    date: "20-8-25",
    operation: "Success",
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const BalanceRecord = () => {
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
          ></Breadcrumb>

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
              dataSource={data}
              onChange={onChange}
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
