import React from "react";
import styled from "styled-components";
import { Breadcrumb, Layout, theme } from "antd";
import DashSidebar from "../components/DashSidebar";
import DashHeader from "../components/DashHeader";
import { Table } from "antd";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

const { Content } = Layout;

const columns = [
  {
    title: "Record ID",
    dataIndex: "recordid",
    showSorterTooltip: {
      target: "full-header",
    },
  },
  {
    title: "location",
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
    title: "Configuration",
    dataIndex: "configuration",
  },

  {
    title: "Record Type",
    dataIndex: "recordtype",
  },

  {
    title: "Status",
    dataIndex: "status",
  },

  {
    title: "Record Time",
    dataIndex: "recordtime",
  },
];

const data = [
//   {
//     key: "1",
//     server: "Server 1",
//     location: "New York",
//     instance: "192.1.1..178",
//     linetype: "active",
//     operation: "Success",
//   },
//   {
//     key: "2",
//     server: "Server 2",
//     location: "New York",
//     instance: "192.1.1..178",
//     linetype: "active",
//     operation: "Success",
//   },
//   {
//     key: "3",
//     server: "Server 3",
//     location: "New York",
//     instance: "192.1.1..178",
//     linetype: "active",
//     operation: "Success",
//   },
//   {
//     key: "4",
//     server: "Server 4",
//     location: "New York",
//     instance: "192.1.1..178",
//     linetype: "active",
//     operation: "Success",
//   },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const ResourceRecord = () => {
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
            Resource Record
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
                <Space direction="vertical" size={12}>
                  <RangePicker />
                </Space>
                <input type="text" placeholder="Please enter" />
                <select name="" id="">
                  <option value="">UUID</option>
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
    </Layout>
  );
};

export default ResourceRecord;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: var(--bg-color);
  }
`;

const PageContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

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
`;
