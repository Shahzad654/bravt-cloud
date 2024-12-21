import React, { useState } from "react";
import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";
import DashSidebar from "../components/DashSidebar";
import DashHeader from "../components/DashHeader";
import { Table } from "antd";

const { Content } = Layout;

const columns = [
  {
    title: "Firewall Group",
    dataIndex: "firewall",
    showSorterTooltip: {
      target: "full-header",
    },
  },
  {
    title: "Location",
    dataIndex: "location",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
  {
    title: "Rules",
    dataIndex: "rules",
    showSorterTooltip: {
      target: "full-header",
    },
  },
  {
    title: "Instance",
    dataIndex: "instance",
    showSorterTooltip: {
      target: "full-header",
    },
  },

  {
    title: "Description",
    dataIndex: "description",
    showSorterTooltip: {
      target: "full-header",
    },
  },

  {
    title: "Date Created",
    dataIndex: "date",
  },
  {
    title: "Operation",
    dataIndex: "operation",
  },
];

const data = [
  {
    key: "1",
    firewall: "firewall 1",
    location: "New York",
    rules: "rule 1",
    instance: "Instance 1",
    date: "20-8-25",
    description: "Description",
    operation: "Success",
  },
  {
    key: "2",
    firewall: "firewall 1",
    location: "New York",
    rules: "rule 1",
    instance: "Instance 1",
    date: "20-8-25",
    description: "Description",
    operation: "Success",
  },
  {
    key: "3",
    firewall: "firewall 1",
    location: "New York",
    rules: "rule 1",
    instance: "Instance 1",
    date: "20-8-25",
    description: "Description",
    operation: "Success",
  },
  {
    key: "4",
    firewall: "firewall 1",
    location: "New York",
    rules: "rule 1",
    instance: "Instance 1",
    date: "20-8-25",
    description: "Description",
    operation: "Success",
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const Snapshot = () => {
  return (
    <LayoutWrapper>
      <DashSidebar />
      <Layout style={{ padding: "0 16px", backgroundColor: "white" }}>
        <DashHeader />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{
              margin: "16px 0",
              fontSize: "var(--m-heading)",
              color: "black",
              fontWeight: "500",
            }}
          >
            Firewall Group
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              // background: "#f0f2f5",
              background: "white",
              borderRadius: "8px",
            }}
          >
            <PageContent>
              <div className="search">
                <input type="text" placeholder="Please enter" />
                <select name="" id="">
                  <option value="">Firewall ID</option>
                  <option value="">Name</option>
                </select>
              </div>
            </PageContent>
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

export default Snapshot;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: var(--bg-color);
  }

  // Make table responsive for smaller screens
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

const PageContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-bottom: 20px;

  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .add-btn {
    min-width: 80px;
    padding: 6px 16px;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
