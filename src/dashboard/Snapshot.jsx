import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";
import DashSidebar from "../components/DashSidebar";
import DashHeader from "../components/DashHeader";
import { Table } from "antd";

const { Content } = Layout;

const columns = [
  {
    title: "Snapshot Name",
    dataIndex: "snapshot",
    showSorterTooltip: {
      target: "full-header",
    },
  },
  {
    title: "Type",
    dataIndex: "type",
    showSorterTooltip: {
      target: "full-header",
    },
  },
  {
    title: "Size",
    dataIndex: "size",
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
    title: "Datetime",
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
    snapshot: "Snapshot 1",
    location: "New York",
    type: "type 1",
    size: "20GB",
    date: "20-8-25",
    operation: "Success",
  },
  {
    key: "2",
    snapshot: "Snapshot 1",
    location: "New York",
    type: "type 1",
    size: "20GB",
    date: "20-8-25",
    operation: "Success",
  },
  {
    key: "3",
    snapshot: "Snapshot 1",
    location: "New York",
    type: "type 1",
    size: "20GB",
    date: "20-8-25",
    operation: "Success",
  },
  {
    key: "4",
    snapshot: "Snapshot 1",
    location: "New York",
    type: "type 1",
    size: "20GB",
    date: "20-8-25",
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
            Snapshot
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
                  <option value="">Snapshot Name</option>
                  <option value="">Source ID</option>
                  <option value="">Disk ID</option>
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
