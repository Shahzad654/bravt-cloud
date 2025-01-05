import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";
import DashSidebar from "../components/DashSidebar";
import DashHeader from "../components/DashHeader";
import { Table } from "antd";

const { Content } = Layout;

const columns = [
  {
    title: "Server",
    dataIndex: "server",
    showSorterTooltip: {
      target: "full-header",
    },
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],

    onFilter: (value, record) => record.server.indexOf(value) === 0,
    sorter: (a, b) => a.server.length - b.server.length,
    sortDirections: ["descend"],
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
    title: "Instance",
    dataIndex: "instance",
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
    title: "Line Type",
    dataIndex: "linetype",
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
    title: "Operation",
    dataIndex: "operation",
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
];

const data = [
  {
    key: "1",
    server: "Server 1",
    location: "New York",
    instance: "192.1.1..178",
    linetype: "active",
    operation: "Success",
  },
  {
    key: "2",
    server: "Server 2",
    location: "New York",
    instance: "192.1.1..178",
    linetype: "active",
    operation: "Success",
  },
  {
    key: "3",
    server: "Server 3",
    location: "New York",
    instance: "192.1.1..178",
    linetype: "active",
    operation: "Success",
  },
  {
    key: "4",
    server: "Server 4",
    location: "New York",
    instance: "192.1.1..178",
    linetype: "active",
    operation: "Success",
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const Network = () => {
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
            Netwrok
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
                  <option value="">Instance Name</option>
                  <option value="">IP Address</option>
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

export default Network;

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
