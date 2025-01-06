import styled from "styled-components";
import { Breadcrumb, Layout, Spin } from "antd";
import DashSidebar from "../components/DashSidebar";
import DashHeader from "../components/DashHeader";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearInstances, fetchAllInstances } from "../redux/apis/getAllInstanceSlice";

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
    title: "IP Address",
    dataIndex: "ipaddress",
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
    title: "Status",
    dataIndex: "status",
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
    ipaddress: "192.1.1.178",
    status: "active",
    operation: "Success",
  },
  {
    key: "2",
    server: "Server 2",
    location: "New York",
    ipaddress: "192.1.1.178",
    status: "active",
    operation: "Success",
  },
  {
    key: "3",
    server: "Server 3",
    location: "New York",
    ipaddress: "192.1.1.178",
    status: "active",
    operation: "Success",
  },
  {
    key: "4",
    server: "Server 4",
    location: "New York",
    ipaddress: "192.1.1.178",
    status: "active",
    operation: "Success",
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const Instance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { instances, instancesStatus, error } = useSelector((state) => {
    console.log("state",state)
    return state.allInstance});

  useEffect(() => {
    dispatch(fetchAllInstances());
  }, [dispatch]);

  if (instancesStatus === "loading") return <Spin tip="Loading instances..." />;
  if (instancesStatus === "error") return <p>Error: {error}</p>;

  console.log("instances",instances);
  const formattedData = instances.map((instance, index) => ({
    key: index,
    server: instance.hostname, // Adjust according to API response
    location: instance.region, // Adjust according to API response
    ipaddress: instance.main_ip, // Adjust according to API response
    status: instance.status || "inactive", // Adjust according to API response
  }));

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
            Instance
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
                  <option value="">Server Name</option>
                  <option value="">Server ID</option>
                  <option value="">IP Address</option>
                </select>
              </div>

              <button
                className="add-btn"
                onClick={() => {
                  navigate("/deploy");
                }}
              >
                +Add
              </button>
            </PageContent>
            <StyledTable
              columns={columns}
              dataSource={formattedData}
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

export default Instance;

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
